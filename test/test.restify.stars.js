var restify = require('restify')
  , supertest = require('supertest')
  , assert = require('assert')
  , restpress = require('../');
  
var request = supertest('http://localhost:5000');
  
describe('restify:preApp-stars', function() {
	var server;
	var basePath;
	before(function(done) {
		server = restify.createServer();
		server.use(restify.bodyParser());
		
		basePath = '/';
		var rp = new restpress('star');

		rp.app(server);

		// Methods
		// List			
		rp.list(function (req, res, next) {
			assert.equal(req.actionName, 'index');
			res.send(200, {"action": "list stars"});
			return next();
		});

		// Read
		rp.read(function (req, res, next) {
			assert.equal(req.actionName, 'read');
			assert.equal(req.params.id, 23);
			res.send(200, {"action": "read star"});
			return next();
		});

		// Create
		rp.create(function (req, res, next) {
			assert.equal(req.actionName, 'create');
			res.send(200, {"action": "create star"});
			return next();
		});
		
		// Update
		rp.update(function (req, res, next) {
			assert.equal(req.actionName, 'update');
			assert.equal(req.params.id, 23);
			res.send(200, {"action": "update star"});
			return next();
		});
		
		// Delete
		rp.delete(function (req, res, next) {
			assert.equal(req.actionName, 'delete');
			assert.equal(req.params.id, 23);
			res.send(200, {"action": "delete star"});
			return next();
		});

		server.listen(5000, function () {
			done();
		});
	});

	after(function (done) {
		server.close(done);
	});

		
	it('Index', function(done) {
		request.get(basePath + 'star').expect(200, {"action": "list stars"}, done);	
	});

	it('Read', function(done) {
		request.get(basePath + 'star/23').expect(200, {"action": 'read star'}, done);		
	});

	it('Create', function(done) {
		request.post(basePath + 'star').expect(200, {"action": 'create star'}, done);		
	});

	it('Update', function(done) {
		request.put(basePath + 'star/23').expect(200, {"action": 'update star'}, done);		
	});

	it('Delete', function(done) {
		request.del(basePath + 'star/23').expect(200, {"action": 'delete star'}, done);		
	});

});

describe('restify:postApp-stars', function() {
	var server;
	var basePath;
	before(function(done) {
		server = restify.createServer();
		server.use(restify.bodyParser());
		
		basePath = '/';
		var rp = new restpress('star');

		// Methods
		// List			
		rp.list(function (req, res, next) {
			assert.equal(req.actionName, 'index');
			res.send(200, {"action": "list stars"});
			return next();
		});

		// Read
		rp.read(function (req, res, next) {
			assert.equal(req.actionName, 'read');
			assert.equal(req.params.id, 23);
			res.send(200, {"action": "read star"});
			return next();
		});

		// Create
		rp.create(function (req, res, next) {
			assert.equal(req.actionName, 'create');
			res.send(200, {"action": "create star"});
			return next();
		});
		
		// Update
		rp.update(function (req, res, next) {
			assert.equal(req.actionName, 'update');
			assert.equal(req.params.id, 23);
			res.send(200, {"action": "update star"});
			return next();
		});
		
		// Delete
		rp.delete(function (req, res, next) {
			assert.equal(req.actionName, 'delete');
			assert.equal(req.params.id, 23);
			res.send(200, {"action": "delete star"});
			return next();
		});

		rp.app(server);

		server.listen(5000, function () {
			done();
		});

	});

	after(function (done) {
		server.close(done);
	});

		
	it('Index', function(done) {
		request.get(basePath + 'star').expect(200, {"action": "list stars"}, done);	
	});

	it('Read', function(done) {
		request.get(basePath + 'star/23').expect(200, {"action": 'read star'}, done);		
	});

	it('Create', function(done) {
		request.post(basePath + 'star').expect(200, {"action": 'create star'}, done);		
	});

	it('Update', function(done) {
		request.put(basePath + 'star/23').expect(200, {"action": 'update star'}, done);		
	});

	it('Delete', function(done) {
		request.del(basePath + 'star/23').expect(200, {"action": 'delete star'}, done);		
	});

});

describe('restify:fileAction-stars', function() {

	var server;
	var basePath;
	before(function(done) {
		server = restify.createServer();
		server.use(restify.bodyParser());
		
		basePath = '/';
		var rp = new restpress('star', './test/star-actions.json');

		// Methods
		// List			
		rp.list(function (req, res, next) {
			assert.equal(req.actionName, 'list');
			res.send(200, {"action": "list stars"});
			return next();
		});

		// Read
		rp.read(function (req, res, next) {
			assert.equal(req.actionName, 'read');
			assert.equal(req.params.id, 23);
			res.send(200, {"action": "read star"});
			return next();
		});

		// Create
		rp.create(function (req, res, next) {
			assert.equal(req.actionName, 'create');
			res.send(200, {"action": "create star"});
			return next();
		});
		
		// Update
		rp.update(function (req, res, next) {
			assert.equal(req.actionName, 'update');
			assert.equal(req.params.id, 23);
			res.send(200, {"action": "update star"});
			return next();
		});
		
		// Delete
		rp.delete(function (req, res, next) {
			assert.equal(req.actionName, 'delete');
			assert.equal(req.params.id, 23);
			res.send(200, {"action": "delete star"});
			return next();
		});

		rp.app(server);

		server.listen(5000, function () {
			done();
		});

	});

	after(function (done) {
		server.close(done);
	});

		
	it('Index', function(done) {
		request.get(basePath + 'star').expect(200, {"action": "list stars"}, done);	
	});

	it('Read', function(done) {
		request.get(basePath + 'star/23').expect(200, {"action": 'read star'}, done);		
	});

	it('Create', function(done) {
		request.post(basePath + 'star').expect(200, {"action": 'create star'}, done);		
	});

	it('Update', function(done) {
		request.put(basePath + 'star/23').expect(200, {"action": 'update star'}, done);		
	});

	it('Delete', function(done) {
		request.del(basePath + 'star/23').expect(200, {"action": 'delete star'}, done);		
	});
	
});

