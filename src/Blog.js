// Blog.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogById } from './blogService';
import { Container, Typography, CircularProgress } from '@mui/material';
import axios from 'axios'

const Blog = () => {
  const { id } = useParams(); // Get the id parameter from the URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(id);
    if(typeof id !== 'undefined'){
    const fetchBlog = async () => {
      try{
        
        const response = await axios.get(`http://localhost:5000/blog/${id}`,{withCredentials: true});
            setBlog(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching blog:', error);
            setError(error);
            // throw error;
        }finally{
          setLoading(false);
        }
    };
  

    fetchBlog();
  }
  }, [id]);

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

  if (!blog) {
    return (
      <Container style={{ marginTop: '50px' }}>
        <Typography variant="h6">Blog not found.</Typography>
      </Container>
    );
  }

  return (
    <div className='bg-black min-h-screen text-white flex flex-col justify-center items-center'>
    <Container style={{ marginTop: '50px' }}  className='bg-black min-h-screen text-white flex flex-col justify-center items-center'>
      <Typography variant="h2" gutterBottom>{blog.title}</Typography>
      <Typography variant='h3'>{blog.author}</Typography>
      <Typography variant="body1" dangerouslySetInnerHTML={{ __html: blog.content }} />
    </Container>
    </div>
  );
};

export default Blog;
