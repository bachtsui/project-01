$(document).ready(function(){
  console.log('Sanity Check: app.js loaded!');

  $.ajax({
  	method:"GET",
  	url:"/api",
  	success: function (response){
  		console.log ("GET /api is working!");
  		console.log(response[0]);
  		console.log(response[0].name);
  		console.log(response[0].growthTime);
  		console.log(response[0].description);
  	},

  	error: function(){
  		console.log("Error with /api GET");
  	}
  });

});