exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('subsector', function (table) {
      table.uuid('id').notNullable().primary()
      table.string('name')
      table.uuid('parent')
    })
  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('subsector')])
}
