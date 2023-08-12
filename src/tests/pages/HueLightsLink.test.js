import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import HueLightsLink from '../../pages/HueLightsLink';
import { useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

// Mocking the useNavigate hook
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

const mockStore = configureMockStore();
const store = mockStore({
  user_id: '13',
});

describe('HueLightsLink', () => {
  let navigate;

  beforeEach(() => {
    navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);
  });

  /* 
  * Test Name: HueLightsLink Page Render
  * Unit Test ID: UT24
  * Description: Tests rendering of HueLightsLink.js
  */
  it('should render without errors', () => {
    const { getByText, getByLabelText } = render(
      <Provider store={store}>
        <HueLightsLink />
      </Provider>
    );
    
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
    const { getByText, getByLabelText } = render(
      <Provider store={store}>
        <HueLightsLink />
      </Provider>
    );
    const ipAddressInput = getByLabelText('IP Address:');

    fireEvent.change(ipAddressInput, { target: { value: '192.168.0.1' } });

    expect(ipAddressInput.value).toBe('192.168.0.1');
  });

  /* 
  * Test Name: Test Successful HueLightsLink Form Submission
  * Unit Test ID: UT26
  * Description: Tests successful HueLightsLink form submission
  */
  it('should handle successful form submission', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () => Promise.resolve([{ success: { username: 'username', clientkey: 'clientkey' } }]),
    }).mockResolvedValueOnce({
      json: () => Promise.resolve({ message: 'Authenticated successfully' }),
    });

    const { getByText, getByLabelText } = render(
      <Provider store={store}>
        <HueLightsLink />
      </Provider>
    );
    const ipAddressInput = getByLabelText('IP Address:');
    const submitButton = getByText('Submit');

    fireEvent.change(ipAddressInput, { target: { value: '192.168.0.1' } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));
    expect(navigate).toHaveBeenCalledWith("/dashboard");
  });

  /* 
  * Test Name: Test Failed HueLightsLink Form Submission
  * Unit Test ID: UT28
  * Description: Tests failed HueLightsLink form submission when Link Button not pressed on bridge
  */
  it('should handle failed form submission when Link Button not pressed on bridge', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () => Promise.resolve([{ error: { type: 101 } }]),
    });

    const { getByText, getByLabelText } = render(
      <Provider store={store}>
        <HueLightsLink />
      </Provider>
    );
    const ipAddressInput = getByLabelText('IP Address:');
    const submitButton = getByText('Submit');

    fireEvent.change(ipAddressInput, { target: { value: '192.168.0.1' } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
  });

});
