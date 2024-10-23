import { useState, useEffect, createRef } from "react";

import BlogList from './components/BlogList'
import { initializeBlogs } from "./reducers/bloglistReducer";
import { useDispatch } from "react-redux";

import blogService from "./services/blogs";
import loginService from "./services/login";
import storage from "./services/storage";
import Login from "./components/Login";
import Blog from "./components/Blog";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const [user, setUser] = useState(null);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch]);

  useEffect(() => {
    const user = storage.loadUser();
    if (user) {
      setUser(user);
    }
  }, []);

  const blogFormRef = createRef();

  const handleLogin = async (credentials) => {
    const user = await loginService.login(credentials);
    setUser(user);
    storage.saveUser(user);
  };

  const handleVote = async (blog) => {
    console.log("updating", blog);
    const updatedBlog = await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1,
    });

    setBlogs(blogs.map((b) => (b.id === blog.id ? updatedBlog : b)));
  };

  const handleLogout = () => {
    setUser(null);
    storage.removeUser();
  };

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id);
      setBlogs(blogs.filter((b) => b.id !== blog.id));
    }
  };

  if (!user) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        <Login doLogin={handleLogin} />
      </div>
    );
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <NewBlog />
      </Togglable>
      <BlogList />
    </div>
  );
};

export default App;
