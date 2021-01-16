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

# Snippets.js

## Overview


### Description

Create a site that aggregates and searches JavaScript code snippets! In this homework you'll be working with:

* serving static files
* middleware
* handling and creating forms: GET and POST
* storing and managing data in-memory

You'll be creating 2 pages:

* __home__ - <code>/</code>: home page that displays all of the JS snippets submitted on the site. Can be searched by text that is in a snippet, a minimum number (greater than or equal to) of lines, and a tag.
* __add__ - <code>/add</code>: a page that allows a user to submit a new code snippet with a name, code, and tags.

Your directory layout should look like the following __once you're done with the assignment__:

<pre><code data-trim contenteditable>
├── app.js
├── code-samples
│   ├── helloWorld.js
│   ├── loopy.js
│   └── sum.js
├── package-lock.json
├── package.json
├── public
│   ├── css
│   │   └── main.css
│   └── img
│       └── js.png
├── snippet.js
└── views
    ├── add.hbs
    └── home.hbs
    └── layout.hbs
</code></pre>

### Example Interaction

<!-- TODO -->
![example interaction](../resources/img/hw04-snippet/01-example.gif)

### Submission Process

1. You will be given access to a private repository on GitHub
2. The final version of your assignment should be in GitHub
3. __Push__ your changes to the homework repository on GitHub by the due date.

###  Make at Least 4 Commits

* Commit multiple times throughout your development process.
* Make at least 3 separate commits - (for example, one option may be to make one commit per part in the homework).

## Part 1 - Setup

###  Installing Dependencies

* create a <code>package.json</code> (a `package-lock.json` should be created for you as well once you start installing modules)
* __install__ the following __dependencies__ (make sure you use the <code>--save</code> option):
	* <code>express</code>
	* <code>hbs</code>

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
* add an image that has something to do with JavaScript in <code>public/img/js.png</code>
* create a basic express skeleton application in <code>app.js</code>
	* make sure that your application is __served over port 3000__
	* __after calling `app.listen(3000)`__
		* print out "Server started; type CTRL+C to shut down " to the console (the terminal window)
		* this will give you feedback that your server has started correctly 
* just add the appropriate requires (express, path, etc.) and middleware to enable static file serving:
	* refer to class slides for reminders / snippets on how to do this
* test that both the css files and image work
	* for example, try to go to <code>http://localhost:3000/img/js.png</code> in your browser
	* -> your image should be displayed in browser


###  Creating a Home Page

Now that we can server static files including our css file to make pages pretty, lets create a 'main' homepage for our site that will display all the snippets.

* for the home page, your app should accept <code>GET</code> requests on the path, <code>/</code>
* we will be using handlebars as our templating engine, so do the required steps to set that up
	* get all the requirements and config setup
	* create the appropriate views folder, along with an initial layout file:
		* <code>views</code>
        * <code>views/layout.hbs</code>
* in your <code>layout.hbs</code>, add the html
* recall that this surrounding html will go on every page
	* add a reference to include your <code>main.css</code> stylesheet (so that each other <code>.hbs</code> page has it too)
	* include a header containing both your <code>js.png</code> image and the title of your site, __Snippets.JS__
    * additionally, add a 'nav bar' consisting of two links that will let you navigate across the 2 pages in your site:
	    * a link to the home / main page that is a list of snippets (<code> / </code>) - root url
	    * a link to __a page that lets us add an new snippet__  (<code> /add </code>)
	* Important! - don't forget <code>body</code>, surrounded by triple curly braces, or else other templates are not going to get rendered
* now that you have the layout, add your home page template (it's up to you how you call it)
    * add an <code>h2</code> element that says My Snippets to this template
    * you will add more html and templating to this file later
* set up a route and a <code> render </code> call so that going to the root url via a <code>GET</code> request shows the rendered template
* add some css to change the styles on the page. Some examples / inspiration:
    * change the font
    * change the background color
    * change the font color
    * add padding, alignment
    * etc.


Here's an example of what the page could look like (you don't have to use the same exact styles, but add enough styles so that you can see that the style sheet is correctly served and applied to the html):

![styled homepage](../resources/img/hw04-snippet/screenshot3.png)

If you add stuff to your css file but no styles change, check the console for errors and the html in <code> layout.hbs </code> to make sure the path to the css file is correct.

## Part 3 - Middleware and Logging

In order to help us debug our code on backend during development, let's set up some initial logging in form of middleware. We want to log __for each request__:

* The method (GET, POST)
* The route
* The query string

First, activate the body parsing middleware (`express.urlencoded`) by passing it to `app.use`; this will allow you to access the content of the request's body.

Additionally, create a custom middleware function and <code>app.use</code> it in <code>app.js</code>. Hint: don't forget to call <code>next()</code>.

Again, this function __has to__ print

* the request's __method__,  __path__, and request's __query string__
* Example:
    * Method: GET 
    * Path: /
    * {}
	
## Part 4 - Displaying JavaScript snippets

So far our homepage is very boring and doesn't show anything, so lets make it display some JavaScript code snippets. 

We will store the data in-memory, and display snippets in a list format. Each snippet has 4 components: 

1. the name (ending in <code>.js</code>!)
2. the code itself
3. the number of lines of code
4. the tags associated with the snippet

### Snippet Class

In `snippet.js`, create a class that represents a snippet of JavaScript code. Your class should behave as follows:

```
// the constructor accepts:
// the file name
// the actual code
// any number of tags, each as a separate argument
const s = new Snippet(
  'hello.js', 
  `const hello = () => {
  console.log('hello');
};
hello();`,
  'hello', 'function', 'arrow'
)

// the constructor results in an object with the following properties / methods:
console.log(s.name);  // hello.js
console.log(s.code);  // the entirety of the code
console.log(s.lines); // 4 (this needs to be calculated!)
console.log(s.tags);  // an Array, ['hello', 'function', 'arrow']
console.log(s.hasTag('fun')); // false
console.log(s.hasTag('function')); // true
```

⚠️ Export the class you make... and bring it into `app.js` so that your web app can create `Snippet` instances!

### Initial data

The initial data for the site should be stored as an `Array` of `Snippet` instances. This can simply be a global variable in your `app.js` file.

The `Snippet` instances should be created by reading the files located in the `code-samples` directory. There are 3 files, but your code should be able to read any number of files in the directory. Do this by using `fs.readdir` (see [the docs](https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback)) and `fs.readFile`. ⚠️ __Do not use the synchronous (the ones that end in "sync") version of these functions!__ (we're doing this to practice callbacks and handling async operations...).  

The format of each code file in `code-samples` is as follows:

* each file will have a single line comment as the very first line
* each file will have unix style line endings: `\n`
	* to avoid hardcoding line endings, attempt to determine which newlines are used
	* for example, you can install and use [the `detect-newline` library](https://www.npmjs.com/package/detect-newline)
	* this should be done per string of code
* this comment contains a comma separated list of tags.
* ⚠️ __the first line containing the comment should not be included as part of the code!__
* (but it should be used to extract individual tags)
* you can assume that every file in the directory is in this format
* (so there's no need to check if the first line is a comment... always remove it and extract tags from it)

The general requirements for this part are:

* list out all of the files in the directory, `code-snippets`, that end in `.js`
* read the code from each file and create `Snippet` objects
* save the snippet objects in a global variable
* once everything is read, print out the global variable of snippets:

```
[
  Snippet {
    name: 'helloWorld.js',
    code: '() => {console.log("Hello World from my lambda")}',
    tags: [ 'function', 'arrow', 'hello' ],
    lines: 1
  }, // other Snippet objects follow
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

  
### Page to display the data

* pass in your snippet data (in an array) to the <code> render </code> call in the route handler for the homepage so that our template has access to it
* add html to display the snippet data in an organized way
    * HINT: can iterate through the list of snippets using the <code>#each</code> helper
    * HINT: use the `<pre>` tag to get the _code_ text to stay well formatted if you find it to be non-aligned, messy, or not new-lined
    * HINT: can put each snippet & it's data (name, count of lines, and tags) in a list item (<code>li</code>)
		* nested each statements are possible
		* (so, for example, you can loop through each snippet...and then loop through an individual snippet's tags)

__Reload and visually check.__

* Page should display the 3 initial snippets along with their data in a list-like way
* Styling does not have to be exact, just as long as you can differentiate the actual snippet code, it's name, and number of lines for each.

![display initial data](../resources/img/hw04-snippet/02-initial-data.png)

## Part 5 - Search snippets

Now that we have our data being displayed on the home/main page, let's add functionality to search for snippets based on some text, a minimum number of lines, and a tag. The server will only return snippets that match __all__ of the search criteria (essentially `and`). If a search criteria is blank (empty string), do not include it as a feature to search on.

* __In the same__ template as the homepage, add a form to search for snippets. 
	* add attributes to the form tag so that...
	* submitting the form makes a request to the same path that the form page is on
	* the form uses the appropriate HTTP request method for the functionality of this form (it should be `GET` since it's just reading data!)
* The form should have 3 `input` elements for entering form data, each with a `name` attribute:
	* `lineQ` (the minimum number of lines)
	* `tagQ` (a single tag)
	* `textQ` (any text in the snippet)
* Remember that the name of each input element shows up somewhere in the HTTP request and ... in properties of the  express application's request object
    
__Now, onto the server side:__

Modify your route handler for your home page (e.g. <code>/</code>) to __only__ select snippets that match __all__ of the search and send it to the <code>render</code> call

* if searching based on text - return only those snippets that (this is important) __contain__ the text from the form input
* if searching based on count of lines - return only those snippets that have a number of lines greater than or equal to the value submitted
* if searching based on tag - return only those results that have the specified tag
    
__Important:__

⚠️ If all of the text fields are blank display all of the snippets (essentially re-setting the search)

__Example interaction:__

<!-- TODO -->
![searching](../resources/img/hw04-snippet/03-search.gif)

And your console should look something like this (for the case where tag and text are specified):

```
Method: GET
Path: /
{ tagQ: 'loop', textQ: 'console.log', lineQ: '' }
```
<br/>
<br/>

As you can see, the values of the query string change based on which form we submit. You can even manually manipulate the query string in the URL bar of your browser. Nice!

__Make the tags clickable links:__

Now that the form is working, and now that it's also possible to search by modifying the url, modify the homepage template so that:

* each tag is a link
* the link should be to `?tagQ=` ... followed by the actual tag
* the result should be a link that you could click on that searches for that tag
* (the other criteria can be cleared)

## Part 6 - Adding a new snippet

### Form

We now have made our site display JS snippets from in-memory store, and we can search for snippets based on some text, the minimum number of lines (greater than or equal to) that the snippets have, and a tag. Nice! 

What's missing is the ability to add our own custom snippet and have it show up in the list along with the others. Let's implement this feature.

* create a new route handler in __app.js__ for <code>/add</code>
* create a new handlebars template and add a call to <code>render</code> inside of the new route handler that renders the new template
    * add a form to the template with 3 <code>inputs</code> and a submit button - this is how we'll add a snippet
    * but the 3 fields are the <code>name</code>, <code>code</code>, and <code>tags</code> for the snippet
* __the form's method should be a <code>POST</code>__
* the action of the form should be <code>""</code> or <code>/add</code> since we make the request to the same page (/add)
* now that we have a new form making a <code>POST</code> request to a new URL, add a new route handler in __app.js__ to accept <code>POST</code> requests on the URL of <code>/add</code>
	* inside this handler: 
	    1. create a new object for this inputted JS snippet
	    2. add the new object to the global array holding all of the snippets. 
	    3. __Important__: the new object should be added to the top of the array (so that it shows up first as most recent on the home/main page)
	    4. after modifying the in-memory store, redirect to the home/main page to display the updated list (any previous search criteria can be cleared)

__Example interaction:__

<!-- TODO -->
![adding](../resources/img/hw04-snippet/04-add.gif)

And your console should look something like this (for adding a single new snippet in this example). Notice the redirect back to the home/main page (in this case <code>/</code>)

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

If you check out the network tab in the browser, you should see a `POST` (as a result of the submit button push) and another `GET` (as a result of a redirect)... see the first two entries in the network tab image below:

![adding with network tab open](../resources/img/hw04-snippet/05-add-network.png)
</div>

</div>
