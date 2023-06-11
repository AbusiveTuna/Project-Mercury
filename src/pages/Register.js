import React, { useState } from 'react';
import './css/Register.css';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
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

  const submitForm = async () => {
    try {
      const response = await fetch('https://protected-badlands-72029.herokuapp.com/addUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
          birthdate: birthDate
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      resetForm();
      navigate('/');

    } catch (error) {
      console.error('Error:', error);
    }
  }


  return (
    <div className="Register">
      <div className="Register-content">
        <h1>New User Registration</h1>
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
          className={email !== confirmEmail && confirmEmail !== '' ? 'mismatch' : ''}
        />
        <input 
          type="email"
          placeholder="Confirm Email"
          value={confirmEmail}
          onChange={e => setConfirmEmail(e.target.value)}
          className={email !== confirmEmail && confirmEmail !== '' ? 'mismatch' : ''}
        />
        <input 
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className={password !== confirmPassword && confirmPassword !== '' ? 'mismatch' : ''}
        />
        <input 
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          className={password !== confirmPassword && confirmPassword !== '' ? 'mismatch' : ''}
        />
        <input 
          type="date"
          placeholder="Enter Birth Date"
          value={birthDate}
          onChange={e => setBirthDate(e.target.value)}
        />
      <div className="button-container">
        <button onClick={submitForm} disabled={!isFormComplete()}>Sign Up</button>
      </div>
      </div>
    </div>
  );
}

export default Register;
