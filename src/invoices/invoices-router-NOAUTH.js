const path = require('path')
const express = require('express')
const xss = require('xss')
const logger = require('../logger')
const InvoiceService = require('./invoices-service')
const { requireAuth } = require('../middleware/jwt-auth')

const invoiceRouter = express.Router()
const jsonParser = express.json()
// const db = req.app.get('db')

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
    // const user_id = req.user_id
    const { user_id, product_id, quantity } = req.body

    InvoiceService.getCurrentCartId(req.app.get('db'), user_id)
      .then(invoice_id_raw => {
          let invoice_id = Number(invoice_id_raw)
          let newInvoice = {invoice_id, product_id, user_id, quantity}
        InvoiceService.insertInvoice(req.app.get('db'), newInvoice)
          .then(invoice => {
            res
              .status(201)
              // .location(path.posix.join(req.originalUrl, `${invoice.id}`))
              .json(invoice)
          })
        .catch(next)
      })
      .catch(next)
  })

  .delete((req, res, next) => {
    const { user_id } = req.body

    InvoiceService.getCurrentCartId(req.app.get('db'), user_id)
      .then(invoice_id_raw => {
          let invoice_id = Number(invoice_id_raw)
          InvoiceService.emptyCart(req.app.get('db'), invoice_id)
          .then(() => {
            logger.info(`Items in cart with id ${invoice_id} deleted.`)
            res.status(204).end()
          })
          .catch(next)
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
    const { id: product_id } = req.params
    const { user_id } = req.body

    InvoiceService.getCurrentCartId(req.app.get('db'), user_id)
      .then(invoice_id_raw => {
          let invoice_id = Number(invoice_id_raw)
          InvoiceService.deleteItemInCart(req.app.get('db'), invoice_id, product_id)
          .then(() => {
            logger.info(`Items in cart with id ${invoice_id} deleted.`)
            res.status(204).end()
          })
          .catch(next)
      })
      .catch(next)
  })



invoiceRouter
  .route('/invoice/:id')

  .all((req, res, next) => {
    const { id } = req.params
    InvoiceService.getInvoice(req.app.get('db'), id)
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

  // .delete((req, res, next) => {
  //   const { user_id } = req.body

  //   InvoiceService.getCurrentCartId(req.app.get('db'), user_id)
  //     .then(invoice_id_raw => {
  //       res
  //         .status(201)
  //         let invoice_id = Number(invoice_id_raw)
  //         InvoiceService.emptyCart(req.app.get('db'), invoice_id)
  //         .then(() => {
  //           logger.info(`Items in cart with id ${invoice_id} deleted.`)
  //           res.status(204).end()
  //         })
  //         .catch(next)
  //     })
  //     .catch(next)
  // })



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
    // const { user_id } = req.params
    const { user_id } = req.body
    const checked_out = true

    InvoiceService.closeInvoice(req.app.get('db'), user_id, checked_out)
      .then(() => {
        res.status(204)
        InvoiceService.createNewCart(req.app.get('db'), user_id)
          .then(() => {
            res.status(204).end()
          })
          .catch(next)
      })
      .catch(next)
    // InvoiceService.createNewCart(req.app.get('db'), user_id)
    //       .then(() => {
    //         res.status(204).end()
    //       })
    //       .catch(next)
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















    // .post(jsonParser, (req, res, next) => {
    //   // const user_id = req.user_id
    //   const user_id = 1
    //   const { product_id, quantity } = req.body
    //   let invoiceID = ''
  
    //   InvoiceService.getCurrentCartId(req.app.get('db'), user_id)
    //     .then(id => {
    //       res
    //         .status(201)
    //         .location(path.posix.join(req.originalUrl, `${id}`))
    //         .json(id)
    //         invoiceID = id
    //     })
    //     .catch(next)
      
    //   InvoiceService.insertInvoice(req.app.get('db'), invoiceID, product_id, quantity)
    //     .then(item => {
    //       console.log(invoiceID, product_id, quantity, item)
    //       logger.info(`Invoice with id ${item.id} created.`)
    //       res
    //         .status(201)
    //         .location(path.posix.join(req.originalUrl, `${item.id}`))
    //         .json(item) 
    //     })
    //     .catch(next)
    //   })