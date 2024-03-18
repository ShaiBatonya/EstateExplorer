const router = require("express").Router();
const auth_manager = require("../middlewares/auth_manager");

const {
  validateCreateTodo,
  validateUpdateTodo,
  validateDeleteTodo,
  validateGetTodo,
} = require("../validations/todo.validation");

const validateResource = require("../middlewares/validateResource");

// managers functions

const {
  getAllCategoriesForManagers,
  getCategoryByIdForManagers,
  addNewCategoryForManagers,
  deleteCategoryByIdForManagers,
  updateCategoryByIdForManagers,
} = require("../controllers/categories_controller");

// ___________________

// customers functions

const {
  getAllCategoriesForCustomers,
} = require("../controllers/categories_controller");

// ___________________

// managers requests

router.get("/managers/all", getAllCategoriesForManagers);
router.get(
  "/managers/get-by-id/:id",
  validateResource(validateGetTodo),
  getCategoryByIdForManagers
);
router.post(
  "/managers/add-category",
  validateResource(validateCreateTodo),
  addNewCategoryForManagers
);
router.delete(
  "/managers/delete-category/:id",
  validateResource(validateDeleteTodo),
  deleteCategoryByIdForManagers
);
router.put(
  "/managers/update-category/:id",
  validateResource(validateUpdateTodo),
  updateCategoryByIdForManagers
);

// __________________

// customers requests

router.get("/customers/all", getAllCategoriesForCustomers);

// __________________

module.exports = router;
