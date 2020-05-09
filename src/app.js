require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const { NODE_ENV, API_TOKEN } = require('./config')
const validateBearerToken = require('./validate-bearer-token')
const errorHandler = require('./error-handler')
const productsRouter = require('./products/products-router')
const cartRouter = require('./shoppingcart/shoppingcart-router')
const userRouter = require('./users/users-router')

const app = express()

app
  .use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
    skip: () => NODE_ENV === 'test'
  }))
  .use(helmet())
  .use(cors())
  // .use(validateBearerToken)
  .use(express.json())
  .use('/api/products', productsRouter)
  .use('/api/cart', cartRouter)
  .use('/api/users', userRouter)

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

app.use(errorHandler)

module.exports = app