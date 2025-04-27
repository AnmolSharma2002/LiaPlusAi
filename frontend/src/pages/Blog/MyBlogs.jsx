import React, { useState, useEffect, useContext } from 'react';
import { Container, Typography, Box, Button, CircularProgress } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { blogService } from '../../services/blogService';
import { AuthContext } from '../../contexts/AuthContext';
import { AlertContext } from '../../contexts/AlertContext';
import MainLayout from '../../components/layout/MainLayout';
import BlogList from '../../components/blog/BlogList';

const MyBlogs = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { setAlert } = useContext(AlertContext);
  
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const data = await blogService.getMyBlogs();
        setBlogs(data);
      } catch (error) {
        setAlert('Failed to load your blog posts', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchMyBlogs();
  }, [setAlert]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await blogService.deleteBlog(id);
        setBlogs(blogs.filter(blog => blog.id !== id));
        setAlert('Blog post deleted successfully', 'success');
      } catch (error) {
        setAlert('Failed to delete blog post', 'error');
      }
    }
  };

  if (!user) {
    return (
      <MainLayout>
        <Container sx={{ mt: 8 }}>
          <Typography variant="h4">Please log in to view your blogs</Typography>
        </Container>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4">My Blog Posts</Typography>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={() => navigate('/blogs/create')}
          >
            Create New Post
          </Button>
        </Box>
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : blogs.length > 0 ? (
          <BlogList 
            blogs={blogs} 
            showActions={true} 
            onDelete={handleDelete} 
          />
        ) : (
          <Typography variant="h6" sx={{ mt: 4, textAlign: 'center' }}>
            You haven't created any blog posts yet.
          </Typography>
        )}
      </Container>
    </MainLayout>
  );
};

export default MyBlogs;