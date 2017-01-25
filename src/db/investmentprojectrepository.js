const knex = require('../db/knex')

function InvestmentProjects () {
  return knex('investmentproject')
}

function getInvestmentProject (investmentProjectId) {
  return InvestmentProjects().where('id', investmentProjectId).first()
}

function getInvestmentProjects () {
  return InvestmentProjects().select()
}

function addInvestmentProject (investmentProject) {
  return InvestmentProjects()
    .insert(investmentProject, 'id')
    .then((result) => {
      return result[0]
    })
}

function updateInvestmentProject (id, investmentProject) {
  return InvestmentProjects().where('id', id).update(investmentProject)
}

function deleteInvestmentProject (id) {
  return InvestmentProjects().where('id', id).del()
}

function getInvestmentProjectsForCompany (id) {
  return InvestmentProjects().where('company', id)
}

module.exports = {
  getInvestmentProject,
  getInvestmentProjects,
  addInvestmentProject,
  deleteInvestmentProject,
  updateInvestmentProject,
  getInvestmentProjectsForCompany
}
