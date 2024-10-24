import { useDispatch } from "react-redux";
import { useField } from "../hooks/hooks";
import { userLogin } from "../reducers/loginReducer";


const Login = ({ doLogin }) => {
  const { reset: resetUsername, ...username } = useField("text");
  const { reset: resetPassword, ...password } = useField("password");

  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault();

    const credentials = {
      username: username.value,
      password: password.value
    }

    dispatch(userLogin(credentials))
    resetUsername()
    resetPassword()
  };

  return (
    <form onSubmit={handleLogin}>
      <label>
        Username:
        <input {...username} />
      </label>
      <label>
        Password:
        <input {...password} />
      </label>
      <input type="submit" value="Login" />
    </form>
  );
};

export default Login;
