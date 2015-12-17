// SERVER-SIDE JAVASCRIPT

//require express in our app
var express = require('express');
// generate a new express app and call it 'app'
var app = express();
var mongoose = require("mongoose");
var bodyParser = require('body-parser');

//So we made a variable here again that imports information from models
var db = require("./models");

//use body parser
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/


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

////////////HAIRSTYLE API ENDPOINTS////////////////
app.get("/api", function readHairStyles (request, response){
	db.hairStyle.find({}, function (err, hairStyle){ //Find all objects in database under hairstyle
	console.log("Serverside GET /api:" , hairStyle);
	response.json(hairStyle);
	});
});

app.post("/api/hairstyle", function postHairStyles (request, response){
	//console.log("What was requested from client" , request.body);

	db.hairStyle.create(request.body, function (err, hairstyle){
		if(err){console.log("Here's the error for db create: ", err);}
		console.log(hairstyle);
		response.json(hairstyle);
	// creates the requested body from ajax and puts it in the database
	});
});

app.delete("/api/hairstyle/:id", function deleteHairStyle (request, response){
	//console.log("ID being deleted: " , request.params.id);
	
	db.hairStyle.remove({_id: request.params.id}, function (err){
	if (err){return console.log(err);}
	console.log("Removed Entry ID= " + request.params.id + "done!");
	response.status(200).send(); //it was ok!
	});
});

app.put("/api/hairstyle/:id", function updateHairStyle (request, response){
	//FIX THIS ENDPOINT TO HAVE PARITY WITH QUOTE API ENDPOINTS

	//console.log("updated id: " , request.params.id);
	//console.log("received body: ", request.body);

	db.hairStyle.findOne({_id: request.params.id}, function (err, foundHairstyle){
		if (err) {console.log("error" , err); }
		foundHairstyle.name = request.body.name;
		foundHairstyle.growthTime = request.body.growthTime;
		foundHairstyle.description = request.body.description;
		foundHairstyle.save(function(err, saved){
			if(err){console.log("error", err); }
			response.json(saved);
		});
	});
});

////////////QUOTE API ENDPOINTS////////////////


app.post('/api/hairstyle/:hairstyleId/quotes', function createQuote (request, response){
	console.log('quote body', request.body);

	db.hairStyle.findOne({_id: request.params.hairstyleId}, function (err, hairstyle){
		if (err) { console.log('error', err); }

		var quote = new db.Quote(request.body);
		hairstyle.quotes.push(quote);
		hairstyle.save(function(err, savedHairStyle){
			if (err) { console.log('error', err); }
			console.log('hairstyle with new quote: ', savedHairStyle);
			response.json(quote);
		});
	});
});

app.delete("/api/hairstyle/:hairstyleId/quotes/:quoteId", function deleteQuote (request, response){
	//console.log("ID being deleted: " , request.params.id);
	
	db.hairStyle.quotes.remove({_id: request.params.id}, function (err){
	if (err){return console.log(err);}
	console.log("Removed Entry ID= " + request.params.id + "done!");
	response.status(200).send(); //it was ok!
	});
});
 /**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});