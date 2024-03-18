const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const product_schema = new Schema({
  product_name: {
    type: String,
    required: true,
    unique: true
  },

  product_description: {
    type: String,
  },

  product_price: {
    type: Number,
    required: true,
    min: [1,"must be positive"]
  },

  product_image: {
    type: String
  },

  categories : [
    {
      category:{

        type: mongoose.Types.ObjectId,
        ref: 'categories'
      }
    }
  ]
});

product_schema.plugin(uniqueValidator, { message: 'Error, already exists {PATH} with this value : {VALUE}' });

module.exports = mongoose.model("products", product_schema);
