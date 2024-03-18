const jwt = require('jsonwebtoken'); // Importing the jsonwebtoken library
const Admin = require('../models/Admin'); // Importing the Admin model

// Middleware function for JWT authentication for admins
module.exports = async (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    // Extracting the token from the Authorization header
    const token = req.headers.authorization.split(' ')[1];

    try {
      // Verifying the token using the JWT_SECRET
      const decode = jwt.verify(token, process.env.JWT_SECRET);

      // Finding the admin based on the decoded admin ID
      const admin = await Admin.findById(decode.admin);

      // If the admin is not found, return unauthorized access
      if (!admin) {
        return res.json({ success: false, message: 'Unauthorized access!' });
      }

      // Checking admin's permission level, must be 2 for access
      if (admin.permission !== 2) {
        return res.json({ success: false, message: 'Unauthorized access!' });
      }

      // Adding the admin object to the request for further use
      req.admin = admin;
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
      res.res.json({ success: false, message: 'Internal server error!' });
    }
  } else {
    // If no Authorization header is present, return unauthorized access
    res.json({ success: false, message: 'Unauthorized access!' });
  }
};
