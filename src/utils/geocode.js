const request = require('postman-request')

const geocode = (address, callback) => {

    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + encodeURIComponent(address) + '&appid=43f9f12d39323f03b4571301deb5afa5'


    request({ url, json: true }, (error, { body }) => {

        if (error) {
            callback('Unable to connect to weather service!', undefined) // it is not a must to provide 'undefined' JS will directly sets it as undefine if its not provided
        } else if (body.cod === '404') {
            callback('Unable to find location. Try another search.', undefined)

        } else {
            callback(undefined, {
                latitiude: body.coord.lat,
                longtiude: body.coord.lon,
                location: body.name
            })
        }
    })

}

module.exports = geocode