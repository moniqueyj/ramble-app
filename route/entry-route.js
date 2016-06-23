'use strict';

const debug = require('debug')('ramble:entry-route');
const Router = require('express').Router;
const jsonParser = require('body-parser').json();

const parseBearerAuth = require('../lib/parse-bearer-auth');
const entryController = require('../lib/entry-controller');

const entryRouter = module.exports = new Router();

entryRouter.post('/entry', parseBearerAuth, jsonParser, function(req, res, next){
  debug('POST /api/entry');
  req.body.userId = req.userId;
  entryController.createEntry(req.body)
  .then(entry => res.json(entry))
  .catch(next);
});

entryRouter.get('/api/entry/:id', parseBearerAuth, jsonParser, function(req, res, next){
  debug('GET /api/entry');
  entryController.fetchEntry(req.params.id)
  .then(entry => res.json(entry))
  .catch(next);
});

entryRouter.put('/api/entry/:id', parseBearerAuth, jsonParser, function(req, res, next){
  debug('PUT /api/entry');
  entryController.updateEntry(req.params.id, req.body)
  .then(entry => res.json(entry))
  .catch(next);
});

entryRouter.delete('/api/entry/:id', parseBearerAuth, function(req, res, next){
  debug('DELETE /api/entry');
  entryController.removeEntry(req.params.id)
  .then(entry => res.json(entry))
  .catch(next);
});
