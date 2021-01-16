---
layout: homework
title: CSCI-UA.0480 - Homework #7
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
  <div class="panel-heading">Homework #7</div>
  <div class="panel-body" markdown="block">

# ANONYMOUS Q&AIT (AJAX) - __Due Wed, Nov 20th by 11pm__


## Overview

### Goals / Topics Covered

You'll be using the following concepts:

* XMLHttpRequest (or fetch)
* sending back json from Express

### Description

Create a question-and-answer site where users post questions and answers to these questions anonymously. You will create this "single page app" using AJAX calls instead of regular page rendering and form submission.

You will:

1. Implement routes to create an API for retrieving reviews and adding new ones
2. Use JavaScript to trigger background requests to the API from the form submit buttons

Use the following resources as reference:

1. [Slides on AJAX Part 1](../slides/20/ajax.html)
2. [Slides on AJAX Part 2](../slides/21/ajax-express.html)
3. [AJAX POST (from Part 2)](../slides/21/ajax-express.html#/47)

Check out the animation below to see how the site should work. Pay attention to:

* the button presses and the corresponding changes in the ui
* ...as well as the  network tab
* (notice that there are no page refreshes!)

The animation below shows:

1. loading the initial page / data
2. asking a question
3. adding answers to a question

<img src="../resources/img/hw07-qandait/all.gif">

### Submission Process

You will be given access to a private repository on GitHub.  The final version of your assignment should be in GitHub

* __Push__ your changes to the homework repository on GitHub.
* Commits later than that date will be handled on a case-by-case basis.

### Make at Least 3 Commits

* Commit multiple times throughout your development process.
* Make at least 3 separate commits

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
	* the client side JavaScript is mostly left unimplemented (`index.js`), so you'll have to write the majority of it

### Getting Existing Questions (Reading Data)

1. Check out the schema in `db.js` to familiarize yourself with the "data model"
2. if you'd like (this may make other parts easier), you can remove the `_id` field from the `Question` schema in `db.js` since the `_id` field is automatically created for you without having to explicitly add it to the schema
3. Add some questions to the database (use the commandline client to do the following)... here's an example (feel free to add your own questions/answers)
	<pre><code data-trim contenteditable>db.questions.insert({
  "question": "What's the most delicious dessert?", 
  "answers": ["ice cream on a pizza", "choco taco"]
})
</code></pre>
3. In the server side code (`app.js`), fill in the route for `GET /questions/` so that it gives back all of the questions (and their answers) from the database as json (you can use `res.json` or `res.send` with a JavaScript object... and express will stringify the object and set the appropriate headers)
4. Test this route in your browser; you should get back a json document
5. In the client side JavaScript code (`index.js`), once the DOM has been loaded, make a background request (using `XMLHttpRequest` or `fetch` if you're already familiar with promises) to get all of the questions
	* if an error occurs with the request (a 404, or an event listener for error get triggered), minimally use  `console.log` to output the error
	* however, feel free to add more robust error handling, such as displaying a friendly error message in the DOM
6. For every question in the JSON response from the server, create elements for each question and answer, along with a button to add an answer
 	* append the elements to the `main` element in `index.html` (do this using client-side JavaScript)
	* do not use any libraries to do this (no jQuery, React, vue, etc.)
	* the exact elements to create up to you; the reference solution uses a heading for the question, an unordered list for the answers, and an input button for the submit button, but you can mark up this part any way you like
7. Opening up `localhost:3000/index.html` in your browser, with the network tab open, should:
	* show a page with all answers and questions
	* along with an extra request in the network tab going to `localhost:3000/questions` (this is the background request)
8. It should look something like this:

<img src="../resources/img/hw07-qandait/read.gif">

### Modals

Modal dialog boxes can be implemented by creating an element with a z-index higher than other elements. You can have it stretch out to the width and height of the window, and fix it to the upper left-hand corner.

Some example markup and css is given for this... but you can style modals any way you like.

As for the JavaScript implementation...

1. start off with all modals not visible (the starter css initializes them to `display: none`)
2. when the ask button is clicked... or any of the question's corresponding answer button is clicked, make the modal visible
3. sooo... add some click event listeners to the ask and answer buttons 
	* these should either modify the `style` attribute of the appropriate modal 
	* ... or apply css classes (either your own, or the ones supplied as hints)


### Asking New Questions (Adding Data)


1. In the route, `POST /questions/`,  create a new question in the database
    * it should give back a JSON response
    * if a new question is successfully created in the database, it should send back the object inserted as the response
    * otherwise, send back an object with a key called error... with a value containing an error message
	* note that to populate the `_id` field, you can either:
		* remove it from the schema in `db.js` to allow it to be automatically created
		* ...or use `_id: mongoose.Types.ObjectId()` to manually generate one
2. On the client side, add a on click handler to the `Ask a Question` button (if you already haven't done so)
    * it should show the provided HTML modal with a form for submitting questions (again, do this if you already haven't done so from the previous instructions)
    * when the button in the modal's form is pressed....
	* collect the form data (just the question text)
	* use an AJAX POST to send the question text to the server 
	* (of course, use the `POST /questions/` as the url for your AJAX post; this will cause the new question to be saved in the database if the previous step, 1, were implemented correctly)
    * in the AJAX callback
      * on a successful result (that is no error key in the JSON response, and an id present for the boject)
        * use the returned JSON containing the saved question to....
		* add the `question` text to the page
        * use the `_id` attribute as an `id` attribute on a new html element that will contain this questions answers (to be used in the next part)
        * add a button, `Add an Answer`, to pop up the modal for answering a question (which will be describe in the next section)
    	* close the modal and clear all fields
      * On failure
        * it's adequate to just log out the error message to the console
		* ...or you can add a message in the DOM (perhaps in the modal)
3. When testing this...
	* keep the network tab open to see the requests being made
	* it's also helpful to look for errors in the JavaScript console on your browser
4. Here's an example of how this may work (pay attention to the network tab)

<img src="../resources/img/hw07-qandait/ask.gif">

### Adding New Answers


1. In the route, `POST /questions/:id/answers/`, add an answer to an existing question
    * it should give back JSON as the response
    * it should receive the unique <code>object_id</code>, (`_id`) from the client for a particular question
    * use the unique <code>object_id</code> to find associated document (question) in the database
    * update the document with answers sent from the client (by pushing the answer to the array of strings)
    * otherwise, send back an object with a key called error... with a value containing an error message
	* note: some starter/hint code will be given to you in this route
2. On the client side, add an on click handler to the button `Add Your Answer`
    * it should show the provided modal with a form for submitting answers
	* it should also set the form's hidden field for id to the `_id` of the question that is being answered
		* this part may be tricky... as you'll have to have the id of the question available as you're adding an event listener to the modal's button for submission
		* so it must be done at the time that the question is added back to the DOM 
		* which means that you may have to go back to the previous sections on Asking New Questions or Reading Existing Questions to modify your code for adding questions to the DOM
    * when the button to submit the form is pressed, collect the <code>object_id</code> (the hidden input with id `question-id`) and answer text from the form
	* send an AJAX POST to the server with this data (using a url constructed from the question's id)
    * again, you can get the <code>object_id</code> by
    * using the hidden input (whose value can be filled in by the click callback
    * in the AJAX callback
      * On success
        * the user's answer is added beneath the question
    	* close the modal and clear all fields
      * On failure
        * minimally, log out the error
3. Here's an example of how it may work:

<img src="../resources/img/hw07-qandait/answer.gif">

### Extra Credit

Implement either (or both) of the following features for extra credit. __You must link to the exact line of code containing your call(s) to fetch and/or async and await in your README.md__:

```
# Extra Credit

[example usage of fetch](http://url.to/specific/line/of/code/in/github)
```

1. (5 points) use [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) instead of `XMLHttpRequest`.
2. (10 points) use [fetch with async functions and await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) instead of `XMLHttpRequest`
</div>

</div>

