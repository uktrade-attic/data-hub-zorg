/* global describe: true, beforeEach: true, afterEach: true, it:true */
const search = require('../../src/search')

describe('Search Index', () => {
  beforeEach(function (done) {
    this.timeout(10000)
    search.createIndex()
      .then((res) => {
        return search.indexCompany({
          id: '75b6db3e-515c-4497-8020-3b1aea0c5956',
          name: 'Test 1 2 3',
          registered_address_1: 'address line 1',
          registered_address_2: 'address line 2',
          registered_address_town: 'address town',
          registered_address_county: 'address county',
          registered_address_postcode: 'zip 1234',
          registered_address_country: '35b6db3e-515c-4497-8020-3b1aea0c595d'
        })
      })
      .then(() => {
        console.log('Created Index')
        setTimeout(function () {
          done()
        }, 5000)
      })
  })

  afterEach(function (done) {
    search.deleteIndex()
      .then(() => {
        done()
      })
  })

  describe('search', () => {
    it('should find a record in the index', function (done) {
      search.search('Test')
        .then((results) => {
          expect(results.total).to.equal(1)
          expect(results.hits[0]._source.name).to.equal('Test 1 2 3')
          done()
        })
        .catch((error) => {
          console.log(error)
        })
    })
  })
})
