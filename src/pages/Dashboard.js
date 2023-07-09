import React, { useState } from 'react';
import { BsGearFill, BsX } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import BloodGlucoseGraph from './BloodGlucoseGraph';
import './css/Dashboard.css';

function Dashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleDexcomLink = () => {
    navigate("/dexcomLink");
  }

  return (
    <>
      <div className="dashboard">
        {isSidebarOpen ? (
          <BsX className="settings-button close-btn" onClick={() => setSidebarOpen(false)} />
        ) : (
          <BsGearFill className="settings-button" onClick={() => setSidebarOpen(true)} />
        )}
        <div className={isSidebarOpen ? "sidebar open" : "sidebar"}>
          <ul>
            <li>TODO 1</li>
            <li>TODO 2</li>
            <li>TODO 3</li>
          </ul>
        </div>
        <div className="graph-container">
          <BloodGlucoseGraph />
        </div>
        <div className="button-container">
          <button onClick={handleDexcomLink}>Setup Dexcom Sensor</button>
        </div>
      </div>
    </>
  );
  
}

export default Dashboard;
