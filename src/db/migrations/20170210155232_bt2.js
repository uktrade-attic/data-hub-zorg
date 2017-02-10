exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('businesstype')
  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('businesstype', (table) => {
      table.uuid('id').notNullable().primary()
      table.string('name').notNullable()
    })
  ])
}
