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

app.get('/favicon.ico', (req, res) => res.status(404).end());

app.all('*', (req, res) => {
	// Get actual path
	debugger;
	console.log(`Handling mock request for ${req.path}`);
	const location = getLocation(req.path);
	try {
		const responseData = fs.readFileSync(`./config${location}.json`);
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
