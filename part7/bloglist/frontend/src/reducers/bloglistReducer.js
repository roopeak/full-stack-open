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
    }
  }
})

export const {
  setBlogs,
  appendBlog
} = bloglistSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blog);
      dispatch(appendBlog(newBlog));
      dispatch(
        setNotification(
          {
            message: `A new blog ${blog.title} by ${blog.author} added`,
            type: "success",
          }, 5
        )
      );
    } catch (error) {
      dispatch(
        setNotification(
          { message: error.response.data.error, type: "error" }, 5
        )
      );
    }
  };
};

export default bloglistSlice.reducer