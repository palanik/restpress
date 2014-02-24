var express = require('express');
var stars = require('./stars.js');

var app = express();
app.set('port', process.env.PORT || 3010);

// Use body parser before calling restpress
app.use(express.bodyParser());

// 
stars.app(app);

if (!module.parent) {
	app.listen(app.get('port'));
	console.log("Server running on port: " + app.get('port'));
}
