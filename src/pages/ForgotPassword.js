import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/ForgotPassword.css';

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

const handleResetPassword = async () => {
  try {
    const response = await fetch('https://protected-badlands-72029.herokuapp.com/requestReset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email })
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('email', email);
      navigate("/verify");
    } else {
      setMessage(data.message);
    }
  } catch (err) {
    console.error(err);
    setMessage('An error occurred while requesting a password reset');
  }

  setEmail("");
}


  return (
    <div className="ForgotPassword">
      <div className="ForgotPassword-content">
        <h1>Forgot your password?</h1>
        <p>Enter your email below, if an account is found registered to that email you will be sent a link to reset your password</p>
        <div>
          <input 
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="button-container">
          <button onClick={handleResetPassword}>Reset Password</button>
        </div>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default ForgotPassword;
