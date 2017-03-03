
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('investment_summary', function (table) {
      table.uuid('investment_source').references('company.id')
      table.uuid('investment_recipient').references('company.id')

    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('investment_summary', function (table) {
      table.dropColumn('investment_source')
      table.dropColumn('investment_recipient')
    })
  ])
};
