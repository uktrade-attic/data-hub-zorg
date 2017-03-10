

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('investment_summary', function (table) {
      table.date('estimated_land_date')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('investment_summary', function (table) {
      table.dropColumn('estimated_land_date')
    })
  ])
};
