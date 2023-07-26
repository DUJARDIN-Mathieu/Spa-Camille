const dataMapper = require('../../BDD/dataMapper');

const mainController = {

    levrayreve: async (req, res) => {
        try {
            // Variable
            let titre = 'Levray rêve'
            let active = {
                levrayreve: "active",
                spadereve: "",
                bulledereve: "",
                massagedereve: ""
            }

            // Style et JS
            const styles_page = 'levrayreve.css'
            const js = 'levrayreve.js'

            // RandomNumber
            const randomNumber = Math.floor(Math.random() * 10)
            const otherRandomNumber = Math.floor(Math.random() * 10)

            // Appel BDD
            const supplement = await dataMapper.getProduitByCategory('supplement')

            // Rendu
            res.render('levrayreve', {
                titre, active,
                styles_page, js,
                randomNumber, otherRandomNumber,
                supplement
            })
        } catch (error) {
            console.log(error);
            res.status(500).send(`An error occured with the database :\n ${error.message}`)
        }
    },

    spadereve: async (req, res) => {
        try {
            // Variable
            let titre = 'Spa de Rêve'
            let active = {
                levrayreve: "",
                spadereve: "active",
                bulledereve: "",
                massagedereve: ""
            }

            // Style et JS
            const styles_page = 'spadereve.css'
            const js = 'spadereve.js'

            // Appel BDD
            const formule = await dataMapper.getProduitByCategory('spa')

            // Rendu
            res.render('spadereve', {
                titre, active,
                styles_page, js,
                formule
            })
        } catch (error) {
            console.log(error);
            res.status(500).send(`An error occured with the database :\n ${error.message}`)
        }
    },
    bulledereve: async (req, res) => {
        try {
            // Variable
            let titre = 'bulle de Rêve'
            let active = {
                levrayreve: "",
                spadereve: "",
                bulledereve: "active",
                massagedereve: ""
            }

            // Style et JS
            const styles_page = 'bulledereve.css'
            const js = 'bulledereve.js'

            // Appel BDD
            const formule = await dataMapper.getProduitByCategory('bulle')

            // Rendu
            res.render('bulledereve', {
                titre, active,
                styles_page, js,
                formule
            })
        } catch (error) {
            console.log(error);
            res.status(500).send(`An error occured with the database :\n ${error.message}`)
        }
    },
    massagedereve: async (req, res) => {
        try {
            // Variable
            let titre = 'Massage de Rêve'
            let active = {
                levrayreve: "",
                spadereve: "",
                bulledereve: "",
                massagedereve: "active"
            }

            // Style et JS
            const styles_page = 'massagedereve.css'
            const js = 'massagedereve.js'

            // Appel BDD
            const formule = await dataMapper.getProduitByCategory('massage')

            // Rendu
            res.render('massagedereve', {
                titre, active,
                styles_page, js,
                formule
            })
        } catch (error) {
            console.log(error);
            res.status(500).send(`An error occured with the database :\n ${error.message}`)
        }
    },
}
module.exports = mainController;
