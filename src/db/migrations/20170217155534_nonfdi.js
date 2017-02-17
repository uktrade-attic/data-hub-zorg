exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('nonfdi', function (table) {
      table.uuid('id').notNullable().primary()
      table.string('nonfdi')
    })
  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('nonfdi')])
}
