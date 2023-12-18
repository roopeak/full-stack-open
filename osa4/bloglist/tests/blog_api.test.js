const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const helper = require("./test_helper")
const Blog = require("../models/blog")

beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/)
})

test("blog indentification field is id", async () => {
  const response = await api.get("/api/blogs")
  const allIds = response.body.map((blog) => blog.id)
  allIds.forEach(id => expect(id).toBeDefined())
})

test("can add a blog via HTTP POST", async () => {
  const initialBlogs = await Blog.find({})

  const newBlog = {
    title: "async/await simplifies making async calls",
    author: "Pekka Puupää",
    url: "www.bloglist.com",
    likes: 10,
  }

  await api.post('/api/blogs').send(newBlog).expect(201)

  const finalBlogs = await Blog.find({})

  expect(finalBlogs).toHaveLength(initialBlogs.length + 1)
})


test("if likes field is not provided, set it to 0", async () => {
  const newBlog = {
    title: "async/await simplifies making async calls",
    author: "Pekka Puupää",
    url: "www.bloglist.com",
  }

  if (newBlog.likes == undefined)
  {
      newBlog["likes"] = 0
      const response = await api.post('/api/blogs').send(newBlog)

      expect(response.status).toBe(201)
      expect(response.body.likes).toBe(0)
  }
  else
  {
      const response = await api.post('/api/blogs').send(newBlog)
      expect(response.status).toBe(201)
  }
})

afterAll(async () => {
  await mongoose.connection.close()
})