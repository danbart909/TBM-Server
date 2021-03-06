const path = require("path");
const express = require("express");
const xss = require("xss");
const logger = require("../logger");
const InvoiceService = require("./invoices-service");
const { requireAuth } = require("../middleware/jwt-auth");

const invoiceRouter = express.Router();
const jsonParser = express.json();
// const db = req.app.get('db')

invoiceRouter
  .route("/")

  .all(requireAuth, (req, res, next) => {
    const user_id = req.user.id;
    console.log("ROUTE /", user_id);
    const id = user_id;
    InvoiceService.getCartByUser(req.app.get("db"), id)
      .then((cart) => {
        if (!cart) {
          logger.error(`Cart ${id} not found.`);
          return res.status(404).json({
            error: { message: `Cart ${id} not found.` },
          });
        }
        res.cart = cart;
        next();
      })
      .catch(next);
  })

  .get((req, res) => {
    res.json(res.cart);
  })

  .post(requireAuth, jsonParser, (req, res, next) => {
    const user_id = req.user.id;
    const { product_id, quantity } = req.body;

    InvoiceService.getCurrentCartId(req.app.get("db"), user_id)
      .then((invoice_id_raw) => {
        let invoice_id = Number(invoice_id_raw);
        let newInvoice = { invoice_id, product_id, user_id, quantity };
        
        InvoiceService.insertInvoice(req.app.get("db"), newInvoice)
          .then((invoice) => {
            res
              .status(201)
              // .location(path.posix.join(req.originalUrl, `${invoice.id}`))
              .json(invoice);
          })
          .catch(next);
      })
      .catch(next);
  })

  .delete(requireAuth, (req, res, next) => {
    const user_id = req.user.id;

    InvoiceService.getCurrentCartId(req.app.get("db"), user_id)
      .then((invoice_id_raw) => {
        let invoice_id = Number(invoice_id_raw);
        InvoiceService.emptyCart(req.app.get("db"), invoice_id)
          .then(() => {
            logger.info(`Items in cart with id ${invoice_id} deleted.`);
            res.status(204).end();
          })
          .catch(next);
      })
      .catch(next);
  });

invoiceRouter
  .route('/checkout')

  .all(requireAuth, (req, res, next) => {
    const user_id = req.user.id
    console.log(user_id)
    InvoiceService.getCartByUser(req.app.get('db'), user_id)
      .then(cart => {
        if (!cart) {
          logger.error(`Cart ${id} not found.`)
          return res.status(404).json({
            error: { message: `Cart ${id} not found.` }
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

  .patch(requireAuth, jsonParser, (req, res, next) => {

    const randomNumber = req.params;
    const user_id = req.user.id;
    console.log("PATCH********", req.user.id);
    console.log("RANDOM NUMBER#######", randomNumber);

    InvoiceService.closeInvoice(req.app.get("db"), user_id)
      .then(() => {
        InvoiceService.createNewCart(req.app.get("db"), user_id)
          .then(() => {
            res.status(204).end();
          })
          .catch(next);
      })
      .catch(next);
  });

invoiceRouter
  .route('/invoice/:id')

  .all(requireAuth, (req, res, next) => {
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

  .patch(requireAuth, jsonParser, (req, res, next) => {
    const { id } = req.params
    const { quantity } = req.body

    InvoiceService.updateInvoice(req.app.get('db'), id, quantity)
      .then(() => {
        res.status(204).end()
      })
      .catch(next)
  })

.delete((req, res, next) => {
  const { user_id } = req.body

  InvoiceService.getCurrentCartId(req.app.get('db'), user_id)
    .then(invoice_id_raw => {
      res
        .status(201)
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
  .route("/history")

  .all(requireAuth, (req, res, next) => {
    const user_id = req.user.id;
    const id = user_id;
    console.log("ALL!!!!!!!!!!!!!!", user_id);
    InvoiceService.getHistoryByUser(req.app.get("db"), id)
      .then((invoice) => {
        if (!invoice) {
          logger.error(`Invoice ${id} not found.`);
          return res.status(404).json({
            error: { message: `Invoice ${id} not found.` },
          });
        }
        res.invoice = invoice;
        next();
      })
      .catch(next);
  })

  .get((req, res) => {
    console.log('*********************RES', res.invoice)
    res.json(res.invoice);
  })

  .patch(requireAuth, jsonParser, (req, res, next) => {
    const user_id = req.user.id;
    console.log(
      "*****************************************!!!@@#$$%%^^&&*(())!!!!!!!",
      user_id
    );

    InvoiceService.closeInvoice(req.app.get("db"), user_id)
      .then(() => {
        InvoiceService.createNewCart(req.app.get("db"), user_id)
          .then(() => {
            res.status(204).end();
          })
          .catch(next);
      })
      .catch(next);
  });

invoiceRouter
  .route("/:id")

  .all(requireAuth, (req, res, next) => {
    const user_id = req.user.id
    console.log(user_id)
    const id = user_id
    InvoiceService.getCartByUser(req.app.get('db'), id)
      .then(cart => {
        if (!cart) {
          logger.error(`Cart ${id} not found.`)
          return res.status(404).json({
            error: { message: `Cart ${id} not found.` }
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

  .patch(requireAuth, jsonParser, (req, res, next) => {
    const user_id = req.user.id;
    const id = user_id;
    const { quantity } = req.body;

    InvoiceService.updateInvoice(req.app.get("db"), id, quantity)
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  })

  .delete(requireAuth, (req, res, next) => {
    const { id: product_id } = req.params;
    const user_id = req.user.id;

    InvoiceService.getCurrentCartId(req.app.get("db"), user_id)
      .then((invoice_id_raw) => {
        let invoice_id = Number(invoice_id_raw);
        InvoiceService.deleteItemInCart(
          req.app.get("db"),
          invoice_id,
          product_id
        )
          .then(() => {
            logger.info(`Items in cart with id ${invoice_id} deleted.`);
            res.status(204).end();
          })
          .catch(next);
      })
      .catch(next);
  });

module.exports = invoiceRouter;
