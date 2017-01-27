exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('company', function (table) {
      table.string('headquarters')
    })
  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('company', function (table) {
      table.dropColumn('headquarters')
    })
  ])
}
