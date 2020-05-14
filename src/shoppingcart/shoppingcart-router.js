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

  cartRouter
  .route('/:id')

  .all((req, res, next) => {
    const { id } = req.params
    ShoppingCartService.getById(req.app.get('db'), id)
      .then(cart => {
        if (!cart) {
          logger.error(`Cart with id ${id} not found.`)
          return res.status(404).json({
            error: { message: `Cart Not Found` }
          })
        }
        res.cart = cart
        next()
      })
      .catch(next)
  })

  .get((req, res) => {
    res.json(res.cart)
  })

module.exports = cartRouter