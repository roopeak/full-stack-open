const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')

blogsRouter.get('/', async (request, response) => {
    const allBlogs = await Blog.find({})
    response.json(allBlogs)
})
  
blogsRouter.post('/', async (request, response, next) => {
    const { title, author, url, likes } = request.body;

    if (!title || !url) 
    {
      return response.status(400).json({ error: 'Title and url are required fields.' });
    }
  
    const newBlog = new Blog({
      title,
      author,
      url,
      likes: likes !== undefined ? likes : 0,
    });

    try {
        const savedBlog = await newBlog.save();
        response.status(201).json(savedBlog);
    } catch(exception) {
        next(exception)
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    const blogId = request.params.id

    const blog = await Blog.findById(blogId)

    if (blog)
    {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    }
    else
    {
        response.status(404).json({ error: 'Blog not found' })
    }
})
  
module.exports = blogsRouter