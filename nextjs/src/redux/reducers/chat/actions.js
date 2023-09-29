import * as actionTypes from './actionTypes'

export const wsConnect = host => ({ type: actionTypes.WS_CONNECT, host })
export const wsConnecting = host => ({ type: actionTypes.WS_CONNECTING, host })
export const wsConnected = host => ({ type: actionTypes.WS_CONNECTED, host })
export const wsDisconnect = host => ({ type: actionTypes.WS_DISCONNECT, host })
export const wsDisconnected = host => ({ type: actionTypes.WS_DISCONNECTED, host })
export const wsSendMessage = msg => ({ type: actionTypes.WS_SEND_MESSAGE, msg })
export const wsReceiveMessage = msg => ({ type: actionTypes.WS_RECEIVE_MESSAGE, msg })
