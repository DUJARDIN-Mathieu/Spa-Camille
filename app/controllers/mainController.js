const dataMapper = require('../../BDD/dataMapper');
const stripe = require('stripe')(process.env.KEY_STRIPE_SECRET);
const axios = require('axios');

const mainController = {

    home: async (req, res) => {
        try {
            // Constante
            let titre = 'Levray rêve'
            let active = {
                home: "active",
                spa: "",
                tarifs: ""
            }
            // Style et JS
            const styles_page = 'styles_home.css'
            const js = 'home.js'
            // RandomNumber
            const randomNumber = Math.floor(Math.random() * 10)
            const otherRandomNumber = Math.floor(Math.random() * 10)
            // Appel BDD
            const supplement = await dataMapper.getProduitByCategory('supplement')
            // Appel API
            let reviews = ""
            axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJR0wYido73UcRnPDnXumtvZE&key=${process.env.MAP_API_KEY}&fields=reviews`)
                .then(response =>{
                    reviews = response.data.result.reviews;
                    console.log(reviews)
                })
                .catch(error => {
                    console.log(error);
                });
            console.log(reviews)
            //render
            res.render('home', { 
                titre, active, 
                styles_page, js,  
                randomNumber,otherRandomNumber,  
                supplement,
                reviews
            })
        } catch (error) {
            console.log(error);
            res.status(500).send(`An error occured with the database :\n ${error.message}`)
        }
    },
    spa: async (req, res) => {
        try {
            // Constante
            let titre = 'Notre Spa'
            let active = {
                home: "",
                spa: "active",
                tarifs: ""
            }
            // Style et JS
            const styles_page = 'styles_spa.css'
            const js = 'spa.js'
            // Appel BDD
            
            // Appel API
            
            //render
            res.render('spa', { 
                titre, active, 
                styles_page, js
            })
        } catch (error) {
            console.log(error);
            res.status(500).send(`An error occured with the database :\n ${error.message}`)
        }
    },
    tarifs: async (req, res) => {
        try {
            // Constante
            let titre = 'Nos Tarifs'
            let active = {
                home: "",
                spa: "",
                tarifs: "active"
            }
            // Style et JS
            const styles_page = 'styles_tarifs.css'
            const js = 'tarifs.js'
            // Appel BDD
            const formule = await dataMapper.getProduitByCategory('formule')
            // Appel API
            
            //render
            res.render('tarifs', { 
                titre, active, 
                styles_page, js, 
                formule
            })
        } catch (error) {
            console.log(error);
            res.status(500).send(`An error occured with the database :\n ${error.message}`)
        }
    },

    supplementPage: async (req, res) => {
        try {
            // Constante
            let titre = 'Levray rêve'
            let active = {
                home: "",
                spa: "",
                tarifs: ""
            }
            // Style et JS
            const styles_page = 'styles-supplement.css'
            const js = ''

        
          // Récupérer la formule sélectionnée
          const formule = await dataMapper.getProduitByID(req.params.id);
          // Ajouter la formule au panier
          req.session.panier = []
          req.session.panier[0] = formule;
          console.log(req.session.panier)
          // Récupérer la liste des suppléments
          const supplement = await dataMapper.getProduitByCategory('supplement');
      
          // Rendre la page "supplementPage"
          res.render('supplementPage', {
            titre, active, 
            styles_page, js,
            supplement
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
                const supplementsSelectionnes = req.body.supplement;
                console.log(supplementsSelectionnes, "req.body")

                    // Ajouter les suppléments sélectionnés au panier
                    for (i=0; i < supplementsSelectionnes.length; i++) {
                        console.log(supplementsSelectionnes, "for")
                        // Récupérer les informations de chaque supplément sélectionné
                        const supplements = await dataMapper.getProduitByID(supplementsSelectionnes[i]);
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
            // Constante
            let titre = 'Levray rêve'
            let active = {
                home: "",
                spa: "",
                tarifs: ""
            }
            // Style et JS
            const styles_page = ''
            const js = ''
            res.render('stripe_payment', {
                titre, active, key : process.env.KEY_STRIPE_PUBLIC, 
                styles_page, js
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
            // Constante
            let titre = 'Recapitulatif'
            let active = {
                home: "",
                spa: "",
                tarifs: ""
            }
            // Style et JS
            const styles_page = 'styles-recapitulatif.css'
            const js = 'tarifs.js'
            let panier = req.session.panier
            console.log(req.session.panier)
            let total = panier.reduce((acc, cur) => acc + cur.prix, 0);
            process.env.TOTAL = total * 100;
            res.render('recapitulatifPage', {
                titre, active,
                styles_page, js,
                panier, total
            })
        } catch (error) {
            console.log(error);
            res.status(500).send(`An error occured with the database :\n ${error.message}`)
        }
    }

}
module.exports = mainController;
