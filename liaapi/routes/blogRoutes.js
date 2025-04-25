const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const authMiddleware = require("../middleware/authMiddleware");

// Public Routes
router.get("/", blogController.getAllBlogs); // Get all blogs
router.get("/:id", blogController.getBlogById); // Get blog by ID
router.get("/author/:authorId", blogController.getBlogsByAuthor); // Get blogs by author name

// Protected Admin Routes
router.post(
  "/create",
  authMiddleware.authenticate,
  authMiddleware.authorizeRoles("admin"),
  blogController.createBlog
);

router.patch(
  "/:id",
  authMiddleware.authenticate,
  authMiddleware.authorizeRoles("admin"),
  blogController.updateBlog
);

router.delete(
  "/:id",
  authMiddleware.authenticate,
  authMiddleware.authorizeRoles("admin"),
  blogController.deleteBlog
);

module.exports = router;
