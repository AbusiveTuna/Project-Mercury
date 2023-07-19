import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Dashboard from '../../pages/Dashboard';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../../components/BloodGlucoseGraph', () => () => <div data-testid="mock-blood-glucose-graph" />);
jest.mock('../../pages/css/Dashboard.css', () => ({}));

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
