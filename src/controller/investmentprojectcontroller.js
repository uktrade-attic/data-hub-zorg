const express = require('express')
const winston = require('winston')
const generateUUID = require('../lib/uuid').generateUUID
const investmentProjectRepository = require('../db/contactrepository')
const investmentProjectValidationSchema = require('../validation/contactscheme')

const router = express.Router()

function list (req, res, next) {
  investmentProjectRepository.getInvestmentProjects()
    .then((investmentProjects) => {
      res.status(200).json(investmentProjects)
    })
    .catch((error) => {
      winston.error(error)
      next(error)
    })
}

function get (req, res, next) {
  investmentProjectRepository.getInvestmentProject(req.params.id)
    .then((investmentProject) => {
      if (investmentProject) {
        res.status(200).json(investmentProject)
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
  req.checkBody(investmentProjectValidationSchema)
  req.getValidationResult()
    .then((result) => {
      if (!result.isEmpty()) {
        return res.status(400).json(result.mapped())
      }

      const investmentProjectToAdd = Object.assign({}, req.body)
      investmentProjectToAdd.id = generateUUID()
      investmentProjectRepository.addInvestmentProject(investmentProjectToAdd)
        .then((id) => {
          return investmentProjectRepository.getInvestmentProject(id)
        })
        .then((investmentProject) => {
          res.status(200).json(investmentProject)
        })
    })
    .catch((error) => {
      winston.error(error)
      next(error)
    })
}

function put (req, res, next) {
  req.checkBody(investmentProjectValidationSchema)
  req.getValidationResult()
    .then((result) => {
      if (!result.isEmpty()) {
        return res.status(400).json(result.mapped())
      }
      investmentProjectRepository.updateContact(req.params.id, req.body)
        .then(() => {
          return investmentProjectRepository.getInvestmentProject(req.params.id)
        })
        .then((investmentProject) => {
          res.status(200).json(investmentProject)
        })
        .catch((error) => {
          winston.error(error)
          next(error)
        })
    })
}

function remove (req, res, next) {
  investmentProjectRepository.getInvestmentProject(req.params.id)
    .then((investmentProject) => {
      if (investmentProject) {
        investmentProject.deleteInvestmentProject(req.params.id)
          .then(() => {
            return res.status(200).json(investmentProject)
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
