var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server/server.js');
var should = chai.should();

chai.use(chaiHttp);

describe('Initial Admin Setup', function() {
  it('should show a login/register page on /config GET', done => {
    chai.request(server)
    .get('/config')
    .end(function(err, res){
      res.should.have.status(200);
      done();
    });
  });
});
