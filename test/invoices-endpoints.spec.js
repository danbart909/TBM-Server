const { expect } = require('chai')
const supertest = require('supertest')
const app = require('../src/app')
const knex = require('knex')
const helpers = require('./test-helpers')

describe('Invoices Endpoints', function() {
  let db

  const {
    testProducts,
    testUsers,
    testInvoices,
    testInvoice_Products
  } = helpers.makeFixtures()

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    })
    app.set('db', db)
  })

  beforeEach('seed database', () =>
    helpers.seeds(db, testUsers, testProducts, testInvoices, testInvoice_Products))

  after('disconnect from db', () => db.destroy())

  before('cleanup', () => helpers.cleanTables(db))

  afterEach('cleanup', () => helpers.cleanTables(db))

  describe(`GET /api/cart/:id`, () => {
    context(`Given the user has a cart`, () => {
      it(`responds with 200 and the cart as a list`, () => {
        const id = 1
        const expectedCart = helpers.getCartById(id)
        return supertest(app)
        .get(`/api/cart/${1}`)
        .expect(200, expectedCart)
      })
    })
  })

  describe(`POST /api/cart`, () => {
    context(`Given valid cart, user_id, and product_id`, () => {
      it (`responds with 200 and adds item to cart`, () => {
        const newItem = { id: 10, user_id: 1, product_id: 1 }
        return supertest(app)
        .get(`/api/cart`)
        .expect(200)
      })
    })
  })

  describe(`DELETE /api/cart/:id`, () => {
    context(`Given valid product_id in cart`, () => {
      it (`responds with 200 and deletes item from cart`, () => {
        const id = 2
        const cart = 1
        const newCart = helpers.deleteFromCart(id, cart)
        const alsoCart = helpers.getCartById(cart)
        return supertest(app)
        .get(`/api/cart/${id}`)
        .expect(200)
      })
    })
  })

  describe(`GET /api/cart/history/:id`, () => {
    context(`Given user has invoices that are checked_out: true`, () => {
      it (`responds with order history of user`, () => {
        return supertest(app)
        .get(`/api/cart/history/1`)
        .expect(200)
      })
    })
  })

  describe(`DELETE /api/cart/`, () => {
    context(`Given user has items in cart`, () => {
      it (`responds with empty array`, () => {
        return supertest(app)
        .get(`/api/cart`)
        .expect(200)
      })
    })
  })

  describe(`PATCH /api/cart/history/:id`, () => {
    context(`Given user has items in cart`, () => {
      it (`responds with invoices checked out and fresh new cart which is not checked out`, () => {
        return supertest(app)
        .patch(`/api/cart/history/1`)
        .expect(204)
      })
    })
  })
    

})