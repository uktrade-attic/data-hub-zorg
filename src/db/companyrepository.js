const knex = require('../db/knex')

function Companies () {
  return knex('company')
}

function CompanyFamily () {
  return knex('companyfamily')
}

function getCompany (companyId) {
  return Companies().where('id', companyId).first()
}

function getCompanies () {
  return Companies().select()
}

function addCompany (company) {
  return Companies()
    .insert(company, 'id')
    .then((result) => {
      return result[0]
    })
}

function updateCompany (id, company) {
  return Companies().where('id', id).update(company)
}

function deleteCompany (id) {
  return Companies().where('id', id).del()
}

function getParentCompanies (id) {
  return CompanyFamily().where('company_child', id).map(record => record['company_parent'])
}

function getChildCompanies (id) {
  return CompanyFamily().where('company_parent', id).map(record => record['company_child'])
}

module.exports = {
  getCompany,
  getCompanies,
  addCompany,
  deleteCompany,
  updateCompany,
  getParentCompanies,
  getChildCompanies
}
