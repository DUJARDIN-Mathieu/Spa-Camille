const mainController = {
    homePage: async (req, res) => {
        try {
            res.render('homePage')
        } catch (error) {
            console.log(error);
            res.status(500).send(`An error occured with the database :\n ${error.message}`)
        }
    },
    reservationPage: async (req, res) => {
        try {
            res.render('reservationPage')
        } catch (error) {
            console.log(error);
            res.status(500).send(`An error occured with the database :\n ${error.message}`)
        }
    }
}
module.exports = mainController;