process.env.TZ = 'UCT'
process.env.NODE_ENV = 'test'
process.env.JWT_SECRET = 'test-jwt-secret'
process.env.JWT_EXPIRY = '3m'

require('dotenv').config()

process.env.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL
  || "postgres://postgres:401923@localhost/tbm-test"

const { expect } = require('chai')
const supertest = require('supertest')

global.expect = expect
global.supertest = supertest