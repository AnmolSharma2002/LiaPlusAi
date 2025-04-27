import React from 'react';
import { Box, Container, CssBaseline } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { useLocation } from 'react-router-dom';

const MainLayout = ({ children, showSidebar = false }) => {
  const location = useLocation();
  
  // Check if current page is admin page
  const isAdminPage = location.pathname.startsWith('/admin');
  
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: '100vh'
    }}>
      <CssBaseline />
      <Header />
      
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          py: 4,
          display: 'flex'
        }}
      >
        {isAdminPage && (
          <Sidebar />
        )}
        
        <Container 
          maxWidth={isAdminPage ? false : "lg"}
          sx={{ 
            flexGrow: 1,
            ml: isAdminPage ? '240px' : 0
          }}
        >
          {children}
        </Container>
      </Box>
      
      <Footer />
    </Box>
  );
};

export default MainLayout;