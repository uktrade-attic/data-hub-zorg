const express = require('express')
const winston = require('winston')
const companiesHouseRepository = require('../db/companieshouserepository')

const router = express.Router()

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

router.get('/:id', get)

module.exports = { router }
