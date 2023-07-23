import React from 'react';
import { render } from '@testing-library/react';
import CurrentBG from '../../components/CurrentBG';
import '@testing-library/jest-dom';


describe('CurrentBG', () => {

  /* 
  * Test Name: Default Trend
  * Unit Test ID: CUT5
  * Description: Tests Default Trend
  */

  it('should render correctly with default props', () => {
    const { getByText } = render(<CurrentBG level={120} trend='flat' />);

    const levelElement = getByText('120');
    expect(levelElement).toBeInTheDocument();
  });

  /* 
  * Test Name: Single Down Trend
  * Unit Test ID: CUT6
  * Description: Tests Single Down Trend
  */

  it('should rotate correctly with singleDown trend', () => {
    const { container } = render(<CurrentBG level={150} trend='singleDown' />);
    const imgElement = container.querySelector('img');
    expect(imgElement).toHaveStyle({ transform: 'rotate(0deg)' });
  });

  /* 
  * Test Name: SingleUp Trend
  * Unit Test ID: CUT7
  * Description: Tests SingleUp Trend
  */

  it('should rotate correctly with singleUp trend', () => {
    const { container } = render(<CurrentBG level={180} trend='singleUp' />);
    const imgElement = container.querySelector('img');
    expect(imgElement).toHaveStyle({ transform: 'rotate(180deg)' });
  });

  /* 
  * Test Name: FortyFiveUp Trend
  * Unit Test ID: CUT8
  * Description: Tests FortyFiveUp Trend
  */

  it('should rotate correctly with fortyFiveUp trend', () => {
    const { container } = render(<CurrentBG level={200} trend='fortyFiveUp' />);
    const imgElement = container.querySelector('img');
    expect(imgElement).toHaveStyle({ transform: 'rotate(245deg)' });
  });

  /* 
  * Test Name: FortyFiveDown Trend
  * Unit Test ID: CUT9
  * Description: Tests FortyFiveDown Trend
  */

  it('should rotate correctly with fortyFiveDown trend', () => {
    const { container } = render(<CurrentBG level={220} trend='fortyFiveDown' />);
    const imgElement = container.querySelector('img');
    expect(imgElement).toHaveStyle({ transform: 'rotate(300deg)' });
  });

  /* 
  * Test Name: Flat Trend
  * Unit Test ID: CUT10
  * Description: Tests Flat Trend
  */

  it('should rotate correctly with flat trend', () => {
    const { container } = render(<CurrentBG level={240} trend='flat' />);
    const imgElement = container.querySelector('img');
    expect(imgElement).toHaveStyle({ transform: 'rotate(270deg)' });
  });

  /* 
  * Test Name: Double Down Trend
  * Unit Test ID: CUT11
  * Description: Tests double down trend
  */

  it('should rotate correctly with doubleDown trend', () => {
    const { container } = render(<CurrentBG level={260} trend='doubleDown' />);
    const imgElement = container.querySelector('img');
    expect(imgElement).toHaveStyle({ transform: 'rotate(0deg)' });
  });

  /* 
  * Test Name: Double Up Trend
  * Unit Test ID: CUT12
  * Description: Tests Double Up Trend
  */

  it('should rotate correctly with doubleUp trend', () => {
    const { container } = render(<CurrentBG level={280} trend='doubleUp' />);
    const imgElement = container.querySelector('img');
    expect(imgElement).toHaveStyle({ transform: 'rotate(180deg)' });
  });

});
