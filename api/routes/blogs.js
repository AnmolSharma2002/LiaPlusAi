const express = require("express");
const router = express.Router();
const {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  getMyBlogs,
} = require("../controllers/blogController");
const { protect } = require("../middleware/auth");
const { authorize, adminOnly } = require("../middleware/roleCheck");
const { blogValidation } = require("../utils/validation");
const config = require("../config/config");

// Public routes
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);

// Protected routes
router.get("/user/my-blogs", protect, getMyBlogs);

// Admin only routes
router.post("/", protect, adminOnly, blogValidation, createBlog);
router.put("/:id", protect, adminOnly, blogValidation, updateBlog);
router.delete("/:id", protect, adminOnly, deleteBlog);

module.exports = router;
