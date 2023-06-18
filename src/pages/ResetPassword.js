import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/ResetPassword.css';

function ResetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async () => {
    try {
      const response = await fetch('https://protected-badlands-72029.herokuapp.com/resetPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, newPassword: newPassword })
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/');
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      console.error(err);
      setMessage('An error occurred while resetting the password');
    }

    setNewPassword("");
  }

  return (
    <div className="ResetPassword">
      <div className="ResetPassword-content">
        <h1>Reset your password</h1>
        <p>Enter your new password below</p>
        <div>
          <input 
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input 
            type="password"
            placeholder="Enter New Password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
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

export default ResetPassword;
