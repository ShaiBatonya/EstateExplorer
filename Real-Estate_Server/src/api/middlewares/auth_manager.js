const jwt = require("jsonwebtoken"); // Importing the jsonwebtoken library
const Manager = require("../models/Manager"); // Importing the Manager model

// Middleware function for JWT authentication for managers
module.exports = async (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    // Extracting the token from the Authorization header
    const token = req.headers.authorization.split(" ")[1];

    try {
      // Verifying the token using the JWT_SECRET
      const decode = jwt.verify(token, process.env.JWT_SECRET);

      // Finding the manager based on the decoded manager ID
      const manager = await Manager.findById(decode.manager);

      // If the manager is not found, return unauthorized access
      if (!manager) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized access!" });
      }

      // Checking manager's permission level, must be 1 for access
      if (manager.permission !== 1) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized access!" });
      }

      // Adding the manager object to the request for further use
      req.manager = manager;
      next();
    } catch (error) {
      // Handling different JWT-related errors
      if (error.name === "JsonWebTokenError") {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized access!" });
      }
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message: "Session expired, please sign in again!",
        });
      }

      // Handling other errors and returning an internal server error message
      res.status(401).json({ success: false, message: "Internal server error!" });
    }
  } else {
    // If no Authorization header is present, return unauthorized access
    res.status(401).json({ success: false, message: "Unauthorized access!" });
  }
};
