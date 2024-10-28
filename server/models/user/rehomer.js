// models/user/rehomer.js
const mongoose = require('mongoose');
const path = require('path');
const User = require(path.join(__dirname, '..', 'user'));

const rehomerSchema = new mongoose.Schema({
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending',
  },
  verificationDocuments: [{
    url: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['id', 'address_proof', 'other'],
      required: true,
    },
    description: String,
    uploadDate: {
      type: Date,
      default: Date.now,
    },
    verifiedAt: Date,
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  }],
  rehomingReason: {
    type: String,
    required: true,
    minlength: 20,
  },
  previousExperience: {
    type: String,
    required: true,
  },
  activeListings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',
  }],
  completedRehomings: [{
    pet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pet',
    },
    adoptedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    adoptionDate: Date,
    followUpNotes: String,
  }],
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    count: {
      type: Number,
      default: 0,
    },
    reviews: [{
      reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
      comment: String,
      date: {
        type: Date,
        default: Date.now,
      },
    }],
  },
});

rehomerSchema.virtual('activeListingsCount').get(function() {
  return this.activeListings.length;
});

rehomerSchema.virtual('completedRehomingsCount').get(function() {
  return this.completedRehomings.length;
});

rehomerSchema.methods.isVerified = function() {
  return this.verificationStatus === 'verified';
};

rehomerSchema.methods.getSuccessRate = function() {
  if (this.completedRehomings.length === 0) return 0;
  return (this.completedRehomings.length / (this.completedRehomings.length + this.activeListings.length)) * 100;
};

const Rehomer = User.discriminator('rehomer', rehomerSchema);

module.exports = Rehomer;
