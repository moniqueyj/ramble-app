'use strict';

process.env.APP_SECRET = 'sonething123';
process.env.MONGODB_URI = 'mongodb://localhost/rambletest';

const debug = require('debug')('ramble:auth-router-test');
const expect = require('chai').expect;
const request = require('superagent-use');
const superPromise = require('superagent-promise-plugin');

const authRouter = require('../route/auth-router');

const server = require('../server');
const port = process.env.PORT || 3000;
const baseUrl = `http://localhost:${port}/api`;

request.use(superPromise);

describe('testing auth-router module', function(){
  before
})
