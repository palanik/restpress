var express = require('express')
  , request = require('supertest')
  , assert = require('assert')
  , restpress = require('../');
  
  
describe('preApp-stars', function() {
		var rp = new restpress('star');

		// Middleware test
		rp.use(function(req, res, next) {
			res.header('Cache-Control', 'no-store');
			next();
		});

		// Methods
		// List			
		rp.list(function (req, res, next) {
			assert.equal(req.actionName, 'index');
			next();
		});
		
		rp.list(function (req, res) {
			res.status(200).send("list stars");
		});

		// Read
		rp.read(function (req, res) {
			assert.equal(req.actionName, 'read');
			assert.equal(req.params.id, 23);
			res.status(200).send("read star");
		});
		
		// Create
		rp.create(function (req, res) {
			assert.equal(req.actionName, 'create');
			res.status(200).send("create star");
		});
		
		// Update
		rp.update(function (req, res) {
			assert.equal(req.actionName, 'update');
			assert.equal(req.params.id, 23);
			res.status(200).send("update star");
		});
		
		// Delete
		rp.delete(function (req, res) {
			assert.equal(req.actionName, 'delete');
			assert.equal(req.params.id, 23);
			res.status(200).send("delete star");
		});
		
		var app = express();
		app.use(require('body-parser').json());
		
		var basePath = '/';
		rp.app(app);
		
	it('Use Middleware', function(done) {
		request(app).get(basePath + 'star').expect('Cache-Control', 'no-store', done);	
	});

	it('Index', function(done) {
		request(app).get(basePath + 'star').expect(200, "list stars", done);	
	});

	it('Create', function(done) {
		request(app).post(basePath + 'star').expect(200, 'create star', done);		
	});

	it('Read', function(done) {
		request(app).get(basePath + 'star/23').expect('read star', done);		
	});

	it('Update', function(done) {
		request(app).put(basePath + 'star/23').expect(200, 'update star', done);		
	});

	it('Delete', function(done) {
		request(app).del(basePath + 'star/23').expect(200, 'delete star', done);		
	});
	
});


describe('postApp-stars', function() {
		var app = express();
		app.use(require('body-parser').json());
		
		var rp = new restpress('star');
		var basePath = '/space/';
		rp.app(basePath, app);

		// Middleware test
		rp.use(function(req, res, next) {
			res.header('Cache-Control', 'no-cache');
			next();
		});

		// Methods
		// List			
		rp.list(function (req, res) {
			assert.equal(req.actionName, 'index');
			res.status(200).send("list post stars");
		});
		
		// Read
		rp.read(function (req, res) {
			assert.equal(req.actionName, 'read');
			assert.equal(req.params.id, 23);
			res.status(200).send("read post star");
		});
		
		// Create
		rp.create(function (req, res) {
			assert.equal(req.actionName, 'create');
			res.status(200).send("create post star");
		});
		
		// Update
		rp.update(function (req, res) {
			assert.equal(req.actionName, 'update');
			assert.equal(req.params.id, 23);
			res.status(200).send("update post star");
		});
		
		// Delete
		rp.delete(function (req, res) {
			assert.equal(req.actionName, 'delete');
			assert.equal(req.params.id, 23);
			res.status(200).send("delete post star");
		});
		
		
	it('Use Middleware', function(done) {
		request(app).get(basePath + 'star').expect('Cache-Control', 'no-cache', done);	
	});

	it('Index', function(done) {
		request(app).get(basePath + 'star').expect(200, "list post stars", done);	
	});

	it('Create', function(done) {
		request(app).post(basePath + 'star').expect(200, 'create post star', done);		
	});

	it('Read', function(done) {
		request(app).get(basePath + 'star/23').expect('read post star', done);		
	});

	it('Update', function(done) {
		request(app).put(basePath + 'star/23').expect(200, 'update post star', done);		
	});

	it('Delete', function(done) {
		request(app).del(basePath + 'star/23').expect(200, 'delete post star', done);		
	});
	
});

describe('fileAction-stars', function() {
		var rp = new restpress('star', './test/star-actions.json');

		// Middleware test
		rp.use(function(req, res, next) {
			res.header('Cache-Control', 'max-age=0');
			next();
		});

		// Methods
		// List			
		rp.list(function (req, res) {
			res.status(200).send("list stars");
		});
		
		// Read
		rp.read(function (req, res) {
			res.status(200).send("read star");
		});
		
		// Create
		rp.create(function (req, res) {
			res.status(200).send("create star");
		});
		
		// Update
		rp.update(function (req, res) {
			res.status(200).send("update star");
		});
		
		// Delete
		rp.delete(function (req, res) {
			res.status(200).send("delete star");
		});
		
		var app = express();
		app.use(require('body-parser').json());
		
		var basePath = '/';
		rp.app(app);
		
	it('Use Middleware', function(done) {
		request(app).get(basePath + 'star').expect('Cache-Control', 'max-age=0', done);	
	});

	it('Index', function(done) {
		request(app).get(basePath + 'star').expect(200, "list stars", done);	
	});

	it('Create', function(done) {
		request(app).post(basePath + 'star').expect(200, 'create star', done);		
	});

	it('Read', function(done) {
		request(app).get(basePath + 'star/23').expect('read star', done);		
	});

	it('Update', function(done) {
		request(app).put(basePath + 'star/23').expect(200, 'update star', done);		
	});

	it('Delete', function(done) {
		request(app).del(basePath + 'star/23').expect(200, 'delete star', done);		
	});
	
});

