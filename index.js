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
restActions['post'] = restActions['create'] = {
	"route" : '',
	"method" : 'post'
};
restActions['deleteAll'] = restActions['delAll'] = {
	"route" : '',
	"method" : 'delete'
};

restActions['get'] = restActions['read'] = {
	"route" : '/:id',
	"method" : 'get'
};
restActions['put'] = restActions['update'] = {
	"route" : '/:id',
	"method" : 'put'
};
restActions['delete'] = restActions['del'] = {
	"route" : '/:id',
	"method" : 'delete'
};

function restpress(basePath, resource, actions) {
	basePath = basePath || '/';
	if (! /\//.test(basePath)) {
		basePath += '/';
	}
	this.resourceName = resource;
	this.resourcePath = basePath + resource;

	this.actions = actions || restActions;
	
	this._futureUse = [];
	this._futureActs = {};
	
	this._init();
}

restpress.prototype._init = function() {
	this['use'] = function(callback) {
		this._futureUse.push(arguments);
	};
	
	// Create methods for known actions
	for (var a in this.actions) {
		if (this.actions.hasOwnProperty(a)) {
			this._setFuture(a);
		}
	}
};

restpress.prototype._setFuture = function(a) {
	var self = this;
	this._futureActs[a] = [];
	this[a] = function() {
		self._futureActs[a].push(arguments);
		return self;
	};
};

restpress.prototype.app = function (app) {
	if (arguments.length == 0) {
		return this.app;
	}
	
	this.app = app;
	
	var self = this;
	// Set resource name for all methods
	this.app.use(this.resourcePath, function(req, res, next) {
		res.set('XX-Powered-By', 'Restpress');
		req.resource = self;
		next();
	});
	
	// Set use method to connect to app
	this.use = function(callback) {
		this.app.use(this.resourcePath, function (req, res, next) {
			if (req.resource == self){
				return callback(req, res, next);
			}
			return next();
		});
	  
	  return this;
	};
	
	// Activate deferred uses
	var self = this;
	this._futureUse.forEach(function (u) {
		self.use.apply(self, u);
	});
	
	// Clear defferred uses
	this._futureUse = {};
	
	
	// Now for actions
	// Iterate thru deferred action calls
	for (var a in this._futureActs) {
		if (this._futureActs.hasOwnProperty(a)) {
			// Save calls
			var futureCalls = this._futureActs[a];
			
			// Set action methods to _once_
			this[a] = function () {
				var action = self.actions[a];
				var name = a;
				self.app[action.method](self.resourcePath + action.route, function(req, res, next) {
					req.action = name;
					next();
				});
				
				// Set action methods to connect to app
				self[a] = function() {
					var action = self.actions[a];
					// insert actionPath as first argument
					[].unshift.call(arguments, self.resourcePath + action.route);
			
					// Call express app verb function
					self.app[action.method].apply(self.app, arguments);
					
					// return this for chaining
					return self;
				};
				
				// After calling _once_, call regular action method
				return self[a].apply(self, arguments);
			};
			
			// Call _once_ action method for all saved future calls
			futureCalls.forEach(function (fc) {
				return self[a].apply(self, fc);
			});
			
		}
	}
	
	// Clear deferred actions
	this._futureActs = {};
};


restpress.prototype.name = function() {
	return this.resourceName;	
};

restpress.prototype.path = function() {
	return this.resourcePath;
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
module.exports.actions = restActions;
