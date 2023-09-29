import storage from 'redux-persist/lib/storage'

import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    chat_user: null,
    idcard_data: null,
    token: '',
    is_logged_in: false,
  },

  reducers: {
    setChatUser: (state, action) => {
      state.chat_user = action.payload
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
    setIDCard: (state, action) => {
      state.idcard_data = action.payload
    }
  }
})

export const { setUser, setIDCard, setChatUser } = authSlice.actions

export const selectRegUser = state => {
  return state.auth.user
}

export const selectAuthUser = state => state.auth.user
export const selectChatUser = state => state.auth.chat_user
export const selectIDCard = state => state.idcard_data

export const authReducerConfig = {
  key: 'auth',
  storage: storage,
  blacklist: ['somethingTemporary']
}
export default authSlice.reducer