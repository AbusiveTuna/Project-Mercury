import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import LoginPage from './LoginPage';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

jest.mock('./css/LoginPage.css', () => ({}));

test('Login Page Render', () => {
    act(() => {
        render(
          <MemoryRouter>
            <LoginPage />
          </MemoryRouter>
        );
      });
  const usernameInput = screen.getByPlaceholderText('Username');
  const passwordInput = screen.getByPlaceholderText('Password');
  const loginButton = screen.getByText('Login');

  expect(usernameInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
});

test('Successful Login', () => {
    act(() => {
        render(
          <MemoryRouter>
            <LoginPage />
          </MemoryRouter>
        );
      });
  const usernameInput = screen.getByPlaceholderText('Username');
  const passwordInput = screen.getByPlaceholderText('Password');
  const loginButton = screen.getByText('Login');

  // Mock the fetch function
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ token: 'mockToken' }),
    })
  );

  fireEvent.change(usernameInput, { target: { value: 'testuser' } });
  fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

  fireEvent.click(loginButton);

  // Check if the fetch function was called with the correct arguments
  expect(fetch).toHaveBeenCalledWith(
    'https://protected-badlands-72029.herokuapp.com/login',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: 'testuser', password: 'testpassword' }),
    }
  );
});

test('Invalid Login', async () => {
    act(() => {
        render(
          <MemoryRouter>
            <LoginPage />
          </MemoryRouter>
        );
      });
  const usernameInput = screen.getByPlaceholderText('Username');
  const passwordInput = screen.getByPlaceholderText('Password');
  const loginButton = screen.getByText('Login');

  // Mock the fetch function to simulate an error response
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: false,
    })
  );

  fireEvent.change(usernameInput, { target: { value: 'testuser' } });
  fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

  fireEvent.click(loginButton);

  const errorMessage = await screen.findByText('Invalid username or password');
  expect(errorMessage).toBeInTheDocument();
});
