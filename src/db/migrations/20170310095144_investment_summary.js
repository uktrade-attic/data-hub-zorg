
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('investment_summary', function (table) {
      table.dropColumn('company')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('investment_summary', function (table) {
      table.uuid('company').references('company.id')
    })
  ])
};
