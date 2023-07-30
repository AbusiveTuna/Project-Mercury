import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import DexcomSensorInfo from '../../components/DexcomSensorInfo';
import '@testing-library/jest-dom/extend-expect';

// Dummy reducer for our mock store
const reducer = (state = { user_id: 1 }) => state;
const store = createStore(reducer);

// Mocking the global fetch method
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
    status: 200,
  })
);

describe('DexcomSensorInfo', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <DexcomSensorInfo />
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render "Your Sensor Information" heading', () => {
    expect(screen.getByText(/Your Sensor Information/i)).toBeInTheDocument();
  });

  it('should call the fetch function on render', () => {
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('should not render sensor info if no data is returned', () => {
    expect(screen.queryByText(/Transmitter Type:/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Last Upload Date:/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Your Sensor App:/i)).not.toBeInTheDocument();
  });

  it('should render "Delete Dexcom Sensor" button', () => {
    expect(screen.getByText(/Delete Dexcom Sensor/i)).toBeInTheDocument();
  });

  it('should confirm deletion when "Delete Dexcom Sensor" button is clicked', () => {
    window.confirm = jest.fn(() => true);
    const button = screen.getByText(/Delete Dexcom Sensor/i);
    fireEvent.click(button);
    expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to delete your dexcom sensor?');
  });
});
