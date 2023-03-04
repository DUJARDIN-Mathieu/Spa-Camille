const mainController = {
    homePage: async (req, res) => {
        try {
<<<<<<< HEAD
            res.render('homePage')
        } catch (error) {
            console.log(error);
            res.status(500).send(`An error occured with the database :\n ${error.message}`)
        }
    },
    reservationPage: async (req, res) => {
        try {
            res.render('reservationPage')
=======
            res.render('mainPage')
>>>>>>> 04c2cbecfcad2dda9d954f17d8ac53278703f892
        } catch (error) {
            console.log(error);
            res.status(500).send(`An error occured with the database :\n ${error.message}`)
        }
    }
}
module.exports = mainController;
