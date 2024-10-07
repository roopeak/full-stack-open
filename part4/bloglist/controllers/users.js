const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (username && password) {
    if (username.length > 3 && password.length > 3) {
      const findUser = await User.findOne({ username })
      
      if (findUser) {
        return response.status(400).json({
          error: 'username already exists'
        })
      }

      const saltRounds = 10
      const passwordHash = await bcrypt.hash(password, saltRounds)
    
      const user = new User({
        username,
        name,
        passwordHash
      })
    
      const savedUser = await user.save()
    
      response.status(201).json(savedUser)
    } else {
      return response.status(400).json({
        error: 'username and password has to be over three characters long'
      })
    }
  } else {
    return response.status(400).json({
      error: 'username and password has to exist'
    })
  }
})

module.exports = usersRouter