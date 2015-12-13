// SERVER-SIDE JAVASCRIPT

//require express in our app
var express = require('express');
// generate a new express app and call it 'app'
var app = express();
var mongoose = require("mongoose");
var bodyParser = require('body-parser');

//Umm, this does something.....
//var db = require("./models");

//use body parser
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

var hairStyle = [];

hairStyle.push({
	_id: 0,
	name: "Handlebar Mustache",
	growthTime:"3 Months",
	quote:"That's a fine mustache",
	image:"images/handlebar/HB_mustache.jpg"
});

hairStyle.push({
	_id: 1,
	name: "Lumberjack Beard",
	growthTime:"6 Months",
	quote:"Wow what a manly beard",
	image:"images/lumberjack/lumberjack.jpg"
});

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

//How does this block of code work exactly? Ask
//for some guidance on it, and how to connect another
//html page

/*
 * JSON API Endpoints
 */

app.get("/api", function api_index (request, response){
	console.log("Serverside:" , hairStyle);
	response.json(hairStyle);
});



 /**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});