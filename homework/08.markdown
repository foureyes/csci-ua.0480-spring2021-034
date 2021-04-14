---
layout: homework
title: CSCI-UA.0480 - Homework #8
---
<style>
.warning {
    background-color: #ffaabb;
}

img {
	width: 890px;
}
</style>



<div class="panel panel-default">
  <div class="panel-heading">Homework #8</div>
  <div class="panel-body" markdown="block">

# CodeShare (AJAX) - __Due Thursday, April 22nd by 11pm__

## Overview

Code Snippets can help you save time when developing (of course, add a reference / annotate _your_ code if you do!). A curated list of often-reused code snippets can really speed up your development. It can also be a great place to find inspiration if you’re trying to figure out the best approach to solve a problem. In this Homework, we will create a website that will allow users to upload their own code snippets, either for personal use or to share with the community.

### Goals / Topics Covered

You'll be using the following concepts:

* XMLHttpRequest (or fetch or async await with fetch)
* sending back json from Express
* implementing API end points
* creating a frontend that makes AJAX gets for filtering and POSTing data

### Description

Create a website called **CodeShare** where users share code snippets anonymously. You will create this "single page app" using AJAX calls instead of  regular page rendering and form submission.

You will:

1. Implement routes to create an API for retrieving code snippets and adding new ones
2. Implement routes to create an API for retrieving code snippets and adding new ones
3. Use JavaScript to trigger background requests to the API from the form submit buttons

Use the following resources as reference:

1. [Slides on AJAX Part 1](../slides/20/ajax.html)
2. [Slides on AJAX Part 2](../slides/21/ajax-express.html)
3. [AJAX POST (from Part 2)](../slides/21/ajax-express.html#/47)

Check out the animation below to see how the site should work. Pay attention to:

* the button presses and the corresponding changes in the ui
* ...as well as the network tab
* (notice that there are no page refreshes!)

The animation below shows:

1. loading the initial page / data
2. adding a Code Snippet
3. adding Comments for a particular Code Snippet

<img src="../resources/img/codeshare.gif">

### Make at Least 4 Commits

* Commit multiple times throughout your development process.
* Remember to make at least 4 separate commits

### Code Structure:

__You should first create an express application that will be served on port 3000__

The structure of the directory you're given looks like this:

```
package.json
src
 ├── app.js
 ├── db.js
 └── public
      ├── index.html  // the 'single' page in your single page web app
      ├── js
      │    └── index.js // write your client side JavaScript here
      └── stylesheets
           └── style.css
```

Note that this will be implemented __as a single page web app__. This means that to implement these features:

1. __create routes that send back JSON__ (essentially create an API)
2. utilize the API by writing client side JavaScript that:
    * constructs an http request by retrieving the values of form elements
    * requests data from url constructed in the background (AJAX)
    * parses the result of the background request
    * modifies the DOM appropriately

### Some of This Project is Already Built for You!

1. Server side code 
	* database setup (a mongoose model, database connection, etc.) is provided through `db.js`
	* a partially implemented Express application is in `app.js`
		* it has basic setup for body parsing, static files, etc.
		* it has stubs for route handlers, but the implementations are left out
2. Client side code
	* there are static files present in `public`
	* the html is already present in `index.html`, and __you can add markup if you like__
	* there are some suggested css rules in `style.css`, but feel free to discard these in favor of your own css
	* the client side JavaScript is left unimplemented (`index.js`), so you'll have to write the majority of it

### Getting Existing Code Snippets (Reading Data)

1. Check out the schema in `db.js` to familiarize yourself with the "data model"
2. Since the `_id` field is automatically created for you without having to explicitly add it to the schema, the `CodeSnippet` schema in the starter code doesn't have the `_id` field. If you'd like (this may make other parts easier), you can add the [`_id`](https://mongoosejs.com/docs/guide.html#_id) field for the `CodeSnippet` schema in `db.js`. 
3. Add some code snippet documents to the database (use the command line client to do the following). Here's an example (feel free to add your own code snippets to the database) 
```
db.codeSnippets.insert({
    "title" : "XOR Swap Values"
    "code" : "a = a ^ b; b = b ^ a; a = a ^ b;", 
    "comment" : ["Awesome. Thanks.", "This code beats all the solutions I had in my mind!"]
});
```
4. In the server side code (`app.js`), fill in the route for `GET /code_snippets/` so that it gives back all of the Code Snippets (and their Comments) from the database as json (you can use `res.json` or `res.send` with a JavaScript object and express will stringify the object and set the appropriate headers). You can use [`find()`]( https://mongoosejs.com/docs/api.html#model_Model.find) function of mongoose to retreive all documents of the collection.
5. Test this route in your browser; you should get back a list of json documents. 
6. In the client side JavaScript code (`index.js`), once the DOM has been loaded, make a background request (using `XMLHttpRequest` or `fetch` if you're already familiar with promises) to get all of the code snippets.
	* if an error occurs with the request (a 404, or an event listener for error gets triggered), minimally use  `console.log` to output the error.
	* however, feel free to add more robust error handling, such as displaying a friendly error message in the DOM.
7. For every Code Snippet in the JSON response from the server, create elements for each Code Snippet and Comment, along with a button to add a comment.
 	* append the elements to the `main` element in `index.html` (do this using client-side JavaScript)
	* do not use any libraries to do this (no jQuery, React, Vue etc.)
	* the exact elements to create up to you; the reference solution uses HTML tag `pre` for the code snippet, an unordered list for the comments, and an input button for the submit button, but you can mark up this part any way you like
	
8. Opening up `localhost:3000/index.html` in your browser, with the network tab open, should:
	* show a page with all **Code Snippets** and comments
	* along with an extra request in the network tab going to `localhost:3000/code_snippets` (this is the background request)
	
### Modals

Modal dialog boxes can be implemented by creating an element with a z-index higher than other elements. You can have it stretch out to the width and height of the window, and fix it to the upper left-hand corner.

Some example markup and css is given for this... but you can style modals any way you like.

As for the JavaScript implementation...

1. start off with all modals not visible (the starter css initializes them to `display: none`)
2. when the `Post Code Snippet` button is clicked or when any of the Code Snippet's corresponding `Comment` button is clicked, make the modal visible
3. Add some click event listeners to the `Post Code Snippet` and `Comment` buttons 
	* these should either modify the `style` attribute of the appropriate modal 
	* or apply CSS classes (either your own, or the ones supplied as hints)


### Posting New Code Snippets (Adding Data)


1. In the route, `POST /code_snippets/`,  create a new Code Snippet in the database
    * it should give back a JSON response
    * if a new Code Snippet is successfully created in the database, it should send back the object inserted as the response
    * otherwise, send back an object with a key called error and a value containing the error message
	* note that to populate the `_id` field, you can either:
		* add it to the schema in `db.js` to allow it to be automatically created
		* or use `_id: mongoose.Types.ObjectId()` to manually generate one
	* Use [create()](https://mongoosejs.com/docs/api.html#model_Model.create) function in mongoose to add the document to the collection.
2. On the client side, add an onClick handler to the `Post Code Snippet` button (if you already haven't done so)
    * it should show the provided HTML modal with a form for submitting a New Code Snippet (again, do this if you already haven't done so from the previous instructions)
    * when the button in the modal's form is pressed:
		* collect the form data (just the Code Snippet's text)
		* use an AJAX POST to send the Code Snippet's text to the server 
		* (of course, use the `POST /code_snippets/` as the url for your AJAX post; this will cause the new Code Snippet to be saved in the database if the previous step was implemented correctly)
	    * in the AJAX callback:
	      * on a successful result (that is no error key in the JSON response, and an id present for the boject)
	        * use the returned JSON containing the saved Code Snippet to:
				* add the `Code Snippet` text to the page
		        * use the `_id` attribute as an `id` attribute on a new html element that will contain the Code Snippet and Comments (to be used in the next part)
		        * add a button, `Comment`, to pop up the modal for Commenting on a Code Snippet (which will be describe in the next section)
		    	* close the modal and clear all fields
	      * On failure
	        * it's adequate to just log out the error message to the console
			* or you can add a message in the DOM (perhaps in the modal)
3. When testing this:
	* keep the network tab open to see the requests being made
	* It is also helpful to look for errors in the JavaScript console on your browser


### Adding New Comments


1. In the route, `POST /code_snippets/:id/comments/`, add a comment to an existing Code Snippet
    * it should give back JSON as the response
    * it should receive the unique <code>object_id</code>, (`_id`) from the client for a particular Code Snippet
    * use the unique <code>object_id</code> to find associated document (question) in the database
    * update the document with Comment sent from the client (by pushing the comment to the array of strings)
    * otherwise, send back an object with a key called error and with a value containing an error message.
	* You can use [`findByIdAndUpdate()`](https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate) function of mongoose to update the document with Comment sent from the client.
The following code snippet demonstrates one way of updating the document with Comment sent from the client. Feel free to use it in your Homework or implement the same functionality using your own approach. 

```

app.post('/code_snippets/:id/comments/', (req, res) => {
   CodeSnippet.findByIdAndUpdate(req.params["id"], {
         "$push": {
            comments: req.body["comment"]
         }
      }, {
         "new": true
      },
      (err, docs) => {
         if (err) {
            res.json({
               "error": "The comment was not successfully added."
            });
         } else {
            res.json({
               "message": "Change was successful",
               "docs": docs
            });
         }
      }
   );

});

```

2. On the client side, add an on click handler to the button `Comment`
    * it should show the provided modal with a form for submitting a comment
	* it should also set the form's hidden field for id to the `_id` of the Code Snippet that is being commented
		* this part may be tricky... as you'll have to have the id of the Code Snippet available as you're adding an event listener to the modal's button for submission
		* so it must be done at the time that the Code Snippet is added back to the DOM 
		* which means that you may have to go back to the previous sections on Posting New Code Snippets or Reading Existing Code Snippets to modify your code for adding Code Snippets to the DOM
    * when the button to submit the form is pressed, collect the <code>object_id</code> (the hidden input with id `code-snippet-id`) and answer text from the form
	* send an AJAX POST to the server with this data (using a url constructed from the Code Snippet's id)
    * again, you can get the <code>object_id</code> by
    * using the hidden input (whose value can be filled in by the click callback
    * in the AJAX callback
      * On success
        * the user's comment is added beneath the Code Snippet
    	* close the modal and clear all fields
      * On failure
        * minimally, log out the error
3. Here's an example of how it may work:


### Extra Credit

Implement either (or both) of the following features for extra credit. __You must link to the exact line of code containing your call(s) to fetch and/or async and await in your README.md__:



1. (5 points) use [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) instead of `XMLHttpRequest`.
[Example usage of fetch](http://url.to/specific/line/of/code/in/github)

2. (5 points) use [fetch with async functions and await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) instead of `XMLHttpRequest`

</div>

</div>
