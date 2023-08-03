import React, { useState, useEffect } from 'react';
import { BsGearFill, BsLightningFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import BloodGlucoseGraph from '../components/BloodGlucoseGraph';
import CurrentBG from '../components/CurrentBG';
import './css/Dashboard.css';
import Settings from '../components/Settings';
import WarningThresholds from '../components/WarningThresholds';
import HueLightsSettings from '../components/HueLightsSettings';
import Alerts from '../components/Alerts';

function Dashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isHueSidebarOpen, setHueSidebarOpen] = useState(false);
  const [lastLevel, setLastLevel] = useState(null);
  const [lastTrend, setLastTrend] = useState(null);
  const [hasDataLoaded, setHasDataLoaded] = useState(false);
  const [hasHueData, setHasHueData] = useState(false);
  const [lowThreshold, setLowThreshold] = useState(60);
  const [highThreshold, setHighThreshold] = useState(300);
  const [checkedDevices, setCheckedDevices] = useState([]);
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
    navigate('/dexcomLink');
  };

  const handleHueLink = () => {
    navigate('/hueLightsLink');
  };

  const handleUpdateLastData = (level, trend) => {
    setLastLevel(level);
    setLastTrend(trend);
  };

  return (
    <>
      <div className='dashboard'>
        {!isSidebarOpen && !isHueSidebarOpen && (
          <>
            <BsGearFill
              className='settings-button'
              data-testid='settings-button'
              onClick={() => setSidebarOpen(true)}
            />
            {hasHueData && (
              <BsLightningFill
                className='hue-settings-button'
                onClick={() => setHueSidebarOpen(true)}
              />
            )}
          </>
        )}
        <Settings isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
        <HueLightsSettings
          isSidebarOpen={isHueSidebarOpen}
          setSidebarOpen={setHueSidebarOpen}
          checkedDevices={checkedDevices}
          setCheckedDevices={setCheckedDevices}
        />
        <div className='graph-container'>
          {hasDataLoaded && <CurrentBG level={lastLevel} trend={lastTrend} />}
          <BloodGlucoseGraph onUpdateLastData={handleUpdateLastData} />
        </div>
        <div className='warningThresholds-container'>
          {hasDataLoaded && (
            <WarningThresholds
              lowThreshold={lowThreshold}
              setLowThreshold={setLowThreshold}
              highThreshold={highThreshold}
              setHighThreshold={setHighThreshold}
            />
          )}
        </div>
        <Alerts
          level={lastLevel}
          trend={lastTrend}
          lowThreshold={lowThreshold}
          highThreshold={highThreshold}
          checkedDevices={checkedDevices}
        />
        <div className='button-group'>
          {!hasDataLoaded && (
            <div className='button-container'>
              <button onClick={handleDexcomLink}>Setup Dexcom Sensor</button>
            </div>
          )}
          {!hasHueData && (
            <div className='button-container'>
              <button onClick={handleHueLink}>Setup Hue Lights</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
