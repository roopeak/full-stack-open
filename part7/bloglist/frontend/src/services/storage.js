import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/users'

const KEY = "blogUserKey";

const saveUser = (user) => {
  localStorage.setItem(KEY, JSON.stringify(user));
};

const loadUser = () => {
  const user = localStorage.getItem(KEY);
  return user ? JSON.parse(user) : null;
};

const me = () => {
  const user = loadUser();
  return user ? user.username : null;
};

const removeUser = () => {
  localStorage.removeItem(KEY);
};

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { saveUser, loadUser, removeUser, me, getAll };
