const elasticsearch = require('elasticsearch')
const winston = require('winston')
const config = require('../../config')
const companiesHouseRepository = require('../db/companieshouserepository')
const companyRepository = require('../db/companyrepository')
const countryIds = require('../db/countryids').ids
const businessTypeIds = require('../db/businesstypeids')

const INDEX_NAME = config.search.index
const COMPANIES_HOUSE = 'companieshouse_company'

const client = new elasticsearch.Client({
  hosts: config.search.hosts
})

function indexCompany (company) {
  const body = Object.assign({}, company)
  body.business_type = businessTypeIds.ids[company.business_type]
  return new Promise((resolve, reject) => {
    client.index({
      index: INDEX_NAME,
      id: company.id,
      type: 'company_company',
      body
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
      type: COMPANIES_HOUSE,
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
  return new Promise((resolve, reject) => {
    companyRepository.getCompanies()
      .then((records) => {
        let body = []
        records.forEach((record) => {
          record.business_type = businessTypeIds.ids[record.business_type]
          body.push({ index: {
            _index: INDEX_NAME,
            _id: record.id,
            _type: 'company_company'
          }})
          body.push(record)
        })

        client.bulk({ body }, function (err, resp) {
          if (err) {
            return reject(err)
          }
          return resolve(resp)
        })
      })
  })
}

function indexAllCompaniesHouse () {
  return new Promise((resolve, reject) => {
    companiesHouseRepository.getOrphanCH()
      .then((records) => {
        let body = []
        records.forEach((record) => {
          body.push({ index: {
            _index: INDEX_NAME,
            _id: record.company_number,
            _type: 'company_companieshousecompany'
          }})
          body.push(record)
        })

        client.bulk({ body }, function (err, resp) {
          if (err) {
            return reject(err)
          }
          return resolve(resp)
        })
      })
  })
}

function search (term) {
  const body = {
    query: {
      query_string: { query: `${term}*` }
    }
  }

  return client
    .search({index: INDEX_NAME, body})
    .then((results) => {
      return results.hits
    })
}

function nonUkSearch (term) {
  let body = {
    query: {
      query_string: {query: `${term}* NOT ${countryIds['united kingdom']}`}
    }
  }

  return client
    .search({index: INDEX_NAME, body: body})
    .then((results) => {
      return results.hits
    })
}

function limitedSearch (term) {
  const query = `(${term}* AND Private Limited Company) OR (${term}* AND Public Limited Company)`

  let body = {
    query: {
      query_string: { query }
    }
  }

  return client
    .search({index: INDEX_NAME, body})
    .then((results) => {
      return results.hits
    })
}


function chSearch (term) {
  return client
    .search(INDEX_NAME, COMPANIES_HOUSE, {
      query: {
        query_string: { query: `${term}*` }
      }
    })
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
  createIndex,
  nonUkSearch,
  chSearch,
  limitedSearch
}
