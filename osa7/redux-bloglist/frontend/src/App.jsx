import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

import BlogList from './components/BlogList'
import LoginForm from './components/Login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import userService from "./services/user"

import { initializeBlogs } from "./reducers/bloglistReducer"
import { initializeUser } from './reducers/userReducer'
import { login, userLogin, userLogout } from './reducers/loginReducer'
import Users from './components/Users'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.login)

  const blogFormRef = useRef()

  const handleLogout = () => {
    dispatch(userLogout())
  }

  useEffect(() => {
    const userFromStorage = userService.getUser()
    if (userFromStorage) {
      dispatch(login(userFromStorage));
    }
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
  }, [])

  if (user === null) {
    return (
      <LoginForm />
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged in
      </div>
      <button onClick={handleLogout}>logout</button>
      <Togglable buttonLabel='new note' ref={blogFormRef}>
        <NewBlog />
      </Togglable>
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<BlogList />} />
      </Routes>
    </div>
  )
}

  
export default App