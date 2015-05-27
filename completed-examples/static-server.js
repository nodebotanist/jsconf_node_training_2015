//Example 1-2
var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: 1337 });

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: 'public'
        }
    }
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});