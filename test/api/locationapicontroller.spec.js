/* global describe: true, beforeEach: true, afterEach: true, it:true, knex:true, chai: true, server: true */
describe('Location API Routes', () => {
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

  describe('Get all locations', () => {
    it('should return all locations', (done) => {
      chai.request(server)
        .get('/api/locations/')
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
  describe('Get single location', () => {
    it('should return a single row', (done) => {
      chai.request(server)
        .get('/api/locations/35b6db3e-515c-4497-8020-3b1aea0c5956')
        .end((err, res) => {
          if (err) console.log(err)
          expect(res).to.have.status(200)
          expect(res).to.be.json
          expect(res.body).to.be.a('object')
          expect(res.body).to.have.property('title')
          expect(res.body.title).to.equal('QE2 Conference Hall 1')
          done()
        })
    })
    it('should return a 404 for invalid id', (done) => {
      chai.request(server)
        .get('/api/locations/75b6db3e-515c-4497-8020-3b1aea0c5956')
        .end((err, res) => {
          if (err) console.log(err)
          expect(res).to.have.status(404)
          done()
        })
    })
    it('should return a 400 when the id is invalid', (done) => {
      chai.request(server)
        .get('/api/locations/d')
        .end((err, res) => {
          expect(res).to.have.status(500)
          done()
        })
    })
  })
  describe('Add location', () => {
    it('Should add a new location', (done) => {
      chai.request(server)
        .post('/api/locations')
        .send({
          title: 'Test 1 2 3',
          description: 'This is a description',
          address_1: 'address line 1',
          address_2: 'address line 2',
          town: 'address town',
          county: 'address county',
          zipcode: 'zip 1234',
          country: 'United Kingdom'
        })
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res).to.be.json // jshint ignore:line
          expect(res.body).to.have.property('address_1')
          expect(res.body).to.have.property('address_2')
          expect(res.body).to.have.property('town')
          expect(res.body).to.have.property('county')
          expect(res.body).to.have.property('zipcode')
          expect(res.body).to.have.property('country')
          expect(res.body.address_1).to.equal('address line 1')
          expect(res.body.address_2).to.equal('address line 2')
          expect(res.body.town).to.equal('address town')
          expect(res.body.county).to.equal('address county')
          expect(res.body.zipcode).to.equal('zip 1234')
          expect(res.body.country).to.equal('United Kingdom')
          done()
        })
    })
    it('should return 400 when an invalid form is posted', (done) => {
      chai.request(server)
        .post('/api/locations')
        .send({
          address_1: 'address line 1',
          address_2: 'address line 2',
          town: 'address town',
          county: 'address county',
          zipcode: 'zip 1234',
          country: 'United Kingdom'
        })
        .end((err, res) => {
          expect(res).to.have.status(400)
          expect(res).to.be.json // jshint ignore:line
          done()
        })
    })
    it('should indicate there is no title', (done) => {
      chai.request(server)
        .post('/api/locations')
        .send({})
        .end((err, res) => {
          expect(res.body).to.have.property('title')
          expect(res.body.title).to.have.property('msg')
          expect(res.body.title.msg).to.equal('You must provide a title')
          done()
        })
    })
  })
  describe('Update a location', () => {
    it('Should update an existing location', (done) => {
      chai.request(server)
        .put('/api/locations/35b6db3e-515c-4497-8020-3b1aea0c5956')
        .send({
          title: 'Test 1 2 3',
          description: 'This is a description',
          address_1: 'address line 1',
          address_2: 'address line 2',
          town: 'address town',
          county: 'address county',
          zipcode: 'zip 1234',
          country: 'United Kingdom'
        })
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res).to.be.json // jshint ignore:line
          expect(res.body).to.have.property('address_1')
          expect(res.body).to.have.property('address_2')
          expect(res.body).to.have.property('town')
          expect(res.body).to.have.property('county')
          expect(res.body).to.have.property('zipcode')
          expect(res.body).to.have.property('country')
          expect(res.body.address_1).to.equal('address line 1')
          expect(res.body.address_2).to.equal('address line 2')
          expect(res.body.town).to.equal('address town')
          expect(res.body.county).to.equal('address county')
          expect(res.body.zipcode).to.equal('zip 1234')
          expect(res.body.country).to.equal('United Kingdom')

          done()
        })
    })
    it('Should indicate when there is a missing field.', (done) => {
      chai.request(server)
        .put('/api/locations/35b6db3e-515c-4497-8020-3b1aea0c5956')
        .send({})
        .end((err, res) => {
          expect(res).to.have.status(400)
          expect(res).to.be.json // jshint ignore:line
          expect(res.body).to.have.property('title')
          expect(res.body.title).to.have.property('msg')
          expect(res.body.title.msg).to.equal('You must provide a title')
          done()

          done()
        })
    })
  })
  describe('Remove a location', () => {
    it('Should remove a location from the database', (done) => {
      chai.request(server)
        .delete('/api/locations/35b6db3e-515c-4497-8020-3b1aea0c5957')
        .end((err, res) => {
          expect(res).to.have.status(200)
          chai.request(server)
            .get('/api/locations/35b6db3e-515c-4497-8020-3b1aea0c5957')
            .end((err, res) => {
              expect(res).to.have.status(404)
              done()
            })
        })
    })
    it('Should return 404 when the id to delete doesnt exist', (done) => {
      chai.request(server)
        .delete('/api/locations/45b6db3e-515c-4497-8020-3b1aea0c5957')
        .end((err, res) => {
          expect(res).to.have.status(404)
          done()
        })
    })
  })
})
