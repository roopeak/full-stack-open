import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      state = action.payload
      return state
    },
    hideNotification(state) {
      state = initialState
      return state
    }
  }
})

export const { setNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer