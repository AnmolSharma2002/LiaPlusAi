import React, { useState, useEffect } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { postId } = useParams();

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPost = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch post");
      }
      
      const data = await response.json();
      setTitle(data.title);
      setContent(data.content);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
      navigate("/posts");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required");
      return;
    }
    
    setSubmitting(true);
    
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/posts/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title, content })
      });
      
      if (!response.ok) {
        throw new Error("Failed to update blog post");
      }
      
      toast.success("Blog post updated successfully");
      navigate("/posts");
    } catch (error) {
      toast.error(error.message);
      setSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

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
            Edit Blog Post
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
              disabled={submitting}
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
              disabled={submitting}
            />
            
            <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
              <Button
                variant="outlined"
                onClick={() => navigate("/posts")}
                disabled={submitting}
              >
                Cancel
              </Button>
              
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={submitting}
              >
                {submitting ? <CircularProgress size={24} /> : "Update Post"}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default EditBlog;