'use strict';

process.env.APP_SECRET = 'something123';
process.env.MONGODB_URI = 'mongodb://localhost/rambletest';

const mongoose = require('mongoose');
const debug = require('debug')('ramble:auth-router-test');
const expect = require('chai').expect;
const request = require('superagent-use');
const superPromise = require('superagent-promise-plugin');

const authRouter = require('../route/auth-router');

const server = require('../server');
const port = process.env.PORT || 3000;
const baseUrl = `http://localhost:${port}/api`;
const serverMaint = require('./lib/returnManageServer')(mongoose, server, port);

request.use(superPromise);

describe('testing auth-router module', function(){
  before(done => {
    serverMaint.checkServer(done);
  });
  after(done => {
    serverMaint.closeServer(done);
  });

  describe('POST test module', function() {
    console.log('HIT');
    it('should return a new user/password', (done) => {
      request.post(`${baseUrl}/signup`)
      .send({username: 'testuser', password: 'testpassword'})
      .then((res) => {
        expect(res.status).to.equal(200);
        done();
      })
      .catch(done);
    });
  }); // end POST test module
}); // end auth-routre testing module
