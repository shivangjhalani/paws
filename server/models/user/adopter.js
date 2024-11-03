const mongoose = require('mongoose');

const adopterSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  likedPets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet'
  }],
  preferences: {
    species: [String],
    breeds: [String],
    ageRange: {
      min: Number,
      max: Number
    },
    size: [String]
  },
  adoptionHistory: [{
    petId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pet'
    },
    adoptionDate: Date,
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'completed']
    }
  }]
});

const Adopter = mongoose.model('Adopter', adopterSchema);

module.exports = { Adopter };
