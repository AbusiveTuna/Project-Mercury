import React, { useState } from 'react';

const WarningThresholds = () => {
  const [highThreshold, setHighThreshold] = useState(300);
  const [lowThreshold, setLowThreshold] = useState(60);


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
    </div>
  );
};

export default WarningThresholds;
