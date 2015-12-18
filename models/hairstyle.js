var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Quote = require("./quote.js"); //Imports what Quote is exporting
var Pic = require("./image.js"); //Imports what Pics is exporting


var hairStyleSchema = new Schema({
	name: String,
	growthTime:String,
	description: String,
	quotes:[Quote.schema],
	pics:[Pic.schema]
});

var hairStyle = mongoose.model("hairStyle", hairStyleSchema);

module.exports = hairStyle; //Exports hairStyle model
