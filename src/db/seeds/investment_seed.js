const refs = require('../../../data/referrals.js').referral
const subrefs = require('../../../data/subreferral.js').subreferral

const business_activity = require('../../../data/business_activity.js').business_activity


console.log("########################## investment seed")

function clear (knex) {
  return knex('referral').del()
    .then(() => knex('subreferral').del())
    .then(() => knex('business_activity').del())
    .then(() => console.log("deleted"))
}

exports.seed = function (knex) {
  return clear(knex)
    .then(() => {
      return knex('referral').insert(refs)
    })
    .then(() => {
      return knex('subreferral').insert(subrefs)
    })
    .then(() => {
      return knex('business_activity').insert(business_activity)
    })
}
