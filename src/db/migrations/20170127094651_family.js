exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('companyfamily', function (table) {
      table.uuid('company_parent').references('company.id')
      table.uuid('company_child').references('company.id')
    })
  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('companyfamily')
  ])
}
