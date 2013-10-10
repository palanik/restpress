// Copyright 2013 N. Palani Kumanan.  All rights reserved.

function restpress(app, basePath) {
	this.app = app;
	this.basePath = basePath || '/';
	if (! /\//.test(this.basePath)) {
		this.basePath += '/';
	}
}

// Lists resource collection
restpress.prototype.index = function(resource, callback) {
	this.app.get(this.basePath + resource, function(req, res) {
		req.resource = resource;
		return callback(req, res);
	});
};

// Retrieve the addressed resource
restpress.prototype.get = function(resource, callback) {
	this.app.get(this.basePath + resource + '/:id', function(req, res) {
		req.resource = resource;
		return callback(req, res);
	});
};

// Create a new resource
restpress.prototype.post = function(resource, callback) {
	this.app.post(this.basePath + resource, function(req, res) {
		req.resource = resource;
		return callback(req, res);
	});
};

// Replace/Update the addressed resource
restpress.prototype.put = function(resource, callback) {
	this.app.put(this.basePath + resource + '/:id', function(req, res) {
		req.resource = resource;
		return callback(req, res);
	});
};

// Modify the addressed resource
restpress.prototype.patch = function(resource, callback) {
	this.app.patch(this.basePath + resource + '/:id', function(req, res) {
		req.resource = resource;
		return callback(req, res);
	});
};

// Delete the addressed resource
restpress.prototype.delete = function(resource, callback) {
	this.app.delete (this.basePath + resource + '/:id',	function(req, res) {
		req.resource = resource;
		return callback(req, res);
	});
};

module.exports = restpress;
