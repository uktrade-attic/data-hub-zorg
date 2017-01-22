const express = require('express')
const expressValidator = require('express-validator')
const bodyParser = require('body-parser')
const config = require('../config')
const locals = require('./middleware/locals');
const customValidators = require('./lib/validators')
const customSanitizers = require('./lib/sanitizers')
const locationApiController = require('./controller/locationapicontroller')

const app = express()

app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }))
app.use(bodyParser.json({ limit: '1mb' }))
app.use(expressValidator({ customValidators, customSanitizers }))

app.use(locals)
app.use('/api/locations', locationApiController.router)

app.listen(config.port)
module.exports = app
