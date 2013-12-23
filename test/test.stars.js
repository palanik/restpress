var express = require('express')
  , request = require('supertest')
  , restpress = require('../');
  
  
describe('preApp-stars', function() {
		var rp = new restpress('/space/', 'star');

		// Methods
		// List			
		rp.list(function (req, res) {
			res.send(200, "list stars");
		});
		
		// Read
		rp.read(function (req, res) {
			res.send(200, "read star");
		});
		
		// Create
		rp.create(function (req, res) {
			res.send(200, "create star");
		});
		
		// Update
		rp.update(function (req, res) {
			res.send(200, "update star");
		});
		
		// Delete
		rp.delete(function (req, res) {
			res.send(200, "delete star");
		});
		
		var app = express();
		app.use(express.bodyParser());
		
		rp.app(app);
		
	it('Index', function(done) {
		request(app).get('/space/star').expect(200, "list stars", done);	
	});

	it('Create', function(done) {
		request(app).post('/space/star').expect(200, 'create star', done);		
	});

	it('Read', function(done) {
		request(app).get('/space/star/1').expect('read star', done);		
	});

	it('Update', function(done) {
		request(app).put('/space/star/1').expect(200, 'update star', done);		
	});

	it('Delete', function(done) {
		request(app).del('/space/star/1').expect(200, 'delete star', done);		
	});
	
});


describe('postApp-stars', function() {
		var app = express();
		app.use(express.bodyParser());
		
		var rp = new restpress('/space/', 'star');
		rp.app(app);

		// Methods
		// List			
		rp.list(function (req, res) {
			res.send(200, "list post stars");
		});
		
		// Read
		rp.read(function (req, res) {
			res.send(200, "read post star");
		});
		
		// Create
		rp.create(function (req, res) {
			res.send(200, "create post star");
		});
		
		// Update
		rp.update(function (req, res) {
			res.send(200, "update post star");
		});
		
		// Delete
		rp.delete(function (req, res) {
			res.send(200, "delete post star");
		});
		
		
	it('Index', function(done) {
		request(app).get('/space/star').expect(200, "list post stars", done);	
	});

	it('Create', function(done) {
		request(app).post('/space/star').expect(200, 'create post star', done);		
	});

	it('Read', function(done) {
		request(app).get('/space/star/1').expect('read post star', done);		
	});

	it('Update', function(done) {
		request(app).put('/space/star/1').expect(200, 'update post star', done);		
	});

	it('Delete', function(done) {
		request(app).del('/space/star/1').expect(200, 'delete post star', done);		
	});
	
});
