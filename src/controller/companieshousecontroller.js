const express = require('express')
const winston = require('winston')
const companiesHouseRepository = require('../repository/companieshouserepository')
const companiesHouseValidationSchema = require('../validation/companieshousescheme')

const router = express.Router()

function list (req, res, next) {
  companiesHouseRepository.getCompanies()
    .then((companies) => {
      res.status(200).json(companies)
    })
    .catch((error) => {
      winston.error(error)
      next(error)
    })
}

function get (req, res, next) {
  companiesHouseRepository.getCompany(req.params.id)
    .then((company) => {
      if (company) {
        res.status(200).json(company)
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
  req.checkBody(companiesHouseRepository)
  req.getValidationResult()
    .then((result) => {
      if (!result.isEmpty()) {
        return res.status(400).json(result.mapped())
      }

      const companyToAdd = Object.assign({}, req.body)
      companiesHouseRepository.addCompany(companyToAdd)
        .then((companyNumber) => {
          return companiesHouseRepository.getCompany(companyNumber)
        })
        .then((company) => {
          res.status(200).json(company)
        })
    })
    .catch((error) => {
      winston.error(error)
      next(error)
    })
}

function put (req, res, next) {
  req.checkBody(companiesHouseValidationSchema)
  req.getValidationResult()
    .then((result) => {
      if (!result.isEmpty()) {
        return res.status(400).json(result.mapped())
      }
      companiesHouseRepository.updateCompany(req.params.id, req.body)
        .then(() => {
          return companiesHouseRepository.getCompany(req.params.id)
        })
        .then((company) => {
          res.status(200).json(company)
        })
        .catch((error) => {
          winston.error(error)
          next(error)
        })
    })
}

function remove (req, res, next) {
  companiesHouseRepository.getCompany(req.params.id)
    .then((company) => {
      if (company) {
        companiesHouseRepository.deleteCompany(req.params.id)
          .then(() => {
            return res.status(200).json(company)
          })
      } else {
        res.status(404).send()
      }
    })
    .catch((error) => {
      winston.error(error)
      next(error)
    })
}

router.get('/', list)
router.get('/:id', get)
router.post('/', post)
router.put('/:id', put)
router.delete('/:id', remove)

module.exports = { router }
