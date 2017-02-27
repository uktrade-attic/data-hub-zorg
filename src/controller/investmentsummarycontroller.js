const express = require('express')
const winston = require('winston')
const generateUUID = require('../lib/uuid').generateUUID
const investmentSummaryRepository = require('../repositories/investmentsummaryrepository')
const investmentSummaryValidationSchema = require('../validation/investmentscheme')

const router = express.Router()

function post (req, res, next) {

  console.log(req.body)

  req.checkBody(investmentSummaryValidationSchema)
  req.getValidationResult()
    .then((result) => {
      if (!result.isEmpty()) {
        return res.status(400).json(result.mapped())
      }

      const investmentSummaryToAdd = Object.assign({}, req.body)
      investmentSummaryToAdd.id = generateUUID()
      investmentSummaryRepository.addInvestmentSummary(investmentSummaryToAdd)
        .then((id) => {
          return investmentSummaryRepository.getInvestmentSummary(id)
        })
        .then((investmentSummary) => {
          res.status(200).json(investmentSummary)
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

router.post('/investment/:id/createproject', post)

module.exports = { router }
