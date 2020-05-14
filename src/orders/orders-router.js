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



  module.exports = ordersRouter