const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  age: {
    years: Number,
    months: Number,
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
    url: String,
    isPrimary: Boolean,
  }],
  description: String,
  healthInfo: {
    vaccinated: Boolean,
    spayedNeutered: Boolean,
    microchipped: Boolean,
    specialNeeds: String,
    medicalHistory: String,
  },
  behavior: {
    goodWithKids: Boolean,
    goodWithOtherDogs: Boolean,
    goodWithCats: Boolean,
    energyLevel: {
      type: String,
      enum: ['low', 'medium', 'high'],
    },
    trained: Boolean,
    trainingDetails: String,
  },
  status: {
    type: String,
    enum: ['available', 'pending', 'adopted'],
    default: 'available',
  },
  location: {
    city: String,
    state: String,
    country: String,
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  adoptionFee: {
    type: Number,
    default: 0,
  },
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = { Pet }
