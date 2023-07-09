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
        <BsGearFill className="settings-button" onClick={() => setSidebarOpen(true)} />
        <div className={isSidebarOpen ? "sidebar open" : "sidebar"}>
          <BsX className="close-button" onClick={() => setSidebarOpen(false)} />
          <ul>
            <li>TODO: Setting 1</li>
            <li>TODO: Setting 2</li>
            <li>TODO: Setting 3</li>
          </ul>
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
