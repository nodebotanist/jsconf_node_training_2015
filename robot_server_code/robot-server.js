/* 
  This server is set up for students that don't have the robot ready but want to run the server.
  It has the same API, it just won't make lights change color.
*/

var Hapi = require('hapi');
var Joi = require('joi');

var server = new Hapi.Server();
server.connection({ port: 3000 });

var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
  //Robot initialization code goes here!
  var led1 = new five.Led.RGB([2, 3, 4]);
  var led2 = new five.Led.RGB([5, 6, 7]);
  var led3 = new five.Led.RGB([8, 9, 10]);
  var led4 = new five.Led.RGB([11, 12, 13]);

  this.repl.inject({
    led1: led1,
    led2: led2,
    led3: led3,
    led4: led4
  });

  led1.on();
  led2.on();
  led3.on();
  led4.on();

  //let's set up the color queue!
  var color_queue = [];
  var colors_on_display = [[0,0,0], [0,0,0], [0,0,0], [0,0,0]];
  var leds = [led1, led2, led3, led4];

  function colorShift(){
    if(color_queue.length > 0){
      //if colors on display is 4, we need to move one out
      if(colors_on_display.length == 4){
        colors_on_display.shift();
      }

      var new_color = color_queue.shift();
      colors_on_display.push(new_color);

      //re-render robot here.
      for(var led = 0; led < 4; led++){
        leds[led].color([
          255 - colors_on_display[led][0], 
          255 - colors_on_display[led][1], 
          255 - colors_on_display[led][2], 
        ]);
      }
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
});