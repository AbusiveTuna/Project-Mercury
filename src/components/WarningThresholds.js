import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const WarningThresholds = () => {
  const [highThreshold, setHighThreshold] = useState(300);
  const [lowThreshold, setLowThreshold] = useState(60);
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
    <div>
      <h2 style={{ textAlign: 'center' }}>Warning Thresholds</h2>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div>
          <label>High Threshold:</label>
          <input
            type="number"
            value={highThreshold}
            onChange={e => setHighThreshold(e.target.value)}
          />
          <button onClick={() => setHighThreshold(highThreshold + 1)}>↑</button>
          <button onClick={() => setHighThreshold(highThreshold - 1)}>↓</button>
          <span>mg/dL</span>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div>
          <label>Low Threshold:</label>
          <input
            type="number"
            value={lowThreshold}
            onChange={e => setLowThreshold(e.target.value)}
          />
          <button onClick={() => setLowThreshold(lowThreshold + 1)}>↑</button>
          <button onClick={() => setLowThreshold(lowThreshold - 1)}>↓</button>
          <span>mg/dL</span>
        </div>
      </div>
      <button onClick={handleUpdateUserSettings}>Save</button>
    </div>
  );
};

export default WarningThresholds;
