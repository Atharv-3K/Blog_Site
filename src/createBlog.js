import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, CircularProgress } from '@mui/material';
import { AppBar, Toolbar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Replace with your backend API URL
const API_KEY="AIzaSyBt36vYmBJH5d3sivkrjUdPzxR_5czgzRw"

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      await axios.post(`${API_URL}/create`, { title, content }, { withCredentials: true });
      setSuccess(true);
      setTitle('');
      setContent('');
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create blog');
    }
  };

  const generateBlogContent = async () => {
    if (!title) {
      alert("Please provide a title!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`,
        method: 'POST',
        data: {
          contents: [
            { parts: [{ text: "Generate a nicely formatted blog in HTML on topic " + title + ". Be professional and creative. Give a nice title to the blog but don't put title inside header tag of html document. Blog should be of atleast 500 words." }] },
          ],
        },
      });

      setLoading(false);
      if (response.data.candidates.length > 0) {
        let generatedContent = response.data.candidates[0].content.parts[0].text;

        // Optional: Transform the generated content as needed
        generatedContent = generatedContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        generatedContent = generatedContent.replace(/\*(.*?)\*/g, '<em>$1</em>');

        setContent(generatedContent);
      }
    } catch (error) {
      console.error('Error generating blog content: ', error);
      setLoading(false);
      setError('Error generating blog content. Please try again later.');
    }
  };

  return (
    <>
      <AppBar position="static" style={{ backgroundColor: '#1a237e', marginBottom: '20px' }}>
        <Toolbar>
          <Button color="inherit" component={Link} to="/dashboard" style={{ marginRight: '10px' }}>Dashboard</Button>
          <Button color="inherit" component={Link} to="/create" style={{ marginRight: '10px' }}>Create Blog</Button>
          <Button color="inherit" component={Link} to="/Your_blogs">Your Blogs</Button>
        </Toolbar>
      </AppBar>
      <Container style={{ backgroundColor: 'black', color: 'white', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
        <Typography variant="h4" gutterBottom style={{ color: '#f0f0f0', marginBottom: '20px' }}>Create a New Blog</Typography>
        <form onSubmit={handleSubmit} style={{ marginBottom: '10px' }}>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              InputProps={{
                style: { color: 'white' }
              }}
              InputLabelProps={{
                style: { color: '#90caf9' }
              }}
            />
          </Box>
          <Box mb={2}>
            <Typography variant="h6" style={{ color: '#f0f0f0', marginBottom: '10px' }}>Content</Typography>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              style={{ height: '350px', backgroundColor: 'white', color: 'black', borderRadius: '5px', padding: '10px' }}
            />
          </Box>
          <Box mb={2} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button type="submit" variant="contained" color="primary"
              style={{ height: '40px', background: 'linear-gradient(to right, #0f4c75, #3282b8)', color: 'white', width: '45%', borderRadius: '5px', boxShadow: '0 4px 8px rgba(0,0,0,0.3)', padding: '10px' }}>
              Create Blog
            </Button>
            <Button
              onClick={generateBlogContent}
              variant="contained"
              color="secondary"
              disabled={loading}
              style={{ height: '40px', color: 'white', width: '45%', borderRadius: '5px', boxShadow: '0 4px 8px rgba(0,0,0,0.3)', padding: '10px' }}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-2 px-4 rounded hover:from-blue-600 hover:to-purple-600 transition-all duration-500 shadow-lg"
            >
              {loading ? <CircularProgress size={24} style={{ color: 'white' }} /> : 'Generate Content'}
            </Button>
          </Box>
        </form>
        {error && (
          <Typography variant="body1" style={{ color: '#f44336', marginBottom: '10px' }}>{error}</Typography>
        )}
        {success && (
          <Typography variant="body1" style={{ color: '#4caf50', marginBottom: '10px' }}>Blog created successfully!</Typography>
        )}
      </Container>
    </>
  );
};

export default CreateBlog;
