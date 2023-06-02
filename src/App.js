import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={LoginPage} />
          <Route path="/dashboard" element={Dashboard} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;