import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [notificationMessage, setNotificationMessage] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationMessage('wrong username or password')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload(false)
    setUser(null)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    blogFormRef.current.toggleVisibility()

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNotificationMessage(`a new blog ${title} by ${author} added`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 4000)
        setNewBlog('')
        setTitle('')
        setAuthor('')
        setUrl('')
      })
  }

  const updateLike = async (id, updatedBlog) => {
    try {
      const response = await blogService.update(id, updatedBlog)
      setBlogs(
        blogs.map((blog) => (blog.id === response.id ? response : blog))
      )
    } catch (exception) {
      setNotificationMessage(exception.response.data.error)
    }
  }

  const updateRemove = async (id) => {
    await blogService.remove(id)
    setBlogs(blogs.filter((blog) => blog.id !== id))
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notificationMessage} />
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMessage} />
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm
          title={title}
          author={author}
          url={url}
          handleTitleChange={({ target }) => setTitle(target.value)}
          handleAuthorChange={({ target }) => setAuthor(target.value)}
          handleUrlChange={({ target }) => setUrl(target.value)}
          handleSubmit={addBlog}
        />
      </Togglable>
      <div>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              updateLike={updateLike}
              user={user}
              updateRemove={updateRemove}
            />
          )}
      </div>
    </div>
  )
}

export default App