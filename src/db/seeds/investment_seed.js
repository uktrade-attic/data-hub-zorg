const refs = require('../../../data/referrals.js').referral

console.log("########################## investment seed")

function clear (knex) {
  return knex('referral').del()
}



exports.seed = function (knex) {
  return clear(knex)
    .then(() => {
      return knex('referral').insert(refs)
    })
}
