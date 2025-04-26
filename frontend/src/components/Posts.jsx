import React, { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  CardActions, 
  Button, 
  CardHeader, 
  Avatar, 
  CircularProgress,
  Box
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/blog", {
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
        Blog Posts
      </Typography>
      
      {posts.length === 0 ? (
        <Typography variant="body1">No posts available.</Typography>
      ) : (
        <Grid container spacing={3}>
          {posts.map((post) => (
            <Grid item xs={12} md={6} lg={4} key={post._id}>
              <Card elevation={3}>
                <CardHeader
                  avatar={<Avatar>{post.author.username[0].toUpperCase()}</Avatar>}
                  title={post.title}
                  subheader={`By ${post.author.username} on ${new Date(post.createdAt).toLocaleDateString()}`}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {post.content.substring(0, 150)}
                    {post.content.length > 150 ? "..." : ""}
                  </Typography>
                </CardContent>
                {(user.role === "admin" || user._id === post.author._id) && (
                  <CardActions>
                    <Button size="small" color="primary" onClick={() => handleEditPost(post._id)}>
                      Edit
                    </Button>
                    <Button size="small" color="error" onClick={() => handleDeletePost(post._id)}>
                      Delete
                    </Button>
                  </CardActions>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default Posts;