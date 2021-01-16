---
layout: homework
title: CSCI-UA.0480 - Homework #4
---

<div class="panel panel-default">
	<div class="panel-heading">Homework #4</div>
	<div class="panel-body" markdown="block">

# Express - Static Files, Forms, Sessions __Due Oct 13th__, by 11PM

## Overview

### Description

Create a bird watching site called _The Busy Birder_. You'll explore the following concepts along the way:

* serving static files
* handling forms
* sessions

You'll be creating 3 pages (2 of them allow form submission):

* __home__ - <code>/</code>: the first page on the site; links to the list and settings pages
* __list__ - <code>/birds</code>: lists __all__ of the birds seen so far, as well as the number of times they've been seen. also allows submission of bird sighting (by anyone!)
* __settings__ - <code>/settings</code>: controls the minimum number of birds seen on the list page... this is configured _per session_

### Example Interaction

<div markdown="block" class="img">
![the busy birder](../resources/img/hw4-the-busy-birder.gif)
</div>

### Submission Process

You will be given access to a private repository on GitHub. Create a file called __app.js__ when you clone it.

The final version of your assignment should be in GitHub, but a submission should still be sent via NYU Classes.

* __Push__ your changes to the homework repository on GitHub.
* Add the URL of the repository to your assignment submission in NYU Classes.
* Commits later than that date will be handled on a case-by-case basis.
* 24 hour grace period where NYU Classes is still open.
* After that, no late homeworks will be accepted.

### (3 points) Make at Least 4 Commits

* Commit multiple times throughout your development process.
* Make at least 3 separate commits - (for example, one option may be to make one commit per part in the homework).

## Part 1 - Setup

### (2 points) Installing Dependencies

* create a <code>package.json</code>
* __install__ the following __dependencies__ (make sure you use the <code>--save</code> option), and __no others__:
	* <code>body-parser</code>
	* <code>express</code>
	* <code>express-handlebars</code>
	* <code>express-session</code>


### (2 points) .gitignore

* create a <code>.gitignore</code>
* ignore the following files:
	* <code>node_modules</code>
	* <code>DS_Store</code> (if you're on OSX)

## Part 2 - Homepage and Static Files

### (3 points) Enabling Static Files

First, lets make sure we can serve up static content, like css and images.

* create the following directory structure in your project's root directory
	* <code>public</code>
	* <code>public/css</code>
	* <code>public/img</code>
* add a blank css file in <code>public/css/base.css</code>
* add an in image of a bird in<code>public/img/bird.png</code>
* create a basic express application called <code>app.js</code>; you don't have to define any routes yet...
* just add the appropriate requires and middleware to enable static file serving:
	* check out the [slides on serving static files with Express](http://foureyes.github.io/csci-ua.0480-fall2015-001/slides/08/express.html#/29)
	* or see page 26 in Chapter 3 of {{ site.book_web }}
* test that both the css files and image work
	* for example, try to curl <code>http://localhost:3000/img/bird.png</code>
	* or go that url in your browser


### (4 points) Creating a Home Page

Now that static files are set, create a homepage.

* the homepage should field <code>GET</code> requests on the path, <code>/</code>
	
* set up handlebars - [these slides](http://foureyes.github.io/csci-ua.0480-fall2015-001/slides/10/templating.html#/) may help, or read page 24 in Chapter 3 or skim Chapter 7 in {{ site.book_web }})
	* get all the requirements and config setup
	* create the appropriate views/templates and layout 
		* <code>views</code>
		* <code>views/layouts</code>
* in your <code>main.handlebars</code>, drop in the surrounding html that will go on every page
	* pull in your <code>base.css</code> stylesheet
	* include an <code>h1</code> on every page... the header on every page should say __The Busy Birder__
	* don't forget <code>body</code>, surrounded by triple curly braces!
* in your template for your homepage (call this whatever you want... just make sure you can pull it up later), add the following:
	* an <code>h3</code> header with some welcome text
	* an image of a bird
	* a link to a _settings_ page (settings)
	* a link to _list of birds_ page (birds)
* create the appropriate route so that a <code>GET</code> request pulls up the page
* add some css to change background color, font color and font family


Here's an example of what the page could look like (you don't have to use the same exact styles, but add enough styles so that you can see that it's being pulled up correctly):

<div markdown="block" class="img">
![homepage](../resources/img/hw4-home.png)
</div>


## The Bird List Page and Bird Submission Form

The bird list page will list names of birds along with the number of times they've been seen. By default, this list will start with some content:

* 3 x Bald Eagle
* 7 x Yellow Billed Duck
* 4 x Great Cormorant

This page will also allow you to submit the name of a bird that you saw. This will either:

* increment the quantity of birds seen if there's a bird with the same name already on the list
* add a new name to the list, with a quantity of one

## Part 3 - List of Bird Sightings

### (3 points) Middleware and Logging

First, get some logging together so that you can troubleshoot. Log out the request that you receive, including the request's body.

* require the <code>body-parser</code> middleware and use it; this will allow you to access the content of the request's body
* set up some logging using your own middleware function; it should include
	* the request method and path
	* followed by the contents of the request body
* maintain a list of birds (can be a global variable)

### (6 points) Bird List

Now for some actual content. This page will display the names of birds and the number of times they've been seen.

__Bootstrap the list with some data.__

* store all of the birdwatching data in a global Array of objects... 
* each object has two properties:
	* a bird's name
	* the number of times they've been seen
* it should start off with:
	* 3 x Bald Eagle
	* 7 x Yellow Billed Duck
	* 4 x Great Cormorant
* (This isn't really good practice, but we'll have to store the data _somewhere_ for now!)

__Create the actual page...__

* the list page should field <code>GET</code> requests on the path, <code>/birds</code>
* set up the template and routes appropriately; remember to render the template with the correct context
* in the template, you can iterate through the list of birds using the <code>#each</code> helper
* put each quantity/name pair in a list item (<code>li</code>)
* additionally, make the quantity a different color than the name
* add a link to a _settings_ page (settings)
* finally, and an <code>h3</code> header with text indicating that this is the _bird sightings_ page

__Test your page.__

* it should look a little like the image below
* (ignore the form for now... you'll set that up next)

<div markdown="block" class="img">
![list](../resources/img/hw4-list.png)
</div>

### (8 points) Bird Form
__Once it's working, create a form...__

* add a form beneath the list of birds
	* it should have a text <code>input</code>(name it appropriately... you'll see that name in the request body!)
	* ...as well as a submit <code>input</code>
* the form's method should be <code>POST</code>
* the action should be empty string <code>""</code> or <code>birds</code> (it's <code>POST</code>ing to itself)
* modify __app.js__... add a route so that it accepts <code>POST</code> requests on <code>/birds</code> 
	* in your callback function for this route...
	* use the bird name that was passed in from the form (it should be in the request's body)...
	* to search the current list of birds for an entry with the same name as what is the request's body
	* if it exists, add one to it
	* if it doesn't, create an object for it, with quantity one, and add it to the list
	* ...after that, redirect back to <code>/birds</code> with a <code>GET</code> request
* the log should look something like this:

<code>GET</code> the list page.

<pre><code data-trim contenteditable>GET /birds
=====
req.body: {}
</code></pre>

<code>POST</code> the form (notice the body).

<pre><code data-trim contenteditable>POST /birds
=====
req.body: { name: 'Ostrich', add: 'Add Another Bird' }
</code></pre>

<code>GET</code> the list page again.

<pre><code data-trim contenteditable>GET /birds
=====
req.body: {}
</code></pre>


## Part 4 - Settings Page, Filtering With a Session Value


This last bit may be tricky. This feature will allow users with different sessions to optionally set a minimum value of sightings that determines which birds will be displayed on the list when they view the list page.

For example, if the threshold is set to 4, only birds that have been sighted 4 times or more will show up on the list _for them_. You can try using two browser to test this out (setting the min on one will not affect the other).

### (6 points) Session Setup

__First, setup and configure sessions:__

* bring in the session module by requiring <code>express-session</code>
* set up a some options for your session:

<pre><code data-trim contenteditable>
var sessionOptions = {
	secret: 'secret cookie thang',
	resave: true,
	saveUninitialized: true
};
</code></pre>

* then use those options for session handling middleware: <code>app.use(session(sessionOptions));</code>

__Modify your list route so that it only displays birds that have been sighted for a minimum number of times.__ 

* create a new list based off of the session value as the threshold: <code>req.session.yourMinimumValueVariable</code> (you can just loop or use a higher order function)
* pass this to your list template for <code>/birds</code> rather than the unfiltered version


### (8 points) The Settings Page

__Create a form to set the minumum value.__

* the settings page should field <code>GET</code> requests on the path, <code>/settings</code>
* add a link to a _list_ page (birds)
* add an <code>h3</code> header with text indicating that this is the _settings_ page
* add a form to your settings page
	* it should have a text <code>input</code>(name it appropriately... you'll see that name in the request body!)
	* ...as well as a submit <code>input</code>
* the form's method should be <code>POST</code>
* the action should be empty string <code>""</code> or <code>settings</code> (it's <code>POST</code>ing to itself)
* modify __app.js__... add a route so that it accepts <code>POST</code> requests on <code>/settings</code> 
	* in your callback function for this route...
	* create a session variable from the number that was passed in from the form 
	* redirect to the list page so you can see the new filtered results (<code>/birds</code>) 
	* it may also be good to log the value of your session variable for troubleshooting
	* modify the <code>GET</code> version of the page so that if the session value for the minimum is set, the text input in the form should be pre-filled with that value (see the image below)
* the page should look like:

<div markdown="block" class="img">
![settings](../resources/img/hw4-settings.png)
</div>

__The log should look something like this:__

<code>GET</code> the settings page.
<pre><code data-trim contenteditable>
GET /settings
=====
req.body: {}
req.session.minVal: undefined
</code></pre>

<code>POST</code> the form...
<pre><code data-trim contenteditable>
POST /settings
=====
req.body: { minVal: '2', add: 'Set It!' }
req.session.minVal: undefined
</code></pre>

<code>GET</code> the list page to show the filtered results
<pre><code data-trim contenteditable>
GET /birds
=====
req.body: {}
req.session.minVal: 2
</code></pre>

__Test the session management.__

* open your app with one browser... and set a minimum threshold
* open your app in another browser
* check that the filter is not applied


</div>

</div>

