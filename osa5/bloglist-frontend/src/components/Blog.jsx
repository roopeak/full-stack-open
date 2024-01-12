import React, { useState } from 'react'

const Blog = ({ blog, user, updateLike, updateRemove }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleLike = () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: user
    }

    updateLike(blog.id, updatedBlog)
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      updateRemove(blog.id)
    }
  }

  const isCurrentUser = blog.user.username === user.username

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {visible && blog.author}
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      </div>
      {visible && (
        <>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes} <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {isCurrentUser && <button onClick={handleRemove}>remove</button>}
        </>
      )}
    </div>
  )
}

export default Blog