import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [infoMessage, setInfoMessage] = useState(null)
	const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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
				<h2>login to application</h2>
				<Notification info={infoMessage} />
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
		<Togglable buttonLabel="new blog" ref={blogFormRef}>
			<BlogForm createBlog={addBlog} />
		</Togglable>
	)

  const addBlog = (blogObject) => {
		const title = blogObject.title
		const author = blogObject.author
		const url = blogObject.url

		if (title && author && url) {
			blogService
				.create(blogObject)
				.then(returnedBlog => {
					setBlogs(blogs.concat(returnedBlog))
				})

			notifyWith(`a new blog ${title} by ${author} added`, 'info')
			blogFormRef.current.toggleVisibility()
		} else {
			notifyWith(`Title, author and URL are mandatory`, 'error')
		}
  }

  const updateLike = async (id, updatedBlog) => {
    const response = await blogService.update(id, updatedBlog)

    setBlogs(
      blogs.map(
        (blog) =>
          (blog.id === response.id ? response : blog))
    ) 
  }

  const updateRemove = async (id) => {
    await blogService.remove(id)

    setBlogs(
      blogs.filter((blog) => blog.id !== id)
    )
  }

	const blogFormRef = useRef()

  return (
    <div>
      {!user && loginForm()}
      {user && <div>
        <h2>blogs</h2>
				<Notification info={infoMessage} />
        <p>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>  
        </p>
          {blogForm()}
        <div>
          {blogs
            .sort((a, b) => b.likes - a.likes)
              .map(blog =>
              <Blog 
                key={blog.id} 
                blog={blog} 
                user={user} 
                username={user.username}
                updateLike={updateLike} 
                updateRemove={updateRemove} 
              />
          )}
        </div>
        </div>
      }
    </div>
  )
}

export default App