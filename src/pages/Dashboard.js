import React, { useState } from 'react';
import { BsGearFill } from 'react-icons/bs';
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
          <ul>
            <li>TODO: Settings option 1</li>
            <li>TODO: Settings option 2</li>
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
