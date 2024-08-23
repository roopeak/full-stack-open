const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    title: "Example blog",
    author: "Evan Example",
    url: "www.example.com",
    likes: 0
  },
  {
    title: "An another example",
    author: "Eric Example",
    url: "www.example.com",
    likes: 0
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogs have an id field', async () => {
  const response = await api.get('/api/blogs')
  const allIds = response.body.map((blog) => blog.id)
  // allIds.forEach(id => expect(id).toBeDefined())
})

test('blogs can be added with POST request', async () => {
  const newBlog = {
    title: "Adventures",
    author: "Aaron Adventurer",
    url: "www.example.com",
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialBlogs.length + 1)
})

test('deleting a blog by ID', async () => {
  const newBlog = new Blog({
    title: "Pekka Puupään blogi",
    author: "Pekka Puupää",
    url: "www.bloglist.com",
    likes: 5,
  })

  const savedBlog = await newBlog.save()

  const blogId = savedBlog._id

  await api.delete(`/api/blogs/${blogId}`).expect(204)

  const deletedBlog = await Blog.findById(blogId)
  expect(deletedBlog).toBeNull()
})

after(async () => {
  await mongoose.connection.close()
})