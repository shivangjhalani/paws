const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();


// Import models
const { User, Pet, Adopter, Rehomer } = require('./models');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const uploadPath = path.join(__dirname, 'uploads');
    cb(null, uploadPath);
  },
  filename: function(req, file, cb) {
    cb(null, 'pet-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // 10MB limit
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).array('images', 5); // Allow up to 5 images

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://shivang:092004@paws.3fngq.mongodb.net/?retryWrites=true&w=majority&appName=paws')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

// AUTH ROUTES

app.post('/api/signup', async (req, res) => {
  try {
    const { email, password, userType, name, phone, location } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create base user
    const user = new User({
      email,
      password: hashedPassword,
      userType,
      name,
      phone,
      location
    });

    await user.save();

    // Create specific user type document
    if (userType === 'adopter') {
      const adopter = new Adopter({
        userId: user._id,
        likedPets: []
      });
      await adopter.save();
    } else if (userType === 'rehomer') {
      const rehomer = new Rehomer({
        userId: user._id,
        listedPets: []
      });
      await rehomer.save();
    }

    res.status(201).json({ message: 'User created successfully', userType });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, userType: user.userType },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      userType: user.userType,
      userId: user._id,
      name: user.name
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

// PET ROUTES

app.post('/api/pets', authenticateToken, (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err });
    }

    try {
      if (req.user.userType !== 'rehomer') {
        return res.status(403).json({ message: 'Only rehomers can list pets' });
      }

      const imageUrls = req.files.map(file => `/uploads/${file.filename}`);

      const petData = JSON.parse(req.body.petData);
      const pet = new Pet({
        ...petData,
        images: imageUrls,
        rehomerId: req.user.userId,
        status: 'available'
      });

      await pet.save();

      // Update rehomer's listedPets
      await Rehomer.findOneAndUpdate(
        { userId: req.user.userId },
        { $push: { listedPets: pet._id } }
      );

      res.status(201).json(pet);
    } catch (error) {
      res.status(500).json({ message: 'Error creating pet listing', error: error.message });
    }
  });
});

// Get all pets for a specific rehomer
app.get('/api/rehomer/pets', authenticateToken, async (req, res) => {
  try {
    if (req.user.userType !== 'rehomer') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const pets = await Pet.find({ rehomerId: req.user.userId })
      .sort({ createdAt: -1 });

    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pets', error: error.message });
  }
});

// Update pet listing
app.put('/api/pets/:id', authenticateToken, (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err });
    }

    try {
      // Verify the pet belongs to the rehomer
      const pet = await Pet.findOne({
        _id: req.params.id,
        rehomerId: req.user.userId
      });

      if (!pet) {
        return res.status(404).json({ message: 'Pet not found or unauthorized' });
      }

      // Parse the pet data from the form
      const petData = JSON.parse(req.body.petData);
      const existingImages = JSON.parse(req.body.existingImages || '[]');

      // If new images were uploaded, use those. Otherwise, keep existing images
      const imageUrls = req.files ?
        req.files.map(file => `/uploads/${file.filename}`) :
        existingImages;

      // Update the pet with new data
      const updatedPet = await Pet.findByIdAndUpdate(
        req.params.id,
        {
          ...petData,
          images: imageUrls,
          updatedAt: Date.now()
        },
        { new: true }
      );

      res.json(updatedPet);
    } catch (error) {
      res.status(500).json({ message: 'Error updating pet', error: error.message });
    }
  });
});

// Delete pet listing
app.delete('/api/pets/:id', authenticateToken, async (req, res) => {
  try {
    const pet = await Pet.findOne({
      _id: req.params.id,
      rehomerId: req.user.userId
    });

    if (!pet) {
      return res.status(404).json({ message: 'Pet not found or unauthorized' });
    }

    await Pet.findByIdAndDelete(req.params.id);

    // Remove from rehomer's listedPets
    await Rehomer.findOneAndUpdate(
      { userId: req.user.userId },
      { $pull: { listedPets: req.params.id } }
    );

    res.json({ message: 'Pet listing deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting pet', error: error.message });
  }
});

// Get all available pets (Public)
app.get('/api/pets', async (req, res) => {
  try {
    const pets = await Pet.find({ status: 'available' })
      .populate('rehomerId', 'name location');
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pets', error: error.message });
  }
});

// Get pet by ID
app.get('/api/pets/:id', async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id)
      .populate('rehomerId', 'name location phone email');
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.json(pet);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pet', error: error.message });
  }
});

// Update pet (Rehomer only)
app.put('/api/pets/:id', authenticateToken, async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    if (pet.rehomerId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized to update this pet' });
    }

    const updatedPet = await Pet.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedPet);
  } catch (error) {
    res.status(500).json({ message: 'Error updating pet', error: error.message });
  }
});

// Delete pet (Rehomer only)
app.delete('/api/pets/:id', authenticateToken, async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    if (pet.rehomerId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized to delete this pet' });
    }

    await Pet.findByIdAndDelete(req.params.id);

    // Remove from rehomer's listedPets
    await Rehomer.findOneAndUpdate(
      { userId: req.user.userId },
      { $pull: { listedPets: req.params.id } }
    );

    res.json({ message: 'Pet deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting pet', error: error.message });
  }
});

// ADOPTER ROUTES

// Like a pet
app.post('/api/pets/:id/like', authenticateToken, async (req, res) => {
  try {
    if (req.user.userType !== 'adopter') {
      return res.status(403).json({ message: 'Only adopters can like pets' });
    }

    const adopter = await Adopter.findOne({ userId: req.user.userId });
    if (!adopter) {
      return res.status(404).json({ message: 'Adopter not found' });
    }

    if (adopter.likedPets.includes(req.params.id)) {
      return res.status(400).json({ message: 'Pet already liked' });
    }

    adopter.likedPets.push(req.params.id);
    await adopter.save();

    res.json({ message: 'Pet liked successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error liking pet', error: error.message });
  }
});

// Unlike a pet
app.delete('/api/pets/:id/like', authenticateToken, async (req, res) => {
  try {
    if (req.user.userType !== 'adopter') {
      return res.status(403).json({ message: 'Only adopters can unlike pets' });
    }

    await Adopter.findOneAndUpdate(
      { userId: req.user.userId },
      { $pull: { likedPets: req.params.id } }
    );

    res.json({ message: 'Pet unliked successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error unliking pet', error: error.message });
  }
});

// Get liked pets
app.get('/api/liked-pets', authenticateToken, async (req, res) => {
  try {
    if (req.user.userType !== 'adopter') {
      return res.status(403).json({ message: 'Only adopters can view liked pets' });
    }

    const adopter = await Adopter.findOne({ userId: req.user.userId })
      .populate({
        path: 'likedPets',
        populate: {
          path: 'rehomerId',
          select: 'name location email phone'  // Added email and phone here
        }
      });

    res.json(adopter.likedPets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching liked pets', error: error.message });
  }
});

// REHOMER ROUTES

// Get rehomer's listed pets
app.get('/api/my-listings', authenticateToken, async (req, res) => {
  try {
    if (req.user.userType !== 'rehomer') {
      return res.status(403).json({ message: 'Only rehomers can view their listings' });
    }

    const rehomer = await Rehomer.findOne({ userId: req.user.userId })
      .populate('listedPets');

    res.json(rehomer.listedPets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching listings', error: error.message });
  }
});

// USER ROUTES

// Get user profile
app.get('/api/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
});

// Update user profile
app.put('/api/profile', authenticateToken, async (req, res) => {
  try {
    const { password, ...updateData } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      updateData,
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
