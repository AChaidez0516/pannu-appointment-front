import * as actions from '../reducers/chat/actions'
import * as actionTypes from '../reducers/chat/actionTypes'
import { setReceiveSocketMessage } from '../reducers/chatSlice'

const socketMiddleware = () => {
    let socket = null
    let hostUrl = null

    let lifeSignalTimer = 0

    const onOpen = store => (event) => {
        store.dispatch(actions.wsConnected(event.target.url))

        lifeSignalTimer = setInterval(() => {
            sendMessage(JSON.stringify({heart_signal: 1}))
        },5000)
    };

    const onClose = store => () => {
        store.dispatch(actions.wsDisconnected())

        clearInterval(lifeSignalTimer)

        setTimeout(function() {
            store.dispatch(actions.wsConnect(hostUrl))
        }, 1000);
    };

    const sendMessage = (message) => {
        if (socket.readyState === 1)
            socket.send(message)
    }

    const waitForConnection = (callback, interval) => {
        if (socket.readyState === 1) {
            callback();
        } else {
            let that = this;
            // optional: implement backoff for interval here
            setTimeout(function () {
                waitForConnection(callback, interval);
            }, interval);
        }
    };

    const onMessage = store => (event) => {
        if (!event.data)
            return

        console.log('on message', event.data)

        store.dispatch(setReceiveSocketMessage(JSON.parse(event.data)))
    }

    // the websocket part of this function
    return store => next => action => {
        switch (action.type) {
            case actionTypes.WS_CONNECT:
                if (socket !== null) {
                    socket.close();
                }

                // connect to the remote host
                hostUrl = action.host
                socket = new WebSocket(hostUrl)

                // websocket handlers
                socket.onmessage = onMessage(store)
                socket.onclose = onClose(store)
                socket.onopen = onOpen(store)

                break;
            case actionTypes.WS_CONNECTED:
                break;
            case actionTypes.WS_DISCONNECT:
                if (socket !== null) {
                    socket.close()
                }
                socket = null
                break;
            case actionTypes.WS_DISCONNECTED:
                break;
            case actionTypes.WS_SEND_MESSAGE:
                waitForConnection(() => {
                    sendMessage(JSON.stringify({ data: action.msg }))
                }, 1000)
                break;
            default:
                console.log('the next action:', action)
                return next(action)
        }
    };
};

export default socketMiddleware()