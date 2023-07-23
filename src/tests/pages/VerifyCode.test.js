import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import VerifyCode from '../../pages/VerifyCode';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../../pages/css/VerifyCode.css', () => ({}));

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
  jest.restoreAllMocks();
});

/* 
* Test Name: Verify Code Page Render
* Unit Test ID: UT11
* Description: Tests rendering of VerifyCode.js
*/
test('Verify Code Page Render', () => {
    act(() => {
        render(
          <MemoryRouter>
            <VerifyCode />
          </MemoryRouter>
        );
      });

  const codeInput = screen.getByPlaceholderText('Enter Code');
  const verifyButton = screen.getByText('Verify Code');

  expect(codeInput).toBeInTheDocument();
  expect(verifyButton).toBeInTheDocument();
});

/* 
* Test Name: Successful Code Verification 
* Unit Test ID: UT12
* Description: Tests code verification  logic
*/
test('Successful Code Verification', () => {
    act(() => {
        render(
          <MemoryRouter>
            <VerifyCode />
          </MemoryRouter>
        );
      });

  const codeInput = screen.getByPlaceholderText('Enter Code');
  const verifyButton = screen.getByText('Verify Code');

  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ message: 'success' }),
    })
  );

  fireEvent.change(codeInput, { target: { value: '123456' } });

  fireEvent.click(verifyButton);

  expect(fetch).toHaveBeenCalledWith(
    'https://protected-badlands-72029.herokuapp.com/verifyCode',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: 'test@test.com', code: '123456' }),
    }
  );
});

/* 
* Test Name: Unsuccessful Code Verification 
* Unit Test ID: UT13
* Description: Tests when an invalid code has been entered. 
*/
test('Failed Code Verification', async () => {
    act(() => {
        render(
          <MemoryRouter>
            <VerifyCode />
          </MemoryRouter>
        );
      });

  const codeInput = screen.getByPlaceholderText('Enter Code');
  const verifyButton = screen.getByText('Verify Code');

  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: false,
      json: () => Promise.resolve({ message: 'An error occurred during verification' }),
    })
  );

  fireEvent.change(codeInput, { target: { value: '123456' } });

  fireEvent.click(verifyButton);

  const errorMessage = await screen.findByText('An error occurred during verification');
  expect(errorMessage).toBeInTheDocument();
});
