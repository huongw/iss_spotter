const request = require("request");

const fetchMyIP = function(callback) {

  const requestCallback = function(error, response, body) {
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);
  }

  request('https://api.ipify.org?format=json', requestCallback);
};

const fetchCoordsByIP = function(ip, callback) {

  const requestCallback = function(error, response, body) {
    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
     return callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null);
    }

    const { longitude, latitude } = JSON.parse(body);


    callback(null, { longitude, latitude });
  }

  request(`https://freegeoip.app/json/${ip}`, requestCallback);
};

const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `https://iss-pass.herokuapp.com?lat=${coords.latitude}&lon=${coords.longitude}`;
  
  const requestCallback = function(error, response, body) {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }

    const passes = JSON.parse(body).response;
    
    callback(null, passes);
  }
  request(url, requestCallback);
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      console.log("It didn't work!" , error);
      return;
    }
  
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        console.log("It didn't work!" , error);
        return;
      }
  
      fetchISSFlyOverTimes(coords, (error, passTimes) => {
        if (error) {
          console.log("It didn't work!", error);
          return;
        }
      
        callback(passTimes)
      });
    });
  });
}

module.exports = { fetchCoordsByIP, fetchISSFlyOverTimes, fetchMyIP, nextISSTimesForMyLocation };