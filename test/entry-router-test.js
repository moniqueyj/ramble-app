'use strict';

//set env
process.env.APP_SECRET = 'something123';
process.env.MONGODB_URI = 'mongodb://localhost/rambletest';

const expect = require('chai').expect;
const request = require('superagent-use');
const superPromise = require('superagent-promise-plugin');
const debug = require('debug')('ramble:entry-router-test');

const authController = require('../controller/auth-controller');
const entryController = require('../controller/entry-controller');
const userController = require('../controller/user-controller');

const port = process.env.PORT || 3000;
const baseUrl = `localhost:${port}/api`;
const server = require('../server');
request.use(superPromise);

describe('testing module entry-router', function(){
  before((done) => {
    debug('before entry-router test module');
    if(!server.isRunning){
      server.listen(port, ()=>{
        server.isRunning = true;
        done();
      });
      return;
    }
    done();
  });
  after((done) =>{
    debug('afer entry-router test module');
    if(server.isRunning){
      server.close(()=>{
        server.isRunning = false;
        done();
      });
      return;
    }
    done();
  });

  describe('testing POST module entry-router', function(){
    before((done)=>{
      authController.signup({username:'testie', password:'12345'})
      .then((user)=>{
        this.tempUser = user;
        done();
      })
    .catch(done);
    });

    after((done)=>{
      entryController.removeAllEntries();
      userController.removeAllUsers();
      done();
    });
    it('should return status 200 code',(done)=>{
      request.post(`${baseUrl}/entry`)
      .send({
        userId: this.tempUser._id,
        title: 'testing',
        keywords: 'test',
        public: true
      })
      .then(res =>{
        expect(res.status).to.equal(200);
        done();
      })
      .catch(done);
    });
  });  //end of POST module


});//end of entry test module
