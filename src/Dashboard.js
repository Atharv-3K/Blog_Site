import React, { useEffect, useState } from 'react';
import { getBlogs } from './blogService';
import { CssBaseline, Container, Typography, AppBar, Toolbar, Button, Grid, Card, CardContent, CardActions } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getBlogs();
        setBlogs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

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
          <Button color="inherit" component={Link} to="/login">Log Out</Button>
          <Button color="inherit" component={Link} to="/create">Create Blog</Button>
          <Button color="inherit" component={Link} to="/Your_blogs">Your Blogs</Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Typography variant="h2" align="center" gutterBottom>
          Blog Dashboard
        </Typography>
        <Grid container spacing={4}>
          {blogs.map((blog) => (
            <Grid item key={blog._id} xs={12} sm={6} md={6}>
              <Card onClick={() => navigate(`/blog/${blog._id}`)} style={{ cursor: 'pointer' }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {blog.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    dangerouslySetInnerHTML={{ __html: blog.content.substring(0, 100) + '...' }}
                  />
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary" onClick={() => navigate(`/blog/${blog._id}`)}>
                    Read More
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

export default Dashboard;
