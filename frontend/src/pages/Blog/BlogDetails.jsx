import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, Typography, Box, Paper, Avatar, Button, 
  Divider, CircularProgress, Chip
} from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import { blogService } from '../../services/blogService';
import { AuthContext } from '../../contexts/AuthContext';
import { AlertContext } from '../../contexts/AlertContext';
import MainLayout from '../../components/layout/MainLayout';

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { setAlert } = useContext(AlertContext);
  
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await blogService.getBlogById(id);
        setBlog(data);
      } catch (error) {
        setAlert('Failed to load blog post', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, setAlert]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await blogService.deleteBlog(id);
        setAlert('Blog post deleted successfully', 'success');
        navigate('/my-blogs');
      } catch (error) {
        setAlert('Failed to delete blog post', 'error');
      }
    }
  };

  const isAuthor = user && blog && user.id === blog.author.id;
  const isAdmin = user && user.role === 'admin';

  if (loading) {
    return (
      <MainLayout>
        <Container sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
          <CircularProgress />
        </Container>
      </MainLayout>
    );
  }

  if (!blog) {
    return (
      <MainLayout>
        <Container sx={{ mt: 8 }}>
          <Typography variant="h4">Blog post not found</Typography>
        </Container>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h3" gutterBottom>
            {blog.title}
          </Typography>
          
          <Box sx={{ display: 'flex', mb: 2 }}>
            {blog.categories.map((category, index) => (
              <Chip 
                key={index} 
                label={category} 
                color="primary" 
                variant="outlined" 
                size="small" 
                sx={{ mr: 1 }}
              />
            ))}
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Avatar src={blog.author.avatar} alt={blog.author.name} />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle1">{blog.author.name}</Typography>
              <Typography variant="caption" color="text.secondary">
                Published {formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}
              </Typography>
            </Box>
          </Box>
          
          <Divider sx={{ mb: 4 }} />
          
          <Typography variant="body1" paragraph>
            {blog.content}
          </Typography>
          
          {(isAuthor || isAdmin) && (
            <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
              {isAuthor && (
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={() => navigate(`/blogs/edit/${id}`)}
                >
                  Edit
                </Button>
              )}
              <Button 
                variant="outlined" 
                color="error"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </Box>
          )}
        </Paper>
      </Container>
    </MainLayout>
  );
};

export default BlogDetails;