import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { removeBlog, likeBlog } from '../reducers/bloglistReducer'

const Blog = () => {
  const dispatch = useDispatch()
  const { id } = useParams()

  const blog = useSelector(
    (state) => state.blogs ? state.blogs.find((blog) => blog.id === id) : null)
  const user = useSelector(state => state.login)

  if (!blog) {
    return <div>Loading blog data...</div>
  }

  const remove = () => {
    const ok = window.confirm(
      `Sure you want to remove '${blog.title}' by ${blog.author}`)
    if (ok) {
      dispatch(removeBlog(blog))
    }
  }

  const like = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user
    }
    dispatch(likeBlog(updatedBlog))
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>
        <div> <a href={blog.url}> {blog.url}</a> </div>
        <div>likes {blog.likes} <button onClick={like}>like</button></div>
        {user.username === blog.user.username && (
          <button onClick={remove}>delete</button>
        )}
        <div>added by {blog.user.name}</div>
      </div>
    </div>
  )
}

export default Blog