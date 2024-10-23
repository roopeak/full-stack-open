import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useField } from "../hooks/hooks";
import { createBlog } from '../reducers/bloglistReducer'

const NewBlog = () => {
  const dispatch = useDispatch()

  const { reset: resetTitle, ...title } = useField("text");
  const { reset: resetAuthor, ...author } = useField("text");
  const { reset: resetUrl, ...url } = useField("text");

  const handleSubmit = (event) => {
    event.preventDefault();

    const blog = {
      title: title.value,
      author: author.value,
      url: url.value
    }

    resetTitle()
    resetAuthor()
    resetUrl()

    dispatch(createBlog(blog))
  };

  return (
    <div>
      <h2>Create a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input {...title}/>
        </div>
        <div>
          <label>URL:</label>
          <input {...url}/>
        </div>
        <div>
          <label>Author:</label>
          <input {...author}/>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default NewBlog;
