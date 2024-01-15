import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: title,
      author: author,
      url: url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            value={title}
            onChange={event => setTitle(event.target.value)}
            data-testid="title-input"
            id='blog-title'
          />
        </div>
        <div>
          author:
          <input
            value={author}
            onChange={event => setAuthor(event.target.value)}
            data-testid="author-input"
            id='blog-author'
          />
        </div>
        <div>
          url:
          <input
            value={url}
            onChange={event => setUrl(event.target.value)}
            data-testid="url-input"
            id='blog-url'
          />
        </div>
        <button id='create-button' type='submit'>create</button>
      </form>
    </div>
  )
}

export default BlogForm