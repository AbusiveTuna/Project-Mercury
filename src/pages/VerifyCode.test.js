import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import VerifyCode from './VerifyCode';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

jest.mock('./css/VerifyCode.css', () => ({}));

test('VerifyCode Page Render', () => {
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
