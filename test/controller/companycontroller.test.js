/* global describe: true, beforeEach: true, afterEach: true, it:true, knex:true, chai: true, server: true */
describe('Company API Routes', () => {
  beforeEach((done) => {
    knex.migrate.rollback()
      .then(() => {
        return knex.migrate.latest()
      })
      .then(() => {
        return knex.seed.run()
      })
      .then(() => {
        done()
      })
      .catch((error) => {
        console.log(error)
      })
  })
  afterEach((done) => {
    knex.migrate.rollback()
      .then(() => {
        done()
      })
  })

  describe('Get all companies', () => {
    it('should return all companies', (done) => {
      chai.request(server)
        .get('/company/')
        .end((err, res) => {
          console.log(err)
          expect(res).to.have.status(200)
          expect(res).to.be.json
          expect(res.body).to.be.a('array')
          expect(res.body.length).to.eq(2)
          done()
        })
    })
  })
  describe('Get single company', () => {
    it('should return a single row', (done) => {
      chai.request(server)
        .get('/company/35b6db3e-515c-4497-8020-3b1aea0c59ff/')
        .end((err, res) => {
          if (err) console.log(err)
          expect(res).to.have.status(200)
          expect(res).to.be.json
          expect(res.body).to.be.a('object')
          expect(res.body).to.have.property('name')
          expect(res.body.name).to.equal('Fred Smith Test')
          done()
        })
    })
    it('should return a 404 for invalid id', (done) => {
      chai.request(server)
        .get('/company/75b6db3e-515c-4497-8020-3b1aea0c5956/')
        .end((err, res) => {
          if (err) console.log(err)
          expect(res).to.have.status(404)
          done()
        })
    })
    it('should return a 400 when the id is invalid', (done) => {
      chai.request(server)
        .get('/company/d/')
        .end((err, res) => {
          expect(res).to.have.status(500)
          done()
        })
    })
  })
  describe('Add company', () => {
    it('Should add a new company', (done) => {
      chai.request(server)
        .post('/company/')
        .send({
          name: 'Test 1 2 3',
          registered_address_1: 'address line 1',
          registered_address_2: 'address line 2',
          registered_address_town: 'address town',
          registered_address_county: 'address county',
          registered_address_postcode: 'zip 1234',
          registered_address_country: '35b6db3e-515c-4497-8020-3b1aea0c595d'
        })
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res).to.be.json // jshint ignore:line
          expect(res.body).to.have.property('id')
          expect(res.body).to.have.property('name')
          expect(res.body).to.have.property('registered_address_1')
          expect(res.body).to.have.property('registered_address_2')
          expect(res.body).to.have.property('registered_address_town')
          expect(res.body).to.have.property('registered_address_county')
          expect(res.body).to.have.property('registered_address_postcode')
          expect(res.body).to.have.property('registered_address_country')

          expect(res.body.name).to.equal('Test 1 2 3')
          expect(res.body.registered_address_1).to.equal('address line 1')
          expect(res.body.registered_address_2).to.equal('address line 2')
          expect(res.body.registered_address_town).to.equal('address town')
          expect(res.body.registered_address_county).to.equal('address county')
          expect(res.body.registered_address_postcode).to.equal('zip 1234')
          expect(res.body.registered_address_country).to.equal('35b6db3e-515c-4497-8020-3b1aea0c595d')
          done()
        })
    })
    it('should return 400 when an invalid form is posted', (done) => {
      chai.request(server)
        .post('/company/')
        .send({
          registered_address_1: 'address line 1',
          registered_address_2: 'address line 2',
          registered_address_town: 'address town',
          registered_address_county: 'address county',
          registered_address_postcode: 'zip 1234',
          registered_address_country: '35b6db3e-515c-4497-8020-3b1aea0c595d'
        })
        .end((err, res) => {
          expect(res).to.have.status(400)
          expect(res).to.be.json // jshint ignore:line
          done()
        })
    })
    it('should indicate there is no name', (done) => {
      chai.request(server)
        .post('/company/')
        .send({})
        .end((err, res) => {
          expect(res.body).to.have.property('name')
          expect(res.body.name).to.have.property('msg')
          expect(res.body.name.msg).to.equal('You must provide a name')
          done()
        })
    })
  })
  describe('Update a company', () => {
    it('Should update an existing company', (done) => {
      chai.request(server)
        .put('/company/35b6db3e-515c-4497-8020-3b1aea0c59ff/')
        .send({
          name: 'Test 3 3 3',
          registered_address_1: 'address line 1',
          registered_address_2: 'address line 2',
          registered_address_town: 'address town',
          registered_address_county: 'address county',
          registered_address_postcode: 'zip 1234',
          registered_address_country: '35b6db3e-515c-4497-8020-3b1aea0c595d'
        })
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res).to.be.json // jshint ignore:line
          expect(res.body).to.have.property('id')
          expect(res.body).to.have.property('name')
          expect(res.body).to.have.property('registered_address_1')
          expect(res.body).to.have.property('registered_address_2')
          expect(res.body).to.have.property('registered_address_town')
          expect(res.body).to.have.property('registered_address_county')
          expect(res.body).to.have.property('registered_address_postcode')
          expect(res.body).to.have.property('registered_address_country')

          expect(res.body.name).to.equal('Test 3 3 3')
          expect(res.body.registered_address_1).to.equal('address line 1')
          expect(res.body.registered_address_2).to.equal('address line 2')
          expect(res.body.registered_address_town).to.equal('address town')
          expect(res.body.registered_address_county).to.equal('address county')
          expect(res.body.registered_address_postcode).to.equal('zip 1234')
          expect(res.body.registered_address_country).to.equal('35b6db3e-515c-4497-8020-3b1aea0c595d')

          done()
        })
    })
    it('Should indicate when there is a missing field.', (done) => {
      chai.request(server)
        .put('/company/35b6db3e-515c-4497-8020-3b1aea0c59ff/')
        .send({})
        .end((err, res) => {
          expect(res).to.have.status(400)
          expect(res).to.be.json // jshint ignore:line
          expect(res.body).to.have.property('name')
          expect(res.body.name).to.have.property('msg')
          expect(res.body.name.msg).to.equal('You must provide a name')
          done()
        })
    })
  })
  describe('Remove a company', () => {
    it('Should remove a company from the database', (done) => {
      chai.request(server)
        .delete('/company/35b6db3e-515c-4497-8020-3b1aea0c59ff/')
        .end((err, res) => {
          expect(res).to.have.status(200)
          chai.request(server)
            .get('/company/35b6db3e-515c-4497-8020-3b1aea0c5957/')
            .end((err, res) => {
              expect(res).to.have.status(404)
              done()
            })
        })
    })
    it('Should return 404 when the id to delete doesnt exist', (done) => {
      chai.request(server)
        .delete('/company/45b6db3e-515c-4497-8020-3b1aea0c5957/')
        .end((err, res) => {
          expect(res).to.have.status(404)
          done()
        })
    })
  })
})
