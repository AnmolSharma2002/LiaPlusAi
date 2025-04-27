const BlogPost = require("../models/BlogPost");
const { validationResult } = require("express-validator");

// @desc    Get all blog posts
// @route   GET /api/blogs
// @access  Public
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogPost.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get single blog post
// @route   GET /api/blogs/:id
// @access  Public
exports.getBlogById = async (req, res) => {
  try {
    const blog = await BlogPost.findById(req.params.id).populate(
      "author",
      "name email"
    );

    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    res.json({
      success: true,
      data: blog,
    });
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Blog post not found" });
    }

    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Create new blog post
// @route   POST /api/blogs
// @access  Private (Admin only)
exports.createBlog = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content } = req.body;

    const newBlog = new BlogPost({
      title,
      content,
      author: req.user.id,
    });

    const blog = await newBlog.save();

    res.status(201).json({
      success: true,
      data: blog,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update blog post
// @route   PUT /api/blogs/:id
// @access  Private (Admin only)
exports.updateBlog = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content } = req.body;

    // Find blog post
    let blog = await BlogPost.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    // Update blog
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.updatedAt = Date.now();

    await blog.save();

    res.json({
      success: true,
      data: blog,
    });
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Blog post not found" });
    }

    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Delete blog post
// @route   DELETE /api/blogs/:id
// @access  Private (Admin only)
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await BlogPost.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    await blog.remove();

    res.json({
      success: true,
      message: "Blog post removed",
    });
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Blog post not found" });
    }

    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get user's own blog posts
// @route   GET /api/blogs/my-blogs
// @access  Private
exports.getMyBlogs = async (req, res) => {
  try {
    const blogs = await BlogPost.find({ author: req.user.id }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};
