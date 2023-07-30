import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import WarningThresholds from '../../components/WarningThresholds';
import '@testing-library/jest-dom/extend-expect';

describe('WarningThresholds', () => {
  /* 
  * Test Name: Render high and low threshold inputs
  * Unit Test ID: CUT21
  * Description: Tests rendering of high and low threshold inputs
  */
  it('should render high and low threshold inputs', () => {
    render(<WarningThresholds />);
    const highThresholdInput = screen.getByLabelText('High Threshold:');
    const lowThresholdInput = screen.getByLabelText('Low Threshold:');
    expect(highThresholdInput).toBeInTheDocument();
    expect(lowThresholdInput).toBeInTheDocument();
  });

  /* 
  * Test Name: Update high threshold value
  * Unit Test ID: CUT22
  * Description: Tests updating of high threshold value when input is changed
  */
  it('should update high threshold value when input is changed', () => {
    render(<WarningThresholds />);
    const highThresholdInput = screen.getByLabelText('High Threshold:');
    fireEvent.change(highThresholdInput, { target: { value: '400' } });
    expect(highThresholdInput.value).toBe('400');
  });

  /* 
  * Test Name: Update low threshold value
  * Unit Test ID: CUT23
  * Description: Tests updating of low threshold value when input is changed
  */
  it('should update low threshold value when input is changed', () => {
    render(<WarningThresholds />);
    const lowThresholdInput = screen.getByLabelText('Low Threshold:');
    fireEvent.change(lowThresholdInput, { target: { value: '50' } });
    expect(lowThresholdInput.value).toBe('50');
  });
});
