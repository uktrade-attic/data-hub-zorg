exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('company', function (table) {
      table.string('business_type')
    })
  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('company', function (table) {
      table.dropColumn('business_type')
    })
  ])
}
