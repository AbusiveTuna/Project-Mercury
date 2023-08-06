function glucoseStatus(bloodSugar, lowThreshold, highThreshold) {
  if (bloodSugar <= lowThreshold) {
    return 'low';
 } else if (bloodSugar >= highThreshold) {
    return 'high';
  } else {
    return 'normal';
  }
}

function glucoseSeverity(discrepancy) {
  if (discrepancy >= 40) {
    return 4;
  } else if (discrepancy >= 30) {
    return 3;
  } else if (discrepancy >= 20) {
    return 2;
  } else if (discrepancy >= 10) {
    return 1;
  } else {
    return -1;
  }
}

function timeSeverity(currentTime) {
    const hours = currentTime.getHours();
    return hours >= 22 || hours < 6 ? 1 : 0;
}

function glucoseDiscrepancy(bloodSugar,status,low,high){
    if (status === 'low') {
      return low - bloodSugar;
    } else if (status === 'high') {
      return bloodSugar - high;
    } else {
      return -1;
    }
}

function trendSeverity(trend,status){
  if(trend === 'flat'){
    return 0;
  }
  
  if(status === 'low'){
    switch(trend){
    //User is trending in the wrong direction.
      case 'fortyFiveDown':
        return 1;
      case 'singleDown':
        return 2;
      case 'doubleDown':
        return 3;
      //User is trending in the right direction
      case 'fortyFiveUp':
        return 0;
      case 'singleUp':
        return -1;
      case 'doubleUp':
        return -2;
      default:
        return 0;
    }
  }
    
  else if(status === "high"){
      switch(trend){
    //User is trending in the right direction.
      case 'fortyFiveDown':
        return 0;
      case 'singleDown':
        return -1;
      case 'doubleDown':
        return -2;
      //User is trending in the wrong direction
      case 'fortyFiveUp':
        return 1;
      case 'singleUp':
        return 2;
      case 'doubleUp':
        return 3;
      default:
        return 0;
    }
  }
    
  else{
    return 0;
  }
}

export const SmartAlert = (lastLevel, lastTrend, lowThreshold, highThreshold, checkedDevices, currentTime) => {

    let status = glucoseStatus(lastLevel, lowThreshold, highThreshold);
    let glucoseLevel = glucoseDiscrepancy(lastLevel,status,lowThreshold,highThreshold);
  
    let timeFactor = timeSeverity(currentTime);
    let glucoseFactor = glucoseSeverity(glucoseLevel);
    let trendFactor = trendSeverity(lastTrend,status);

    let totalFactor = timeFactor + glucoseFactor + trendFactor;

    return totalFactor;
};

export {
  glucoseStatus,
  glucoseSeverity,
  timeSeverity,
  glucoseDiscrepancy,
  trendSeverity
};
