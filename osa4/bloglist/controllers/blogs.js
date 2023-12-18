const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
    const { title, author, url, likes } = request.body

    if (!title || !url) 
    {
      return response.status(400).json({ error: 'Title and url are required fields.' })
    }
  
    const newBlog = new Blog({
      title,
      author,
      url,
      likes: likes !== undefined ? likes : 0,
    })
  
    const savedBlog = await newBlog.save()
  
    response.status(201).json(savedBlog)
})

module.exports = blogsRouter