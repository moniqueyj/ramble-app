'use strict';

process.env.APP_SECRET = 'something123';
process.env.MONGODB_URI = 'mongodb://localhost/rambletest';

const debug = require('debug')('ramble:demos2-test');
const expect = require('chai').expect;
const request = require('superagent-use');
const superPromise = require('superagent-promise-plugin');
const mongoose = require('mongoose');

const server = require('../server');
const port = process.env.PORT || 3000;
const baseUrl = `http://localhost:${port}/api`;

const authController = require('../controller/auth-controller');
const userController = require('../controller/user-controller');
const challengeController = require('../controller/challenge-controller');
const serverMaint = require('./lib/returnManageServer')(mongoose, server, port);
const preamble = require('./lib/prechallenge')(request, authController, challengeController, userController, server, port, baseUrl);

request.use(superPromise);

describe('testing challenge router', function(){
  debug('challengeTest');
  before((done)=>{
    serverMaint.checkServer(done);
  });
  after((done)=>{
    serverMaint.closeServer(done);
  });
  describe('testing PUT module on challenge-router', function(){
    before((done) => {
      preamble.challengePreBlock.call(this, done);
    });
    after((done)=>{
      preamble.ChallengePostBlock(done);
    });
    before((done) => {
      preamble.postChallengeBeforeBlock.call(this, done);
    });
    it('should return status code 200', (done) =>{
      request.put(`${baseUrl}/challenges/${this.tempChallenge._id}`)
      .set('Authorization', `Bearer ${this.tempUser}`)
      .send({
        userId:this.tempUser._id,
        content: 'new testing protocol'
      })
      .then(res => {
        expect(res.status).to.equal(200);
        done();
      })
      .catch(done);
    });
  });
});
//56 lines 33 lines
