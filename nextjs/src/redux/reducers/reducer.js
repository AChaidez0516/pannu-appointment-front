import authReducer, { authReducerConfig } from './authSlice'
import insuranceReducer, { insuranceReducerConfig } from './insuranceSlice'
import chatReducer, { chatReducerConfig } from './chatSlice'
import connectionReducer from './connectionSlice'
import alertReducer, { alertReducerConfig } from './alertSlice'

import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'

const rootReducer = combineReducers({
  auth: persistReducer(authReducerConfig, authReducer),
  chat: chatReducer,
  insurance: persistReducer(insuranceReducerConfig, insuranceReducer),
  connection: connectionReducer,
  alert: persistReducer(alertReducerConfig, alertReducer),
})

export default rootReducer
