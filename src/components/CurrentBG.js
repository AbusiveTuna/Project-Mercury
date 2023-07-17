import React from 'react';

const CurrentBG = ({ level, trend }) => {
  return (
    <div>
      <div>{level}</div>
      <div>{trend}</div>
    </div>
  );
};

export default CurrentBG;
