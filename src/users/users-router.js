const path = require('path')
const express = require('express')
const xss = require('xss')
const logger = require('../logger')
const UserService = require('./users-service')

const userRouter = express.Router()
const jsonParser = experss.json()

const serializeUsers = user => ({
  id: user.id,
  username: user.username
})

userRouter
  .router('/')

  .get((req, res, next) => {
    UserService.getAllUsers(req.app.get('db'))
    .then(users => {
      res.json(users.map(serializeCart))
    })
    .catch(next)
  })