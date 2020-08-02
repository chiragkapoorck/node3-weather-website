const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=bfac74161b9d8e01e6137c1bd73fda95&query=${latitude},${longitude}&units=m`;

    request({url, json:true}, (error, {body} = {}) => {
        if (error) {
            callback(`Couldn't connect to Weatherstack services`, undefined);
        } else if (body.error) {
            callback(`Unable to find location. Try other coordinates.`, undefined);
        } else {
            callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out.`);
        }
    })
};

module.exports = forecast;