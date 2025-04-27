import React from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import LoginForm from '../components/auth/LoginForm';
import MainLayout from '../components/layout/MainLayout';

const Login = () => {
  return (
    <MainLayout>
      <Container maxWidth="sm">
        <Box sx={{ mt: 4, mb: 6 }}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center', mb: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Welcome Back
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Log in to your account to continue sharing your thoughts with the world
            </Typography>
          </Paper>
          
          <LoginForm />
        </Box>
      </Container>
    </MainLayout>
  );
};

export default Login;