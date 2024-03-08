import { configureStore } from "@reduxjs/toolkit"
import notificationReducer from "./reducers/notificationReducer"
import bloglistReducer from "./reducers/bloglistReducer"

const store = configureStore({
  reducer: {
    blogs: bloglistReducer,
    notification: notificationReducer
  }
})

export default store