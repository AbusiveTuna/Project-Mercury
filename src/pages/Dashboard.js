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
import Clock from '../components/Clock';
import { SmartAlert } from '../utils/SmartAlert';
import { useSelector } from 'react-redux';

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
  const [currentTime, setCurrentTime] = useState(new Date());
  const [smartAlertValue, setSmartAlertValue] = useState(null);

  const userId = useSelector(state => state.user_id);

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
        const credentialsResponse = await fetch(`https://protected-badlands-72029.herokuapp.com/getHueCredentials/${userId}`);
        const { ip_address, username } = await credentialsResponse.json();

        const url = `https://${ip_address}/api/${username}/lights`;

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Request failed with status ' + response.status);
        }
        const data = await response.json();

        // Define storeHueDataInBackend inside the useEffect hook
        const storeHueDataInBackend = async (data) => {
          try {
            const response = await fetch('https://protected-badlands-72029.herokuapp.com/storeHueData', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                userId,
                hueData: data,
              }),
            });

            if (!response.ok) {
              throw new Error('Request failed with status ' + response.status);
            }

            console.log('Data stored successfully');
          } catch (err) {
            console.error(err);
          }
        };

        storeHueDataInBackend(data);

        setHasHueData(true);
      } catch (err) {
        console.error(err);
      }
    };
    fetchHueDevices();
  }, [userId, setHasHueData]);


  useEffect(() => {
    const value = SmartAlert(lastLevel, lastTrend, lowThreshold, highThreshold, checkedDevices, currentTime);
    setSmartAlertValue(value);
  }, [lastLevel, lastTrend, lowThreshold, highThreshold, checkedDevices, currentTime]);

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
        <div className='clock'>
          <Clock setCurrentTime={setCurrentTime} />
        </div>
        <div className='header'>
          {!isSidebarOpen && (
            <BsGearFill
              className='settings-button'
              data-testid='settings-button'
              onClick={() => setSidebarOpen(true)}
            />
          )}
          {hasHueData && !isHueSidebarOpen && (
            <BsLightningFill
              className='hue-settings-button'
              onClick={() => setHueSidebarOpen(true)}
            />
          )}
        </div>
        <div className='main-content'>
          <Settings isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
          {hasHueData && (
            <HueLightsSettings
              isHueSidebarOpen={isHueSidebarOpen}
              setHueSidebarOpen={setHueSidebarOpen}
              checkedDevices={checkedDevices}
              setCheckedDevices={setCheckedDevices}
            />
          )}
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
        </div>
        <Alerts
          level={lastLevel}
          trend={lastTrend}
          lowThreshold={lowThreshold}
          highThreshold={highThreshold}
          checkedDevices={checkedDevices}
          smartAlertValue={smartAlertValue}
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
