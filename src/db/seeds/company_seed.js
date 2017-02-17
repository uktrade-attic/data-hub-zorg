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
      return knex('companyinvestmentsummary').del()
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
      return knex('subsector').del()
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
        name: 'Office'
      })
    })
    .then(() => {
      return knex('subsector').insert({
        id: '7d4c5ba8-cf69-49ff-b82b-4763edfe92f2',
        name: 'Rental',
        parent: '35b6db3e-515c-4497-8020-3b1aea0c5956'
      })
    })
    .then(() => {
      return knex('subsector').insert({
        id: '4950e488-bec0-42c8-b94f-477b229452be',
        name: 'Cleaning Services',
        parent: '35b6db3e-515c-4497-8020-3b1aea0c5956'
      })
    })
    .then(() => {
      return knex('sector').insert({
        id: '3973d8b1-b544-44c1-9df7-db026092023b',
        name: 'Aerospace'
      })
    })
    .then(() => {
      return knex('subsector').insert({
        id: '66ad1077-db5c-46a7-8845-a711cbf2f6e2',
        name: 'Maintenance',
        parent: '3973d8b1-b544-44c1-9df7-db026092023b'
      })
    })
    .then(() => {
      return knex('subsector').insert({
        id: 'e9e181d2-f6a0-e211-b972-e4115bead28a',
        name: 'Component Manufacturing',
        parent: '3973d8b1-b544-44c1-9df7-db026092023b'
      })
    })
    .then(() => {
      return knex('sector').insert({
        id: '851572a8-aff6-4a13-bff5-4d4adcecb7f4',
        name: 'Travel & Tourism'
      })
    })
    .then(() => {
      return knex('subsector').insert({
        id: '9e6d97ac-b39c-41a3-92c9-6d701dbfe317',
        name: 'Hotels',
        parent: '851572a8-aff6-4a13-bff5-4d4adcecb7f4'
      })
    })
    .then(() => {
      return knex('subsector').insert({
        id: 'df6355bf-b44d-4616-8ae7-dec9574dc515',
        name: 'Airlines',
        parent: '851572a8-aff6-4a13-bff5-4d4adcecb7f4'
      })
    })
    .then(() => {
      return knex('subsector').insert({
        id: '1db26120-9ae2-48b2-9b4e-f7c65835b468',
        name: 'Cruises',
        parent: '851572a8-aff6-4a13-bff5-4d4adcecb7f4'
      })
    })
    .then(() => {
      return knex('sector').insert({
        id: '5a821d19-bb6b-491c-9edd-c8678faac35f',
        name: 'Film Production'
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
        business_type: 'Private Limited Company',
        sector: '35b6db3e-515c-4497-8020-3b1aea0c5956',
        account_manager: '35b6db3e-515c-4497-8020-3b1aea0c5958',
        uk_region: '35b6db3e-515c-4497-8020-3b1aea0c5957',
        uk_based: true
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
        business_type: 'Private Limited Company',
        sector: '35b6db3e-515c-4497-8020-3b1aea0c5956',
        account_manager: '35b6db3e-515c-4497-8020-3b1aea0c5958',
        uk_region: '35b6db3e-515c-4497-8020-3b1aea0c5957',
        website: 'http://www.marriott.co.uk/',
        turnover_range: '35bbdb3e-515c-4497-8020-3b1aea0c595b',
        employee_range: '35b6db3e-515c-4497-8020-3b1aea0c595a',
        headquarters: 'UK Headquarters',
        uk_based: true
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
        business_type: 'Private Limited Company',
        sector: '35b6db3e-515c-4497-8020-3b1aea0c5956',
        account_manager: '35b6db3e-515c-4497-8020-3b1aea0c5958',
        uk_region: '35b6db3e-515c-4497-8020-3b1aea0c5957',
        uk_based: true
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
        business_type: 'Private Limited Company',
        sector: '35b6db3e-515c-4497-8020-3b1aea0c5956',
        account_manager: '35b6db3e-515c-4497-8020-3b1aea0c5958',
        uk_region: '35b6db3e-515c-4497-1111-3b1aea0c5957',
        uk_based: true
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
        business_type: 'Company',
        sector: '35b6db3e-515c-4497-8020-3b1aea0c5956',
        account_manager: '35b6db3e-515c-4497-8020-3b1aea0c5958',
        headquarters: 'European headquarters',
        uk_based: false
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
        investment_tier: 'B - Top 300',
        investment_account_manager: '35b6ff3e-515c-4497-8020-3b1aea0c5958',
        client_relationship_manager: '360c19ee-dc20-4f72-bac8-e4054eef50b5',
        ownership: '',
        ownership_country: 'Russia'
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
        business_type: 'Company',
        sector: '35b6db3e-515c-4497-8020-3b1aea0c5956',
        account_manager: '35b6db3e-515c-4497-8020-3b1aea0c5958',
        headquarters: 'Asian headquarters',
        uk_based: false
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
        investment_tier: 'B - Top 300',
        investment_account_manager: '35b6ff3e-515c-4497-8020-3b1aea0c5958',
        client_relationship_manager: '360c19ee-dc20-4f72-bac8-e4054eef50b5',
        ownership: '',
        ownership_country: 'Hong Kong'
      })
    })
    .then(() => {
      return knex('contact').insert({
        id: '8577db3e-515c-4497-8020-3b1aea0c59ff',
        company: '6018122e-eb53-4dc7-a87a-52d4cb43a656',
        title: '35b6db3e-666c-4497-8020-3b1aea0c595b',
        first_name: 'John',
        last_name: 'Green',
        job_title: 'Director',
        advisor: '35b6db3e-515c-4497-8020-3b1aea0c5958',
        primary: false,
        telephone_number: '7813 321123',
        email: 'john@mhi.com',
        address_same_as_company: true,
        created_on: new Date()
      })
    })
    .then(() => {   // CDMS Only company with no CH data
      return knex('company').insert({
        id: '577172f2-e7ac-44eb-840a-cfd530564c71',
        name: 'Marriott International Design & Construction Services, INC.',
        registered_address_1: 'Suite 400 Wilmington',
        registered_address_county: 'Delaware',
        registered_address_postcode: '19808',
        registered_address_country: '1cb43855-31f9-4cc6-a9a7-893ba5fb0328',
        business_type: 'Company',
        sector: '35b6db3e-515c-4497-8020-3b1aea0c5956',
        account_manager: '35b6db3e-515c-4497-8020-3b1aea0c5958',
        headquarters: 'USA',
        uk_based: false
      })
    })
    .then(() => {
      return knex('investmentproject').insert({
        id: 'ed6b6a8a-1b7f-467d-b13d-7d58e1fee842',
        company: '577172f2-e7ac-44eb-840a-cfd530564c71',
        name: 'New investment in UK or elsewhere',
        value: 'Good',
        state: 'Active',
        land_date: new Date(2017, 5, 30),
        open: true,
        created_on: new Date()
      })
    })
    .then(() => {
      return knex('companyinvestmentsummary').insert({
        id: '577172f2-e7ac-44eb-840a-cfd530564c71',
        investment_tier: 'B - Top 300',
        investment_account_manager: '35b6ff3e-515c-4497-8020-3b1aea0c5958',
        client_relationship_manager: '360c19ee-dc20-4f72-bac8-e4054eef50b5',
        ownership: '',
        ownership_country: 'USA'
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

