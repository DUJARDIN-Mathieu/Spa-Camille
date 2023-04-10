const express = require('express');

const mainController = require('./controllers/mainController');

const router = express.Router();



router.get('/', mainController.home);

router.get('/spa', mainController.spa);

router.get('/tarifs', mainController.tarifs);

router.get('/supplement/:id', mainController.supplementPage);

router.get('/recapitulatif', mainController.recap)
router.post('/ajouter-au-panier', mainController.ajoutSupp);

router.get('/payment-page', mainController.stripe_pay)
router.post('/payment', mainController.payment)

router.get('/test', mainController.tarifs)

module.exports = router;