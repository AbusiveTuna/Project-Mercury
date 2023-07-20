import React from 'react';
import './css/CurrentBG.css';
import downTrend from '../resources/downTrend.png';

const CurrentBG = ({ level, trend }) => {
  let rotation = 0;
  if (trend === '90down') {
    rotation = 0;
  } else if (trend === '90up') {
    rotation = 180;
  } else if (trend === '45up') {
    rotation = 135;
  } else if (trend === '45down') {
    rotation = 45;
  }

  return (
    <div className="blood-glucose-level-container">
      <div className="level-container">
        <div className="level">{level}</div>
        <img src={downTrend} alt="trend" style={{ transform: `rotate(${rotation}deg)` }} />
      </div>
    </div>
  );
};

export default CurrentBG;
