import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { BsGearFill } from 'react-icons/bs'; //need to install still?
import './css/Dashboard.css';

function Dashboard() {
  return (
    <>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          <BsGearFill />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <h1>TODO</h1>
    </>
  );
}

export default Dashboard;
