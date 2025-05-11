const express = require('express');
const cors = require('cors');
const usersRouter = require('./routes/users'); // Your users route file
const mongodb = require('./data/database');    // Your MongoDB connection module

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

// Initialize MongoDB connection
mongodb.initDb((err) => {
  if (err) {
    console.error('❌ Failed to connect to MongoDB:', err);
    process.exit(1); // Stop app if connection fails
  } else {
    console.log('✅ Connected to MongoDB');

    // Define API routes
    app.use('/users', usersRouter); // Example: GET /users

    // Home route
    app.get('/', (req, res) => {
      res.send('Welcome to CSE341!');
    });

    // Start the server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  }
});
