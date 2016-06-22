'use strict';

const expect = require('chai').expect;
const request = require('superagent-use');
const superPromise = require('superagent-promise-plugin');

const server = require('../server');
const port = process.env.PORT || 3000;
const baseUrl = `http://localhost:${port}/api`;

const authRouter = require('../route/auth-router');
