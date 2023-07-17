import React from 'react';
import './css/CurrentBG.css';

const CurrentBG = ({ level, trend }) => {
  return (
    <div className="blood-glucose-level-container">
      <div className="level">{level}</div>
      <div className="trend">{trend}</div>
    </div>
  );
};

export default CurrentBG;
