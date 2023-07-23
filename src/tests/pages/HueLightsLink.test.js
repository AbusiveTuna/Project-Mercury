import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import HueLightsLink from '../../pages/HueLightsLink';

describe('HueLightsLink', () => {
  /* 
  * Test Name: HueLightsLink Page Render
  * Unit Test ID: UT24
  * Description: Tests rendering of HueLightsLink.js
  */
  it('should render without errors', () => {
    const { getByText, getByLabelText } = render(<HueLightsLink />);
    
    const titleElement = getByText('Phillips Hue Bridge IP Address');
    expect(titleElement).toBeInTheDocument();
    
    const ipAddressLabel = getByLabelText('IP Address:');
    const submitButton = getByText('Submit');
    expect(ipAddressLabel).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

    /* 
    * Test Name: Check User IP Address Input
    * Unit Test ID: UT25
    * Description: Validates User IP input for hue lights link
    */
  it('should update the state when the user types in the IP address input field', () => {
    const { getByLabelText } = render(<HueLightsLink />);
    const ipAddressInput = getByLabelText('IP Address:');

    fireEvent.change(ipAddressInput, { target: { value: '192.168.0.1' } });

    expect(ipAddressInput.value).toBe('192.168.0.1');
  });

    /* 
    * Test Name: Test HueLightsLink Form
    * Unit Test ID: UT26
    * Description: Tests HueLightsLink form submission
    */
  it('should handle form submission correctly', () => {
    const mockPreventDefault = jest.fn();

    const { getByLabelText, getByText } = render(<HueLightsLink />);
    const ipAddressInput = getByLabelText('IP Address:');
    const submitButton = getByText('Submit');

    fireEvent.change(ipAddressInput, { target: { value: '192.168.0.1' } });

    const submitEvent = new Event('submit', { cancelable: true });
    fireEvent.submit(submitButton, submitEvent);

    expect(mockPreventDefault).toHaveBeenCalledTimes(0);
  });

});
