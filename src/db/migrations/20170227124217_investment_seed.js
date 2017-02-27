exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('investment_summary', function (table) {
      table.dropForeign('referral_source_sub')
    })
  ])
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('investment_summary', function (table) {
      table.foreign('referral_source_sub').references('subreferral.id')
    })
  ])
};
