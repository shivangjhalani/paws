const mongoose = require('mongoose');

const rehomerSchema = new mongoose.Schema({
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending',
  },
  verificationDocuments: [{
    type: String,  // URLs to uploaded documents
    description: String,
  }],
  rehomingReason: {
    type: String,
    required: true,
  },
  previousExperience: String,
  activeListings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',
  }],
  completedRehomings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',
  }],
});

const Rehomer = User.discriminator('rehomer', rehomerSchema);

module.exports = { Rehomer }
