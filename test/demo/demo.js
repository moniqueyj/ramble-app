'use strict';

process.env.APP_SECRET = 'something123';
process.env.MONGODB_URI = 'mongodb://localhost/rambletest';

const debug = require('debug')('ramble:challenge-router-test');
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
  debug('demoTest');

describe('testing auth-controller functions', function(){
  before((done) => {
    if(!server.isRunning){
      server.listen(port, () => {
        server.isRunning = true;
        console.log('server started booyahhackerhackeretcetc', port);
        done();
      });
      return;
    }
    done();
  });

  after( (done) => {
    if(server.isRunning){
      server.close( () => {
        server.isRunning = false;
        console.log('server be down');
        done();
      });
      return;
    }
    done();
  });
  
  before((done) => {
        authController.signup({username:'ramble', password:'rabblerabble'})
        .then((user)=>{
          this.tempUser = user;
          done();
        })
        .catch(done);
      });
  
  before((done) => {
      challengeController.removeAllChallenges();
      userController.removeAllUsers()
    .then(()=>done())
    .catch(done);
    },
    postChallengeBeforeBlock(done){
      request.post(`${baseUrl}/challenges`)
      .set('Authorization', `Bearer ${this.tempUser}`)
      .send({
        userId: 'testing',
        content: 'test'
      })
      .then((res)=>{
        this.tempChallenge = res.body;
        done();
      })
      .catch(done);
    }
  };
}
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