const express = require('express')
const winston = require('winston')
const generateUUID = require('../lib/uuid').generateUUID
const companyRepository = require('../db/companyrepository')
const companyValidationSchema = require('../validation/companyscheme')

const router = express.Router()

function list (req, res, next) {
  companyRepository.getCompanies()
    .then((companies) => {
      res.status(200).json(companies)
    })
    .catch((error) => {
      winston.error(error)
      next(error)
    })
}

function get (req, res, next) {
  companyRepository.getCompany(req.params.id)
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
  req.checkBody(companyValidationSchema)
  req.getValidationResult()
    .then((result) => {
      if (!result.isEmpty()) {
        return res.status(400).json(result.mapped())
      }

      const companyToAdd = Object.assign({}, req.body)
      companyToAdd.id = generateUUID()
      companyRepository.addCompany(companyToAdd)
        .then((id) => {
          return companyRepository.getCompany(id)
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
  req.checkBody(companyValidationSchema)
  req.getValidationResult()
    .then((result) => {
      if (!result.isEmpty()) {
        return res.status(400).json(result.mapped())
      }
      companyRepository.updateCompany(req.params.id, req.body)
        .then(() => {
          return companyRepository.getCompany(req.params.id)
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
  companyRepository.getCompany(req.params.id)
    .then((company) => {
      if (company) {
        companyRepository.deleteCompany(req.params.id)
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
router.get('/:id/', get)
router.post('/', post)
router.put('/:id/', put)
router.delete('/:id/', remove)

module.exports = { router }
