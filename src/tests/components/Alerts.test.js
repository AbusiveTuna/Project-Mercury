import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Alerts from '../../components/Alerts';
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

  it('should render without crashing', () => {
    render(<Alerts />);
  });

  it('should render alert message when level is below lowThreshold', () => {
    render(<Alerts level={50} lowThreshold={60} highThreshold={100} checkedDevices={[]} smartAlertValue={3} />);
    expect(screen.getByText('Alert: The current blood glucose level is outside the normal range.')).toBeInTheDocument();
  });

  it('should render alert message when level is above highThreshold', () => {
    render(<Alerts level={110} lowThreshold={60} highThreshold={100} checkedDevices={[]} smartAlertValue={3} />);
    expect(screen.getByText('Alert: The current blood glucose level is outside the normal range.')).toBeInTheDocument();
  });

  it('should not render alert message when level is within normal range', () => {
    render(<Alerts level={70} lowThreshold={60} highThreshold={100} checkedDevices={[]} smartAlertValue={3} />);
    expect(screen.queryByText('Alert: The current blood glucose level is outside the normal range.')).not.toBeInTheDocument();
  });

  it('should acknowledge alert', () => {
    render(<Alerts level={50} lowThreshold={60} highThreshold={100} checkedDevices={[]} smartAlertValue={3} />);
    fireEvent.click(screen.getByText('Acknowledge Alert'));
    expect(screen.queryByText('Alert: The current blood glucose level is outside the normal range.')).not.toBeInTheDocument();
  });
});
