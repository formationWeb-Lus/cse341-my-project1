const express = require('express');
const mongodb = require('./data/database');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Enable JSON parsing

// Use your routes
app.use('/', require('./routes'));

// Initialize DB and start the server
mongodb.initDb((err) => {
  if (err) {
    console.error('❌ Failed to start server due to database error.');
  } else {
    app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
    });
  }
});

