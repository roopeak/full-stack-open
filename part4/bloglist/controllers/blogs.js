const blogsRouter = require('express').Router()
const { response } = require('express')
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog.find({})
    .then(notes => {
      response.json(notes)
    })
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.title,
    url: body.url,
    likes: body.likes
  })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async(request, response) => {
  const blogId = request.params.id
  const blog = await Blog.findById(blogId)

  if (blog) {
    await Blog.findByIdAndDelete(blogId)
    response.status(204).end()
  } else {
    response.status(404).json({ error: 'Blog not found' })
  }
})

module.exports = blogsRouter