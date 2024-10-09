const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate("user", { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body

  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  if (!title || !url) {
    return response.status(400).json({ 
      error: 'Title and url are required fields.'})
  }

  const newBlog = new Blog({
    title,
    author,
    url,
    likes: likes !== undefined ? likes : 0,
    user: user._id
  })

  const savedBlog = await newBlog.save()
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const token = request.token
  const user = request.user

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!(token && decodedToken.id)) {
      return response.status(401).json({ error: 'token invalid' })
    }

    const blogId = request.params.id
    const blog = await Blog.findById(blogId)

    if (blog.user.toString() === decodedToken.id) {
      await Blog.findByIdAndDelete(blogId)
      response.sendStatus(200)
    } else {
      response.status(404).json({ error: 'Blog not found' })
    }
  } catch {
    return response.status(401).json({ error: 'token invalid' })
  }
})

blogsRouter.get('/:id', async (request, response) => {
  const blogId = request.params.id
  const blog = await Blog.findById(blogId)

  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
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