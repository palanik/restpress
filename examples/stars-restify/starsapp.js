var restify = require('restify');
var stars = require('./stars.js');

var server = restify.createServer({
  name: 'Stars API',
  version: '1.0.0'
});

var port = process.env.PORT || 3010;

// To allow training spaces
server.pre(restify.pre.sanitizePath());

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
// Use body parser before calling restpress
server.use(restify.bodyParser());

stars.app(server);

if (!module.parent) {
	server.listen(port);
	console.log("%s running at %s: ", server.name, server.url);
}

