import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { userLogout} from '../reducers/loginReducer'

const Navigation = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.login)

  const handleLogout = () => {
    dispatch(userLogout())
  }

  const padding = {
    padding: 5
  }

  const navStyle = {
    display: 'flex',
    alignItems: 'center',
  }

  return (
    <div style={navStyle}>
      <div>
        <Link style={padding} to={'/'}>blogs</Link>
        <Link style={padding} to={'/users'}>users</Link>
      </div>
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
    </div>
  )
}

export default Navigation