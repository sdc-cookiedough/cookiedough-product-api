const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
require('dotenv').config();

chai.use(chaiHttp);

it('Test API: products', function(done) {
  chai.request(`http://localhost:${process.env.PORT}`)
    .get('/products')
    .end((err, res) => {
      expect(res).to.have.status(200);
      done();
    })
});

it('Test API: products/:product_id', function(done) {
  chai.request(`http://localhost:${process.env.PORT}`)
    .get('/products/1000000')
    .end((err, res) => {
      expect(res).to.have.status(200);
      done();
    })
});

it('Test API: products/:product_id/styles', function(done) {
  this.timeout(10000);
  chai.request(`http://localhost:${process.env.PORT}`)
    .get('/products/999999/styles')
    .end((err, res) => {
      expect(res).to.have.status(200);
      done();
    })
});

it('Test API: products/:product_id/related', function(done) {
  chai.request(`http://localhost:${process.env.PORT}`)
    .get('/products/999998/related')
    .end((err, res) => {
      expect(res).to.have.status(200);
      done();
    })
});