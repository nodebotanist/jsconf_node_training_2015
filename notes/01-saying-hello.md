# Saying Hello with Node

## Example 1-1: Hello, World!

### What to do:

* Write a server the responds to requests with "Hello, World!" and listens to port 1337 on your local machine. Use `hello-server.js`

### Example pseudocode

* require the http module
* create a server
* get that server to listen to port 1337
* have the server respond to requests with "Hello, World!"

### Notes

* http module - we need this to set up our server
    * `.createServer()` creates a server,takes a handler
        * handler is passed `request` and `response` objects
            * `response.writeHead()` allows us to set headers
            * `response.end()` ends the response with the passed-in data, and sends it back to the requester
    * `.listen()` connects that server to a port
* Run node programs with `node filename.js` in your terminal
* To see if it works, go to http://localhost:1337 in your browser, or, in your terminal, use `curl http://localhost:1337`

## Example 1-2: Setting up a Hapi-er server

### What to do:

* Create a server using Hapi that responds to requests with "Hello, World!" and listens to port 1337 on your local machine. Use `hello-server-hapi.js`

### Example pseudocode

* Require the Hapi module
* Construct a Hapi Server object
* Tell it to listen to port 1337
* Create a route for '/'
* Have the route reply with "Hello, World!"

### Notes

* Creating a route: use `server.route()`
    * This takes in an object with properties `method`, `path`, and `handler`
    * `response` has been replaced by a `reply()` function that we can use

## Example 1-3: Route paramters in Hapi

### What to do:

Add to your `hello-server-hapi.js` and create a route for our Hapi server that takes a name as the second segment in the url. It will reply "Hello, [name]!". For instance, if I go to 'http://localhost:1337/Kassandra', I will get "Hello, Kassandra!" back.

### Example pseudocode

* create a second route on our `server` object, with a paramter name. Then, reply with "Hello, ", and then the name.

### Notes

* To establish a paramter in a route, we use {} to denote the variable, and put the name inside: '/{myvariable}'
* We access the value passed in using `request.params.[variableName]`, e.g. `request.params.myvariable`
