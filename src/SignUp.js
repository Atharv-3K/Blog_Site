import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css'; // Use the same CSS file

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://localhost:5000/signup', { username, email, password });
      console.log(response.data);
      navigate('/login');
    } catch (error) {
      if (error.response) {
        console.error('Server responded with error status:', error.response.status);
        console.error('Error message from server:', error.response.data);
        setError(error.response.data);
      } else if (error.request) {
        console.error('No response received from server:', error.request);
        setError('No response received from server');
      } else {
        console.error('Error setting up request:', error.message);
        setError('Error setting up request');
      }
    }
  };

  return (
    <div className="App">
      <main className="App-main login-container">
        <h1>Sign Up</h1>
        <div className="input-box">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-box">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="login-button" onClick={handleSignUp}>Sign Up</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </main>
    </div>
  );
};

export default SignUp;
