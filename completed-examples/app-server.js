//Example 1-2
var Hapi = require('hapi');
var Joi = require('joi');
var request = require('request');

var server = new Hapi.Server();
server.connection({ port: 1337 });

var robotServer = 'http://localhost:3000';

server.route({
	method: 'GET',
	path: '/colorQueue',
	handler: function(req, reply){
		request(robotServer + '/getColorQueue', function(err, response, body){
			reply(body);
		})
	}
});

server.route({
	method: 'GET',
	path: '/addColor/{red}/{green}/{blue}',
	handler: function(req, reply){
		request.post({
			url: robotServer + '/addColor',
			form: {
				red: req.params.red,
				green: req.params.green,
				blue: req.params.blue
			}
		},
		function(err, response, body){
			reply(body);
		})
	},
	config: {
		validate: {
			params: {
				red: Joi.number().min(0).max(255),
				green: Joi.number().min(0).max(255),
				blue: Joi.number().min(0).max(255)
			}
		}
	}
});

server.route({
	method: 'POST',
	path: '/addColor',
	handler: function(req, reply){
		request.post({
			url: robotServer + '/addColor',
			form: {
				red: req.payload.red,
				green: req.payload.green,
				blue: req.payload.blue
			}
		},
		function(err, response, body){
			reply(body);
		})
	}
})

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
