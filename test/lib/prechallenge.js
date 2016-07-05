'use strict';

const debug = require('debug')('ramble:preamble');
module.exports = preamble;

function preamble(request, authController, challengeController, userController, server, port, baseUrl){
  debug('preamble');
  return {
    challengePreBlock(done){
      authController.signup({username:'ramble', password:'rabblerabble'})
      .then((user)=>{
        this.tempUser = user;
        done();
      })
      .catch(done);
    },
    ChallengePostBlock(done){
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
