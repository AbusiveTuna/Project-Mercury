import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, waitFor, act } from '@testing-library/react';
import BloodGlucoseGraph from '../../components/BloodGlucoseGraph';
import { Provider } from 'react-redux';
import store from '../../store';

jest.mock('react-chartjs-2', () => ({
  Line: () => <canvas data-testid="mocked-line" />,
}));

describe('BloodGlucoseGraph', () => {

  /* 
  * Test Name: Blood Glucose Graph Render
  * Unit Test ID: CUT1
  * Description: Tests rendering of BloodGlucoseGraph.js
  */
  it('should render without errors', async () => {
    const responseData = {
      ok: true,
      json: jest.fn().mockResolvedValue({
        records: [
          { displayTime: '2023-07-23T08:00:00', value: 120, trend: 'singleDown', trendRate: 2 },
          { displayTime: '2023-07-23T08:15:00', value: 130, trend: 'flat', trendRate: 0 },
        ],
      }),
    };

    global.fetch = jest.fn().mockResolvedValue(responseData);

    const { container } = render(
      <Provider store={store}>
        <BloodGlucoseGraph />
      </Provider>
    );
    const graphElement = container.querySelector('[data-testid="mocked-line"]');

    expect(graphElement).toBeInTheDocument();

  });

  /* 
  * Test Name: Error handling tests
  * Unit Test ID: CUT2
  * Description: Tests error handling for BloodGlucoseGraph Component
  */
  it('should handle fetch error gracefully', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Failed to fetch Dexcom data'));

    const { container, queryByText } = render(
      <Provider store={store}>
        <BloodGlucoseGraph />
      </Provider>
    );
    const graphElement = container.querySelector('canvas');

    // Wait for the error message to be displayed
    await waitFor(() => {
      expect(queryByText('Failed to fetch Dexcom data')).toBeInTheDocument();
    });

    expect(graphElement).not.toBeInTheDocument();
  });

});

/* 
* Test Name: Failed API response
* Unit Test ID: CUT3
* Description: Tests a failed API response
*/
it('should handle failed API response', async () => {
  global.fetch = jest.fn().mockRejectedValue(new Error('Failed to fetch Dexcom data'));

  await act(async () => {
    render(
      <Provider store={store}>
        <BloodGlucoseGraph />
      </Provider>
    );
  });
});

/* 
* Test Name: Successful API response
* Unit Test ID: CUT4
* Description: Tests a successful API response
*/
it('should handle successful API response', async () => {

  const responseData = {
    ok: true,
    json: jest.fn().mockResolvedValue({
      records: [
        { displayTime: '2023-07-23T08:00:00', value: 120, trend: 'singleDown', trendRate: 2 },
        { displayTime: '2023-07-23T08:15:00', value: 130, trend: 'flat', trendRate: 0 },
      ],
    }),
  };

  global.fetch = jest.fn().mockResolvedValue(responseData);

  await act(async () => {
    render(
      <Provider store={store}>
        <BloodGlucoseGraph />
      </Provider>
    );
  });

});