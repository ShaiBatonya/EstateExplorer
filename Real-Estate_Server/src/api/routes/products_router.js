const router = require("express").Router();

// auth
const auth_manager = require("../middlewares/auth_manager");
const {
  validateCreateTodo,
  validateUpdateTodo,
  validateDeleteTodo,
  validateGetTodo,
} = require("../validations/todo.validation");

const validateResource = require("../middlewares/validateResource");

// manager functions
const {
  getAllProductsForManager,
  addProductForManager,
  deleteProductForManager,
  getByIdForManager,
  updateProductForManager,
} = require("../controllers/products_controller");

// customers functions
const {
  getAllProductsForCustomers,
  getProductByIdForCustomers,
} = require("../controllers/products_controller");

// managers requests
router.get("/managers/all", /* auth_manager, */ getAllProductsForManager);
router.get(
  "/managers/by_id/:product_id",
  validateResource(validateGetTodo) /* auth_manager, */,
  getByIdForManager
);
router.post(
  "/managers/add",
  
  /* auth_manager, */
  addProductForManager
);
router.put(
  "/managers/update/:product_id",
  validateResource(validateUpdateTodo),
  /* auth_manager, */
  updateProductForManager
);
router.delete(
  "/managers/delete/:product_id",
  validateResource(validateDeleteTodo),
  auth_manager,
  deleteProductForManager
);

// _________________

// customer requests

router.get("/customers/all", getAllProductsForCustomers);
router.get(
  "/customers/product/:product_id",

  getProductByIdForCustomers
);

// _________________

module.exports = router;
