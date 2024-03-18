// Importing the Category and Product models
const Category = require("../models/Category");
const Product = require("../models/Product");

// Function to get all categories from the database
const getAllCategories = async () => {
  return await Category.find().exec();
};

// Function to get a category by its ID from the database
const getCategoryById = async (id) => {
  return await Category.findById(id).exec();
};

// Function to add a new category to the database
const addNewCategory = async (category_name) => {
  // Creating a new Category instance
  const category = new Category({
    category_name,
  });
  // Saving the new category to the database
  await category.save();
};

// Function to update a category by its ID in the database
const updateCategoryById = async (id, category_name) => {
  // Updating the category by its ID with a new category name
  await Category.findByIdAndUpdate(id, { category_name });
};

// Function to delete a category by its ID from the database
const deleteCategoryById = async (id) => {
  // Checking if there are any products related to the category
  const exists = await Product.findOne({'categories.category': id});
  if (exists) {
    // If products are related, throw an error preventing deletion
    throw new Error("Cannot delete category because it has products related to this category");
  }
  // Deleting the category from the database
  await Category.findByIdAndDelete(id);
};

// Exporting DAO (Data Access Object) functions for external use
module.exports = {
  getAllCategories,
  getCategoryById,
  addNewCategory,
  updateCategoryById,
  deleteCategoryById,
};
