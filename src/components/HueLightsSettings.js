import React, { useState, useEffect } from 'react';
import { BsX } from 'react-icons/bs';
import './css/HueLightsSettings.css';
import { useSelector } from 'react-redux';

function HueLightsSettings({ isSidebarOpen, setSidebarOpen, checkedDevices, setCheckedDevices }) {
  const [devices, setDevices] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const userId = useSelector((state) => state.user_id);

  useEffect(() => {
    const fetchHueDevices = async () => {
      try {
        await fetch('https://protected-badlands-72029.herokuapp.com/updateHueDevices');
        const response = await fetch('https://protected-badlands-72029.herokuapp.com/getHueDevices');
        if (response.status === 200) {
          const data = await response.json();
          setDevices(data);
          setAlerts(new Array(data.length).fill(false));
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchHueDevices();
  }, []);

  const handleToggleLight = async (lightname, on) => {
    try {
      await fetch('https://protected-badlands-72029.herokuapp.com/toggleHueLight', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId, lightname, on }),
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
    <div className={isSidebarOpen ? 'sidebar open' : 'sidebar'} data-testid='sidebar'>
      <BsX
        className='settings-button close-button'
        onClick={() => setSidebarOpen(false)}
        data-testid='close-button'
      />
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
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HueLightsSettings;
