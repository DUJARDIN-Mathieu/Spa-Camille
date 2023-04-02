// Import des variables d'environnement
require('dotenv').config();

// Import des dépendences
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');


// Import des dépendences internes
const router = require('./app/router');

// Créér une APP Express
const app = express();

// Setup du view engine
app.set('view engine', 'ejs');
app.set('views', './app/views');

// Charger le middleware pour parser les données POST
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json())

// Setup du dossier public
app.use(express.static('public'));



// Mise en place de la session pou enregistre le panier
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
        cookie: {
            secure: false,
            maxAge: 1*60*60*1000
        },
    })
);

app.use((req, res, next) => {
    if (req.session.panier === undefined){
        req.session.panier = []
    };
    next()
});



// Plug le router
app.use(router);

// On lance le serveur sur le port choix dans l'environnement
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
})

