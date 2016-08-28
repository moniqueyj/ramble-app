'use strict';

const mongoose = require('mongoose');

const PromptSchema = mongoose.Schema({
  content: {type: String, required: true}
  , userId: {type: mongoose.Schema.ObjectId, required: true, ref: 'User'}
});

module.exports = mongoose.model(' Prompt',  PromptSchema);
