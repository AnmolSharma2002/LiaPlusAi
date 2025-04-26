const express = require("express");
const router = express.Router();
const { signup, login } = require("../validatiators/userValidation");
const userController = require("../controller/authController");

// Auth routes
router.post("/signup", signup, userController.signup);
router.post("/login", login, userController.login);
router.get("/verify-email", userController.verifyEmail);

module.exports = router;
