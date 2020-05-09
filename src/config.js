module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_TOKEN: process.env.API_TOKEN || 0000,
  DATABASE_URL: process.env.DATABASE_URL || 'postgres://nqbolyypkxkepc:79b7464e689390907efce8739cd2b50c41e987319b52e9ac3c4d3f662d551831@ec2-52-202-146-43.compute-1.amazonaws.com:5432/d2tvhidlfaub47',
  TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://postgres:401923@localhost/tbm-test'
}