function clear (knex) {
  return Promise.all([
    knex('company').del(),
    knex('companieshouse').del(),
    knex('country').del(),
    knex('businesstype').del(),
    knex('employeerange').del(),
    knex('turnoverrange').del(),
    knex('advisor').del(),
    knex('region').del(),
    knex('sector').del()
  ])
}

exports.seed = function (knex, Promise) {
  return clear(knex, Promise)
    .then(() => {
      return knex('sector').insert({
        id: '35b6db3e-515c-4497-8020-3b1aea0c5956',
        name: 'Tech stuff'
      })
    })
    .then(() => {
      return knex('region').insert({
        id: '35b6db3e-515c-4497-8020-3b1aea0c5957',
        name: 'London'
      })
    })
    .then(() => {
      return knex('advisor').insert({
        id: '35b6db3e-515c-4497-8020-3b1aea0c5958',
        name: 'Fred Brown'
      })
    })
    .then(() => {
      return knex('turnoverrange').insert({
        id: '35bbdb3e-515c-4497-8020-3b1aea0c595b',
        name: '£20-£100000'
      })
    })
    .then(() => {
      return knex('employeerange').insert({
        id: '35b6db3e-515c-4497-8020-3b1aea0c595a',
        name: '1-100'
      })
    })
    .then(() => {
      return knex('businesstype').insert({
        id: '35b6db3e-515c-4497-8020-3b1aea0c595b',
        name: 'Private Limited Company'
      })
    })
    .then(() => {
      return knex('country').insert({
        id: '35b6db3e-515c-4497-8020-3b1aea0c595d',
        name: 'United Kingdom'
      })
    })
    .then(() => {
      return knex('companieshouse').insert({
        company_number: '123456789',
        name: 'Fred Smith Consultants',
        registered_address_1: 'Fred Bloggs House',
        registered_address_town: 'Frampworth',
        registered_address_county: 'Berkshire',
        registered_address_postcode: 'FB1 1FB',
        registered_address_country: '35b6db3e-515c-4497-8020-3b1aea0c595d',
        company_category: 'IT Stuff',
        company_status: 'Active',
        sic_code_1: '123412: IT THINGS',
        incorporation_date: '01/01/2010'
      })
    })
    .then(() => {
      return knex('company').insert({
        id: '35b6db3e-515c-4497-8020-3b1aea0c59ff',
        company_number: '123456789',
        name: 'Fred Smith Test',
        registered_address_1: 'Fred Bloggs House',
        registered_address_town: 'Frampworth',
        registered_address_county: 'Berkshire',
        registered_address_postcode: 'FB1 1FB',
        registered_address_country: '35b6db3e-515c-4497-8020-3b1aea0c595d',
        business_type: '35b6db3e-515c-4497-8020-3b1aea0c595b',
        sector: '35b6db3e-515c-4497-8020-3b1aea0c5956',
        account_manager: '35b6db3e-515c-4497-8020-3b1aea0c5958',
        uk_region: '35b6db3e-515c-4497-8020-3b1aea0c5957'
      })
    })
    .then(() => {
      return knex('company').insert({
        id: '35b6db3e-515c-4497-8020-3b1aea0c69ff',
        company_number: '123456789',
        name: 'Jane Green Test',
        registered_address_1: 'Jane Green House',
        registered_address_town: 'Frampworth',
        registered_address_county: 'Berkshire',
        registered_address_postcode: 'FB1 1FB',
        registered_address_country: '35b6db3e-515c-4497-8020-3b1aea0c595d',
        business_type: '35b6db3e-515c-4497-8020-3b1aea0c595b',
        sector: '35b6db3e-515c-4497-8020-3b1aea0c5956',
        account_manager: '35b6db3e-515c-4497-8020-3b1aea0c5958',
        uk_region: '35b6db3e-515c-4497-8020-3b1aea0c5957'
      })
    })
    .then(() => {
      return knex('company').insert({
        id: '55b6db3e-515c-4497-8020-3b1aea0c69ff',
        company_number: '123456789',
        name: 'Maud Yellow Test',
        registered_address_1: 'Jane Green House',
        registered_address_town: 'Frampworth',
        registered_address_county: 'Berkshire',
        registered_address_postcode: 'FB1 1FB',
        registered_address_country: '35b6db3e-515c-4497-8020-3b1aea0c595d',
        business_type: '35b6db3e-515c-4497-8020-3b1aea0c595b',
        sector: '35b6db3e-515c-4497-8020-3b1aea0c5956',
        account_manager: '35b6db3e-515c-4497-8020-3b1aea0c5958',
        uk_region: '35b6db3e-515c-4497-8020-3b1aea0c5957'
      })
    })
    .then(() => {
      return knex('companyfamily').insert({
        company_parent: '35b6db3e-515c-4497-8020-3b1aea0c59ff',
        company_child: '35b6db3e-515c-4497-8020-3b1aea0c69ff'
      })
    })
    .then(() => {
      return knex('companyfamily').insert({
        company_parent: '35b6db3e-515c-4497-8020-3b1aea0c69ff',
        company_child: '55b6db3e-515c-4497-8020-3b1aea0c69ff'
      })
    })
}
