import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleLogin = () => {
    setUsername("");
    setPassword("");
    history.push("/dashboard");
  }

  const handleForgotPassword = () => {
    console.log("Forgot password button clicked");
    // Add functionality for forgot password here in future
  }


  return (
    <div className="LoginPage">
      <div className="LoginPage-content">
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
    </div>
  );
}

export default LoginPage;