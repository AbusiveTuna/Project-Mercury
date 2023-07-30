import React from 'react';
import { BsX } from 'react-icons/bs';
import './css/Settings.css';
import DexcomSensorInfo from './DexcomSensorInfo';

function Settings({ isSidebarOpen, setSidebarOpen }) {
  return (
    <div className={isSidebarOpen ? "sidebar open" : "sidebar"} data-testid="sidebar">
      <BsX className="settings-button close-button" onClick={() => setSidebarOpen(false)} data-testid="close-button" />
      <div className="sidebar-content">
        <ul>
          <li><DexcomSensorInfo /></li>
          <li>TODO 2</li>
          <li>TODO 3</li>
        </ul>
      </div>
    </div>
  );
}

export default Settings;
