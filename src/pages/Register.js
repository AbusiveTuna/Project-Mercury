import React, { useState } from 'react';
import './Register.css';

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const resetForm = () => {
    setUsername("");
    setEmail("");
    setConfirmEmail("");
    setPassword("");
    setConfirmPassword("");
    setBirthDate("");
  }

  const isFormComplete = () => {
    return (
      username !== "" &&
      email !== "" &&
      confirmEmail !== "" &&
      password !== "" &&
      confirmPassword !== "" &&
      birthDate !== "" &&
      email === confirmEmail &&
      password === confirmPassword
    );
  }

  return (
    <div className="Register">
      <div className="Register-content">
        <h1>Register</h1>
        <input 
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input 
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input 
          type="email"
          placeholder="Confirm Email"
          value={confirmEmail}
          onChange={e => setConfirmEmail(e.target.value)}
        />
        <input 
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <input 
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
        <input 
          type="date"
          placeholder="Enter Birth Date"
          value={birthDate}
          onChange={e => setBirthDate(e.target.value)}
        />
        <div className="button-container">
          <button onClick={resetForm} disabled={!isFormComplete()}>Sign Up</button>
        </div>
      </div>
    </div>
  );
}

export default Register;
