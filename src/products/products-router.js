const path = require('path')
const express = require('express')
const xss = require('xss')
const logger = require('../logger')
const ProductsService = require('./products-service')

const productsRouter = express.Router()
const jsonParser = experss.json()

const serializeProduct = product => ({
  id: product.id,
  title: product.title,
  description: product.description,
  category: product.category,
  url: product.url
})

productsRouter
  .route('/')

  .get((req, res, next) => {
    ProductsService.getAllProducts(req.app.get('db'))
    .then(products => {
      res.json(products.map(serializeProduct))
    })
    .catch(next)
  })

productsRouter
  .route('/:product_id')

  .all((req, res, next) => {
    const { id } = req.params
    ProductsService.getById(req.app.get('db'), id)
      .then(product => {
        if (!product) {
          logger.error(`Product with id ${id} not found.`)
          return res.status(404).json({
            error: { message: `Any Not Found` }
          })
        }
        res.product = product
        next()
      })
      .catch(next)
  })

  .get((req, res) => {
    res.json(serializeProduct(res.product))
  })