const request = require('postman-request');

const geocode = (address, callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		address
	)}.json?access_token=pk.eyJ1Ijoic2F2ZWRiYWNvbiIsImEiOiJja2FsZ2Y2d2UwY2VwMnFxaHhxOGNhMm5qIn0.XsEY-WIuU5xFeUHY0noriw&limit=1`;

	request({ url, json: true }, (error, response) => {
		const { body } = response;
		if (error) {
			callback('Unable to connect to location services');
		} else if (body.features.length === 0) {
			callback('Unable to find location. Try another search');
		} else {
			callback(undefined, {
				latitude: body.features[0].center[1],
				longitude: body.features[0].center[0],
				location: body.features[0].place_name
			});
		}
	});
};

module.exports = geocode;
