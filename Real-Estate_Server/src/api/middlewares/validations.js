module.exports = {

    // Middleware for validating user registration data
    userAddValidation: (req, res, next) => {
        try {
            // Regular expressions for email and password validation
            const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

            const {
                user_name,
                user_email,
                user_password,
                user_password_confirm
            } = req.body;

            // Checking for missing required fields
            if (!user_name || !user_email || !user_password || !user_password_confirm) {
                throw new Error("Missing required fields");
            }

            // Validating email format
            if (!email_regex.test(user_email)) {
                throw new Error("Email should be a valid email");
            }

            // Validating password format
            if (!password_regex.test(user_password)) {
                throw new Error("Password should have a letter, uppercase letter, number, and special character");
            }

            // Checking if passwords match
            if (user_password !== user_password_confirm) {
                throw new Error("Passwords don't match");
            }

            next();

        } catch (error) {
            return res.status(500).json({
                message: "Error in user validation",
                error: error.message
            });
        }
    },

    // Middleware for validating user login data
    userLoginValidation: (req, res, next) => {
        try {
            const {
                user_email,
                user_password
            } = req.body;

            // Checking for missing required fields
            if (!user_email || !user_password) {
                throw new Error("Missing required fields");
            }

            next();

        } catch (error) {
            return res.status(500).json({
                message: "Error in user validation",
                error: error.message
            });
        }
    }
};
