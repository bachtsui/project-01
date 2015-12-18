//Remember seed.js populates our database
//Don't forget to run nodemon seed.js for checks

var db = require("./models"); //var db is importing everything models is exporting out I think

var hairStyleList = [];

hairStyleList.push({
	name: "Handlebar Mustache",
	growthTime:"3 Beard Months",
	description: "A simple yet refined mustache."
});

hairStyleList.push({
	name: "Lumberjack Beard",
	growthTime:"1 Beard Year",
	description: "Beefy like Mom's Famous Beef Stew."
});

hairStyleList.push({
	name: "Friendly Mutton Chops",
	growthTime:"8 Beard Months",
	description: "It's only 'Friendly' when it connects to your mustache."
});

hairStyleList.push({
	name: "Fu Manchu Moustache",
	growthTime:"2 Beard Years + 40 Years of Wisdom",
	description: "If they're Asian and have a Fu Manchu, they're evil."
});

hairStyleList.push({
	name: "Applestache",
	growthTime:"2 Beard Months",
	description: "A stache that can be worn by everyone"
});


//Hard coded Quotes list.
var sampleQuotes = [];

sampleQuotes.push ({ 
	body: "What a handsome beard!",
	voteCounter:0,
	author: "Mr. X",
	date: "December 1st, 2015",
});

sampleQuotes.push ({ 
	body: "I feel the beard",
	voteCounter:0,
	author: "Mr. Y",
	date: "December 3rd, 1998",
});

var samplePics = [];

samplePics.push({
	url: "http://vignette3.wikia.nocookie.net/rickandmorty/images/7/70/Snuffles-helmet.jpg/revision/latest?cb=20131212193614",
	// caption: "Nice picture!",
	// date:"December 1, 2015",
});

samplePics.push({
	url: "http://d55ohm6038bug.cloudfront.net/June2014-Bojack/images/bojack_contact.png",
	// caption: "What is this?",
	// date:"February 25, 2013",
});


hairStyleList.forEach(function(hairstyle){
	hairstyle.quotes = sampleQuotes;
	hairstyle.pics = samplePics;
});


db.hairStyle.remove({}, function(err, hairStyle){
//Makes sure all existing entries are deleted first

  db.hairStyle.create(hairStyleList, function(err, hairStyle){
    if (err) { return console.log("Error with creation in Seed.js: " , err); }
    console.log("all facial hair:", hairStyleList);
    console.log("created", hairStyleList.length, "facial hair entries");
    process.exit();
  });

});