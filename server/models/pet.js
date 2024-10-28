// models/pet.js
const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  breed: {
    type: String,
    required: true,
  },
  age: {
    years: {
      type: Number,
      required: true,
      min: 0,
      max: 30,
    },
    months: {
      type: Number,
      required: true,
      min: 0,
      max: 11,
    },
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true,
  },
  size: {
    type: String,
    enum: ['small', 'medium', 'large'],
    required: true,
  },
  color: String,
  images: [{
    url: {
      type: String,
      required: true,
    },
    isPrimary: {
      type: Boolean,
      default: false,
    },
  }],
  description: {
    type: String,
    required: true,
    minlength: 10,
  },
  healthInfo: {
    vaccinated: {
      type: Boolean,
      default: false,
    },
    spayedNeutered: {
      type: Boolean,
      default: false,
    },
    microchipped: {
      type: Boolean,
      default: false,
    },
    specialNeeds: String,
    medicalHistory: String,
  },
  behavior: {
    goodWithKids: {
      type: Boolean,
      default: false,
    },
    goodWithOtherDogs: {
      type: Boolean,
      default: false,
    },
    goodWithCats: {
      type: Boolean,
      default: false,
    },
    energyLevel: {
      type: String,
      enum: ['low', 'medium', 'high'],
      required: true,
    },
    trained: {
      type: Boolean,
      default: false,
    },
    trainingDetails: String,
  },
  status: {
    type: String,
    enum: ['available', 'pending', 'adopted'],
    default: 'available',
  },
  location: {
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  rehomer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  adopter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  adoptionFee: {
    type: Number,
    min: 0,
    default: 0,
  },
}, {
  timestamps: true
});

// Add indexes for common queries
petSchema.index({ status: 1, 'location.city': 1, 'location.state': 1 });
petSchema.index({ rehomer: 1, status: 1 });
petSchema.index({ breed: 1, status: 1 });

// Virtual for pet's age in readable format
petSchema.virtual('ageString').get(function() {
  let age = '';
  if (this.age.years > 0) {
    age += `${this.age.years} year${this.age.years > 1 ? 's' : ''}`;
  }
  if (this.age.months > 0) {
    if (age) age += ' and ';
    age += `${this.age.months} month${this.age.months > 1 ? 's' : ''}`;
  }
  return age;
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
