import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import Register from './Register';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

jest.mock('./css/Register.css', () => ({}));

test('Register Page Render', () => {
    act(() => {
        render(
          <MemoryRouter>
            <Register />
          </MemoryRouter>
        );
      });
  const usernameInput = screen.getByPlaceholderText('Enter Username');
  const emailInput = screen.getByPlaceholderText('Enter Email');
  const confirmEmailInput = screen.getByPlaceholderText('Confirm Email');
  const passwordInput = screen.getByPlaceholderText('Enter Password');
  const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');
  const birthDateInput = screen.getByPlaceholderText('Enter Birth Date');
  const signUpButton = screen.getByText('Sign Up');

  expect(usernameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(confirmEmailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(confirmPasswordInput).toBeInTheDocument();
  expect(birthDateInput).toBeInTheDocument();
  expect(signUpButton).toBeInTheDocument();
});

test('Email Mismatch', () => {
    act(() => {
        render(
          <MemoryRouter>
            <Register />
          </MemoryRouter>
        );
      });
  const emailInput = screen.getByPlaceholderText('Enter Email');
  const confirmEmailInput = screen.getByPlaceholderText('Confirm Email');

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(confirmEmailInput, { target: { value: 'mismatch@example.com' } });

  expect(emailInput).toHaveClass('mismatch');
  expect(confirmEmailInput).toHaveClass('mismatch');
});

test('Password Mismatch', () => {
    act(() => {
        render(
          <MemoryRouter>
            <Register />
          </MemoryRouter>
        );
      });
  const passwordInput = screen.getByPlaceholderText('Enter Password');
  const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');

  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  fireEvent.change(confirmPasswordInput, { target: { value: 'mismatch123' } });

  expect(passwordInput).toHaveClass('mismatch');
  expect(confirmPasswordInput).toHaveClass('mismatch');
});