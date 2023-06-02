import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" component={LoginPage} />
          <Route path="/dashboard" component={Dashboard} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;