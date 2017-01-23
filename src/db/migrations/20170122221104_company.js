exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('company', (table) => {
      table.uuid('id').notNullable().primary()
      table.string('name').notNullable()
      table.string('registered_address_1').notNullable()
      table.string('registered_address_2')
      table.string('registered_address_3')
      table.string('registered_address_4')
      table.string('registered_address_town')
      table.string('registered_address_county')
      table.string('registered_address_postcode')
      table.uuid('registered_address_country').references('country.id')
      table.string('company_number').references('companieshouse.company_number')
      table.string('alias')
      table.uuid('business_type').references('businesstype.id')
      table.uuid('sector').references('sector.id')
      table.uuid('employee_range').references('employeerange.id')
      table.uuid('turnover_range').references('turnoverrange.id')
      table.uuid('account_manager').references('advisor.id')
      table.boolean('lead')
      table.text('description')
      table.string('website')
      table.uuid('uk_region').references('region.id')
      table.string('trading_address_1')
      table.string('trading_address_2')
      table.string('trading_address_3')
      table.string('trading_address_4')
      table.string('trading_address_town')
      table.string('trading_address_county')
      table.string('trading_address_postcode')
      table.uuid('trading_address_country').references('country.id')
    }),
    // company exporting to countries m2m table
    // company future interest countries m2m table
    knex.schema.createTable('companieshouse', (table) => {
      table.string('company_number').notNullable().primary()
      table.string('name').notNullable()
      table.string('registered_address_1').notNullable()
      table.string('registered_address_2')
      table.string('registered_address_3')
      table.string('registered_address_4')
      table.string('registered_address_town')
      table.string('registered_address_county')
      table.string('registered_address_postcode')
      table.uuid('registered_address_country').references('country.id')
      table.string('company_category')
      table.string('company_status')
      table.string('sic_code_1')
      table.string('sic_code_2')
      table.string('sic_code_3')
      table.string('sic_code_4')
      table.date('incorporation_date')
    }),
    knex.schema.createTable('country', (table) => {
      table.uuid('id').notNullable().primary()
      table.string('name').notNullable()
    }),
    knex.schema.createTable('businesstype', (table) => {
      table.uuid('id').notNullable().primary()
      table.string('name').notNullable()
    }),
    knex.schema.createTable('employeerange', (table) => {
      table.uuid('id').notNullable().primary()
      table.string('name').notNullable()
    }),
    knex.schema.createTable('turnoverrange', (table) => {
      table.uuid('id').notNullable().primary()
      table.string('name').notNullable()
    }),
    knex.schema.createTable('advisor', (table) => {
      table.uuid('id').notNullable().primary()
      table.string('name').notNullable()
    }),
    knex.schema.createTable('region', (table) => {
      table.uuid('id').notNullable().primary()
      table.string('name').notNullable()
    }),
    knex.schema.createTable('sector', (table) => {
      table.uuid('id').notNullable().primary()
      table.string('name').notNullable()
    })
  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('company'),
    knex.schema.dropTable('companieshouse'),
    knex.schema.dropTable('country'),
    knex.schema.dropTable('businesstype'),
    knex.schema.dropTable('employeerange'),
    knex.schema.dropTable('turnoverrange'),
    knex.schema.dropTable('advisor'),
    knex.schema.dropTable('region'),
    knex.schema.dropTable('sector')
  ])
}
