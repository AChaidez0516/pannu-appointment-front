import storage from 'redux-persist/lib/storage'

import { createSlice } from '@reduxjs/toolkit'

export const alertSlice = createSlice({
  name: 'alert',
  initialState: {
    data: []
  },

  reducers: {
    setAlertByAptId: (state, action) => {
      state.data[action.payload.aptId] = action.payload.alerts
    },
    setGeneralAlertByAptId: (state, action) => {
      if (!state.data[action.payload.aptId])
        state.data[action.payload.aptId] = { general: [], prep: [] }
      state.data[action.payload.aptId].general = action.payload.alerts
    },
    setPrepAlertByAptId: (state, action) => {
      if (!state.data[action.payload.aptId])
        state.data[action.payload.aptId] = { general: [], prep: [] }
      state.data[action.payload.aptId].prep = action.payload.alerts
    }
  }
})

export const { setAlertByAptId, setGeneralAlertByAptId, setPrepAlertByAptId } = alertSlice.actions

export const selectAllAlerts = state => state.alert.data;

export const alertReducerConfig = {
  key: 'alert',
  storage: storage,
  blacklist: ['somethingTemporary']
}

export default alertSlice.reducer