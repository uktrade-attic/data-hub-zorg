const express = require('express')
const winston = require('winston')
const companyRepository = require('../db/companyrepository')
const companyValidationSchema = require('../validation/companyscheme')
const contactRepository = require('../db/contactrepository')
const investmentProjectRepository = require('../db/investmentprojectrepository')

const router = express.Router()

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
      companyRepository.addCompany(companyToAdd)
        .then((id) => {
          return companyRepository.getCompany(id)
        })
        .then((company) => {
          res.status(200).json(company)
        })
        .catch((error) => {
          winston.error(error)
          next(error)
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

function contacts (req, res, next) {
  contactRepository.getContactsForCompany(req.params.id)
    .then((contacts) => {
      res.status(200).json(contacts)
    })
    .catch((error) => {
      winston.error(error)
      next(error)
    })
}

function investmentProjects (req, res, next) {
  investmentProjectRepository.getInvestmentProjectsForCompany(req.params.id)
    .then((investmentProjects) => {
      res.status(200).json(investmentProjects)
    })
    .catch((error) => {
      winston.error(error)
      next(error)
    })
}

function getCompanyInvestmentSummary (req, res, next) {
  companyRepository.getCompanyInvestmentSummary(req.params.id)
    .then((investmentSummary) => {
      res.status(200).json(investmentSummary)
    })
    .catch((error) => {
      winston.error(error)
      next(error)
    })
}

function updateCompanyInvestmentSummary (req, res, next) {
  companyRepository.updateCompanyInvestmentSummary(req.body)
  .then((summary) => {
    res.status(200).json(summary)
  })
  .catch((error) => {
    winston.error(error)
    next(error)
  })
}

function related (req, res, next) {
  const id = req.params.id
  const result = {}
  companyRepository.getParentCompanies(id)
    .then((parents) => {
      result.parents = parents
      return companyRepository.getChildCompanies(id)
    })
    .then((children) => {
      result.children = children
      res.json(result)
    })
    .catch((error) => {
      winston.error(error)
      next(error)
    })
}

router.post('/', post)
router.get('/:id/', get)
router.put('/:id/', put)
router.get('/:id/contacts/', contacts)
router.get('/:id/investmentprojects/', investmentProjects)
router.get('/:id/investmentsummary/', getCompanyInvestmentSummary)
router.post('/:id/investmentsummary/', updateCompanyInvestmentSummary)
router.get('/:id/related/', related)

module.exports = { router }
