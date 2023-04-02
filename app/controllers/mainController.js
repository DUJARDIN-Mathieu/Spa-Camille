const dataMapper = require('../../BDD/dataMapper');
const stripe = require('stripe')(process.env.KEY_STRIPE_SECRET)

const mainController = {

    homePage: async (req, res) => {
        try {
            let titre = 'Levray rêve'
            res.render('homePage', {
                titre
            })
        } catch (error) {
            console.log(error);
            res.status(500).send(`An error occured with the database :\n ${error.message}`)
        }
    },
    supplementPage: async (req, res) => {
        try {
            const formule = await dataMapper.getProduitByID(req.params.id);
            req.session.panier[0] = formule;
            const sup = await dataMapper.getProduitByCategory('Supplement');
            let titre = 'Nos suppléments'
            res.render('supplementPage', {
                sup,
                titre
            });
        } catch (error) {
            console.log(error);
            res.status(500).send(`An error occured with the database :\n ${error.message}`);
        }
    },
    
    ajoutSupp: async (req, res) => {
        try {
            const formule = req.session.panier[0];
            req.session.panier = [];
            req.session.panier[0] = formule;
            const produits = req.body.produits;
            if (produits) {
                for (const produit of produits) {
                    const formule = await dataMapper.getProduitByID(produit);
                    req.session.panier.push(formule);
                }
            }
            const panier = req.session.panier 
            let total = panier.reduce((acc, cur) => acc + cur.prix, 0);
            process.env.TOTAL = total * 100;
            let titre = 'Récapitulatif de la réservation'
            res.render('recapitulatifPage', {
                panier, total, titre
            });
        } catch (error) {
            console.log(error);
            res.status(500).send(`An error occured with the database :\n ${error.message}`);
        }
    },

    stripe_pay: async (req, res) => {
        try {
            res.render('stripe_payment', {
                key : process.env.KEY_STRIPE_PUBLIC
            });
        } catch (error) {
            console.log(error);
            res.status(500).send(`An error occured with the database :\n ${error.message}`);
        }
    },
    
    payment: async (req, res) => {
        // Moreover you can take more details from user
        // like Address, Name, etc from form
        stripe.customers.create({
            email: req.body.stripeEmail,
            source: req.body.stripeToken,
            name: 'Levray Rêve',
            address: {
            line1: "10 Rue d'Avranche",
            postal_code: '62670',
            city: 'Mazingarbe',
            state: 'France',
            country: 'France',
            }
            })
            .then((customer) => {
            
            return stripe.charges.create({
            amount: process.env.TOTAL, // Charing Rs 25
            description: 'Web Development Product',
            currency: 'eur',
            customer: customer.id
            });
            })
            .then((charge) => {
            res.redirect("/") // If no error occurs
            })
            .catch((err) => {
            res.send(err) // If some error occurs
            });
    }

}
module.exports = mainController;
