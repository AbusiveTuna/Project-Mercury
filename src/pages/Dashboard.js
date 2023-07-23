import React, { useState, useEffect } from 'react';
import { BsGearFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import BloodGlucoseGraph from '../components/BloodGlucoseGraph';
import CurrentBG from '../components/CurrentBG';
import './css/Dashboard.css';
import Settings from '../components/Settings';

function Dashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [lastLevel, setLastLevel] = useState(null);
  const [lastTrend, setLastTrend] = useState(null);
  const [hasDataLoaded, setHasDataLoaded] = useState(false); // new state variable
  let navigate = useNavigate();

  useEffect(() => {
    if (lastLevel !== null && lastTrend !== null) {
      setHasDataLoaded(true);
    } else {
      setHasDataLoaded(false);
    }
  }, [lastLevel, lastTrend]);

  const handleDexcomLink = () => {
    navigate("/dexcomLink");
  }

  const handleHueLink = () => {
    navigate("/hueLightsLink");
  }

  const handleUpdateLastData = (level, trend) => {
    setLastLevel(level);
    setLastTrend(trend);
  }

  return (
    <>
      <div className="dashboard">
        {!isSidebarOpen && <BsGearFill className="settings-button" data-testid="settings-button" onClick={() => setSidebarOpen(true)} />}
        <Settings isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="graph-container">
          {hasDataLoaded && (
            <CurrentBG level={lastLevel} trend={lastTrend} />
          )}
          <BloodGlucoseGraph onUpdateLastData={handleUpdateLastData} />
        </div>
        
        <div className="button-group">
          {!hasDataLoaded && (
            <div className="button-container">
              <button onClick={handleDexcomLink}>Setup Dexcom Sensor</button>
            </div>
          )}

          <div className="button-container">
            <button onClick={handleHueLink}>Setup Hue Lights</button>
          </div>
        </div>

      </div>
    </>
  );
}

export default Dashboard;
