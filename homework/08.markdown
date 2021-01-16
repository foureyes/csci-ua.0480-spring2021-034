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

# AJAX - __Due Sunday, May 3rd by 11pm__


## Overview

### Goals / Topics Covered

You'll be using the following concepts:

* XMLHttpRequest or [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) (or fetch with async await!)
* sending back json from Express

### Description

Convert the course review site from a previous homework to a "single page app".  Use AJAX POSTs and GETs instead of regular form submissions to filter and add course reviews

You will:

1. Implement routes to create an API for retrieving reviews and adding new ones
2. Use JavaScript to trigger background requests to the API from the form submit buttons

Use the following resources as reference:

1. [Slides on AJAX Part 1](../slides/20/ajax.html)
2. [Slides on AJAX Part 2](../slides/21/ajax-express.html)
3. [AJAX POST (from Part 2)](../slides/21/ajax-express.html#/47)

Check out the video below to see how the site will work. Pay attention to:

* the button presses
* the changes in the ui
* ...and the network tab
* notice that there are no page refreshes!

<video controls>
  <source src="../resources/video/hw08-course-review-ajax.webm" type="video/mp4">
	Your browser does not support the video tag.
</video>
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
└── coursez
    ├── app.js
    ├── db.js
    ├── public
    │   ├── index.html  // the 'single' page in your single page web app
    │   ├── js
    │   │   └── main.js // write your client side JavaScript here
    │   └── stylesheets
    │       └── style.css
    └── views
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
		* it has stubs for route handlers, but the implementations are left
2. Client side code
	* there are static files present in `public`
	* the html (`index.html`) and css (`style.css`) are already built
	* but the client side JavaScript is not implemented (`main.js`), so you'll have to write all of your client side code there

### Fetching and Filtering:

1. Finish the route, `GET /api/messages`, which returns all of the existing reviews in the database
    1. This route will support some of the same query string parameters as the course review assignment: year and semester
    2. It should return JSON list of review objects. For example, `GET /api/messages?year=2018
could return:
        ```
[
  { "name":"Course 1", ... },
  { "name":"Course 2", ... }
]
```
	3. Note that the model only contains these properties (which are less than the previous assignment):
		* `name` - the course name
		* `semester` - the course semester
		* `year` - the year the course was offered
		* `review` - the text of the course review
    4. To test, add some data into your database manually using the commandline mongo client using the properties supplied above
	5. enter the url `http://localhost:3000/api/messages` in your browser; you should get JSON back... with the JSON containing the reviews that you entered through the commandline
2. Add some JavaScript to `src/public/js/main.js` so that once the page loads:
    1. a background request is made to the the api url above using `XMLHttpRequest` (or [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch))
	2. no query string parameters should be present, so all of the reviews should be present in the response
	3. parse the response to get a collection of reviews
	3. add the reviews to the `tbody` element of the `table` as rows and table data (`tr` and `td`)
	4. use `document.createElement` to do this (avoid using `innerHTML`)
	5. at the end of this task, on initial page load, your application will make a background call to load all of the reviews in the database, so the page should have both the form and a table populated with reviews
3. Using JavaScript in `main.js`, modify the form so that when the button is pressed:
    1. the regular form button press event isn't triggered (use `preventDefault`)
    2. instead, the values in the filter form field are retrieved from their elements and are used to construct the url to be requested (use the `.value` property of the form element)
	3. construct the url by using the base path, `/api/messages` and add a query string by concatenating `semester` and `year` to it
    4. make a background request to the url you construct using `XMLHttpRequest` (or [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch_)
    5. when the JSON is returned, it should be parsed into a list of objects representing reviews
    6. use those review objects to replace the contents of the table on the page (for example, you could remove all the children in `tbody` using `parentElement.removeChild(childElementToRemove)`
    7. filtering with a blank field removes that field from the filter (so if semester were empty string, all semesters are allowed)


### Adding New Reviews

1. In the route, `POST /api/message`,  create a new review
    * it should give back a JSON object as the response
    * it should send back the object inserted, if successful
    * otherwise, send back an object with a key called error... with a value containing an error message
2. The normal behavior of forms will need to be modified so that when the add button is pressed:
    * the regular form button press event isn't triggered (use `preventDefault`)
    * ... and instead, the values in the add form are retrieved
    * a background request is made to the url
        * remember to set content type: `req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");`
        * in <code>res.send</code>, make sure to add the form data as name value pairs: <code>"name1=value1&name2=value2&nameN=valueN"</code>
    * when a response is retrieved, repopulate the table so that the new review is added
    * __if there was a filter set before adding, then clear the filter to show all reviews, including the newly added one__

See the movie from earlier in the instructions to check out an example of adding a review (pay close attention to the network tab showing the requests).

</div>

</div>

