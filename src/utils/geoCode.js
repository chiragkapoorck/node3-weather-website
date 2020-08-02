const request = require('request')

const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiY2hpcmFna2Fwb29yIiwiYSI6ImNrZGFuc204czBrOGsydG1od2JoYndtZncifQ.FGz2iAP52aZfnQo7ShuHpw&limit=1`;

    request({url, json:true}, (error, {body} = {}) => {
        const {features} = body

        if (error) {
            callback('Unable to connect to geolocation services.', undefined);
        } else if (features.length === 0) {
            callback('Unable to find the coordinates. Try another location.', undefined);
        } else {
            callback(undefined, {
                longitude: features[0].center[1],
                latitude: features[0].center[0],
                location: features[0].place_name
            })
        }
    })
}

module.exports = geoCode