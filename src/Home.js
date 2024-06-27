import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; // Import specific CSS file for Home

function Home() {
  const navigate = useNavigate();

  return (
    <div className="App home-container">
      <header className="App-header">
        <div className="App-title">Blog</div>
        <button className="login-button" onClick={() => navigate('/login')}>Login</button>
      </header>
      <main className="App-main">
        <h2 className="App-title">Welcome!!</h2>
        <p className="anecdote">"Blogging is not rocket science. It's about being yourself, and putting what you have into it." - Anonymous</p>
        <button className="login-button" onClick={()=>navigate('/login')}>Get Started</button>
      </main>
    </div>
  );
}

export default Home;
