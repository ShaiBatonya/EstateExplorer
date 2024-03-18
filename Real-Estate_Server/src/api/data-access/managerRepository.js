
// Naming conventions
let controller_name = "manager";
let object_name = "Manager";
let objects_name = "managers";

// Importing necessary model
let Model = require(`../models/${object_name}`);

// Function to add a new manager to the database
const addManager = async (managerData) => {
  // Creating a new instance of the Manager model with provided data
  const newModel = new Model(managerData);
  // Saving the new manager to the database
  return await newModel.save();
};

// Function to retrieve all managers with populated cart and orders details
const getAllManagers = async () => {
  // Finding all managers and populating the "manager_cart" and "manager_orders.order" fields
  return await Model.find().populate(["manager_cart", "manager_orders.order"]).exec();
};

// Function to retrieve a manager by ID with populated cart and orders details
const getManagerById = async (id) => {
  // Finding a manager by ID and populating the "manager_cart" and "manager_orders.order" fields
  return await Model.findById(id).populate(["manager_cart", "manager_orders.order"]).exec();
};

// Function to update a manager by ID with new data
const updateManagerById = async (id, updateData) => {
  // Finding a manager by ID and updating with the provided data
  return await Model.findByIdAndUpdate(id, updateData).exec();
};

// Function to delete a manager by ID
const deleteManagerById = async (id) => {
  // Finding a manager by ID and deleting it from the database
  return await Model.findByIdAndDelete(id).exec();
};

// Exporting the functions to be used in other parts of the application
module.exports = {
  addManager,
  getAllManagers,
  getManagerById,
  updateManagerById,
  deleteManagerById,
};
