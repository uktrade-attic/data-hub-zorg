process.env.NODE_ENV = 'test'
process.env.ESINDEX = 'datahubtest'
global.chai = require('chai')
global.chaiHttp = require('chai-http')
global.server = require('../src/server')
global.knex = require('../src/db/knex')
global.expect = global.chai.expect
global.appFolder = process.cwd() + '/src'
global.chai.use(global.chaiHttp)

process.setMaxListeners(0)
process.stdout.setMaxListeners(0)
