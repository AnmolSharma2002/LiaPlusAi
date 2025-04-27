import api from "./api";

// Get all users (admin only)
export const getAllUsers = async () => {
  return await api.get("/users");
};

// Get user by ID (admin only)
export const getUserById = async (id) => {
  return await api.get(`/users/${id}`);
};

// Update user role (admin only)
export const updateUserRole = async (id, roleData) => {
  return await api.put(`/users/${id}/role`, roleData);
};

// Delete user (admin only)
export const deleteUser = async (id) => {
  return await api.delete(`/users/${id}`);
};
