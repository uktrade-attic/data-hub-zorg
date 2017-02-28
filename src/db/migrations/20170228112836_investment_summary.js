exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('investment_summary', function (table) {
      table.string('project_id')
    })
  ])
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('investment_summary', function (table) {
      table.dropColumn('project_id')
    })
  ])
};
