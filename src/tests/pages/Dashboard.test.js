import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Dashboard from '../../pages/Dashboard';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import '@testing-library/jest-dom/extend-expect';

const mockStore = configureMockStore();
const store = mockStore({ user_id: 'mock-user-id' });

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

test('Dashboard Renders', () => {
  render(
    <MemoryRouter>
      <Provider store={store}>
        <Dashboard />
      </Provider>
    </MemoryRouter>
  );

  const setupDexcomButton = screen.getByText('Setup Dexcom Sensor');
  const setupHueButton = screen.getByText('Setup Hue Lights');

  expect(setupDexcomButton).toBeInTheDocument();
  expect(setupHueButton).toBeInTheDocument();
});

test('Blood Glucose Graph Renders', () => {
  render(
    <MemoryRouter>
      <Provider store={store}>
        <Dashboard />
      </Provider>
    </MemoryRouter>
  );

  const bloodGlucoseGraph = screen.getByTestId('mock-blood-glucose-graph');
  expect(bloodGlucoseGraph).toBeInTheDocument();
});

test('Sidebar Open on Settings Icon Click', () => {
  render(
    <MemoryRouter>
      <Provider store={store}>
        <Dashboard />
      </Provider>
    </MemoryRouter>
  );

  const settingsIcon = screen.getByTestId('settings-button');
  fireEvent.click(settingsIcon);

  const settingsSidebar = screen.getByTestId('mock-settings');
  expect(settingsSidebar).toBeInTheDocument();
});

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
      <Provider store={store}>
        <Dashboard />
      </Provider>
    </MemoryRouter>
  );

  expect(mockSetLastLevel).toHaveBeenCalled();
  expect(mockSetLastTrend).toHaveBeenCalled();
});
