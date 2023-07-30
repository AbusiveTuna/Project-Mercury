import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Settings from '../../components/Settings';
import '@testing-library/jest-dom/extend-expect';

// Mock the DexcomSensorInfo component
jest.mock('../../components/DexcomSensorInfo', () => () => <div>DexcomSensorInfo</div>);

describe('Settings', () => {

  /* 
  * Test Name: Open sidebar
  * Unit Test ID: CUT15
  * Description: Tests sidebar logic when open
  */
  it('should render sidebar when isSidebarOpen is true', () => {
    render(<Settings isSidebarOpen={true} setSidebarOpen={() => {}} />);
    const sidebar = screen.getByTestId('sidebar');
    expect(sidebar).toHaveClass('open');
  });

  /* 
  * Test Name: Closed sidebar Logic
  * Unit Test ID: CUT16
  * Description: Tests sidebar logic when closed
  */

  it('should not render sidebar when isSidebarOpen is false', () => {
    render(<Settings isSidebarOpen={false} setSidebarOpen={() => {}} />);
    const sidebar = screen.getByTestId('sidebar');
    expect(sidebar).not.toHaveClass('open');
  });

  /* 
  * Test Name: Close Sidebar
  * Unit Test ID: CUT17
  * Description: Tests closing sidebar logic
  */

  it('should call setSidebarOpen(false) when close button is clicked', () => {
    const setSidebarOpenMock = jest.fn();
    render(<Settings isSidebarOpen={true} setSidebarOpen={setSidebarOpenMock} />);
    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);
    expect(setSidebarOpenMock).toHaveBeenCalledWith(false);
  });
});
