const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const helper = require("./test_helper")
const Blog = require("../models/blog")

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

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

test("if neither title nor url field is provided, respond with 400 Bad Request", async () => {
  const newBlog = {
    author: "Pekka Puupää",
    likes: 3,
  }

  const response = await api.post("/api/blogs").send(newBlog)

  expect(response.status).toBe(400)
  expect(response.body.error).toBe("Title and url are required fields.")
})

test("deleting a blog by ID", async () => {
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

test("updating likes of a blog by id", async () => {
  const newBlog = new Blog({
      title: "Uusi blogi",
      author: "Pekka Rautapää",
      url: "www.bloglist.com",
      likes: 5,
  })

  const savedBlog = await newBlog.save()

  const blogId = savedBlog._id

  const newLikes = 10
  const response = await api.put(`/api/blogs/${blogId}`).send({ likes: newLikes })

  expect(response.body.likes).toBe(newLikes)

  const updatedBlog = await Blog.findById(blogId)
  expect(updatedBlog.likes).toBe(newLikes)
})

afterAll(async () => {
  await mongoose.connection.close()
})