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

  before('make knex instance', (done) => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    })
    app.set('db', db)
    done()
  })

  beforeEach('seed database', () =>
    helpers.seeds(db, testUsers, testProducts, testInvoices, testInvoice_Products))

  after('disconnect from db', () => db.destroy())

  before('cleanup', () => helpers.cleanTables(db))

  afterEach('cleanup', () => helpers.cleanTables(db))

  describe(`GET /api/cart`, () => {
    context(`Given valid user id and non-checked out invoice`, () => {
      it(`responds with 200 and current cart`, () =>{
        return supertest(app)
        .get(`/api/cart`)
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .expect(200)
      })
    })
  })

  describe(`POST /api/cart`, () => {
    context(`Given valid cart, user_id, product_id, and quantity`, () => {
      it(`responds with 200 and adds item to cart`, () => {
        const newItem = { product_id: 1, quantity: 2 }
        return supertest(app)
        .post(`/api/cart`)
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .send(newItem)
        .expect(201)
          // .then(data => {
          //   console.log(data.body)
          // })
      })
    })
  })

  describe(`DELETE /api/cart/`, () => {
    context(`Given user has items in cart`, () => {
      it(`responds with empty array`, () => {
        return supertest(app)
        .get(`/api/cart`)
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .expect(200)
      })
    })
  })

  describe(`DELETE /api/cart/:id`, () => {
    context(`Given valid product_id in cart`, () => {
      it(`responds with 200 and deletes item from cart`, () => {
        const alsoCart = helpers.getCartById(1)
        console.log(alsoCart)
        return supertest(app)
        .del(`/api/cart/1`)
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .expect(204)
      })
    })
  })

  describe(`GET /api/cart/history`, () => {
    context(`Given the user has a cart`, () => {
      it(`responds with 200 and the cart as a list`, () => {
        const id = 1
        const expectedCart = helpers.getCartById(id)
        console.log(expectedCart)
        return supertest(app)
        .get(`/api/cart/history`)
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .expect(200)
      })
    })
  })
    

})