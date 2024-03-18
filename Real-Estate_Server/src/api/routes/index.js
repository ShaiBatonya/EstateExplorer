const router = require("express").Router(); // Creating an Express router

const users_router = require("./users_router"); // Importing the users router module
const products_router = require("./products_router"); // Importing the products router module
const categories_router = require("./categories_router"); // Importing the categories router module
const emails_router = require("./emails_router"); // Importing the emails router module
const system_router = require("./system_router"); // Importing the system router module

// Endpoint for checking the status of the server
router.get("/status", (_, res) => res.status(200).json({ status: "OK" }));

// Mounting routers for specific paths
router.use("/users", users_router); // Mounting the users router under the "/users" path
router.use("/products", products_router); // Mounting the products router under the "/products" path
router.use("/categories", categories_router); // Mounting the categories router under the "/categories" path

router.use("/emails", emails_router); // Mounting the emails router under the "/emails" path
router.use("/system", system_router); // Mounting the system router under the "/system" path

module.exports = router; // Exporting the configured Express router
