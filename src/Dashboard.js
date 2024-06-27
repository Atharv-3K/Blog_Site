import React, { useEffect, useState } from 'react';
import { getBlogs } from './blogService';
import Blog from './Blog';
import { CssBaseline, Container, Typography, AppBar, Toolbar, Button} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          {/* <Typography variant="h6" style={{ flexGrow: 1 }}>Blog Dashboard</Typography> */}
          {/* <Button color="inherit" component={Link} to="/">Home</Button> */}
          <Button color="inherit" component={Link} to="/login">Log Out</Button>
          <Button color="inherit" component={Link} to="/create">Create Blog</Button>
          <Button color="inherit" component={Link} to="/Your_blogs">Your Blogs</Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Typography variant="h2" align="center" gutterBottom>
          Blog Dashboard
        </Typography>
        {/* <Dashboard /> */}
      </Container>
    <Container style={{ marginTop: '50px' }}>
      {blogs.map(blog => (
        <Blog key={blog.id} title={blog.title} content={blog.content} author={blog.username} />
      ))}
    </Container>
    </>
  );
};

export default Dashboard;