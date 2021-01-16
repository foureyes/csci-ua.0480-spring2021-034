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

# AJAX - __Due Tuesday, November 28th by 11pm__

## <span class="warning">First ... Fix or Download the Code!</span>

Not all repositories had starter code pushed, and the ones that did had an error. __Before starting your work...__ you have to do one of two things:

1. if you don't have the code, download the starter version (that already contains the correction outlined below) here:
    * [homework08-starter-restaurants.zip](/csci-ua.0480-fall2017-007/homework/homework08-starter-restaurants.zip)
2. however, if you already have code in your repository, please make the following correction:
    * in `app.js`
    * move the line `app.use(express.urlencoded({extended: false}));`
    * so that it's before `const placesRoutes = require('./routes/places');`
    * see @491 on piazza for original student post


## Overview

### Goals / Topics Covered

You'll be using the following concepts:

* XMLHttpRequest
* sending back json from Express
* Express `Router`

### Description

Creat a "single page application" that allows users to filter restaurants from a list and add new ones. The application will use AJAX POSTs and GETs instead of regular form submissions.

You will:

1. Consolidate the forms for filtering restaurants and adding restaurants so that they appear on the same page
2. Add routes to create an API for retrieving restaurants and adding new ones
3. Use JavaScript to trigger background requests to the API from the form submit buttons

Use the following resources as reference:

1. [Slides on AJAX Part 1](../slides/20/ajax.html)
2. [Slides on AJAX Part 2](../slides/21/ajax-express.html)
3. [AJAX POST (from Part 2)](../slides/21/ajax-express.html#/47)

### Submission Process

You will be given access to a private repository on GitHub.  The final version of your assignment should be in GitHub

* __Push__ your changes to the homework repository on GitHub.
* Commits later than that date will be handled on a case-by-case basis.

### Make at Least 3 Commits

* Commit multiple times throughout your development process.
* Make at least 3 separate commits

### Code Structure:

__You should first create an express application that will be served on port 3000__

The structure of your directory should eventually look like this

```
single-page-app
    /node_modules
    package.json        
    .gitignore
    /public
        index.html      // the 'single' page in your single page web app
        /javascripts
            main.js     // write your client side JavaScript here
        /stylesheets
            style.css   
    /routes
        places.js       // the routes file that will contain all of your route handlers
    app.js
```

* __app.js__:  this is where the express app is initialized
* __/routes/places.js__: this is where all your API routes to fetch and create restaurants should exist (this will need to be "used" in the __app.js__ file)

Note that this will be implemented __as a single page web app__. This means that to implement these features:

1. __create routes that send back JSON__ (essentially create an API)
2. utilize the API by writing client side JavaScript that:
    * constructs a url by retrieving the values of form elements
    * requests data from url constructed in the background (AJAX)
    * parses the result of the background request
    * modifies the DOM appropriately

### Fetching and Filtering:

1. Create a route `GET /places` which returns all the restaurants existing in your database
    1. This route should support query string parameters which give the user the ability to specify the `location`, `cuisine`, or both.
    2. It should return a JSON object. For example, `GET /places?location=West%20Village&cuisine=Turkish`
could return:
        ```
[
  {
    "name":"Istanbul Grill",
    "cuisine":"Turkish",
    "location":"West Village"
  }
]
```
    3. Note that there could be more than one restaurant in the resulting json.
    4. To test, enter the url `http://localhost:3000/places` in your browser; you should get JSON back

2. Using JavaScript in `main.js`, modify the form so that when the button is pressed:
    1. the regular form button press event isn't triggered (use `preventDefault`)
    2. instead, the values in the filter form field are retrieved from their elements and are used to construct the url to be requested (use the `.value` property of the form element)
    3. a background request is made to the url using `XMLHttpRequest`
    4. when the JSON is returned, it should be parsed into a list of objects representing restaurants
    5. use those restaurant objects to replace the contents of the list of restaurants on the page
    6. filtering with a blank field gives back all restaurants

Putting everything together, this should look like (note that the network tab is open to show that pressing the button will show background requests being triggered):

![ajax add](/csci-ua.0480-fall2017-007/resources/img/hw08-rest-filter.gif)

### Adding New Restaurants

1. You will need to create another route `POST /places` which will create a new restaurant based on the request's body
    * it should give back a JSON object as the response
    * it should send back the object inserted, if successful
    * otherwise, send back an object with a key called error... with a value containing an error message
2. The normal behavior of forms will need to be modified so that when the add button is pressed:
    * the regular form button press event isn't triggered (use `preventDefault`)
    * ... and instead, the values in the add form are retrieved
    * a background request is made to the url
        * remember to set content type: `req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");`
        * in <code>res.send</code>, make sure to add the form data as name value pairs: <code>"name1=value1&name2=value2&nameN=valueN"</code>
    * when a response is retrieved, repopulate the table so that the new restaurant is added
    * __if there was a filter set before adding, then clear the filter to show all restaurants, including the newly added one__

For example (again, noting the requests in the network tab):

![ajax add](/csci-ua.0480-fall2017-007/resources/img/hw08-rest-add.gif)

### (5 points) Validations! (Extra credit)

Implement the following validation on the server: 

* Form Validation: Users should not be able to post requests for adding restaurants if any of the form fields are empty
* Duplicate check: Users should not be able to save duplicated entries to the database

Do this by:

* Writing constraints in the schema or checking the data sent manually in the route handler
* Sending back validation errors back through JSON 
* Displaying the errors in the DOM using JavaScript


</div>

</div>

