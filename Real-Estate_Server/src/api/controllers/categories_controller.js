// Importing CategoriesService and catchAsync utility function
const CategoriesService = require('../services/CategoriesService');
const catchAsync = require('../utils/catchAsync');

// Controller functions for managing categories
const getAllCategoriesForManagers = catchAsync(async (req, res) => {
  // Getting all categories for managers
  const categories = await CategoriesService.getAllCategoriesForManagers();
  res.status(200).json({
    success: true,
    message: `Success to find all categories - for managers`,
    categories,
  });
});

const getCategoryByIdForManagers = catchAsync(async (req, res) => {
  // Getting a category by ID for managers
  const id = req.params.id;
  const category = await CategoriesService.getCategoryByIdForManagers(id);
  res.status(200).json({
    success: true,
    message: `Success to find category by id - for managers`,
    category,
  });
});

const addNewCategoryForManagers = catchAsync(async (req, res) => {
  // Adding a new category for managers
  const { category_name } = req.body;
  await CategoriesService.addNewCategoryForManagers(category_name);
  res.status(200).json({
    success: true,
    message: `Success to add new category - for managers`,
  });
});

const updateCategoryByIdForManagers = catchAsync(async (req, res) => {
  // Updating a category by ID for managers
  const id = req.params.id;
  const { category_name } = req.body;
  await CategoriesService.updateCategoryByIdForManagers(id, category_name);
  res.status(200).json({
    success: true,
    message: `Success to update category by id - for managers`,
  });
});

const deleteCategoryByIdForManagers = catchAsync(async (req, res) => {
  // Deleting a category by ID for managers
  const id = req.params.id;
  await CategoriesService.deleteCategoryByIdForManagers(id);
  res.status(200).json({
    success: true,
    message: `Success to delete category by id - for managers`,
  });
});

const getAllCategoriesForCustomers = catchAsync(async (req, res) => {
  // Getting all categories for customers
  const categories = await CategoriesService.getAllCategoriesForCustomers();
  res.status(200).json({
    success: true,
    message: `Success to find all categories - for customer`,
    categories,
  });
});

// Exporting the controller functions
module.exports = {
  getAllCategoriesForManagers,
  getCategoryByIdForManagers,
  addNewCategoryForManagers,
  updateCategoryByIdForManagers,
  deleteCategoryByIdForManagers,
  getAllCategoriesForCustomers,
};
