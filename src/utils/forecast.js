const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=13652734e64e05fe69824c84f0ad1bb9&query=${latitude}, ${longitude}&units=f`;

	request({ url, json: true }, (error, response) => {
		const { body } = response;
		if (error) {
			callback('Unable to connect to weather service');
		} else if (body.error) {
			callback('Unable to find location. Please enter a valid coordinate');
		} else {
			const data = body.current;
			const description = body.current.weather_descriptions[0];
			callback(undefined, `${description}. It is currently ${data.temperature}. It feels like ${data.feelslike}`);
		}
	});
};

module.exports = forecast;
