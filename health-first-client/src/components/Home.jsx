import { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress, Alert } from '@mui/material';
import { apiService } from '../services/api';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await apiService.getPosts(5);
        setPosts(data);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
        setError('Failed to load posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to Health First
      </Typography>
      <Typography variant="body1" paragraph>
        This is a React application built with Material-UI, React Router DOM, and Axios.
      </Typography>
      
      <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2 }}>
        Sample API Data (from JSONPlaceholder):
      </Typography>
      
      {loading && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      {!loading && !error && (
        <Box>
          {posts.map((post) => (
            <Box key={post.id} sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
              <Typography variant="h6" component="h3">
                {post.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {post.body}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default Home; 