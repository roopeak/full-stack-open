import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    showNotification(state, action) {
      return action.payload
    }
  }
})

const { showNotification } = notificationSlice.actions

export const setNotification = (message, delay) => {
  return async (dispatch) => {
    dispatch(showNotification(message))
    setTimeout(() => {
      dispatch(showNotification(null))
    }, delay * 1000)
  }
}

export default notificationSlice.reducer