import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/LoginPage.css';

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  const navigate = useNavigate();

  const handleLogin = () => {
    fetch('https://protected-badlands-72029.herokuapp.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Invalid username or password');
      }
    })
    .then(data => {
      navigate("/dashboard");
    })
    .catch(error => {
      console.error('Error:', error);
      setErrorMessage('Invalid username or password');
    });
  };

  const handleForgotPassword = () => {
    navigate("/forgotPassword");
  }

  const handleRegister = () => {
    navigate("/register");
  }

  return (
    <div className="LoginPage">
      <div className="LoginPage-content">
        <div>
          <input 
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input 
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="button-container">
          <button onClick={handleLogin}>Login</button>
        </div>
        {errorMessage && <p>{errorMessage}</p>}
        <div className="text-links">
          <span className="forgot-password" onClick={handleForgotPassword}>Forgot Password?</span>
          <span className="register" onClick={handleRegister}>New User? Register here</span>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
