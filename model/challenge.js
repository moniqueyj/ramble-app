'use strict';

const mongoose = require('mongoose');

const ChallengeSchema = mongoose.Schema({
  title: {type: String, required: true}
  , content: {type: String, required: true}
  , userId: {type: mongoose.Schema.ObjectId, required: true, ref: 'User'}
});

module.exports = mongoose.model('Challenge', ChallengeSchema);
