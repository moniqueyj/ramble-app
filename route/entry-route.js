'use strict';

const debug = require('debug')('ramble:entry-route');
const Router = require('express').Router;
const jsonParser = require('body-parser').json();

const parseBearerAuth = require('../lib/parse-bearer-auth');
const entryController = require('../lib/entry-controller');

const entryRouter = module.exports = new Router();

entryRouter.post('/entry', parseBearerAuth, jsonParser, function(req, res, next){
  debug('POST /entry');
  req.body.userId = req.userId;
  entryController.createEntry(req.body)
  .then(entry => res.json(entry))
  .catch(next);
});

entryRouter.get('/entry/:id', parseBearerAuth, jsonParser, function(req, res, next){
  debug('GET /entry');
  entryController.fetchEntry(req.params.id)
  .then(entry => res.json(entry))
  .catch(next);
});

entryRouter.get('/entries', parseBearerAuth, jsonParser, function(req, res, next){
  debug('GETALL');
  entryController.fetchAllEntry()
  .then(entries => res.json(entries))
  .catch(next);
});

entryRouter.put('/entry/:id', parseBearerAuth, jsonParser, function(req, res, next){
  debug('PUT /entry');
  entryController.updateEntry(req.params.id, req.body)
  .then(entry => res.json(entry))
  .catch(next);
});

entryRouter.delete('/entry/:id', parseBearerAuth, function(req, res, next){
  debug('DELETE /entry');
  entryController.removeEntry(req.params.id)
  .then(() => res.status())
  .catch(next);
});
