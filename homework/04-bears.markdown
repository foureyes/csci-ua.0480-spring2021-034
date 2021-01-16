---
layout: homework
title: CSCI-UA.0480 - Homework 4
---

<style>
h1.warning {
	background-color: #eaa;
}
</style>

<div class="panel panel-default">
	<div class="panel-heading">Homework #4</div>
	<div class="panel-body" markdown="block">

# bears.ai Due 10/17 at 11pm


## Overview


### Description

You've just had the most brilliant idea. An AI that distinguishes between dangerous and non-dangerous bears! You don't want your kids confusing teddy bears with brown bears, do you?

You go to a Venture Capital Fund with this idea and they say they are ready to invest $100 million because the baby-bear problem is getting out of hand! But they ask you where are you getting the data for the AI from?

This is our first step towards that $100 million! We want to create a site that aggregates and searches for different types of bears! In this homework you'll be working with:

* serving static files
* middleware
* handling and creating forms: GET and POST
* storing and managing data in-memory

__For extra credit__: We will also be working with

* file uploads
* file writing

You'll be creating 3 pages:

* __home__ - <code>/</code>: home page that displays all of the bears submitted on the site. This is what we'll show those VC folks!
* __search__ - <code>/search</code>: search page which lets all the bears be searched by label that is given to a bear, a minimum weight (greater than or equal to) of the bear.
* __add__ - <code>/add</code>: a page that allows a user to submit a new bear image with a label and weight. 

Your directory layout should look something like the following __once you're done with the assignment__:

<pre><code data-trim contenteditable>
├── app.js
├── labeled_bears
│   ├── b1.json
│   ├── b2.json
│   └── b3.json
├── package-lock.json
├── package.json
├── public
│   ├── css
│   │   └── main.css
│   └── img
│       └── header.png
│       └── bears
│       	└── blackbear1.jpg
│       	└── brownbear.jpg
│       	└── teddy1.png
├── bears.js
└── views
    ├── add.hbs
    └── home.hbs
    └── search.hbs
    └── layout.hbs
</code></pre>

### Example Interaction

<!-- TODO -->
![example interaction](../resources/img/hw04_bears/hw04_bears_example_interaction.gif)

### Submission Process

1. You will be given access to a private repository on GitHub
2. The final version of your assignment should be in GitHub
3. __Push__ your changes to the homework repository on GitHub by the due date.

###  Make at Least 4 Commits

* Commit multiple times throughout your development process.
* Make at least 4 separate commits

## Part 1 - Setup

###  Installing Dependencies

* create a <code>package.json</code> (a `package-lock.json` should be created for you as well once you start installing modules)
* __install__ the following __dependencies__ (make sure you use the <code>--save</code> option):
	* <code>express</code>
	* <code>hbs</code>
	* <code>multer</code>

###  .gitignore

* create a <code>.gitignore</code>
* ignore the following files:
	* <code>node_modules</code>
	* any other files that aren't relevant to the project... for example
        * <code>.DS_Store</code> if you're on OSX
        * etc.

### linting

* an eslint configuration file (for example `.eslintrc.json`) should be in the root directory (or copy one from a previous project if it doesn't exist)
* make sure that any linting tools are installed (`eslint`)
* periodically lint your program as you work
* minor deductions (0.5 to 1 point) will be taken off for each __class__ of error, w/ a maximum of 3 to 5 points total


## Part 2 - Homepage and Static Files

###  Enabling Static Files

First, we would like to make sure that we can serve static content on our site - like css and images. So let's get started.

* create the following directory / folder structure in your project's root directory
	* <code>public</code>
	* <code>public/css</code>
	* <code>public/img</code>
* add a blank css file in <code>public/css/main.css</code>
* add an image that has something to do with bears in <code>public/img/header.png</code>
* create a basic express skeleton application in <code>app.js</code>
	* make sure that your application is __served over port 4000__
	* __after calling `app.listen(4000)`__
		* print out "Server started; type CTRL+C to shut down " to the console (the terminal window)
		* this will give you feedback that your server has started correctly 
* just add the appropriate requires (express, path, etc.) and middleware to enable static file serving:
	* refer to class slides for reminders / snippets on how to do this
* test that both the css files and image work
	* for example, try to go to <code>http://localhost:3000/img/header.png</code> in your browser
	* -> your image should be displayed in browser


###  Creating a Home Page

Now that we can serve static files including our css file to make pages pretty, lets create a 'main' homepage for our site that will display all the bears.

* for the home page, your app should accept <code>GET</code> requests on the path, <code>/</code>
* we will be using handlebars as our templating engine, so do the required steps to set that up
	* get all the requirements and config setup
	* create the appropriate views folder, along with an initial layout file:
		* <code>views</code>
        * <code>views/layout.hbs</code>
* in your <code>layout.hbs</code>, add the html
* recall that this surrounding html will go on every page
	* add a reference to include your <code>main.css</code> stylesheet (so that each other <code>.hbs</code> page has it too)
	* include a header containing both your <code>header.png</code> image and the title of your site, __bears.ai__
    * additionally, add a 'nav bar' consisting of two links that will let you navigate across the 2 pages in your site:
	    * a link to the home / main page that is a list of all bears (<code> / </code>) - root url
	    * a link to __a page that lets us search for bears__  (<code> /search </code>)
	    * a link to __a page that lets us add a new bear__  (<code> /add </code>)
	* Important! - don't forget <code>body</code>, surrounded by triple curly braces, or else other templates are not going to get rendered
* now that you have the layout, add your home page template (it's up to you how you call it)
    * add an <code>h2</code> element that says `My Bears` to this template
    * you will add more html and templating to this file later
* set up a route and a <code> render </code> call so that going to the root url via a <code>GET</code> request shows the rendered template
* add some css to change the styles on the page. Some examples / inspiration (you can totally show your creativity here):
    * change the font
    * change the background color
    * change the font color
    * add padding, center alignment
    * etc.


Here's an example of what the page could look like (you don't have to use the same exact styles, but add enough styles so that you can see that the style sheet is correctly served and applied to the html):

![styled homepage](../resources/img/hw04_bears/hw04_basic.png)

If you add stuff to your css file but no styles change, check the console for errors and the html in <code> layout.hbs </code> to make sure the path to the css file is correct.

## Part 3 - Middleware and Logging

In order to help us debug our code on backend during development, let's set up some initial logging in form of middleware. We want to log __for each request__:

* The method (GET, POST)
* The route
* The query string

First, activate the body parsing middleware (`express.urlencoded`) by passing it to `app.use`; this will allow you to access the content of the request's body.

Additionally, create a custom middleware function and <code>app.use</code> it in <code>app.js</code>. Hint: don't forget to call <code>next()</code>, also to print objects, you'll need JSON.stringify.

Again, this function __has to__ print

* the request's __method__,  __path__, and request's __query string__
* Example:
    * Method: GET 
    * Path: /
    * {}
	
## Part 4 - Displaying the bears

So far our homepage is very boring and doesn't show anything, so lets make it display some bears. 

We will store the data in-memory, and display bears in a list format. Each bear has 3 components: 

1. the image URL
2. the label (type of bear)
3. the weight of the bear (in lbs.)

### Bear Class

In `bears.js`, create a class that represents a bear. Your class should behave as follows:

```
// the constructor accepts:
// the image URL
// the label
// the weight of the bear
const bear = new Bear(
  'http://www.bearconservation.org.uk/wp-content/uploads/2017/08/Kodiak_brown_bear_FWS_18383.jpg', 
  'brown bear',
  2
)

// the constructor results in an object with the following properties / methods:
console.log(b.imagePath);  // http://www.bearconservation.org.uk/wp-content/uploads/2017/08/Kodiak_brown_bear_FWS_18383.jpg
console.log(b.label);  // brown bear
console.log(b.weight);  // 450
```

⚠️ Export the class you make... and bring it into `app.js` so that your web app can create `Bear` instances!

### Initial data

The initial data for the site should be stored as an `Array` of `Bear` instances. This can simply be a global variable in your `app.js` file.

The `Bear` instances should be created by reading the files located in the `labeled_bears` directory. There are 3 files initially, but your code should be able to read any number of files in the directory. Do this by using `fs.readdir` (see [the docs](https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback)) and `fs.readFile`. ⚠️ __Do not use the synchronous (the ones that end in "sync") version of these functions!__ (we're doing this to practice callbacks and handling async operations...).  

The format of each file in `labeled_bears` is as follows:

* It is a JSON file with three key-value pairs - `imagePath`, `label`, `weight`.
* There can be other (junk) files in this directory. You are only supposed to read the JSON files.
   
The general requirements for this part are:

* list out all of the files in the directory, `labeled_bears`, that end in `.json`
* read the code from each file and create `Bear` objects
* save the bear objects in a global variable
* once everything is read, print out the global variable of bears:

```
[ Bear { imagePath: 'http://www.bearconservation.org.uk/wp-content/uploads/2017/08/Kodiak_brown_bear_FWS_18383.jpg', label: 'teddy bear', weight: '3' },
  Bear {
    imagePath: 'http://www.bearconservation.org.uk/wp-content/uploads/2017/08/Kodiak_brown_bear_FWS_18383.jpg',
    label: 'black bear',
    weight: '150' }
]
```

* modify `app.js` so that `listen` is called and the "Server started" message is printed __after__ all of the files are read
	* this is tricky because of the async nature of reading the directory and reading each file
	* you'll have to create one or more functions
	* one of these functions will have a callback (the callback should essentially call `listen` and print out the server started message)
	* the solution will involve recursion
	* recursion should stop once all of the file names in the directory are exhausted
	* use `__dirname` where possible to create absolute paths so that the application is more _portable_
	* if you're unable to get the ordering right in a few tries, move on to the next part and come back to this
	* once working, add all these files to `bears.js` and export them to be used by `app.js`

  
### Page to display the data

* pass in your bear data (in an array) to the <code> render </code> call in the route handler for the homepage so that our template has access to it
* add html to display the bear data in an organized way
    * HINT: can iterate through the list of bears using the <code>#each</code> helper
    * HINT: can put each bear & it's data (label, weight) in a list item (<code>li</code>)
    * Make sure the image is displayed directly from the URL (using the `<img src>` tag)

__Reload and visually check.__

* Page should display the 3 initial bears along with their data in a list-like way
* Styling does not have to be exact, just as long as you can differentiate the actual bear image, it's label, and the weight for each.

![display initial data](../resources/img/hw04_bears/hw04_initial.png)

## Part 5 - Search bears

Now that we have our data being displayed on the home/main page, let's add functionality to search for bears based on their label and a minimum weight. The server will only return bears that match __all__ of the search criteria (essentially `and`). If a search criteria is blank (empty string), do not include it as a feature to search on.

* __In a new__ template, add a form to search for bears. 
	* add attributes to the form tag so that...
	* submitting the form makes a request to the same path that the form page is on
	* the form uses the appropriate HTTP request method for the functionality of this form (it should be `GET` since it's just reading data!)
* The form should have 2 `input` elements for entering form data, each with a `name` attribute:
	* `labelQ` (the label)
	* `weightQ` (the minimum weight)
* Remember that the name of each input element shows up somewhere in the HTTP request and ... in properties of the express application's request object.
    
__Now, onto the server side:__

Add a route handler for the search page (e.g. <code>/search</code>) to __only__ select bears that match __all__ of the search and send it to the <code>render</code> call

* if searching based on label - return only those bear labels that (this is important) __contain__ the text from the form input
* if searching based on count of lines - return only those bears that have a weight greater than or equal to the value submitted
* NOTE: Some of the higher order functions we used in Homework 2 will be useful here!
    
__Important:__

⚠️ If all of the text fields are blank display all of the bears (essentially re-setting the search)

And your console should look something like this (for the case where label and weight are specified):

```
Method: GET 
Path: /search 
Query: {"labelQ":"brown","weightQ":"100"}
```
<br/>
<br/>

As you can see, the values of the query string change based on which form we submit. You can even manually manipulate the query string in the URL bar of your browser. Nice!

## Part 6 - Adding a new bear

### Form

We now have made our site display bears from the in-memory store, and we can search for bears based on the label, the minimum weight (greater than or equal to) that the bears have. Nice! 

What's missing is the ability to add our own custom bears and have it show up in the list along with the others. Let's implement this feature.

* create a new route handler in __app.js__ for <code>/add</code>
* create a new handlebars template and add a call to <code>render</code> inside of the new route handler that renders the new template
    * add a form to the template with 3 <code>inputs</code> and a submit button - this is how we'll add a bear
    * All three are text fields which accepts the Image URL, Label and the Weight
    * __Extra credit__: two of these are text fields and one is a file type which will be used to upload images!
* __the form's method should be a <code>POST</code>__
* the action of the form should be <code>""</code> or <code>/add</code> since we make the request to the same page (/add)
* now that we have a new form making a <code>POST</code> request to a new URL, add a new route handler in __app.js__ to accept <code>POST</code> requests on the URL of <code>/add</code>
* __Extra credit (Image Uploads and file writes)__: We need to handle the file uploads. For this, we will be using an npm library we installed earlier called `multer`.
    * First require the module
    * Next, add the middleware which processes the file. This can be done by `app.use(multer({dest: <yourBearImagePath>}).single('<yourImageUploadTagName>'));`
    * The `bearImagePath` should be some location inside your `public` directory. (Only then we can host the files!)
    * The `yourImageUploadTagName` should be the name of the input tag you gave in the HTML template `add.hbs`
	* inside this handler: 
    	1. if the middleware is working correctly, the uploaded file location can be found in `req.file.destination`
		1. Make sure that the file type of the uploaded file is either `jpg`, `jpeg` or `png`. We don't want viruses! 
    	1. you can check other properties too by printing out the `req` object.
    	2. Once you know where the file is, you'll see that it has some gibberish name. Rename the image to its original image. 
	    3. create a new object for this inputted bear
	    4. add the new object to the global array holding all of the bears. 
	    5. __Important__: We also want to create an entry to our JSON file directory `labeled_bears` so that next time we restart the app, we know where to find the new bears. Use `fs.writeFile` to create a new JSON file with the same format as the other JSON files in the `labeled_bears` directory.
	    6. after modifying the in-memory store, redirect to the home/main page to display the updated list (any previous search criteria can be cleared)


And your console should look something like this (for adding a single new bear in this example). Notice the redirect back to the home/main page (in this case <code>/</code>)

```
Method: GET 
Path: /add
{}
```

```
Method: POST 
Path: /add
{}
```

```
Method: GET 
Path: /
{}
```

If you check out the network tab in the browser, you should see a `POST` (as a result of the submit button push) and another `GET` (as a result of a redirect)...
</div>

### Deliverables

Complete the implementations in `app.js` and `bear.js` which has the display, search and add functionalities.

For extra credit:
* modify the add functionality such that instead of an Image URL, you accept a file upload using multer (details mentioned above). [+5 points]
* make the file upload more robust by dealing with some potential issues such as using hash lib to deal with file name collision for image names, use file-type module to verify file type, etc [+3 points]
* save the uploaded data in a JSON file to the `labeled_bears` directory on upload.  [+1 point]

You need to mention all the things you did for extra credit in a README.md file which should be pushed along with the rest of the repository. If we can't see what you've done for extra credit, we can't give you the points.

</div>
