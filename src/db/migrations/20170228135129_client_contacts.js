exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('client_contacts', function (table) {
      table.uuid('id').notNullable().primary()
      table.string('contact')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('client_contacts')])
}
