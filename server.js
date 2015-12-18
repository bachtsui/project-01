/**********************************

  Doug,
    Solid work!  I had to be a little nitpicky about coding convention and syntax, but that just means those were the only real problems I could find :)  I'm looking forward to further development in your project. I really like your idea, user story, and wireframes, and I'm excited to see your further progress.

    -JC

    ps. Your nodemon is calling seed.js but not server.js. This seeds your db but server.js never runs. Please change this.

**********************************/
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

// TODO: Please remove unused and commented-out code from production versions as it will slow down performance. -jc
//How does this block of code work exactly? Ask
//for some guidance on it, and how to connect another
//html page

/*
 * JSON API Endpoints
 */

////////////HAIRSTYLE API ENDPOINTS////////////////
app.get("/api", function readHairStyles (request, response){
	db.hairStyle.find({}, function (err, hairStyle){ //Find all objects in database under hairstyle
    // TODO: Please fix indentation issues -jc
    // TODO: Please remove unecessary console.logs from production versions as it will slow down performance. -jc
	console.log("Serverside GET /api:" , hairStyle);
	response.json(hairStyle);
	});
});

app.post("/api/hairstyle", function postHairStyles (request, response){
	//console.log("What was requested from client" , request.body);

  // TODO: Consider assigning your db search information to a variable that you declare outside of the db call. This gives your code a clean look and will be much more efficient in the long run. -jc
	db.hairStyle.create(request.body, function (err, hairstyle){
		if(err){console.log("Here's the error for db create: ", err);}
    // TODO: Please remove unecessary console.logs from production versions as it will slow down performance. -jc
    console.log(hairstyle);
		response.json(hairstyle);
	// creates the requested body from ajax and puts it in the database
	});
});

app.delete("/api/hairstyle/:id", function deleteHairStyle (request, response){
  // TODO: Please remove unused and commented-out code from production versions as it will slow down performance. -jc
	//console.log("ID being deleted: " , request.params.id);

  // TODO: Consider assigning your db search information to a variable that you declare outside of the db call. This gives your code a clean look and will be much more efficient in the long run. -jc
	db.hairStyle.remove({_id: request.params.id}, function (err){
    // TODO: Please fix indentation issues -jc

	if (err){return console.log(err);}
  // TODO: Please remove unecessary console.logs from production versions as it will slow down performance. -jc
	console.log("Removed Entry ID= " + request.params.id + "done!");
	response.status(200).send(); //it was ok!
	});
});

app.put("/api/hairstyle/:id", function updateHairStyle (request, response){
	//FIX THIS ENDPOINT TO HAVE PARITY WITH QUOTE API ENDPOINTS

  // TODO: Please remove unused and commented-out code from production versions as it will slow down performance. -jc
	//console.log("updated id: " , request.params.id);
	//console.log("received body: ", request.body);

  // TODO: Consider assigning your db search information to a variable that you declare outside of the db call. This gives your code a clean look and will be much more efficient in the long run. -jc
	db.hairStyle.findOne({_id: request.params.id}, function (err, foundHairstyle){
		if (err) {console.log("error" , err); }
    // TODO: can we simply assign foundHairstyle = request.body ? if not, ignore. :) -jc
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
  // TODO: Please remove unecessary console.logs from production versions as it will slow down performance. -jc
	console.log('quote body', request.body);

  // TODO: Consider assigning your db search information to a variable that you declare outside of the db call. This gives your code a clean look and will be much more efficient in the long run. -jc
	db.hairStyle.findOne({_id: request.params.hairstyleId}, function (err, hairstyle){
		if (err) { console.log('error', err); }

		var quote = new db.Quote(request.body);
		hairstyle.quotes.push(quote);
		hairstyle.save(function(err, savedHairStyle){
			if (err) { console.log('error', err); }
      // TODO: Please remove unecessary console.logs from production versions as it will slow down performance. -jc
			console.log('hairstyle with new quote: ', savedHairStyle);
			response.json(quote);
		});
	});
});

app.delete("/api/hairstyle/:hairstyleId/quotes/:id", function deleteQuote (request, response){
  // TODO: Please remove unused and commented-out code from production versions as it will slow down performance. -jc
	//console.log("ID being deleted: " , request.params.id);
	var hairStyleId = request.params.hairstyleId;
	var quoteId = request.params.id;

  // TODO: Please remove unecessary console.logs from production versions as it will slow down performance. -jc
	console.log(request.params);
	console.log("HSID from app.delete" , hairStyleId);
	console.log("QuoteID from app.delete" , quoteId);

	db.hairStyle.findOne({_id: hairStyleId}, function (err, foundHairStyle){
		if (err) {console.log(err);}
		var foundQuote = foundHairStyle.quotes.id(quoteId);

		foundQuote.remove();

		foundHairStyle.save(function(err , saved){
			if(err){console.log('error', err);}
			response.json(saved);
		});
	});
});
 /**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
