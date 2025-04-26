const express = require("express");
const router = express.Router();
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  getMyPosts,
} = require("../controller/postController");
const { protect, checkPostOwnership } = require("../middleware/auth");

// Public routes
router.get("/", getPosts);
router.get("/:id", getPost);

// Protected routes
router.post("/", protect, createPost);
router.put("/:id", protect, checkPostOwnership, updatePost);
router.delete("/:id", protect, checkPostOwnership, deletePost);
router.get("/user/myposts", protect, getMyPosts);

module.exports = router;
