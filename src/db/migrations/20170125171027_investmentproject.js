exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('investmentproject', (table) => {
      table.uuid('id').notNullable().primary()
      table.uuid('company').references('company.id')
      table.string('name')
      table.string('value')
      table.string('state')
      table.date('land_date')
      table.date('state_date')
      table.boolean('open')
      table.date('created_on')
    })
  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('investmentproject')
  ])
}
