// Copyright 2013 N. Palani Kumanan.  All rights reserved.

var restActions = {};

// http://en.wikipedia.org/wiki/Representational_state_transfer#RESTful_web_APIs
restActions['index'] = restActions['list'] = {
	"route" : '',
	"method" : 'get'
};
restActions['putAll'] = {
	"route" : '',
	"method" : 'put'
};
restActions['post'] = {
	"route" : '',
	"method" : 'post'
};
restActions['deleteAll'] = restActions['delAll'] = {
	"route" : '',
	"method" : 'delete'
};

restActions['get'] = {
	"route" : '/:id',
	"method" : 'get'
};
restActions['put'] = {
	"route" : '/:id',
	"method" : 'put'
};
restActions['delete'] = restActions['del'] = {
	"route" : '/:id',
	"method" : 'delete'
};

function restpress(app, basePath, resource, actions) {
	this.app = app;
	basePath = basePath || '/';
	if (! /\//.test(basePath)) {
		basePath += '/';
	}
	this.resource = resource;
	this.resourcePath = basePath + resource;

	// Set resource name	
	this.app.use(this.resourcePath, function(req, res, next) {
		req.resource = resource;
		next();
	});
	
	actions = actions || restActions;
	// Create methods for known actions
	this.actionCallbacks = {};
	for (var a in actions) {
		if (actions.hasOwnProperty(a)) {
			this.addAction(a, actions[a]);
		}
	}
}

restpress.prototype.addAction = function(name, action) {
	
	this.actionCallbacks[name] = false;
	
	this[name] = function(callback) {
		if (!this.actionCallbacks[name]) {
			// Set this Action name on request object
			this.app[action.method](this.resourcePath + action.route, function(req, res, next) {
				req.action = name;
				next();
			});
			this.actionCallbacks[name] = true;
		}
		// insert actionPath as first argument
		[].unshift.call(arguments, this.resourcePath + action.route);

		// Call express app method function
		this.app[action.method].apply(this.app, arguments);
		
		// return this for chaining
		return this;
	};
}

restpress.prototype.use = function(callback) {
  var self = this;
	this.app.use(this.resourcePath, function (req, res, next) {
		if (req.resource == self.resource){
			return callback(req, res, next);
		}
	});
  
  return this;
};

restpress.prototype.resource = function() {
	return this.resource;	
};

restpress.prototype.path = function() {
	return this.resourcePath;
};


module.exports = restpress;
module.exports.actions = restActions;
