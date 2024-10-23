import { configureStore } from "@reduxjs/toolkit"
import bloglistReducer from "./reducers/bloglistReducer"
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    blogs: bloglistReducer,
    notification: notificationReducer,
  }
})

export default store