const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  species: {
    type: String,
    required: true,
    trim: true
  },
  breed: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true,
    min: 0
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female']
  },
  size: {
    type: String,
    required: true,
    enum: ['small', 'medium', 'large']
  },
  description: {
    type: String,
    required: true
  },
  images: [{
    type: String,
    required: true
  }],
  healthStatus: {
    vaccinated: Boolean,
    neutered: Boolean,
    specialNeeds: Boolean,
    specialNeedsDescription: String
  },
  behavior: {
    goodWithKids: Boolean,
    goodWithPets: Boolean,
    activityLevel: {
      type: String,
      enum: ['low', 'medium', 'high']
    }
  },
  status: {
    type: String,
    required: true,
    enum: ['available', 'pending', 'adopted'],
    default: 'available'
  },
  rehomerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  location: {
    type: String,
    required: true
  },
  adoptionFee: {
    type: Number,
    required: true,
    min: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp on save
petSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = { Pet };
