import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)

  const user = useSelector(state => state.login)

  const style = {
    marginBottom: 2,
    padding: 5,
    borderStyle: 'solid'
  }

  const remove = () => {
    const ok = window.confirm(
      `Sure you want to remove '${blog.title}' by ${blog.author}`)
    if (ok) {
      // dispatch(removeBlog(blog))
    }
  }

  const like = () => {
    const { id } = blog
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    }
    // dispatch(likeBlog(updatedBlog))
  }

  return (
    <div style={style} className='blog'>
      {blog.title} {blog.author}
      <button onClick={() => setVisible(!visible)}>
        {visible ? 'hide' : 'show'}
      </button>
      {visible&&
        <div>
          <div> <a href={blog.url}> {blog.url}</a> </div>
          <div>likes {blog.likes} <button onClick={like}>like</button></div>
          <div>{blog.user && blog.user.name}</div>
          {user.username === blog.user.username && (
            <button onClick={remove}>delete</button>
          )}
        </div>
      }
    </div>
  )
}

export default Blog