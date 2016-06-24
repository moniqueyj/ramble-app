'use strict';

const debug = require('debug')('ramble:entry-router');
const Router = require('express').Router;
const jsonParser = require('body-parser').json();

const parseBearerAuth = require('../lib/parse-bearer-auth');
const challengeController = require('../controller/challenge-controller');

const challengeRouter = module.exports = new Router();

challengeRouter.post('/challenge', parseBearerAuth, jsonParser, function(req, res, next){
  debug('POST /challenge');
  challengeController.createChallenge(req.body)
  .then(challenge => res.json(challenge))
  .catch(next);
});

challengeRouter.get('/challenge/:id', parseBearerAuth, function(req, res, next){
  debug('GET /challenge/:id');
  challengeController.fetchChallenge(req.params.id)
  .then(challenge => res.json(challenge))
  .catch(next);
});

challengeRouter.get('/challenge')
