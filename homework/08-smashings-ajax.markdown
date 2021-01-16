---
layout: homework
title: CSCI-UA.0480 - Homework #8
---
<style>
.warning {
    background-color: #ffaabb;
}
</style>


<div class="panel panel-default">
  <div class="panel-heading">Homework #8</div>
  <div class="panel-body" markdown="block">

# AJAX - __Due Tuesday, Dec 11th by 11pm__


## Overview

### Goals / Topics Covered

You'll be using the following concepts:

* XMLHttpRequest
* sending back json from Express

### Description

Create an app that saves random strings created by smashing the keyboard with your hands.

In the "sounds" homework assignment, the page must be reloaded whenever you want to refresh the visible data or insert more data. Most websites don't work/look like this because they use AJAX, i.e. browser-side, they write javascript that makes a web request to some api, then changes the DOM (using `document.querySelector`) when it requests an http response from the api.

This assignment is to help you practice implementing that, by creating a web app for users to vent their emotions by smashing their keyboard into a text input (a `textarea` that will be saved to a database (to use later for data mining for ad targeting, of course, because... what else do you do with data, amirite?).

To do this, you'll be given a partially implemented express application. You'll have to finish it up by:

1. Implementing routes to create an API for retrieving smashings and adding new ones
2. Using JavaScript to trigger background requests to the API from the form submit buttons

Use the following resources as reference:

1. [Slides on AJAX Part 1](../slides/20/ajax.html)
2. [Slides on AJAX Part 2](../slides/21/ajax-express.html)
3. [AJAX POST (from Part 2)](../slides/21/ajax-express.html#/47)

Check out the video below to see how the site will work. Pay attention to:

* the button presses
* the changes in the ui
* ...and the network tab
* notice that there are no page refreshes!


![a browser page with the network tab of the browser inspector tools open showing a web app where entering random text adds a row of data to the table of data on the screen. the top of the page has interactive filters that filter the results below. this filtering functionality is then demonstrated by filtering for short instances of random text](https://lh00000000-public.s3.amazonaws.com/2018/appinter/hwx.gif)

### Submission Process

You will be given access to a private repository on GitHub.  The final version of your assignment should be in GitHub

* __Push__ your changes to the homework repository on GitHub.
* Commits later than that date will be handled on a case-by-case basis.

### Make at Least 3 Commits

* Commit multiple times throughout your development process.
* Make at least 3 separate commits

### Code Structure:

__You will be given an express application that is served on port 3000.__ The structure looks like this:


```
.eslintrc.js
.gitignore
package-lock.json
package.json
src
├── app.js             # edit this file
├── db.js
└── public
    ├── css
    │   └── base.css
    ├── index.html
    └── js
        └── index.js   # edit this file
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
		* it has some helper functions for generating smashing instances
		* it has stubs for route handlers, with some minor parts implemented (such as forming a query object for mongoose based on query string parameters in the url)
2. Client side code
	* there are static files present in `public`
	* the html (`index.html`) and css (`base.css`) are already built
	* but the client side JavaScript is mostly left unimplemented (`index.js`), so you'll have to flesh out the majority of the function definitions

### Fetching and Filtering:

1. Finish the route, `GET /api/smashings` (in `app.js`, __the server__), which returns all of the existing smashing in the database
    1. This route will support several query string paremeters (you can see them in the names of the form's input elements)
    2. It should return JSON list of smashing objects. For example, `GET /api/smashings?lengthGt=2&lengthLt=55555`  (note that smashings is plural, not singular!) could return:
		<pre><code data-trim contenteditable>[
  {smashingText: 'aaa', length: 3, etc.}, 
  {smashingText: 'asdf', length: 4, etc.}
]
</code></pre>
    3. To test, add some data into your database manually using the commandline mongo client using the properties supplied above (you can skip the letter counts to make things easier)
	4. enter the url `http://localhost:3000/api/smashings` in your browser; you should get JSON back... with the JSON containing the smashings that you just entered
	5. enter the url again... but now with query string parameters (such as lengthGt=2) to see if the filtering part works
2. Add some JavaScript to `src/public/js/index.js` (__the client side JavaScript__)so that once the page loads:
    1. a background request is made to the the api url above using `XMLHttpRequest` or `fetch`
	2. do this by finishing the implementations in `index.js` for the following functions (fill in the parts underneath the comments that start with `TODO`):
		* `insertSmashing` to insert data from a single smashing instance into the DOM given an object representing the smashing
		* `deleteAllResults` to remove all of the smashings displayed in the DOM
		* `refreshResults` to retrieve filtered (or unfiltered if the form is not filled) smashing data from the api and display its results (you can use some of the functions above to do this)
			* you'll use `XMLHttpRequest` or `fetch` here 
			* the url will either be `/api/smashings` or `/api/smashings?foo=bar&baz=qux` (the query string will be composed of names and values from the form input elements in the filter form)
		* `main` to add event handlers and show the initial data on page load
		* ⚠️  __remember to make sure that the regular form button press event isn't triggered (use `preventDefault`)__
	3. detailed descriptions of each function is in comments within the source code
	4. test by:
		* going to the page and verifying that all smashings are loaded
		* open your network tab to see an `xhr` request to `api/smashings`
		* using the form to filter and verifying that the results on the page are updated without a page refresh
		* again, check your network tab to see an `xhr` request to `api/smashings`... but note that the request should have query string parameters attached to it


### Adding New Keyboard Smashes

1. In the route, `POST /api/smashing` (in `app.js`, __the server__),  create a new smashing document and save it in the database
    * it should give back a JSON object as the response: `{"_code": "OK"}` or, if there's an error, `{"_code": "ERROR"}` 
2. In `index.js`, __the client-side JavaScript__ ...
	1. finish the implementation of the following functions (fill in the parts underneath the comments that start with `TODO`).
		* `postSmashing` to send a POST request to save smashing data in the database
			* using `XMLHttpRequest` or `fetch`, make a POST request
			* set the `ContentType` to `application/x-www-form-urlencoded`
			* set the body to the value of the textarea
			* the response should trigger the client to refresh the data on the page with the newly created smashing (note, not a page refresh, but just updated DOM elements)
    		* __if there was a filter set before adding, then clear the filter to show all smashings, including the newly added one__
			* use existing helper functions within `index.js` to aid in this implementation
		* `main` (you may have have finished this already) to add an event listener to handle a button press for the form to create a keyboard smashing
    		* remember to make sure that the regular form button press event isn't triggered (use `preventDefault`)
	2. more details for these functions can be found in the comments
	3. test this by:
		* openining the network tab
		* submitting the form
		* viewing the `xhr` POST request in the network tab
 		* verifying that the data is saved in the database by using the `mongo` commandline client
		* verifying that the new saved smashing also shows up on the page (without a page refresh)  
</div>
</div>


