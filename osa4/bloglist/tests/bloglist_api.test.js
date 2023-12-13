const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/Blog')

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('blog identifiation field is id', async () => {
    const request = await api.get('/api/blogs')
    const allIds = request.body.map((blog) => blog.id)
    allIds.forEach(id => expect(id).toBeDefined())
})

test('can add a blog via HTTP POST', async () => {
    const initialBlogs = await Blog.find({})

    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'Pekka Puupää',
      url: 'https://example.com',
      likes: 10,
    }

    await api.post('/api/blogs').send(newBlog)

    const finalBlogs = await Blog.find({})

    expect(finalBlogs).toHaveLength(initialBlogs.length + 1)
})

afterAll(async () => {
    await mongoose.connection.close()
})