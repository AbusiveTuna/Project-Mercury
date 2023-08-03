import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './css/WarningThresholds.css';

const WarningThresholds = ({ lowThreshold, setLowThreshold, highThreshold, setHighThreshold }) => {
  const userId = useSelector(state => state.user_id);

  useEffect(() => {
    const getUserSettings = async () => {
      try {
        const res = await fetch(`https://protected-badlands-72029.herokuapp.com/getUserSettings/${userId}`);
        const data = await res.json();
        setHighThreshold(data.high_threshold);
        setLowThreshold(data.low_threshold);
      } catch (err) {
        console.error(err);
      }
    };

    getUserSettings();
  }, [userId]);

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
        <label>High Threshold:</label>
        <input
          type="number"
          value={highThreshold}
          onChange={e => setHighThreshold(e.target.value)}
        />
        <span>mg/dL</span>
      </div>
      <div className="thresholdContainer">
        <label>Low Threshold:</label>
        <input
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
