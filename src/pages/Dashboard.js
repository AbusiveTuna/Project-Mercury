import React, { useState, useEffect } from 'react';
import { BsGearFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import BloodGlucoseGraph from '../components/BloodGlucoseGraph';
import CurrentBG from '../components/CurrentBG';
import './css/Dashboard.css';
import Settings from '../components/Settings';
import WarningThresholds from '../components/WarningThresholds';

function Dashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [lastLevel, setLastLevel] = useState(null);
  const [lastTrend, setLastTrend] = useState(null);
  const [hasDataLoaded, setHasDataLoaded] = useState(false);
  const [hasHueData, setHasHueData] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    if (lastLevel !== null && lastTrend !== null) {
      setHasDataLoaded(true);
    } else {
      setHasDataLoaded(false);
    }
  }, [lastLevel, lastTrend]);

  useEffect(() => {
    const fetchHueDevices = async () => {
      try {
        const response = await fetch('https://protected-badlands-72029.herokuapp.com/getHueDevices');
        if (response.status === 200) {
          setHasHueData(true);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchHueDevices();
  }, []);

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
        <div className="warningThresholds-container">
          {hasDataLoaded && (
            <WarningThresholds />
          )}
        </div>
        <div className="button-group">
          {!hasDataLoaded && (
            <div className="button-container">
              <button onClick={handleDexcomLink}>Setup Dexcom Sensor</button>
            </div>
          )}
          {!hasHueData && (
            <div className="button-container">
              <button onClick={handleHueLink}>Setup Hue Lights</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
