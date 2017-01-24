const knex = require('../db/knex')

function Companies () {
  return knex('company')
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

module.exports = { getCompany, getCompanies, addCompany, deleteCompany, updateCompany }
