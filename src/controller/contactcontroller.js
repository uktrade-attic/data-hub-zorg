const express = require('express')
const winston = require('winston')
const generateUUID = require('../lib/uuid').generateUUID
const contactRepository = require('../db/contactrepository')
const contactValidationSchema = require('../validation/contactscheme')

const router = express.Router()

function list (req, res, next) {
  contactRepository.getContacts()
    .then((contacts) => {
      res.status(200).json(contacts)
    })
    .catch((error) => {
      winston.error(error)
      next(error)
    })
}

function get (req, res, next) {
  contactRepository.getContact(req.params.id)
    .then((contact) => {
      if (contact) {
        res.status(200).json(contact)
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
  req.checkBody(contactValidationSchema)
  req.getValidationResult()
    .then((result) => {
      if (!result.isEmpty()) {
        return res.status(400).json(result.mapped())
      }

      const contactToAdd = Object.assign({}, req.body)
      contactToAdd.id = generateUUID()
      contactRepository.addContact(contactToAdd)
        .then((id) => {
          return contactRepository.getContact(id)
        })
        .then((contact) => {
          res.status(200).json(contact)
        })
    })
    .catch((error) => {
      winston.error(error)
      next(error)
    })
}

function put (req, res, next) {
  req.checkBody(contactValidationSchema)
  req.getValidationResult()
    .then((result) => {
      if (!result.isEmpty()) {
        return res.status(400).json(result.mapped())
      }
      contactRepository.updateContact(req.params.id, req.body)
        .then(() => {
          return contactRepository.getContact(req.params.id)
        })
        .then((contact) => {
          res.status(200).json(contact)
        })
        .catch((error) => {
          winston.error(error)
          next(error)
        })
    })
}

function remove (req, res, next) {
  contactRepository.getContact(req.params.id)
    .then((contact) => {
      if (contact) {
        contactRepository.deleteContact(req.params.id)
          .then(() => {
            return res.status(200).json(contact)
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
