import React from 'react';
import './css/CurrentBG.css';

const CurrentBG = ({ level, trend }) => {
  let trendClass = '';
  if (trend === '90down') {
    trendClass = 'trend-down';
  } else if (trend === '90up') {
    trendClass = 'trend-up';
  } else if (trend === '45up') {
    trendClass = 'trend-up-right';
  } else if (trend === '45down') {
    trendClass = 'trend-down-right';
  }
  else{
    trendClass = 'trend-up';
  }

  return (
    <div className="blood-glucose-level-container">
      <div className="level-container">
        <div className="level">{level}</div>
        <div className={`trend ${trendClass}`}></div>
      </div>
    </div>
  );
};

export default CurrentBG;
