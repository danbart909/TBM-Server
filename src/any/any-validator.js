const logger = require('../logger')

const NO_ERRORS = null

function getAnyValidationError({ age }) {
  if (age &&
    (!Number.isInteger(age) || age < 18 || age > 100)) {
      logger.error(`Invalid age '${age} supplied`)
      return {
        error: {
          message: `'age' must be a number between 18 and 100`
        }
      }
    }

    return NO_ERRORS
}

module.exports = {
  getAnyValidationError,
}