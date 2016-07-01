'use strict';

process.env.APP_SECRET = 'something123';
process.env.MONGODB_URI = 'mongodb://localhost/rambletest';

const expect = require('chai').expect;

const server = require('../server');
const port = process.env.PORT || 3000;

const authController = require('../controller/auth-controller');
const userController = require('../controller/user-controller');

describe('testing auth-controller functions', function(){
  before( (done) => {
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

  describe('test signup() function', function(){
    after( (done) => {
      userController.removeAllUsers()
      .then(() => done())
      .catch(done);
    });

    it('should return a new user', (done) => {
      authController.signup({username: 'testuser', password: 'testpassword'})
      .then((res) => {
        expect(res.length).to.equal(205);
        done();
      })
      .catch(done);
    });

    it('should return no username provided for no username', (done) => {
      authController.signup({username: '', password: 'testpassword'})
      .then(() => {
        done();
      })
      .catch((err) => {
        try {
          expect(err.message).to.equal('User validation failed');
          done();
        } catch(err) {
          done(err);
        }
      });
    });

  }); // end signup() test module

  describe('test signin() function', function(){
    before( (done) => {
      authController.signup({username: 'testuser', password: 'testpassword'})
      .then(() => done().catch(done));
    });
    after( (done) => {
      userController.removeAllUsers()
      .then(() => done().catch(done));
    });

    it('should return a token', (done) => {
      authController.signin({username: 'testuser', password: 'testpassword'})
      .then((token) => {
        expect(token.length).to.equal(205);
        done();
      })
      .catch(done);
    });

    it('should return unauthorized for wrong user', (done) => {
      authController.signin({username: 'wronguser', password: 'testpassword'})
      .then(() => {
        done();
      })
      .catch((err) => {
        expect(err.message).to.equal('wrong username or password');
        done();
      });
    });

    it('should return unauthorized for wrong password', (done) => {
      authController.signin({username: 'testuser', password: 'wrongpassword'})
      .then(() => done())
      .catch((err) => {
        try {
          expect(err.message).to.equal('wrong password');
          done();
        } catch (err) {
          done(err);
        }
      });
    });
  }); // end signin() test module
}); // end auth-controller function testing
