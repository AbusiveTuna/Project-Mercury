import { SmartAlert, glucoseStatus, glucoseSeverity, timeSeverity, glucoseDiscrepancy, trendSeverity } from '../../utils/SmartAlert';

describe('glucoseStatus', () => {
  /* 
  * Test Name: Low Data Alert
  * Unit Test ID: CUT 18
  * Description: Tests alert level for low data
  */
  it('should return low when blood sugar is below low threshold', () => {
    expect(glucoseStatus(50, 70, 300)).toBe('low');
  });

  /* 
  * Test Name: Severe Data Alert
  * Unit Test ID: CUT 19
  * Description: Tests alert level for high data
  */
  it('should return high when blood sugar is above high threshold', () => {
    expect(glucoseStatus(310, 70, 300)).toBe('high');
  });

  /* 
  * Test Name: Mixed data alert trend
  * Unit Test ID: CUT 20
  * Description: Tests alert level for normal data
  */
  it('should return normal when blood sugar is within range', () => {
    expect(glucoseStatus(100, 70, 300)).toBe('normal');
  });
});

describe('glucoseSeverity', () => {
    /* 
    * Test Name: Severe Data Alert
    * Unit Test ID: CUT 44
    * Description: Tests Severity level calculation
    */
  it('should return severity level based on discrepancy', () => {
    expect(glucoseSeverity(50)).toBe(4);
    expect(glucoseSeverity(30)).toBe(3);
    expect(glucoseSeverity(20)).toBe(2);
    expect(glucoseSeverity(10)).toBe(1);
    expect(glucoseSeverity(5)).toBe(-1);
  });
});

describe('timeSeverity', () => {
    /* 
    * Test Name: Nighttime Severity
    * Unit Test ID: CUT 45
    * Description: Tests severity calculation for nighttime
    */
  it('should return 1 if the time is between 22 and 6', () => {
    expect(timeSeverity(new Date('2023-08-06T23:00:00'))).toBe(1);
    expect(timeSeverity(new Date('2023-08-06T05:00:00'))).toBe(1);
  });

    /* 
    * Test Name: Daytime Severity
    * Unit Test ID: CUT 46
    * Description: Tests severity calculation for daytime
    */
  it('should return 0 if the time is outside 22 and 6', () => {
    expect(timeSeverity(new Date('2023-08-06T10:00:00'))).toBe(0);
  });
});

  /* 
    * Test Name: Low and High Status discrepancy
    * Unit Test ID: CUT 47
    * Description: Tests discrepancy calculation for low and high status
    */
describe('glucoseDiscrepancy', () => {
  it('should return the discrepancy for low and high status', () => {
    expect(glucoseDiscrepancy(50, 'low', 70, 300)).toBe(20);
    expect(glucoseDiscrepancy(310, 'high', 70, 300)).toBe(10);
  });

    /* 
    * Test Name: Normal Status discrepancy
    * Unit Test ID: CUT 48
    * Description: Tests discrepancy calculation for normal status
    */
  it('should return -1 for normal status', () => {
    expect(glucoseDiscrepancy(100, 'normal', 70, 300)).toBe(-1);
  });
});

describe('trendSeverity', () => {

    /* 
    * Test Name: Trend Severity Calculation
    * Unit Test ID: CUT 49
    * Description: Tests trend severity calculation
    */
  it('should return severity based on trend and status', () => {
    expect(trendSeverity('fortyFiveDown', 'low')).toBe(1);
    expect(trendSeverity('doubleUp', 'high')).toBe(3);
    expect(trendSeverity('flat', 'normal')).toBe(0);
  });

    
    /* 
    * Test Name: Extreme Trends low
    * Unit Test ID: CUT 50
    * Description: Tests extreme trend calculation for low status
    */
    it('should return severity for low status with different trends', () => {
      expect(trendSeverity('singleDown', 'low')).toBe(2);
      expect(trendSeverity('doubleDown', 'low')).toBe(3);
      expect(trendSeverity('singleUp', 'low')).toBe(-1);
      expect(trendSeverity('doubleUp', 'low')).toBe(-2);
    });
  
    
    /* 
    * Test Name: Extreme Trends high
    * Unit Test ID: CUT 51
    * Description: Tests extreme trend calculation for high status
    */
    it('should return severity for high status with different trends', () => {
      expect(trendSeverity('singleDown', 'high')).toBe(-1);
      expect(trendSeverity('doubleDown', 'high')).toBe(-2);
      expect(trendSeverity('singleUp', 'high')).toBe(2);
      expect(trendSeverity('doubleUp', 'high')).toBe(3);
    });
  
    /* 
    * Test Name: Normal Trend
    * Unit Test ID: CUT 52
    * Description: Tests normal trend calculation
    */
    it('should return 0 for normal status', () => {
      expect(trendSeverity('fortyFiveDown', 'normal')).toBe(0);
      expect(trendSeverity('doubleUp', 'normal')).toBe(0);
    });

});

describe('SmartAlert', () => {
  /* 
  * Test Name: Severe Trend Calculation
  * Unit Test ID: CUT 53
  * Description: Tests a severe trend calculation
  */
  it('should return total factor for given parameters', () => {
    const lastLevel = 50;
    const lastTrend = 'fortyFiveDown';
    const lowThreshold = 70;
    const highThreshold = 300;
    const checkedDevices = [];
    const currentTime = new Date('2023-08-06T23:00:00');

    expect(SmartAlert(lastLevel, lastTrend, lowThreshold, highThreshold, checkedDevices, currentTime)).toBe(4);
  });
});
