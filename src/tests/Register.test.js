import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import Register from '../pages/Register';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { faker } from '@faker-js/faker';

jest.mock('../pages/css/Register.css', () => ({}));

beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({}),
    })
  );
});


afterEach(() => {
  jest.clearAllMocks();
});

/* 
* Test Name: Register Page Render
* Unit Test ID: UT4
* Description: Tests rendering of the Register.js page
*/
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

/* 
* Test Name: Email Mismatch
* Unit Test ID: UT5
* Description: Tests that mismatching emails prevent submission of form
*/
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

/* 
* Test Name: Password Mismatch
* Unit Test ID: UT6
* Description: Tests that mismatching passwords prevent submission of form
*/
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

/* 
* Test Name: Submit Form
* Unit Test ID: UT7
* Description: Tests valid and complete form submission of user registration
*/
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
  const birthDate = '1990-01-01';

  await act(async () => {
    fireEvent.change(usernameInput, { target: { value: username } });
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(confirmEmailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });
    fireEvent.change(confirmPasswordInput, { target: { value: password } });
    fireEvent.change(birthDateInput, { target: { value: birthDate } });

    await new Promise((r) => setTimeout(r, 100));
  });
  
  fireEvent.click(signUpButton);

  await waitFor(() => {
    expect(fetch).toHaveBeenCalledTimes(1);
  }, { timeout: 4000 });
  

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
});

/* 
* Test Name: Reset Form
* Unit Test ID: UT17
* Description: Tests resetting of the form on event
*/
test('Reset Form', async () => {
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
  const resetButton = screen.getByText('Reset');

  const username = faker.internet.userName();
  const email = faker.internet.email();

  await act(async () => {
    fireEvent.change(usernameInput, { target: { value: username } });
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(confirmEmailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password' } });
    fireEvent.change(birthDateInput, { target: { value: '1990-01-01' } });

    await new Promise((r) => setTimeout(r, 100));
  });

  fireEvent.click(resetButton);

  await waitFor(() => {
    expect(usernameInput).toHaveValue('');
    expect(emailInput).toHaveValue('');
    expect(confirmEmailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
    expect(confirmPasswordInput).toHaveValue('');
    expect(birthDateInput).toHaveValue('');
  });
});

/* 
* Test Name: Check username availability
* Unit Test ID: UT18
* Description: Tests the username lookup availability functionality
*/
test('Check Username Availability', async () => {
  act(() => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
  });

  const usernameInput = screen.getByPlaceholderText('Enter Username');
  
  await act(async () => {
    fireEvent.change(usernameInput, { target: { value: 'usernameAval' } });
    await new Promise((r) => setTimeout(r, 100));
  });

  fireEvent.blur(usernameInput);

  await waitFor(() => {
    expect(fetch).toHaveBeenCalledWith('https://protected-badlands-72029.herokuapp.com/checkUsernameAvailability/usernameAval');
  });
});

/* 
* Test Name: Username availability server error
* Unit Test ID: UT19
* Description: Tests error handling for username lookup
*/

test('Test error handling in checkUsernameAvailability', async () => {
  global.fetch = jest.fn(() =>
    Promise.reject('Fetch error occurred')
  );

  act(() => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
  });

  const usernameInput = screen.getByPlaceholderText('Enter Username');

  await act(async () => {
    fireEvent.change(usernameInput, { target: { value: 'username' } });
    await new Promise((r) => setTimeout(r, 100));
  });

  fireEvent.blur(usernameInput);

  await waitFor(() => {
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
