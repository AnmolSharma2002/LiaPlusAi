const express = require("express");
const router = express.Router();
const { register, login, getMe } = require("../controllers/authController");
const { protect } = require("../middleware/auth");
const { registerValidation, loginValidation } = require("../utils/validation");

// Register route
router.post("/register", registerValidation, register);

// Login route
router.post("/login", loginValidation, login);

// Get current user route
router.get("/me", protect, getMe);

module.exports = router;
