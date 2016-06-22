'use strict';

process.env.APP_SECRET = 'something123';
process.env.MONGODB_URI = `mongodb://localhost/rambletest`;

const debug = require('debug')('ramble:auth-router-test');
const expect = require('chai').expect;
const request = require('superagent-use');
const superPromise = require('superagent-promise-plugin');

const server = require('../server');
const port = process.env.PORT || 3000;
const baseUrl = `http://localhost:${port}/api`;

const authRouter = require('../route/auth-router');
const authController = require('../controller/auth-controller');
const userController = require('../controller/user-controller');

request.use(superPromise);

describe('testing auth-router module', function(){
  before( (done) => {
    debug('before module auth-router');
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
    debug('after module auth-router');
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

  describe('test POST /signup', function(){
    after( (done) => {
      userController.removeAllUsers()
      .then(() => done())
      .catch(done);
    });

    it('should return status 200 and a user', (done) => {
      request.post(`${baseUrl}/signup`)
      .send({username: 'test user', password: 'test password'})
      .then( res => {
        expect(res.status).to.equal(200);
        done();
      })
      .catch(done);
    });

    it('should return status 400 for no body', (done) =>{
  // things
    });
  }); // end POST test module
}) // end of auth-router test module
