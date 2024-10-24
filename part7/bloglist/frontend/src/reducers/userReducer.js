import { createSlice } from "@reduxjs/toolkit"
import userService from "../services/storage"

const userSlice = createSlice({
  name: 'users',
  initialState: null,
  reducers: {
    setUsers(state, action) {
      return action.payload
    }
  }
})

const { setUsers } = userSlice.actions

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch(setUsers(users))
  }
}

export default userSlice.reducer