$(document).ready(function(){
  console.log('Sanity Check: app.js loaded!');

  //READS ALL HAIRSTYLE ENTRIES ONTO THE PAGE
  readAllHairStyleEntry();

  //CREATE A NEW HAIRSTYLE ENTRY
  $("#hairstyle-form").on("submit", createHairStyleEntry);

  //DELETE A CURRENT HAIRSTYLING
  $("#hairStyle").on("click", ".delete-hairstyle", deleteHairStyleEntry);

  //EDIT A CURRENT HAIRSTYLING
  $("#hairStyle").on("click", ".edit-hairstyle", handleEditHairStyleClick);
  $("#hairStyle").on("click", ".put-hairstyle", handleSaveChangesClick);

  //CREATE A NEW QUOTE
  $("#hairStyle").on("click", ".add-quote", handleNewQuoteButtonClick);

  //DELETE A QUOTE
  $("#hairStyle").on("click", ".delete-quote", handleDeleteQuoteButton);

  //CREATE A PICTURE
  $("#hairStyle").on("click", ".add-picture", handleNewPicButtonClick);

});

//////////HairStyle Functions//////////////

function getHairStyleEntryById(id) {
  return $("[data-hairstyle-id=" + id + "]");
  //I might need some explanation on this
}

function readAllHairStyleEntry() {
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
}

function createHairStyleEntry() {
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
}

function deleteHairStyleEntry() {
  event.preventDefault();
  
  console.log("You pressed the delete button");
  var hairStyleID = $(this).parents('.hairstyle-box').data('hairstyle-id');
  console.log("HSD: " , hairStyleID);
  
    $.ajax({
      method: 'DELETE',
      url:("/api/hairstyle/" + hairStyleID),
      success: function() {
        console.log("Deleted!");
        $("[data-hairstyle-id=" + hairStyleID + "]").remove();
      }
    });
}

function handleEditHairStyleClick(event) {
  console.log("You pressed the edit button!");
  
  var hairStyleID = $(this).parents('.hairstyle-box').data('hairstyle-id');
  console.log("HSD from Edit: " , hairStyleID);

  var $hairStyleEntry = getHairStyleEntryById(hairStyleID);

  $(this).parent().find('.btn').hide();
  $(this).parent().parent().find('.put-hairstyle').show();
  //first parent moves up to span class, second parent moves to the div class container

  // $(this).parent().find('.btn').toggle();
  //doesn't quite work at the moment

  //Need to replace spans with inputs
  var hairStyleName = $hairStyleEntry.find("span.hairstyle-name").text();
  $hairStyleEntry.find("span.hairstyle-name").html('<input class = "edit-hairstyle-name" value="' + hairStyleName + '"></input>');

  var hairStyleGT = $hairStyleEntry.find("span.hairstyle-growthtime").text();
  $hairStyleEntry.find("span.hairstyle-growthtime").html('<input class = "edit-hairstyle-growthtime" value="' + hairStyleGT + '"></input>');

  var hairStyleDescription = $hairStyleEntry.find("span.hairstyle-description").text();
  $hairStyleEntry.find("span.hairstyle-description").html('<input class = "edit-hairstyle-description" value="' + hairStyleDescription + '"></input>');
}

function handleSaveChangesClick(event) {
  event.preventDefault();

  var hairStyleID = $(this).parents('.hairstyle-box').data('hairstyle-id');
  var $hairStyleEntry = getHairStyleEntryById(hairStyleID);

  var data = {
    name: $hairStyleEntry.find(".edit-hairstyle-name").val(),
    growthTime: $hairStyleEntry.find(".edit-hairstyle-growthtime").val(),
    description: $hairStyleEntry.find(".edit-hairstyle-description").val()
  };

  $.ajax({
    method:"PUT",
    url:"/api/hairstyle/" + hairStyleID,
    data: data,
    success: function(data) {
      console.log(data);
      $hairStyleEntry.replaceWith(generateHairStyleHtml(data));
    }
  });
}

///////////Quote Functions///////////////////

function getQuoteEntryById(id){
  return $("[data-quote-id =" + id +"]");
}

function buildQuotesHtml(quotes){
  console.log("rendering quotes ", quotes);

  var quotesHtml = "";

  //hairstyle.quotes is an array that contains objects inside
  //the array needs to be iterated through
  //grab the approriate key from the quote object
  //this should read the quotes onto the page

  quotes.forEach(function (quotes){ 

    quotesHtml +=  
    "<!-- One Quote Entry --->" +
    
    
    "<div class = 'quote-box' data-quote-id = '" + quotes._id + "'>" +

      "----------------------------" + "<br>" +
      "Body:  <span class = 'quote-body'>" + quotes.body + "</span>" + "<br>" + 
      "Vote Counter: <span class = 'quote-voteCounter'>" + quotes.voteCounter + "</span>" +  "<br>" + 
      "Author: <span class = 'quote-author'>" + quotes.author + "</span>" + "<br>" + 
      "Date: <span class = 'quote-date'>" + quotes.date + "</span>" + "<br>" + 
      "<span class = 'quotes-create-btn'> <button class='btn btn-danger delete-quote'>Delete Quote</button></span>" + "<br>" + 

    "</div>" +

    "<!-- End Quote Entry --->";
  });
  return quotesHtml;
}

function handleDeleteQuoteButton(event){
  event.preventDefault();

  console.log ("Delete Quote Button was pressed!");

  //event.preventDefault();
  var hairStyleID = $(this).parents().parents('.hairstyle-box').data('hairstyle-id');

  var quoteID = $(this).parents('.quote-box').data('quote-id');
  console.log("Hairstyle Box ID: ", hairStyleID);
  console.log("Quote ID: " , quoteID);
  
  $.ajax({
    method: 'DELETE',
    url:("/api/hairstyle/" + hairStyleID + "/quotes/" + quoteID),
    // /api/hairstyle/:hairstyleId/quotes
    success: function() {
      console.log("Deleted!");
      $("[data-quote-id =" + quoteID + "]").remove();
    }
  });

}

function handleNewQuoteButtonClick(event){
  event.preventDefault();

  console.log("Quote Button was pressed!");

  var hairStyleID = $(this).parents('.hairstyle-box').data('hairstyle-id');

  var quoteData = $(this).parents('.quotes-form').serialize();
  console.log("QuoteData: ", quoteData);

  console.log("This is the quote data!: " , quoteData);

  var quoteUrl = '/api/hairstyle/' + hairStyleID + '/quotes';
  console.log('quotes being added to ' , quoteUrl, 'with data ', quoteData);

  $.ajax({
    method: "POST",
    url: quoteUrl,
    data: quoteData,
    success: function (response) {
      console.log("Post Quote Response from Server: " , response);
    },
    error: function() {
      console.log("Error with /api/hairstyle/ID/quotes Post");
    }
  });

  $(this).trigger("reset");
  //Is this the right place for trigger reset?
}


////////////Picture Functions////////////

function buildPicHtml(pictures){
  console.log("rendering pictures ", pictures);

  var picturesHtml = "";

  pictures.forEach(function (pictures){ 

    picturesHtml +=  
    "<!-- One Picture Entry --->" +
    
    "<div class = 'picture-box' data-picture-id = '" + pictures._id + "'>" +
        "<span class = 'picture-url'><img src='" + pictures.url + "'></span><br>" + 
    "</div>" +

    "<!-- End Picture Entry --->";
  });
  return picturesHtml;
}

function handleNewPicButtonClick(event){
  event.preventDefault();

  console.log("Picture Button was pressed!");

  var hairStyleID = $(this).parents('.hairstyle-box').data('hairstyle-id');

  var pictureData = $(this).parents('.pictures-form').serialize();
  
  console.log("Picture Data: ", pictureData);

  var pictureUrl = '/api/hairstyle/' + hairStyleID + '/pictures';
  console.log('pictures being added to ' , pictureUrl, 'with data ', pictureData);

  // $.ajax({
  //   method: "POST",
  //   url: pictureUrl,
  //   data: pictureData,
  //   success: function (response) {
  //     console.log("Post Picture Response from Server: " , response);
  //   },
  //   error: function() {
  //     console.log("Error with /api/hairstyle/ID/pictures Post");
  //   }
  // });
  // $(this).trigger("reset");
}

//////////////////////////////////


//We'll use this function to create one hairstyle entry on the page
function generateHairStyleHtml(hairstyle) {
  console.log("rendering hairstyle: ", hairstyle);

  var hairstyleHtml =
  "<!-- One Hairstyle Entry -->" +
  "<div class = 'hairstyle-box' data-hairstyle-id = '" + hairstyle._id + "'>" +

    "<!-- Pictures -->" +

    buildPicHtml(hairstyle.pics) +

    "<!-- End of Pictures Pictures -->" +


    "Name: <span class = 'hairstyle-name'>" + hairstyle.name + "</span>" + "<br>" +
    "Growth Time: <span class = 'hairstyle-growthtime'>" + hairstyle.growthTime + "</span>" + "<br>" +
    "Description: <span class = 'hairstyle-description'>" + hairstyle.description + "</span>" + "<br>" +

    "<!-- Quotes -->" +

    buildQuotesHtml(hairstyle.quotes) +

    "<!-- End of Quotes -->" +

    "<!-- Quotes Forms -->" +

    "<form class='form-group quotes-form' data-hairstyle-id ='" + hairstyle._id + "'>" +
      "<label>" +
            "Body: <textarea input type='text' class= 'quotebody' name ='body'></textarea>" + "<br>" +
            "Vote Counter: <input type='number' class= 'quotevotecounter' name ='voteCounter'>" + "<br>" +
            "Author: <input type='text' class= 'quoteauthor' name ='author'>" + "<br>" +
            "Date: <input type='text' class= 'quotedate' name ='date'>" + "<br>" +
      "</label>" + "<br>" +
      "<span class = 'quotes-create-btn'> <button class='btn btn-primary add-quote'>Add Quote</button></span>" +
    "</form>" +

    "<!-- End of Quotes Forms -->" +

    "<!-- Picture Form -->" +

    "<form class='form-group pictures-form' data-hairstyle-id ='" + hairstyle._id + "'>" +
      "<label>" +
          "Picture URL: <input type='text' class= 'picturebody' name ='url'></textarea><br>" +
      "</label>" + "<br>" +
      "<span class = 'picture-create-btn'> <button class='btn btn-success add-picture'>Add Picture</button></span>" +
    "</form>" +

    "<!-- End of Picture Form -->" +

    "<!-- HairStyle Buttons-->" +

    "<span class = 'hairstyle-edit-btn'> <button class='btn btn-info edit-hairstyle'>Edit Hairstyle</button></span>" +
    "<span class = 'hairstyle-edit-btn'> <button class='btn btn-success put-hairstyle'>Save Changes</button></span>" +
    "<span class = 'hairstyle-delete-btn'> <button class='btn btn-danger delete-hairstyle'>Delete Hairstyle</button></span>" +

    "<!--End of Hairstyle Buttons-->" +

  "</div>" +
  "<!-- end One Hairstyle Entry -->";

  return hairstyleHtml;
}

function renderHairStyle (hairstyle){
  var html = generateHairStyleHtml(hairstyle);
  console.log("rendering hairstyle: ", hairstyle);

  $("#hairStyle").append(html);
}





