---
layout: homework
title: CSCI-UA.0480 - Homework #4
---

<style>
h1.warning {
	background-color: #eaa;
}
</style>
<div class="panel panel-default">
	<div class="panel-heading">Homework #3</div>
	<div class="panel-body" markdown="block">

# ASCII ART DIARYYYY-MM-DD, Due __Wednesday 10/17 by 11PM__


## Overview

### Description

Create a site the collects and displays a sketchbook of ascii art.In this homework you'll be working with:

* serving static files
* middleware
* handling forms, both GET and POST
* sessions

You'll be creating 2 pages:

* __home__ - <code>/</code>: displays all of the ascii pieces submitted on the site; can be filtered by tag.
* __add__ - <code>/add</code>: a page that allows a user to submit a new piece

Your directory layout should look like the following __once you're done with the assignment__:

<pre><code data-trim contenteditable>
├── app.js
├── package-lock.json
├── package.json
├── public
│   ├── css
│   │   └── base.css
│   └── img
│       └── logo.png
└── views
    ├── layout.hbs
    └── your-template-here.hbs
</code></pre>

### Example Interaction

<div markdown="block" class="img">
<!--![interaction](../resources/img/hw04-asciidiary-mainexample.gif)-->
<img src="../resources/img/hw04-asciidiary-mainexample.gif">

</div>

### Submission Process

1. You will be given access to a private repository on GitHub
2. The final version of your assignment should be in GitHub
3. __Push__ your changes to the homework repository on GitHub by the due date.

###  Make at Least 4 Commits

* Commit multiple times throughout your development process.
* Make at least 3 separate commits - (for example, one option may be to make one commit per part in the homework).

## Part 1 - Setup

###  Installing Dependencies

* create a <code>package.json</code>
* __install__ the following __dependencies__ (make sure you use the <code>--save</code> option), and __no others__:
	* <code>express</code>
	* <code>hbs</code>


###  .gitignore

* create a <code>.gitignore</code>
* ignore the following files:
	* <code>node_modules</code>
	* any other files that aren't relevant to the project... for example
        * <code>.DS_Store</code> if you're on OSX
        * <code>.swp</code> if you use vim as your editor
        * etc.

### linting

* an eslint configuration file (for example `.eslintrc.json`) should be in the root directory (or copy one from a previous project if it doesn't exist)
* make sure that any global linting tools are installed (`eslint`)
* periodically lint your program as you work

## Part 2 - Homepage and Static Files

###  Enabling Static Files

First, let's make sure you can serve up static content, like css and images.

* create the following directory structure in your project's root directory
	* <code>public</code>
	* <code>public/css</code>
	* <code>public/img</code>
* add a blank css file in <code>public/css/base.css</code>
* add an ascii related image in <code>public/img/logo.png</code>
* create a basic express application called <code>app.js</code>; you don't have to define any routes yet...
	* make sure that your application is __served over port 3000__
* just add the appropriate requires and middleware to enable static file serving:
	* check out the [slides on serving static files with Express](../slides/08/express.html#/29)
* test that both the css files and image work
	* for example, try to curl <code>http://localhost:3000/img/logo.png</code>
	* or go that url in your browser


###  Creating a Home Page

Now that static files are set, create a homepage.

* for the home page, your app should accept <code>GET</code> requests on the path, <code>/</code>
* set up handlebars - [these slides](../slides/09/templating.html) may help... (it's just one line!)
	* get all the requirements and config setup
	* create the appropriate views folder, along with an initial layout file:
		* <code>views</code>
        * <code>views/layout.hbs</code>
* in your <code>layout.hbs</code>, drop in the surrounding html that will go on every page
	* pull in your <code>base.css</code> stylesheet
	* include a header containing both your <code>logo.png</code> image and the title of your site, __ascii sketchbook__
    * additionally, add a footer that links to all 2 pages in your site:
	    * a link to the home / list of artworks page (/)
	    * a link to __a page to add an entry__ page (/add)
	* don't forget <code>body</code>, surrounded by triple curly braces!
* in your template for your homepage (you can name this template whatever you want... just make sure you can pull it up later), add the following:
	* an <code>h3</code> header that says "artworks"
* create the appropriate route so that a <code>GET</code> request pulls up the rendered template
* add some css to change some styles, (for example change the color of the text, change the font, etc.)

Here's an example of what the page could look like (you don't have to use the same exact styles, but add enough styles so that you can see that the style sheet is integrated correctly):

<div markdown="block" class="img">
<img src='../resources/img/hw04-asciidiary-examplelookempty.png' width="100%">
<!--
![png](../resources/img/hw04-asciidiary-examplelookempty.png)
-->
</div>



## Part 3 - List of Artworks, Filtering List of Artworks

The homepage should also have a list of all of the artworks submitted to the site. By default, this list will start with the following content:


01.
```
2018-09-29 washington sq arch
 _______________
 |~|_________|~|
 |::::\^o^/::::|
 ---------------
 |..|/     \|..|
 ---        ----
 |  |       |  |
 |  |       |  |
 |  |       |  |
.|__|.     .|__|.

tags: architecture, public
```

02.
```
2018-09-30 boba
  ______
  ======
 /      \
|        |-.
|        |  \
|O.o:.o8o|_ /
|.o.8o.O.|
 \.o:o.o/

tags: snack, notmybestwork
```

03.
```
2018-10-31 buddy
       ___
      /  /\   |---.
      |__|/__ |---,\
      |  `   |=    `
      |      /|
      |  .--' |
      |   |\  |
      |   | \ |
     /|   | | |
    \/    |  \|
___ /_____\___|\____

tags: halloween, squad, fashion
```

These artworks can be filtered so that your application only shows artworks for a particular tag.

###  Middleware and Logging

First, get some logging together so that you can troubleshoot. Log out the request that you receive, including the request's query string and body.

* require the <code>body-parser</code> (aka `express.urlencoded`) middleware and use it; this will allow you to access the content of the request's body
* set up some logging using your own middleware function; it should include
	* the request __method__,  __path__
    * followed by the contents of the request's query string
	* followed by the contents of the request __body__

### Artwork List

Now for some actual content. This page will display the artworks and the tags associated with the artwork.

__Bootstrap the list with some data.__

* store all of the artwork data in a global Array of objects...
* each object has four properties:
  * the title
  * the date (as a YYYY-MM-DD string)
  * the _actual_ artwork (just strings).
  * hint: use \`\` string templates to have strings with newlines in your code.
    * warning: the "\" needs to be escaped using itself if you do things this way i.e. "\\" whenever you mean "\"
* it should start off with three artworks of your choice or doing (you can copy the ones above if you feel like it)
* (storing this data in a global variable isn't typical, of course, but we'll have to store the data _somewhere_ for now!)

__Create the actual page...__

{% comment %}
* the list page should field <code>GET</code> requests on the path, <code>/list</code>
{% endcomment %}

* modify your route for your home page (<code>/</code>) so that you render the template with the correct context object (that is, the list of artworks to display)
* in the template, you can iterate through the list of artworks using the <code>#each</code> helper
	* HINT: use the `<pre>` tag is for monospaced (ascii art) 
* __display the artworks in reverse order__ - the last element on the list should be on top
* put each artwork + metadata entry in a list item (<code>li</code>)
* for each artwork, display all tags as links that will filter the artworks to only that tag
	* you'll have to come back to this later as you add the ability to _actually_ filter in the next part
* additionally, make the tags a different style (such as a different font-weight or background-color or ... anything you want)

__Test your page.__

* it should look a little like the image below
* again, the styles don't have to match exactly - just add enough styling to distinguish between the tags and the actual message

<div markdown="block" class="img">
<img src="../resources/img/hw04-asciidiary-examplelookpopulated.png" width="100%">
<!--![list](../resources/img/hw04-asciidiary-examplelookpopulated.png)-->
</div>

###  Filter by Artwork Tag

__Once you have your list of artworks working... add a form that allows you to filter by tags.__ &rarr;

* create a form in the template used for your homepage
    * the form should issue a <code>GET</code> request
    * the request should go to the same URL that it's on (still home, <code>/</code>)
    * the form should also have a text field and a submit button
    * __name your text input: `tag`__
* on the server side, modify your route for your home page (<code>/</code>) so that it sends filtered data if the form is submitted
    * how does your route know if the form was submitted?
    * how does the route extract the data from the <code>GET</code> request / form submission?
    * find some way to filter the data
    * send that data to the template
    * if the filter submitted is blank or if there is no filter, display all of the artworks
* go back and modify the tag links in your template for `/` so each has an appropriate link to filter the artworks __WITHOUT__ having to submit a form
* __here's what the filter interaction should look like:__

<div markdown="block" class="img">
<!--![filter](../resources/img/hw04-asciidiary-filterexample.gif)-->
<img src="../resources/img/hw04-asciidiary-filterexample.gif">
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


## Part 4 - Adding an Artwork

###  Create a Artwork Form

* in __app.js__ create a new route handler and template for <code>/add</code>
    * add a form in your template
	* it should have 4 <code>inputs</code> (choose whatever form elements you like, they can all be text if you want to keep things simple) - with appropriate name attributes... you'll see that name in the request body!
        * title
        * dt (date string)
        * the text of the artwork
        * tags (as single space-delimited string)
	* ...as well as a submit <code>input</code>
* the form's method should be <code>POST</code>
* the action should be empty string <code>""</code> or <code>/add</code> (it's <code>POST</code>ing to itself)
* modify __app.js__ again... by adding a new route so that it accepts <code>POST</code> requests on <code>/add</code>
	* in your callback function for this route...
	* create an object for this new artwork (with the actual artwork text and the tags) and add it to your global list of artwork objects
	* ...after that, redirect to home <code>/</code> with a <code>GET</code> request
* __here's what the add interaction should look like:__


<div markdown="block" class="img">
<!--![add](../resources/img/hw04-asciidiary-addexample.gif)-->
<img src="../resources/img/hw04-asciidiary-addexample.gif">
</div>

The logs should look something like this for the POST, Redirect and GET:

<code>GET</code> the list page.

<pre><code data-trim contenteditable>GET /add
=====
req.query: {}
req.body: {}
</code></pre>

<code>POST</code> the form (notice the body).

<pre><code data-trim contenteditable>POST /add
=====
req.query: {}
req.body: { title: 'sanata',
     dt: '2018-12-25',
     work: '(o.O )\\r\\n  ... /\\r\\n  //\\\\\\\\  ',
     tags: 'holiday  fun  healthy' } }
</code></pre>

<code>GET</code> the home page (/)...

<pre><code data-trim contenteditable>GET /
=====
req.query: {}
req.body: {}
</code></pre>


</div>

</div>
