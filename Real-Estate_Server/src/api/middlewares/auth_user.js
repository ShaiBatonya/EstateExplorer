const jwt = require('jsonwebtoken'); // Importing the jsonwebtoken library
const User = require('../models/User'); // Importing the User model

// Middleware function for JWT authentication
module.exports = async (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    // Extracting the token from the Authorization header
    const customer_token = req.headers.authorization.split(' ')[1];

    try {
      // Verifying the token using the JWT_SECRET
      const decode = jwt.verify(customer_token, process.env.JWT_SECRET);

      // Finding the user based on the decoded user ID
      const user = await User.findById(decode.user);

      // If the user is not found, return unauthorized access
      if (!user) {
        return res.json({ success: false, message: 'Unauthorized access!' });
      }

      // Adding the user object to the request for further use
      req.user = user;
      next();
    } catch (error) {
      // Handling different JWT-related errors
      if (error.name === 'JsonWebTokenError') {
        return res.json({ success: false, message: 'Unauthorized access!' });
      }
      if (error.name === 'TokenExpiredError') {
        return res.json({
          success: false,
          message: 'Session expired, please sign in again!',
        });
      }

      // Handling other errors and returning an internal server error message
      res.json({ success: false, message: 'Internal server error!' });
    }
  } else {
    // If no Authorization header is present, return unauthorized access
    res.json({ success: false, message: 'Unauthorized access!' });
  }
};
