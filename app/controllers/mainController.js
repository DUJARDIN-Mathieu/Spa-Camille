const mainController = {
    homePage: async (req, res) => {
        try {
            res.render('main_page')
        } catch (error) {
            console.log(error);
            res.status(500).send(`An error occured with the database :\n ${error.message}`)
        }
    }
}
module.exports = mainController;