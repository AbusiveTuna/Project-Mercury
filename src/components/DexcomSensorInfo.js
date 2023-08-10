/*
* Settings Component for dexcom
*/
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function DexcomSensorInfo() {
  const [sensorInfo, setSensorInfo] = useState([]);
  const [message, setMessage] = useState('');
  const [showComponent, setShowComponent] = useState(true);
  const userId = useSelector((state) => state.user_id);
  const backendUrl = 'https://protected-badlands-72029.herokuapp.com';

  useEffect(() => {
    fetch(`${backendUrl}/devices/${userId}`)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          setSensorInfo(data);
        } else {
          setShowComponent(false);
        }
      })
      .catch(error => console.error('Error:', error));
  }, [userId]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete your dexcom sensor?')) {
      fetch(`${backendUrl}/removeSensor/${userId}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (response.status === 200) {
            setShowComponent(false); // Hide component after deletion
          } else if (response.status === 404) {
            setMessage('Unable to find Sensor to delete');
          }
        })
        .catch(error => console.error('Error:', error));
    }
  };

  if (!showComponent) return null;

  return (
    <div>
      <h2>Your Sensor Information</h2>
      {sensorInfo.map((info, index) => (
        <div key={index}>
          <div>Transmitter Type: {info.transmitterGeneration}</div>
          <div>Last Upload Date: {info.lastUploadDate}</div>
          <div>Your Sensor App: {info.displayDevice}</div>
        </div>
      ))}
      <button onClick={handleDelete}>Delete Dexcom Sensor</button>
      <p>{message}</p>
    </div>
  );
}

export default DexcomSensorInfo;
