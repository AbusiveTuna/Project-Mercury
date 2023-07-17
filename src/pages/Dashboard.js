import React, { useState } from 'react';
import { BsGearFill, BsX } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import BloodGlucoseGraph from '../components/BloodGlucoseGraph';
import CurrentBG from '../components/CurrentBG';
import './css/Dashboard.css';

function Dashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleDexcomLink = () => {
    navigate("/dexcomLink");
  }

  const handleHueLink = () => {
    navigate("/hueLightsLink");
  }

  // Add state for the last blood glucose level and trend
  const [lastLevel, setLastLevel] = useState(null);
  const [lastTrend, setLastTrend] = useState(null);

  // Add a function to update the last blood glucose level and trend
  const handleUpdateLastData = (level, trend) => {
    setLastLevel(level);
    setLastTrend(trend);
  }

  return (
    <>
      <div className="dashboard">
        {!isSidebarOpen && <BsGearFill className="settings-button" onClick={() => setSidebarOpen(true)} />}
        <div className={isSidebarOpen ? "sidebar open" : "sidebar"}> 
          <BsX className="settings-button close-button" onClick={() => setSidebarOpen(false)} />
          <div className="sidebar-content">
          <ul>
            <li>TODO 1</li>
            <li>TODO 2</li>
            <li>TODO 3</li>
          </ul>
        </div>
        </div>
        <div className="graph-container">
          {lastLevel && lastTrend && (
            <CurrentBG level={lastLevel} trend={lastTrend} />
          )}
          <BloodGlucoseGraph onUpdateLastData={handleUpdateLastData} />
        </div>
        
        <div className="button-container">
              <button onClick={handleDexcomLink}>Setup Dexcom Sensor</button>
        </div>

        <div className="button-container">
              <button onClick={handleHueLink}>Setup Hue Lights</button>
        </div>

      </div>
    </>
  );
}

export default Dashboard;
