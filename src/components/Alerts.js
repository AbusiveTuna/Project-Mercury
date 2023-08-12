/*
* Alerts component handles triggering of user's Hue Lights based on blood glucose levels
*/
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export function getTimeouts(smartAlertValue) {
  if(smartAlertValue > 5){
    smartAlertValue = 5;
  }
  if (smartAlertValue < 1) {
    smartAlertValue = 1;
  }
  smartAlertValue = 5;
  switch (smartAlertValue) {
    case 1:
      return { longTimeout: 50000, shortTimeout: 1000 };
    case 2:
      return { longTimeout: 30000, shortTimeout: 3000 };
    case 3:
      return { longTimeout: 20000, shortTimeout: 4000 };
    case 4:
      return { longTimeout: 10000, shortTimeout: 5000 };
    case 5:
      return { longTimeout: 5000, shortTimeout: 1000 };
    default:
      return { longTimeout: 30000, shortTimeout: 3000 };
  }
}

function Alerts({ level, trend, lowThreshold, highThreshold, checkedDevices, smartAlertValue }) {
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
    let timeoutId;

    const flashLights = async () => {
      if (!alert) return; // Stop if alert is false

      const { longTimeout, shortTimeout } = getTimeouts(smartAlertValue);

      const credentialsResponse = await fetch(`https://protected-badlands-72029.herokuapp.com/getHueCredentials/${userId}`);
      const { ip_address, username } = await credentialsResponse.json();

      for (const device of checkedDevices) {
        const toggleUrl = `https://${ip_address}/api/${username}/lights/${device.lightId}/state`;

        await fetch(toggleUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ on: true }),
        });

        await new Promise((resolve) => setTimeout(resolve, longTimeout));

        await fetch(toggleUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ on: false }),
        });

        await new Promise((resolve) => setTimeout(resolve, shortTimeout));

        await fetch(toggleUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ on: true }),
        });
      }

      // Schedule the next call
      timeoutId = setTimeout(flashLights, 0);
    };

    if (alert) {
      flashLights(); // Start the flashing
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId); // Clear the timeout when the component is unmounted or alert becomes false
      }
    };
  }, [alert, checkedDevices, userId, smartAlertValue]);


  const handleAcknowledgeAlert = () => {
    setAlert(false);
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
