const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate("user", { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const { title, author, url, likes, userId } = request.body

  const decodedToken = jwt.verify(getTokenFrom(request),
  process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)


  if (!title || !url) {
    return response.status(400).json({ 
      error: 'Title and url are required fields.'})
  }

  // const user = await User.findById(userId)

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