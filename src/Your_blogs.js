import React, { useEffect, useState } from 'react';
import { getYourBlogs } from './blogService';
import Blog from './Blog';
import { CssBaseline, Container, Typography, AppBar, Toolbar, Button} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/Your_blogs',{withCredentials: true});
        console.log(response.data);
        setBlogs(response.data);
        // setLoading(false);
        // return response.data;
    } catch (error) {
        console.error('Error fetching blogs:', error);
        throw error;
    
      } finally {
        // setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (event, id) => {
    event.preventDefault();
    setError(null);
    // setLoading(true);

    try {
      await axios.post('http://localhost:5000/delete', { id }, { withCredentials: true });

      // Update the state after successful deletion
      setBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== id));

      // setLoading(false); // Uncomment if you want to stop the loading state after deletion
      // You can add a success message or do other UI updates as needed

    } catch (err) {
      setError('Failed to delete blog');
      // setLoading(false); // Handle error and stop loading state
    }
  };

  // if (loading) {
  //   return (
  //     <Container style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
  //       <CircularProgress />
  //     </Container>
  //   );
  // }

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
        <Typography variant="h3" align="center" gutterBottom>
          Your Blogs
        </Typography>
      </Container>
      <Container style={{ marginTop: '50px' }}>
        {blogs.map(blog => (
          <div key={blog._id}>
            <Blog title={blog.title} content={blog.content} author={blog.username} />
            <Button variant="contained" color="secondary" onClick={(event) => handleDelete(event, blog._id)}>Delete</Button>
          </div>
        ))}
      </Container>
    </>
  );
};

export default Blogs;
