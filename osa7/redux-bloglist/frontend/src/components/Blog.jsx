import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { removeBlog, likeBlog } from '../reducers/bloglistReducer'

const Blog = ({ blog, canRemove }) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)

  const style = {
    marginBottom: 2,
    padding: 5,
    borderStyle: 'solid'
  }

  const remove = () => {
    const ok = window.confirm(
      `Sure you want to remove '${blog.title}' by ${blog.author}`)
    if (ok) {
      dispatch(removeBlog(blog))
    }
  }

  const like = () => {
    const id = blog
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    }
    dispatch(likeBlog(updatedBlog))
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
          {canRemove&&<button onClick={remove}>delete</button>}
        </div>
      }
    </div>
  )
}

Blog.propTypes = {
  like: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  canRemove: PropTypes.bool,
  blog: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number
  })
}

export default Blog