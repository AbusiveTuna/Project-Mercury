import { SmartAlert, glucoseStatus, glucoseSeverity, timeSeverity, glucoseDiscrepancy, trendSeverity } from '../../utils/SmartAlert';

describe('glucoseStatus', () => {
  it('should return low when blood sugar is below low threshold', () => {
    expect(glucoseStatus(50, 70, 300)).toBe('low');
  });

  it('should return high when blood sugar is above high threshold', () => {
    expect(glucoseStatus(310, 70, 300)).toBe('high');
  });

  it('should return normal when blood sugar is within range', () => {
    expect(glucoseStatus(100, 70, 300)).toBe('normal');
  });
});

describe('glucoseSeverity', () => {
  it('should return severity level based on discrepancy', () => {
    expect(glucoseSeverity(50)).toBe(4);
    expect(glucoseSeverity(30)).toBe(3);
    expect(glucoseSeverity(20)).toBe(2);
    expect(glucoseSeverity(10)).toBe(1);
    expect(glucoseSeverity(5)).toBe(-1);
  });
});

describe('timeSeverity', () => {
  it('should return 1 if the time is between 22 and 6', () => {
    expect(timeSeverity(new Date('2023-08-06T23:00:00'))).toBe(1);
    expect(timeSeverity(new Date('2023-08-06T05:00:00'))).toBe(1);
  });

  it('should return 0 if the time is outside 22 and 6', () => {
    expect(timeSeverity(new Date('2023-08-06T10:00:00'))).toBe(0);
  });
});

describe('glucoseDiscrepancy', () => {
  it('should return the discrepancy for low and high status', () => {
    expect(glucoseDiscrepancy(50, 'low', 70, 300)).toBe(20);
    expect(glucoseDiscrepancy(310, 'high', 70, 300)).toBe(10);
  });

  it('should return -1 for normal status', () => {
    expect(glucoseDiscrepancy(100, 'normal', 70, 300)).toBe(-1);
  });
});

describe('trendSeverity', () => {
  it('should return severity based on trend and status', () => {
    expect(trendSeverity('fortyFiveDown', 'low')).toBe(1);
    expect(trendSeverity('doubleUp', 'high')).toBe(3);
    expect(trendSeverity('flat', 'normal')).toBe(0);
  });
});

describe('SmartAlert', () => {
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
