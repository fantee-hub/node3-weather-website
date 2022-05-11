const request = require("request");

const geocodeHandler = (address, callback) => {
  const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZmFudGVlIiwiYSI6ImNsMWw5Nzd3NzA3cmczZG8yNm14Zjljd24ifQ.PT0zdDZxW1GzR3Kdtl94wA`;
  request({ url: geocodeURL, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to geocode services", undefined);
    } else if (body.features.length === 0) {
      callback("unable to fetch location", undefined);
    } else {
      callback(undefined, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocodeHandler;
