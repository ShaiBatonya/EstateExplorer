const productRepository = require('../data-access/productRepository'); // Importing the product repository module

module.exports = {
  // Service function to get all products for customers
  getAllProductsForCustomers: async () => {
    try {
      const models = await productRepository.getAllProducts();
      return models;
    } catch (error) {
      throw error;
    }
  },

  // Service function to get a product by ID for customers
  getProductByIdForCustomers: async (productId) => {
    try {
      const model = await productRepository.getProductById(productId);
      return model;
    } catch (error) {
      throw error;
    }
  },

  // Service function to add a product for managers
  addProductForManager: async (productData) => {
    try {
      await productRepository.addProduct(productData);
    } catch (error) {
      throw error;
    }
  },

  // Service function to get all products for managers
  getAllProductsForManager: async () => {
    try {
      const models = await productRepository.getAllProductsForManager();
      return models;
    } catch (error) {
      throw error;
    }
  },

  // Service function to get a product by ID for managers
  getProductByIdForManager: async (productId) => {
    try {
      const model = await productRepository.getProductByIdForManager(productId);
      return model;
    } catch (error) {
      throw error;
    }
  },

  // Service function to delete a product for managers
  deleteProductForManager: async (productId) => {
    try {
      await productRepository.deleteProductForManager(productId);
    } catch (error) {
      throw error;
    }
  },

  // Service function to update a product for managers
  updateProductForManager: async (productId, productData) => {
    try {
      await productRepository.updateProductForManager(productId, productData);
    } catch (error) {
      throw error;
    }
  },
};
