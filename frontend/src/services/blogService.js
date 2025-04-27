import api from "./api";

// Get all blogs
export const getAllBlogs = async () => {
  return await api.get("/blogs");
};

// Get blog by ID
export const getBlogById = async (id) => {
  return await api.get(`/blogs/${id}`);
};

// Get current user's blogs
export const getMyBlogs = async () => {
  return await api.get("/blogs/user/my-blogs");
};

// Create new blog (admin only)
export const createBlog = async (blogData) => {
  return await api.post("/blogs", blogData);
};

// Update blog (admin only)
export const updateBlog = async (id, blogData) => {
  return await api.put(`/blogs/${id}`, blogData);
};

// Delete blog (admin only)
export const deleteBlog = async (id) => {
  return await api.delete(`/blogs/${id}`);
};
