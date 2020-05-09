module.exports = {
  PORT: process.env.PORT || 8010,
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_TOKEN: process.env.API_TOKEN || 0000,
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres@localhost/tbm',
  TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://postgres@localhost/tbm-test',
  JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret'
}