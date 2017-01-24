const path = require('path')
const ImportCH = require('../importch')
const ESIndex = require('../../search/')

function clear (knex) {

  return knex('company').del()
    .then(() => {
      return knex('companieshouse').del()
    })
    .then(() => {
      return knex('country').del()
    })
    .then(() => {
      return knex('businesstype').del()
    })
    .then(() => {
      return knex('employeerange').del()
    })
    .then(() => {
      return knex('turnoverrange').del()
    })
    .then(() => {
      return knex('advisor').del()
    })
    .then(() => {
      return knex('region').del()
    })
    .then(() => {
      return knex('sector').del()
    })
    .then(() => {
      return ESIndex.deleteIndex()
    })
}

/* Seed the DB and Elastic search
   Insert metadata into the db
   Create a fake CDMS company in the DB
   Import a sub

 */

exports.seed = function (knex, Promise) {
  const csvPath = path.join(__dirname, '..', '..', '..', 'data', 'marriot_ch.csv')
  const chrecords = ImportCH.parseFile(csvPath)

  return clear(knex)
    .then(() => {
      return knex('sector').insert({
        id: '35b6db3e-515c-4497-8020-3b1aea0c5956',
        name: 'Cleaning Services'
      })
    })
    .then(() => {
      return knex('region').insert({
        id: '35b6db3e-515c-4497-8020-3b1aea0c5957',
        name: 'London'
      })
    })
    .then(() => {
      return knex('advisor').insert({
        id: '35b6db3e-515c-4497-8020-3b1aea0c5958',
        name: 'Fred Brown'
      })
    })
    .then(() => {
      return knex('turnoverrange').insert({
        id: '35bbdb3e-515c-4497-8020-3b1aea0c595b',
        name: '£20-£100000'
      })
    })
    .then(() => {
      return knex('employeerange').insert({
        id: '35b6db3e-515c-4497-8020-3b1aea0c595a',
        name: '1-100'
      })
    })
    .then(() => {
      return knex('businesstype').insert({
        id: '35b6db3e-515c-4497-8020-3b1aea0c595b',
        name: 'Private Limited Company'
      })
    })
    .then(() => {
      return knex('country').insert({
        id: '35b6db3e-515c-4497-8020-3b1aea0c595d',
        name: 'United Kingdom'
      })
    })
    .then(() => {
      return knex('companieshouse').insert(chrecords)
    })
    .then(() => {
      return knex('company').insert({
        id: '35b6db3e-515c-4497-8020-3b1aea0c59ff',
        company_number: '08202257',
        name: 'MARRIOT CLEANING SERVICES LIMITED',
        registered_address_1: '51 HUGON ROAD',
        registered_address_town: 'FULHAM',
        registered_address_county: 'LONDON',
        registered_address_postcode: 'SW6 3ER',
        registered_address_country: '35b6db3e-515c-4497-8020-3b1aea0c595d',
        business_type: '35b6db3e-515c-4497-8020-3b1aea0c595b',
        sector: '35b6db3e-515c-4497-8020-3b1aea0c5956',
        account_manager: '35b6db3e-515c-4497-8020-3b1aea0c5958',
        uk_region: '35b6db3e-515c-4497-8020-3b1aea0c5957'
      })
    })
    .then(() => {
      console.log('Imported data -- calling create index')
      return ESIndex.createIndex()
    })
    .then(() => {
      console.log('index CH')
      return ESIndex.indexAllCompaniesHouse()
    })
    .then(() => {
      console.log('Index Companies')
      return ESIndex.indexAllCompanies()
    })
}
