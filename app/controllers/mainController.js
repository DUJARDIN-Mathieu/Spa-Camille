const dataMapper = require('../../BDD/dataMapper');

const mainController = {

    homePage: async (req, res) => {
        try {
            res.render('homePage')
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
            res.render('supplementPage', {
                sup
            });
        } catch (error) {
            console.log(error);
            res.status(500).send(`An error occured with the database :\n ${error.message}`);
        }
    },
    ajoutSupp: async (req, res) => {
        try {
            const produits = req.body.produits;
            if (produits){
                if(!req.session.produits){
                    req.session.produits = []
                }
                produits.forEach((produit) => {
                    req.session.produits.push(produit);
                });
            }
            const panier = req.session.panier 
            console.log(panier)
            res.render('recapitulatifPage', {
                panier
            });
        } catch (error) {
            console.log(error);
            res.status(500).send(`An error occured with the database :\n ${error.message}`);
        }
    }

}
module.exports = mainController;
