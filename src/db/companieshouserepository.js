const knex = require('../db/knex')

function Companies () {
  return knex('companieshouse')
}

function getCompany (companyNumber) {
  return Companies().where('company_number', companyNumber).first()
}

function getCompanies () {
  return Companies().select()
}

function addCompany (company) {
  return Companies()
    .insert(company, 'company_number')
    .then((result) => {
      return result[0]
    })
}

function updateCompany (companyNumber, company) {
  return Companies().where('company_number', companyNumber).update(company)
}

function deleteCompany (companyNumber) {
  return Companies().where('company_number', companyNumber).del()
}

function getOrphanCH () {
  return knex.select('*')
    .from('companieshouse')
    .leftJoin('company', 'companieshouse.company_number', 'company.company_number')
    .whereNull('company.company_number')
}

module.exports = { getCompany, getCompanies, addCompany, deleteCompany, updateCompany, getOrphanCH }
