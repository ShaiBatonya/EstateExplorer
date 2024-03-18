// Importing necessary models
const Model = require(`../models/Product`);
const Order = require("../models/Order");

// Repository functions for products data
module.exports = {
  // Function to retrieve all products
  getAllProducts: async () => {
    try {
      const models = await Model.find().exec();
      return models;
    } catch (error) {
      throw error;
    }
  },

  // Function to retrieve a product by ID with populated category details
  getProductById: async (productId) => {
    try {
      const model = await Model.findById(productId).populate("categories.category").exec();
      return model;
    } catch (error) {
      throw error;
    }
  },

  // Function to add a new product
  addProduct: async (productData) => {
    try {
      const newModel = new Model(productData);
      await newModel.save();
    } catch (error) {
      throw error;
    }
  },

  // Function to retrieve all products for managers with populated category details
  getAllProductsForManager: async () => {
    try {
      const models = await Model.find().populate("categories.category").exec();
      return models;
    } catch (error) {
      throw error;
    }
  },

  // Function to retrieve a product by ID for managers with populated category details
  getProductByIdForManager: async (productId) => {
    try {
      const model = await Model.findById(productId).populate("categories.category").exec();
      return model;
    } catch (error) {
      throw error;
    }
  },

  // Function to delete a product for managers, checking for related orders
  deleteProductForManager: async (productId) => {
    try {
      // Check if the product has related orders
      const exists = await Order.findOne({ "products.product": productId });

      if (exists) {
        throw new Error("Cannot delete product because it has related orders.");
      }

      // Delete the product
      await Model.findByIdAndDelete(productId).exec();
    } catch (error) {
      throw error;
    }
  },

  // Function to update a product for managers
  updateProductForManager: async (productId, productData) => {
    try {
      // Prepare updated data
      const updatedData = {
        product_name: productData.product_name,
        product_description: productData.product_description,
        product_price: productData.product_price,
        product_image: productData.product_image,
        categories: productData.categories.map((cat) => {
          return {
            category: cat._id,
          };
        }),
      };

      // Update the product
      await Model.findByIdAndUpdate(productId, updatedData).exec();
    } catch (error) {
      throw error;
    }
  },
};
