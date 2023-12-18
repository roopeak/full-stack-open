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

afterAll(async () => {
  await mongoose.connection.close()
})