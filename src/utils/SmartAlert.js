export const SmartAlert = (data) => {
  const trendSeverity = {
    'doubleUp': 3,
    'singleUp': 2,
    'fortyFiveUp': 1,
    'flat': 0,
    'fortyFiveDown': -1,
    'singleDown': -2,
    'doubleDown': -3,
  };

  const timeSeverity = (displayTime) => {
    const hours = new Date(displayTime).getHours();
    return hours >= 22 || hours < 6 ? 1 : 0;
  };

  const glucoseSeverity = (value) => {
    if (value <= 40) {
      return -5;
    } else if (value <= 50) {
      return -4;
    } else if (value <= 60) {
      return -3;
    } else if (value <= 70) {
      return -2;
    } else if (value <= 75) {
      return -1;
    } else {
      return 0; //Normal level
    }
  };

  let severitySum = 0;

  data.forEach(item => {
    severitySum += trendSeverity[item.trend] + timeSeverity(item.displayTime) + glucoseSeverity(item.value);
  });

  const averageSeverity = severitySum / data.length;

  if (averageSeverity <= -4) {
    return 5; //highest alert level
  } else if (averageSeverity <= -3) {
    return 4;
  } else if (averageSeverity <= -2) {
    return 3;
  } else if (averageSeverity <= -1) {
    return 2;
  } else {
    return 1; //lowest alert level
  }
};

export default SmartAlert;
