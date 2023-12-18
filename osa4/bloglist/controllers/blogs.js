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

blogsRouter.delete("/:id", async (request, response) => {
    const blogId = request.params.id

    const blog = await Blog.findById(blogId)

    if (blog)
    {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    }
    else
    {
        response.status(404).json({ error: "Blog not found" })
    }
})

blogsRouter.put("/:id", async (request, response) => {
    const blogID = request.params.id
    const { likes } = request.body

    const blog = await Blog.findById(blogID)

    if (blog)
    {
        blog.likes = likes
        const updategBlog = await blog.save()
        response.json(updategBlog)
    } 
    else
    {
        response.status(404).json({ error: "Blog not found" })
    }
})

module.exports = blogsRouter