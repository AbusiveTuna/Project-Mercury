import React, { useState } from 'react';
import { useEffect } from 'react';
import './css/Register.css';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [isOldEnough, setIsOldEnough] = useState(true);

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
      password === confirmPassword &&
      isOldEnough
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
      if(data){
        resetForm();
        navigate('/');
      }

    } catch (error) {
    }
  }

  const handleBirthDateChange = (date) => {
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    setIsOldEnough(age >= 13);
    setBirthDate(date);
  }
  
  const checkUsernameAvailability = async (username) => {
  try {
    const response = await fetch(`https://protected-badlands-72029.herokuapp.com/checkUsernameAvailability/${username}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    setIsUsernameAvailable(data.isAvailable);
  } catch (error) {
  }
}
  
  const handleUsernameChange = (username) => {
    setUsername(username);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter' && isFormComplete()) {
        submitForm();
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
  
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFormComplete, submitForm]);
  
  return (
      <div className="Register">
    <div className="Register-content">
      <h1>New User Registration</h1>
      {!isUsernameAvailable && <p>Username is not available.</p>}
      <input 
        type="text"
        placeholder="Enter Username"
        value={username}
        onChange={e => handleUsernameChange(e.target.value)}
        onBlur={e => checkUsernameAvailability(e.target.value)}
        />
        <input 
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className={email !== confirmEmail && confirmEmail !== '' ? 'mismatch' : ''}
        />
        {email !== confirmEmail && confirmEmail !== '' && <p>Emails do not match.</p>}
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
        {password !== confirmPassword && confirmPassword !== '' && <p>Passwords do not match.</p>}
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
          onChange={e => handleBirthDateChange(e.target.value)}
        />
        {!isOldEnough && <p>You must be at least 13 years old to sign up.</p>}
        <div className="button-container">
            <button onClick={submitForm} disabled={!isFormComplete()}>Sign Up</button>
        </div>
      </div>
    </div>
  );
}

export default Register;
