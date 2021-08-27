const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

const fetchISSFlyOverTimesCallback = function(error, passTimes) {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log("It worked! Returned flyover times:", passTimes);
  printPassTimes(passTimes)
}

const fetchCoordsByIPCallback = function(error, coords) {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned coords:' , coords);
  fetchISSFlyOverTimes(coords, fetchISSFlyOverTimesCallback);
}

const fetchMyIpCallback = function(error, ip) {
    if (error) {
      console.log("It didn't work!" , error);
      return;
    }
  
    console.log('It worked! Returned IP:' , ip);
    fetchCoordsByIP(ip, fetchCoordsByIPCallback);
}

fetchMyIP(fetchMyIpCallback);