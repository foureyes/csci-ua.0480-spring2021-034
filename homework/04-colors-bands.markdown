---
layout: homework
title: CSCI-UA.0480 - Homework #4
---

<div class="panel panel-default">
	<div class="panel-heading">Homework #4</div>
	<div class="panel-body" markdown="block">


## Homework #4 - Due Thursday, October 12th at 11pm

### Express - Static Files, Forms, and Templating

### Overview

#### Description

Create two small sites:

1. A site called __#HEXcuse Me!__ that generates a color palette
2. A band recommendation site called __Bandz__

You'll explore the following concepts along the way:

* Serving static files
* Templating
* Handling forms
* GET and POST requests
    * req.query 
    * req.body

For __#HEXcuse Me!__, you'll be creating 3 paths:

* `/`: the root path, redirects to `/colors`
* `/colors`: a page with a form that accepts initial `Red`, `Green`, `Blue` (RGB) values, renders this color, and further generates multiple random shades. The number of shades to generate is specified in the `Total` field. You will only generate shades if the `Total` lies between 3 & 7.
* `/about`: an info page about the `colors` website

For __Bandz__, you'll be creating a page with two form submissions

* `/`: 
  * A form which lets you add a new band to the list
  * A form which lets you filter the bands list on `genre`

#### Submission Process

You will be given access to a private GitHub repository containing:

* stub source files in the src directory
* .eslintrc

__Push__ your changes to the homework GitHub repository. __Repositories will be closed after the grading.__

#### (4 points) Make at Least 4 Commits

* Commit multiple times throughout your development process
* Make at least 4 separate commits - (for example, one option may be to make one commit per part in the homework)

### Part 1 - Setup

Because we're creating two express apps in a single repository, the directory layout will be a little different from what we've seen before. Both projects will share the same `package.json`, `node_modules`, `.gitignore` and `.eslintrc`, but they'll each have their own `public` and `views` folders within their own directory in `src`. When you're __done with all of the directions__, you should have a folder structure that looks similar to this:

* `/` (project root)
    * `package.json`
    * `node_modules`
    * `.gitignore`
    * `.eslintrc`
    * `/src`
        * `/colors`
            * `colors.js`
            * `public`
                * `img` (optional)
                * `css`
            * `views`
                * `layout.hbs`
        * `/bandz`
            * `bandz.js`
            * `public`
                * `img` (optional)
                * `css`
            * `views`
                * `layout.hbs`

#### (2 points) Installing Dependencies

* create a `package.json` (you can use `npm init` to do this) in the root directory of your project
* __install__ the following __dependencies__ (make sure you use the `--save` option):
  * `express`
  * `hbs`
  * `body-parser` (this is used for `bandz` only)

#### (2 points) .gitignore

* create a `.gitignore` file in the root directory of your project
* ignore the following files:
  * `node_modules`
  * any other files that are not part of your project... for example:
    * `.DS_Store` (if you're on OSX)
    * `*.swp` (if you're using vim)

### Part 2 - #HEXcuse Me!

In `/src/colors/colors.js`, you'll create an Express application that generates a color palette based on values (red, green, and blue... how the number of colors to generate) entered by the user. The color palette displayed should have the color's name (if available), their red, green and blue values, and their hex code.

Check out the [short section on Hex triplets](https://en.wikipedia.org/wiki/Web_colors#Hex_triplet) to read more about how colors are represented in HTML and CSS. 

Your application will be converting from decimal values of red, green and blue to hexadecimal: 

1. it will do this by reading in a text file that contains color names before the server starts accepting connections
2. ...and using the red, green and blue values entered by the user to:
    * generate a hex code and name for that color
    * generate additional colors based on the original color entered
3. lastly, it display the resulting colors on the page

{% comment %}
You will also read a file called `colors.txt`, which has 148 csv entries containing the color names with their corresponding hex values. Each color will be rendered with a text overlay detailing the RGB value of the color, its hex value conversion, and its name if it exists in the `colors.txt` file.

The application handles colors and generates new ones by:
Hint: Read the `colors.txt` __before__ your call `.listen` (that is, only listen after you _know_ the file has been read)
1. will specify the `Total` number of shades to generate in the form
2. The first shade will be rendered by the RGB values you specify in the form
3. For each other shade, generate random values between (0, 255) for Red, Green & Blue. For the combined RGB value that you just generated, you will also need to find its corresponding hex value by writing a conversion function 
4. Furthermore, you should also check if the hex value you generated exists in the `colors.txt` file. If it does, fetch the name for the hex value
5. The `colors.txt` file should be read at the very beginning. The contents of the file should be stored in a data structure which makes it easy to look up values by a given key
{% endcomment %}

#### Static Files, Basic Routes, Templating

Start off by creating a basic express application runnable through `src/colors/colors.js`. See the [slides on Express](../slides/08/express.html) for a refresher on how to do this. Then:

* when you start writing your express application, __make sure you serve your application on port 3000__
* use handlebars for templating
    * see [the slides on templating](../slides/09/templating.html#/)
* set hbs as the default view engine
* create the appropriate directory structure and templates:  
  * `src/colors/views` to hold templates
  * `src/colors/views/layout.hbs` for "common" markup
  * two other `hbs` files (use any name) for the markup in `/` and `about`
* create the following directory structure in `src/colors` 
  * `public`
  * `public/css`
  * `public/img` (optional)
* add a css file in `public/css/base.css`
* add the appropriate requires and middleware to enable static file serving; see the [slides on serving static files with Express](../slides/08/express.html#/29)
* test that the css file works
  * for example, try to curl `http://localhost:3000/css/base.css`
  * or go that url in your browser
* pull in your `base.css` stylesheet in your `layout.hbs` with a `link` tag
* in `views/layout.hbs`, drop in the surrounding html that will go on every page
    * add an `h1` element with the title of the site
    * add a navigation links to `/colors` and `/about`
  * don't forget `body`, surrounded by triple curly braces!
* modify `colors.js` to accept the following routes:
    * `/` - redirects to `/colors` 
    * `/about` - a page describing the site (any content can be placed here)
    * `/colors` - a page that displays generated color shades
* create `hbs` files in `views` for `about` and `colors` (__name these templates yourself__) 
* `/` - redirect to `/colors` 
* `/about` - should contain text describing the site (__can be any text you want__)
* `/colors` - should contain a form that `GET`s itself (`method` is `GET`, `action` can be left blank to specify that submitting the form will `GET` the current url, `/colors`) ..  that allows the following input:
    * ([skim through the slides on forms](../slides/10/forms.html) or [or read the form element documentation on mdn](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Forms/How_to_structure_an_HTML_form#The_<form>_element) along with this [lengthy article on using forms](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Forms/My_first_HTML_form))
    * Red value (integer between 0 & 255)
    * Green value (integer between 0 & 255)
    * Blue value (integer between 0 & 255)
    * Total number of shades (integer between 2 & 10)
    * a button for submitting the form
* modify your `base.css` file to style the above pages - __style at your discretion, as long as _some_ styling is present, it's ok!__
* the image below shows what the resulting pages should look like for `/`, `/colors`, and `/about` (again, styling is up to you, it does not have to look like the image below, but it should be styled enough so that it's obvious that static files are working and the style sheet is being included in your html)

![paths](../resources/img/hw04-colors-01-paths.gif)

### Handling GET Query String Data

In this part, you'll create a color class, read in a file of color names and hex codes... and work on data from the url's query string.

* define a `Color` constructor or class in a separate module called `colorlib.js` and export it
    * this can be created using functions and prototypes or you can use ES6 classes
    * __you must include `r`, `g`, and `b` as properties of the "color" objects__ that your `Color` constructor or class creates
    * aside from the requirement above, you can design your class any way you like 
        * you can look up any other features of ES6 classes that we did not use yet (such as `static` properties and methods, calculated properties, etc.)
        * [see our book for more details on classes](http://exploringjs.com/es6/ch_classes.html)
* also... read in the file, `colors.txt` that's in the `data` folder of your project; this contains the mappings from hex codes to color names
    * you can use any way you like to read this file (including the synchronous version - see [the fs module docs](https://nodejs.org/api/fs.html) to find some options)
    * if you use the async version, just make sure that `app.listen(3000)` is the last thing that is executed (it can simply be executed in the callback)
    * in either case, only read the file once when the server starts (do not read the file on each request)
    * each line in the file `colors.txt` has a csv entry with color name and its corresponding hex values
    * store the hex value/name combinations so that a name can be easily looked up by the hex value (use any data structure you like to do this)
* check out the [slides on GET](../slides/10/review-get.html) before proceeding
* in the route handler for `/colors`, accept __query string data__ ...
* modify your route for `/colors` so that you can append the following query string variables when requesting the path:
    * `red`
    * `green`
    * `blue`
    * `total`
    * for example, you can enter this into your browser: `http://localhost:3000/colors?red=33&green=44&blue=55&total=6`
    * ... and the server will be able to access that data
* [access these query string parameters on the server side (within your express app) from `req.query`](https://expressjs.com/en/api.html#req.query)
* use the values in `req.query` to render the original color
* use `req.query.total` to generate `total` number of shades
* for each other color, generate additional colors
    * you can use any strategy to generate additional colors
    * the images of the reference implementation show that:
        * one color is the inverse of the original color
        * then... all of the others are colors that have some random value subtracted from some combination of red, green, and blue for either the original or inverted color
    * the method above is just one way to generate a series of random colors; again, it's your discretion to create / pick a strategy on your own
* additionally, you must find a way to converts the numeric values of individual color components (red, green, and blue) to their hex value equivalent
* make sure that the case (upper/lower) of your hex value alphabet matches the one stored in your data structure for look up
* you should also check if the hex value you generated exists in the data structure for `colors.txt`; if it does, fetch the name for the hex value
* __all of the values generated, the hex value and, the associated name__ should be sent over to your template in your `render` call (for example, you can add an `Array` of `Color` objects with red, green, and blue values... and names... to your context object)
* check out the [slides on templating](../slides/09/templating.html) for help on variables, looping and conditionals in templates
* render the color on the page by:
    * creating an element for each color (this could be anything you want: a `li`, `div`, `p`, etc.)
    * using the resulting hex code as in inline style for that element
    * for example - you can set the background color of an element by doing this:
        * `<div style="background-color{{color.hex}}>..."`
        * where `color.hex` is the hex value
        * (this should be the only inline styles in your page)
    * additionally, add the following text to each color:
        * the name of the color (if it exists)
        * the _actual_ hex code for the color
        * the decimal version of the red, green, and blue values of the color
* handle invalid data:
    * if the user enters...
        * a number less than 2 or more than 10
        * or if one of the values for red, green, or blue do not fall within 0 - 255 inclusive...
    * do not render any colors but instead display the message: 
        * `Hey, "Red", "Green", and "Blue" should be from 0 through 255, and the "How Many?" should be between 2 and 10!`

See the image below for an example of manipulating the query string to generate colors... as well as an example of an error message

![urls](../resources/img/hw04-colors-02-url.gif)

#### Submitting the Form

Now... for the moment of truth!

Instead of using the url string to pass in parameters, you can try using the form that you created to submit parameters instead!

1. test the form by entering the values
2. submit the form and see that shades are generated and rendered
3. __and__ that query string values are appended to the url

#### Troubleshooting

1. check that the `red`, `green` etc attributes of your form elements are the same as the properties that you access on `req.query`; they should be:
    * `red`
    * `green`
    * `blue`
    * `total`
2. check that your form's method is `GET` 
3. try logging out the variables that you pass to your template; if your template is receiving variables, but no data is being displayed, then there is an issue in how those variables are accessed in the form

The resulting interaction should look like this (__notice that the query string parameters are added to the url on form submission__):

![form](../resources/img/hw04-colors-03-form.gif)

### Part 3 - AITunes

__AITunes__ is a music recommendation site where you can post the name, genre, location and description of a band as well as view and filter (by genre) recommendations. It will use a simple memory-based store (that is, a global `Array` or `Object`) to persist data.

This will be similar to the previous parts, but there will be two forms on a single page, one `GET` and one `POST`. Consequently, there's only one path served for the app: `/`. However, because there are multiple forms, there will be more than one route handler.

#### Static Files and Templating Again 

First, let's make sure we can serve up static content, like css and images.

* create the following directory structure in your `src/bandz` directory
  * `public`
  * `public/css`
  * `public/img` (optional)
* add a blank css file in `public/css/base.css`
* create a basic express application called `bandz.js`; you don't have to define any routes yet...
* __make sure you serve your application on port 3000__
* just add the appropriate requires and middleware to enable static file serving:
  * check out the [slides on serving static files with Express](../slides/08/express.html#/29)
* test that both the css files and image work
  * for example, try to curl `http://localhost:3000/css/base.css`
  * or go that url in your browser
* set up handlebars - [these slides](../slides/09/templating.html#/) may help
  * create the appropriate views/templates and layout in `src/foodz`
    * `views`
    * `views/layout.hbs`
* in your `views/layout.hbs`, drop in the surrounding html that will go on every page (well, there's only one page, but you get the idea!)
  * don't forget `body`, surrounded by triple curly braces!
* create a template for the single homepage (call this whatever you want... just make sure you can pull it up later), add an `h1` header with the title of the site
* create the appropriate route so that a `GET` request pulls up the page
* add some css to change the font family, margins, etc. (__style at your own discretion__)
* test your page


#### Creating Forms

You'll need two forms for this site: one to filter the band recommendations, the other to add a band recommendation

For a quick refresher on forms, check out:

* [these slides](../slides/10/forms.html)
* [the form element documentation on mdn](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Forms/How_to_structure_an_HTML_form#The_<form>_element), and a [lengthy article on using forms](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Forms/My_first_HTML_form)


1. create a `GET` form that has a blank `action` (so that submissions request the same path); this is the __filter form__:
    * use radio buttons to allow the user to choose which category to filter by
    * __name the radio buttons `filterGenre`__
    * the values of the radio buttons should be `rock`, `pop`, `hip-hop`, `electronic`, `metal`, and `jazz`
    * create a submit button
2. create a `POST` form that has a blank `action` (so that submissions request the same path); this is the __add form__:
    * __create 2 text input fields with the attributes: `name` ,  `location` and `description`, respectively__
    * __a set of radio buttons, each with `name`ed `genre`__ ... 
    * the values of the radio buttons should be `rock`, `pop`, `hip-hop`, `electronic`, `metal`, and `jazz`
3. test that you can see the forms

#### Seeding Some Content

Now for some actual content. Our site will display band recommendations, but it would be nice to start out with some initial data.

##### Bootstrap the list of bands with initial data

* store all of the bands in a global variable
* (This isn't really good practice, but we'll have to store the data _somewhere_ for now!)
* you can choose whatever data structure that you want to store a collection of recommended bands (for example, an `Array` of objects) 
* remember that every band has a `name` , `genre`,  `location` and `description`
* for example, you could have an `Array` of objects, with one of the objects having the following property name and value pairs:
    * "name": "Nsync",
    * "genre": "Pop",
    * "location": "Orlando, FL",
    * "description": "Justin Timerlake began here"
* __start off with any 3 bands you like__


##### Add data to your template

* send your list of recommended bands to your template's context in the call to `render`
* display each band between the filter and add forms

##### Test your page

Here's what the page should look like after going to `/`:


#### Filter Band Recommendations Form

In your `get` route, filter the objects passed to render by using the values passed through the filter form (these will be in `req.query`). 

* in your route handler for `GET` requests on `/`...
* double check the template - make sure that your __filter / GET__ form has:
    * __radio buttons, each with a `name` of `filterGenre`__
    * the values of the radio buttons should be `rock`, `pop`, `metal`, and `jazz`
    * a submit button
    * the form's method should be `GET`
    * the action should be empty string (which means it just goes back to `"/"`) 
* use the values from the query string that results in submitting the form by accessing `req.query`
* these values should be used to filter the band that are displayed to the user

The interaction should look like this:

![filter](../resources/img/hw04-bandz-01-filter.gif)

#### Create a Band Recommendation Form

The create form requires a POST (since we're dealing with adding data). [Read the slides on POST forms](../slides/10/forms.html#/7). To do this...

* require the `body-parser` middleware and use it; this will allow you to access the content of a request's body
    * `const bodyParser = require('body-parser');`
    * `app.use(bodyParser.urlencoded({extended: false}));`
* in your route handler for `GET` requests on `/`...
* double check the template - make sure that your __second form, the POST form to create band recommendations__  has:
    * three text inputs, one with `name` of `name`, one with `name` of `location`, and one with `name` of `description`
    * __radio buttons, each with a `name` of `genre`__
    * the values of the radio buttons should be `rock`, `pop`, `metal`, and `jazz`
    * a submit button
    * the form's method should be `POST`
    * the action should be empty string (which means it send a POST request to the current path, `"/"`) 
* to handle the resulting POST request, new `route` that accepts posts
  * in your callback function for this route...
  * use the data in `req.body` to create a new band recommendation
  *  ...after that, redirect back to `/` with a `GET` request
* the interaction on Chrome's web developer tools' networking tab should look something like this:
    1. `GET / ` to display the form initially
    2. `POST` the form
    3. `GET` the original form again
* (2 and 3 happen right after you press the submit button). 

The entire interaction should look like this:

![add](../resources/img/hw04-bandz-02-add.gif)

</div>

</div>

