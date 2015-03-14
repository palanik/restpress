restpress
=========
Minimalist REST framework for [express](http://expressjs.com/).

  [![NPM version](https://img.shields.io/npm/v/restpress.svg?style=flat)](https://www.npmjs.org/package/restpress)
  [![Build Status](https://img.shields.io/travis/palanik/restpress.svg?style=flat)](https://travis-ci.org/palanik/restpress)

msg.js
```js
var restpress = require('restpress');
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

msg.create(function(req, res) {
  data.push({"id" : data.length, "message" : req.body.message});
  res.json(data[data.length - 1]);
});

msg.update(function(req, res) {
  data[req.params.id - 1].message = req.body.message;
  res.json(data[req.params.id - 1]);
});

module.exports = msg;
```

app.js
```js
var express = require('express');
var app = express();

/*
 * If your API uses POST/PUT methods, use bodyparser.
 *
 * // Express 3.x
 * app.use(express.bodyParser());
 *
 */
// Express 4.x
var bodyParser = require('body-parser');
app.use(bodyParser.json());

require('msg').app(app);

app.listen(3010);
```

Shift your focus from Routes to Resources, while building RESTful API with node express.

Generally, express applications are built by providing callbacks to defined routes.
But, RESTFul APIs are more about resources and actions on the resources, than about the routes. Restpress brings the two together. 
Just like connect is to node & express is to connect, restpress enhances express in creating RESTful applications.

Create action oriented, restful resources independently and then inject them to your express application.
Add multiple resources to the same express app.

Although, you create your resources independently, restpress is not a http server. It depends on an express application to run and serve the resources.

## Test

    $ npm test

## License

  [MIT](LICENSE)
