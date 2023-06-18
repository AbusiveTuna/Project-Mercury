import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import Register from './Register';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { faker } from '@faker-js/faker';

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

test('Submit Form', async () => {
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

  const username = faker.internet.userName();
  const email = faker.internet.email();
  const password = faker.internet.password();
  const birthDate = '01-01-1990';

  fireEvent.change(usernameInput, { target: { value: username } });
  fireEvent.change(emailInput, { target: { value: email } });
  fireEvent.change(confirmEmailInput, { target: { value: email } });
  fireEvent.change(passwordInput, { target: { value: password } });
  fireEvent.change(confirmPasswordInput, { target: { value: password } });
  fireEvent.change(birthDateInput, { target: { value: birthDate } });

  fireEvent.click(signUpButton);

  await waitFor(() => {
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  expect(fetch).toHaveBeenCalledWith('https://protected-badlands-72029.herokuapp.com/addUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      email: email,
      password: password,
      birthdate: birthDate
    })
  });

  expect(usernameInput).toHaveValue('');
  expect(emailInput).toHaveValue('');
  expect(confirmEmailInput).toHaveValue('');
  expect(passwordInput).toHaveValue('');
  expect(confirmPasswordInput).toHaveValue('');
  expect(birthDateInput).toHaveValue('');
});
