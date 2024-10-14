import { useState } from 'react'

const Blog = ({ blog, user, updateLike, updateRemove }) => {
  const [visible, setVisible] = useState(false)
  
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  console.log()
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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

  if (visible === false) {
    return (
      <div style={blogStyle}>
        {blog.title}
        <button onClick={toggleVisibility}>view</button>
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author}
          <button onClick={toggleVisibility}>hide</button>
        </div>
        <div>
          {blog.url}
        </div>
        <div>
          likes {blog.likes}
          <button onClick={handleLike}>like</button>
        </div>
        <div>
          {user.name}
        </div>
        {isCurrentUser && <button onClick={handleRemove}>remove</button>}
      </div>  
    )
  }

}

export default Blog