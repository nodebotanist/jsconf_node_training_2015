# Making requests to other servers

## Excercise 3-1: Review

### What to do:

Build a Hapi server that staticly serves files from `public` and has a
route for GET /colorQueue that replies 'COLORS!' in `app-server.js`

### Pseudocode and Notes

Review the previous few documents. 

## Excercise 3-2: Pinging the robot server

### What to do:

Using the URL posted on the screen, write a function that gets and saves
the color queue from the robot every 5 seconds.

The robot server has an API call, GET '/getColorQueue', that will return
its color queue

### pseudocode

* install request with npm
* create function that makes a GET call to [URL]/getColorQueue
* set it on a 5 second interval timer
* reply with the queue

### Notes

* Request has a function request(url, callback(error, response, body))
* We need to reply with the BODY of the request, unless there is an error.
* if there is an error, reply with the error

## Excercise 3-3: Sending a color to the robot server

### What to do

Write a route at GET /addColor/{red}/{green}/{blue} that takes those URL params and makes a request to the robot server at POST /addColor that sends form Data red, green, and blue

### pseudocode

* Write a route at GET /addColor that takes red, green, and blue
* Using that data, make a POST request to the robot server
* Send data red, green, and blue to the robot server

### Notes

* request has a `.post` method:
* request.post('http://service.com/upload', {form:{key:'value'}})
* We want to put red, green, and blue into the form attribute.
