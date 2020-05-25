const express = require('express');
const path = require('path');
const app = express();
const request = require('postman-request');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const hbs = require('hbs');

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'Rixc'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'Weather App',
		name: 'Rixc'
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Weather App',
		name: 'Rixc'
	});
});

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'You must enter a valid address'
		});
	}
	geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
		if (error) {
			return res.send({
				error
			});
		}
		forecast(latitude, longitude, (error, response) => {
			if (error) {
				return res.end({ error });
			}
			res.send({
				forecast: response,
				location: location,
				address: req.query.address
			});
		});
	});
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: 'Weather App',
		name: 'Rixc',
		errorMessage: 'help article not found'
	});
});

app.get('*', (req, res) => {
	res.render('404', {
		title: 'Weather App',
		name: 'Rixc',
		errorMessage: 'page not found'
	});
});

app.listen(3000, () => {
	console.log('Server up on port 3000');
});
