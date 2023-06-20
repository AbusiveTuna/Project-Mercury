import React, { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/LoginPage.css';
import Spinner from 'react-bootstrap/Spinner';

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoading(true);
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
      setIsLoading(false);
      navigate("/dashboard");
    })
    .catch(error => {
      setIsLoading(false);
      setErrorMessage('Invalid username or password');
    });
  };

  const handleForgotPassword = () => {
    navigate("/forgotPassword");
  }

  const handleRegister = () => {
    navigate("/register");
  }
  
  const handleKeyPress = useCallback((event) => {
    if (event.key === 'Enter' && username && password) {
      handleLogin();
    }
  }, [username, password]);
  
  useEffect(() => {
    window.addEventListener('keypress', handleKeyPress);
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    }
  }, [username, password, handleKeyPress]);
  
 return (
    <div className="LoginPage">
      <div className="LoginPage-content">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
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
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="text-links">
              <span className="forgot-password" onClick={handleForgotPassword}>Forgot Password?</span>
              <span className="register" onClick={handleRegister}>New User? Register here</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
