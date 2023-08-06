import React from 'react';
import { render, screen, act,waitFor,fireEvent } from '@testing-library/react';
import WarningThresholds from '../../components/WarningThresholds';
import { useSelector } from 'react-redux';
import '@testing-library/jest-dom/extend-expect';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

describe('WarningThresholds', () => {
  const setLowThreshold = jest.fn();
  const setHighThreshold = jest.fn();

  beforeEach(() => {
    useSelector.mockImplementation(() => 'user-id-123');
    render(
      <WarningThresholds
        lowThreshold="60"
        setLowThreshold={setLowThreshold}
        highThreshold="300"
        setHighThreshold={setHighThreshold}
      />
    );
  });

  it('should render high and low threshold inputs with default values', () => {
    const highThresholdInput = screen.getByLabelText('High Threshold:');
    const lowThresholdInput = screen.getByLabelText('Low Threshold:');
    expect(highThresholdInput).toBeInTheDocument();
    expect(lowThresholdInput).toBeInTheDocument();
    expect(highThresholdInput.value).toBe('300');
    expect(lowThresholdInput.value).toBe('60');
  });

  it('should update high threshold value when input is changed', () => {
    const highThresholdInput = screen.getByLabelText('High Threshold:');
    fireEvent.change(highThresholdInput, { target: { value: '400' } });
    expect(highThresholdInput.value).toBe('300');
    expect(setHighThreshold).toHaveBeenCalledWith('400');
  });

  it('should update low threshold value when input is changed', () => {
    const lowThresholdInput = screen.getByLabelText('Low Threshold:');
    fireEvent.change(lowThresholdInput, { target: { value: '50' } });
    expect(lowThresholdInput.value).toBe('60');
    expect(setLowThreshold).toHaveBeenCalledWith('50');
  });

  it('should call handleUpdateUserSettings when save button is clicked', () => {
    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);
  });

  it('should fetch user settings and set high and low thresholds', async () => {
    // Mock the Redux selector
    useSelector.mockImplementation(() => 'user123');

    // Mock the fetch call
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        high_threshold: 400,
        low_threshold: 100,
      }),
    });

    // Mock the setHighThreshold and setLowThreshold functions
    const setHighThreshold = jest.fn();
    const setLowThreshold = jest.fn();

    await act(async () => {
      render(
        <WarningThresholds
          lowThreshold={60}
          setLowThreshold={setLowThreshold}
          highThreshold={300}
          setHighThreshold={setHighThreshold}
        />
      );
    });

    // Wait for the fetch call to resolve
    await waitFor(() => {
      // Assert that the setHighThreshold and setLowThreshold functions were called with the correct values
      expect(setHighThreshold).toHaveBeenCalledWith(400);
      expect(setLowThreshold).toHaveBeenCalledWith(100);
    });
  });
});
