# PAWS

## Setup
```
❯ tree -I "node_modules|dist|coverage|.git|.cache|*.png"
.
├── client
│   ├── components.json
│   ├── eslint.config.js
│   ├── index.html
│   ├── jsconfig.app.json
│   ├── jsconfig.json
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── public
│   │   ├── about.webp
│   │   ├── sampledogs
│   │   └── vite.svg
│   ├── README.md
│   ├── src
│   │   ├── App.jsx
│   │   ├── assets
│   │   ├── components
│   │   │   ├── FilterDialog.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── PetImages.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── ui
│   │   │       ├── accordion.jsx
│   │   │       ├── alert.jsx
│   │   │       ├── badge.jsx
│   │   │       ├── button.jsx
│   │   │       ├── card.jsx
│   │   │       ├── checkbox.jsx
│   │   │       ├── dialog.jsx
│   │   │       ├── input.jsx
│   │   │       ├── label.jsx
│   │   │       ├── navigation-menu.jsx
│   │   │       ├── select.jsx
│   │   │       ├── separator.jsx
│   │   │       ├── slider.jsx
│   │   │       ├── switch.jsx
│   │   │       ├── table.jsx
│   │   │       ├── tabs.jsx
│   │   │       └── textarea.jsx
│   │   ├── context
│   │   │   └── AuthContext.jsx
│   │   ├── index.css
│   │   ├── lib
│   │   │   └── utils.js
│   │   ├── main.jsx
│   │   ├── pages
│   │   │   ├── About.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── EditPet.jsx
│   │   │   ├── ExplorePets.jsx
│   │   │   ├── FAQ.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── LikedPets.jsx
│   │   │   ├── ListPets.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── ManagePets.jsx
│   │   │   └── Signup.jsx
│   │   └── services
│   │       ├── api.jsx
│   │       └── petapi.jsx
│   ├── tailwind.config.js
│   └── vite.config.js
├── README.md
└── server
    ├── models
    │   ├── index.js
    │   ├── pet.js
    │   ├── user
    │   │   ├── adopter.js
    │   │   └── rehomer.js
    │   └── user.js
    ├── package.json
    ├── package-lock.json
    ├── server.js
    └── uploads
        ├── image1.png
        └── ...
```
- Vite
- Express

> Initial setup : https://youtu.be/mKmxc8TcWQ8?si=RHCkCCJ_Ajum-k_J + Shadcn in vite setup

---

<details>
  <summary>Server explanation</summary>

# Server

## Overview

- This Node.js server uses the Express framework to handle HTTP requests and responses.
- It connects to a MongoDB database using Mongoose.
- Manages user authentication with JSON Web Tokens (JWT).
- Supports user signup and login.
- Manages pet listing.
- Handles file uploads using Multer.
- Routes are protected with middleware to ensure that only authenticated users can access certain endpoints.
- Includes specific routes for adopters and rehomers to manage their respective functionalities.

## Modules used

1. **Express**: The main framework used to build the server.
2. **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
3. **Bcrypt**: A library to hash passwords.
4. **JWT**: Used for authentication.
5. **CORS**: Middleware to enable Cross-Origin Resource Sharing.
6. **Multer**: Middleware for handling file uploads.
7. **Path**: Node.js module for handling file and directory paths.

## Components

1. **Models**: MongoDB models for User, Pet, Adopter, and Rehomer.
2. **Middleware**: 
   - `cors()`: Enables CORS.
   - `express.json()`: Parses incoming JSON requests.
   - `authenticateToken`: Middleware to authenticate JWT tokens.
3. **File Upload Configuration**: 
   - `multer.diskStorage`: Configures storage for uploaded files.
   - `checkFileType`: Validates the file type of uploaded images.
4. **Routes**:
   - **Auth Routes**: Handles user signup and login.
   - **Pet Routes**: Handles CRUD operations for pet listings.
   - **Adopter Routes**: Handles liking and unliking pets.
   - **Rehomer Routes**: Handles fetching listed pets for a rehomer.
   - **User Routes**: Handles fetching and updating user profiles.

## Architecture

### Models

- **User**: Represents a user in the system.
- **Pet**: Represents a pet listing.
- **Adopter**: Represents an adopter user type.
- **Rehomer**: Represents a rehomer user type.

### Middleware

- **CORS**: Allows cross-origin requests.
- **JSON Parsing**: Parses JSON bodies of incoming requests.
- **Authentication**: Verifies JWT tokens to protect routes.

### File Upload Configuration

- **Multer Storage**: Configures where and how files are stored.
- **File Type Check**: Ensures only images are uploaded.

### Routes

- **Auth Routes**:
  - `/api/signup`: Registers a new user.
  - `/api/login`: Logs in a user and returns a JWT token.

- **Pet Routes**:
  - `/api/pets`: Creates a new pet listing.
  - `/api/rehomer/pets`: Fetches all pets listed by a rehomer.
  - `/api/pets/:id`: Updates or deletes a pet listing.
  - `/api/pets`: Fetches all available pets.
  - `/api/pets/:id`: Fetches a pet by ID.

- **Adopter Routes**:
  - `/api/pets/:id/like`: Likes a pet.
  - `/api/pets/:id/like`: Unlikes a pet.
  - `/api/liked-pets`: Fetches all liked pets for an adopter.

- **Rehomer Routes**:
  - `/api/my-listings`: Fetches all pets listed by the rehomer.

- **User Routes**:
  - `/api/profile`: Fetches the user profile.
  - `/api/profile`: Updates the user profile.

## Server Initialization

- **Port**: The server listens on port 8080.
- **MongoDB Connection**: Connects to the MongoDB database using Mongoose.

## Detailed Code Explanation

### 1. Initial Setup & Dependencies

```javascript
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const { User, Pet, Adopter, Rehomer } = require('./models');
const app = express();
```

**Dependency Analysis:**
1. `express`
   - Core web framework
   - Handles routing and middleware
   - Provides HTTP utility methods
   - Reason: Industry standard, robust, and well-maintained

2. `mongoose`
   - MongoDB object modeling tool
   - Provides schema validation
   - Handles relationships between collections
   - Reason: Simplifies database operations and adds type safety

3. `bcryptjs`
   - Password hashing library
   - Pure JavaScript implementation
   - Handles salt generation automatically
   - Reason: Security best practice for password storage

4. `jsonwebtoken`
   - JWT generation and verification
   - Stateless authentication
   - Supports token expiration
   - Reason: Industry standard for web authentication

5. `cors`
   - Cross-Origin Resource Sharing
   - Security middleware
   - Configurable access control
   - Reason: Required for frontend-backend communication

6. `multer`
   - Multipart form data handler
   - File upload processing
   - Configurable storage options
   - Reason: Needed for image upload functionality

7. `path`
   - Native Node.js module
   - Cross-platform path handling
   - Directory manipulation
   - Reason: Ensures consistent file paths across operating systems

### 2. Core Middleware Setup

```javascript
app.use(cors());
app.use(express.json());
```

**CORS Configuration:**
1. Purpose:
   - Enables cross-origin requests
   - Required for frontend integration
   - Security feature for browsers

2. Implementation details:
   - No options specified = all origins allowed
   - All HTTP methods enabled
   - Credentials allowed
   - Headers allowed

**JSON Parser:**
1. Purpose:
   - Parses incoming request bodies
   - Converts JSON strings to objects
   - Available at req.body

2. Security considerations:
   - Automatically rejects invalid JSON
   - Prevents JSON parsing attacks
   - Size limits for payload

### 3. File Upload Configuration

```javascript
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'uploads');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, 'pet-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
}).array('images', 5);
```

**Storage Configuration:**
1. Destination setup:
   - Uses local disk storage
   - Creates 'uploads' directory in project root
   - Path handled cross-platform using `path.join`
   - Error handling through callback

2. Filename generation:
   - Prefix: 'pet-'
   - Timestamp: `Date.now()`
   - Original extension preserved
   - Prevents filename collisions
   - Maintains file type information

**Multer Configuration:**
1. Storage options:
   - Custom disk storage
   - Could be changed to cloud storage
   - Maintains upload state

2. File limits:
   - Maximum size: 10MB
   - Prevents server overload
   - Reasonable for image uploads

3. File filtering:
   - Custom type checking
   - Security measure
   - Prevents malicious uploads

4. Array configuration:
   - Field name: 'images'
   - Maximum 5 files
   - Matches frontend form field

### 4. File Type Validation

```javascript
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
```

**Validation Process:**
1. Allowed file types:
   - JPEG/JPG: Common photo format
   - PNG: Lossless compression
   - WebP: Modern efficient format
   - Reason: Common image formats only

2. Double validation:
   - Extension check
   - MIME type check
   - Both must pass
   - Prevents spoofing

3. Security measures:
   - Case-insensitive checking
   - Strict format matching
   - Early rejection of invalid files

### 5. Static File Serving and Database Connection

```javascript
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect('mongodb+srv://shivang:092004@paws.3fngq.mongodb.net/?retryWrites=true&w=majority&appName=paws')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));
```

**Static File Serving:**
1. Configuration:
   - Route: '/uploads'
   - Directory: Local 'uploads' folder
   - Accessible publicly
   - Path resolved using path.join

2. Security considerations:
   - Only serves from specific directory
   - No directory traversal possible
   - Files served as-is
   - Direct file access

3. Performance aspects:
   - Built-in caching
   - Efficient file streaming
   - Memory-efficient
   - Non-blocking I/O

**MongoDB Connection:**
1. Connection string breakdown:
   - Protocol: mongodb+srv
   - Authentication: Username/password
   - Cluster: paws.3fngq.mongodb.net
   - Options: retryWrites, w=majority

2. Connection options:
   - Automatic reconnection
   - Write acknowledgment
   - Retry capability
   - Connection pooling

3. Error handling:
   - Promise-based approach
   - Logging on success/failure
   - Application continues running
   - Error details preserved

### 6. Authentication Middleware

```javascript
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, 'my-super-duper-hidden-secret-key', (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};
```

**Token Extraction:**
1. Header parsing:
   - Expects 'Authorization' header
   - Bearer token format
   - Optional chaining for safety
   - Split to remove 'Bearer' prefix

2. Token validation:
   - Null/undefined check
   - Early return if missing
   - 401 status code
   - Clear error message

**JWT Verification:**
1. Verification process:
   - Synchronous verification
   - Secret key validation
   - Expiration check
   - Signature verification

2. User context:
   - Decoded user data
   - Attached to request object
   - Available in route handlers
   - Preserved through middleware chain

3. Error scenarios:
   - Invalid signature
   - Expired token
   - Malformed token
   - 403 status codes

### 7. Authentication Routes - Signup

```javascript
app.post('/api/signup', async (req, res) => {
  try {
    const { email, password, userType, name, phone, location } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({
      email,
      password: hashedPassword,
      userType,
      name,
      phone,
      location
    });

    await user.save();

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
```

**Request Handling:**
1. Data extraction:
   - Destructured from req.body
   - Required fields validated
   - Type checking implicit
   - Clean parameter access

2. Duplicate check:
   - Email uniqueness verified
   - Async operation
   - Early return pattern
   - Clear error message

**Password Security:**
1. Hashing implementation:
   - BCrypt algorithm
   - Salt rounds: 10
   - Async operation
   - Industry standard

2. Security measures:
   - Never stores plain password
   - Unique salt per password
   - Computationally expensive
   - Protection against rainbow tables

**User Creation Process:**
1. Base user creation:
   - MongoDB document
   - Required fields
   - Typed structure
   - Validation through schema

2. User type specialization:
   - Conditional creation
   - Adopter/Rehomer specific
   - Reference to base user
   - Initial empty collections

3. Transaction-like behavior:
   - Sequential operations
   - Error handling
   - Rollback consideration
   - Data consistency

### 8. Authentication Routes - Login

```javascript
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, userType: user.userType },
      'my-super-duper-hidden-secret-key',
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
```

**Authentication Process:**
1. Credential verification:
   - Email existence check
   - Password comparison
   - Async operations
   - Time-safe comparison

2. Security considerations:
   - No detailed error messages
   - Generic 'Invalid credentials'
   - Prevents user enumeration
   - Consistent response time

**Token Generation:**
1. JWT payload:
   - User ID included
   - User type included
   - Minimal sensitive data
   - Essential claims only

2. Token configuration:
   - 24-hour expiration
   - Secret key signing
   - Standard JWT format
   - Stateless authentication

3. Response structure:
   - Token provided
   - Essential user info
   - Type information
   - Minimal exposure

### 9. Pet Routes - Create Listing

```javascript
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
```

**Middleware Chain:**
1. Authentication check:
   - Token verification
   - User context
   - Role verification
   - Access control

2. File upload handling:
   - Multer middleware
   - Multiple files
   - Error handling
   - File validation

**Pet Creation Process:**
1. Data preparation:
   - Image URL generation
   - JSON parsing
   - Data validation
   - Default values

2. Database operations:
   - Pet document creation
   - Rehomer reference update
   - Transaction-like updates
   - Atomic operations

3. Security measures:
   - User type verification
   - Owner association
   - Input validation
   - Error boundaries

### 10. Pet Routes - Fetch Listings

```javascript
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

app.get('/api/pets', async (req, res) => {
  try {
    const pets = await Pet.find({ status: 'available' })
      .populate('rehomerId', 'name location')
      .select('species breed name size age gender images location description status healthStatus adoptionFee behavior');

    const validPets = pets.filter(pet => pet && pet.species);
    res.json(validPets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pets', error: error.message });
  }
});
```

**Access Control:**
1. Private route (rehomer/pets):
   - Authentication required
   - Role verification
   - Owner-only access
   - Sorted results

2. Public route (pets):
   - No authentication
   - Available pets only
   - Limited data exposure
   - Data filtering

**Query Operations:**
1. Private listings:
   - Owner-based filtering
   - Chronological sorting
   - Full data access
   - Direct query

2. Public listings:
   - Status filtering
   - Population of relations
   - Field selection
   - Data validation

**Data Protection:**
1. Field selection:
   - Specific fields exposed
   - Sensitive data hidden
   - Relationship data controlled
   - Optimized queries

2. Data validation:
   - Null checks
   - Required fields
   - Data integrity
   - Clean response

### 11. Pet Routes - Update Listing

```javascript
app.put('/api/pets/:id', authenticateToken, (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err });
    }

    try {
      const pet = await Pet.findOne({
        _id: req.params.id,
        rehomerId: req.user.userId
      });

      if (!pet) {
        return res.status(404).json({ message: 'Pet not found or unauthorized' });
      }

      const petData = JSON.parse(req.body.petData);
      const existingImages = JSON.parse(req.body.existingImages || '[]');

      const imageUrls = req.files ?
        req.files.map(file => `/uploads/${file.filename}`) :
        existingImages;

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
```

**Update Authorization:**
1. Ownership verification:
   - Pet ID validation
   - Owner matching
   - Combined query
   - Early access control

2. Data validation:
   - Pet existence check
   - User authorization
   - Clear error messages
   - Proper status codes

**Image Handling:**
1. Existing images:
   - Optional preservation
   - JSON parsing
   - Fallback empty array
   - Data type safety

2. New uploads:
   - Conditional processing
   - File path generation
   - Multiple file handling
   - Path normalization

**Update Operation:**
1. Data preparation:
   - Spread operator for base data
   - Image URL array
   - Timestamp update
   - Data merging

2. Database update:
   - Atomic operation
   - Return new document
   - Single query
   - Efficient update

### 12. Pet Routes - Delete Listing

```javascript
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

    await Rehomer.findOneAndUpdate(
      { userId: req.user.userId },
      { $pull: { listedPets: req.params.id } }
    );

    res.json({ message: 'Pet listing deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting pet', error: error.message });
  }
});
```

**Delete Authorization:**
1. Pre-delete check:
   - Pet existence
   - Owner verification
   - Combined query
   - Security enforcement

2. Access control:
   - Authentication required
   - Owner-only deletion
   - Status verification
   - Permission check

**Deletion Process:**
1. Pet removal:
   - Document deletion
   - ID-based removal
   - Cascade consideration
   - Data cleanup

2. Reference cleanup:
   - Rehomer document update
   - Array element removal
   - Atomic operation
   - Data consistency

### 13. Adopter Routes - Like/Unlike Pet

```javascript
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
```

**Like Functionality:**
1. Role verification:
   - Adopter-only action
   - User type check
   - Permission control
   - Clear error messages

2. Duplicate prevention:
   - Array inclusion check
   - Existing like check
   - Status validation
   - Error handling

**Data Management:**
1. Adopter document:
   - Reference lookup
   - Array manipulation
   - Document update
   - Atomic operation

2. Error scenarios:
   - Invalid user type
   - Missing adopter
   - Duplicate like
   - Database errors

### 14. Adopter Routes - Get Liked Pets

```javascript
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
          select: 'name location email phone'
        }
      });

    res.json(adopter.likedPets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching liked pets', error: error.message });
  }
});
```

**Data Retrieval:**
1. Population strategy:
   - Nested population
   - Multiple levels
   - Selected fields
   - Optimized query

2. Access control:
   - Role verification
   - User association
   - Data ownership
   - Permission enforcement

**Query Configuration:**
1. Document relationships:
   - Adopter → Liked Pets
   - Pet → Rehomer
   - Selective fields
   - Data hierarchies

2. Performance considerations:
   - Minimal data transfer
   - Required fields only
   - Efficient joins
   - Query optimization

### 15. Rehomer Routes - My Listings

```javascript
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
```

**Listings Management:**
1. Access verification:
   - Rehomer-only route
   - Authentication check
   - User type validation
   - Error handling

2. Data retrieval:
   - Population of listings
   - Owner association
   - Full pet details
   - Efficient query

### 16. User Profile Management

```javascript
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
```

**Profile Retrieval:**
1. Security measures:
   - Password exclusion
   - Authentication required
   - User verification
   - Field selection

2. Data protection:
   - Sensitive data handling
   - Field filtering
   - Owner-only access
   - Error boundaries

**Profile Updates:**
1. Data sanitization:
   - Password field removal
   - Selective updates
   - Data validation
   - Safe modifications

2. Update operation:
   - Atomic update
   - Return new document
   - Field exclusion
   - Error handling

### 17. Server Initialization

```javascript
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

**Server Configuration:**
1. Port setup:
   - Fixed port number
   - Environment consideration
   - Local development
   - Production readiness

2. Initialization:
   - Event listener
   - Success logging
   - Error handling
   - Server startup

### 18. Overall Architecture Summary

**Security Layers:**
1. Authentication:
   - JWT implementation
   - Token verification
   - Role-based access
   - Session management

2. Data Protection:
   - Password hashing
   - Field selection
   - Input validation
   - Error handling

**API Structure:**
1. Route organization:
   - Authentication routes
   - Pet management routes
   - User management routes
   - Role-specific routes

2. Middleware implementation:
   - Authentication checks
   - File uploads
   - Error handling
   - CORS support

**Database Integration:**
1. Model relationships:
   - User → Adopter/Rehomer
   - Pet → Rehomer
   - Liked pets tracking
   - Listed pets management

2. Query optimization:
   - Selective population
   - Field filtering
   - Efficient updates
   - Atomic operations

</details>


---

