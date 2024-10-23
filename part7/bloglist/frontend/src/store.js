import { configureStore } from "@reduxjs/toolkit"
import bloglistReducer from "./reducers/bloglistReducer"
import notificationReducer from './reducers/notificationReducer'
import loginReducer from './reducers/loginReducer'

const store = configureStore({
  reducer: {
    blogs: bloglistReducer,
    notification: notificationReducer,
    login: loginReducer
  }
})

export default store