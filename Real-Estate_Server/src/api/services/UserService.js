const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Order = require('../models/Order');

module.exports = {
  registerUser: async ({ user_name, user_email, user_password, user_phone, user_address }) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user_password, saltRounds);
    const newUser = new User({
      user_name,
      user_email,
      user_password: hashedPassword,
      user_phone: user_phone || '',
      user_address: user_address || '',
    });
    await newUser.save();
  },

  getAllUsers: async () => {
    return await User.find();
  },

  getUserById: async (userId) => {
    return await User.findById(userId);
  },

  updateUserById: async (userId, updateData) => {
    await User.findByIdAndUpdate(userId, updateData);
  },

  deleteUserById: async (userId) => {
    await User.findByIdAndDelete(userId);
  },

  loginUser: async (user_email, user_password) => {
    const user = await User.findOne({ user_email });
    if (!user) throw new Error("bad credentials");
    const validPassword = await bcrypt.compare(user_password, user.user_password);
    if (!validPassword) throw new Error("bad credentials");

    const payload = { user: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 1000 });

    let oldTokens = user.tokens || [];
    if (oldTokens.length) {
      oldTokens = oldTokens.filter((t) => {
        const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
        if (timeDiff < 1000) return t;
      });
    }

    await User.findByIdAndUpdate(user._id, { tokens: [...oldTokens, { token, signedAt: Date.now().toString() }] });
    return { token, user: { _id: user._id, user_name: user.user_name, user_email: user.user_email } };
  },

  logoutUser: async (userId, authorizationHeader) => {
    const token = authorizationHeader.split(" ")[1];
    if (!token) throw new Error("Authorization fail!");
    const user = await User.findById(userId);
    const newTokens = user.tokens.filter((t) => t.token !== token);
    await User.findByIdAndUpdate(userId, { tokens: newTokens });
    return "success to logout user";
  },

  authenticateToken: async (authorizationHeader) => {
    const token = authorizationHeader.split(" ")[1];
    if (!token) throw new Error("no token provided");
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decode.user);
    if (!user) throw new Error("user not exists");
    return { token, user: { _id: user._id, user_name: user.user_name, user_email: user.user_email } };
  },

  // Customers requests
  registerCustomer: async ({ user_name, user_email, user_password, user_password_confirm, user_phone }) => {
    if (user_password !== user_password_confirm) throw new Error("Passwords do not match");
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user_password, saltRounds);
    const newCustomer = new User({
      user_name,
      user_email,
      user_password: hashedPassword,
      user_phone: user_phone || "",
    });
    await newCustomer.save();
  },

  loginCustomer: async (user_email, user_password) => {
    const user = await User.findOne({ user_email });
    if (!user) throw new Error("bad credentials");
    const validPassword = await bcrypt.compare(user_password, user.user_password);
    if (!validPassword) throw new Error("bad credentials");

    const payload = { user: user._id };
    const customer_token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 1000 });

    let oldTokens = user.tokens || [];
    if (oldTokens.length) {
      oldTokens = oldTokens.filter((t) => {
        const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
        if (timeDiff < 1000) return t;
      });
    }

    await User.findByIdAndUpdate(user._id, { tokens: [...oldTokens, { customer_token, signedAt: Date.now().toString() }] });
    return { customer_token };
  },

  logoutCustomer: async (userId, authorizationHeader) => {
    const token = authorizationHeader.split(" ")[1];
    if (!token) throw new Error("Authorization fail!");
    const user = await User.findById(userId);
    const newTokens = user.tokens.filter((t) => t.token !== token);
    await User.findByIdAndUpdate(userId, { tokens: newTokens });
    return "success to logout user";
  },

  authenticateCustomerToken: async (authorizationHeader) => {
    const customer_token = authorizationHeader.split(" ")[1];
    if (!customer_token) throw new Error("no token provided");
    const decode = jwt.verify(customer_token, process.env.JWT_SECRET);
    const user = await User.findById(decode.user, "-user_password -tokens");
    if (!user) throw new Error("access denied");
    return { customer_token, user };
  },

  updateCustomer: async (userId, updateData) => {
    return await User.findByIdAndUpdate(userId, updateData, { new: true });
  },

  // Managers requests
  getCustomerByIdForManager: async (userId) => {
    return await User.findById(userId);
  },

  getAllCustomersForManager: async () => {
    return await User.find();
  },

  deleteUserByIdForManager: async (userId) => {
    const exists = await Order.findOne({ user: userId });
    if (exists) throw new Error("cannot delete this user because have orders related to this user");
    await User.findByIdAndDelete(userId);
  },

  addUserForManager: async ({ user_name, user_email, user_password, user_phone, user_address }) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user_password, saltRounds);
    const newUser = new User({
      user_name,
      user_email,
      user_password: hashedPassword,
      user_phone: user_phone || "",
      user_address: user_address || "",
    });
    await newUser.save();
  },

  updateUserByIdForManager: async (userId, updateData) => {
    await User.findByIdAndUpdate(userId, updateData);
  },
};
