const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogs have an id field', async () => {
  const response = await api.get('/api/blogs')
  const allIds = response.body.map(blog => blog.id)
  allIds.forEach(id => expect(id).toBeDefined())
})

after(async () => {
  await mongoose.connection.close()
})