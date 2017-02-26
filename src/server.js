const express = require('express')
const expressValidator = require('express-validator')
const bodyParser = require('body-parser')
const config = require('../config')
const locals = require('./middleware/locals')
const customValidators = require('./lib/validators')
const customSanitizers = require('./lib/sanitizers')
const searchController = require('./controller/searchcontroller')
const investmentController = require('./controller/investmentsummarycontroller')
const app = express()

function nullEmptyFields (data) {
  const fieldNames = Object.keys(data)
  for (const fieldName of fieldNames) {
    const fieldValue = data[fieldName]
    if (fieldValue !== null && fieldValue.length === 0) {
      data[fieldName] = null
    }
  }
}

function parse (req, res, next) {
  if (req.body) {
    nullEmptyFields(req.body)
  }
  next()
}

app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }))
app.use(bodyParser.json({ limit: '1mb' }))
app.use(expressValidator({ customValidators, customSanitizers }))

app.use(locals)
app.use(parse)
app.use('/company', require('./controller/companycontroller').router)
app.use(investmentController.router)
app.use('/ch-company', require('./controller/companieshousecontroller').router)
app.use('/contact', require('./controller/contactcontroller').router)
app.use(searchController.router)
app.get('/metadata/:table/', require('./controller/metadatacontroller').list)
app.get('/metadata/:table/:id/', require('./controller/metadatacontroller').value)
app.use(express.static(`${__dirname}/../src/public`))

app.listen(config.port)
module.exports = app
