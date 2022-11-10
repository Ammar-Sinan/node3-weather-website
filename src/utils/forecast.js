const request = require('postman-request')


const forecast = (latitiude, longitude, callback) => {

    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitiude + '&lon=' + longitude + '&appid=43f9f12d39323f03b4571301deb5afa5&units=metric'

    request({ url, json: true }, (error, { body }) => {
        // response is an object. but the only property we use is .body
        // so with object-destructuring it goes from response.body => {body}
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.message === 'wrong longitude' || body.message === 'wrong latitiude') {
            callback('Unable to find location', undefined)
        } else {
            const data = {
                main: body.weather[0].description,
                temp: body.main.temp,
                wind: body.wind.speed,
                location: body.name,
                country: body.sys.country
            }
            callback(undefined, data)
        }
    })

}

module.exports = forecast