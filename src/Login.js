import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    axios.post('http://localhost:5000/login', { username, password })
      .then(response => {
        console.log(response.data);
        alert(response.data); // Show success message
        navigate('/dashboard'); // Redirect to dashboard after successful login
      })
      .catch(error => {
        console.error(error.response.data);
        alert(error.response.data.message);
        navigate('/signup'); // Show error message
      });
  };

  const loginWithGoogle = () => {
    window.location.href = 'http://localhost:5000/auth/google';
  };

  return (
    <div className="App">
      <main className="App-main login-container">
        <h1>Login</h1>
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
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="login-button" onClick={handleLogin}>Login</button>
        <p>New user? <span onClick={() => navigate('/signup')} style={{ cursor: 'pointer', color: 'blue' }}>Sign up</span></p>
        <button className="google-button" onClick={loginWithGoogle}>Sign in with Google</button>
      </main>
    </div>
  );
}

export default Login;
