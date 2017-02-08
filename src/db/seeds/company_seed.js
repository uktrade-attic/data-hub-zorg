const path = require('path')
const ImportCH = require('../importch')
const ESIndex = require('../../search/')

function clear (knex) {
  return knex('companyfamily').del()
    .then(() => {
      return knex('investmentproject').del()
    })
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
      return knex('region').insert({
        id: '35b6db3e-515c-4497-1111-3b1aea0c5957',
        name: 'Scotland'
      })
    })
    .then(() => {
      return knex('advisor').insert({
        id: '35b6db3e-515c-4497-8020-3b1aea0c5958',
        name: 'Fred Brown'
      })
    })
    .then(() => {
      return knex('advisor').insert({
        id: '35b6ff3e-515c-4497-8020-3b1aea0c5958',
        name: 'Fred Green'
      })
    })
    .then(() => {
      return knex('advisor').insert({
        id: '360c19ee-dc20-4f72-bac8-e4054eef50b5',
        name: 'Andrei Nikolayevich Tupolev'
      })
    })
    .then(() => {
      return knex('turnoverrange').insert({
        id: '35bbdb3e-515c-4497-8020-3b1aea0c595b',
        name: '£6.7M-£33.5M'
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
      return knex('businesstype').insert({
        id: '98d14e94-5d95-e211-a939-e4115bead28a',
        name: 'Company'
      })
    })
    .then(() => {
      return knex('businesstype').insert({
        id: '35b6db3e-515c-4497-8888-3b1aea0c595b',
        name: 'Child of a UK private or public limited company'
      })
    })
    .then(() => {
      return knex('businesstype').insert({
        id: '35b6db45-515c-4497-8888-3b1aea0c595b',
        name: 'Foreign company'
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
        id: '4ed85f99-7e27-4041-ae7f-0440d2b36958',
        name: 'United Kingdom'
      })
    })
    .then(() => {
      return knex('country').insert({
        id: '6abbee91-7b85-49b8-a133-d59455dc2aad',
        name: 'Russia'
      })
    })
    .then(() => {
      return knex('country').insert({
        id: '2cdcb25b-6fe3-4ada-b1be-81222e927cee',
        name: 'Hong Kong'
      })
    })
    .then(() => {
      return knex('country').insert({
        id: '1cb43855-31f9-4cc6-a9a7-893ba5fb0328',
        name: 'United States of America'
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
        registered_address_country: '4ed85f99-7e27-4041-ae7f-0440d2b36958',
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
        registered_address_country: '4ed85f99-7e27-4041-ae7f-0440d2b36958',
        business_type: '35b6db3e-515c-4497-8020-3b1aea0c595b',
        sector: '35b6db3e-515c-4497-8020-3b1aea0c5956',
        account_manager: '35b6db3e-515c-4497-8020-3b1aea0c5958',
        uk_region: '35b6db3e-515c-4497-8020-3b1aea0c5957',
        website: 'http://www.marriott.co.uk/',
        turnover_range: '35bbdb3e-515c-4497-8020-3b1aea0c595b',
        employee_range: '35b6db3e-515c-4497-8020-3b1aea0c595a',
        headquarters: 'UK Headquarters'
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
        registered_address_country: '4ed85f99-7e27-4041-ae7f-0440d2b36958',
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
    .then(() => {   // CDMS Only company with no CH data
      return knex('company').insert({
        id: '99b6db3e-515c-4497-9999-3b1aea0c70ff',
        name: 'Marriott International Aberdeen',
        registered_address_1: 'Aberdeen Marriott Hotel',
        registered_address_2: 'Overton Circle',
        registered_address_town: 'Dyce',
        registered_address_county: 'Aberdeen',
        registered_address_postcode: 'AB12 7AZ',
        registered_address_country: '4ed85f99-7e27-4041-ae7f-0440d2b36958',
        business_type: '98d14e94-5d95-e211-a939-e4115bead28a',
        sector: '35b6db3e-515c-4497-8020-3b1aea0c5956',
        account_manager: '35b6db3e-515c-4497-8020-3b1aea0c5958',
        uk_region: '35b6db3e-515c-4497-1111-3b1aea0c5957'
      })
    })
    .then(() => {
      return knex('companyfamily').insert({
        company_parent: '99b6db3e-515c-4497-8020-3b1aea0c70ff', // Marriott Brown
        company_child: '45b6db3e-515c-4497-8020-3b1aea0c59ff'   // Marriot Hotels
      })
    })
    .then(() => {
      return knex('companyfamily').insert({
        company_parent: '45b6db3e-515c-4497-8020-3b1aea0c59ff', // Marriott Hotels
        company_child: '35b6db3e-515c-4497-8020-3b1aea0c59ff'   // Marriott Cleaning
      })
    })
    .then(() => {
      return knex('companyfamily').insert({
        company_parent: '45b6db3e-515c-4497-8020-3b1aea0c59ff', // Marriott Hotels
        company_child: '99b6db3e-515c-4497-9999-3b1aea0c70ff'   // Marriott Aberdeen
      })
    })
    .then(() => {   // CDMS Only company with no CH data
      return knex('company').insert({
        id: 'bddc1331-fe3d-44d6-aecf-471c49f9a0c0',
        name: 'Marriott Hotels & Resorts - EHQ',
        registered_address_1: '23/1 1st Tverskaya-yamskaya str.',
        registered_address_county: 'Moscow',
        registered_address_postcode: '125047',
        registered_address_country: '6abbee91-7b85-49b8-a133-d59455dc2aad',
        business_type: '98d14e94-5d95-e211-a939-e4115bead28a',
        sector: '35b6db3e-515c-4497-8020-3b1aea0c5956',
        account_manager: '35b6db3e-515c-4497-8020-3b1aea0c5958',
        headquarters: 'European headquarters'
      })
    })
    .then(() => {
      return knex('investmentproject').insert({
        id: '0e017c74-7d7e-4577-b978-1e80e353965b',
        company: 'bddc1331-fe3d-44d6-aecf-471c49f9a0c0',
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
        id: '46b56fa8-7cd7-45a3-9d21-4115254c13e8',
        company: 'bddc1331-fe3d-44d6-aecf-471c49f9a0c0',
        name: 'Expansion in Liverpool',
        value: 'Standard',
        state: 'Prospect',
        land_date: new Date(2017, 12, 1),
        open: true,
        created_on: new Date()
      })
    })
    .then(() => {
      return knex('companyinvestmentsummary').insert({
        id: 'bddc1331-fe3d-44d6-aecf-471c49f9a0c0',
        investment_tier: "B - Top 300",
        investment_account_manager: "35b6ff3e-515c-4497-8020-3b1aea0c5958",
        client_relationship_manager: "360c19ee-dc20-4f72-bac8-e4054eef50b5",
        ownership: "",
        ownership_country: "Russia"
      })
    })
    .then(() => {   // CDMS Only company with no CH data
      return knex('company').insert({
        id: '6018122e-eb53-4dc7-a87a-52d4cb43a656',
        name: 'Marriott International, Inc.',
        registered_address_1: 'Suite 1108, 11/F Cityplaza One',
        registered_address_county: 'Hong Kong',
        registered_address_postcode: '1111',
        registered_address_country: '2cdcb25b-6fe3-4ada-b1be-81222e927cee',
        business_type: '98d14e94-5d95-e211-a939-e4115bead28a',
        sector: '35b6db3e-515c-4497-8020-3b1aea0c5956',
        account_manager: '35b6db3e-515c-4497-8020-3b1aea0c5958',
        headquarters: 'Asian headquarters'
      })
    })
    .then(() => {
      return knex('investmentproject').insert({
        id: '4b286f4c-f9a0-4fe6-bfbc-abd19c28ea17',
        company: '6018122e-eb53-4dc7-a87a-52d4cb43a656',
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
        id: '9654f195-74c8-4525-bf7a-c4e57ed90e7b',
        company: '6018122e-eb53-4dc7-a87a-52d4cb43a656',
        name: 'Expansion in Manchester',
        value: 'Standard',
        state: 'Prospect',
        land_date: new Date(2017, 12, 1),
        open: true,
        created_on: new Date()
      })
    })
    .then(() => {
      return knex('companyinvestmentsummary').insert({
        id: '6018122e-eb53-4dc7-a87a-52d4cb43a656',
          investment_tier: "B - Top 300",
          investment_account_manager: "35b6ff3e-515c-4497-8020-3b1aea0c5958",
          client_relationship_manager: "360c19ee-dc20-4f72-bac8-e4054eef50b5",
          ownership: "",
          ownership_country: "Hong Kong"
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

