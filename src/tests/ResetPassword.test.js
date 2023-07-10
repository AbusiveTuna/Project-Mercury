import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import ResetPassword from '../pages/ResetPassword';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../pages/css/ResetPassword.css', () => ({}));

beforeEach(() => {
  Object.defineProperty(window, 'localStorage', {
      value: {
          getItem: jest.fn(() => 'test@test.com'),
          setItem: jest.fn(() => null),
          removeItem: jest.fn(() => null),
      },
      writable: true
  });
});

afterEach(() => {
  window.localStorage.getItem.mockClear();
  window.localStorage.setItem.mockClear();
  window.localStorage.removeItem.mockClear();
});

/* 
* Test Name: Reset Password Page Render
* Unit Test ID: UT14
* Description: Tests rendering of ResetPassword.js
*/
test('Reset Password Page Render', () => {
    act(() => {
        render(
          <MemoryRouter>
            <ResetPassword />
          </MemoryRouter>
        );
      });
  const passwordInput = screen.getByPlaceholderText('Enter New Password');
  const resetPasswordButton = screen.getByText('Reset Password');

  expect(passwordInput).toBeInTheDocument();
  expect(resetPasswordButton).toBeInTheDocument();
});

/* 
* Test Name: Successful Password Reset 
* Unit Test ID: UT15
* Description: Tests when a valid password reset has occured
*/
test('Successful Password Reset', () => {
    act(() => {
        render(
          <MemoryRouter>
            <ResetPassword />
          </MemoryRouter>
        );
      });
      
  const passwordInput = screen.getByPlaceholderText('Enter New Password');
  const resetPasswordButton = screen.getByText('Reset Password');

  // Mock the fetch function
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ message: 'success' }),
    })
  );

  fireEvent.change(passwordInput, { target: { value: 'newpassword' } });

  fireEvent.click(resetPasswordButton);

  expect(fetch).toHaveBeenCalledWith(
    'https://protected-badlands-72029.herokuapp.com/resetPassword',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: 'test@test.com', newPassword: 'newpassword' }),
    }
  );
});

/* 
* Test Name: Unsuccessful Password Reset 
* Unit Test ID: UT16
* Description: Tests when a password reset was unsuccessful
*/
test('Failed Password Reset', async () => {
    act(() => {
        render(
          <MemoryRouter>
            <ResetPassword />
          </MemoryRouter>
        );
      });
  const passwordInput = screen.getByPlaceholderText('Enter New Password');
  const resetPasswordButton = screen.getByText('Reset Password');

  // Mock the fetch function to simulate an error response
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: false,
      json: () => Promise.resolve({ message: 'An error occurred while resetting the password' }),
    })
  );


  fireEvent.change(passwordInput, { target: { value: 'newpassword' } });

  fireEvent.click(resetPasswordButton);

  const errorMessage = await screen.findByText('An error occurred while resetting the password');
  expect(errorMessage).toBeInTheDocument();
});
