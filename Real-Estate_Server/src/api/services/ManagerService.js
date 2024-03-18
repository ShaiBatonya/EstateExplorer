// manager.service.js

const managerRepository = require('../data-access/managerRepository'); // Importing the manager repository module
const bcrypt = require("bcrypt"); // Library for hashing passwords
const jwt = require("jsonwebtoken"); // Library for handling JSON Web Tokens
const Model = require('../models/Manager'); // Adjust the path based on your actual file structure

// Service function to add a manager for admins
const addManagerForAdmins = async (managerData) => {
  return await managerRepository.addManager(managerData);
};

// Service function to get all managers
const getAllManagers = async () => {
  return await managerRepository.getAllManagers();
};

// Service function to get a manager by ID
const getManagerById = async (id) => {
  return await managerRepository.getManagerById(id);
};

// Service function to update a manager by ID
const updateManagerById = async (id, updateData) => {
  return await managerRepository.updateManagerById(id, updateData);
};

// Service function to delete a manager by ID
const deleteManagerById = async (id) => {
  return await managerRepository.deleteManagerById(id);
};

// Service function for manager login
const loginManager = async (credentials) => {
  const { manager_email, manager_password } = credentials;
  const manager = await Model.findOne({ manager_email });

  if (!manager || !(await bcrypt.compare(manager_password, manager.manager_password))) {
    throw new Error("Invalid credentials");
  }

  let payload = { manager: manager._id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 10800 });

  // Filtering and updating the tokens array
  let oldTokens = manager.tokens || [];
  oldTokens = oldTokens.filter((t) => (Date.now() - parseInt(t.signedAt)) / 1000 < 10800);

  await Model.findByIdAndUpdate(manager._id, {
    tokens: [...oldTokens, { token, signedAt: Date.now().toString() }],
  }).exec();

  return {
    token,
    manager: {
      _id: manager._id,
      manager_name: manager.manager_name,
      manager_email: manager.manager_email,
    },
  };
};

// Service function for manager logout
const logoutManager = async (manager) => {
  const token = manager.tokens && manager.tokens[0] && manager.tokens[0].token;

  if (!token) {
    throw new Error("Authorization fail!");
  }

  // Filtering and updating the tokens array
  const newTokens = manager.tokens.filter((t) => t.token !== token);

  await Model.findByIdAndUpdate(manager._id, { tokens: newTokens }).exec();
  return "Logout successful";
};

// Service function for manager authentication
const authManager = async (token) => {
  if (!token) {
    throw new Error("No token provided");
  }

  const bearer = token.split(" ")[1];
  const decode = jwt.verify(bearer, process.env.JWT_SECRET);
  const manager = await Model.findById(decode.manager).exec();

  if (!manager || manager.permission !== 1) {
    throw new Error("Access denied");
  }

  // Checking if the token is present in the manager's tokens array
  const checkTokenInArr = manager.tokens.some((obj) => obj.token == bearer);

  if (!checkTokenInArr) {
    throw new Error("Manager unauthorized");
  }

  // Generating and updating a new refresh token
  let payload = { manager: manager._id };
  const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 10800 });

  // Filtering and updating the tokens array
  let oldTokens = manager.tokens || [];
  oldTokens = oldTokens.filter((t) => (Date.now() - parseInt(t.signedAt)) / 1000 < 10800);

  await Model.findByIdAndUpdate(manager._id, {
    tokens: [...oldTokens, { token: refreshToken, signedAt: Date.now().toString() }],
  }).exec();

  return {
    token: refreshToken,
    manager: {
      _id: manager._id,
      manager_name: manager.manager_name,
      manager_email: manager.manager_email,
    },
  };
};

// Exporting service functions
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
