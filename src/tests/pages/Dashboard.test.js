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
jest.mock('../../components/HueLightsSettings', () => () => <div data-testid="mock-hue-settings" />);

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ ip_address: '192.168.0.1', username: 'mock-username' }),
    ok: true,
  })
);

  /* 
  * Test Name: Dashboard Page Render
  * Unit Test ID: UT20
  * Description: Tests rendering of Dashboard.js
  */
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

  /* 
  * Test Name: Blood Glucose Graph Render
  * Unit Test ID: UT20
  * Description: Tests rendering of BloodGlucoseGraph within Dashboard
  */
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

  /* 
  * Test Name: Sidebar Open on Settings Icon Click
  * Unit Test ID: UT22
  * Description: Tests if the sidebar opens when the settings icon is clicked
  */
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

 /* 
  * Test Name: handleUpdateLastData Test
  * Unit Test ID: UT23
  * Description: Tests if handleUpdateLastData is called when BloodGlucoseGraph calls onUpdateLastData
  */
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

describe('Dashboard', () => {
   /* 
  * Test Name: Fetch Hue Lights
  * Unit Test ID: UT29
  * Description: Grabs Hue Lights from API and stores them in the backend
  */
  test('Fetch Hue Devices and Store Data in Backend', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Dashboard />
        </Provider>
      </MemoryRouter>
    );

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(fetch).toHaveBeenCalledWith(`https://protected-badlands-72029.herokuapp.com/getHueCredentials/mock-user-id`);
  });

  /* 
  * Test Name: Hue Sidebar Open
  * Unit Test ID: UT30
  * Description: Tests opening of Hue Lights Settings Menu
  */
  test('Handle Hue Sidebar Open', () => {
    const mockSetHasHueData = jest.fn();
    React.useState = jest.fn().mockImplementationOnce((init) => [true, mockSetHasHueData]);
  
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Dashboard />
        </Provider>
      </MemoryRouter>
    );
  
    const hueSettingsButton = screen.getByRole('button', { name: /setup hue lights/i });
    fireEvent.click(hueSettingsButton);
  
    const hueSidebar = screen.getByTestId('mock-hue-settings');
    expect(hueSidebar).toBeInTheDocument();
  });

  /* 
  * Test Name: Handle Dexcom Link and Hue Link
  * Unit Test ID: UT31
  * Description: Tests the two link buttons
  */
  test('Handle Dexcom Link and Hue Link', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Dashboard />
        </Provider>
      </MemoryRouter>
    );

    const setupDexcomButton = screen.getByText('Setup Dexcom Sensor');
    const setupHueButton = screen.getByText('Setup Hue Lights');

    fireEvent.click(setupDexcomButton);
    fireEvent.click(setupHueButton);

  });
});

afterAll(() => {
  global.fetch.mockRestore();
});
