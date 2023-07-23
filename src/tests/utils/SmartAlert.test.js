import SmartAlert from '../../utils/SmartAlert';


describe('SmartAlert', () => {

    /* 
    * Test Name: Normal Data Alert
    * Unit Test ID: CUT18
    * Description: Tests alert level for normal data
    */

  it('should return the correct alert level for normal data', () => {
    const data = [
      { displayTime: '2023-07-23T08:00:00', value: 100, trend: 'singleDown' },
      { displayTime: '2023-07-23T08:15:00', value: 90, trend: 'flat' },
      { displayTime: '2023-07-23T08:30:00', value: 80, trend: 'singleUp' },
    ];

    const alertLevel = SmartAlert(data);
    expect(alertLevel).toBe(1); // Lowest alert level for normal data
  });

    /* 
    * Test Name: Severe Data Alert
    * Unit Test ID: CUT19
    * Description: Tests alert level for severe data
    */

  it('should return the correct alert level for severe data', () => {
    const data = [
      { displayTime: '2023-07-23T08:00:00', value: 30, trend: 'doubleDown' },
      { displayTime: '2023-07-23T08:15:00', value: 35, trend: 'fortyFiveDown' },
      { displayTime: '2023-07-23T08:30:00', value: 40, trend: 'singleDown' },
    ];

    const alertLevel = SmartAlert(data);
    expect(alertLevel).toBe(5); // Highest alert level for severe data
  });

    /* 
    * Test Name: Mixed data alert trend
    * Unit Test ID: CUT20
    * Description: Tests alert level for mixed data
    */

  it('should return the correct alert level for mixed data', () => {
    const data = [
      { displayTime: '2023-07-23T08:00:00', value: 70, trend: 'doubleDown' },
      { displayTime: '2023-07-23T08:15:00', value: 80, trend: 'singleDown' },
      { displayTime: '2023-07-23T08:30:00', value: 50, trend: 'singleUp' },
    ];

    const alertLevel = SmartAlert(data);
    expect(alertLevel).toBe(4); // Alert level for mixed data
  });
});
