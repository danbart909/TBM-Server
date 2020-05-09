const path = require('path')
const express = require('express')
const xss = require('xss')
const logger = require('../logger')
const ShoppingCartService = require('./shoppingcart-service')

const cartRouter = express.Router()
const jsonParser = express.json()

const serializeCart = cart => ({
  id: cart.id
})

cartRouter
  .route('/')

  .get((req, res, next) => {
    ShoppingCartService.getAllCart(req.app.get('db'))
    .then(cart => {
      res.json(cart.map(serializeCart))
    })
    .catch(next)
  })


module.exports = cartRouter