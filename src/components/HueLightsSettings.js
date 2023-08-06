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
    const fetchHueDevicesState = async () => {
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
        // Extract the relevant information
        const deviceNames = Object.values(data).map(device => device.name);
        const deviceOnStates = Object.values(data).map(device => device.state.on);
  
        // Update the local state
        setDevices(deviceNames);
        setAlerts(new Array(deviceNames.length).fill(false));
        setDeviceOn(deviceOnStates);
  
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchHueDevicesState();
  }, [userId]);
  

  const handleToggleLight = async (index) => {
    try {
      const newDeviceOn = [...deviceOn];
      newDeviceOn[index] = !newDeviceOn[index];
  
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
      const lightId = Object.keys(data)[index]; 
  
      const toggleUrl = `https://${ip_address}/api/${username}/lights/${lightId}/state`;
      const toggleResponse = await fetch(toggleUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ on: newDeviceOn[index] }),
      });
      if (!toggleResponse.ok) {
        throw new Error('Request failed with status ' + toggleResponse.status);
      }
  
      setDeviceOn(newDeviceOn);
    } catch (err) {
      console.error(err);
    }
  };
  
  const handleToggleAlert = async (index) => {
    const newAlerts = [...alerts];
    newAlerts[index] = !newAlerts[index];
    setAlerts(newAlerts);
  
    const credentialsResponse = await fetch(`https://protected-badlands-72029.herokuapp.com/getHueCredentials/${userId}`);
    const { ip_address, username } = await credentialsResponse.json();
    const url = `https://${ip_address}/api/${username}/lights`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    const lightId = Object.keys(data)[index];
  
    if (newAlerts[index]) {
      setCheckedDevices((prevState) => [...prevState, { name: devices[index], lightId }]);
    } else {
      setCheckedDevices((prevState) =>
        prevState.filter((device) => device.name !== devices[index])
      );
    }
  };
  


  return (
<div className={isHueSidebarOpen ? "hue-sidebar open" : "hue-sidebar"} data-testid="sidebar">
  <BsX className="hue-settings-button hue-close-button" onClick={() => setHueSidebarOpen(false)} data-testid="close-button" />
  <div className='hue-sidebar-content'>
    <h2>Hue Lights Settings</h2>
    <div className="hue-header">
      <span>Alerts</span>
      <span>Name</span>
      <span>On/Off</span>
    </div>
    <ul>
      {devices.map((device, index) => (
        <li key={device}>
          <input
            type='checkbox'
            checked={alerts[index]}
            onChange={() => handleToggleAlert(index)}
          />
          <span>{device}</span>
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
