function glucoseStatus(lastLevel, lowThreshold, highThreshold) {
  if (lastLevel <= lowThreshold) {
    return 'low';
  } else if (lastLevel => highThreshold) {
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

function glucoseDiscrepancy(bloodSugar,status){
    if (status === 'low') {
      return lowThreshold - lastLevel;
    } else if (status === 'high') {
      return lastLevel - highThreshold;
    } else {
      return -1;
    }
}

function trendSeverity(trend,status){
  if(trend == 'flat'){
    return 0;
  }
  
  if(status === 'low'){
    switch(trend){
    //User is trending in the wrong direction.
      case 'fortyFiveDown':
        return 1;
        break;
      case 'singleDown':
        return 2;
        break;
      case 'doubleDown':
        return 3;
        break;
      //User is trending in the right direction
      case 'fortyFiveUp':
        return 0;
        break;
      case 'singleUp':
        return -1;
        break;
      case 'doubleUp':
        return -2;
        break;
      default:
        return 0;
        break;
    }
  }
    
  else if(status === "high"){
      switch(trend){
    //User is trending in the right direction.
      case 'fortyFiveDown':
        return 0;
        break;
      case 'singleDown':
        return -1;
        break;
      case 'doubleDown':
        return -2;
        break;
      //User is trending in the wrong direction
      case 'fortyFiveUp':
        return 1;
        break;
      case 'singleUp':
        return 2;
        break;
      case 'doubleUp':
        return 3;
        break;
      default:
        return 0;
        break;
    }
  }
    
  else{
    return 0;
  }
}

export const SmartAlert = (lastLevel, lastTrend, lowThreshold, highThreshold, checkedDevices, currentTime) => {

    let status = glucoseStatus(lastLevel, lowThreshold, highThreshold);
    let glucoseLevel = glucoseDiscrepancy(lastLevel,status);
  
    let timeFactor = timeSeverity(currentTime);
    let glucoseFactor = glucoseSeverity(glucoseLevel);
    let trendFactor = trendSeverity(lastTrend,status);

    let totalFactor = timeFactor + glucoseFactor + trendFactor;
};


// timeSeverity = 0 or 1



// Best way to picture Smart Alert's effiectiveness is with use cases.

// For our use cases lets say the user's threholds are 
// Low: 70
// High: 300


// What would an extreme worse case scenario be?

// What would a extreme (5) case be?
// The user is 40 blood sugar, with an extreme down trend. The user is asleep

// timeFactor = 1;
// glucoseFactor = 4;
// trendFactor = 3;

// This user is in danager of diabetic shock and requires an extreme warning.
// Even if it was daytime, and the user had a single down arrow, the warning is still extreme.

// The user is 20 below their current warning level and going down, this requires a severe warning.


// (4)
// The user is 50 blood sugar, with a slight down trend. The user is asleep

// timeFactor = 1;
// glucoseFactor = 2;
// trendFactor = 1;

// The user is 20 below their current warning level and going down, this requires a severe warning.


// (3) Moderate
// The user is 50 blood sugar, with a slight down trend. It is daytime

// timeFactor = 0;
// glucoseFactor = 2;
// trendFactor = 1;

// The user is 20 below their current warning level and going down, this requires a moderate warning.



// (2) 
// The user is 60 blood sugar, with a slight down trend. It is daytime

// timeFactor = 0;
// glucoseFactor = 1;
// trendFactor = 1;

// The user is only 10 under their warning, but also is continuing to trend downwards, this requires 
// a warning.

// (1) Low 
// The user is 60 blood sugar, with a flat trend. It is daytime

// timeFactor = 0;
// glucoseFactor = 1;
// trendFactor = 0;

// The user is only 10 under their warning, but is staying steady in blood sugar levels.
// The user should be alerted to this situation, but it is not urgent in any capacity. 



