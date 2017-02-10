exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('company', function (table) {
      table.boolean('uk_based')
    })
  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('company', function (table) {
      table.dropColumn('uk_based')
    })
  ])
}
