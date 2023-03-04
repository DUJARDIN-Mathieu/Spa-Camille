const express = require('express');
const router = express.Router();

const mainController = require('./controllers/mainController')

router.get('/', mainController.homePage)
router.get('/reservez', mainController.reservationPage)

module.exports = router