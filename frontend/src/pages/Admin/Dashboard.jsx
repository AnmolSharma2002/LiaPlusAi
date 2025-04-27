import React, { useState, useEffect, useContext } from 'react';
import { 
  Container, Typography, Box, Grid, Paper, 
  CircularProgress, Card, CardContent
} from '@mui/material';
import { 
  PeopleOutline as UsersIcon,
  ArticleOutlined as BlogsIcon,
  PersonOutline as NewUsersIcon,
  MenuBook as NewBlogsIcon
} from '@mui/icons-material';
import { AlertContext } from '../../contexts/AlertContext';
import { userService } from '../../services/userService';
import { blogService } from '../../services/blogService';
import MainLayout from '../../components/layout/MainLayout';

const Dashboard = () => {
  const { setAlert } = useContext(AlertContext);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // In a real app, you'd have a dedicated endpoint for admin stats
        // Here we're simulating it by making multiple requests
        const [users, blogs] = await Promise.all([
          userService.getAllUsers(),
          blogService.getAllBlogs()
        ]);
        
        // Calculate some basic stats
        const today = new Date();
        const lastMonth = new Date(today.setMonth(today.getMonth() - 1));
        
        const newUsers = users.filter(user => 
          new Date(user.createdAt) > lastMonth
        ).length;
        
        const newBlogs = blogs.filter(blog => 
          new Date(blog.createdAt) > lastMonth
        ).length;
        
        setStats({
          totalUsers: users.length,
          totalBlogs: blogs.length,
          newUsers,
          newBlogs
        });
      } catch (error) {
        setAlert('Failed to load dashboard data', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [setAlert]);

  if (loading) {
    return (
      <MainLayout>
        <Container sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
          <CircularProgress />
        </Container>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>Admin Dashboard</Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard 
              title="Total Users"
              value={stats.totalUsers}
              icon={<UsersIcon sx={{ fontSize: 40 }} />}
              color="#3f51b5"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard 
              title="Total Blogs"
              value={stats.totalBlogs}
              icon={<BlogsIcon sx={{ fontSize: 40 }} />}
              color="#f50057"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard 
              title="New Users (30d)"
              value={stats.newUsers}
              icon={<NewUsersIcon sx={{ fontSize: 40 }} />}
              color="#00bcd4"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard 
              title="New Blogs (30d)"
              value={stats.newBlogs}
              icon={<NewBlogsIcon sx={{ fontSize: 40 }} />}
              color="#4caf50"
            />
          </Grid>
        </Grid>
        
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Activity tracking will be implemented in the next phase.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                System Status
              </Typography>
              <Box sx={{ mt: 2 }}>
                <StatusItem label="API Server" status="Operational" />
                <StatusItem label="Database" status="Operational" />
                <StatusItem label="Storage" status="Operational" />
                <StatusItem label="Authentication" status="Operational" />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </MainLayout>
  );
};

// Helper components
const StatCard = ({ title, value, icon, color }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" component="div">
            {value}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
        </Box>
        <Box sx={{ color }}>
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const StatusItem = ({ label, status }) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
    <Typography variant="body2">{label}</Typography>
    <Typography 
      variant="body2" 
      sx={{ 
        color: status === 'Operational' ? 'success.main' : 'error.main',
        fontWeight: 'medium'
      }}
    >
      {status}
    </Typography>
  </Box>
);

export default Dashboard;