const path = require('path')
const express = require('express')
const xss = require('xss')
const logger = require('../logger')
const OrdersService = require('./orders-service')

const ordersRouter = express.Router()
const jsonParser = express.json()

ordersRouter
  .route('/')

  .get((req, res, next) => {
    OrdersService.getAllOrders(req.app.get('db'))
    .then(orders => {
      res.json(orders)
    })
    .catch(next)
  })

ordersRouter
  .route('/:id')

  .all((req, res, next) => {
    const { id } = req.params
    OrdersService.getById(req.app.get('db'), id)
      .then(order => {
        if (!order) {
          logger.error(`Order with id ${id} not found.`)
          return res.status(404).json({
            error: { message: `Order Not Found` }
          })
        }
        res.order = order
        next()
      })
      .catch(next)
  })

  .get((req, res) => {
    res.json(res.order)
  })

ordersRouter
  .route('/cart/:cart_id')

  .all((req, res, next) => {
    const { cart_id } = req.params
    OrdersService.getByCartId(req.app.get('db'), cart_id)
      .then(orders => {
        if (!orders) {
          logger.error(`No orders were not found.`)
          return res.status(404).json({
            error: { message: `No Orders Found` }
          })
        }
        res.orders = orders
        next()
      })
      .catch(next)
  })

  .get((req, res) => {
    res.json(res.orders)
  })



  module.exports = ordersRouter