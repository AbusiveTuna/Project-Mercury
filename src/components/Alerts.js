import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CurrentBG from './CurrentBG';
import WarningThresholds from './WarningThresholds';
import HueLightsSettings from './HueLightsSettings';

function Alerts({ level, trend }) {
  const [checkedDevices, setCheckedDevices] = useState([]);
  const [alert, setAlert] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);
  const userId = useSelector((state) => state.user_id);

  useEffect(() => {
    if (level < lowThreshold || level > highThreshold) {
      if (!acknowledged) {
        setAlert(true);
      }
    } else {
      setAlert(false);
    }
  }, [level, lowThreshold, highThreshold, acknowledged]);

  useEffect(() => {
    if (alert) {
      const flashLights = async () => {
        for (const device of checkedDevices) {
          await fetch('https://protected-badlands-72029.herokuapp.com/toggleHueLight', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id: userId, lightname: device, on: true }),
          });

          await new Promise(resolve => setTimeout(resolve, 30000));

          await fetch('https://protected-badlands-72029.herokuapp.com/toggleHueLight', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id: userId, lightname: device, on: false }),
          });

          await new Promise(resolve => setTimeout(resolve, 3000));

          await fetch('https://protected-badlands-72029.herokuapp.com/toggleHueLight', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id: userId, lightname: device, on: true }),
          });
        }
      };

      flashLights();
    }
  }, [alert]);

  const handleAcknowledgeAlert = () => {
    setAcknowledged(true);
    setTimeout(() => {
      setAcknowledged(false);
    }, 600000); 
  };

  return (
    <div>
      {alert ? (
        <div>
          <p>Alert: The current blood glucose level is outside the normal range.</p>
          <button onClick={handleAcknowledgeAlert}>Acknowledge Alert</button>
        </div>
      ) : null}
    </div>
  );
}

export default Alerts;
