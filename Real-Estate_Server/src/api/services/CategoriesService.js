const categoriesRepository = require('../data-access/categoriesRepository'); // Importing the categories repository module

// Service function to get all categories for managers
const getAllCategoriesForManagers = async () => {
  return await categoriesRepository.getAllCategories();
};

// Service function to get a category by ID for managers
const getCategoryByIdForManagers = async (id) => {
  return await categoriesRepository.getCategoryById(id);
};

// Service function to add a new category for managers
const addNewCategoryForManagers = async (category_name) => {
  await categoriesRepository.addNewCategory(category_name);
};

// Service function to update a category by ID for managers
const updateCategoryByIdForManagers = async (id, category_name) => {
  await categoriesRepository.updateCategoryById(id, category_name);
};

// Service function to delete a category by ID for managers
const deleteCategoryByIdForManagers = async (id) => {
  await categoriesRepository.deleteCategoryById(id);
};

// Service function to get all categories for customers (assuming it is the same as for managers)
const getAllCategoriesForCustomers = async () => {
  return await categoriesRepository.getAllCategories();
};

// Exporting service functions
module.exports = {
  getAllCategoriesForManagers,
  getCategoryByIdForManagers,
  addNewCategoryForManagers,
  updateCategoryByIdForManagers,
  deleteCategoryByIdForManagers,
  getAllCategoriesForCustomers,
};
