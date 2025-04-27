import React from 'react';
import { Container, Typography, Button, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
        <Paper sx={{ p: 6, textAlign: 'center' }}>
          <Typography variant="h1" sx={{ fontSize: '6rem', fontWeight: 'bold', color: 'primary.main' }}>
            404
          </Typography>
          
          <Typography variant="h4" gutterBottom>
            Page Not Found
          </Typography>
          
          <Typography variant="body1" color="text.secondary" paragraph>
            The page you are looking for doesn't exist or has been moved.
          </Typography>
          
          <Box sx={{ mt: 4 }}>
            <Button 
              variant="contained" 
              size="large"
              onClick={() => navigate('/')}
            >
              Back to Home
            </Button>
          </Box>
        </Paper>
      </Container>
    </MainLayout>
  );
};

export default NotFound;