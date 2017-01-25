const express = require('express')
const expressValidator = require('express-validator')
const bodyParser = require('body-parser')
const config = require('../config')
const locals = require('./middleware/locals');
const customValidators = require('./lib/validators')
const customSanitizers = require('./lib/sanitizers')

const app = express()

app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }))
app.use(bodyParser.json({ limit: '1mb' }))
app.use(expressValidator({ customValidators, customSanitizers }))

app.use(locals)
app.use('/company', require('./controller/companycontroller').router)
app.use('/ch-company', require('./controller/companieshousecontroller').router)
app.use('/search', require('./controller/searchcontroller'))
app.get('/metadata/:table/', require('./controller/metadatacontroller').list)
app.get('/metadata/:table/:id/', require('./controller/metadatacontroller').value)

app.listen(config.port)
module.exports = app
