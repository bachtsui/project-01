//Remember seed.js populates our database
//Don't forget to run nodemon seed.js for checks

var db = require("./models"); //var db is importing everything models is exporting out I think

var hairStyleList = [];

hairStyleList.push({
	name: "ASDF123",
	growthTime:"3 Months",
	description: "Noticeable by pointyness"
});

hairStyleList.push({
	name: "QWERTY456",
	growthTime:"6 Months",
	description: "Justin wears this beard"
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

var sampleImages = [];

sampleImage.push({
	url: "http://vignette3.wikia.nocookie.net/rickandmorty/images/7/70/Snuffles-helmet.jpg/revision/latest?cb=20131212193614",
	caption: "Nice picture!",
	date:"December 1, 2015",
});

sampleImage.push({
	url: "http://d55ohm6038bug.cloudfront.net/June2014-Bojack/images/bojack_contact.png",
	caption: "What is this?",
	date:"February 25, 2013",
});


hairStyleList.forEach(function(hairstyle){
	hairstyle.quotes = sampleQuotes;
	hairstyle.pics = sampleImages;
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