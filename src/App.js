import React, { useState } from 'react';

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    setUsername("");
    setPassword("");
  }

  return (
    <div className="App">
      <h1>Login Page</h1>
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
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default App;
