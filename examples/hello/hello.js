var restpress = require('../../index');
var msg = new restpress('message');

var data = [
    {
	"id" : 1,
	"message" : "Hello, World!"
    },
    {
	"id" : 2,
	"message" : "Good Bye!"
    }
];

msg.list(function(req, res) {
	res.json(data);
});

msg.get(function(req, res) {
	res.json(data[req.params.id - 1]);
});

var express = require('express');
var app = express();

msg.app(app);

app.listen(3010);
console.log("Try http://localhost:3010/message/");
