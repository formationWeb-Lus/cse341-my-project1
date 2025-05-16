const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger'); // fichier swagger.js
const usersRouter = require('./routes/users'); // Fichier de routes users
const mongodb = require('./data/database');    // Connexion à MongoDB

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse les requêtes JSON

// Swagger route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Route d'accueil
app.get('/', (req, res) => {
  res.send('Welcome to CSE341!');
});

// Initialisation de MongoDB et lancement du serveur
mongodb.initDb((err) => {
  if (err) {
    console.error('❌ Failed to connect to MongoDB:', err);
    process.exit(1);
  } else {
    console.log('✅ Connected to MongoDB');

    // Routes API
    app.use('/users', usersRouter); // Exemple : GET /users

    // Démarrage du serveur
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
      console.log(`📘 Swagger docs available at http://localhost:${PORT}/api-docs`);
    });
  }
});
