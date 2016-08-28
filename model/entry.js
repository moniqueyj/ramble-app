'use strict';

const mongoose = require('mongoose');

const entrySchema = mongoose.Schema({
  title: {type: String, required: true}
  , keywords: [{type: String}]
  // ,  prompt: {type: Boolean, required: true}
  // , public: {type: Boolean, required: true}
  , publishDate: {type: Date, dafault: Date.now }
  , userId: {type: mongoose.Schema.ObjectId, required: true, ref: 'User'}
  // ,  promptId: {type: mongoose.Schema.ObjectId, ref:' Prompt'}
});

module.exports = mongoose.model('Entry', entrySchema);
