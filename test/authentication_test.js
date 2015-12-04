var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;

var baseURL = 'http://localhost:3000';

require('../app.js');
chai.use(chaiHttp);

describe('Test Authentication', function() {
  it('Test No Authentication', function(done) {
    chai.request(baseURL)
      .get('/admin/beers')
      .end(function(err, res) {
        expect(res.status).to.equal(401);
        done();
      });
  });

  it('Test Admin Authentication', function(done) {
    var admin = chai.request.agent(baseURL);

    admin.post('/login')
      .send({ username: 'admin', password: 'password' })
      .then(function(res) {
        console.log(res);
        expect(res).to.have.cookie('sessionid');
        done();
        // return admin.get('/admin/beers')
        //   .then(function(res) {
        //     expect(res).to.have.status(200);
        //     done();
        //   })
        //   .catch(function(err) {
        //     throw err;
        //   });
      })
      .catch(function(err) {
        throw err;
      });
  });

  // it('Test User Authentication', function() {
  //   chai.request(baseURL)
  //     .get('/user')
  //     .auth('user', 'password')
  //     .end(function(err, res) {
  //       expect(res.status).to.equal(200);
  //     });
  // });
});
