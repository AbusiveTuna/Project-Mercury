import React from 'react';
import { render, screen } from '@testing-library/react';
import DexcomRedirect from './DexcomRedirect';
import Cookies from 'js-cookie';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

jest.mock('js-cookie');

describe('DexcomRedirect', () => {
  it('renders Redirecting... text', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <DexcomRedirect />
      </Router>
    );
    expect(screen.getByText('Redirecting...')).toBeInTheDocument();
  });

  it('renders error message when state does not match expected state', () => {
    const history = createMemoryHistory();
    history.push('/?state=wrongState');
    Cookies.get.mockReturnValueOnce('user_id').mockReturnValueOnce('dexcomState');
    render(
      <Router history={history}>
        <DexcomRedirect />
      </Router>
    );
    expect(screen.getByText('State mismatch error')).toBeInTheDocument();
  });

  it('renders error message when no auth code is found', () => {
    const history = createMemoryHistory();
    history.push('/?state=dexcomState');
    Cookies.get.mockReturnValueOnce('user_id').mockReturnValueOnce('dexcomState');
    render(
      <Router history={history}>
        <DexcomRedirect />
      </Router>
    );
    expect(screen.getByText('No auth code found')).toBeInTheDocument();
  });
});
