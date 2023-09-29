import { useDispatch, useSelector } from 'react-redux';

import { useEffect } from 'react';
import { selectReceiveMessage, setReceiveSocketMessage } from '../../../../redux/reducers/chatSlice';

export function useWebSocket(callback = null) {
  const dispatch = useDispatch()
  const receivedMessage =  useSelector(selectReceiveMessage)
  let isConnected = false

  let socket = null
  let hostUrl = null
  let lifeSignalTimer = 0

  const openSocket = (url) => {
    hostUrl = url
    socket = new WebSocket(url)

    socket.onmessage = onMessage
    socket.onclose = onClose
    socket.onopen = onOpen
  }

  const onOpen = (event) => {
    console.log('WebSocket: ', event)

    isConnected = true
    lifeSignalTimer = setInterval(() => {
          sendLifeSignal()
        }, 5000)
  }

  const onMessage = (event) => {
    console.log('WebSocket: ', event)

    if (!event || !event.data)
      return

    dispatch(setReceiveSocketMessage(JSON.parse(event.data)))
  }

  const onClose = (event) => {
    console.log('WebSocket: ', event)

    isConnected = false
    clearInterval(lifeSignalTimer)

    setTimeout(function() {
      openSocket(hostUrl)
    }, 1000);
  }

  const sendSocketMessage = (data) => {
    // dispatch(actions.wsSendMessage(data))
    if (!socket) {
      console.log('socket object is null')
      return
    }

    socket.send(JSON.stringify({ data: data }))
  }

  const sendLifeSignal = () => {
    socket.send(JSON.stringify({ life_signal: 1 }))
  }

  useEffect(() => {
    if (!callback || !callback.onMessage)
      return
    if (!receivedMessage)
      return

    if (receivedMessage.signin)
      return

    if (receivedMessage.signout)
      return

    if (receivedMessage.life_signal)
      return


    if (receivedMessage.data === undefined)
      return

    if (!callback)
      return

    callback.onMessage(receivedMessage)

  }, [receivedMessage])

  return { openSocket, sendSocketMessage }
}