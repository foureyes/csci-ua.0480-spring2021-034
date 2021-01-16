---
layout: homework
title: CSCI-UA.0480 - Homework #4
---

<div class="panel panel-default">
	<div class="panel-heading">Homework #4</div>
	<div class="panel-body" markdown="block">

# Express - Static Files, Forms, Sessions __Due Monday, March 7th, by 11PM__

## Overview

### Description

Create a site the collects and displays complaints about the New York City subway. Call it: "The Complaining Commuter". In this homework you'll be working with:

* serving static files
* middleware
* handling forms, both GET and POST
* sessions

You'll be creating 3 pages:

* __home__ - <code>/</code>: displays a list of all of the complaints submitted on the site; can be filtered by subway line
* __complain__ - <code>/complain</code>: a page that allows a user to submit a new complaint
* __stats__ - <code>/stats</code>: displays the number of times the user has submitted a complaint during this browsing session

### Example Interaction

<div markdown="block" class="img">
![interaction](../resources/img/hw04_01_example_interaction.gif)
</div>

### Submission Process

1. You will be given access to a private repository on GitHub
2. The final version of your assignment should be in GitHub
3. __Push__ your changes to the homework repository on GitHub by the due date.

### (3 points) Make at Least 4 Commits

* Commit multiple times throughout your development process.
* Make at least 3 separate commits - (for example, one option may be to make one commit per part in the homework).

## Part 1 - Setup

### (2 points) Installing Dependencies

* create a <code>package.json</code>
* __install__ the following __dependencies__ (make sure you use the <code>--save</code> option), and __no others__:
	* <code>body-parser</code>
	* <code>express</code>
	* <code>hbs</code>
	* <code>express-session</code>


### (2 points) .gitignore

* create a <code>.gitignore</code>
* ignore the following files:
	* <code>node_modules</code>
	* any other files that aren't relevant to the project... for example
        * <code>.DS_Store</code> if you're on OSX
        * <code>.swp</code> if you use vim as your editor
        * etc.

## Part 2 - Homepage and Static Files

### (3 points) Enabling Static Files

First, let's make sure you can serve up static content, like css and images.

* create the following directory structure in your project's root directory
	* <code>public</code>
	* <code>public/css</code>
	* <code>public/img</code>
* add a blank css file in <code>public/css/base.css</code>
* add a subway related image in <code>public/img/subway.jpg</code>
* create a basic express application called <code>app.js</code>; you don't have to define any routes yet...
* just add the appropriate requires and middleware to enable static file serving:
	* check out the [slides on serving static files with Express](http://foureyes.github.io/csci-ua.0480-spring2016-010/slides/08/express.html#/29)
	* or see page 26 in Chapter 3 of {{ site.book_web }}
* test that both the css files and image work
	* for example, try to curl <code>http://localhost:3000/img/subway.jpg</code>
	* or go that url in your browser


### (4 points) Creating a Home Page

Now that static files are set, create a homepage.

* for the home page, your app should accept <code>GET</code> requests on the path, <code>/</code>
* set up handlebars - [these slides](http://foureyes.github.io/csci-ua.0480-spring2016-010/slides/10/templating.html#/5) may help... (it's just one line!)
	* get all the requirements and config setup
	* create the appropriate views folder, along with an initial layout file:
		* <code>views</code>
        * <code>views/layout.hbs</code>
* in your <code>layout.hbs</code>, drop in the surrounding html that will go on every page
	* pull in your <code>base.css</code> stylesheet
	* include a header containing both your <code>subway.jpg</code> image and the title of your site, __The Complaining Commuter__
    * additionally, add a footer that links to all 3 pages in your site:
	    * a link to the home / list of complaints page (/)
	    * a link to __a page to add a complaint__ page (/complain)
	    * a link to a __stats__ page (/stats)
	* don't forget <code>body</code>, surrounded by triple curly braces!
* in your template for your homepage (you can name this template whatever you want... just make sure you can pull it up later), add the following:
	* an <code>h3</code> header that says "Complaints List"
* create the appropriate route so that a <code>GET</code> request pulls up the rendered template
* add some css to change some styles, (for example change the color of the text, change the font, etc.)

Here's an example of what the page could look like (you don't have to use the same exact styles, but add enough styles so that you can see that the style sheet is integrated correctly):

<div markdown="block" class="img">
![png](../resources/img/hw04_02_home.png)
</div>



## Part 3 - List of Complaints, Filtering List of Complaints

The homepage should also have a list of all of the complaints submitted to the site. By default, this list will start with the following content:

* G - The person sitting next to me was eating hard-boiled eggs in the subway car (???!!!)
* F - There was a possum loose on the platform
* A - The train was an hour late!, A Line

These complaints can be filtered so that your application only shows complaints for a particular subway line.

### (3 points) Middleware and Logging

First, get some logging together so that you can troubleshoot. Log out the request that you receive, including the request's query string and body.

* require the <code>body-parser</code> middleware and use it; this will allow you to access the content of the request's body
* set up some logging using your own middleware function; it should include
	* the request __method__,  __path__
    * followed by the contents of the request's query string
	* followed by the contents of the request __body__

### (6 points) Complaint List

Now for some actual content. This page will display the complaints and the subway line associated with the complaint.

__Bootstrap the list with some data.__

* store all of the complaint data in a global Array of objects... 
* each object has two properties:
	* the _actual_ complaint (just text)
	* the subway line
* it should start off with:
    * G - The person sitting next to me was eating hard-boiled eggs in the subway car (???!!!)
    * F - There was a possum loose on the platform
    * A - The train was an hour late!
* (storing this data in a global variable isn't typical, of course, but we'll have to store the data _somewhere_ for now!)

__Create the actual page...__

{% comment %}
* the list page should field <code>GET</code> requests on the path, <code>/birds</code>
{% endcomment %}

* modify your route for your home page (<code>/</code>) so that you render the template with the correct context object (that is, the list of complaints to display)
* in the template, you can iterate through the list of complaints using the <code>#each</code> helper
* __display the complaints in reverse order__ - the last element on the list should be on top
* put each complaint/subway line pair in a list item (<code>li</code>)
* additionally, make the subway line a different style (such as a different font-weight or background-color or ... any other style that's different from the complaint)

__Test your page.__

* it should look a little like the image below
* again, the styles don't have to match exactly - just add enough styling to distinguish between the subway line and the actual message
* (ignore the form for now... you'll set that up next)

<div markdown="block" class="img">
![list](../resources/img/hw04_03_list.png)
</div>

### (7 points) Filter by Subway Line

__Once you have your list of complaints working... add a form that allows you to filter by subway line.__ &rarr;

* create a form in your <code>index.hbs</code> template
    * the form should issue a <code>GET</code> request
    * the request should go to the same URL that it's on (still home, <code>/</code>)
    * the form should also have a text field and a submit button
    * __remember to give you text field a name!__
* on the server side, modify your route for your home page (<code>/</code>) so that it sends filtered data if the form is submitted
    * how does your route know if the form was submitted?
    * how does the route extract the data from the <code>GET</code> request / form submission?
    * find some way to filter the data
    * send that data to the template
    * if the filter submitted is blank or if there is no filter, display all of the complaints
* __here's what the filter interaction should look like:__ 

<div markdown="block" class="img">
![filter](../resources/img/hw04_04_filter.gif)
</div>

__The log should look something like this:__

<code>GET</code> the home page

<pre><code data-trim contenteditable>GET /
=====
req.query: {}
req.body: {}
</code></pre>

<code>GET</code> to submit your filter
<pre><code data-trim contenteditable>GET /
=====
req.query: { filter: 'G' }
req.body: {}
</code></pre>


## Part 4 - Adding a Complaint

### (9 points) Create a Complaint Form

* in __app.js__ create a new route handler and template for <code>/complain</code>
    * add a form in your template
	* it should have 2 <code>inputs</code> (choose whatever form elements you like, they can both be text if you want to keep things simple) - with appropriate name attributes... you'll see that name in the request body!
        * the text of the complaint
        * ...and the subway line
	* ...as well as a submit <code>input</code>
* the form's method should be <code>POST</code>
* the action should be empty string <code>""</code> or <code>/complain</code> (it's <code>POST</code>ing to itself)
* modify __app.js__ again... by adding a new route so that it accepts <code>POST</code> requests on <code>/complain</code> 
	* in your callback function for this route...
	* create an object for this new complaint (with the actual complaint text and the subway line) and add it to your global list of complaint objects
	* ...after that, redirect to home <code>/</code> with a <code>GET</code> request
* __here's what the filter interaction should look like:__ 


<div markdown="block" class="img">
![add](../resources/img/hw04_05_add.gif)
</div>

The logs should look something like this for the POST, Redirect and GET:

<code>GET</code> the list page.

<pre><code data-trim contenteditable>GET /complain
=====
req.query: {}
req.body: {}
</code></pre>

<code>POST</code> the form (notice the body).

<pre><code data-trim contenteditable>POST /complain
=====
req.query: {}
req.body: { complaint: 'Blah blah blah!', line: 'Q' }
</code></pre>

<code>GET</code> the home page (/)... 

<pre><code data-trim contenteditable>GET /
=====
req.query: {}
req.body: {}
</code></pre>


## Part 5 - Stats Page / Using a Session Value

Create a page that shows how many complaints that a user has submitted __during their browsing session__.

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

__Modify your add route (<code>/complain</code>) so that every time a user adds a new complaint, it's counted in their session.__ 

* in the add (<code>/complain</code>) route, count how many times a person has complained for their session by adding a property to the <code>req.session</code> object
* increment the count if there's already a value there
* otherwise, the count should start at 0


### (5 points) The Stats Page


* create a route handler for <code>/stats</code>
* create a template for it
* display the session variable that represents the current count of the user's complaint submssions
* the page should look like:

<div markdown="block" class="img">
![stats](../resources/img/hw04_06_stats.gif)
</div>

__Test the session management.__

* open your app with one browser... and add some complaints
* the stats page should show the count of complaints
* open your app in another browser or in private browsing / incognito mode
* check that the count is 0 for this other browser session
* (and of course, make sure that the previous count in your other session was maintained)


</div>

</div>
