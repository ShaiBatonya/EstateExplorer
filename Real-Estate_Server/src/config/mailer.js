const mailer = require('nodemailer'); // Importing the nodemailer library

// Middleware function for sending emails
const mailer_middleware = async (req, res, next) => {
    try {
        // Extracting necessary information from the request
        const to = req.to;
        const mail_template = req.template;

        // Creating a nodemailer transporter
        const transporter = mailer.createTransport({
            service: "gmail",
            auth: {
                user: "davidbiton2@gmail.com",
                pass: "warhwgvhawzfchka"
            }
        });

        // Constructing the email object
        const mail = {
            to,
            subject: req.subject,
            html: mail_template
        };

        // Sending the email using the transporter
        const data = await transporter.sendMail(mail);

        // Proceeding to the next middleware
        next();
    } catch (error) {
        // Handling errors and returning an appropriate response
        return res.status(500).json({
            message: "Error in trying to send email",
            error: error.message
        });
    }
};

module.exports = mailer_middleware; // Exporting the mailer middleware
