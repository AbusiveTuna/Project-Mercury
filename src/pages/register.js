import React, { useState } from 'react';
import './Register.css';

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = () => {
    if (email !== confirmEmail) {
      setErrorMessage("Emails do not match");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    setUsername("");
    setEmail("");
    setConfirmEmail("");
    setPassword("");
    setConfirmPassword("");
    setBirthDate("");
    setErrorMessage("");

    //add actual registration functionality here
  }

  return (
    <div className="Register">
      <div className="Register-content">
        <h1>Register</h1>
        <div>
          <input 
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input 
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input 
            type="email"
            placeholder="Confirm Email"
            value={confirmEmail}
            onChange={e => setConfirmEmail(e.target.value)}
          />
        </div>
        <div>
          <input 
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div>
          <input 
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </div>
        <div>
          <input 
            type="date"
            value={birthDate}
            onChange={e => setBirthDate(e.target.value)}
          />
        </div>
        <div className="button-container">
          <button onClick={handleRegister} disabled={email !== confirmEmail || password !== confirmPassword}>Sign Up</button>
        </div>
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </div>
  );
}

export default Register;
