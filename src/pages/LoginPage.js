import React, { useState } from 'react';
import './LoginPage.css';

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    setUsername("");
    setPassword("");
  }

  const handleForgotPassword = () => {
    console.log("Forgot password button clicked");
    // Add functionality for forgot password here in future
  }

  return (
    <div className="LoginPage">
      <h1>Login Page</h1>
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
        <button onClick={handleForgotPassword}>Forgot Password?</button>
      </div>
    </div>
  );
}

export default LoginPage;