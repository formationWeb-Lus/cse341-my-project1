
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');


dotenv.config();

let database;


const initDb = (callback) => {
  if (database) {
    console.log('✅ Database is already initialized.');
    return callback(null, database);
  }

  const mongoUrl = process.env.MONGODB_URL;

  if (!mongoUrl) {
    return callback(new Error('❌ MONGODB_URL is not defined in the .env file.'));
  }

  MongoClient.connect(mongoUrl)
    .then((client) => {
      database = client.db(); // Connects to the default database
      console.log('✅ Connected to MongoDB!');
      callback(null, database);
    })
    .catch((err) => {
      console.error('❌ Failed to connect to MongoDB:', err);
      callback(err);
    });
};

// Get the initialized database instance
const getDatabase = () => {
  if (!database) {
    throw new Error('❌ Database not initialized. Please call initDb() first.');
  }
  return database;
};

// Export functions
module.exports = {
  initDb,
  getDatabase,
};
