$(document).ready(function(){
  console.log('Sanity Check: app.js loaded!');

  $.ajax({
  	method:"GET",
  	url:"/api",
  	success: function (response){
  		console.log ("GET /api is working!");
  		for(var i = 0; i < response.length; i++){
  			console.log(response[i].name);
  			console.log(response[i].growthTime);
  			console.log(response[i].description);
  			$("#hairStyle").append("<p> Name: " + response[i].name + "</p>");
  			$("#hairStyle").append("<p> Growth Time: " + response[i].growthTime + "</p>");
  			$("#hairStyle").append("<p> Description: " + response[i].description + "</p>");
  		}
  	},

  	error: function(){
  		console.log("Error with /api GET");
  	}
  });

});