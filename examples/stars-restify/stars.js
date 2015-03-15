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
var all = function (req, res, next) {
	res.set('Resource-Name', req.resource.name());
	res.set('Resource-Action', req.actionName);
	res.locals = res.locals || {};
	
	var ret = next();
	
	if (res.locals.restData !== undefined) {
		res.json(res.locals.restData);
	}

	return ret;
};

// Methods
// List			
rp.list(all, function (req, res, next) {
	res.json(stars);
	return next();
});

// Read
rp.read(all, function (req, res, next) {
	if (req.params.id > stars.length || req.params.id <= 0) {
		res.statusCode = 404;
		return res.send ('Star ' + req.params.id + ' not found');
	}
	res.locals.restData = stars[req.params.id - 1];
	return next();
}, function (req, res, next) {
	res.locals.restData['id'] = req.params.id;
	return next();
	});


// Create
rp.create(all, function (req, res, next) {
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

	return next();
});

// Update
rp.update(all, function (req, res, next) {
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

	return next();
});

// Delete
rp.delete(all, function (req, res, next) {
	if (req.params.id > stars.length || req.params.id <= 0) {
		res.statusCode = 404;
		return res.send ('Star ' + req.params.id + ' not found');
	}

	var star = stars[req.params.id - 1];

	stars.splice(req.params.id - 1, 1);

	res.locals.restData = star;

	return next();
});

module.exports = rp;
