---
layout: homework
title: CSCI-UA.0480 - Homework #5
---

<div class="panel panel-default">
	<div class="panel-heading">Homework #5</div>
	<div class="panel-body" markdown="block">

# Anonymous Course Reviews (Sessions and Storing Data) - __Monday, November 2nd, by 11PM__

## Overview

### Goals

This assignment will cover storing and retrieving data in a database and in an in-memory session store. You will:

* use the commandline mongodb client to create a database, collection and several documents
* use mongoose to read and write data to and from mongodb from an express application
* use pre-built session middleware to read and write data to and from an in-memory session store on a per session basis

### Description

You'll be creating a site where users can anonymously post reviews for courses. By the end of this project... you should be familiar with:

* writing middleware
* some basic read and write operations with mongodb... 
* integrating mongodb with an Express web application using Mongoose (See the [example interaction at the end of this page](#examples)).

You'll create a single express application with the following directory layout (when you're done with all of the directions, the folder hierarchy should match the look the same as the one listed below): 📁

`/` (project root)

* `package.json`
* `node_modules`
* `.gitignore`
* `.eslintrc.js`
* `config.json`
* `/src`
	* `app.js`
	* `public`
		* `img`
		* `css`
			* your css file
	* `views`
		* `layout.hbs`
		* any other views

Your application will support the following routes:

* `GET /` - show all course reviews
* `GET /reviews/add` - show the add review form
* `POST /reviews/add` - process a new review
* `GET /reviews/mine` - show the reviews added during the user's session

Finally, it should:

* be served on __port 3000__
* be run from the `/src` directory
* use generated absolute paths where necessary (for example use `__dirname__` and `public` when creating the public path for express static)

### Submission Process

You will be given access to a private repository on GitHub. 

* __Push__ your changes to the homework repository on GitHub.

### (4 points) Make at Least 4 Commits

* Commit multiple times throughout your development process.
* Make at least 4 separate commits - (for example, one option may be to make one commit per part in the homework).


## Part 1 - Setup for Course Reviews App (Storing Data in a Database)

### Installing MongoDB and Preparing Data

* to install MongoDB, use a package manager like apt on Linux or homebrew on MacOS (`brew install mongodb`)...  or follow the [install instructions for your operating system on MongoDB's site](http://docs.mongodb.org/manual/installation/) 
* in order for you to connect to your database to work with data, your database server must be running
	* for some installations, MongoDB will start when your computer starts
	* for other installations, you'll have to start it manually
	* you can test if your database is running by:
		* attempting to connect to the test database ⚡
		* in a terminal window, type in <code>mongo</code> (in any directory) to start the commandline client
		* you should be given a message with the version number of the Mongo shell
	* if it's not running, you have to start the database server manually:
		* in a terminal window, type in <code>mongod</code>; this starts the server
		* if it does not start because it's looking for a directory called <code>/data/db</code>
			* this means that <code>mongod</code> is looking for a place to store you data
			* this typically happens on OSX installations, sooo...
			* [check the docs](https://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/#run-mongodb)... and then try:
			* create the directory: <code>sudo mkdir -p /data/db</code>
			* change the owner to your user (replace yourusername with your _actual_ username for you system): <code>sudo chown -R yourusername:staff /data/</code>
		* ensure that it is up and running by connecting to it using a commandline client... so in a different terminal tab/window, type in <code>mongo</code>:
* once you're connected with a commandline client (mongo), start inserting documents into a database called <code>hw05</code> and a collection called <code>reviews</code>:
	* reviews will have a course number, course name, semester (fall/spring/summer), year, professor's name, and a review field
	* so to insert, just do this in the commandline client: 
		<pre><code data-trim contenteditable>db.reviews.insert({ courseNumber: "CSCI-UA.0101", courseName: "Intro to CS", semester: "Fall", year: 2015, professor: "McTeacherson", review: "Now I can sort like pro!" });
</code></pre>
	* (inserting will automatically create the database and collection for you if they don't already exist)
	* insert the following reviews:
		<pre><code data-trim contenteditable>CSCI-UA.0480, AIT, Spring, 2018, Versoza, The answer is always undefined
CSCI-UA.0002, Intro To Computer Programming, Fall, 2018, Foobarbaz, OMG you have to take this course
</code></pre>
* use <code>db.reviews.find()</code> to show all of the reviews that you've inserted
	* make sure there's _something_ there...
	* so that you know your web app actually has reviews to read!
* use <code>ctrl + d</code> to exit the commandline client 
* (make sure you keep your database server running, though 🏃)


### Directory Structure and Dependencies

Start your usual express app by:

* copying over an eslint configuration, `.eslintrc.json`, from a previous assignment
* creating a `package.json` file with `npm init`
* installing the appropriate modules and saving them to `package.json` using <code>--save</code> (this should have already been done from the previous parts)  in the root directory of your project
* additionally, installing __mongoose__: <code>npm install --save mongoose</code>
* creating a `src` directory... and within that directory
	* creating an `app.js` file for your express app
	* activate express-static and create a `public` folder (along with some folders for css, etc.)
	* configure hbs as the templating engine and create a `views` folder along with `layout.hbs`
	* activate express.urlencoded (body parser) to parse http request bodies
	* setting up and creating the appropriate folders for templating and serving static files
* configure your server __so that it uses port 3000__
	
### Connect to the Database

Create a file called <code>db.js</code> within `src`. <code>db.js</code> will contain:

* the code to connect to our database
* ...and our Schema and model (which we'll use to access data in our database)

In <code>db.js</code>, add the require for the <code>mongoose</code> module:

<pre><code data-trim contenteditable>const mongoose = require('mongoose') </code></pre>

Leave a placeholder for your schema...

<pre><code data-trim contenteditable>// my schema goes here!</code></pre>

And, finally, add the code that connects to the database. We'll connect to the local instance of MongoDB, and we'll use a database called <code>hw05</code> (this will be created for you once you start inserting documents... which you should have done already above!). 

<pre><code data-trim contenteditable>mongoose.connect('mongodb://localhost/hw05');
</code></pre>

__If you get deprecation warnings, [check out these slides](../slides/14/mongoose.html#/8)__ 


### Schema 

For larger projects, there is usually one file per schema, all located in a separate folder called models. For now, however, define the following Schema within <code>db.js</code>. Check out the slides on:

* [the MongoDB Demo](../slides/14/mongo.html) 
* [and/or the Mongoose API](../slides/14/mongoose.html) 
* (or alternatively [check out the docs!](http://mongoosejs.com/docs/guide.html))

Since we're storing reviews, we'd like each document to have:

* a course number (a <code>String</code>)
* a course name (a <code>String</code>)
* the semester for the course (a <code>String</code>) 
* a year (a <code>Number</code>)
* the professor's name (a <code>String</code>)
* the review to be posted (a <code>String</code>)

Create a schema based on the above slides, and insert your code under your <code>// my schema goes here!</code> comment.

Then, use your schema to define your model... the model is used as a constructor to create new documents... or as an object with methods that allows the read or update of existing documents. 

You can place the following code after your schema and before the connection (assuming that you're schema looks something like this) so that mongoose is aware that your model exists (it _registers_ our model so that you can retrieve it later):

<pre><code data-trim contenteditable>mongoose.model('Review', Review);
</code></pre>

## Part 2 - Displaying All Reviews, Adding Styles, and Adding Navigation

### Overview

We'll be using mongoose to read in all of the reviews from the database. Then, we'll be able to display the reviews in a table. 

### Details

There's a bunch of setup that we need in order to integrate our databases access code with our express app:

* in <code>app.js</code>, require the <code>db.js</code> file that you created so that the code that you wrote for the Schema and for connecting to the databases is executed
* at the top of <code>app.js</code>, after you've created your application object: <code>require('./db');</code>
* after that, retrieve the model that you registered with mongoose:
	<pre><code data-trim contenteditable>const mongoose = require('mongoose');
const Review = mongoose.model('Review');
</code></pre>

You can now use <code>Review.find</code> to retrieve all of the reviews in your database!

* create a route handler that accepts requests for <code>/</code>
* in that route handler, the callback should use <code>Review.find</code> to retrieve all reviews!
* <code>find</code> takes a __query object__ (just a regular object) that specifies the criteria for what we're searching for using name/value pairs... for example {year: 2016} would be all reviews for courses in 2016
* if you leave the query object empty, it'll just give back all reviews
* the second argument for find is yet another callback... this time, it's the function that's executed when mongoose finishes finding stuff for you
* find works like this:
	<pre><code data-trim contenteditable>SomeModel.find({search: criteria}, function(err, varToStoreResult, count) {
  console.log(varToStoreResult); // <---- variable contains found documents!
});
</code></pre>
* so, once you've retrieved stuff from the database, you'll probably want to render your template... so in your callback, call <code>res.render</code>, rendering whatever template you'd like to display your table
* of course, you'll have to pass in your find results so that you can iterate over them in your template
* in your template, use standard <code>table</code> markup, with each row containing a review
* try opening your page in your browser to show a table of all reviews: `http://localhost:3000` 
* finally, __add styles to your page and add some simple navigation that will appear on this page as well as any other page that you create__
	* to add styles, place a css file in `public/css`
	* use a `link` tag in `layout.hbs` to include it
	* style at your discretion (design will not be taken into account for grading, only the technical aspect of including a stylesheet will be graded)
	* additionally, add the following navigation links (these should appear on every page):
		* all reviews (`/`)
		* add a review (`/reviews/add`)
		* show only "my" reviews (`/reviews/mine`)
* once you've completed all of the steps above, you should have a page that looks like the image under the Example heading below
	* again, your sites styling, and even copy (that is the text content) does not have to match exactly; it's your decision how to style and what to name your site
	* the following elements are shown in the image below, but do not have to be implemented yet
		* the filter form will be added in the section
		* the number of session visits will be added later in the instructions

### Example - All Reviews

<img src='../resources/img/hw05-review-01-all-sm.gif'>

### Adding Authentication to Your Database

Now that you have the database working, let's restrict access to it by forcing database clients (like your application) to authenticate with a username and password. By default, MongoDB does not require a username/password to connect 😮, so...

* to add authentication, [start by creating a user administrator in MongoDB by following this guide](https://docs.mongodb.com/manual/tutorial/enable-authentication/) 
	* make sure to remember the username and password that you specified!
* add __another__ user by [using this guide](https://docs.mongodb.com/manual/tutorial/enable-authentication/#create-additional-users-as-needed-for-your-deployment)
	* ⚠️ __make sure to modify the value for db so that it reads as "hw05"__
	* this user is the one you'll use for your application
	* again, make sure to note the username and password

Test your new user by trying to login to the database using the commandline client:

* first try logging in the same way that you did previously:
	* `mongo`
	* try listing databases or showing collections; you should get an error
	* log out of the mongo client
* try logging in again, this time adding user and database (and an option to prompt for a password)
	* `mongo --port 27017  -u "yourNewUserName" hw05 -p`
	* try listing databases or showing collections; this should now work

If you try using your app, it should no longer display course reviews! Fix this temporarily by:

1. opening `db.js`
2. modifying `mongoose.connect` so that the database string includes credentials...
3. `mongodb://username:password@localhost/hw05`

⚠️ DO NOT COMMIT YOUR CODE YET! Your username and password should not be included in your repository. Instead, we'll read the username and password from a file that is not under version control (that is, a file ignored by git)

To do this, we'll use an environment variable to determine whether or not to read a configuration file:

1. add `config.json` to your `.gitignore` so that your credentials don't inadvertently get committed
2. in `db.js` add the following code before `mongoose.connect`:
	<pre><code data-trim contenteditable>// is the environment variable, NODE_ENV, set to PRODUCTION? 
let dbconf;
if (process.env.NODE_ENV === 'PRODUCTION') {
	// if we're in PRODUCTION mode, then read the configration from a file
	// use blocking file io to do this...
	const fs = require('fs');
	const path = require('path');
	const fn = path.join(__dirname, '../config.json');
	const data = fs.readFileSync(fn);

	// our configuration file will be in json, so parse it and set the
	// conenction string appropriately!
	const conf = JSON.parse(data);
	dbconf = conf.dbconf;
} else {
	// if we're not in PRODUCTION mode, then use
	dbconf = 'mongodb://localhost/YOUR_DATABASE_NAME_HERE';
}
</code></pre>
3. change `mongoose.connect`: pass in `dbconf` as the argument instead of a hardcoded string
	* `mongoose.connect(dbconf);`
4. create a config file and tell  your application to use it by specifying an environment variable when you start your app
	* `NODE_ENV=PRODUCTION node app.js`
	* create a `config.json` that contains a connection string  `mongodb://username:password@localhost/hw05` in the property, `dbconf` 
		* so `config.json ` should look something like {"dbconf":"mongodb://username:password@localhost/hw05"}
	* run your application again, this time forcing your app to use the config file by specifying an environment variable during start-up
		* `NODE_ENV=PRODUCTION node app.js` 

<hr>

## Part 3 - Filtering

### Overview

In this part of the assignment, you'll add a form to your page that allows you to filter the table by semester, year, and professor's name via GET and query string parameters.

### Details

You already know how to do most of this, but here's a rough sketch of some of the relevant tasks:

* in the same page as your table of reviews, create a form that uses GET
  * it should go to '/' when submitted 
  * note that we don't need `req.body` for this since the request should be a GET
  * also... why are we using GET instead of POST? because we're merely reading data... (pretty common convention for search / filter)
* modify your request handler to try to get the value of query string parameters (<code>req.query.nameOfFormElement</code>)
  * for example, submitting your form may result in adding a ?foo=bar to the url
  * to access that name/value pair in the query string on the server side, <code>req.query.foo</code>
* use the value passed in from the form (via GET and the query string) to filter the reviews by director name
* however, instead of passing in an empty query object, `{}`, to find, pass in an object with the appropriate keys and values based on form input
	* the keys should match the property names defined in your schema
	* multiple key / value pairs within the query object behave as if they were combined with `and`...
	* `{foo: 'bar', baz: 'qux'}` would match all documents that have `foo == 'bar' AND baz == 'qux'`
	* [see the mongoose docs](http://mongoosejs.com/docs/api.html#find_find) and [mongodb docs](https://docs.mongodb.com/manual/reference/method/db.collection.find/) for more info on `find`
* see the example below for a filter form in action!

### Example - Filtering Reviews

<img src='../resources/img/hw05-review-02-filter-sm.gif'>

<hr>

## Part 4 - Adding a Review

### Overview

In this part of the assignment, you'll create another page that contains a form to add new reviews. The form will POST data... and then redirect back to <code>/</code>.

### Details

Again, you've already done something similar in a previous assignment (using an in-memory store), but here's a rough sketch of some of the relevant tasks:

* make sure that the following steps from earlier in the instructions have been completed:
	* check that a link to `/reviews/add` has been created in all of your pages 
	* ...and that you are able to parse http POST request bodies so that `req.body` is available
* create the appropriate route handlers that accepts requests for <code>/reviews/add</code>
* you'll two route handlers for `/reviews/add`: one for showing the form and one form processing the form
    * GET will handle showing the form
        * create another template file
        * add a form to your template
    * POST will handle the form submission
        * your request handler that deals with POSTs will create a new review in the database... [check out the slides](../slides/14/mongo.html) 
		* when it's done, it should redirect back to the page that shows all of the reviews

### Example - Adding a Review

<img src='../resources/img/hw05-review-03-add-sm.gif'>

<hr>

## Part 5 - Logging Cookies, Pages Visited (by session) 

### Background and User Visits 

Now that we have basic adding and filtering done, it's time to add some session based features.  Check out the [the slides on `express-session` middleware](../slides/10/sessions.html#/17) before starting (they're near the end of the slides).


Once your familiar with `express-session` and the idea of Cookies, find a way to keep a count of the total number of pages that a user has seen. We can identify users by their session (which `express-session` will generate for us). Consequently, different sessions (for example, visiting the site on two different browsers) will increment different, independent, count totals.

* keep track of the number of times a user has visited any page on the site
* on all pages, display the number of pages a user has visited `Your session's total page visits: [some number]`
	* again, this should be shown on all pages
	* one way to do this is to use `res.locals` ([see the express documentation on res.locals](http://expressjs.com/en/api.html#res.locals))
		* adding a property to `res.locals` makes that value available to __all__ templates (with the property name as the variable name)
		* in the example code in the documentation, middleware is used to create a property on res.locals for __every request__
			<pre><code data-trim contenteditable>app.use(function(req, res, next){
  res.locals.user = req.user;
  res.locals.authenticated = ! req.user.anonymous;
  next();
});
</code></pre>
		* this property will be available in every template rendered (including `layout.hbs`)
		* using the example above, regardless of what template you're in (again, including `layout.hbs`), you can use `user` and `authenticated` as template variables! 👍	
	* you'll have to find some way of incrementing a counter variable that's session dependent (that is, different client sessions will have different visit counts) for every page visited, regardless of page / path
	* once you've implemented this, try refreshing the page or flipping back-and-forth between viewing all reviews and adding a review
	* you should see the counter increment similar to the animation shown in the example section below

### Example - Keeping Track of Number of Pages Visited During Session

<img src='../resources/img/hw05-review-05-visit-sm.gif'>

### Logging Cookies
* lastly, 👀 🍪.... add middleware that logs out the value associated with the `Cookie` header on every request:
	* this should display the value found in the header containing cookies  on the server's console for every request that comes in
	* use the request object's `get` method to retrieve the value of a specific header!
* the resulting output on the server should look like this:
	```
The Cookie header contains:
foo=bar;baz=qux
```
* again, use middleware to do this:
	```
app.use((req, res, next) => {
	// your code goes here
})
```
* notice that the value logged out isn't number of visits, but instead, only the session id
* (where is the number of visits stored again? on the server!)

<hr>

## Part 6 - Reviews Added (by session) 

Finally, create one last page (which makes 3 total), `/reviews/mine`,  showing all of the reviews that have been added by the user during their session.

* you must use the `express-session` middleware to do this ([see the relevant slides](../slides/10/sessions.html#/17))
* there are a few ways to implement this:
	* storing review objects directly in the session (as well as in the database)
	* or (more complicated) modify your schema / model so that you can store the session id of the session that created a review
		* `req.session.id` will contain the id for that particular session
* make sure you link to `/reviews/mine` from both of the existing pages so that the graders can see that you've implemented this feature
* the example below assumes that the last class was entered during the user's session... so it shows up under the 'My Reviews' page

### Example - Show The Movies Added for the Session

<img src='../resources/img/hw05-review-04-session-sm.gif'>

</div>

</div>

