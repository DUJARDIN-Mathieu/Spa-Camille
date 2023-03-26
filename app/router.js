const express = require('express');

const mainController = require('./controllers/mainController');

const router = express.Router();



router.get('/', mainController.homePage);

router.get('/supplement/:id', mainController.supplementPage);
router.post('/ajouter-session', mainController.ajoutSupp)

module.exports = router;