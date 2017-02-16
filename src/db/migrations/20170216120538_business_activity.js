exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('business_activity', function (table) {
      table.uuid('id').notNullable().primary()
      table.string('business_activity')
    })
  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('business_activity')])
}
