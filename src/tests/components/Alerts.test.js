import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Alerts, { getTimeouts } from '../../components/Alerts';
import { useSelector } from 'react-redux';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

describe('Alerts', () => {
  beforeEach(() => {
    useSelector.mockReturnValue('user123');
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ ip_address: 'test', username: 'test' }),
      })
    );
  });

  /* 
  * Test Name: Render Alerts.js
  * Unit Test ID: CUT29
  * Description: Tests rendering of Alerts.js
  */
  it('should render without crashing', () => {
    render(<Alerts />);
  });

  /* 
  * Test Name: Low Alert
  * Unit Test ID: CUT30
  * Description: Tests rendering of alert on low
  */
  it('should render alert message when level is below lowThreshold', () => {
    render(<Alerts level={50} lowThreshold={60} highThreshold={100} checkedDevices={[]} smartAlertValue={3} />);
    expect(screen.getByText('Alert: The current blood glucose level is outside the normal range.')).toBeInTheDocument();
  });

  /* 
  * Test Name: High Alert
  * Unit Test ID: CUT31
  * Description: Tests rendering of alert on a High
  */

  it('should render alert message when level is above highThreshold', () => {
    render(<Alerts level={110} lowThreshold={60} highThreshold={100} checkedDevices={[]} smartAlertValue={3} />);
    expect(screen.getByText('Alert: The current blood glucose level is outside the normal range.')).toBeInTheDocument();
  });


  /* 
  * Test Name: No Alert
  * Unit Test ID: CUT32
  * Description: Tests that normal levels do not cause an alert
  */
  it('should not render alert message when level is within normal range', () => {
    render(<Alerts level={70} lowThreshold={60} highThreshold={100} checkedDevices={[]} smartAlertValue={3} />);
    expect(screen.queryByText('Alert: The current blood glucose level is outside the normal range.')).not.toBeInTheDocument();
  });

  /* 
  * Test Name: Acknowledge Alert
  * Unit Test ID: CUT33
  * Description: Tests that alert can be acknowledged
  */
  it('should acknowledge alert', () => {
    render(<Alerts level={50} lowThreshold={60} highThreshold={100} checkedDevices={[]} smartAlertValue={3} />);
    fireEvent.click(screen.getByText('Acknowledge Alert'));
    expect(screen.queryByText('Alert: The current blood glucose level is outside the normal range.')).not.toBeInTheDocument();
  });

  /* 
  * Test Name: Smart Alert Timeouts
  * Unit Test ID: CUT34
  * Description: Tests that smart alert timeouts are correct
  */
  describe('getTimeouts', () => {
    it('should return correct timeouts for smartAlertValue 1', () => {
      expect(getTimeouts(1)).toEqual({ longTimeout: 50000, shortTimeout: 1000 });
    });
  });

  /* 
  * Test Name: Flash on Alert Test
  * Unit Test ID: CUT35
  * Description: Tests that lights flash when alert is true
  */
  it('should flash lights when alert is true', async () => {
    jest.useFakeTimers();
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ ip_address: 'test', username: 'test' }),
    });

    render(<Alerts level={50} lowThreshold={60} highThreshold={100} checkedDevices={[{ lightId: '1' }]} smartAlertValue={3} />);
    
    // Move forward in time to trigger the flashing logic
    jest.runOnlyPendingTimers();

    // Check that fetch was called with the correct parameters
    expect(fetch).toHaveBeenCalledWith('https://protected-badlands-72029.herokuapp.com/getHueCredentials/user123');

    jest.useRealTimers(); // Restore real timers
  });

  /* 
  * Test Name: Reset Alert Test
  * Unit Test ID: CUT36
  * Description: Tests acknowledging an alert resets timeout
  */
  it('should reset acknowledgment after timeout', () => {
    jest.useFakeTimers();
    render(<Alerts level={50} lowThreshold={60} highThreshold={100} checkedDevices={[]} smartAlertValue={3} />);
    fireEvent.click(screen.getByText('Acknowledge Alert'));

    // Move forward in time to trigger the acknowledgment timeout
    jest.advanceTimersByTime(600000);

    // Check that the alert is rendered again
    expect(screen.getByText('Alert: The current blood glucose level is outside the normal range.')).toBeInTheDocument();

    jest.useRealTimers(); // Restore real timers
  });
});
