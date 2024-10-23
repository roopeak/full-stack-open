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
    updateBlog(state, action) {
      const updatedBlog = action.payload;
      const { id } = updatedBlog;
      return state.map((blog) => (blog.id !== id ? blog : updatedBlog));
    },
    deleteBlog(state, action) {
      const id = action.payload;
      return state.filter(blog => blog.id !== id);
    },
  }
})

export const {
  setBlogs,
  appendBlog,
  updateBlog,
  deleteBlog
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
            type: "success", }, 5 )
      );
    } catch (error) {
      dispatch(
        setNotification(
          { message: error.response.data.error, type: "error" }, 5 )
      );
    }
  };
};

export const removeBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blog.id);
      dispatch(deleteBlog(blog.id));
      dispatch(
        setNotification(
          { message: `${blog.title} by ${blog.author} removed!`, type: "success" }, 5)
      );
    } catch (error) {
      dispatch(
        setNotification(
          { message: error.response.data.error, type: "error" }, 5)
      );
    }
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    try {
      const id = blog.id
      const likedBlog = await blogService.update(id, blog);
      dispatch(updateBlog(likedBlog));
      dispatch(
        setNotification({ message: `${blog.title} liked`, type: "success" }, 5)
      );
    } catch (error) {
      dispatch(
        setNotification(
          { message: error.response.data.error, type: "error" },
          5
        )
      );
    }
  };
};

export default bloglistSlice.reducer