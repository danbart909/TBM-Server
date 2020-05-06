const path = require('path')
const express = require('express')
const xss = require('xss')
const logger = require('../logger')
const AnyService = require('./any-service')
const { getAnyValidationError } = require('./any-validator')

const anyRouter = express.Router()
const bodyParser = express.json()

const serializeAny = any => ({
  id: any.id,
  param1: xss(any.param1),
  param2: Number(any.param2),
  param3: xss(any.param3)
})

anyRouter
  .route('/')

  .get((req, res, next) => {
    const anydb = req.app.get('db')
    AnyService.getAllAny(anydb)
    .then(any => {
      res.json(any.map(serializeAny))
    })
    .catch(next)
  })

  .post(bodyParser, (req, res, next) => {
    const { param1, param2, param3 } = req.body
    const newAny = { param1, param2, param3 }
    const anydb = req.app.get('db')

    for (const field of ['param1', 'param2', 'param3']) {
      if (!newAny[field]) {
        logger.error(`${field} is required`)
        return res.status(400).send({
          error: { message: `'${field}' is required` }
        })
      }
    }

    const error = getAnyValidationError(newAny)

    if (error) return res.status(400).send(error)

    AnyService.insertAny(anydb, newAny)
      .then(any => {
        logger.info(`Any with id ${any.id} created.`)
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `${any.id}`))
          .json(serializeAny(any))
      })
      .catch(next)
  })

  anyRouter
    .route('/:any_id')

    .all((req, res, next) => {
      const { any_id } = req.params
      const anydb = req.app.get('db')
      AnyService.getById(anydb, any_id)
        .then(any => {
          if (!any) {
            logger.error(`Any with id ${any_id} not found.`)
            return res.status(404).json({
              error: { message: `Any Not Found` }
            })
          }
          res.any = any
          next()
        })
        .catch(next)
    })

    .get((req, res) => {
      res.json(serializeAny(res.any))
    })

    .delete((req, res, next) => {
      const { any_id } = req.params
      const anydb = req.app.get('db')
      AnyService.deleteAny(anydb, any_id)
        .then(() => {
          logger.info(`Any with id ${any_id} deleted.`)
          res.status(204).end()
        })
        .catch(next)
      })

    .patch(bodyParser, (req, res, next) => {
      const { param1, param2, param3 } = req.body
      const newAny = { param1, param2, param3 }

      const numberOfValues = Object.values(newAny).filter(Boolean).length
      if (numberOfValues === 0) {
        logger.error(`Invalid update without required fields`)
        return res.status(400).json({
          error: {
            message: `Request body must content either 'param1', 'param2', or 'param3'.`
          }
        })
      }

      const error = getAnyValidationError(newAny)
      if (error) return res.status(400).send(error)
      const { any_id } = req.params
      const anydb = req.app.get('db')

      AnyService.updateAny(anydb, any_id, newAny)
        .then(() => {
          res.status(204).end()
        })
        .catch(next)

    })

    module.exports = anyRouter