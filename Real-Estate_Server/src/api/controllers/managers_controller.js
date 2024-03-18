// Importing the ManagerService and catchAsync utility function
const managerService = require("../services/ManagerService");
const catchAsync = require("../utils/catchAsync");

// Controller functions for managing managers
const addManagerForAdmins = catchAsync(async (req, res) => {
  // Adding a new manager for admins
  const manager = await managerService.addManagerForAdmins(req.body);
  res.status(201).json({ success: true, message: `Success to add new manager`, manager });
});

const getAllManagers = catchAsync(async (req, res) => {
  // Getting all managers
  const managers = await managerService.getAllManagers();
  res.status(200).json({ success: true, message: `Success to find all managers`, managers });
});

const getManagerById = catchAsync(async (req, res) => {
  // Getting a manager by ID
  const manager = await managerService.getManagerById(req.params.id);
  if (!manager) return res.status(404).json({ error: "Manager not found" });
  res.status(200).json({ success: true, message: `Success to find manager by id`, manager });
});

const updateManagerById = catchAsync(async (req, res) => {
  // Updating a manager by ID
  await managerService.updateManagerById(req.params.id, req.body);
  res.status(200).json({ success: true, message: `Success to update manager by id` });
});

const deleteManagerById = catchAsync(async (req, res) => {
  // Deleting a manager by ID
  await managerService.deleteManagerById(req.params.id);
  res.status(200).json({ success: true, message: `Success to delete manager by id` });
});

const loginManager = catchAsync(async (req, res) => {
  // Logging in a manager
  const result = await managerService.loginManager(req.body);
  res.status(201).json(result);
});

const logoutManager = catchAsync(async (req, res) => {
  try {
    // Logging out a manager
    const result = await managerService.logoutManager(req.manager);
    res.status(200).json({ success: true, message: result });
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
});

const authManager = catchAsync(async (req, res) => {
  // Authenticating a manager based on the provided token
  const token = req.headers.authorization;
  try {
    const result = await managerService.authManager(token);
    res.status(201).json(result);
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
});

// Exporting the manager controller functions
module.exports = {
  addManagerForAdmins,
  getAllManagers,
  getManagerById,
  updateManagerById,
  deleteManagerById,
  loginManager,
  logoutManager,
  authManager,
};
