import React, { useState, useEffect } from "react";
import { 
  Typography, 
  Paper, 
  Box, 
  Button, 
  Card, 
  CardContent, 
  CardHeader, 
  Avatar, 
  Grid, 
  CircularProgress 
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isLoggedIn = !!token;

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      // No token required for public endpoint
      const response = await fetch("http://localhost:5000/api/posts/public");
      
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

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Paper elevation={3} sx={{ p: 4, textAlign: "center", mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to the Blog App
        </Typography>
        
        <Typography variant="body1" paragraph>
          {isLoggedIn 
            ? `Hello, ${user.username}! Browse through our collection of blog posts below.`
            : "Welcome! Browse through our collection of blog posts below."}
        </Typography>
        
        <Box sx={{ mt: 2, display: "flex", justifyContent: "center", gap: 2 }}>
          {!isLoggedIn ? (
            <>
              <Button 
                variant="contained" 
                color="primary"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button 
                variant="outlined" 
                color="primary"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Button>
            </>
          ) : (
            <>
              {user.role === "admin" && (
                <Button 
                  variant="contained" 
                  color="secondary"
                  onClick={() => navigate("/admin")}
                >
                  Dashboard
                </Button>
              )}
              <Button 
                variant="contained" 
                color="primary"
                onClick={() => navigate("/create")}
              >
                Create New Post
              </Button>
            </>
          )}
        </Box>
      </Paper>

      <Typography variant="h5" gutterBottom>
        Latest Blog Posts
      </Typography>
      
      {posts.length === 0 ? (
        <Typography variant="body1">No posts available.</Typography>
      ) : (
        <Grid container spacing={3}>
          {posts.map((post) => (
            <Grid item xs={12} md={6} lg={4} key={post._id}>
              <Card elevation={3}>
                <CardHeader
                  avatar={<Avatar>{post.author.username ? post.author.username[0].toUpperCase() : "U"}</Avatar>}
                  title={post.title}
                  subheader={`By ${post.author.username || "Unknown"} on ${new Date(post.createdAt).toLocaleDateString()}`}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {post.content.substring(0, 150)}
                    {post.content.length > 150 ? "..." : ""}
                  </Typography>
                  {isLoggedIn && (
                    <Box sx={{ mt: 2 }}>
                      <Button size="small" color="primary" onClick={() => navigate(`/posts`)}>
                        Read More
                      </Button>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default Home;