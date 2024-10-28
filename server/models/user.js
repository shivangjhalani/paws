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

module.exports = { User }
