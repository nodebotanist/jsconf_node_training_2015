# Handling form data in our Hapi/Node app

## Excercise 4-0: Setting up our form

### What to do:

* Set up a form in public/index.html that takes a red, green, and blue input
* and posts to /addColor

## Excercise 4-1: Handling form data in Hapi

### What to do:

Write a route that watches for POST to /addColor. Use the form data to make the same request to the robot server's /addColor that you did with your GET /addColor route.

### Notes:

When you write a POST route, Hapi gives you access to the form data through `request.payload`!
