const path = require('path')
const express = require('express')
const xss = require('xss')
const logger = require('../logger')
const UsersService = require('./users-service')

const userRouter = express.Router()
const jsonBodyParser = express.json()

const serializeUsers = user => ({
  id: user.id,
  username: user.username
})

userRouter
  //creates new user
  .post('/', jsonBodyParser, (req, res, next) => {
    const { password, username } = req.body
    //first confirms required information is present
    for (const field of ['username', 'password'])
      if(!req.body[field])
        return res.status(400).json({
          error: `Missing '${field}' in request body`
        })
      
      const passwordError = UsersService.validatePassword(password)

      if(passwordError)
        return res.status(400).json({ error: passwordError})

      UsersService.hasUserWithUserName(
        req.app.get('db'),
        username
      )
        .then(hasUserWithUserName => {
          if(hasUserWithUserName)
            return res.status(400).json({ error: `Username already taken`})

            return UsersService.hashPassword(password)
              .then(hashedPassword => {
                const newUser = {
                  username,
                  password: hashedPassword
                }

              return UsersService.insertUser(
                req.app.get('db'),
                newUser
              )
              .then(user => {
                res
                  .status(201)
                  .location(path.posix.join(req.originalUrl, `/${user.id}`))
                  .json(UsersService.serializeUser(user))
              })
              })
        res.send('ok')
        })
      .catch(next)
  })

module.exports = userRouter