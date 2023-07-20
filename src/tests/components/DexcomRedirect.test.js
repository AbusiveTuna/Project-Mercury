import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DexcomRedirect from '../../components/DexcomRedirect'
import Cookies from 'js-cookie';
import { MemoryRouter } from 'react-router-dom';

console.log(Cookies);
jest.mock('js-cookie');
console.log(Cookies);
describe('DexcomRedirect', () => {
  it('renders Redirecting... text', () => {
    render(
      <MemoryRouter>
        <DexcomRedirect />
      </MemoryRouter>
    );
    expect(screen.getByText('Redirecting...')).toBeInTheDocument();
  });

  it('renders error message when state does not match expected state', () => {
    Cookies.get.mockReturnValueOnce('user_id').mockReturnValueOnce('dexcomState');
    render(
      <MemoryRouter initialEntries={['/?state=wrongState']}>
        <DexcomRedirect />
      </MemoryRouter>
    );
    expect(screen.getByText('State mismatch error')).toBeInTheDocument();
  });

  it('renders error message when no auth code is found', () => {
    Cookies.get
      .mockImplementation((key) => {
        console.log(`Cookies.get('${key}') called`);
        return key === 'user_id' ? 'user_id' : 'dexcomState';
      });
    render(
      <MemoryRouter initialEntries={['/?state=dexcomState']}>
        <DexcomRedirect />
      </MemoryRouter>
    );
    expect(screen.getByText('No auth code found')).toBeInTheDocument();
  });
  

  
});
