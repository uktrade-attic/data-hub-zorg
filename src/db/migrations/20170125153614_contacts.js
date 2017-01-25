exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('contact', (table) => {
      table.uuid('id').notNullable().primary()
      table.uuid('title').references('title.id')
      table.string('first_name')
      table.string('last_name')
      table.string('job_title')
      table.uuid('company').references('company.id')
      table.uuid('advisor').references('advisor.id')
      table.boolean('primary')
      table.string('telephone_number')
      table.string('email')
      table.boolean('address_same_as_company')
      table.string('address_1')
      table.string('address_2')
      table.string('address_3')
      table.string('address_4')
      table.string('address_town')
      table.string('address_county')
      table.string('address_postcode')
      table.uuid('address_country').references('country.id')
      table.string('telephone_alternative')
      table.string('email_alternative')
      table.string('notes')
      table.date('created_on')
    }),
    knex.schema.createTable('title', (table) => {
      table.uuid('id').notNullable().primary()
      table.string('name').notNullable()
    })
  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('contact'),
    knex.schema.dropTable('title')
  ])
}
