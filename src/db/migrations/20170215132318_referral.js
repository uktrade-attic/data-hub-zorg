exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('referral', function (table) {
      table.uuid('id').notNullable().primary()
      table.string('referral_type')
    })
  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('referral')])
}
