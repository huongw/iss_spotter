const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

const fetchMyIpCallback = function(error, ip) {
    if (error) {
      console.log("It didn't work!" , error);
      return;
    }
  
    console.log('It worked! Returned IP:' , ip);
}

fetchMyIP(fetchMyIpCallback);

const fetchCoordsByIPCallback = function(error, coords) {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned coords:' , coords);
}

fetchCoordsByIP('67.71.194.209', fetchCoordsByIPCallback);


const fetchISSFlyOverTimesCallback = function(error, passTimes) {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log("It worked! Returned flyover times:", passTimes);
}

const coords = { longitude: -79.6296, latitude: 43.6413 };

fetchISSFlyOverTimes(coords, fetchISSFlyOverTimesCallback);

// const { nextISSTimesForMyLocation } = require("./iss");

// const printPassTimes = function(passTimes) {
//   for (const pass of passTimes) {
//     const datetime = new Date(0);
//     datetime.setUTCSeconds(pass.risetime);
//     const duration = pass.duration;
//     console.log(`Next pass at ${datetime} for ${duration} seconds!`);
//   }
// };

// nextISSTimesForMyLocation((error, passTimes) => {
//   if (error) {
//     return console.log("It didn't work!", error);
//   }

//   printPassTimes(passTimes);
// });