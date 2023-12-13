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

test('blog identifiation field is id', async () => {
    const response = await api.get('/api/blogs')
    const allIds = response.body.map((blog) => blog.id)
    allIds.forEach(id => expect(id).toBeDefined())
})

afterAll(async () => {
    await mongoose.connection.close()
})