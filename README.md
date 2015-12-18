Description of App

My Project 1 is a database on facial hair styling! How many times have you encountered someone with a beard or a mustache, but you have no idea what it is a called? No more will you have to sheepishly say "Oh uh, nice beard...ha...ha...ha". Now you can say with confidence, "Nice [insert proper name of facial hair here]!" I know, what would you do without it?

User Story

User can add a facial hair entry at the bottom, filling out the forms for Name, Growth Time, and Description. Once submitted, their entry will display on the page (on page refresh). You can edit any existing hairstyle and you can delete any hairstyle.

Once a hairstyle is created, you can add a quote to it. This quote signifies what you should say to someone when you've encountered their majestic creation that proudly decorates their face.  Created quotes will display themselves on the page (on page refresh) and can be deleted. 

In a future editions, you will be able to pictures to existing hairstyles, if you feel that the current pictures do not accurately represent the hair entry style.

Technologies Used

Javascript, jQuery
MongoDB

Three Lines of Code I'm Proud Of

"<div class = 'hairstyle-box' data-hairstyle-id = '" + hairstyle._id + "'>"
on app.js

It's simple but once I understood the importance of this code, Update and Delete
really came together. Nathan pointed out to me that you need to grab the ID of 
an entry from your HTML code. It made me realize that fundamentally, I missed a 
concept while doing my Tunely lab, and it good that I understand why the HTML
was formatted a certain way in the Tunely lab.

var hairStyleID = $(this).parents().parents('.hairstyle-box').data('hairstyle-id');
on app.js

The method parents was something I was conceptually shaky on. Once I wrote this line 
of code out and everything worked, it was easy for me to visualize and understand why it
worked. I could go through my HTML and see which nodes I was jumping up to and where
I was drilling down to. Big shoutouts to Daniel Lwo, who conceptually went over it with me.

var quoteUrl = '/api/hairstyle/' + hairStyleID + '/quotes';
on app.js

Again pretty simple, but it was really satifying for me to see that I got
my .ajax POST route set up correctly. I remember .ajax was something I struggled
on conceptually two weeks ago, but now I feel like I have a solid understanding 
of .ajax and what it does.


Link

heroku:
https://serene-river-7941.herokuapp.com/

To Add:

Form Validation

On create, entries keep their same position

Delete for Images (Giving CRD)
Update for Quotes (Giving CRUD)

Vote counter for quotes, allowing quotes to be upvoted to appear higher
up on the list.

Styling
Need to style where only images are visible on the front
When an image is clicked a modal with the information of that image pops up