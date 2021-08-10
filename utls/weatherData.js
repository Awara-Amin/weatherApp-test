const request = require('request');
const constants = require('../config');

const weatherData = (address, callback) => {
  const url = constants.openweatherMap.BASE_URL + encodeURIComponent(address) + '&appid=' + constants.openweatherMap.SECRET_KEY;
  // console.log(url);
  // callback(true);
  request({url,json: true},
         (error, {body}) => {
    // console.log(body);
    if (error) {
      callback("Can not fetch data from Open Weather map API ", undefined)
    } else {
      callback(undefined, {
        temperature:body.main.temp,
        description: body.weather[0].description,
        cityName: body.name
      })
    }
  })
}

module.exports = weatherData;
