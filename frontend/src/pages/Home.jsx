import React, { useState, useEffect, useContext } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  Paper, 
  Container, 
  Card, 
  CardContent,
  CardMedia,
  Avatar,
  Divider,
  CircularProgress
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { getAllBlogs } from '../services/blogService';
import { AlertContext } from '../contexts/AlertContext';
import BlogCard from '../components/blog/BlogCard';
import MainLayout from '../components/layout/MainLayout';

const Home = () => {
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setAlert } = useContext(AlertContext);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const blogs = await getAllBlogs();
      
      // Sort blogs by date (newest first)
      const sortedBlogs = [...blogs].sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      
      // Get featured blogs (assuming blogs with most content are featured)
      const featured = sortedBlogs
        .sort((a, b) => b.content.length - a.content.length)
        .slice(0, 1);
      
      // Get recent blogs
      const recent = sortedBlogs.slice(0, 6).filter(blog => 
        !featured.some(fb => fb._id === blog._id)
      );
      
      setFeaturedBlogs(featured);
      setRecentBlogs(recent);
    } catch (error) {
      setAlert({
        open: true,
        message: 'Failed to fetch blogs',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <Box>
        {/* Hero Section */}
        <Paper
          sx={{
            position: 'relative',
            backgroundColor: 'grey.800',
            color: '#fff',
            mb: 4,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: 'url(https://source.unsplash.com/random?blog)',
            borderRadius: 2,
            overflow: 'hidden'
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              backgroundColor: 'rgba(0,0,0,.5)',
            }}
          />
          <Grid container>
            <Grid item md={6}>
              <Box
                sx={{
                  position: 'relative',
                  p: { xs: 3, md: 6 },
                  pr: { md: 0 },
                  minHeight: 300,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}
              >
                <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                  Welcome to Our Blog Platform
                </Typography>
                <Typography variant="h5" color="inherit" paragraph>
                  Share your stories, ideas, and expertise with the world
                </Typography>
                <Button 
                  variant="contained" 
                  component={RouterLink} 
                  to="/create-blog"
                  sx={{ alignSelf: 'flex-start', mt: 2 }}
                >
                  Start Writing
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {/* Featured Blog Section */}
            {featuredBlogs.length > 0 && (
              <Box sx={{ mb: 6 }}>
                <Typography variant="h4" component="h2" gutterBottom>
                  Featured Post
                </Typography>
                <Divider sx={{ mb: 3 }} />
                
                {featuredBlogs.map(blog => (
                  <Card key={blog._id} sx={{ 
                    display: { xs: 'block', md: 'flex' }, 
                    mb: 2,
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 3
                    }
                  }}>
                    {blog.image && (
                      <CardMedia
                        component="img"
                        sx={{ width: { xs: '100%', md: 300 }, height: { xs: 200, md: 'auto' } }}
                        image={blog.image}
                        alt={blog.title}
                      />
                    )}
                    <CardContent sx={{ flex: '1 0 auto', p: 3 }}>
                      <Typography component="h3" variant="h5">
                        {blog.title}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, mt: 1 }}>
                        <Avatar 
                          sx={{ width: 32, height: 32, mr: 1 }}
                          alt={blog.author?.name}
                        />
                        <Typography variant="subtitle1" color="text.secondary">
                          {blog.author?.name} • {new Date(blog.createdAt).toLocaleDateString()}
                        </Typography>
                      </Box>
                      <Typography variant="body1" paragraph>
                        {blog.content.substring(0, 250)}...
                      </Typography>
                      <Button 
                        variant="outlined" 
                        component={RouterLink} 
                        to={`/blog/${blog._id}`}
                      >
                        Continue Reading
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}

            {/* Recent Blogs Section */}
            <Box sx={{ mb: 6 }}>
              <Typography variant="h4" component="h2" gutterBottom>
                Recent Posts
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              <Grid container spacing={3}>
                {recentBlogs.map(blog => (
                  <Grid item xs={12} sm={6} md={4} key={blog._id}>
                    <BlogCard blog={blog} />
                  </Grid>
                ))}
              </Grid>
              
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Button 
                  variant="outlined" 
                  component={RouterLink} 
                  to="/blogs"
                  size="large"
                >
                  View All Blogs
                </Button>
              </Box>
            </Box>
          </>
        )}
        
        {/* Call to Action Section */}
        <Paper sx={{ 
          p: { xs: 3, md: 6 }, 
          textAlign: 'center', 
          backgroundColor: 'primary.light',
          color: 'white',
          borderRadius: 2
        }}>
          <Typography variant="h5" gutterBottom>
            Ready to share your story?
          </Typography>
          <Typography variant="body1" paragraph>
            Join our community of writers and readers. Create an account to start publishing your own content.
          </Typography>
          <Button 
            variant="contained" 
            component={RouterLink} 
            to="/register" 
            size="large"
            sx={{ backgroundColor: 'white', color: 'primary.main' }}
          >
            Get Started
          </Button>
        </Paper>
      </Box>
    </MainLayout>
  );
};

export default Home;