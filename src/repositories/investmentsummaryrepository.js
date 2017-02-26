const knex = require('../db/knex')

function InvestmentSummary () {
  return knex('investment_summary')
}
function getInvestmentSummary (investmentSummaryId) {
  return InvestmentSummary().where('id', investmentSummaryId).first()
}

function getInvestmentSummarys () {
  return InvestmentSummary().select()
}

function addInvestmentSummary (investmentSummary) {
  return InvestmentSummary()
    .insert(investmentSummary, 'id')
    .then((result) => {
      return result[0]
    })
}

function updateInvestmentSummary (id, investmentSummary) {
  return InvestmentSummary().where('id', id).update(investmentSummary)
}

function deleteInvestmentSummary (id) {
  return InvestmentSummary().where('id', id).del()
}

function getInvestmentSummaryForCompany (id) {
  return InvestmentSummary().where('company', id)
}

module.exports = {
  getInvestmentSummary,
  getInvestmentSummarys,
  addInvestmentSummary,
  deleteInvestmentSummary,
  updateInvestmentSummary,
  getInvestmentSummaryForCompany
}
