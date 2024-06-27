// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import { CssBaseline, Container, Typography, AppBar, Toolbar, Button} from '@mui/material';
import Dashboard from './Dashboard';
import CreateBlog from './createBlog';
import Blogs from './Your_blogs';
import Blog from './Blog'

function App() {
  return (
    <Router>
      <CssBaseline />
      {/* <Container style={{ marginTop: '20px' }}> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreateBlog/>} />
        <Route path="/Your_blogs" element={<Blogs/>} />
        <Route path="/blog/:id" element={<Blog/>}/>
      </Routes>
      {/* </Container> */}
    </Router>
  );
}

export default App;
