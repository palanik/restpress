// Copyright 2013 N. Palani Kumanan.  All rights reserved.

var _restActions = {};

// http://en.wikipedia.org/wiki/Representational_state_transfer#RESTful_web_APIs
_restActions['index'] = {
	"route" : '',
	"method" : 'get'
};
_restActions['putAll'] = {
	"route" : '',
	"method" : 'put'
};
_restActions['create'] = {
	"route" : '',
	"method" : 'post'
};
_restActions['deleteAll'] = {
	"route" : '',
	"method" : 'delete'
};
_restActions['read'] = {
	"route" : '/:id',
	"method" : 'get'
};
_restActions['update'] = {
	"route" : '/:id',
	"method" : 'put'
};
_restActions['delete'] = {
	"route" : '/:id',
	"method" : 'delete'
};

var _aliasActions = {
	"list": 'index', 
	"post": 'create', 
	"delAll": 'deleteAll', 
	"get": 'read', 
	"put": 'update', 
	"del": 'delete'
};

function restpress(resource, actions) {
	this.resourceName = resource;

	this.actions = actions || _restActions;
	if (typeof this.actions == 'string') {	// if filename ...
		var fs = require('fs');			// ... read json from file
		var content = fs.readFileSync(this.actions);
		this.actions = JSON.parse(content);
	}

	if (this.actions.hasOwnProperty('all')) {
		throw new Error('all is a reserved action');
	}
	if (this.actions.hasOwnProperty('use')) {
		throw new Error('use is a reserved action');
	}

	this.locals = function locals(obj) {
		for (var key in obj) {
			locals[key] = obj[key];
		}
		return obj;
	};
	
	this._stack = [];
	this.endpoints = [];
	
	this._init();
}

// Special method 'use' that is applied to root route
restpress.prototype.use = function() {
	var args = arguments;
	this._stack.push({action : 'use', args : args});
	return this;
};

// Special method 'all' that is applied to all known actions
restpress.prototype.all = function() {
	for (var a in this.actions) {
		if (this.actions.hasOwnProperty(a)) {
			this[a].apply(this, arguments);
		}
	}
	
	return this;
};

restpress.prototype._init = function() {
	var self = this;
	
	// Kick the can down the road for app to pick it up later
	var deferRoutes = function(actionName) {
		self[actionName] = function() {
			var args = arguments;
			self._stack.push({action : actionName, args : args});
			return self;
		};
	};
	
	
	// Create defer methods for all defined actions
	for (var a in this.actions) {
		if (this.actions.hasOwnProperty(a)) {
			
			// endpoints
			var action = this.actions[a];
			var endpoint = {name: a, route: action.route, method: action.method};
			if (action.doc) {
				endpoint.doc = action.doc;
			}
			self.endpoints.push(endpoint);
			
			deferRoutes(a);
		}
	}

	// Aliases - point to defer methods of original
	if (this.actions === _restActions) {
		for (a in _aliasActions) {
			self[a] = self[_aliasActions[a]];
		}
	}
};


restpress.prototype.app = function (basePath, app) {
	if (arguments.length === 0) {
		return this.app;
	}
	
	if (arguments.length == 1) {
		app = arguments[0];
		basePath = '/';
	}

	if (! /\//.test(basePath)) {
		basePath += '/';
	}

	this.app = app;
	
	var self = this;
	
	// Set end points
	if (this._endpoints === undefined) {
		// Adjust routes
		this.endpoints.forEach(function(ep){
			ep.route = basePath + self.resourceName + ep.route; 
		});
		
		app.get(basePath + this.resourceName + '/_endpoints', function (req, res, next) {
			res.json(self.endpoints);
		});
	}
	
	// Re-Create methods working via app for known actions
	var routeViaApp = function(actionName, action, resourcePath) {
		// prefix function to set rest values
		var identify = function(req, res, next) {
			res.set('XX-Powered-By', 'Restpress');
			req.resource = self;
			req.actionName = actionName;
			req.action = action;
			next();
		};

		self[actionName] = function() {
			if (identify) {
				// insert identify as second argument
				// This is to be done only once
				[].unshift.call(arguments, identify);
				identify = null;
			}

			// insert actionPath as first argument
			[].unshift.call(arguments, resourcePath + action.route);

			// Hack for restify where 'delete' method is 'del'
			var appMethod = action.method;
			if (appMethod == 'delete' &&
					typeof self.app[appMethod] !== 'function' &&
					typeof self.app['del'] === 'function') {
					appMethod = 'del';
			}

			// Call express app VERB function
			self.app[appMethod].apply(self.app, arguments);
			
			// return this for chaining
			return self;
		};
	};
	
	for (var a in this.actions) {
		if (this.actions.hasOwnProperty(a)) {
			// Set action methods to connect to app
			routeViaApp(a, this.actions[a], basePath + this.resourceName);
		}
	}

	// Rewrite use method to work with app.use
	this.use = function() {
		if (self.app.locals) {// Express app
			[].unshift.call(arguments, basePath + self.resourceName);
		}
		// restify 'use' doesn't support paths. Call withot paths?

		// Call express app 'use' function
		self.app['use'].apply(self.app, arguments);
	};

	// Aliases - point to 'route via app' methods of original actions
	if (this.actions === _restActions) {
		for (a in _aliasActions) {
			self[a] = self[_aliasActions[a]];
		}
	}
	
	// make app pickup the kicked cans
	this._stack.forEach(function(can) {
		this[can.action].apply(this, can.args);
	}, this);
	
	
	// Clear deferred actions
	delete this._stack;
};

restpress.prototype.name = function() {
	return this.resourceName;	
};

// Super method
restpress.prototype.rest = function(methods) {
	for (var m in methods) {
		if (methods.hasOwnProperty(m)) {
			this[m](methods[m]);
		}
	}
	
	return this;
};

module.exports = restpress;
module.exports.actions = _restActions;
module.exports.version = '0.0.3';