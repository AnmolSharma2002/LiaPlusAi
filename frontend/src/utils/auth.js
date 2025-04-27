import axios from "axios";
import jwtDecode from "jwt-decode";

// Set auth token in Axios headers
export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

// Remove auth token from Axios headers
export const removeAuthToken = () => {
  delete axios.defaults.headers.common["Authorization"];
};

// Check if token is valid
export const isTokenValid = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp > Date.now() / 1000;
  } catch (err) {
    return false;
  }
};

// Get user role from token
export const getUserRoleFromToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.role;
  } catch (err) {
    return null;
  }
};
