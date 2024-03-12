import { createSlice } from "@reduxjs/toolkit"

import loginService from "../services/login"
import userService from "../services/user"

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
			
			userService.setUser(user)
			dispatch(login(user))
		} catch (e) {

		}
	}
}

export const userLogout = () => {
	return async (dispatch) => {
		userService.clearUser()
		dispatch(logout(null))
	}
}

export default loginSlice.reducer