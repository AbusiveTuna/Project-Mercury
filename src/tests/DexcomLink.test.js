import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import DexcomLink from '../pages/DexcomLink';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store';
import 'source-map-support/register';
import '@testing-library/jest-dom/extend-expect';

jest.mock('js-cookie', () => ({
  __esModule: true,
  default: {
    set: jest.fn(),
  },
}));

jest.mock('../pages/css/DexcomLink.css', () => ({}));

/* 
* Test Name: DexcomLink Render
* Unit Test ID: UT22
* Description: Tests rendering of DexcomLink.js
*/
test('DexcomLink Render', () => {
  act(() => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <DexcomLink />
        </MemoryRouter>
      </Provider>
    );
  });

  const linkButton = screen.getByText('Link Dexcom');

  expect(linkButton).toBeInTheDocument();
});