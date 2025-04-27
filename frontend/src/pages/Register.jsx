import React from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import RegisterForm from '../components/auth/RegisterForm';
import MainLayout from '../components/layout/MainLayout';

const Register = () => {
  return (
    <MainLayout>
      <Container maxWidth="sm">
        <Box sx={{ mt: 4, mb: 6 }}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center', mb: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Join Our Community
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Create an account to start sharing your stories and ideas
            </Typography>
          </Paper>
          
          <RegisterForm />
        </Box>
      </Container>
    </MainLayout>
  );
};

export default Register;