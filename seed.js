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


//Hard Coded Quotes

var handlebarQuote = [
	{ 
	body: "'That's a fine mustache, would you fancy a mustache joust?'",
	voteCounter:0,
	author: "Sir William the III",
	date: "March 5th, 1923",
	}
];

var lumberjackQuote = [
	{ 
	body: "'By the power of Shamwow, I am not worthy to be in your presence!'",
	voteCounter:0,
	author: "Barry Manshark",
	date: "July 23th, 1970",
	}
];

var muttonchopQuote = [
	{ 
	body: "'Ah your sideburns connect with your mustache, you must be friendly.'",
	voteCounter:0,
	author: "John McJoey",
	date: "October 31st, 1985",
	}
];

var fumanchuQuote = [
	{ 
	body: "'I should have known you'd be behind this, fiendish Dr. Wu.'",
	voteCounter:0,
	author: "Black Dynamite",
	date: "October 16th, 2009",
	}
];

var applestacheQuote = [
	{ 
	body: "'You don't know what the Applestache is? Everyone knows!'",
	voteCounter:0,
	author: "Everyone Ever",
	date: "December 18th, 2015",
	}
];

hairStyleList[0].quotes = handlebarQuote;
hairStyleList[1].quotes = lumberjackQuote;
hairStyleList[2].quotes = muttonchopQuote;
hairStyleList[3].quotes = fumanchuQuote;
hairStyleList[4].quotes = applestacheQuote;

var handlebarPic = [
	{
		url:"./images/handlebar/HB_mustache.jpg"
	}
];

var lumberjackPic = [
	{
		url:"./images/lumberjack/lumberjack.jpg"
	}
];

var muttonchopPic = [
	{
		url:"./images/muttonchop/muttonchopOne.jpg"
	}
];

var fumanchuPic = [
	{
		url:"./images/fumanchu/fumanchu.jpg"
	}
];

var applestachePic = [
	{
		url:"./images/applestache/applestache.jpg"
	}
];


hairStyleList[0].pics = handlebarPic;
hairStyleList[1].pics = lumberjackPic;
hairStyleList[2].pics = muttonchopPic;
hairStyleList[3].pics = fumanchuPic;
hairStyleList[4].pics = applestachePic;


db.hairStyle.remove({}, function(err, hairStyle){
//Makes sure all existing entries are deleted first

  db.hairStyle.create(hairStyleList, function(err, hairStyle){
    if (err) { return console.log("Error with creation in Seed.js: " , err); }
    console.log("all facial hair:", hairStyleList);
    console.log("created", hairStyleList.length, "facial hair entries");
    process.exit();
  });

});