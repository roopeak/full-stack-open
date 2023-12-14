const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')

blogsRouter.get('/', async (request, response) => {
    const allBlogs = await Blog.find({})
    response.json(allBlogs)

    // Blog
    //   .find({})
    //   .then(blogs => {
    //     response.json(blogs)
    // })
})
  
blogsRouter.post('/', async (request, response) => {
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
  
    const savedBlog = await newBlog.save();
  
    response.status(201).json(savedBlog);

    // const blog = new Blog(request.body)

    // blog
    //     .save()
    //     .then(result => {
    //     response.status(201).json(result)
    // })
})
  
module.exports = blogsRouter