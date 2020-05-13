const path = require('path')
const express = require('express')
const xss = require('xss')
const logger = require('../logger')
const ProductsService = require('./products-service')

const productsRouter = express.Router()
const jsonParser = express.json()

const serializeProduct = product => ({
  id: product.id,
  title: product.title,
  description: product.description,
  category: product.category,
  price: product.price,
  url: product.url
})

productsRouter
.route('/categories')

.get((req, res, next) => {
  // const { searchterm } = req.query
  // ProductsService.getByTitle(req.app.get('db'), searchterm)
  ProductsService.getCategories(req.app.get('db'))
    .then(products => {
      res.json(products.map(serializeProduct))
    })
    .catch(next)
})

.get((req, res) => {
  res.json(serializeProduct(res.product))
})


productsRouter
.route('/search')

.get((req, res, next) => {
  const { searchterm } = req.query
  ProductsService.getByTitle(req.app.get('db'), searchterm)
    .then(products => {
      res.json(products.map(serializeProduct))
    })
    .catch(next)
})

.get((req, res) => {
  res.json(serializeProduct(res.product))
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
  .route('/category/:category')

  .all((req, res, next) => {
    const { category } = req.params
    ProductsService.getByCategory(req.app.get('db'), category)
      .then(category => {
        if (!category) {
          logger.error(`No products in category ${category} found.`)
          return res.status(404).json({
            error: { message: `Category Not Found` }
          })
        }
        res.category = category
        next()
      })
      .catch(next)
  })

  .get((req, res) => {
    res.json(res.category)
  })

productsRouter
  .route('/:id')

  .all((req, res, next) => {
    const { id } = req.params
    ProductsService.getById(req.app.get('db'), id)
      .then(product => {
        if (!product) {
          logger.error(`Product with id ${id} not found.`)
          return res.status(404).json({
            error: { message: `Product Not Found` }
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



  module.exports = productsRouter