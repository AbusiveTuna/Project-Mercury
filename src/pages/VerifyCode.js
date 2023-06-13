import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/VerifyCode.css';

function VerifyCode() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  
  const handleVerifyCode = async () => {
    try {
      const response = await fetch('/verifyCode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, code: code })
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/reset")
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      console.error(err);
      setMessage('An error occurred during verification');
    }

    setCode("");
  }

  return (
    <div className="VerifyCode">
      <div className="VerifyCode-content">
        <h1>Verify your code</h1>
        <p>Enter the verification code that was sent to your email</p>
        <div>
          <input 
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input 
            type="text"
            placeholder="Enter Code"
            value={code}
            onChange={e => setCode(e.target.value)}
          />
        </div>
        <div className="button-container">
          <button onClick={handleVerifyCode}>Verify Code</button>
        </div>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default VerifyCode;