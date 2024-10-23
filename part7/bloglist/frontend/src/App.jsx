import { useState, useEffect, createRef } from "react";

import BlogList from './components/BlogList'
import { initializeBlogs } from "./reducers/bloglistReducer";
import { login, userLogout } from './reducers/loginReducer'
import { useDispatch, useSelector } from "react-redux";

import blogService from "./services/blogs";
import loginService from "./services/login";
import storage from "./services/storage";
import Login from "./components/Login";
import Blog from "./components/Blog";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import { Routes, Route } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.login)
  const blogFormRef = createRef();

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch]);

  useEffect(() => {
    const userFromStorage = storage.loadUser();
    if (userFromStorage) {
      dispatch(login(userFromStorage))
    }
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(userLogout())
  };

  if (!user) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        <Login />
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
      <Routes>
        <Route path='/' element={<BlogList />} />
        <Route path='/blogs/:id' element={<Blog />} />
      </Routes>
    </div>
  );
};

export default App;
