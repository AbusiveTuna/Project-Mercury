import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import ForgotPassword from '../../pages/ForgotPassword';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../../pages/css/ForgotPassword.css', () => ({}));

afterEach(() => {
  jest.restoreAllMocks();
});

/* 
* Test Name: Forgot Password Page Render
* Unit Test ID: UT8
* Description: Tests rendering of ForgotPassword.js
*/
test('Forgot Password Page Render', () => {
    act(() => {
        render(
          <MemoryRouter>
            <ForgotPassword />
          </MemoryRouter>
        );
      });
  const emailInput = screen.getByPlaceholderText('Enter Email');
  const resetPasswordButton = screen.getByText('Reset Password');

  expect(emailInput).toBeInTheDocument();
  expect(resetPasswordButton).toBeInTheDocument();
});


/* 
* Test Name: Successful Password Reset Request
* Unit Test ID: UT9
* Description: Tests a valid password request has been sent to the server.
*/
test('Successful Password Reset Request', () => {
    act(() => {
        render(
          <MemoryRouter>
            <ForgotPassword />
          </MemoryRouter>
        );
      });
  const emailInput = screen.getByPlaceholderText('Enter Email');
  const resetPasswordButton = screen.getByText('Reset Password');

  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ message: 'success' }),
    })
  );

  fireEvent.change(emailInput, { target: { value: 'test@test.com' } });

  fireEvent.click(resetPasswordButton);

  expect(fetch).toHaveBeenCalledWith(
    'https://protected-badlands-72029.herokuapp.com/requestReset',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: 'test@test.com' }),
    }
  );
});

/* 
* Test Name: Failed Password Reset Request
* Unit Test ID: UT10
* Description: Tests an invalid password request has been sent to the server.
*/
test('Failed Password Reset Request', async () => {
    act(() => {
        render(
          <MemoryRouter>
            <ForgotPassword />
          </MemoryRouter>
        );
      });
  const emailInput = screen.getByPlaceholderText('Enter Email');
  const resetPasswordButton = screen.getByText('Reset Password');

  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: false,
      json: () => Promise.resolve({ message: 'An error occurred while requesting a password reset' }),
    })
  );

  fireEvent.change(emailInput, { target: { value: 'test@test.com' } });

  fireEvent.click(resetPasswordButton);

  const errorMessage = await screen.findByText('An error occurred while requesting a password reset');
  expect(errorMessage).toBeInTheDocument();
});
