const request = require("request");

const forecast = (lat, long, callback) => {
  const forecastURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=97ffcd12a8283b8949774ea093720286`;
  request({ url: forecastURL, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services", undefined);
    } else if (body.cod === "400") {
      callback("unable to fetch locations", undefined);
    } else {
      const temperatureInCelcius = body.main.temp - 273.15;
      const tempmax = body.main.temp_max - 273.15;
      const templow = body.main.temp_min - 273.15;
      console.log(body.main);
      callback(undefined, {
        info: `It is currently ${temperatureInCelcius.toFixed(
          2
        )} degrees out. This high today is ${tempmax.toFixed(
          2
        )} with a low of ${templow.toFixed(2)}`,
      });
    }
  });
};

module.exports = forecast;
