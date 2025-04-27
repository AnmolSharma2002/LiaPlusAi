import axios from "axios";

const API_URL = "/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message || "An error occurred"
        : "Network error";

    return Promise.reject({
      message: errorMessage,
      status: error.response ? error.response.status : 500,
      data: error.response ? error.response.data : null,
    });
  }
);

export default api;
