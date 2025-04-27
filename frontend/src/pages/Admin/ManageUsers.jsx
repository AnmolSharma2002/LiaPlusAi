import React, { useState, useEffect, useContext } from 'react';
import { 
  Container, Typography, Box, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, TablePagination, CircularProgress,
  Button, IconButton, Chip, TextField, InputAdornment, Dialog,
  DialogActions, DialogContent, DialogContentText, DialogTitle,
  FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { 
  Delete as DeleteIcon, 
  Edit as EditIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { userService } from '../../services/userService';
import { AlertContext } from '../../contexts/AlertContext';
import MainLayout from '../../components/layout/MainLayout';
import UserTable from '../../components/user/UserTable';

const ManageUsers = () => {
  const { setAlert } = useContext(AlertContext);
  
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [roleToUpdate, setRoleToUpdate] = useState('');
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await userService.getAllUsers();
        setUsers(data);
      } catch (error) {
        setAlert('Failed to load users', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [setAlert]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userService.deleteUser(id);
        setUsers(users.filter(user => user.id !== id));
        setAlert('User deleted successfully', 'success');
      } catch (error) {
        setAlert('Failed to delete user', 'error');
      }
    }
  };

  const handleEditRole = (user) => {
    setSelectedUser(user);
    setRoleToUpdate(user.role);
    setDialogOpen(true);
  };

  const handleRoleChange = async () => {
    try {
      await userService.updateUserRole(selectedUser.id, roleToUpdate);
      
      // Update local state
      setUsers(users.map(user => 
        user.id === selectedUser.id ? { ...user, role: roleToUpdate } : user
      ));
      
      setAlert('User role updated successfully', 'success');
      setDialogOpen(false);
    } catch (error) {
      setAlert('Failed to update user role', 'error');
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedUsers = filteredUsers
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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
        <Typography variant="h4" sx={{ mb: 4 }}>Manage Users</Typography>
        
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        
        <UserTable 
          users={displayedUsers} 
          onDelete={handleDelete}
          onEditRole={handleEditRole}
        />
        
        <TablePagination
          component="div"
          count={filteredUsers.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
        
        {/* Role Update Dialog */}
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogTitle>Update User Role</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Update the role for user: {selectedUser?.name}
            </DialogContentText>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Role</InputLabel>
              <Select
                value={roleToUpdate}
                label="Role"
                onChange={(e) => setRoleToUpdate(e.target.value)}
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleRoleChange} color="primary">Update</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </MainLayout>
  );
};

export default ManageUsers;