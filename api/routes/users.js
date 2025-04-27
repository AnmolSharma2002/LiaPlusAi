const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/auth");
const { adminOnly } = require("../middleware/roleCheck");
const { userRoleValidation } = require("../utils/validation");

// All these routes are admin only
router.use(protect);
router.use(adminOnly);

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id/role", userRoleValidation, updateUserRole);
router.delete("/:id", deleteUser);

module.exports = router;
