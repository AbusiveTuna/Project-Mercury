import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    setUsername("");
    setPassword("");
    navigate("/dashboard");
  }

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
        <div className="text-links">
          <span className="forgot-password" onClick={handleForgotPassword}>Forgot Password?</span>
          <span className="register" onClick={handleRegister}>New User? Register here</span>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;