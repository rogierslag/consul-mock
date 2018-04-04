const express = require('express');
const fs = require('fs');

const PORT = process.env.PORT || 8500;
const app = express();

function getLocation(path) {
	const location = path.replace('/v1', '').replace('/PLACEHOLDER', '');
	if (location.endsWith('/')) {
		return location.substring(0, location.length - 1);
	}
	return location;
}

const cache = new Map();
function getData(location) {
	if (cache.has(location)) {
		return cache.get(location);
	}
	console.log(`Getting fresh data for ${location}`);
	const data = fs.readFileSync(`./config${location}.json`);
	cache.set(location, data);
	return data;
}

app.get('/favicon.ico', (req, res) => res.status(404).end());

app.all('*', (req, res) => {
	const location = getLocation(req.path);
	try {
		const responseData = getData(location);
		if (responseData.length === 0) {
			res.end();
		} else {
			res.json(JSON.parse(responseData));
		}
	} catch (e) {
		console.error(e);
		res.status(500).end();
	}
});

app.listen(PORT, () => console.log('Fake consul is online'));
