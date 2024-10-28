const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  profilePicture: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userType: {
    type: String,
    enum: ['adopter', 'rehomer'],
    required: true,
  }
}, {
  discriminatorKey: 'userType',
});

const User = mongoose.model('User', userSchema);

const adopterSchema = new mongoose.Schema({
  preferences: {
    breed: [String],
    age: {
      min: Number,
      max: Number,
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
    hasChildren: Boolean,
    childrenAges: [Number],
    hasOtherPets: Boolean,
    otherPetsDetails: String,
    houseType: {
      type: String,
      enum: ['apartment', 'house', 'other'],
    },
    hasYard: Boolean,
  },
  experience: String,
  likedPets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',
  }],
});

const Adopter = User.discriminator('adopter', adopterSchema);

module.exports = { Adopter }
