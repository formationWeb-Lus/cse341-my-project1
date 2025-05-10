const express = require('express');
const dotenv = require('dotenv');
dotenv.config(); // Charge les variables depuis .env

const mongodb = require('./data/database');
const app = express();
const port = process.env.PORT || 3000;

// Middleware JSON
app.use(express.json());

// Routes
app.use('/', require('./data/routes')); // Vérifie que ./routes/index.js existe

// Démarrer la connexion à MongoDB puis le serveur
mongodb.initDb((err, db) => {
    if (err) {
        console.error('Erreur de connexion à MongoDB:', err);
        return;
    }

    console.log('Connexion MongoDB réussie');

    // Lancer le serveur seulement après connexion réussie
    app.listen(port, () => {
        console.log(`Serveur Node.js en écoute sur le port ${port}`);
    });
});
