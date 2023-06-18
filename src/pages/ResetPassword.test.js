import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import ResetPassword from './ResetPassword';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

jest.mock('./css/ResetPassword.css', () => ({}));

test('ResetPassword Page Render', () => {
    act(() => {
        render(
          <MemoryRouter>
            <ResetPassword />
          </MemoryRouter>
        );
      });
  const emailInput = screen.getByPlaceholderText('Enter Email');
  const passwordInput = screen.getByPlaceholderText('Enter New Password');
  const resetPasswordButton = screen.getByText('Reset Password');

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(resetPasswordButton).toBeInTheDocument();
});

test('Successful Password Reset', () => {
    act(() => {
        render(
          <MemoryRouter>
            <ResetPassword />
          </MemoryRouter>
        );
      });
      
  const emailInput = screen.getByPlaceholderText('Enter Email');
  const passwordInput = screen.getByPlaceholderText('Enter New Password');
  const resetPasswordButton = screen.getByText('Reset Password');

  // Mock the fetch function
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ message: 'success' }),
    })
  );

  fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
  fireEvent.change(passwordInput, { target: { value: 'newpassword' } });

  fireEvent.click(resetPasswordButton);

  // Check if the fetch function was called with the correct arguments
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

test('Failed Password Reset', async () => {
    act(() => {
        render(
          <MemoryRouter>
            <ResetPassword />
          </MemoryRouter>
        );
      });
  const emailInput = screen.getByPlaceholderText('Enter Email');
  const passwordInput = screen.getByPlaceholderText('Enter New Password');
  const resetPasswordButton = screen.getByText('Reset Password');

  // Mock the fetch function to simulate an error response
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: false,
      json: () => Promise.resolve({ message: 'An error occurred while resetting the password' }),
    })
  );

  fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
  fireEvent.change(passwordInput, { target: { value: 'newpassword' } });

  fireEvent.click(resetPasswordButton);

  const errorMessage = await screen.findByText('An error occurred while resetting the password');
  expect(errorMessage).toBeInTheDocument();
});
