const { test, beforeEach, describe, after } = require('node:test');
const assert = require('assert')
const bcrypt = require('bcrypt');
const User = require('../models/user');
const helper = require('./test_helper');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

beforeEach(async () => {
  // Alustetaan tietokanta ennen jokaista testiä
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash('sekret', 10);
  const user = new User({ username: 'root', passwordHash });

  await user.save();
});

describe('when there is initially one user in the database', () => {
  
  test('creation fails with proper statuscode and message if username is too short', async () => {
    const newUser = {
      username: 'ro',
      name: 'Short Username',
      password: 'validpassword',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);


    assert(result.body.error.includes(
      'username and password has to be over three characters long',
      'Error message should mention if username is too short'
    ))

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, 1)
  });

  test('creation fails with proper statuscode and message if password is too short', async () => {
    const newUser = {
      username: 'validuser',
      name: 'Valid User',
      password: 'pw',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    assert(result.body.error.includes(
      'username and password has to be over three characters long',
      'Error message should mention if password is too short'
    ))

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, 1)    
  });

  test('creation fails with proper statuscode and message if username is missing', async () => {
    const newUser = {
      name: 'No Username',
      password: 'validpassword',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    assert(result.body.error.includes(
      'username and password has to exist',
      'Error message should mention missing username'
    ))

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, 1)
  });

  test('creation fails with proper statuscode and message if password is missing', async () => {
    const newUser = {
      username: 'validuser',
      name: 'Valid User',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    assert(result.body.error.includes(
      'username and password has to exist',
      'Error message should mention missing password'
    ))

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, 1)
  });
});

after(async () => {
  await mongoose.connection.close()
})