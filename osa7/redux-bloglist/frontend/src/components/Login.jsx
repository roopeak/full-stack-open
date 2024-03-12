import { useState } from 'react'
import { useDispatch } from "react-redux"
import { userLogin } from '../reducers/loginReducer'

const LoginForm = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const handleSubmit = async (event) => {
    event.preventDefault()
    const userCredentials = {
      username: username,
      password: password
    }

    dispatch(userLogin(userCredentials))

    setUsername('')
    setPassword('')
  }

  return (
    <div>
    <h2>Log in to application</h2>

    <form onSubmit={handleSubmit}>
      <div>
        username
        <input
          id='username'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id='password'
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login-button' type="submit">
        login
      </button>
    </form>
    </div>
  )
}

export default LoginForm