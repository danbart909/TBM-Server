const path = require('path')
const express = require('express')
const xss = require('xss')
const logger = require('../logger')
const InvoiceService = require('./invoices-service')
const { requireAuth } = require('../middleware/jwt-auth')

const invoiceRouter = express.Router()
const jsonParser = express.json()

invoiceRouter
  .route('/')

  .get((req, res, next) => {
    InvoiceService.getAllInvoices(req.app.get('db'))
    .then(invoices => {
      res.json({invoices})
    })
    .catch(next)
  })

  .post(jsonParser, (req, res, next) => {
    const { invoice_id, product_id, quantity } = req.body
    const newItem = { invoice_id, product_id, quantity }

    InvoiceService.insertInvoice(req.app.get('db'), newItem)
      .then(item => {
        logger.info(`Product with id ${item.id} created.`)
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `${item.id}`))
          .json(item)
      })
      .catch(next)
  })

invoiceRouter
  .route('/:id')

  .all((req, res, next) => {
    const { id } = req.params
    InvoiceService.getCartByUser(req.app.get('db'), id)
      .then(invoice => {
        if (!invoice) {
          logger.error(`Invoice ${id} not found.`)
          return res.status(404).json({
            error: { message: `Invoice ${id} not found.` }
          })
        }
        res.invoice = invoice
        next()
      })
      .catch(next)
  })

  .get((req, res) => {
    res.json(res.invoice)
  })

  .patch(jsonParser, (req, res, next) => {
    const { id } = req.params
    const { quantity } = req.body

    InvoiceService.updateInvoice(req.app.get('db'), id, quantity)
      .then(() => {
        res.status(204).end()
      })
      .catch(next)
  })

  .delete((req, res, next) => {
    const { id } = req.params
    InvoiceService.deleteInvoice(req.app.get('db'), id)
    .then(() => {
      logger.info(`Product with id ${id} deleted.`)
      res.status(204).end()
    })
    .catch(next)
  })

invoiceRouter
  .route('/history/:id')

  .all((req, res, next) => {
    const { id } = req.params
    InvoiceService.getHistoryByUser(req.app.get('db'), id)
      .then(invoice => {
        if (!invoice) {
          logger.error(`Invoice ${id} not found.`)
          return res.status(404).json({
            error: { message: `Invoice ${id} not found.` }
          })
        }
        res.invoice = invoice
        next()
      })
      .catch(next)
  })

  .get((req, res) => {
    res.json(res.invoice)
  })

  .patch(jsonParser, (req, res, next) => {
    const { id } = req.params
    const { checked_out } = req.body

    InvoiceService.closeInvoice(req.app.get('db'), id, checked_out)
      .then(() => {
        res.status(204).end()
      })
      .catch(next)
  })

  module.exports = invoiceRouter









    // // .post(requireAuth, jsonParser, (req, res, next) => {
    //   .post(jsonParser, (req, res, next) => {
    //     const { cart_id, product_id, quantity } = req.body
    //     const newItem = { cart_id, product_id, quantity }
    //     const db = req.app.get('db')
    //     // newItem.user_id = req.user.id
    
    //     // for (const field of ['product_id', 'quantity']) {
    //     //   if (!newItem[field]) {
    //     //     logger.error(`${field} is required`)
    //     //     return res.status(400).send({
    //     //       error: { message: `'${field}' is required` }
    //     //     })
    //     //   }
    //     // }