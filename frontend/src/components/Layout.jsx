import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
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
            <Button color="inherit" onClick={() => navigate("/posts")}>
              Posts
            </Button>

              <Button color="inherit" onClick={() => navigate("/admin")}>
                Dashboard
              </Button>
            <Button color="inherit" onClick={() => navigate("/create")}>
              Create Blog
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>{children}</Container>
    </>
  );
};

export default Layout;