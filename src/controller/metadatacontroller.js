const knex = require('../db/knex')

module.exports = function (req, res) {
  const tableName = req.params.table
  knex(tableName).select()
    .then((records) => {
      res.json(records)
    })
}
