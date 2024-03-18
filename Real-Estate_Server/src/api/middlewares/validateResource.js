const Joi = require('joi'); // Importing the Joi validation library

// Middleware function for validating request data using a provided schema
const validate = (schema) => (req, res, next) => {
  try {
    const { body, query, params } = req;
    const input = { body, query, params };

    // Validating input against the provided schema
    const { error } = schema.validate(input, { abortEarly: false });

    // If there are no validation errors, proceed to the next middleware
    if (!error) {
      next();
    } else {
      // If there are validation errors, construct an error message
      const errorMessage = error.details.map(detail => detail.message).join(', ');
      console.error('Validation error:', errorMessage);
      return res.status(400).json({ error: errorMessage });
    }
  } catch (e) {
    // Handling unexpected errors
    console.error('Error:', e);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = validate; // Exporting the validate middleware
