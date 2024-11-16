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

## Server

### Overview

- This Node.js server uses the Express framework to handle HTTP requests and responses.
- It connects to a MongoDB database using Mongoose.
- Manages user authentication with JSON Web Tokens (JWT).
- Supports user signup and login.
- Manages pet listing.
- Handles file uploads using Multer.
- Routes are protected with middleware to ensure that only authenticated users can access certain endpoints.
- Includes specific routes for adopters and rehomers to manage their respective functionalities.

### Modules used

1. **Express**: The main framework used to build the server.
2. **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
3. **Bcrypt**: A library to hash passwords.
4. **JWT**: Used for authentication.
5. **CORS**: Middleware to enable Cross-Origin Resource Sharing.
6. **Multer**: Middleware for handling file uploads.
7. **Path**: Node.js module for handling file and directory paths.

### Components

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

### Architecture

#### Models

- **User**: Represents a user in the system.
- **Pet**: Represents a pet listing.
- **Adopter**: Represents an adopter user type.
- **Rehomer**: Represents a rehomer user type.

#### Middleware

- **CORS**: Allows cross-origin requests.
- **JSON Parsing**: Parses JSON bodies of incoming requests.
- **Authentication**: Verifies JWT tokens to protect routes.

#### File Upload Configuration

- **Multer Storage**: Configures where and how files are stored.
- **File Type Check**: Ensures only images are uploaded.

#### Routes

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

### Server Initialization

- **Port**: The server listens on port 8080.
- **MongoDB Connection**: Connects to the MongoDB database using Mongoose.

### Detailed Code Explanation

#### 1. Importing Required Modules

```javascript
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
```

- **express**: Main framework for building the server.
- **mongoose**: ODM library for MongoDB.
- **bcrypt**: Library for hashing passwords.
- **jsonwebtoken**: Library for creating and verifying JWT tokens.
- **cors**: Middleware to enable Cross-Origin Resource Sharing.
- **multer**: Middleware for handling file uploads.
- **path**: Node.js module for handling file and directory paths.

#### 2. Importing MongoDB Models

```javascript
const { User, Pet, Adopter, Rehomer } = require('./models');
```

- Importing the MongoDB models for User, Pet, Adopter, and Rehomer.

#### 3. Initializing Express App

```javascript
const app = express();
```

- Creating an instance of the Express application.

#### 4. Middleware Setup

```javascript
app.use(cors());
app.use(express.json());
```

- **cors()**: Enables CORS to allow cross-origin requests.
- **express.json()**: Middleware to parse incoming JSON requests.

#### 5. Configuring Multer for File Uploads

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
  limits: { fileSize: 10000000 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
}).array('images', 5); // Allow up to 5 images
```

- **storage**: Configures where and how files are stored.
  - **destination**: Specifies the directory for storing uploaded files.
  - **filename**: Specifies the naming convention for uploaded files.
- **upload**: Configures Multer with storage settings, file size limit, and file type filter.
  - **limits**: Sets a file size limit of 10MB.
  - **fileFilter**: Uses `checkFileType` function to validate file types.
  - **array**: Allows uploading up to 5 images.

#### 6. File Type Check Function

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

- **checkFileType**: Validates the file type of uploaded images.
  - **filetypes**: Regular expression for allowed file types.
  - **extname**: Checks the file extension.
  - **mimetype**: Checks the MIME type.
  - **cb**: Callback function to indicate whether the file is valid.

#### 7. Serving Uploaded Files Statically

```javascript
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
```

- **express.static**: Serves static files from the `uploads` directory.

#### 8. Connecting to MongoDB

```javascript
mongoose.connect('mongodb+srv://shivang:092004@paws.3fngq.mongodb.net/?retryWrites=true&w=majority&appName=paws')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));
```

- **mongoose.connect**: Connects to the MongoDB database.
- **then**: Logs a success message if the connection is successful.
- **catch**: Logs an error message if the connection fails.

#### 9. Authentication Middleware

```javascript
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, 'your-secret-key', (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};
```

- **authenticateToken**: Middleware to authenticate JWT tokens.
  - **token**: Extracts the token from the `Authorization` header.
  - **jwt.verify**: Verifies the token using the secret key.
  - **req.user**: Attaches the decoded user information to the request object.
  - **next**: Calls the next middleware or route handler.

#### 10. Auth Routes

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

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, userType: user.userType },
      'your-secret-key',
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

- **/api/signup**: Registers a new user.
  - Checks if the user already exists.
  - Hashes the password using bcrypt.
  - Creates and saves a new user.
  - Creates and saves a specific user type document (Adopter or Rehomer).
  - Returns a success message and user type.
- **/api/login**: Logs in a user and returns a JWT token.
  - Finds the user by email.
  - Compares the provided password with the hashed password.
  - Generates a JWT token.
  - Returns the token, user type, user ID, and name.

#### 11. Pet Routes

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
```

- **/api/pets**: Creates a new pet listing.
  - Uses `authenticateToken` middleware to protect the route.
  - Uses `upload` middleware to handle file uploads.
  - Checks if the user is a rehomer.
  - Saves the pet data and updates the rehomer's listed pets.
- **/api/rehomer/pets**: Fetches all pets listed by a rehomer.
  - Uses `authenticateToken` middleware to protect the route.
  - Checks if the user is a rehomer.
  - Fetches and returns the pets listed by the rehomer.
- **/api/pets/:id**: Updates a pet listing.
  - Uses `authenticateToken` middleware to protect the route.
  - Uses `upload` middleware to handle file uploads.
  - Checks if the pet belongs to the rehomer.
  - Updates the pet data and returns the updated pet.
- **/api/pets/:id**: Deletes a pet listing.
  - Uses `authenticateToken` middleware to protect the route.
  - Checks if the pet belongs to the rehomer.
  - Deletes the pet and updates the rehomer's listed pets.
- **/api/pets**: Fetches all available pets.
  - Fetches and returns all pets with status 'available'.
- **/api/pets/:id**: Fetches a pet by ID.
  - Fetches and returns the pet by ID.

#### 12. Adopter Routes

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

- **/api/pets/:id/like**: Likes a pet.
  - Uses `authenticateToken` middleware to protect the route.
  - Checks if the user is an adopter.
  - Adds the pet to the adopter's liked pets.
- **/api/pets/:id/like**: Unlikes a pet.
  - Uses `authenticateToken` middleware to protect the route.
  - Checks if the user is an adopter.
  - Removes the pet from the adopter's liked pets.
- **/api/liked-pets**: Fetches all liked pets for an adopter.
  - Uses `authenticateToken` middleware to protect the route.
  - Checks if the user is an adopter.
  - Fetches and returns the adopter's liked pets.

#### 13. Rehomer Routes

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

- **/api/my-listings**: Fetches all pets listed by the rehomer.
  - Uses `authenticateToken` middleware to protect the route.
  - Checks if the user is a rehomer.
  - Fetches and returns the rehomer's listed pets.

#### 14. User Routes

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

- **/api/profile**: Fetches the user profile.
  - Uses `authenticateToken` middleware to protect the route.
  - Fetches and returns the user profile without the password.
- **/api/profile**: Updates the user profile.
  - Uses `authenticateToken` middleware to protect the route.

#### 15. Server Initialization

```javascript
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

- **PORT**: Defines the port number on which the server will listen for incoming requests.
- **app.listen**: Starts the server and listens on the specified port.
  - Logs a message indicating that the server is running and on which port.

</details>


---

