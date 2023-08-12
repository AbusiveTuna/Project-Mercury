import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/VerifyCode.css';

function VerifyCode() {
  const [email] = useState(localStorage.getItem('email') || "");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleVerifyCode = useCallback(async () => {
    try {
      const response = await fetch('https://protected-badlands-72029.herokuapp.com/verifyCode', {
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
      setMessage('An error occurred during verification');
    }

    setCode("");
  }, [code, email, navigate]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter' && code !== '') {
        handleVerifyCode();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [code, handleVerifyCode]);

  return (
    <div className="VerifyCode">
      <div className="VerifyCode-content">
        <h1>Verify your code</h1>
        <p>Enter the verification code that was sent to your email</p>
        <div>
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
