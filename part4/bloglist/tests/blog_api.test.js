const { test, after, beforeEach } = require('node:test')
const assert = require('assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
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
  allIds.forEach(id => assert.ok(id, 'ID should be defined'))
})

test('a valid blog can be added', async () => {
  const newBlog = {
    author: 'Test Author',
    title: 'Test Title',
    url: 'www.testwebsite.com',
    likes: 0
  }

  const blogsBeforePost = await api.get('/api/blogs')
  const blogsBeforePostLength = blogsBeforePost.body.length

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const responseAfterAdd = await api.get('/api/blogs')
  const blogsAfterPost = responseAfterAdd.body

  assert.strictEqual(blogsAfterPost.length, blogsBeforePostLength + 1)

  const titles = blogsAfterPost.map(blog => blog.title)
  assert.ok(titles.includes(newBlog.title), 'New blog title should be in the list')
})

test('if likes is not added make it zero', async () => {
  const newBlog = {
    author: 'Test Like',
    title: 'Test for like',
    url: 'www.testforlike.com'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const responseAfterAdd = await api.get('/api/blogs')
  const blogsAfterPost = responseAfterAdd.body

  const addedBlog = blogsAfterPost.find(blog => blog.title === newBlog.title)
  assert.strictEqual(
    addedBlog.likes, 
    0, 
    'Likes should default to 0 if not provided'
  )
})

test('if title is not provided response is 400', async () => {
  const newBlogWithoutTitle = {
    author: 'Test without title',
    url: 'www.example.com'
  }

  await api
    .post('/api/blogs')
    .send(newBlogWithoutTitle)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('if url is not provided, response is 400', async () => {
  const newBlogWithoutUrl = {
    title: 'Missing URL test',
    author: 'Test without url'
  }

  await api
    .post('/api/blogs')
    .send(newBlogWithoutUrl)
    .expect(400)
    .expect('Content-Type', /application\/json/)    
})

test.only('a blog can be deleted', async () => {
  const newBlog = {
    title: 'Blog to be Deleted',
    author: 'Delete Blog',
    url: 'www.blogtobedeleted.com',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)    

  const responseAfterAdd = await api.get('/api/blogs')
  const blogsAfterPost = responseAfterAdd.body

  const addedBlog = blogsAfterPost.find(blog => blog.title === newBlog.title)
  const newBlogId = addedBlog.id

  await api
    .delete(`/api/blogs/${newBlogId}`)
    .expect(204)

  const deletedBlog = await Blog.findById(newBlogId)
  assert.strictEqual(deletedBlog, null)
})

test.only('a blog can be edited', async () => {
  const newBlog = {
    title: 'Blog to be edited',
    author: 'Blog editor',
    url: 'www.example.com',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const responseAfterAdd = await api.get('/api/blogs')
  const blogsAfterPost = responseAfterAdd.body

  const addedBlog = blogsAfterPost.find(blog => blog.title === newBlog.title)
  const newBlogId = addedBlog.id

  await api
    .put(`/api/blogs/${newBlogId}`)
    .send({ likes: 10 })

  const responseAfterEdit = await api.get('/api/blogs')
  const blogsAfterEdit = responseAfterEdit.body
  
  const updatedBlog = blogsAfterEdit.find(blog => blog.title === newBlog.title)
  assert.strictEqual(updatedBlog.likes, 10)
  
})

after(async () => {
  await mongoose.connection.close()
})