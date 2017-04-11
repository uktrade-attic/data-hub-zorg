exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('uk-region', function (table) {
      table.uuid('id').notNullable().primary()
      table.string('name')
    }),
    knex.schema.createTable('employee-range', function (table) {
      table.uuid('id').notNullable().primary()
      table.string('name')
    }),
    knex.schema.createTable('business-type', function (table) {
      table.uuid('id').notNullable().primary()
      table.string('name')
    }),
    knex.schema.createTable('team', function (table) {
      table.uuid('id').notNullable().primary()
      table.string('name')
    }),
    knex.schema.createTable('interaction-type', function (table) {
      table.uuid('id').notNullable().primary()
      table.string('name')
    }),
    knex.schema.createTable('event', function (table) {
      table.uuid('id').notNullable().primary()
      table.string('name')
    }),
    knex.schema.createTable('service-delivery-status', function (table) {
      table.uuid('id').notNullable().primary()
      table.string('name')
    }),
    knex.schema.createTable('headquarter-type', function (table) {
      table.uuid('id').notNullable().primary()
      table.string('name')
    }),
    knex.schema.createTable('turnover', function (table) {
      table.uuid('id').notNullable().primary()
      table.string('name')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('uk-region'),
    knex.schema.dropTable('employee-range'),
    knex.schema.dropTable('business-type'),
    knex.schema.dropTable('team'),
    knex.schema.dropTable('interaction-type'),
    knex.schema.dropTable('event'),
    knex.schema.dropTable('service-delivery-status'),
    knex.schema.dropTable('headquarter-type'),
    knex.schema.dropTable('turnover')

  ])
}



