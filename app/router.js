const express = require('express');

const mainController = require('./controllers/mainController');

const router = express.Router();



router.get('/', mainController.homePage);

router.get('/supplement/:id', mainController.supplementPage);

router.get('/recapitulatif', mainController.recap)
router.post('/ajouter-au-panier', mainController.ajoutSupp);

router.get('/payment-page', mainController.stripe_pay)
router.post('/payment', mainController.payment)

module.exports = router;