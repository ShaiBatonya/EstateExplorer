// Importing the productService
const productService = require('../services/productService');

// Constants for controller and object names
const controler_name = "product";
const object_name = "Product";
const objects_name = "products";

// Exporting an object with methods to handle various product-related operations
module.exports = {
  // Function to get all products for customers
  getAllProductsForCustomers: async (req, res) => {
    try {
      // Calling the getAllProductsForCustomers function from productService
      const models = await productService.getAllProductsForCustomers();
      // Sending a successful response with the retrieved products
      return res.status(200).json({
        success: true,
        message: `Successfully found all ${objects_name}`,
        [objects_name]: models,
      });
    } catch (error) {
      // Handling errors and sending an error response
      return res.status(500).json({
        message: `Error in getting all ${objects_name}`,
        error: error.message,
      });
    }
  },

  // Function to get a product by its ID for customers
  getProductByIdForCustomers: async (req, res) => {
    try {
      // Calling the getProductByIdForCustomers function from productService
      const model = await productService.getProductByIdForCustomers(req.params.product_id);
      // Sending a successful response with the retrieved product
      return res.status(200).json({
        success: true,
        message: `Successfully found ${controler_name} by id for - customer`,
        product: model,
      });
    } catch (error) {
      // Handling errors and sending an error response
      return res.status(500).json({
        message: `Error in finding ${controler_name} by id for - customer`,
        error: error.message,
      });
    }
  },

  // Function to add a new product for managers
  addProductForManager: async (req, res) => {
    try {
      // Extracting relevant data from the request body
      const {
        product_name,
        product_description,
        product_price,
        product_image,
        categories
      } = req.body;

      // Mapping category IDs to the expected format
      const fix = JSON.parse(categories).map((c) => {
        return {
          category: c.id
        };
      });

      // Calling the addProductForManager function from productService
      await productService.addProductForManager({
        product_name,
        product_description,
        product_price,
        product_image,
        categories: fix
      });

      // Sending a successful response
      return res.status(200).json({
        success: true,
        message: `Successfully added new ${controler_name} - for managers`,
      });
    } catch (error) {
      // Handling errors and sending an error response
      return res.status(500).json({
        message: `Error in adding ${controler_name} - for managers`,
        error: error.message,
      });
    }
  },

  // Function to get all products for managers
  getAllProductsForManager: async (req, res) => {
    try {
      // Calling the getAllProductsForManager function from productService
      const models = await productService.getAllProductsForManager();
      // Sending a successful response with the retrieved products
      return res.status(200).json({
        success: true,
        message: `Successfully found all ${objects_name} - for managers`,
        [objects_name]: models,
      });
    } catch (error) {
      // Handling errors and sending an error response
      return res.status(500).json({
        message: `Error in getting all ${objects_name} - for managers`,
        error: error.message,
      });
    }
  },

  // Function to get a product by its ID for managers
  getByIdForManager: async (req, res) => {
    try {
      // Calling the getProductByIdForManager function from productService
      const model = await productService.getProductByIdForManager(req.params.product_id);
      // Sending a successful response with the retrieved product
      return res.status(200).json({
        success: true,
        message: `Successfully found ${controler_name} by id for - manager`,
        product: model,
      });
    } catch (error) {
      // Handling errors and sending an error response
      return res.status(500).json({
        message: `Error in finding ${controler_name} by id for - manager`,
        error: error.message,
      });
    }
  },

  // Function to delete a product by its ID for managers
  deleteProductForManager: async (req, res) => {
    try {
      // Calling the deleteProductForManager function from productService
      await productService.deleteProductForManager(req.params.product_id);
      // Sending a successful response
      return res.status(200).json({
        success: true,
        message: `Successfully deleted ${controler_name} by id - for managers`,
      });
    } catch (error) {
      // Handling errors and sending an error response
      return res.status(500).json({
        message: `Error in deleting ${controler_name} by id - for managers`,
        error: error.message,
      });
    }
  },

  // Function to update a product by its ID for managers
  updateProductForManager: async (req, res) => {
    try {
      // Calling the updateProductForManager function from productService
      await productService.updateProductForManager(req.params.product_id, req.body);
      // Sending a successful response
      return res.status(200).json({
        success: true,
        message: `Successfully updated ${controler_name} by id - for managers`,
      });
    } catch (error) {
      // Handling errors and sending an error response
      return res.status(500).json({
        message: `Error in updating ${controler_name} by id - for managers`,
        error: error.message,
      });
    }
  },
};
