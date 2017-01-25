const knex = require('../db/knex')

function list (req, res) {
  const tableName = req.params.table
  knex(tableName)
    .then((records) => {
      res.json(records)
    })
}

function value (req, res) {
  const tableName = req.params.table
  const id = req.params.id

  knex(tableName)
    .select('*')
    .where(`${tableName}.id`, id)
    .then((records) => {
      res.json(records[0])
    })
}

module.exports = { list, value }
