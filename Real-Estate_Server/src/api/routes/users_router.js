const router = require("express").Router();

// auth middlewares
const auth_manager = require("../middlewares/auth_manager");
const auth_user = require("../middlewares/auth_user");

const {
  validateCreateTodo,
  validateUpdateTodo,
  validateDeleteTodo,
  validateGetTodo,
} = require('../validations/todo.validation');

const validateResource = require('../middlewares/validateResource');

// functions from managers controllers
const {
  loginManager,
  logoutManager,
  authManager,
  addManagerForAdmins,
} = require("../controllers/managers_controller");

// function from users controller
const {
  getAllCustomersForManager,
  getCustomerByIdForManager,
  deleteUserByIdForManager,
  updateUserByIdForManager,
  addUserForManager,
  loginCustomer,
  authCustomer,
  logoutCustomer,
  registerCustomer,
  updateCustomer
} = require("../controllers/users_controller");

// admins request
router.post("/admins/add-manager", addManagerForAdmins);

// managers requests
router.post("/managers/login", loginManager);
router.post("/managers/logout", auth_manager, logoutManager);
router.get("/managers/auth", authManager);
router.post(
  "/add-user-for-managers",
  validateResource(validateCreateTodo),
  addUserForManager
);
router.get("/customers-for-managers", getAllCustomersForManager);
router.get(
  "/customer-by-id-for-manager/:user_id",
  validateResource(validateGetTodo),
  getCustomerByIdForManager
);
router.delete(
  "/delete-user-for-managers/:user_id",
  validateResource(validateDeleteTodo),
  deleteUserByIdForManager
);
router.put(
  "/update-user-for-managers/:user_id",
  validateResource(validateUpdateTodo),
  updateUserByIdForManager
);

// customers requests
router.post("/customers/login", loginCustomer);
router.post("/customers/logout", auth_user, logoutCustomer);
router.get("/customers/auth", authCustomer);
router.post(
  "/customers/register",
  
  registerCustomer
);
router.put(
  "/customers/update/:id",
  auth_user,
  validateResource(validateUpdateTodo),
  updateCustomer
);

module.exports = router;
