'use strict';

const debug = require('debug')('ramble:entry-router');
const Router = require('express').Router;
const jsonParser = require('body-parser').json();

const parseBearerAuth = require('../lib/parse-bearer-auth');
const promptController = require('../controller/prompt-controller');

const promptRouter = module.exports = new Router();

promptRouter.post('/prompts', parseBearerAuth, jsonParser, function(req, res, next){
  debug('POST /prompt');
  req.body.userId = req.userId;
  promptController.createPrompt(req.body)
  .then(prompt => res.json(prompt))
  .catch(next);
});

promptRouter.get('/prompts/:id', parseBearerAuth, function(req, res, next){
  debug('GET /prompts/:id');
  promptController.fetchPrompt(req.params.id)
  .then(prompt => res.json(prompt))
  .catch(next);
});

promptRouter.get('/prompts', parseBearerAuth, function(req, res, next){
  debug('GET /prompts');
  promptController.fetchAllPrompts()
  .then(prompts => res.json(prompts))
  .catch(next);
});

promptRouter.put('/prompts/:id', parseBearerAuth, jsonParser, function(req, res, next){
  debug('PUT /prompts/:id');
  promptController.updatePrompt(req.params.id, req.body)
  .then(prompt => res.json(prompt))
  .catch(next);
});

promptRouter.delete('/prompts/:id', parseBearerAuth, function(req, res, next){
  debug('DELETE /prompts/:id');
  promptController.removeprompt(req.params.id)
  .then(() => res.status(204).end())
  .catch(next);
});
