import { createSlice } from "@reduxjs/toolkit"
import userService from "../services/user"

const userSlice = createSlice({
	name: "users",
	initialState: null,
	reducers: {
		setUsers(state, action) {
			return action.payload
		}
	}
})

const { setUsers } = userSlice.actions

export const initializeUser = () => {
	return async (dispatch) => {
		const users = await userService.getAll()
		dispatch(setUsers(users))
	}
}

export default userSlice.reducer