import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";

// Import components
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Posts from "./components/Posts.jsx";
import AdminDashboard from "./components/AdminDasboard.jsx";
import Layout from "./components/Layout.jsx";
import Home from "./components/Home.jsx";
import CreateBlog from './components/CreateBlog.jsx';
import EditBlog from './components/EditBlog.jsx';
import PublicLayout from './components/PublicLayout.jsx';

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

// Protected Route Wrapper for redirection logic
const ProtectedRouteWrapper = ({ children, allowedRoles }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");  // Check if token exists
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!token) {
    // If no token, redirect to login
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // If user role is not allowed, redirect to posts
    return <Navigate to="/posts" replace />;
  }

  return children;  // Render children if the user is authenticated
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route
            path="/posts"
            element={
              <ProtectedRouteWrapper>
                <Layout>
                  <Posts />
                </Layout>
              </ProtectedRouteWrapper>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRouteWrapper allowedRoles={["admin"]}>
                <Layout>
                  <AdminDashboard />
                </Layout>
              </ProtectedRouteWrapper>
            }
          />

          <Route
            path="/home"
            element={
              <PublicLayout>
                <Home />
              </PublicLayout>
            }
          />

          <Route
            path="/create"
            element={
              <ProtectedRouteWrapper>
                <Layout>
                  <CreateBlog />
                </Layout>
              </ProtectedRouteWrapper>
            }
          />

          <Route
            path="/edit/:postId"
            element={
              <ProtectedRouteWrapper>
                <Layout>
                  <EditBlog />
                </Layout>
              </ProtectedRouteWrapper>
            }
          />

          <Route path="/" element={<Navigate to="/home" />} />
          
          {/* Catch-all route to redirect to login if not authenticated */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </ThemeProvider>
  );
}

export default App;