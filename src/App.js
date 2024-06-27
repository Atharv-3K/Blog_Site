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
      </Routes>
      {/* </Container> */}
    </Router>
  );
}

export default App;
