import React, { useState, useEffect } from 'react';
import { BsX } from 'react-icons/bs';
import './css/HueLightsSettings.css';
import { useSelector } from 'react-redux';

function HueLightsSettings({ isHueSidebarOpen, setHueSidebarOpen, checkedDevices, setCheckedDevices }) {
  const [devices, setDevices] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [deviceOn, setDeviceOn] = useState([]);
  const userId = useSelector((state) => state.user_id);

  useEffect(() => {
    const fetchHueDevices = async () => {
      try {
        await fetch('https://protected-badlands-72029.herokuapp.com/updateHueDevices/' + userId, {
          method: 'POST',
        });
        const response = await fetch('https://protected-badlands-72029.herokuapp.com/getHueDevices/' + userId);
        if (response.status === 200) {
          const data = await response.json();
          setDevices(data);
          setAlerts(new Array(data.length).fill(false));
          setDeviceOn(new Array(data.length).fill(false));
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchHueDevices();
  }, [userId]);

  const handleToggleLight = async (index) => {
    try {
      const newDeviceOn = [...deviceOn];
      newDeviceOn[index] = !newDeviceOn[index];
      setDeviceOn(newDeviceOn);

      await fetch('https://protected-badlands-72029.herokuapp.com/toggleHueLight', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId, lightname: devices[index], on: newDeviceOn[index] }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleAlert = (index) => {
    const newAlerts = [...alerts];
    newAlerts[index] = !newAlerts[index];
    setAlerts(newAlerts);

    if (newAlerts[index]) {
      setCheckedDevices((prevState) => [...prevState, devices[index]]);
    } else {
      setCheckedDevices((prevState) =>
        prevState.filter((device) => device !== devices[index])
      );
    }
  };

  return (
    <div className={isHueSidebarOpen ? "hue-sidebar open" : "hue-sidebar"} data-testid="sidebar">
      <BsX className="hue-settings-button hue-close-button" onClick={() => setHueSidebarOpen(false)} data-testid="close-button" />
      <div className='sidebar-content'>
        <h2>Use For Alerts?</h2>
        <ul>
          {devices.map((device, index) => (
            <li key={device}>
              <label className='switch'>
                <input
                  type='checkbox'
                  checked={alerts[index]}
                  onChange={() => handleToggleAlert(index)}
                />
                <span className='slider round'></span>
              </label>
              {device}
              <label className='switch'>
                <input
                  type='checkbox'
                  checked={deviceOn[index]}
                  onChange={() => handleToggleLight(index)}
                />
                <span className='slider round'></span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HueLightsSettings;
