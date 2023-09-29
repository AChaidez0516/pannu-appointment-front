import { createSlice } from '@reduxjs/toolkit'

export const connectionSlice = createSlice({
  name: 'connection',
  initialState: {
    loading_status: false
  },
  reducers: {
    setLoadingStatus: (state, action) => {
      state.loading_status = action.payload
    }
  }
})

export const { setLoadingStatus } = connectionSlice.actions
export const selectLoadingStatus = (state) => state.connection.loading_status

export default connectionSlice.reducer