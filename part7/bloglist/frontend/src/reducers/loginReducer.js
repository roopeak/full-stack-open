import { createSlice } from "@reduxjs/toolkit"

import { setNotification } from "./notificationReducer"

import loginService from "../services/login"
import userService from "../services/storage"

const loginSlice = createSlice({
  name: "login",
  initialState: null,
  reducers: {
    login: (state, action) => {
      return action.payload
    },
    logout: (state, action) => {
      return action.payload
    }
  }
})

export const { login, logout } = loginSlice.actions

export const userLogin = (userCredentials) => {
  return async (dispatch) => {
    const { username, password } = userCredentials
    try {
      const user = await loginService.login({
        username,
        password
      })

      userService.saveUser(user)
      dispatch(login(user))
      dispatch(setNotification(
        { message: `Welcome ${user.name}!`, type: 'info', delay: 5 }
      ))
    } catch (e) {
      // ...
    }
  }
}

export const userLogout = () => {
  return async (dispatch) => {
    userService.removeUser()
    dispatch(logout(null))
  }
}

export default loginSlice.reducer