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
        <button className="settings-button" onClick={() => setSidebarOpen(!isSidebarOpen)}>
          <BsGearFill />
        </button>
        <div className={isSidebarOpen ? "sidebar open" : "sidebar"}>
          <button className="close-button" onClick={() => setSidebarOpen(!isSidebarOpen)}>
            <BsX />
          </button>
          <p>Option 1</p>
          <p>Option 2</p>
          <p>Option 3</p>
        </div>
        <div className="button-container">
          <button onClick={handleDexcomLink}>Setup Dexcom Sensor</button>
        </div>

        <div className="graph-container">
          <BloodGlucoseGraph />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
