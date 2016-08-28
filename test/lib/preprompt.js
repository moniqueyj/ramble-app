'use strict';

const debug = require('debug')('ramble:preamble');
module.exports = preamble;

function preamble(request, authController, promptController, userController, server, port, baseUrl){
  debug('preamble');
  return {
    promptPreBlock(done){
      authController.signup({username:'ramble', password:'rabblerabble'})
      .then((user)=>{
        this.tempUser = user;
        done();
      })
      .catch(done);
    },
    promptPostBlock(done){
      promptController.removeAllPrompts();
      userController.removeAllUsers()
    .then(()=>done())
    .catch(done);
    },
    postPromptBeforeBlock(done){
      console.log('hitting postPromptBefore');
      request.post(`${baseUrl}/prompts`)
      .set('Authorization', `Bearer ${this.tempUser}`)
      .send({
        userId: 'testing',
        content: 'test'
      })
      .then((res)=>{
        this.tempPrompt = res.body;
        done();
      })
      .catch(done);
    }
  };
}
