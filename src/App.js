import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import Register from './pages/Register';
import VerifyCode from './pages/VerifyCode';
import ResetPassword from './pages/ResetPassword';
import DexcomLink from './pages/DexcomLink';
import HueLightsLink from './pages/HueLightsLink';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify" element={<VerifyCode />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/dexcomLink" element={<DexcomLink />} />
          <Route path="/hueLightsLink" element={<HueLightsLink />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
