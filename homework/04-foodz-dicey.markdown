---
layout: homework
title: CSCI-UA.0480 - Homework #4
---

<div class="panel panel-default">
	<div class="panel-heading">Homework #4</div>
	<div class="panel-body" markdown="block">

# Express - Static Files, Forms, and Templating <strike>Due March 9th, by 11PM</strike> __Due  March 10th, by 11PM__ (extended 1 day)

## Overview

### Description

Create two small sites:

1. a site that simulates generating a passphrase using diceware called __dicey__ 
2. a meal recommendation site called __foodz__ 

You'll explore the following concepts along the way:

* serving static files
* templating
* handling forms

For __dicey__, you'll be creating 3 paths:

* <code>/</code>: the root path, redirects to `dice`
* <code>/dice</code>: a page that simulates rolling dice to generate a pass phrase
    * the number of words and the word separator can be specified in a form
* `/about`: a page about the web application

For __foodz__, you'll be creating 1 page that allows two form submissions:

* <code>/</code>: 
    * has a form that allows the addition of a new meal recommendation
    * has a form that allows filtering of meal recommendations by breakfast, lunch, dinner or anytime
    



### Submission Process

You will be given access to a private repository on GitHub. It will contain: 

1. stub source files in the `src` directory
2. a `.eslintrc`

__Push__ your changes to the homework repository on GitHub.
Commits later than the deadline will not be included in grading

### (4 points) Make at Least 4 Commits

* Commit multiple times throughout your development process.
* Make at least 4 separate commits - (for example, one option may be to make one commit per part in the homework).

## Part 1 - Setup

Because we're creating two express apps in a single repository, the directory layout will be a little different from what we've seen before. Both projects will share the same `package.json`, `node_modules`, `.gitignore` and `.eslintrc`, but they'll each have their own `public` and `views` folders within their own directory in `src`. When you're __done with all of the directions__, you should have a folder structure that looks similar to this:

* `/` (project root)
    * `package.json`
    * `node_modules`
    * `.gitignore`
    * `.eslintrc`
    * `/src`
        * `/dicey`
            * `dicey.js`
            * `public`
                * `img` (optional)
                * `css`
            * `views`
                * `layout.hbs`
        * `/foodz`
            * `foodz.js`
            * `public`
                * `img` (optional)
                * `css`
            * `views`
                * `layout.hbs`

### (2 points) Installing Dependencies

* create a <code>package.json</code> (you can use `npm init` to do this) in the root directory of your project:
* __install__ the following __dependencies__ (make sure you use the <code>--save</code> option):
	* <code>express</code>
	* <code>hbs</code>
	* <code>body-parser</code> (this is used for foodz only)

### (2 points) .gitignore

* create a <code>.gitignore</code> file in the root directory of your project
* ignore the following files:
	* <code>node_modules</code>
	* any other files that are not part of your project... for example:
        * <code>.DS_Store</code> (if you're on OSX)
	    * <code>*.swp</code> (if you're using vim)


## Part 2 - dicey

In `/src/dicey/dicey.js`, create an Express application that generates a passphrase by randomly choosing words from a word list. However, instead of simply choosing a random index to pick a word, use the Diceware methodology described here:

[http://world.std.com/~reinhold/diceware.html](http://world.std.com/~reinhold/diceware.html)

Specifically, read through the following sections:

* "What Is Diceware"
* "Using Diceware"

Our application will simulate the generation of a passphrase by:

1. rolling the appropriate number of dice
2. looking up words in the Diceware word list 
3. displaying the dice rolls and associated words
4. displaying the _actual_ resulting passphrase


### Static Files, Basic Routes, Templating

Start off by creating a basic express application runnable through <code>src/dicey/dicey.js</code>. See the [slides on Express](../slides/08/express.html) for a refresher on how to do this. Then:

* use handlebars for templating 
    * see [the slides on templating](../slides/09/templating.html#/)
	* set hbs as the default view engine
	* create the appropriate directory structure and templates:  
		* `src/dicey/views` to hold templates
		* `src/dicey/views/layout.hbs` for "common" markup
		* two other `hbs` files (use any name) for the makrup in `/` and `about`
* create the following directory structure in `src/dicey` 
	* <code>public</code>
	* <code>public/css</code>
	* <code>public/img</code> (optional)
* add a css file in <code>public/css/base.css</code>
* add the appropriate requires and middleware to enable static file serving; see the [slides on serving static files with Express](../slides/08/express.html#/29)
* test that the css file works
	* for example, try to curl <code>http://localhost:8080/css/base.css</code>
	* or go that url in your browser
* pull in your <code>base.css</code> stylesheet in your `layout.hbs` with a `link` tag
* in <code>views/layout.hbs</code>, drop in the surrounding html that will go on every page
    * add an `h1` element with the title of the site
    * add a navigation links to `/dice` and `/about`
	* don't forget <code>body</code>, surrounded by triple curly braces!
* modify `dicey.js` to accept the following routes:
    * `/` - redirects to `dice` 
    * `/about` - a page describing the site (any content can be placed here)
    * `/dice` - a page that displays a generated passphrase and a form to generate the passphrase
* create `hbs` files in `views` for `about` and `dice` (__name these templates yourself__) 
* `/` - redirect to `/dice` 
* `/about` - should contain text describing the site (__can be any text you want__)
* `/dice` - should contain a form that `GET`s itself (`method` is `GET`, `action` can be left blank to specify that submitting the form will `GET` the current url, `/dicey`)...  that allows the following input:
    * ([skim through the slides on forms](../slides/10/forms.html) or [or read the form element documentation on mdn](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Forms/How_to_structure_an_HTML_form#The_<form>_element) along with this [lengthy article on using forms](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Forms/My_first_HTML_form))
    * a number ([see htmlreference.io on input, type number](http://htmlreference.io/element/input/)) - to specify how many words the passphrase should consist of 
        * the `name` attribute must be `numWords`
    * a drop down ([see htmlreference.io on select](http://htmlreference.io/element/select/)) - to specify what character goes between each generated word; include the following characters: space, dash, comma, star and none
        * the `select` element's `name` attribute must be `glue`
        * each option's value should be the name of the potential separtor/glue character...
        * for example: `<option value="space">space " "</option>` 
        * the possible values are: `space`, `dash`, `comma`, `star` and `none`
    * a submit button
* modify your `base.css` file to style the above pages - __style at your discretion, as long as _some_ styling is present__
* see the image below to see what the resulting pages should look like for `/`, `/dice`, and `/about`

![paths](../resources/img/hw04-dicey-01-paths.gif)

### Handling GET Query String Data

* read in [the diceware file](04/diceware.wordlist.txt) __before your express application serves its routes__
    * it should present in the repository in `src/dicey` (if not, you can [download it](04/diceware.wordlist.txt))
    * use any method can be used for reading in the file - the synchronous versions of readFile is allowed
    * if you use the async version, just make sure that `app.listen(8080)` is the last thing that is executed (it can simply be executed in the callback)
    * each line in the file contains a number with 5 digits (each digit is limited to the number of faces on a die, 1 - 6) and an associated word... (these are separated by tabs, or `\t`)
    * store the number / word combinations so that a word can be easily looked up by the number (use any data structure you like to do this)
* check out the [slides on GET](../slides/10/review-get.html) before proceeding
* in the route handler for `/dice`, accept __query string data__ ...
* modify your route for `/dicey` so that you can append the following query string variables when requesting the path:
    * `numWords`
    * `glue`
    * for example, you can enter this into your browser: `http://localhost:8080/dice?numWords=3&glue=star`
    * ...and the server will be able to access that data
* [access these query string parameters on the server side (within your express app) from `req.query`](https://expressjs.com/en/api.html#req.query)
* use the values in `req.query` to generate a passphrase:
    * for every word (`numWords`) specified by the user...
    * roll 5 dice (generate a random number between 1 and 6 inclusive)
    * look up the word in the diceware word list
    * join all of the generated words by the `glue` character
    * __if the submitted `glue` character is not a space, dash, star, comma or none, or if it's not present, default to space__
    * __"save" all of the numbers generated and their associated words__ in a variable as _meta_ data for you passphrase generation (that is, you'll send this data over to your template in your `render` call)
* if `numWords` and `glue` are present and a passphrase was generated...
    * display the resulting passphrase on the page
    * for every word, display the numbers rolled and the word associated with it
    * check out the [slides on templating](../slides/09/templating.html) for help on variables, looping and conditionals in templates
    * otherwise, only display the form
* the finished feature should look something like this

![paths](../resources/img/hw04-dicey-02-url.gif)

	
### Submitting the Form

Now... for the moment of truth!

Instead of using the url string to pass in parameters, you can try using the form that you created to submit parameters instead!

1. test the form by entering a number and a "glue"
2. submit the form and see that a passphrase is generated
3. __and__ that query string values are appended to the url

Troubleshooting

1. check that the `name` attributes of your form elements are the same as the properties that you access on `req.query`; they should be:
    * `numWords`
    * `glue`
2. check that your form's method is `GET` 
3. try logging out the variables that you pass to your template; if your template is receiving variables, but no data is being displayed, then there is an issue in how those variables are accessed in the form

The resulting interaction should look like this (__notice that the query string parameters are added to the url on form submission__):


![paths](../resources/img/hw04-dicey-03-form.gif)


## Part 3 - Foodz

Foodz is a meal recommendation site where users can post the name, description and category (breakfast, lunch, dinner or anytime) of a meal as well as view and filter (by category) recommendations. It will use a simple memory-based store (that is, a global `Array` or `Object`) to persist data.

This will be similar to the previous parts, but there will be two forms on a single page, one `GET` and one `POST`. Consequently, there's only one path served for the app: `/`. However, because there are multiple forms, there will be more than one route handler.

### Static Files and Templating Again 

First, lets make sure we can serve up static content, like css and images.

* create the following directory structure in your `src/foodz` directory
	* <code>public</code>
	* <code>public/css</code>
	* <code>public/img</code> (optional)
* add a blank css file in <code>public/css/base.css</code>
* create a basic express application called <code>foodz.js</code>; you don't have to define any routes yet...
* just add the appropriate requires and middleware to enable static file serving:
	* check out the [slides on serving static files with Express](../slides/08/express.html#/29)
* test that both the css files and image work
	* for example, try to curl <code>http://localhost:8080/css/base.css</code>
	* or go that url in your browser
* set up handlebars - [these slides](../slides/09/templating.html#/) may help
	* create the appropriate views/templates and layout in `src/foodz`
		* <code>views</code>
		* <code>views/layout.hbs</code>
* in your <code>views/layout.hbs</code>, drop in the surrounding html that will go on every page (well, there's only one page, but you get the idea!)
	* don't forget <code>body</code>, surrounded by triple curly braces!
* create a template for the single homepage (call this whatever you want... just make sure you can pull it up later), add an <code>h1</code> header with the title of the site
* create the appropriate route so that a <code>GET</code> request pulls up the page
* add some css to change the font family, margins, etc. (__style at youyour discretion__)
* test your page


### Creating Forms

You'll need two forms for this site: one to filter the meal recommendations, the other to add a meal recommendation

For a quick refresher on forms, check out:

* [these slides](../slides/10/forms.html)
* [the form element documentation on mdn](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Forms/How_to_structure_an_HTML_form#The_<form>_element), and a [lengthy article on using forms](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Forms/My_first_HTML_form)

1. create a `GET` form that has a blank `action` (so that submissions request the same path); this is the __filter form__:
    * use radio buttons to allow the user to choose which category to filter by
    * __name the radio buttons `filterCategory`__
    * the values of the radio buttons should be `breakfast`, `lunch`, `dinner`, and `anytime`
    * create a submit button
2. create a `POST` form that has a blank `action` (so that submissions request the same path); this is the __add form__:
    * __create 2 text input fields with `name` attributes, `name` and `description`, respectively__
    * __a set of radio buttons, each with `name`ed `category`__ ... 
    * the values of the radio buttons should be `breakfast`, `lunch`, `dinner`, and `anytime`
3. test that you can see the forms


### Seeding Some Content

Now for some actual content. Our site will display meal recommendations, but it would be nice to start out with some initial data.

__Bootstrap the list of meals with initial data.__

* store all of the meal data in a global variable
* (This isn't really good practice, but we'll have to store the data _somewhere_ for now!)
* you can choose whatever data structure that you want to store a collection of recommended meals (for example, an `Array` of objects) 
* remember that every meal has a `name`, `description`, and `category`
* your application should start off with:
    * name: "chocoramen", 
        * description: "ramen noodles in a chocolate almond milk broth"
        * category: "breakfast"
    * name: "lycheezy"
        * description: "cheese pizza with lychee on top"
        * category: "anytime"
    * name: "crazy cookie"
        * description: "a 1 foot diameter cookie"
        * category: "dinner"


__Add data to your template__

* send your list of recommended meals to your template's context in the call to `render`
* display each meal between the filter and add forms

__Test your page.__

Here's what the page should look like after going to `/`:

![paths](../resources/img/hw04-foodz-01-paths.gif)


### Filter Meal Recommendations Form

In your `get` route, filter the objects passed to render by using the values passed through the filter form (these will be in `req.query`). 

* in your route handler for <code>GET</code> requests on <code>/</code>...
* double check the template - make sure that your __filter / GET__ form has:
    * __radio buttons, each with a `name` of `filterCategory`__
    * the values of the radio buttons should be `breakfast`, `lunch`, `dinner`, and `anytime`
    * a submit button
    * the form's method should be <code>GET</code>
    * the action should be empty string (which means it just goes back to <code>"/"</code>) 
* use the values from the query string that results in submitting the form by accessing `req.query`
* these values should be used to filter the meals that are displayed to the user

The interaction should look like this:

![filter](../resources/img/hw04-foodz-02-filter.gif)

### Create a Meal Recommendation Form

The create form requires a POST (since we're dealing with adding data). [Read the slides on POST forms](../slides/10/forms.html#/7). To do this...

* require the <code>body-parser</code> middleware and use it; this will allow you to access the content of a request's body
    * `const bodyParser = require('body-parser');`
    * `app.use(bodyParser.urlencoded({extended: false}));`
* in your route handler for <code>GET</code> requests on <code>/</code>...
* double check the template - make sure that your __second form, the POST form to create meal recommendations__  has:
    * two text inputs, one with `name` of `name` and the other with a `name` of description
    * __radio buttons, each with a `name` of `category`__
    * the values of the radio buttons should be `breakfast`, `lunch`, `dinner`, and `anytime`
    * a submit button
    * the form's method should be <code>POST</code>
    * the action should be empty string (which means it send a POST request to the current path, <code>"/"</code>) 
* to handle the resulting POST request, new `route` that accepts posts
	* in your callback function for this route...
	* use the data in `req.body` to create a new meal recommendation
	* ...after that, redirect back to <code>/</code> with a <code>GET</code> request
* the interaction on Chrome's web developer tools' networking tab should look something like this:
    1. <code>GET / </code> to display the form initially
    2. `POST` the form
    3. `GET` the original form again
* (2 and 3 happen right after you press the submit button). The entire interaction should look like this:

![add](../resources/img/hw04-foodz-03-add.gif)


{% comment %}

### (6 points) Middleware and Logging

First, get some logging together so that you can troubleshoot. Log out the request that you receive, including the request's body.

* require the <code>body-parser</code> middleware and use it; this will allow you to access the content of the request's body
* set up some logging using your own middleware function; it should include
	* the request method and path
	* followed by the contents of the request body
* maintain a list of birds (can be a global variable, you can use whatever data structure you want)


### (12 points) Bird Form

__Once it's working, create a form...__

## Part 5 - Settings Page, Filtering With GET


This feature will allow users to filter the birds on the homepage based on number of sightings. For example, if the threshold is set to 4, only birds that have been sighted 4 times or more will show up on the list. 

1. Modify your list (`/birds`) route so that it only displays birds that have been sighted for a minimum number of times __if it receives the value, `minBirds` in the query string__. 
    * create a new list based off of the query string parameter as the threshold (you can just loop or use a higher order function if your birds are in a list)
    * pass this to your list template for <code>/birds</code> rather than the unfiltered version
2. Add logging so that the query string object is shown in the console


### (12 points) The Settings Page

__Create a form to set the minumum value.__


<div markdown="block" class="img">
![settings](../resources/img/hw4-settings.png)
</div>

__The log should look something like this:__

<code>GET</code> the settings page.
<pre><code data-trim contenteditable>
GET /settings
=====
req.body: {}
req.query.minVal: undefined
</code></pre>

<code>GET</code> the list page to show the filtered results
<pre><code data-trim contenteditable>
GET /birds
=====
req.body: {}
req.query.minVal: 2
</code></pre>

Everything together may look like this:

<div markdown="block" class="img">
![the busy foodz](../resources/img/hw4-the-busy-foodz.gif)
</div>
{% endcomment %}

</div>

</div>

