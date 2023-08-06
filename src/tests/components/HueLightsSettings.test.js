import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HueLightsSettings from '../../components/HueLightsSettings';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import '@testing-library/jest-dom/extend-expect';

const mockStore = configureMockStore();
const store = mockStore({ user_id: '1234' });

describe('HueLightsSettings', () => {
  it('should render Hue sidebar when isHueSidebarOpen is true', () => {
    render(
      <Provider store={store}>
        <HueLightsSettings isHueSidebarOpen={true} setHueSidebarOpen={() => {}} checkedDevices={[]} setCheckedDevices={() => {}} />
      </Provider>
    );
    const sidebar = screen.getByTestId('sidebar');
    expect(sidebar).toHaveClass('open');
  });

  it('should not render Hue sidebar when isHueSidebarOpen is false', () => {
    render(
      <Provider store={store}>
        <HueLightsSettings isHueSidebarOpen={false} setHueSidebarOpen={() => {}} checkedDevices={[]} setCheckedDevices={() => {}} />
      </Provider>
    );
    const sidebar = screen.getByTestId('sidebar');
    expect(sidebar).not.toHaveClass('open');
  });

  it('should call setHueSidebarOpen(false) when close button is clicked', () => {
    const setHueSidebarOpenMock = jest.fn();
    render(
      <Provider store={store}>
        <HueLightsSettings isHueSidebarOpen={true} setHueSidebarOpen={setHueSidebarOpenMock} checkedDevices={[]} setCheckedDevices={() => {}} />
      </Provider>
    );
    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);
    expect(setHueSidebarOpenMock).toHaveBeenCalledWith(false);
  });

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
        <HueLightsSettings isHueSidebarOpen={true} setHueSidebarOpen={() => {}} checkedDevices={[]} setCheckedDevices={() => {}} />
      </Provider>
    );

    // Wait for the fetch to complete
    await screen.findByText('Light 1');
    expect(screen.getByText('Light 1')).toBeInTheDocument();
    expect(screen.getByText('Light 2')).toBeInTheDocument();
  });

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
        <HueLightsSettings isHueSidebarOpen={true} setHueSidebarOpen={() => {}} checkedDevices={[]} setCheckedDevices={() => {}} />
      </Provider>
    );
  
    // Wait for the fetch to complete
    await screen.findByText('Light 1');
    const lightSwitches = screen.getAllByRole('checkbox', { name: '' }); 
    fireEvent.click(lightSwitches[1]); 
  

  });

});
