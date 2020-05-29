const { expect } = require('chai')
const supertest = require('supertest')
const app = require('../src/app')
const knex = require('knex')
const helpers = require('./test-helpers')

describe('Products Endpoints', function() {
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

  describe(`GET /api/products`, () => {
    context('Given there are products in the database', () => {
      it(`responds with 200 and all the of the products`, () => {
        const expectedProducts = helpers.makeProductArray()
        return supertest(app)
        .get('/api/products')
        .expect(200, expectedProducts)
      })
    })

  })

  describe(`GET /api/products/:id`, () => {
    context(`Given there are products in the database`, () => {
      it(`responds with 200 and specified product`, () => {
        const expectedProducts = helpers.makeProductArray()
        return supertest(app)
        .get(`/api/products/1`)
        .expect(200, expectedProducts[0])
      })
    })

  })

  describe(`GET /api/products/categories`, () => {
    context(`Given there are categories`, () => {
      it(`responds with 200 and item categories`, () => {
        return supertest(app)
        .get(`/api/products/categories`)
        .expect(200)
      })
    })

  })

  describe(`GET /api/products/category/:category`, () => {
    context(`Given there are items in specified category`, () => {
      it(`responds with 200 and items in category`, () => {
        const category = 'furniture'
        const categoryItems = helpers.categoryItems(category)
        return supertest(app)
        .get(`/api/products/category/${category}`)
        .expect(200, categoryItems)
      })
    })
  })

})