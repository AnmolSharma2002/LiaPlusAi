const BlogPost = require("../models/BlogPost");

module.exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogPost.find()
      .populate("author", "username email")
      .sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.getBlogById = async (req, res) => {
  try {
    const blog = await BlogPost.findById(req.params.id).populate(
      "author",
      "username email"
    );
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.getBlogsByAuthor = async (req, res) => {
  const authorId = req.params.authorId;
  try {
    const blogs = await BlogPost.find({ author: authorId })
      .populate("author", "username email")
      .sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.createBlog = async (req, res) => {
  const { title, content, author } = req.body;
  try {
    const newBlog = await BlogPost.create({ title, content, author });
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.updateBlog = async (req, res) => {
  const blogId = req.params.id;
  const updateFields = req.body;

  try {
    const blog = await BlogPost.findByIdAndUpdate(
      blogId,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.deleteBlog = async (req, res) => {
  const blogId = req.params.id;

  try {
    const deleted = await BlogPost.findByIdAndDelete(blogId);
    if (!deleted) return res.status(404).json({ message: "Blog not found" });

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
