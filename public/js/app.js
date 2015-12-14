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

  			$("#hairStyle").append("<button class='btn btn-danger delete-hairstyle'>Delete</button>");
  			//adding a delete button
  		}
  	},

  	error: function(){
  		console.log("Error with /api GET");
  	}
  });

  //POST NEEDS HELP!!!
  $("#hairstyle-form").on("submit", function (event){ //POTENTIALLY WRONG SELECTOR
  	event.preventDefault();
  	//prevents the default function of click

	var formData = $(this).serialze();
  	//The data from the form will be serialized
  	
  	console.log("Your form data client side:" + formData);

	$.ajax({
		method: "POST",
		url:"/api/hairstyle",
		data:formData,
		success: function (response){
			console.log("Post Response from Server: " , response);
			// $("#hairStyle").append("<p> Name: " + response[0].name + "</p>");
			// $("#hairStyle").append("<p> Growth Time: " + response[0].growthTime + "</p>");
			// $("#hairStyle").append("<p> Description: " + response[0].description + "</p>");
		},
		error: function(){
			console.log("Error with /api/hairstyle Post");
		}
	});

	$(this).trigger("reset");
	//reset the form
  });
});