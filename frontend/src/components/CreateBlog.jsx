import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  AppBar,
  Toolbar,
  CircularProgress
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required");
      return;
    }
    
    setLoading(true);
    
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title, content })
      });
      
      if (!response.ok) {
        throw new Error("Failed to create blog post");
      }
      
      toast.success("Blog post created successfully");
      navigate("/posts");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

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
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Create New Blog Post
          </Typography>
          
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Blog Title"
              name="title"
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="content"
              label="Blog Content"
              id="content"
              multiline
              rows={12}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={loading}
            />
            
            <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
              <Button
                variant="outlined"
                onClick={() => navigate("/posts")}
                disabled={loading}
              >
                Cancel
              </Button>
              
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Create Post"}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default CreateBlog;