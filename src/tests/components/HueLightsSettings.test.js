import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HueLightsSettings from '../../components/HueLightsSettings';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import '@testing-library/jest-dom/extend-expect';

const mockStore = configureMockStore();
const store = mockStore({ user_id: '13' });

describe('HueLightsSettings', () => {
  /* 
  * Test Name: Hue Lights Settings Render
  * Unit Test ID: CUT37
  * Description: Tests rendering of HueLightsSettings.js
  */
  it('should render Hue sidebar when isHueSidebarOpen is true', () => {
    render(
      <Provider store={store}>
        <HueLightsSettings isHueSidebarOpen={true} setHueSidebarOpen={() => { }} checkedDevices={[]} setCheckedDevices={() => { }} />
      </Provider>
    );
    const sidebar = screen.getByTestId('sidebar');
    expect(sidebar).toHaveClass('open');
  });

  /* 
  * Test Name: Hue Lights Settings Render when false
  * Unit Test ID: CUT38
  * Description: Tests rendering of HueLightsSettings.js when isHueSidebarOpen is false
  */
  it('should not render Hue sidebar when isHueSidebarOpen is false', () => {
    render(
      <Provider store={store}>
        <HueLightsSettings isHueSidebarOpen={false} setHueSidebarOpen={() => { }} checkedDevices={[]} setCheckedDevices={() => { }} />
      </Provider>
    );
    const sidebar = screen.getByTestId('sidebar');
    expect(sidebar).not.toHaveClass('open');
  });

  /* 
  * Test Name: Close Hue Sidebar
  * Unit Test ID: CUT39
  * Description: Tests the closing of the Hue sidebar
  */
  it('should call setHueSidebarOpen(false) when close button is clicked', () => {
    const setHueSidebarOpenMock = jest.fn();
    render(
      <Provider store={store}>
        <HueLightsSettings isHueSidebarOpen={true} setHueSidebarOpen={setHueSidebarOpenMock} checkedDevices={[]} setCheckedDevices={() => { }} />
      </Provider>
    );
    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);
    expect(setHueSidebarOpenMock).toHaveBeenCalledWith(false);
  });

  /* 
  * Test Name: Fetch Hue Devices
  * Unit Test ID: CUT40
  * Description: Tests the fetching of Hue devices and their rendering
  */
  it('should fetch Hue devices and render them', async () => {
    // Mock the fetch function to return sample data
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          1: { name: 'Light 1', state: { on: true } },
          2: { name: 'Light 2', state: { on: false } },
        }),
      })
    );

    render(
      <Provider store={store}>
        <HueLightsSettings isHueSidebarOpen={true} setHueSidebarOpen={() => { }} checkedDevices={[]} setCheckedDevices={() => { }} />
      </Provider>
    );

    // Wait for the fetch to complete
    await screen.findByText('Light 1');
    expect(screen.getByText('Light 1')).toBeInTheDocument();
    expect(screen.getByText('Light 2')).toBeInTheDocument();
  });

  /* 
  * Test Name: Test Toggle Light State
  * Unit Test ID: CUT41
  * Description: Tests the toggling of the light state
  */
  it('should toggle light state', async () => {
    // Mock the fetch function to return sample data
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          1: { name: 'Light 1', state: { on: true } },
          2: { name: 'Light 2', state: { on: false } },
        }),
      })
    );

    render(
      <Provider store={store}>
        <HueLightsSettings isHueSidebarOpen={true} setHueSidebarOpen={() => { }} checkedDevices={[]} setCheckedDevices={() => { }} />
      </Provider>
    );

    // Wait for the fetch to complete
    await screen.findByText('Light 1');
    const lightSwitches = screen.getAllByRole('checkbox', { name: '' });
    fireEvent.click(lightSwitches[1]);


  });

  /* 
  * Test Name: Error fetching Hue devices
  * Unit Test ID: CUT42
  * Description: Tests handling of errors when fetching Hue devices
  */
  it('should handle errors when fetching Hue devices', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Request failed')));
    console.error = jest.fn();

    render(
      <Provider store={store}>
        <HueLightsSettings isHueSidebarOpen={true} setHueSidebarOpen={() => {}} checkedDevices={[]} setCheckedDevices={() => {}} />
      </Provider>
    );

    expect(console.error).toHaveBeenCalledWith(new Error('Request failed'));
  });

  /* 
  * Test Name: Toggle Alert State and update checked devices
  * Unit Test ID: CUT43
  * Description: Tests toggling of the alert state when true to false
  */
  it('should toggle alert state and update checked devices', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          1: { name: 'Light 1', state: { on: true } },
          2: { name: 'Light 2', state: { on: false } },
        }),
      })
    );

    const setCheckedDevicesMock = jest.fn();

    render(
      <Provider store={store}>
        <HueLightsSettings isHueSidebarOpen={true} setHueSidebarOpen={() => {}} checkedDevices={[]} setCheckedDevices={setCheckedDevicesMock} />
      </Provider>
    );

    await screen.findByText('Light 1');
    const alertCheckboxes = screen.getAllByRole('checkbox', { name: '' });
    fireEvent.click(alertCheckboxes[0]);

    expect(setCheckedDevicesMock).toHaveBeenCalledWith([{ name: 'Light 1', lightId: '1' }]);
  });

});
