import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PublicLayout = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isLoggedIn = !!token;
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/home");
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Blog App
          </Typography>
          <Box>
            <Button color="inherit" onClick={() => navigate("/home")}>
              Home
            </Button>
            
            {isLoggedIn ? (
              <>
                <Button color="inherit" onClick={() => navigate("/posts")}>
                  Posts
                </Button>
                {user.role === "admin" && (
                  <Button color="inherit" onClick={() => navigate("/admin")}>
                    Dashboard
                  </Button>
                )}
                <Button color="inherit" onClick={() => navigate("/create")}>
                  Create Blog
                </Button>
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" onClick={() => navigate("/login")}>
                  Login
                </Button>
                <Button color="inherit" onClick={() => navigate("/signup")}>
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>{children}</Container>
    </>
  );
};

export default PublicLayout;