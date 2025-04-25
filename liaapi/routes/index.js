const express = require("express");
const router = express.Router();
const authRoutes = require("../routes/authRoutes");
const blogRoutes = require("../routes/blogRoutes");
router.use("/auth", authRoutes);
router.use("/blogs", blogRoutes);
module.exports = router;
