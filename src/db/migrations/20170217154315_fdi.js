exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('fdi', function (table) {
      table.uuid('id').notNullable().primary()
      table.string('fdi_option')
    })
  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('fdi')])
}
