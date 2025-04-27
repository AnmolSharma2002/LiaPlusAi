import React, { useContext } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Avatar,
  useTheme
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ArticleIcon from '@mui/icons-material/Article';
import HomeIcon from '@mui/icons-material/Home';
import { AuthContext } from '../../contexts/AuthContext';

const drawerWidth = 240;

const Sidebar = () => {
  const theme = useTheme();
  const location = useLocation();
  const { user } = useContext(AuthContext);
  
  const adminMenuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
    { text: 'Manage Users', icon: <PeopleIcon />, path: '/admin/users' },
    { text: 'Manage Blogs', icon: <ArticleIcon />, path: '/admin/blogs' }
  ];
  
  const generalMenuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Blogs', icon: <ArticleIcon />, path: '/blogs' }
  ];

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar 
          sx={{ 
            width: 64, 
            height: 64, 
            mb: 1, 
            bgcolor: theme.palette.primary.main 
          }}
        >
          {user && getInitials(user.name)}
        </Avatar>
        <Typography variant="h6" align="center">
          {user?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          Administrator
        </Typography>
      </Box>
      
      <Divider />
      
      <List>
        {adminMenuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={item.path}
              selected={location.pathname === item.path}
            >
              <ListItemIcon sx={{ color: location.pathname === item.path ? 'primary.main' : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
      <Divider />
      
      <List>
        {generalMenuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={item.path}
              selected={location.pathname === item.path}
            >
              <ListItemIcon sx={{ color: location.pathname === item.path ? 'primary.main' : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;