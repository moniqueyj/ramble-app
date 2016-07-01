'use strict';

const debug = require('debug')('ramble:entry-router');
const Router = require('express').Router;
const jsonParser = require('body-parser').json();

const parseBearerAuth = require('../lib/parse-bearer-auth');
const challengeController = require('../controller/challenge-controller');

const challengeRouter = module.exports = new Router();

challengeRouter.post('/challenges', parseBearerAuth, jsonParser, function(req, res, next){
  debug('POST /challenge');
  req.body.userId = req.userId;
  challengeController.createChallenge(req.body)
  .then(challenge => res.json(challenge))
  .catch(next);
});

challengeRouter.get('/challenges/:id', parseBearerAuth, function(req, res, next){
  debug('GET /challenges/:id');
  challengeController.fetchChallenge(req.params.id)
  .then(challenge => res.json(challenge))
  .catch(next);
});

challengeRouter.get('/challenges', parseBearerAuth, function(req, res, next){
  debug('GET /challenges');
  challengeController.fetchAllChallenges()
  .then(challenges => res.json(challenges))
  .catch(next);
});

challengeRouter.put('/challenges/:id', parseBearerAuth, jsonParser, function(req, res, next){
  debug('PUT /challenges/:id');
  challengeController.updateChallenge(req.params.id, req.body)
  .then(challenge => res.json(challenge))
  .catch(next);
});

challengeRouter.delete('/challenges/:id', parseBearerAuth, function(req, res, next){
  debug('DELETE /challenges/:id');
  challengeController.removeChallenge(req.params.id)
  .then(() => res.status(204).end())
  .catch(next);
});
