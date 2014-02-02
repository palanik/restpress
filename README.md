restpress
=========
Minimalist REST framework for express.

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

module.exports = msg;
```

app.js
```js
var express = require('express');
var app = express();

require('msg').app(app);

app.listen(3010);
```

Shift your focus from Routes to Resources, while building RESTful API with node express.

express applications are created by providing callbacks for defined routes.
But, RESTFul APIs are more about resources and actions on the resources, than about the routes. Restpress brings the two together. 
Just like connect is to node & express is to connect, restpress enhances express for creating RESTful applications.

Create action oriented, restful resources independently and then inject them to your express application.
More than one resource can be added to the same express app.

Although, you create your resources independently, restpress is not a http server and depends on an express application to run and serve the resources.

## Test

    $ make test