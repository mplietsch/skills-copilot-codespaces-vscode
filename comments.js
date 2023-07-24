// Create web server
// 1. create a web server
// 2. create a route for the home page
// 3. create a route for the comments page
// 4. create a route for the comments api
// 5. create a route for the comments form
// 6. create a route for the comments form submission

// 1. create a web server
var express = require('express');
var app = express();

// 2. create a route for the home page
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});

// 3. create a route for the comments page
app.get('/comments', function(request, response) {
  response.sendFile(__dirname + '/comments.html');
});

// 4. create a route for the comments api
app.get('/api/comments', function(request, response) {
  response.send('this is the comments api');
});

// 5. create a route for the comments form
app.get('/comments/new', function(request, response) {
  response.sendFile(__dirname + '/comments_form.html');
});

// 6. create a route for the comments form submission
app.get('/comments/create', function(request, response) {
  response.send('this is where the form submission will be handled');
});

// start the web server
app.listen(8080, function() {
  console.log('listening on port 8080');
});