// data-access/dashboardRepository.js

// Importing necessary models
const Category = require("../models/Category");
const Product = require("../models/Product");
const Order = require("../models/Order");

// Repository functions for retrieving counts and orders data
module.exports = {
  // Function to get the count of products in the database
  getProductsCount: async () => {
    try {
      // Counting the documents in the Product model
      const count = await Product.countDocuments();
      return count;
    } catch (error) {
      throw error;
    }
  },

  // Function to get the count of categories in the database
  getCategoriesCount: async () => {
    try {
      // Counting the documents in the Category model
      const count = await Category.countDocuments();
      return count;
    } catch (error) {
      throw error;
    }
  },

  // Function to get the count of orders in the database
  getOrdersCount: async () => {
    try {
      // Counting the documents in the Order model
      const count = await Order.countDocuments();
      return count;
    } catch (error) {
      throw error;
    }
  },

  // Function to retrieve all orders with populated product details
  getAllOrders: async () => {
    try {
      // Finding all orders and populating the 'products.product' field
      const orders = await Order.find().populate('products.product');
      return orders;
    } catch (error) {
      throw error;
    }
  },
};
