var mongoose = require("mongoose");
//mongoose.connect("mongodb://localhost/project01");
mongoose.connect(process.env.MONGOLAB_URI ||
                 process.env.MONGOHQ_URL || 
                 "mongodb://localhost/project01");

module.exports.Pic = require("./image.js");
module.exports.Quote = require ("./quote.js");
module.exports.hairStyle = require("./hairstyle.js");

