import React, { useState, useEffect } from 'react';

function DexcomSensorInfo() {
  const [sensorInfo, setSensorInfo] = useState([]);

  useEffect(() => {
    const userId = useSelector((state) => state.user_id);
    const backendUrl = 'https://protected-badlands-72029.herokuapp.com';

    fetch(`${backendUrl}/devices/${userId}`)
      .then(response => response.json())
      .then(data => setSensorInfo(data))
      .catch(error => console.error('Error:', error));
  }, []);

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
    </div>
  );
}

export default DexcomSensorInfo;
