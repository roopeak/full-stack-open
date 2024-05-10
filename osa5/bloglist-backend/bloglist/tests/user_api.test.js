const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const User = require("../models/user")

test("test if user is unique", async () => {
    const initialUsers = await User.find({})
  
    const newUser = {
        username: "mluukkai",
        name: "Matti Luukkainen",
        password: "salainen"
    }
  
    const result = await api
        .post('/api/users')
        .send(newUser).expect(400)
        .expect("Content-Type", /application\/json/)

    expect(result.body.error).toContain("username already exists")
})
  
test("if password is missing", async () => {
    const initialUsers = await User.find({})

    const newUser = {
        username: "hessu",
        name: "Hessu Hopo"
    }

    const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/)

    expect(result.body.error).toContain("username and password has to exist")
})

test("if username is missing", async () => {
    const initialUsers = await User.find({})

    const newUser = {
        name: "Aku Ankka",
        password: "ankkalinna"
    }

    const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/)

    expect(result.body.error).toContain("username and password has to exist")
})

test("username and password must be over three characters long", async () => {
    const initialUsers = await User.find({})

    const newUser = {
        username: "hupu",
        name: "a",
        password: "a"
    }

    const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/)

    expect(result.body.error).toContain(
        "username and password has to be over three characters long"
    )
})