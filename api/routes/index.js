const express = require("express");
const router = express.Router();
const authRoutes = require("./authRoutes");
const blogPost = require("./blogRoutes");

router.use("/auth", authRoutes);
router.use("/blog", blogPost);

module.exports = router;
