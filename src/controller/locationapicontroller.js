const express = require('express')
const winston = require('winston')

const locationRepository = require('../repository/locationrepository')
const locationValidationSchema = require('../validation/locationscheme')

const router = express.Router()

function generateUUID () {
  let d = new Date().getTime()
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
  return uuid
}

function index (req, res, next) {
  locationRepository.getLocations()
    .then((locations) => {
      res.status(200).json(locations)
    })
    .catch((error) => {
      winston.error(error)
      next(error)
    })
}

function location (req, res, next) {
  locationRepository.getLocation(req.params.id)
    .then((location) => {
      if (location) {
        res.status(200).json(location)
      } else {
        res.status(404).send()
      }
    })
    .catch((error) => {
      winston.error(error)
      next(error)
    })
}

function post (req, res, next) {
  req.checkBody(locationValidationSchema)
  req.getValidationResult()
    .then((result) => {
      if (!result.isEmpty()) {
        return res.status(400).json(result.mapped())
      }

      const locationToAdd = Object.assign({}, req.body)
      locationToAdd.id = generateUUID()
      locationRepository.addLocation(locationToAdd)
        .then((id) => {
          return locationRepository.getLocation(id)
        })
        .then((location) => {
          res.status(200).json(location)
        })
    })
    .catch((error) => {
      winston.error(error)
      next(error)
    })
}

function put (req, res, next) {
  req.checkBody(locationValidationSchema)
  req.getValidationResult()
    .then((result) => {
      if (!result.isEmpty()) {
        return res.status(400).json(result.mapped())
      }
      locationRepository.updateLocation(req.params.id, req.body)
        .then(() => {
          return locationRepository.getLocation(req.params.id)
        })
        .then((location) => {
          res.status(200).json(location)
        })
        .catch((error) => {
          winston.error(error)
          next(error)
        })
    })
}

function remove (req, res, next) {
  locationRepository.getLocation(req.params.id)
    .then((location) => {
      if (location) {
        locationRepository.deleteLocation(req.params.id)
          .then(() => {
            return res.status(200).json(location)
          })
      } else {
        res.status(404).send()
      }
    })
    .catch((error) => {
      winston.error(error)
      next(error)
    })

  locationRepository.deleteLocation(req.params.id)
    .then((location) => {
      res.status(200).json(location)
    })
    .catch((error) => {
      winston.error(error)
      next(error)
    })
}

router.get('/', index)
router.get('/:id', location)
router.post('/', post)
router.put('/:id', put)
router.delete('/:id', remove)

module.exports = { router }
