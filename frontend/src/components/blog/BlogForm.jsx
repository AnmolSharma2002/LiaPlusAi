import React, { useState, useContext, useEffect } from 'react';
import { 
  TextField, 
  Button, 
  Paper, 
  Typography, 
  Box, 
  CircularProgress,
  Chip,
  InputAdornment,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { AlertContext } from '../../contexts/AlertContext';
import { createBlog, updateBlog, getBlogById } from '../../services/blogService';
import { useNavigate, useParams } from 'react-router-dom';

const BlogForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: '',
    tags: []
  });
  const [currentTag, setCurrentTag] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { setAlert } = useContext(AlertContext);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      fetchBlog();
    }
  }, [id]);

  const fetchBlog = async () => {
    setLoading(true);
    try {
      const blog = await getBlogById(id);
      setFormData({
        title: blog.title,
        content: blog.content,
        image: blog.image || '',
        tags: blog.tags || []
      });
    } catch (error) {
      setAlert({
        open: true,
        message: 'Failed to fetch blog data',
        severity: 'error'
      });
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleTagInputChange = (e) => {
    setCurrentTag(e.target.value);
  };

  const handleAddTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prevState => ({
        ...prevState,
        tags: [...prevState.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const handleTagDelete = (tagToDelete) => {
    setFormData(prevState => ({
      ...prevState,
      tags: prevState.tags.filter(tag => tag !== tagToDelete)
    }));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isEditing) {
        await updateBlog(id, formData);
        setAlert({
          open: true,
          message: 'Blog updated successfully!',
          severity: 'success'
        });
      } else {
        await createBlog(formData);
        setAlert({
          open: true,
          message: 'Blog created successfully!',
          severity: 'success'
        });
      }
      navigate('/my-blogs');
    } catch (error) {
      setAlert({
        open: true,
        message: error.response?.data?.message || `Failed to ${isEditing ? 'update' : 'create'} blog`,
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: '800px', mx: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        {isEditing ? 'Edit Blog' : 'Create New Blog'}
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="title"
          label="Blog Title"
          name="title"
          autoFocus
          value={formData.title}
          onChange={handleChange}
        />
        
        <TextField
          margin="normal"
          fullWidth
          id="image"
          label="Image URL (optional)"
          name="image"
          value={formData.image}
          onChange={handleChange}
        />
        
        <TextField
          margin="normal"
          fullWidth
          id="tag"
          label="Add Tags"
          value={currentTag}
          onChange={handleTagInputChange}
          onKeyDown={handleKeyDown}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleAddTag} edge="end">
                  <AddIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        
        {formData.tags.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
            {formData.tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                onDelete={() => handleTagDelete(tag)}
                size="small"
              />
            ))}
          </Box>
        )}
        
        <TextField
          margin="normal"
          required
          fullWidth
          name="content"
          label="Blog Content"
          multiline
          rows={10}
          id="content"
          value={formData.content}
          onChange={handleChange}
        />
        
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : (isEditing ? 'Update Blog' : 'Create Blog')}
        </Button>
      </Box>
    </Paper>
  );
};

export default BlogForm;