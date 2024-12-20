import { useState, useEffect, createRef } from "react";
import { useDispatch, useSelector } from "react-redux";


import { initializeBlogs } from "./reducers/bloglistReducer";
import { login, userLogout } from './reducers/loginReducer'
import { initializeUsers } from "./reducers/userReducer";

import storage from "./services/storage";
import Login from "./components/Login";
import BlogList from './components/BlogList'
import Blog from "./components/Blog";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import Users from "./components/Users";
import User from './components/User'
import Navigation from "./components/Navigation";

import { Routes, Route } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.login)
  
  const blogFormRef = createRef();

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch]);

  useEffect(() => {
    const userFromStorage = storage.loadUser();
    if (userFromStorage) {
      dispatch(login(userFromStorage))
    }
  }, [dispatch]);

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
      <Navigation />
      <h2>blog app</h2>
      <Notification />
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <NewBlog />
      </Togglable>
      <Routes>
        <Route path='/' element={<BlogList />} />
        <Route path='/blogs/:id' element={<Blog />} />
        <Route path='/users' element={<Users />} />
        <Route path='/users/:id' element={<User />} />
      </Routes>
    </div>
  );
};

export default App;
