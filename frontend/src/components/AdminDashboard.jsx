import React, { useState, useEffect } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Box
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/posts", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      
      const data = await response.json();
      setPosts(data);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const handleEditPost = (postId) => {
    navigate(`/edit/${postId}`);
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:5000/api/posts/${postId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error("Failed to delete post");
        }
        
        toast.success("Post deleted successfully");
        // Update posts list
        setPosts(posts.filter(post => post._id !== postId));
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        sx={{ mb: 3 }}
        onClick={() => navigate("/create")}
      >
        Create New Post
      </Button>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Title</strong></TableCell>
              <TableCell><strong>Author</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell align="center"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">No posts available</TableCell>
              </TableRow>
            ) : (
              posts.map((post) => (
                <TableRow key={post._id}>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>{post.author.username}</TableCell>
                  <TableCell>{new Date(post.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell align="center">
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => handleEditPost(post._id)}
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => handleDeletePost(post._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AdminDashboard;