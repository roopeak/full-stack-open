import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
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
<<<<<<< HEAD
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
=======
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
>>>>>>> c016d8338b600ab3438c67c83cd23af8bf3d17ec
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
<<<<<<< HEAD
    
=======

>>>>>>> c016d8338b600ab3438c67c83cd23af8bf3d17ec
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
<<<<<<< HEAD
      setUsername('')
      setPassword('')
    } catch (exception) {
      notifyWith('wrong username or password', 'error')
      setErrorMessage('wrong credentials')
=======
      setUsername("")
      setPassword("")
    } catch (exception) {
      notifyWith('wrong username or password', 'error')
>>>>>>> c016d8338b600ab3438c67c83cd23af8bf3d17ec
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

<<<<<<< HEAD
=======
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

>>>>>>> c016d8338b600ab3438c67c83cd23af8bf3d17ec
  const notifyWith = (message, type='info') => {
    setInfoMessage({
      message, type
    })

    setTimeout(() => {
      setInfoMessage(null)
    }, 5000)
  }

<<<<<<< HEAD
  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload(false)
    setUser(null)
  }
  
  const loginForm = () => (
    <div>
      <Notification info={infoMessage} />
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const blogForm = () => (
    <div>
      <Notification info={infoMessage} />
        <p>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>  
        </p>
      <div>
      <form onSubmit={addBlog}>
        <div>
          title:
            <input
            type='text'
            value={title}
            name='Title'
            onChange={({ target }) => setTitle(target.value)}
            />
        </div>
        <div>
          author:
            <input
            type='text'
            value={author}
            name='Author'
            onChange={({ target }) => setAuthor(target.value)}
            />
        </div>
        <div>
          url:
            <input
            type='text'
            value={url}
            name='URL'
            onChange={({ target }) => setUrl(target.value)}
            />
        </div>
        <button type='submit'>add blog</button>
      </form>
      </div>
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
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
=======
  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload(false)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification info={infoMessage} />
        <form onSubmit={handleLogin}>
          <div>
            username
              <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
              <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
>>>>>>> c016d8338b600ab3438c67c83cd23af8bf3d17ec
  }

  return (
    <div>
<<<<<<< HEAD
      <h2>blogs</h2>

      {!user && loginForm()} 
      {user && <div>

          {blogForm()}
        </div>  
      }

=======
        <h2>blogs</h2>
        <Notification info={infoMessage} />
        <p>
          {user.name} logged in 
          <button onClick={logout}>logout</button>
        </p>
        <h2>create new</h2>
        <form onSubmit={addBlog}>
          <div>
            title:
              <input
              type='text'
              value={title}
              name='Title'
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author:
              <input
              type='text'
              value={author}
              name='Author'
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url:
              <input
              type='text'
              value={url}
              name='Url'
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type="submit">create</button>
        </form>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
>>>>>>> c016d8338b600ab3438c67c83cd23af8bf3d17ec
    </div>
  )
}

export default App