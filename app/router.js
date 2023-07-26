const express = require('express');

const mainController = require('./controllers/mainController');

const router = express.Router();



router.get('/', mainController.levrayreve);

router.get('/spadereve', mainController.spadereve);

router.get('/bulledereve', mainController.bulledereve);

router.get('/massagedereve', mainController.massagedereve);


module.exports = router;