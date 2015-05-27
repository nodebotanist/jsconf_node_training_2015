# Creating a static server with Node and Hapi

## Excercise 2-1: Using middleware to create our static server

### What to do:

Using Hapi and the concept of middleware, create a Node server that serves up assets from the /public folder. Use static-server.js

### Example pseudocode

* Create a Hapi server
* set up static routing using middleware
* set the server to listen to a port

### Notes

* You're going to create a regular server.route, but there's an option for
`handler` called `directory` that serves from a directory of your choice.
You want that directory to map to `public`.
* For our route path, we want to capture `{param*}` which will be passed to
our directory handler by Hapi