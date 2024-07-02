import React, { useEffect, useState } from 'react';
// import { getYourBlogs } from './blogService';
import Blog from './Blog';
import { CssBaseline, Container, Typography, AppBar, Toolbar, Button, Grid, Card, CardContent, CardActions } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/Your_blogs',{withCredentials: true});
        console.log(response.data);
        if(response.data)
          {setBlogs(response.data);}
        setLoading(false);
        // return response.data;
    } catch (error) {
        console.error('Error fetching blogs:', error);
        throw error;
    
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (event, id) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await axios.post('http://localhost:5000/delete', { id }, { withCredentials: true });

      // Update the state after successful deletion
      setBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== id));

      setLoading(false); // Uncomment if you want to stop the loading state after deletion
      // You can add a success message or do other UI updates as needed

    } catch (err) {
      setError('Failed to delete blog');
      setLoading(false); // Handle error and stop loading state
    }
  };

  if (loading) {
    return (
      <Container style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container style={{ marginTop: '50px' }}>
        <Typography variant="h6" color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>Blog Dashboard</Typography>
          <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
          <Button color="inherit" component={Link} to="/create">Create Blog</Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Typography variant="h2" align="center" gutterBottom>
          Your Blogs
        </Typography>
        <Grid container spacing={4}>
          {blogs.map((blog) => (
            <Grid item key={blog._id} xs={12} sm={6} md={6}>
              <Card style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                <CardContent onClick={() => navigate(`/blog/${blog._id}`)}>
                  <Typography variant="h5" component="div">
                    {blog.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    dangerouslySetInnerHTML={{ __html: blog.content.substring(0, 100) + '...' }}
                  />
                </CardContent>
                <CardActions style={{ justifyContent: 'space-between' }}>
                  <Button size="small" color="primary" onClick={() => navigate(`/blog/${blog._id}`)}>
                    Read More
                  </Button>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: '#2196f3', // Blue color
                      color: 'white',
                      borderRadius: '20px', // Curved edges
                      padding: '4px 12px', // Smaller size
                      fontSize: '0.75rem', // Smaller font size
                    }}
                    onClick={(event) => handleDelete(event, blog._id)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
  
};

export default Blogs;
