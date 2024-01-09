import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [infoMessage, setInfoMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => {
        setBlogs(blogs)
      })  
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
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      notifyWith('wrong username or password', 'error')
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const notifyWith = (message, type='info') => {
    setInfoMessage({
      message, type
    })

    setTimeout(() => {
      setInfoMessage(null)
    }, 5000)
  }

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload(false)
    setUser(null)
  }
  
  const loginForm = () => (
    <div>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </div>
  )

  const blogForm = () => (
    <div>
      <h2>create new</h2>
      <BlogForm
        title={title}
        author={author}
        url={url}
        handleTitleChange={({ target }) => setTitle(target.value)}
        handleAuthorChange={({ target }) => setAuthor(target.value)}
        handleUrlChange={({ target }) => setUrl(target.value)}
        handleSubmit={addBlog}
      />
    </div>
  )

  const addBlog = (event) => {
    event.preventDefault()
    
    const blogObject = {
      title: title,
      author: author,
      url: url,
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlog('')
      })

    notifyWith(`a new blog ${title} by ${author} added`, 'info')

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <Notification info={infoMessage} />
      {!user && loginForm()} 
      {user && <div>
        <h2>blogs</h2>
        <p>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>  
        </p>
          {blogForm()}
        <div>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
        </div>
      }
    </div>
  )
}

export default App