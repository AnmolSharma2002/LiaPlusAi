import React, { useState, useContext } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Box, 
  Menu, 
  MenuItem, 
  Container,
  useMediaQuery,
  useTheme,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { AlertContext } from '../../contexts/AlertContext';
import { logout } from '../../services/authService';

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const { setAlert } = useContext(AlertContext);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setAlert({
        open: true,
        message: 'Logged out successfully',
        severity: 'success'
      });
      navigate('/login');
    } catch (error) {
      setAlert({
        open: true,
        message: 'Logout failed',
        severity: 'error'
      });
    }
    handleMenuClose();
    setDrawerOpen(false);
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const navItems = [
    { label: 'Home', path: '/', icon: <HomeIcon /> },
    { label: 'Blogs', path: '/blogs', icon: <ArticleIcon /> },
  ];

  const authItems = user ? [
    { label: 'New Blog', path: '/create-blog', icon: <AddIcon /> },
    { label: 'My Blogs', path: '/my-blogs', icon: <ArticleIcon /> },
    ...(user.role === 'admin' ? [{ label: 'Admin Dashboard', path: '/admin', icon: <DashboardIcon /> }] : []),
  ] : [
    { label: 'Login', path: '/login', icon: <LoginIcon /> },
    { label: 'Register', path: '/register', icon: <PersonIcon /> }
  ];

  const drawerContent = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {user && (
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ mr: 2, bgcolor: theme.palette.primary.main }}>
            {getInitials(user.name)}
          </Avatar>
          <Typography variant="subtitle1">{user.name}</Typography>
        </Box>
      )}
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem 
            button 
            key={item.label} 
            component={RouterLink} 
            to={item.path}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {authItems.map((item) => (
          <ListItem 
            button 
            key={item.label} 
            component={RouterLink} 
            to={item.path}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
        {user && (
          <ListItem button onClick={handleLogout}>
            <ListItemIcon><LogoutIcon /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: 'flex',
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            BLOG APP
          </Typography>

          {isMobile ? (
            <>
              <Box sx={{ flexGrow: 1 }} />
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
              >
                {drawerContent}
              </Drawer>
            </>
          ) : (
            <>
              <Box sx={{ flexGrow: 1, display: 'flex' }}>
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    component={RouterLink}
                    to={item.path}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {!user ? (
                  <>
                    <Button
                      component={RouterLink}
                      to="/login"
                      color="inherit"
                      sx={{ mr: 1 }}
                    >
                      Login
                    </Button>
                    <Button
                      component={RouterLink}
                      to="/register"
                      variant="outlined"
                      color="inherit"
                    >
                      Register
                    </Button>
                  </>
                ) : (
                  <>
                    {authItems.map((item) => (
                      <Button
                        key={item.label}
                        component={RouterLink}
                        to={item.path}
                        color="inherit"
                        sx={{ mr: 1 }}
                      >
                        {item.label}
                      </Button>
                    ))}
                    <Box sx={{ ml: 1 }}>
                      <IconButton onClick={handleMenuOpen} color="inherit">
                        <Avatar sx={{ width: 32, height: 32, bgcolor: theme.palette.secondary.main }}>
                          {getInitials(user.name)}
                        </Avatar>
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                      >
                        <MenuItem component={RouterLink} to="/profile" onClick={handleMenuClose}>
                          Profile
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>
                          Logout
                        </MenuItem>
                      </Menu>
                    </Box>
                  </>
                )}
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;