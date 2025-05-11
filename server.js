const express = require('express');
const cors = require('cors');
const usersRouter = require('./routes/users');
const mongodb = require('./data/database');

const app = express();

app.use(cors());
app.use(express.json()); // Important si tu fais du POST ou PUT

// Initialiser la connexion à MongoDB
mongodb.initDb((err) => {
  if (err) {
    console.error('❌ Erreur de connexion à MongoDB :', err);
    process.exit(1);
  } else {
    console.log('✅ Connexion MongoDB réussie');

    // Placer ici les routes après la connexion à la base
    app.use('/users', usersRouter);

    // Démarrer le serveur
    app.listen(3000, () => {
      console.log('🚀 Serveur lancé sur http://localhost:3000');
    });
  }
});
