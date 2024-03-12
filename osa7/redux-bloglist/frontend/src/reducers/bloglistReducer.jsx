import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"
import { setNotification } from "./notificationReducer"

const bloglistSlice = createSlice({
  name: "blogs",
	initialState: [],
	reducers: {
		setBlogs: (state, action) => {
			return action.payload
		},
		appendBlog: (state,action) => {
			state.push(action.payload)
		},
		deleteBlog: (state, action) => {
			const id = action.payload
			return state.filter(blog => blog.id !== id)
		},
		updateBlog: (state, action) => {
			const updatedBlog = action.payload
			const { id } = updatedBlog
			return state.map(blog => (blog.id !== id ? blog : updatedBlog))
		},
	}
})

export const { 
	setBlogs, 
	appendBlog, 
	deleteBlog, 
	updateBlog } = bloglistSlice.actions

export const initializeBlogs = () => {
	return async (dispatch) => {
		const blogs = await blogService.getAll()
		dispatch(setBlogs(blogs))
	}
}

export const createBlog = (blog) => {
	return async (dispatch) => {
		try {
			const newBlog = await blogService.create(blog)
			dispatch(appendBlog(newBlog))
			dispatch(setNotification(
				{
					message: `A new blog '${newBlog.title}' by '${newBlog.author}' added`
				},
				3
			))	
		} catch (e) {
			dispatch(setNotification(
				{
					message: e.response.data.error,
					type: 'error'
				},
				3
			))		
		}
	}
}


export const removeBlog = (blog) => {
	return async (dispatch) => {
		try {
			await blogService.remove(blog.id)
			dispatch(deleteBlog(blog.id))
			dispatch(setNotification(
				{
					message: `The blog' ${blog.title}' by '${blog.author} removed`
				},
				3
			))
		} catch (e) {
			dispatch(setNotification(
				{
					message: error.response.data,
					type: 'error'
				}
			))
		}		
	}
}

export const likeBlog = (blog) => {
	return async (dispatch) => {
		try {
			const likedBlog = await blogService.update(blog)
			dispatch(updateBlog(likedBlog))
			dispatch(setNotification(
				{
					message: `A like for the blog '${blog.title}' by '${blog.author}'`
				},
				3
			))
		} catch (e) {
			dispatch(setNotification(
				{
					message: e.response.data.error,
					type: 'error'
				}
			))
		}
	}
}

export default bloglistSlice.reducer
