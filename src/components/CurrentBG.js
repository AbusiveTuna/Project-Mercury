import React from 'react';
import './css/CurrentBG.css';
import downTrend from '../resources/downTrend.png';

const CurrentBG = ({ level, trend }) => {
  let rotation = 0;
  let levelStyle = {};
  if (trend === 'singleDown' || trend === 'doubleDown') {
    rotation = 0;
    levelStyle = {top: '10px'};
  } else if (trend === 'singleUp' || trend === 'doubleUp') {
    rotation = 180;
    levelStyle = {bottom: '10px'};
  } else if (trend === 'fortyFiveUp') {
    rotation = 245;
    levelStyle = {left: '208px'};
  } else if (trend === 'fortyFiveDown') {
    rotation = 300;
    levelStyle = {left: '205px', top: '20px'};
  } else if (trend === 'flat') {
    rotation = 270;
    levelStyle = {left: '205px'};
  }

  return (
    <div className="blood-glucose-level-container">
      <div className="level-container">
        <div className="level" style={levelStyle}>{level}</div>
        <img src={downTrend} alt="trend" style={{ transform: `rotate(${rotation}deg)` }} />
      </div>
    </div>
  );
};

export default CurrentBG;
