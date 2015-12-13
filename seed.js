//Remember seed.js populates our database
//Don't forget to run nodemon seed.js for checks

var db = require("./models"); //var db is importing everything models is exporting out I think

var hairStyle = [];

hairStyle.push({
	name: "ASDF123",
	growthTime:"3 Months",
	description: "Noticeable by pointyness"
});

hairStyle.push({
	name: "QWERTY456",
	growthTime:"6 Months",
	description: "Justin wears this beard"
});

var sampleQuotes = [];