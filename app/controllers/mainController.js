const dataMapper = require('../../BDD/dataMapper');
const stripe = require('stripe')(process.env.KEY_STRIPE_SECRET)

const mainController = {

    homePage: async (req, res) => {
        try {
            const formule = await dataMapper.getProduitByCategory('formule')
            const supplement = await dataMapper.getProduitByCategory('supplement')
            let randomNumber = Math.floor(Math.random() * 10)
            let titre = 'Levray rêve'
            res.render('homePage', { 
                titre, formule, supplement, randomNumber
            })
        } catch (error) {
            console.log(error);
            res.status(500).send(`An error occured with the database :\n ${error.message}`)
        }
    },
    supplementPage: async (req, res) => {
        try {
            
        
          // Récupérer la formule sélectionnée
          const formule = await dataMapper.getProduitByID(req.params.id);
          // Ajouter la formule au panier
          req.session.panier = []
          req.session.panier[0] = formule;
          console.log(req.session.panier)
          // Récupérer la liste des suppléments
          const supplement = await dataMapper.getProduitByCategory('Supplement');
      
          // Rendre la page "supplementPage"
          res.render('supplementPage', {
            supplement,
            titre: 'Nos suppléments'
          });
        } catch (error) {
          console.error(error);
          res.status(500).send(`An error occured with the database:\n${error.message}`);
        }
      },
      
    
      ajoutSupp: async (req, res) => {
        try {
            let formule = req.session.panier[0]
            req.session.panier = []
            req.session.panier[0] = formule
            // Récupérer le panier actuel de l'utilisateur depuis la session
            let panier = req.session.panier;
            console.log(req.body)
            if (Object.keys(req.body).length > 0) {
                // Récupérer la liste des suppléments sélectionnés depuis le corps de la requête
                const supplementsSelectionnes = req.body['supplements'];
       
                // Ajouter les suppléments sélectionnés au panier
                for (const supplement of supplementsSelectionnes) {
                    // Récupérer les informations de chaque supplément sélectionné
                    const supplements = await dataMapper.getProduitByID(supplement);
                    panier.push(supplements);
                }
           }
    
            // Stocker le panier mis à jour dans la session
            req.session.panier = panier;
            panier = req.session.panier;
            
            // Rediriger l'utilisateur vers la page du panier
            res.redirect('/recapitulatif');
        } catch (error) {
            console.error(error);
            res.status(500).send(`An error occured with the database:\n${error.message}`);
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
    },
    recap: async (req, res) => {
        try {
            let titre = 'Recapitulatif'
            let panier = req.session.panier
            console.log(req.session.panier)
            let total = panier.reduce((acc, cur) => acc + cur.prix, 0);
            process.env.TOTAL = total * 100;
            res.render('recapitulatifPage', {
                titre, panier, total
            })
        } catch (error) {
            console.log(error);
            res.status(500).send(`An error occured with the database :\n ${error.message}`)
        }
    }

}
module.exports = mainController;
