const mongoose = require('mongoose');

const rehomerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  listedPets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet'
  }],
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  },
  organization: {
    name: String,
    website: String,
    type: {
      type: String,
      enum: ['individual', 'shelter', 'rescue', 'other']
    }
  },
  rating: {
    average: {
      type: Number,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    }
  }
});

const Rehomer = mongoose.model('Rehomer', rehomerSchema);

module.exports = { Rehomer };
