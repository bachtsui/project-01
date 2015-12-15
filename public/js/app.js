$(document).ready(function(){
  console.log('Sanity Check: app.js loaded!');

  //READS ALL ENTRIES ONTO THE PAGE
  $.ajax({
  	method:"GET",
  	url:"/api",
  	success: function (response){
  		console.log ("GET /api is working!");

      response.forEach(function(hairstyle) {
        renderHairStyle(hairstyle);
      });
  	},

  	error: function(){
  		console.log("Error with /api GET");
  	}
  });

  //CREATE A NEW HAIRSTYLING
  $("#hairstyle-form").on("submit", function (event){ 
  	event.preventDefault();
  	//prevents the default function of click

    console.log ("You clicked the button");

	  var formData = $(this).serialize();
  	//The data from the form will be serialized
  	
  	console.log("Your form data client side: " + formData);

	$.ajax({
		method: "POST",
		url: "/api/hairstyle",
		data: formData,
		success: function (response) {
			console.log("Post Response from Server: " , response);
		},
		error: function() {
			console.log("Error with /api/hairstyle Post");
		}
	});

	$(this).trigger("reset");
	//reset the form
  });

  //DELETE A CURRENT HAIRSTYLING
  $("#hairStyle").on("click", ".delete-hairstyle", function (event){
  event.preventDefault();
  //#hairStyle exists and is always listening
  //.delete-hairstyle is created already and now can be clicked on
  
  console.log("You pressed the delete button");
  var hairStyleID = $(this).parents('.hairstyle-box').data('hairstyle-id');
  console.log("HSD: " , hairStyleID);
        //write body to check for ID

  $.ajax({
    method: 'DELETE',
    url:("/api/hairstyle/" + hairStyleID),
    success: function() {
      console.log("Deleted!");
      $("[data-hairstyle-id=" + hairStyleID + "]").remove();
    }
  });
  
  });
});

//We'll use this function to create one hairstyle entry on the page
function renderHairStyle (hairstyle){
  console.log("rendering hairstyle: ", hairstyle);

  var hairstyleHtml =
  "<!-- One Hairstyle Entry -->" +
  "<div class = 'hairstyle-box' data-hairstyle-id = '" + hairstyle._id + "'>" +
    "<span class = 'hair-style-id'> <p> HairstyleID: " + hairstyle._id + "</p></span>" +
    "<span class = 'hairstyle-name'> <p> Name: " + hairstyle.name + "</p></span>" +
    "<span class = 'hairstyle-growthtime'> <p> Growth Time: " + hairstyle.growthTime + "</p></span>" +
    "<span class = 'hairstyle-description'> <p> Description: " + hairstyle.description + "</p></span>" +
    "<span class = 'hairstyle-delete-btn'> <button class='btn btn-danger delete-hairstyle'>Delete</button></span>" +
  "</div>" +
  "<!-- end One Hairstyle Entry -->";

  $("#hairStyle").append(hairstyleHtml);
}
