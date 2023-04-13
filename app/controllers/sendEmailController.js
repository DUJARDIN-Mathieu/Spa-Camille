const nodemailer = require ('nodemailer')

const mailController ={
    
    tombola: async (req, res) => {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASSWORD
            }
        });
        let mailOptions = {
            from: process.env.GMAIL_USER,
            to: process.env.GMAIL_USER,
            subject: 'Reservation',
            text: req.session.panier
        };
        transporter.sendMail(mailOptions, function(error, info){
            error ? console.log(error) : console.log('E-mail envoyé: ' + info.response)
        })
    }
}

module.exports = mailController;