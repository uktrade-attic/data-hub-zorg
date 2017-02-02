const knex = require('../db/knex')

function Companies () {
  return knex('company')
}

function CompanyFamily () {
  return knex('companyfamily')
}

function CompanyInvestmentSummary () {
  return knex('companyinvestmentsummary')
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

function getCompanyInvestmentSummary (id) {
  return CompanyInvestmentSummary().where('id', id).first()
}

function addCompanyInvestmentSummary (summary) {
  return CompanyInvestmentSummary()
    .insert(summary, 'id')
    .then((result) => {
      return result[0]
    })
}

function updateCompanyInvestmentSummary (summary) {
  return getCompanyInvestmentSummary(summary.id)
    .then((result) => {
      if (!result) {
        return CompanyInvestmentSummary()
          .insert(summary, 'id')
          .then((result) => {
            return result[0]
          })
      } else {
        return CompanyInvestmentSummary().where('id', summary.id).update(summary)
      }
    })
}

module.exports = {
  getCompany,
  getCompanies,
  addCompany,
  deleteCompany,
  updateCompany,
  getParentCompanies,
  getChildCompanies,
  getCompanyInvestmentSummary,
  addCompanyInvestmentSummary,
  updateCompanyInvestmentSummary
}
