var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var QuoteSchema = new Schema({
	body:String,
	voteCounter:Number,
	author: String,
	date: String,
});

var Quote = mongoose.model("Quote", QuoteSchema);

module.exports = Quote; //Exporting the Quote variable you made
