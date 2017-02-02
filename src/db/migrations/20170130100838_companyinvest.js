exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('companyinvestmentsummary', (table) => {
      table.uuid('id').notNullable().primary()
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
    knex.schema.dropTable('companyinvestmentsummary')
  ])
}
