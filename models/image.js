var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PicSchema = new Schema({
	url: String,
	caption: String,
	date:String,
});

var Pic = mongoose.model("Pic", PicSchema);

module.exports = Pic; //Exporting the Pic variable you made
