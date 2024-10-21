import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      state = action.payload
      return state
    }
  }
})

export const { showNotification } = notificationSlice.actions

export const setNotification = (message, delay) => {
  return async (dispatch) => {
    dispatch(showNotification(message))
    setTimeout(() => dispatch(showNotification(null)), delay * 1000)
  }
}

export default notificationSlice.reducer