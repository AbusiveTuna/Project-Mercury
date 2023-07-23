import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Dashboard from '../../pages/Dashboard';
import { MemoryRouter } from 'react-router-dom';

import '@testing-library/jest-dom/extend-expect';

jest.mock('../../components/BloodGlucoseGraph', () => {
  return ({ onUpdateLastData }) => {
    onUpdateLastData(100, 'mock-trend');
    return <div data-testid="mock-blood-glucose-graph" />;
  }
});

jest.mock('../../pages/css/Dashboard.css', () => ({}));
jest.mock('../../components/css/CurrentBG.css', () => ({}));
jest.mock('../../components/Settings', () => () => <div data-testid="mock-settings" />);
jest.mock('../../components/CurrentBG', () => () => <div data-testid="mock-current-bg" />);


/* 
* Test Name: Dashboard Page Render
* Unit Test ID: UT20
* Description: Tests rendering of Dashboard.js
*/
test('Dashboard Renders', () => {
  render(
    <MemoryRouter>
      <Dashboard />
    </MemoryRouter>
  );

  const setupDexcomButton = screen.getByText('Setup Dexcom Sensor');
  const setupHueButton = screen.getByText('Setup Hue Lights');

  expect(setupDexcomButton).toBeInTheDocument();
  expect(setupHueButton).toBeInTheDocument();
});

/* 
* Test Name: Blood Glucose Graph Render
* Unit Test ID: UT21
* Description: Tests rendering of BloodGlucoseGraph.js
*/
test('Blood Glucose Graph Renders', () => {
  render(
    <MemoryRouter>
      <Dashboard />
    </MemoryRouter>
  );

  const bloodGlucoseGraph = screen.getByTestId('mock-blood-glucose-graph');
  expect(bloodGlucoseGraph).toBeInTheDocument();
});

/* 
* Test Name: Sidebar Open on Settings Icon Click
* Unit Test ID: UT22
* Description: Tests if the sidebar opens when the settings icon is clicked
*/
test('Sidebar Open on Settings Icon Click', () => {
  render(
    <MemoryRouter>
      <Dashboard />
    </MemoryRouter>
  );

  const settingsIcon = screen.getByTestId('settings-button');
  fireEvent.click(settingsIcon);

  const settingsSidebar = screen.getByTestId('mock-settings');
  expect(settingsSidebar).toBeInTheDocument();
});

/* 
* Test Name: handleUpdateLastData Test
* Unit Test ID: UT23
* Description: Tests if handleUpdateLastData is called when BloodGlucoseGraph calls onUpdateLastData
*/
let mockSetLastLevel = jest.fn();
let mockSetLastTrend = jest.fn();

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn().mockImplementation((init) => [
    init,
    (init === false) ? mockSetLastLevel : mockSetLastTrend,
  ]),
  useEffect: jest.fn().mockImplementation((f) => f())
}));

test('handleUpdateLastData is called with correct arguments', () => {
  render(
    <MemoryRouter>
      <Dashboard />
    </MemoryRouter>
  );
  
  expect(mockSetLastLevel).toHaveBeenCalled();
  expect(mockSetLastTrend).toHaveBeenCalled();
});
