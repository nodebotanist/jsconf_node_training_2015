/* 
  This server is set up for students that don't have the robot ready but want to run the server.
  It has the same API, it just won't make lights change color.
*/

var Hapi = require('hapi');
var Joi = require('joi');

var server = new Hapi.Server();
server.connection({ port: 3000 });

//Robot initialization code goes here!

//let's set up the color queue!
var color_queue = [];
var colors_on_display = [[0,0,0], [0,0,0], [0,0,0], [0,0,0]];

function colorShift(){
  if(color_queue.length > 0){
    //if colors on display is 4, we need to move one out
    if(colors_on_display.length == 4){
      colors_on_display.shift();
    }

    var new_color = color_queue.shift();
    colors_on_display.push(new_color);

    //re-render robot here.
  }
}

//we want the color to shift every 5 seconds
setInterval(colorShift, 5000);

//routes go here!
server.route({
  method: 'GET',
  path: '/getColorQueue',
  handler: function (request, reply){
    reply(
      JSON.stringify({
        colorsQueued: color_queue,
        colorsOnDisplay: colors_on_display
      })
    );
  }
});

server.route({
  method: ['PUT', 'POST'],
  path: '/addColor',
  handler: function (request, reply){
    color_queue.push([request.payload.red, request.payload.green, request.payload.blue]);
    reply('color added');
  },
  config: {
    validate: {
      payload: {
        red: Joi.number().min(0).max(255),
        green: Joi.number().min(0).max(255),
        blue: Joi.number().min(0).max(255)
      }
    }
  }
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});