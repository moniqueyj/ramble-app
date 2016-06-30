'use strict';

const debug = require('debug')('ramble:server');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const httpErrors = require('http-errors');

const handleError = require('./lib/handle-error');
const authRouter = require('./route/auth-router');
const entryRouter = require('./route/entry-route');
const challengeRouter = require('./route/challenge-router');

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost/rambledev';

mongoose.connect(mongoURI);

app.use(morgan('dev'));

app.use('/api', authRouter);
app.use('/api', entryRouter);
app.use('/api', challengeRouter);

app.all('*', function(req, res, next){
  debug('404 * route');
  next(httpErrors(404, 'no such route'));
});

app.use(handleError);

const server = app.listen(port, function(){
  debug('server up on', port);
});

server.isRunning = true;
module.exports = server;
