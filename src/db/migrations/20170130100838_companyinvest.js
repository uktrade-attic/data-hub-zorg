exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('company', function (table) {
      table.string('investment_tier')
      table.uuid('investment_account_manager').references('advisor.id')
      table.uuid('client_relationship_manager').references('advisor.id')
      table.string('ownership')
      table.string('ownership_country')
    })
  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('company', function (table) {
      table.dropColumn('investment_tier')
      table.dropColumn('investment_account_manager')
      table.dropColumn('client_relationship_manager')
      table.dropColumn('ownership')
      table.dropColumn('ownership_country')
    })
  ])
}
