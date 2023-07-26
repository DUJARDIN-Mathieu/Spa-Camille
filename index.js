// Import des variables d'environnement
require('dotenv').config();

// Import des dépendences
const express = require('express');
const session = require('express-session');

// Import des dépendences internes
const router = require('./app/router');

// Créér une APP Express
const app = express();

// Setup du view engine
app.set('view engine', 'ejs');
app.set('views', './app/views');


// Setup du dossier public
app.use(express.static('public'));


// Plug le router
app.use(router);

// On lance le serveur sur le port choix dans l'environnement
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
})

