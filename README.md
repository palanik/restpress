restpress
=========

Shift your focus from Routes to Resources, while building RESTful apps with node express.

Traditionally express applications are build by providing callbacks for defined routes.
But, RESTFul APIs are more about resources and actions on the resources than the routes. Restpress brings the two together. 
Just like connect is to node & express is to connect, restpress enhances express for creating RESTful applications.

Create action oriented, restful resources independently and then inject them to your express application.
More than one resource can be added to the same express app.

Although, you create your resources independently, restpress is not a http server and depends on an express application to run and serve the resources.

## Test

    $ make test