// models/user/adopter.js
const mongoose = require('mongoose');
const path = require('path');
const User = require(path.join(__dirname, '..', 'user'));

const adopterSchema = new mongoose.Schema({
  preferences: {
    breed: [String],
    age: {
      min: {
        type: Number,
        min: 0,
        max: 30,
      },
      max: {
        type: Number,
        min: 0,
        max: 30,
      },
    },
    size: [{
      type: String,
      enum: ['small', 'medium', 'large'],
    }],
    gender: [{
      type: String,
      enum: ['male', 'female'],
    }],
  },
  householdInfo: {
    hasChildren: {
      type: Boolean,
      required: true,
    },
    childrenAges: [Number],
    hasOtherPets: {
      type: Boolean,
      required: true,
    },
    otherPetsDetails: String,
    houseType: {
      type: String,
      enum: ['apartment', 'house', 'other'],
      required: true,
    },
    hasYard: {
      type: Boolean,
      required: true,
    },
  },
  experience: {
    type: String,
    required: true,
  },
  likedPets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',
  }],
  adoptionHistory: [{
    pet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pet',
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'cancelled'],
    },
    requestDate: {
      type: Date,
      default: Date.now,
    },
    completionDate: Date,
    notes: String,
  }],
});

adopterSchema.pre('save', function(next) {
  if (this.preferences.age) {
    if (this.preferences.age.min > this.preferences.age.max) {
      next(new Error('Minimum age cannot be greater than maximum age'));
    }
  }
  next();
});

adopterSchema.methods.hasLikedPet = function(petId) {
  return this.likedPets.includes(petId);
};

const Adopter = User.discriminator('adopter', adopterSchema);

module.exports = Adopter;
