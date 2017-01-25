const path = require('path')
const ImportCH = require('../importch')
const ESIndex = require('../../search/')

function clear (knex) {
  return knex('investmentproject').del()
    .then(() => {
      return knex('contact').del()
    })
    .then(() => {
      return knex('company').del()
    })
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
      return knex('title').del()
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

exports.seed = function (knex) {
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
      return knex('title').insert({
        id: '35b6db3e-666c-4497-8020-3b1aea0c595b',
        name: 'Mr'
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
    .then(() => { // Company with no contacts or anything
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
    .then(() => { // company with contact
      return knex('company').insert({
        id: '45b6db3e-515c-4497-8020-3b1aea0c59ff',
        company_number: '01235583',
        name: 'MARRIOT HOTELS LIMITED',
        registered_address_1: '11 OLD JEWRY',
        registered_address_2: '7TH FLOOR',
        registered_address_county: 'LONDON',
        registered_address_postcode: 'EC2R 8DU',
        registered_address_country: '35b6db3e-515c-4497-8020-3b1aea0c595d',
        business_type: '35b6db3e-515c-4497-8020-3b1aea0c595b',
        sector: '35b6db3e-515c-4497-8020-3b1aea0c5956',
        account_manager: '35b6db3e-515c-4497-8020-3b1aea0c5958',
        uk_region: '35b6db3e-515c-4497-8020-3b1aea0c5957'
      })
    })
    .then(() => {
      return knex('contact').insert({
        id: '85b6db3e-515c-4497-8020-3b1aea0c59ff',
        company: '45b6db3e-515c-4497-8020-3b1aea0c59ff',
        title: '35b6db3e-666c-4497-8020-3b1aea0c595b',
        first_name: 'Fred',
        last_name: 'Bloggs',
        job_title: 'Director',
        advisor: '35b6db3e-515c-4497-8020-3b1aea0c5958',
        primary: false,
        telephone_number: '7813 321123',
        email: 'fred@blogg.com',
        address_same_as_company: true,
        created_on: new Date()
      })
    })
    .then(() => {   // company with contact and investment project
      return knex('company').insert({
        id: '99b6db3e-515c-4497-8020-3b1aea0c70ff',
        company_number: '04888356',
        name: 'MARRIOTT BROWN LIMITED',
        registered_address_1: '9 Market Place',
        registered_address_town: 'Farringdon',
        registered_address_county: 'Oxfordshire',
        registered_address_postcode: 'SN7 7HL',
        registered_address_country: '35b6db3e-515c-4497-8020-3b1aea0c595d',
        business_type: '35b6db3e-515c-4497-8020-3b1aea0c595b',
        sector: '35b6db3e-515c-4497-8020-3b1aea0c5956',
        account_manager: '35b6db3e-515c-4497-8020-3b1aea0c5958',
        uk_region: '35b6db3e-515c-4497-8020-3b1aea0c5957'
      })
    })
    .then(() => {
      return knex('contact').insert({
        id: '85b6db3e-515c-4488-8020-3b1aea0c59ff',
        company: '99b6db3e-515c-4497-8020-3b1aea0c70ff',
        title: '35b6db3e-666c-4497-8020-3b1aea0c595b',
        first_name: 'Margret',
        last_name: 'Brown',
        job_title: 'Director',
        advisor: '35b6db3e-515c-4497-8020-3b1aea0c5958',
        primary: false,
        telephone_number: '7813 321123',
        email: 'margret@brown.com',
        address_same_as_company: true,
        created_on: new Date()
      })
    })
    .then(() => {
      return knex('investmentproject').insert({
        id: '85b6db3e-615c-4497-8020-3b1aea0c59ff',
        company: '99b6db3e-515c-4497-8020-3b1aea0c70ff',
        name: 'New investment in UK or elsewhere',
        value: 'Good',
        state: 'Active',
        land_date: new Date(2017, 5, 30),
        open: true,
        created_on: new Date()
      })
    })
    .then(() => {
      return knex('investmentproject').insert({
        id: '85b6db3e-616c-4497-8020-3b1aea0c59ff',
        company: '99b6db3e-515c-4497-8020-3b1aea0c70ff',
        name: 'Expansion in Liverpool',
        value: 'Standard',
        state: 'Prospect',
        land_date: new Date(2017, 12, 1),
        open: true,
        created_on: new Date()
      })
    })
    .then(() => {
      return knex('investmentproject').insert({
        id: '85b6db3e-617c-4497-8020-3b1aea0c59ff',
        company: '99b6db3e-515c-4497-8020-3b1aea0c70ff',
        name: 'New investment in Edinburgh',
        value: 'High',
        state: 'Won',
        state_date: new Date(2015, 2, 30),
        open: false,
        created_on: new Date()
      })
    })
    .then(() => {
      return knex('investmentproject').insert({
        id: '85b6db3e-618c-4497-8020-3b1aea0c59ff',
        company: '99b6db3e-515c-4497-8020-3b1aea0c70ff',
        name: 'Retention in Stoke-on-Trent',
        value: 'Standard',
        state: 'Abandoned',
        state_date: new Date(2013, 4, 7),
        open: false,
        created_on: new Date()
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
