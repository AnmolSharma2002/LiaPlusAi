const { check } = require("express-validator");

exports.registerValidation = [
  check("name", "Name is required").not().isEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password must be at least 6 characters").isLength({
    min: 6,
  }),
];

exports.loginValidation = [
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password is required").exists(),
];

exports.blogValidation = [
  check("title", "Title is required").not().isEmpty(),
  check("content", "Content is required").not().isEmpty(),
];

exports.userRoleValidation = [
  check("role", "Role is required").not().isEmpty(),
];
