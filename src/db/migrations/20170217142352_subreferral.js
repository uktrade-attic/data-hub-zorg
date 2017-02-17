exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('subreferral', function (table) {
      table.uuid('id').notNullable().primary()
      table.string('subreferral_type')
      table.uuid('parent').notNullable()

    })
  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('subreferral')])
}
