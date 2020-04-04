const request = require('request');

const forecast = (lat, long, callback) => {
    const url = "https://api.darksky.net/forecast/a0ce80fa98ec55288ad100f2ef33cf19/" + lat + "," + long + "?units=si";
    request({
        url,
        json: true
    }, (error, {
        body
    }) => {
        if (error) {
            callback('Unable to connect to forecast service', undefined)
        } else if (body.error) {
            callback("Unable to find location", undefined)
        } else {
            const {
                currently: {
                    temperature,
                    precipProbability
                }

            } = body;
            callback(undefined, 'It is currently ' + temperature + ' degrees out.There is a ' + precipProbability + ' % chance of rain.')
        }
    })
}

module.exports = forecast;