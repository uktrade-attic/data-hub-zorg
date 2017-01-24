const elasticsearch = require('elasticsearch')
const winston = require('winston')
const config = require('../../config')
const companiesHouseRepository = require('../db/companieshouserepository')
const companyRepository = require('../db/companyrepository')

const INDEX_NAME = config.search.index
const client = new elasticsearch.Client({
  hosts: config.search.hosts
})

function indexCompany (company) {
  return new Promise((resolve, reject) => {
    client.index({
      index: INDEX_NAME,
      id: company.id,
      type: 'company_company',
      body: company
    }, function (error, resp) {
      if (error) {
        winston.error(error)
        return reject(error)
      }
      winston.debug(resp)
      resolve(resp)
    })
  })
}

function indexCompaniesHouseCompany (company) {
  return new Promise((resolve, reject) => {
    client.index({
      index: INDEX_NAME,
      id: company.id,
      type: 'company_company',
      body: company
    }, function (error, resp) {
      if (error) {
        winston.error(error)
        return reject(error)
      }
      winston.debug(resp)
      resolve(resp)
    })
  })
}

function indexAllCompanies () {
  return new Promise((resolve) => {
    companyRepository.getCompanies()
      .then((records) => {
        const promises = records
          .filter(record => (record.company_number !== null || record.company_number.length > 0))
          .map((record) => {
            return indexCompany(record)
          })

        resolve(Promise.all(promises))
      })
  })
}

function indexAllCompaniesHouse () {
  return new Promise((resolve) => {
    let promises = []
    companiesHouseRepository.getOrphanCH()
      .then((records) => {
        records.forEach((record) => {
          winston.debug('index:', record)
          promises.push(indexCompaniesHouseCompany(record))
        })

        resolve(Promise.all(promises))
      })
  })
}

function search (term) {
  let body = {
    query: {
      query_string: { query: `${term}*` }
    }
  }

  return client
    .search({INDEX_NAME, body})
    .then((results) => {
      return results.hits
    })
}

function deleteIndex () {
  return new Promise((resolve) => {
    client.indices.get({index: '_all'}, (err, resp) => {
      if (!err && resp[config.search.index]) {
        client.indices.delete({index: INDEX_NAME}, (err, resp) => {
          if (err) {
            resolve(`Error deleting index: ${err}`)
          } else {
            resolve('Deleted:', resp)
          }
        })
      } else {
        resolve('Index does not exist')
      }
    })
  })
}

function createIndex () {
  function create () {
    return new Promise((resolve, reject) => {
      winston.info('Creating new index')
      client.indices.create({index: INDEX_NAME}, (err, resp) => {
        if (err) {
          reject(err)
        } else {
          winston.debug(resp)
          resolve()
        }
      })
    })
  }

  return new Promise((resolve, reject) => {
    client.indices.get({index: '_all'}, (err, resp) => {
      if (!err && resp[INDEX_NAME]) {
        winston.info('Index exists, deleting.')
        client.indices.delete({index: INDEX_NAME}, (err) => {
          if (err) {
            winston.error(err)
            reject(err)
          } else {
            winston.info('Deleted')
            create().then(() => resolve()).catch((error) => reject(error))
          }
        })
      } else {
        create().then(() => resolve()).catch((error) => reject(error))
      }
    })
  })
}

module.exports = {
  indexCompany,
  indexCompaniesHouseCompany,
  indexAllCompanies,
  indexAllCompaniesHouse,
  search,
  deleteIndex,
  createIndex
}
