import React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActions, Button, Box, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const BlogCard = ({ blog, onDelete, showActions = true }) => {
  const navigate = useNavigate();

  // Truncate content for preview
  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <Card sx={{ 
      maxWidth: '100%', 
      mb: 3, 
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      transition: 'transform 0.3s ease-in-out',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: 3
      }
    }}>
      {blog.image && (
        <CardMedia
          component="img"
          height="200"
          image={blog.image}
          alt={blog.title}
          sx={{ objectFit: 'cover' }}
        />
      )}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
          {blog.title}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, color: 'text.secondary', fontSize: '0.875rem' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
            <PersonIcon fontSize="small" sx={{ mr: 0.5 }} />
            <Typography variant="body2">
              {blog.author?.name || 'Unknown Author'}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CalendarTodayIcon fontSize="small" sx={{ mr: 0.5 }} />
            <Typography variant="body2">
              {formatDate(blog.createdAt)}
            </Typography>
          </Box>
        </Box>
        
        {blog.tags && blog.tags.length > 0 && (
          <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {blog.tags.map((tag, index) => (
              <Chip key={index} label={tag} size="small" />
            ))}
          </Box>
        )}
        
        <Typography variant="body2" color="text.secondary">
          {truncateContent(blog.content)}
        </Typography>
      </CardContent>
      
      {showActions && (
        <CardActions>
          <Button 
            size="small" 
            onClick={() => navigate(`/blog/${blog._id}`)}
          >
            Read More
          </Button>
          {onDelete && (
            <Button 
              size="small" 
              color="error" 
              onClick={() => onDelete(blog._id)}
            >
              Delete
            </Button>
          )}
        </CardActions>
      )}
    </Card>
  );
};

export default BlogCard;