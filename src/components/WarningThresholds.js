import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './css/WarningThresholds.css';

const WarningThresholds = ({ lowThreshold, setLowThreshold, highThreshold, setHighThreshold }) => {
  const userId = useSelector(state => state.user_id);

  useEffect(() => {
    const getUserSettings = async () => {
      try {
        const res = await fetch(`https://protected-badlands-72029.herokuapp.com/getUserSettings/${userId}`);
        const data = await res.json();
        setHighThreshold(data.high_threshold || 300); // Default value if undefined
        setLowThreshold(data.low_threshold || 60); // Default value if undefined
      } catch (err) {
        console.error(err);
      }
    };

    getUserSettings();
  }, [userId, setHighThreshold, setLowThreshold]);

  const handleUpdateUserSettings = async () => {
    try {
      await fetch(`https://protected-badlands-72029.herokuapp.com/updateUserSettings/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ highThreshold, lowThreshold }),
      });
    } catch (err) {
      console.error(err);
    }
  };
  
return (
  <div className="warningThresholdsContainer">
    <h2>Warning Thresholds</h2>
    <div className="thresholdContainer">
      <label htmlFor="highThreshold">High Threshold:</label>
      <input
        id="highThreshold"
        type="number"
        value={highThreshold}
        onChange={e => setHighThreshold(e.target.value)}
      />
      <span>mg/dL</span>
    </div>
    <div className="thresholdContainer">
      <label htmlFor="lowThreshold">Low Threshold:</label>
      <input
        id="lowThreshold"
        type="number"
        value={lowThreshold}
        onChange={e => setLowThreshold(e.target.value)}
      />
      <span>mg/dL</span>
    </div>
    <button className="saveButton" onClick={handleUpdateUserSettings}>Save</button>
  </div>
);

};

export default WarningThresholds;
