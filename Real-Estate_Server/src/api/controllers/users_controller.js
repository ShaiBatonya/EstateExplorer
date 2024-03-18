const userService = require('../services/UserService');

module.exports = {
  add: async (req, res) => {
    try {
      const { user_name, user_email, user_password, user_phone, user_address } = req.body;
      await userService.registerUser({ user_name, user_email, user_password, user_phone, user_address });
      return res.status(200).json({ success: true, message: `success to add new user` });
    } catch (error) {
      return res.status(500).json({ message: `error in add user`, error: error.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const users = await userService.getAllUsers();
      return res.status(200).json({ success: true, message: `success to find all users`, users });
    } catch (error) {
      return res.status(500).json({ message: `error in get all users`, error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await userService.getUserById(userId);
      return res.status(200).json({ success: true, message: `success to find user by id`, user });
    } catch (error) {
      return res.status(500).json({ message: `error in find user by id`, error: error.message });
    }
  },

  updateById: async (req, res) => {
    try {
      const userId = req.params.id;
      await userService.updateUserById(userId, req.body);
      return res.status(200).json({ success: true, message: `success to update user by id` });
    } catch (error) {
      return res.status(500).json({ message: `error in update user by id`, error: error.message });
    }
  },

  deleteById: async (req, res) => {
    try {
      const userId = req.params.id;
      await userService.deleteUserById(userId);
      return res.status(200).json({ success: true, message: `success to delete user by id` });
    } catch (error) {
      return res.status(500).json({ message: `error in delete user by id`, error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { user_email, user_password } = req.body;
      const { token, user } = await userService.loginUser(user_email, user_password);
      return res.status(201).json({ success: true, message: "user login successfully", token, user });
    } catch (error) {
      return res.status(500).json({ message: "error in login request", error: error.message });
    }
  },

  logout: async (req, res) => {
    try {
      const successMessage = await userService.logoutUser(req.user._id, req.headers.authorization);
      return res.status(200).json({ success: true, message: successMessage });
    } catch (error) {
      return res.status(500).json({ message: "error in logout request", error: error.message });
    }
  },

  authToken: async (req, res) => {
    try {
      const { token, user } = await userService.authenticateToken(req.headers.authorization);
      return res.status(201).json({ success: true, message: "user authorized", token, user });
    } catch (error) {
      return res.status(401).json({ message: "unauthorized", error: error.message });
    }
  },

  // Customers requests
  registerCustomer: async (req, res) => {
    try {
      const { user_name, user_email, user_password, user_password_confirm, user_phone } = req.body;
      await userService.registerCustomer({ user_name, user_email, user_password, user_password_confirm, user_phone });
      return res.status(200).json({ success: true, message: `success to register user` });
    } catch (error) {
      return res.status(500).json({ message: `error in register user`, error: error.message });
    }
  },

  loginCustomer: async (req, res) => {
    try {
      const { user_email, user_password } = req.body;
      const { customer_token } = await userService.loginCustomer(user_email, user_password);
      return res.status(201).json({ success: true, message: "user login successfully - for customer", customer_token });
    } catch (error) {
      return res.status(500).json({ message: "error in login request - for customer", error: error.message });
    }
  },

  logoutCustomer: async (req, res) => {
    try {
      const successMessage = await userService.logoutCustomer(req.user._id, req.headers.authorization);
      return res.status(200).json({ success: true, message: successMessage });
    } catch (error) {
      return res.status(500).json({ message: "error in logout request", error: error.message });
    }
  },

  authCustomer: async (req, res) => {
    try {
      const { customer_token, user } = await userService.authenticateCustomerToken(req.headers.authorization);
      return res.status(201).json({ success: true, message: "user authorized", customer_token, user });
    } catch (error) {
      return res.status(401).json({ message: "unauthorized", error: error.message });
    }
  },

  updateCustomer: async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await userService.updateCustomer(userId, req.body);
      return res.status(200).json({ success: true, message: `success to update user by id`, user });
    } catch (error) {
      return res.status(500).json({ message: `error in update user by id`, error: error.message });
    }
  },

  // Managers requests
  getCustomerByIdForManager: async (req, res) => {
    try {
      const userId = req.params.user_id;
      const user = await userService.getCustomerByIdForManager(userId);
      return res.status(200).json({ success: true, message: `success to find user by id - for manager`, user });
    } catch (error) {
      return res.status(500).json({ message: `error in find user by id - for manager`, error: error.message });
    }
  },

  getAllCustomersForManager: async (req, res) => {
    try {
      const users = await userService.getAllCustomersForManager();
      return res.status(200).json({ success: true, message: `success to find all users - for manager`, users });
    } catch (error) {
      return res.status(500).json({ message: `error in get all users - for manager`, error: error.message });
    }
  },

  deleteUserByIdForManager: async (req, res) => {
    try {
      const userId = req.params.user_id;
      await userService.deleteUserByIdForManager(userId);
      return res.status(200).json({ success: true, message: `success to delete user by id - for managers` });
    } catch (error) {
      return res.status(500).json({ message: `error in delete user by id - for managers`, error: error.message });
    }
  },

  addUserForManager: async (req, res) => {
    try {
      const { user_name, user_email, user_password, user_phone, user_address } = req.body;
      await userService.addUserForManager({ user_name, user_email, user_password, user_phone, user_address });
      return res.status(200).json({ success: true, message: `success to add new user` });
    } catch (error) {
      return res.status(500).json({ message: `error in add user`, error: error.message });
    }
  },

  updateUserByIdForManager: async (req, res) => {
    try {
      const userId = req.params.user_id;
      await userService.updateUserByIdForManager(userId, req.body);
      return res.status(200).json({ success: true, message: `success to update user by id` });
    } catch (error) {
      return res.status(500).json({ message: `error in update user by id`, error: error.message });
    }
  },
};
