---
layout: homework
title: CSCI-UA.0480 - Express Lab
---

<div class="panel panel-default">
	<div class="panel-heading">socket.io Lab</div>
	<div class="panel-body" markdown="block">

# Express Lab - Busy Birder (10 points for In-Class Project/Quiz Grade)

## Submission Process

* work in groups of 2 or 3
* __submit using [the form for your section on the schedule](../#class11)__
* __each person on the team should submit their own individual form__

## Scoring

* __+7 points__ for showing up and submitting form 
* __+2 points__ form submitted with a _reasonable_ amount of _valid looking_ code
* __+1 point__ code deployed on glitch.com (kind of optional, since you basically get 90% for just submitting a form with some code!)

## Overview

### Goals / Topics Covered

You'll be using the following concepts:

* serving static files
* handling forms

### Description

Create a bird watching site called _The Busy Birder_. You'll be creating 3 pages (2 of them allow form submission):

* __home__ - <code>/</code>: the first page on the site; links to the list and settings pages
* __list__ - <code>/birds</code>: lists __all__ of the birds seen so far, as well as the number of times they've been seen. also allows submission of bird sighting (by anyone!)
* __settings__ - <code>/settings</code>: controls the minimum number of birds seen on the list page... think of it as a _filter_ for the list page


<div markdown="block" class="img">
![the busy birder](../resources/img/hw4-the-busy-birder.gif)
</div>


## Part 1 - Setup


* create a <code>package.json</code>
* __install__ the following __dependencies__ (make sure you use the <code>--save</code> option), and __no others__:
	* <code>express</code>
	* <code>hbs</code>


## Part 2 - Homepage and Static Files

### Enabling Static Files

First, lets make sure we can serve up static content, like css and images.

* create the following directory structure in your project's root directory
	* <code>public</code>
	* <code>public/css</code>
	* <code>public/img</code>
* add a blank css file in <code>public/css/base.css</code>
* add an in image of a bird in<code>public/img/bird.png</code> (doesn't have to be `.png`, name this file / use whatever image format you like)
* create a basic express application called <code>app.js</code>; you don't have to define any routes yet...
	* check out the [slides on setting up an Express app](../slides/08/express.html#/26)
* add the appropriate middleware to enable static file serving:
	* check out the [slides on serving static files with Express](../slides/08/express.html#/30)
* test that both the css files and image work
	* for example, try to curl <code>http://localhost:3000/img/bird.png</code> (of course, change this url to match the _actual_ name of the image you chose)
	* or go that url in your browser


### Creating a Home Page

Now that static files are set, create a homepage.

* the homepage should field <code>GET</code> requests on the path, <code>/</code>
	
* set up handlebars - [these slides](../slides/09/templating.html#/4) 
	* get the config setup using `app.set` in `app.js`
	* create the appropriate views/templates and layout
		* create a <code>views</code> folder
		* within that folder, create `layout.hbs`
* in your <code>views/layout.hbs</code>, drop in the surrounding html that will go on every page
	* pull in your <code>base.css</code> stylesheet (use a [link tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link))
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

## Part 3 - List of Bird Sightings

### Overview -  The Bird List Page and Bird Submission Form

The bird list page will list names of birds along with the number of times they've been seen. By default, this list will start with some content:

* 3 x Bald Eagle
* 7 x Yellow Billed Duck
* 4 x Great Cormorant

This page will also allow you to submit the name of a bird that you saw. This will either:

* increment the quantity of birds seen if there's a bird with the same name already on the list
* add a new name to the list, with a quantity of one


### Middleware and Logging

First, get some logging together so that you can troubleshoot. Log out the request that you receive, including the request's body.

* use the body parsing middleware <code>express.urlencoded</code>; this will allow you to access the content of the request's body (you'll use this in the next part)
	* see the slides on [forms to get body parsing middleware set up](../slides/10/forms.html#/6)
* set up some logging using your own middleware function; it should include
	* the request method and path
	* followed by the contents of the request body
	* if you need a major hint, this slides [shows middleware that logs out the method and path](../slides/09/middleware.html#/12) (you just need to add the body of the request, provided by the `express.urlencoded` middleware above), `req.body`)
* maintain a list of birds (can be a global variable)

### Bird List

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
* set up the template and routes appropriately; remember to render the template with the correct context object
	* here's an example of [setting up a route](../slides/08/express.html#/24)
	* and here's how to [render a template](../slides/09/templating.html#/5)
* in the template, you can iterate through the list of birds using the <code>#each</code> helper
	* see the slides for how to [use iteration with handlebars](../slides/09/templating.html#/12)
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

### Bird Form

__Once it's working, create a form...__

* add a form beneath the list of birds
	* it should have a text <code>input</code>(name it appropriately... you'll see that name in the request body!)
	* ...as well as a submit <code>input</code>
* the form's method should be <code>POST</code>
* the action should be empty string <code>""</code> or <code>birds</code> (it's <code>POST</code>ing to itself)
* modify __app.js__... add a route so that it accepts <code>POST</code> requests on <code>/birds</code> 
	* see the slides on [POST forms](../slides/10/forms.html#/8) for some quick background info
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

## Part 4 - Settings Page, Filtering 

This last part will allow the user to choose a minimum value for sightings. This will temporarily add a filter to the list of birds shown on the  `/birds` page. For example, if the threshold is set to 4, only birds that have been sighted 4 times or more will show up on the list.

### Query String 

__Modify your `/birds` route so that it only displays birds that have been sighted for a minimum number of times.__ Do this by using the built-in `req.query` object that holds the values from a parsed query string (in the url).

* in the function that handles `/birds`, filter your global list of birds based on the a value of a property in `req.query`
	* name this any way you want
	* note that the query string in the url should match the property name in `req.query`
	* for example, if the url were `/birds?foo=4`, then use `req.query.foo`
* pass the filtered list to your template rather than the whole list this to your for <code>/birds</code> 

### Now with a Form, `/settings` page

* the settings page should field <code>GET</code> requests on the path, <code>/settings</code>
* add a link to a _list_ page (birds)
* add an <code>h3</code> header with text indicating that this is the _settings_ page
* add a form to your settings page
	* it should have a text <code>input</code>(name it appropriately... you'll see that name in the request body!)
	* ...as well as a submit <code>input</code>
* the form's `method` should be <code>GET</code>
* the `action` should be <code>"/birds"</code>  (it's <code>GET</code>ting to `/birds` with the appropriate query string)
* the page should look like:

<div markdown="block" class="img">
![settings](../resources/img/hw4-settings.png)
</div>

## Part 5 - Deployment

### Deploying to glitch.com

1. [go to glitch.com's express boilerplate app](https://glitch.com/edit/#!/remix/hello-express)
2. modify the existing `package.json` so that it has express and hbs within its dependencies
3. add/modify necessary files!
    * for example...
    * modify `server.js`/`app.js` to add your routes
    * add files to `public/` (just start typing in file name with directory prefixed)
    * add files to `views/` (just start typing in file name with directory prefixed)
	* to add images, click on `new file` and `upload`... the file will be available under assets; copy the url after clicking on the image
    * etc.
4. __change the port so that it looks in the env for the port number!__ (or keep the code as is from the boilerplate)
    * `server.listen(process.env.PORT);`
5. click on the look 👀 link...  
    * instantly deployed app!
    * (click on logs link to see server output)

<div class="hideInner" markdown="block">



</div>
</div>
