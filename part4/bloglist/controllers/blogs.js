const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', (request, response) => {
  const { title, author, url, likes } = request.body

  if (!title || !url) {
    return response.status(400).json({ 
      error: 'Title and url are required fields.'})
  }

  const newBlog = new Blog({
    title,
    author,
    url,
    likes: likes !== undefined ? likes : 0
  })

  newBlog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

blogsRouter.delete('/:id', async (request, response) => {
  const blogId = request.params.id
  const blog = await Blog.findById(blogId)

  if (blog) {
    await Blog.findByIdAndDelete(blogId)
    response.status(204).end()
  } else {
    response.status(404).json({ error: 'Blog not found' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const blogId = request.params.id
  const { likes } = request.body

  const blog = await Blog.findById(blogId)

  if (blog) {
    blog.likes = likes
    const updatedBlog = await blog.save()
    response.json(updatedBlog)
  } else {
    response.status(404).json({ error: 'Blog not found' })
  }
})

module.exports = blogsRouter