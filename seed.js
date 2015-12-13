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

var sampleQuotes = [];

db.hairStyle.remove({}, function(err, hairStyle){
//Makes sure all existing entries are deleted first

  db.hairStyle.create(hairStyleList, function(err, hairStyle){
    if (err) { return console.log("Error with creation in Seed.js: " , err); }
    console.log("all facial hair:", hairStyleList);
    console.log("created", hairStyleList.length, "facial hair entries");
    process.exit();
  });

});