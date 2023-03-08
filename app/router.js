const express = require('express');

const mainController = require('./controllers/mainController');

const router = express.Router();



router.get('/', mainController.homePage);

router.get('/reservez', mainController.reservationPage);

module.exports = router;