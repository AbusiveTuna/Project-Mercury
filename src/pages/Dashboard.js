import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { BsGearFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import BloodGlucoseGraph from './BloodGlucoseGraph';
import './css/Dashboard.css';

function Dashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleDexcomLink = () => {
    navigate("/dexcomLink");
  }

  return (
    <>
      <div className="dashboard">
        <button className="settings-button" onClick={() => setSidebarOpen(!isSidebarOpen)}>Settings</button>
        <div className={isSidebarOpen ? "sidebar open" : "sidebar"}>
          <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            <BsGearFill />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown></div>
        <div className="button-container">
              <button onClick={handleDexcomLink}>Setup Dexcom Sensor</button>
        </div>

        <div className="graph-container">
          <BloodGlucoseGraph />
        </div>
      </div>
    </>
  );
}



export default Dashboard;
