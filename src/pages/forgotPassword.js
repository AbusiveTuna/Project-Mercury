// ForgotPassword.js
import React, { useState } from 'react';
import './ForgotPassword.css';

function forgotPassword() {
  const [email, setEmail] = useState("");

  const handleResetPassword = () => {
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
      </div>
    </div>
  );
}

export default forgotPassword;