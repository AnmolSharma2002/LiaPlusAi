import React, { useState, useEffect, useContext } from 'react';
import { 
  Container, Typography, Box, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, TablePagination, CircularProgress,
  Button, IconButton, Chip, TextField, InputAdornment
} from '@mui/material';
import { 
  Delete as DeleteIcon, 
  Edit as EditIcon,
  Visibility as ViewIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { blogService } from '../../services/blogService';
import { AlertContext } from '../../contexts/AlertContext';
import MainLayout from '../../components/layout/MainLayout';
import { formatDistanceToNow } from 'date-fns';

const ManageBlogs = () => {
  const navigate = useNavigate();
  const { setAlert } = useContext(AlertContext);
  
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await blogService.getAllBlogs();
        setBlogs(data);
      } catch (error) {
        setAlert('Failed to load blog posts', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [setAlert]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await blogService.deleteBlog(id);
        setBlogs(blogs.filter(blog => blog.id !== id));
        setAlert('Blog post deleted successfully', 'success');
      } catch (error) {
        setAlert('Failed to delete blog post', 'error');
      }
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

  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.author.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedBlogs = filteredBlogs
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
        <Typography variant="h4" sx={{ mb: 4 }}>Manage Blog Posts</Typography>
        
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search blogs by title or author..."
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
        
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Categories</TableCell>
                <TableCell>Published</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedBlogs.length > 0 ? (
                displayedBlogs.map((blog) => (
                  <TableRow key={blog.id}>
                    <TableCell>{blog.title}</TableCell>
                    <TableCell>{blog.author.name}</TableCell>
                    <TableCell>
                      {blog.categories.map((category, index) => (
                        <Chip 
                          key={index} 
                          label={category} 
                          size="small" 
                          sx={{ mr: 0.5, mb: 0.5 }} 
                        />
                      ))}
                    </TableCell>
                    <TableCell>
                      {formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton 
                        color="primary" 
                        onClick={() => navigate(`/blogs/${blog.id}`)}
                      >
                        <ViewIcon />
                      </IconButton>
                      <IconButton 
                        color="secondary" 
                        onClick={() => navigate(`/blogs/edit/${blog.id}`)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        color="error" 
                        onClick={() => handleDelete(blog.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No blog posts found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={filteredBlogs.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </TableContainer>
      </Container>
    </MainLayout>
  );
};

export default ManageBlogs;