import React, { useState, useEffect } from 'react';
import { highThreshold, lowThreshold } from './WarningThresholds';
import { level, trend } from './CurrentBG';
import { devices } from './HueLightsSettings';

function Alerts() {
  const [checkedDevices, setCheckedDevices] = useState([]);
  const [alert, setAlert] = useState(false);
  const userId = useSelector((state) => state.user_id);

  useEffect(() => {
    if (level < lowThreshold || level > highThreshold) {
      setAlert(true);
    } else {
      setAlert(false);
    }
  }, [level, lowThreshold, highThreshold]);

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

          // Wait for 3 seconds
          await new Promise(resolve => setTimeout(resolve, 3000));

          // Turn light on again
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

  return (
    <div>
      {alert ? (
        <div>
          <p>Alert: The current blood glucose level is outside the normal range.</p>
          <p>Level: {level}</p>
          <p>Trend: {trend}</p>
          <p>Devices: {checkedDevices.join(', ')}</p>
        </div>
      ) : (
        <div>
          <p>The current blood glucose level is within the normal range.</p>
          <p>Level: {level}</p>
          <p>Trend: {trend}</p>
          <p>Devices: {checkedDevices.join(', ')}</p>
        </div>
      )}
    </div>
  );
}

export default Alerts;
