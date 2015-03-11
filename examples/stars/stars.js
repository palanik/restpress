var restpress = require('../../index');

var rp = new restpress('stars');
// Dataset
// Stars and distance from Sun
var stars = [
				{
					"name" : "Sun",
					"distance" : 0
				},
				{
					"name" : "Sirius",
					"distance" : 8.6
				},
				{
					"name" : "Canopus",
					"distance" : 310
				},
				{
					"name" : "Alpha Centauri",
					"distance" : 4.4
				},
			];

//Middleware to set some fancy headers
rp.all(function (req, res, next) {
	res.set('Resource-Name', req.resource.name());
	res.set('Resource-Action', req.actionName);
	
	next();
	
	if (res.locals.restData !== undefined) {
		res.json(res.locals.restData);
	}
});


// Methods
// List			
rp.list(function (req, res) {
	res.json(stars);
});

// Read
rp.read(function (req, res, next) {
	if (req.params.id > stars.length || req.params.id <= 0) {
		res.statusCode = 404;
		return res.send ('Star ' + req.params.id + ' not found');
	}
	res.locals.restData = stars[req.params.id - 1];
	next();
}, function (req, res) {
	res.locals.restData['id'] = req.params.id;
	});


// Create
rp.create(function (req, res) {
	if (!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('distance')) {
		res.statusCode = 400;
		return res.send('Error 400: Invalid data.');
	}
	
	var star = {
				"name" : req.body.name,
				"distance" : req.body.distance
				};
	stars.push(star);
	res.locals.restData = star;
});

// Update
rp.update(function (req, res) {
	if (req.params.id > stars.length || req.params.id <= 0) {
		res.statusCode = 404;
		return res.send ('Star ' + req.params.id + ' not found');
	}
	if (!req.body.hasOwnProperty('name') && !req.body.hasOwnProperty('distance')) {
		res.statusCode = 400;
		return res.send('Error 400: Invalid data.');
	}

	var star = stars[req.params.id - 1];
	if (req.body.hasOwnProperty('name')) {
		star.name = req.body.name;
	}
	if (req.body.hasOwnProperty('distance')) {
		star.distance = req.body.distance;
	}
	
	stars[req.params.id - 1] = star;
	res.locals.restData = star;
});

// Delete
rp.delete(function (req, res) {
	if (req.params.id > stars.length || req.params.id <= 0) {
		res.statusCode = 404;
		return res.send ('Star ' + req.params.id + ' not found');
	}

	var star = stars[req.params.id - 1];

	stars.splice(req.params.id - 1, 1);

	res.locals.restData = star;
});

module.exports = rp;
