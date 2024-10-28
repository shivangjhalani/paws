require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const { User, Adopter, Rehomer, Pet } = require('./models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Auth Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pawfect')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Error Handler
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
};

// Auth Routes
app.post('/api/signup', async (req, res) => {
  try {
    const { email, password, userType, ...userData } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user based on type
    let user;
    if (userType === 'adopter') {
      user = new Adopter({
        ...userData,
        email,
        password: hashedPassword,
      });
    } else if (userType === 'rehomer') {
      user = new Rehomer({
        ...userData,
        email,
        password: hashedPassword,
      });
    }

    await user.save();
    
    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Pet Routes
app.post('/api/pets', authenticateToken, async (req, res) => {
  try {
    // Verify user is a rehomer
    if (req.user.userType !== 'rehomer') {
      return res.status(403).json({ error: 'Only rehomers can create pet listings' });
    }

    const pet = new Pet({
      ...req.body,
      rehomer: req.user.userId,
    });
    
    await pet.save();
    res.status(201).json(pet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/pets', async (req, res) => {
  try {
    const {
      breed,
      age,
      size,
      gender,
      goodWithKids,
      goodWithOtherDogs,
      goodWithCats,
    } = req.query;

    // Build filter object
    const filter = { status: 'available' };
    if (breed) filter.breed = breed;
    if (size) filter.size = size;
    if (gender) filter.gender = gender;
    if (goodWithKids) filter['behavior.goodWithKids'] = goodWithKids === 'true';
    if (goodWithOtherDogs) filter['behavior.goodWithOtherDogs'] = goodWithOtherDogs === 'true';
    if (goodWithCats) filter['behavior.goodWithCats'] = goodWithCats === 'true';
    if (age) {
      const [minAge, maxAge] = age.split(',');
      filter['age.years'] = { $gte: parseInt(minAge), $lte: parseInt(maxAge) };
    }

    const pets = await Pet.find(filter)
      .populate('rehomer', 'name email phone')
      .sort('-createdAt');
    
    res.json(pets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Like/Unlike pet
app.post('/api/pets/:id/like', authenticateToken, async (req, res) => {
  try {
    // Verify user is an adopter
    if (req.user.userType !== 'adopter') {
      return res.status(403).json({ error: 'Only adopters can like pets' });
    }

    const adopter = await Adopter.findById(req.user.userId);
    const petId = req.params.id;

    // Toggle like status
    const likedPetIndex = adopter.likedPets.indexOf(petId);
    if (likedPetIndex === -1) {
      adopter.likedPets.push(petId);
    } else {
      adopter.likedPets.splice(likedPetIndex, 1);
    }

    await adopter.save();
    res.json(adopter);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get user's liked pets
app.get('/api/users/liked-pets', authenticateToken, async (req, res) => {
  try {
    const adopter = await Adopter.findById(req.user.userId)
      .populate({
        path: 'likedPets',
        populate: {
          path: 'rehomer',
          select: 'name email phone'
        }
      });

    res.json(adopter.likedPets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Adoption request
app.post('/api/pets/:id/adopt', authenticateToken, async (req, res) => {
  try {
    // Verify user is an adopter
    if (req.user.userType !== 'adopter') {
      return res.status(403).json({ error: 'Only adopters can request adoption' });
    }

    const pet = await Pet.findById(req.params.id);
    
    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }

    if (pet.status !== 'available') {
      return res.status(400).json({ error: 'Pet is not available for adoption' });
    }

    // Update pet status and add adopter reference
    pet.status = 'pending';
    pet.adopter = req.user.userId;
    await pet.save();

    res.json(pet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get user's pets (for rehomers)
app.get('/api/users/my-pets', authenticateToken, async (req, res) => {
  try {
    if (req.user.userType !== 'rehomer') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const pets = await Pet.find({ rehomer: req.user.userId })
      .populate('adopter', 'name email phone')
      .sort('-createdAt');

    res.json(pets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update pet status (for rehomers)
app.patch('/api/pets/:id/status', authenticateToken, async (req, res) => {
  try {
    const { status } = req.body;
    const pet = await Pet.findOne({ _id: req.params.id, rehomer: req.user.userId });

    if (!pet) {
      return res.status(404).json({ error: 'Pet not found or unauthorized' });
    }

    pet.status = status;
    await pet.save();
    
    res.json(pet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
