'use strict';

const debug = require('debug')('ramble:testingpre');
module.exports = pre;


function pre(request, authController,entryController, userController, port, baseUrl){
  debug('inside pre');
  return {
    beforeBlock(done){
      authController.signup({username:'test', password:'12345'})
      .then((user)=>{
        this.tempUser = user;
        done();
      })
      .catch(done);
    },
    afterBlock(done){
      entryController.removeAllEntries();
      userController.removeAllUsers()
    .then(()=>done())
    .catch(done);
    },
    postBeforeBlock(done){
      request.post(`${baseUrl}/entry`)
      .set('Authorization', `Bearer ${this.tempUser}`)
      .send({
        userId: this.tempUser._id,
        title: 'testing',
        keywords: 'test'
      })
      .then((res)=>{
        this.tempEntry = res.body;
        done();
      })
      .catch(done);
    }
  };
}

const pre = require('./lib/preworkforItBlcok')(request, authController,entryController, userController, port, baseUrl);
