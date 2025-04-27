import React from 'react';
import { Box, Container, Typography, Link, Grid, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Blog App
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Share your thoughts, ideas, and experiences with the world.
              Create engaging content and connect with readers.
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Link component={RouterLink} to="/" color="inherit" display="block" sx={{ mb: 1 }}>
              Home
            </Link>
            <Link component={RouterLink} to="/blogs" color="inherit" display="block" sx={{ mb: 1 }}>
              Blogs
            </Link>
            <Link component={RouterLink} to="/create-blog" color="inherit" display="block" sx={{ mb: 1 }}>
              Write a Blog
            </Link>
            <Link component={RouterLink} to="/my-blogs" color="inherit" display="block">
              My Blogs
            </Link>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Connect With Us
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <Link href="#" color="inherit">
                <FacebookIcon />
              </Link>
              <Link href="#" color="inherit">
                <TwitterIcon />
              </Link>
              <Link href="#" color="inherit">
                <InstagramIcon />
              </Link>
              <Link href="#" color="inherit">
                <LinkedInIcon />
              </Link>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Contact us: support@blogapp.com
            </Typography>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="body2" color="text.secondary" align="center">
          © {currentYear} Blog App. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;