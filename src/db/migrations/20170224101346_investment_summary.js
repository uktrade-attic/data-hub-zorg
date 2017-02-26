exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('investment_summary', function (table) {
      table.uuid('id').notNullable().primary()
      table.uuid('company').references('company.id')
      table.string('client_contact')
      table.uuid('client_relationship_manager').references('advisor.id')
      table.uuid('referral_source_manager').references('advisor.id')
      table.uuid('referral_source_main').references('referral.id')
      table.uuid('referral_source_sub').references('subreferral.id')
      table.boolean('fdi')
      table.uuid('fdi_type').references('fdi.id')
      table.boolean('nonfdi')
      table.uuid('nonfdi_type').references('nonfdi.id')
      table.boolean('commitment_to_invest')
      table.uuid('sector').references('sector.id')
      table.uuid('subsector').references('subsector.id')
      table.string('business_activity')
      table.string('project_description')
      table.boolean('nda')
      table.boolean('canshare')
      table.string('maynotshare')
      table.string('anonymous_description')

    })
  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('investment_summary')])
}
