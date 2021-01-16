---
layout: homework
title: CSCI-UA.0480 - Homework #5
---

<div class="panel panel-default">
	<div class="panel-heading">Homework #5</div>
	<div class="panel-body" markdown="block">

# Book Buzz, a Book Review Site (Storing Data, URL Parameters, Sessions) - __Due Friday, 4/5 at 11pm__

## Overview

### Goals

This assignment will cover database storage, sessions and URL parameters. You will:

* use mongoose to read and write data to and from mongodb from an express application
* use the commandline mongodb client to check and debug your work
* use pre-built session middleware to read and write data to and from an in-memory session store on a per session basis

### Description

<img src="../resources/img/hw05-book-buzz/all.gif">

You'll be creating a site where users can add books and submit reviews of books. By the end of this project, you should be familiar with:

* some basic read and write operations with mongodb...
* integrating mongodb with an Express web application using Mongoose 
* writing middleware
* working with sessions

You'll create a single express application with the following directory layout (when you're done with all of the directions, the folder hierarchy should match the look the same as the one listed below): 📁

`/` (project root)

* `package.json`
* `node_modules`
* `.gitignore`
* `.eslintrc.js`
* `/src`
	* `app.js`
	* `public`
		* `img`
		* `css`
			* your css file
	* `views`
		* `layout.hbs`
		* any other views

Your application will support the following routes (:slug specifies that the part of the path is variable)):

* `GET /` - redirect to `/books`
* `GET /books` - show all books and a filter form
* `GET /books-new` - show the create book form
* `POST /books-new` - process a new book
* `GET /books/:slug` - show information about a single book and display the add review form
* `POST /books/:slug/comments` - 

Finally, it should:

* be served on __port 3000__
* be run from within the `src` directory of the project (`cd src`, then `nodemon app.js`)
* use generated absolute paths where necessary (for example use `__dirname` and `public` when creating the public path for express static)

### Submission Process

You will be given access to a private repository on GitHub.

* __Push__ your changes to the homework repository on GitHub.

### (4 points) Make at Least 4 Commits

* Commit multiple times throughout your development process.
* Make at least 4 separate commits - (for example, one option may be to make one commit per part in the homework).


## Part 1 - Setup for Book Review App (Storing Data in a Database)

### Installing MongoDB and Preparing Data

* to install MongoDB, use a package manager like apt on Linux or homebrew on MacOS (`brew install mongodb`)...  or follow the [install instructions for your operating system on MongoDB's site](http://docs.mongodb.org/manual/installation/)
* by default, MongoDB does not require a username/password to connect 😮
	* if you'd like to add authentication [you can follow this guide](https://docs.mongodb.com/manual/tutorial/enable-authentication/) (it's a little bit of work to make it so that your app works with authentication on your environment, but without authentication on the grader's environment)
	* if you add authentication, make sure to:
		* (ideal) use environment variables (`process.env`) to set the username and password (but default to no credentials if environment variable(s) are not set)
		* (also ideal) read the username and password from a configuration file, but don't put the configration file under version control (and perhaps read a different file based on an environment variable in `process.env`)
		* (not great, but easy) commit and push the version with no credentials, and keep the version with credentials locally ... remembering to never commit and push that particular file
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
* once you're connected with a commandline client (mongo), start inserting documents into a database called <code>hw05</code> and a collection called <code>books</code>:
	* books will have a title, its author, its 10 or 13 digit ISBN, and a list of its reviews: 
	* so to insert, just do this in the commandline client:
		<pre><code data-trim contenteditable>db.books.insert({
			title: "C++ Primer",
			author: "Stanley B. Lippman",
			review: "9780321714114"
		});
</code></pre>
	* (inserting will automatically create the database and collection for you if they don't already exist)
	* insert the following books:
		<pre><code data-trim contenteditable>
			{title: "C++ Primer", author: "Stanley B. Lippman", isbn: "9780321714114"}
			{title: "Eloquent JavaScript", author: "Marijn Haverbeke", isbn: "1593279507"}
</code></pre>
* use <code>db.books.find()</code> to show all of the books that you've inserted
	* make sure there's _something_ there...
	* so that you know your web app actually has books to read!
* use <code>ctrl + d</code> to exit the commandline client
* (make sure you keep your database server running, though 🏃)

### Directory Structure and Dependencies

Start your usual express app by:

* create a `.gitignore` to make sure your `node_modules` folder doesn't get into your repository
* copying over an eslint configuration, `.eslintrc.json`, from a previous assignment (if it doesn't already exist in the repository)
* creating a `package.json` file with `npm init`
* installing the appropriate modules and saving them to `package.json` using <code>--save</code> (`express`, `hbs`)  in the root directory of your project
* additionally, installing...
	* __mongoose__: <code>npm install --save mongoose</code> 
	* __mongoose-url-slugs__: <code>npm install --save mongoose-url-slugs</code> (we'll use this to create unique, human readable identifiers for our books)
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

If you configured a user for MongoDB, then follow the instructions below:

### Optionally Add Authentication

When working with databases and databases users / authentication, you'll want to 

1. require username and password in certain environments (for example, your laptop or a production environment)
2. allow non-authenticated connections in other environments (for example, the grader's laptop)

⚠️Any authentication configuration should __not be added to your repository__ (make sure your configuration files are in `.gitignore`)

This requires performing the following steps:

1. [enable authentication for mongodb](https://docs.mongodb.com/manual/tutorial/enable-authentication/)
2. conditionally include a file that contains credentials

The connection string placed into `mongoose.connect` will either be the same as shown earlier, or with authentication:

<pre><code data-trim contenteditable>mongodb://USERNAME:PASSWORD@localhost/hw05
</code></pre>

Where:

* `USERNAME` - is the username you used for logging it to the server
* `PASSWORD` - is the password for __mongodb__ that you created from Part 3.


You should not put these credentials directly into your `db.js` file, and they should not be in a file in version control (you may inadvertently disclose these credentials if your repository becomes public). One way to deal with this issue is to put your credentials in an external file that is conditionally read:

1. add a conditional to your database configuration code that...
2. checks if an environment variable named `NODE_ENV` is set to `DEV`
    * [read the excellent digital ocean summary regarding environment variables](https://www.digitalocean.com/community/tutorials/how-to-read-and-set-environmental-and-shell-variables-on-a-linux-vps)
    * use [process.env.NAME_OF_VARIABLE] to access environment variables through node
3. if the above is true, then read a file synchronously (blocking) by using [fs.readFileSync](https://nodejs.org/api/fs.html#fs_fs_readfilesync_file_options)
4. the file that is read in will be a `json` file that's not in version control... that contains the database connection string for your application when deployed on the server

(Note that this is a simple way of managing configuration, consider using a configuration management library, like [node-convict](https://github.com/mozilla/node-convict) for your professional projects)

__To add an external configuration file, follow these steps__ &rarr;

1. add `config.json` to your `.gitignore` so that your credentials don't inadvertently get committed
2. in `db.js` add the following code before `mongoose.connect`:
    <pre><code data-trim contenteditable>// is the environment variable, NODE_ENV, set to DEV? 
let dbconf;
if (process.env.NODE_ENV === 'DEV') {
    // if we're in DEV mode, then read the configration from a file
    // use blocking file io to do this...
    const fs = require('fs');
    const path = require('path');
    const fn = path.join(__dirname, 'config.json');
    const data = fs.readFileSync(fn);

    // our configuration file will be in json, so parse it and set the
    // conenction string appropriately!
    const conf = JSON.parse(data);
    dbconf = conf.dbconf;
} else {
    // if we're not in DEV mode (the graders are testing your work), then use
    dbconf = 'mongodb://localhost/hw05';
}
</code></pre>
3. when you use `mongoose.connect`, pass in the variable, `dbconf`, as the argument instead of a hardcoded string
    * `mongoose.connect(dbconf);`
4. you can test that everything works by:
    * try running your application __locally__ (on your own computer) without any environment variables (just use `node app.js` or `./bin/www`)
		* and note that your connection _should_ fail due to bad credentials (if you've configured mongodb with authenticaiton)
    * then... create a `config.json` with a single json object in it:
        * the key int the object should be `"dbconf"` (remember that json keys are double quoted)
        * the value should be `"mongodb://username:password@localhost/hw05"`
        * `{"dbconf":"mongodb://username:password@localhost/hw05"}
    * then, run your application again, this time forcing your app to use the config file
        * `NODE_ENV=DEV node app.js` or `NODE_ENV=DEV ./bin/www`
    * __DO NOT COMMIT__ `config.json` (in fact, it should be in your `.gitignore` as the previous instructions specify)
    * (you'll create a `config.json` on the server)

Note, another method for using authentication is to pass in an object with options as the second argument (again, these options should be brought in from a config file)::

<pre><code data-trim contenteditable>
mongoose.connect(
	"mongodb://localhost/hw05",
	{
		auth: {
			authdb:"admin",
			user: "username",
			password: "password"
		}
	}
)
</code></pre>

### Schema

For larger projects, there is usually one file per schema, all located in a separate folder called models. For now, however, define the following Schema within <code>db.js</code>. Check out the slides on:

* [the MongoDB Demo](../slides/14/mongo.html)
* [and/or the Mongoose API](../slides/14/mongoose.html)
* (or alternatively [check out the docs!](http://mongoosejs.com/docs/guide.html))

Since we're storing review of books, we'll create a couple of schemas: one that represents books and another that represents reviews. Reviews will be [embedded](https://mongoosejs.com/docs/subdocs.html) within books. See [the slides for an example](../slides/12/mongoose.htmll#/10). Here's what the documents should contain (we're taking some shortcuts when designing the schemas to cut down on the complexity of the app):

Book

* title (a __required__ <code>String</code>): the title of the book
* author  (a  __required__ <code>String</code>): the author of the book (note that we're assuming only one author per book, and the way we're storing data will cause redundancy and anomalies when reading, updating and deleting... both not great; better to have author as "related" document)
* isbn (a __required__ <code>String</code> that is between 10 and 13 digits long): the isbn number of the book (note that we're storing two possible isbns in the same field... also not good; better to have two fields)
* reviews (an `Array` of `Review` documents; can be blank): the reviews associated with this book
* slug (a `String`): ⚠️ you do not have to explicitly define this in your schema, it will be added by a plugin (see below)

Review

* rating (a __required__ <code>Number</code> between 1 and 5 inclusive)
* name (a _optional_ <code>String</code>)
* text (a __required__ <code>String</code>)

Create a schema and database connection using the slides and information above.

* create two schemas (remember that you don't have to add `slug` yet... that'll be handled in a bit!)
* use your schema to define your model... the model is used as a constructor to create new documents... or as an object with methods that allows the read or update of existing documents. See an [example in the slides on Mongoose](../slides/12/mongoose.html#/10)
* ⚠️ add a plugin to automatically create a slug property in your `Book` object using the book's title and author
	* for example, a book by Frank Herbert called Dune would have the following slug: `dune-frank-herbert`
	* this is the last part in the [example Schema from the slides](../slides/12/mongoose.html#/10)
	* note that it is using the module that we installed earlier, [mongoose-url-slugs](https://www.npmjs.com/package/mongoose-url-slugs)
	* this module automatically generates slugs for us, and we don't have to explicitly add `slug` to our schema (it'll _just_ appear) 
* you must place the following code after you register `mongoose-url-slugs` as a plugin so that mongoose is aware that your model exists (it _registers_ our model so that you can retrieve it later): <pre><code data-trim contenteditable>mongoose.model("Books", BookSchema)</code></pre>
* after this, you can connect to your database by calling `mongoose.connect` with your database connection string (host is `localhost`, database name is `hw05`.

## Part 2 - Displaying All Books, Adding Styles, and Adding Navigation

### Overview

We'll be using mongoose to read in all of the books reviews from the database. Then, we'll be able to display all of the books from our database.


### Details

There's a bunch of setup that we need in order to integrate our databases access code with our express app:

* in <code>app.js</code>, require the <code>db.js</code> file that you created so that the code that you wrote for the Schema and for connecting to the databases is executed
* at the top of <code>app.js</code>, after you've created your application object: <code>require('./db');</code>
* after that, retrieve the model that you registered with mongoose:
	<pre><code data-trim contenteditable>const mongoose = require('mongoose');
const Book = mongoose.model('Book');
</code></pre>

You can now use <code>Book.find</code> to retrieve all of the books in your database!

* create route handlers that accepts requests for `/` and `/books`
* `/` should just redirect to `/books`
* in the `/books` route handler, the callback should use <code>Book.find</code> to retrieve all books!
* <code>find</code> takes a __query object__ (just a regular object) that specifies the criteria for what we're searching for using name/value pairs... for example <code>{title: "Advanced Programming in the UNIX Environment"}</code> would be all book reviews for title named <code>"Advanced Programming in the UNIX Environment"</code>.
* ⚠️ if you leave the value empty (regardless of whether or not `title` or `author` is chosen), it'll just give back __all books__ (clearing the filter)
* the second argument for find is yet another callback... this time, it's the function that's executed when mongoose finishes finding stuff for you
* find works like this:
	<pre><code data-trim contenteditable>SomeModel.find({search: criteria}, function(err, varToStoreResult, count) {
  		console.log(varToStoreResult); // <---- variable contains found documents!
});
</code></pre>
* once you've retrieved stuff from the database, you'll probably want to render your template... so in your callback, call <code>res.render</code>, rendering whatever template you'd like to display your table
* you'll have to pass in your find results so that you can iterate over them in your template
* in your template, display the `title`, `author`, and `isbn` of each book
	* the animated gif example shown at the end of these instructions show that title is a link
	* you don't have to add the link quite yet; we'll be doing that later in another part
* try opening your page in your browser: `http://localhost:3000/books`
* finally, __add styles to your page and add some simple navigation that will appear on this page as well as any other page that you create__
	* to add styles, place a css file in `public/css`
	* use a `link` tag in `layout.hbs` to include it
	* style at your discretion (design will not be taken into account for grading, only the technical aspect of including a stylesheet will be graded)
	* additionally, add the following navigation links (these should appear on every page):
		* `Home` - retrieve books by using query parameter (`/`)
		* `Add a Book` - create a new book (`/books-new`)
* once you've completed all of the steps above, you should have a page that looks like the image under the Example heading below
	* again, your sites styling, and even copy (that is the text content) does not have to match exactly; it's your decision how to style and what to name your site
	* the following elements are shown in the image below, but do not have to be implemented yet
		* the filter form will be added in the next section
		* the number of session visits will be added later in the instructions

### Example - Showing All Books

<img src="../resources/img/hw05-book-buzz/read.gif">

<hr>


## Part 3 - Filtering

### Overview

In this part of the assignment, you'll add a form to your page that allows you to filter books by their __title__ and __author__ via GET and query string parameters.


### Details

You already know how to do most of this, but here's a rough sketch of some of the relevant tasks:

* in the same page as your table of books, create a form that uses GET
  * it should go to `/books` when submitted
  * note that we __don't__ need `req.body` for this since the request should be a GET
  * also... why are we using GET instead of POST? because we're merely reading data... (pretty common convention for search / filter)
* modify your request handler to try to get the value of query string parameters (<code>req.query.nameOfFormElement</code>)
  * for example, submitting your form may result in adding a ?foo=bar to the url
  * to access that name/value pair in the query string on the server side, <code>req.query.foo</code>
  * ⚠️ you must use `filter` (either the `title` or `author`) and `value` (the value to filter by) as the query string names
* use the value passed in from the form (via GET and the query string) to filter the books by __title__ or __author__
* pass in an object with the appropriate keys and values based on form input, if the form input is empty, return all books from the collection
	* the keys should match the property names defined in your schema
	* multiple key / value pairs within the query object behave as if they were combined with `and`...
	* `{foo: 'bar', baz: 'qux'}` would match all documents that have `foo == 'bar' AND baz == 'qux'`
	* [see the mongoose docs](http://mongoosejs.com/docs/api.html#find_find) and [mongodb docs](https://docs.mongodb.com/manual/reference/method/db.collection.find/) for more info on `find`
* see the example below for a filter form in action!

### Example - Filtering Books

<img src="../resources/img/hw05-book-buzz/filter.gif">

<hr>

## Part 4 - Creating a Book


### Overview

In this part of the assignment, you'll create another page that contains a form to add new books. The form will POST data... and then redirect back to <code>/books</code>.

### Details

Again, you've already done something similar in a previous lab / assignment (using an in-memory store), but here's a rough sketch of some of the relevant tasks:

* make sure that the following steps from earlier in the instructions have been completed:
	* check that a link to `/books-new` has been created in all of your pages
	* ...and that you are able to parse http POST request bodies so that `req.body` is available
* create the appropriate route handlers that accepts requests for <code>/books-new</code>
* you'll create two route handlers for `/books-new`: one for showing the form and one for processing the form
    * GET will handle showing the form
        * create another template file
        * add a form to your template
		* ⚠️ you must use the following `name` attributes for your form inputs (this will make automated testing possible for the graders):
			* `name="title"`
			* `name="author"`
			* `name="isbn"`
    * POST will handle the form submission
        * your request handler that deals with POSTs will create a new book in the database... [check out the slides](../slides/14/mongo.html)
		* when it's done, it should redirect back to the page that shows all of the books
		* ⚠️ if one of the required fields are missing, the `err` object in `save` will be populated with data
			* if an error exists (`if(err)`)...
			* re-render your create book form template rather than redirecting
			* pass along an error message that says there was in issue saving the book
			* (see the animated gif example below)
* ⚠️ when working with the data from `req.body`, you'll have to sanitize your input to prevent database query injection attacks
	* use [mongo-sanitize](https://www.npmjs.com/package/mongo-sanitize)
	* `npm install --save mongo-sanitize`
	* require it
	* call `sanitize` on any string that your using as part of query with mongoose (finding, creating, etc.)

### Example - Adding a Book

Note that this shows adding a book with an error... and adding a book successfully.

<img src="../resources/img/hw05-book-buzz/add.gif">

<hr>

## Part 5 - Showing a Book's Details


### Overview

In this part of the assignment, you'll create another page that shows a book's details along with a form to add reviews / comments about that book. 

### Details

To show a book's details, we'll extract a part of the url path to use as a unique identifier for a book. We'll use this identifier to search for the book in the the database. The `slug` of a book will be part of the url path, so the route handler for `GET` will respond to `/books/:slug`. If a client requests `http://localhost:3000/books/dune-frank-herbert`, then `dune-frank-herbert` will be automatically available in the property `req.params.slug`. See the [slides on URL Parameters](../slides/14/params.html#/)

* first, modify your template for `books` (the one that shows all books) so that the book titles are links
	* construct the links in the template by wrapping the title in anchor (`a`) tags
	* the `href` attribute of your `a` tag should link to `/books/the-slug-property-from-your-book`
	* (essentially \{\{book.slug\}\})
* create an appropriate route handler that accepts a request for <code>GET /books/:slug</code>
	* it will extract the `slug` by using `req.params.slug`
	* use `find` on `Book` to search for that specific book
* create a new template that will show a book's details and a comment form
	* the details shown will just be the book's title and author: `Reviews for $TITLE and $AUTHOR`
	* underneath that, show a form to add a review
		* ⚠️ the form should `POST` to the current url plus `comments` (for example, if you're on `/books/dune-frank-herbert`, then the form should `POST` to `/books/dune-frank-herbert`)
		* the form should allow you to specify a rating, your review and your name
		* ⚠️ the names of these form input elements should be `rating`, `text` and `name` (so, something like `name="rating"`)
		* processing the form `POST` data will be handled in the next part
	* and, lastly, show all of the reviews for that book
		* this includes the `rating`, `name` and `text` fields
		* ⚠️ note that the `rating` must not simply be a number, but instead some repeated character (for example a rating of 3 could be ⭐️⭐️⭐️ or `***`)
		* ⚠️ if a book has no reviews, display a message that says there are no reviews

If a book can't be found, send back a page with a status of 404... along with a message saying that the page wasn't found:


### Example - Showing a Book's Details and a Review Form

<img src="../resources/img/hw05-book-buzz/comments.gif">

### Example - Book not Found

<img src="../resources/img/hw05-book-buzz/404.gif">

<hr>

## Part 6 - Adding Reviews

### Overview

This part deals with adding a review for a specific book. Create a route handler that will accept POST data... and then redirect back to the book's details page

### Details

* create a route handler for a `POST` to `/books/:slug/coments`
* use `findOneAndUpdate` to find the book by slug
	* this will allow us to find the book and add a new review to it 
	* [check out the slides on findOneAndUpdate](../slides/12/mongoose.html#/16)
	* pass a sanitized version of `req.params.slug` as a _query_ object (first argument)
	* ...and use the data submitted from the form (again sanitized) as the _update_ object (second argument)
* when it's done, it should redirect back to the page that shows the book's details and comments page


### Example - Adding a Review

<img src="../resources/img/hw05-book-buzz/comments-add.gif">

<hr>

## Part 7 - Number of Pages Visited (by session)

### Overview


Now that we have basic adding and filtering done, it's time to add some session based features.  Check out the [the slides on `express-session` middleware](../slides/10/sessions.html#/17) before starting (they're near the end of the slides).

Once your familiar with `express-session`, find a way to keep a count of the total number of pages that a user has seen. We can identify users by their session (which `express-session` will generate for us). Consequently, different sessions (for example, visiting the site on two different browsers) will increment different, independent, count totals.

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
	* once you've implemented this, try refreshing the page or flipping back-and-forth between viewing all books and adding a book
	* you should see the counter increment similar to the animation shown in the example section below
	* it's ok to count `POST` requests as page visits

### Example - Keeping Track of Number of Pages Visited During Session

<img src="../resources/img/hw05-book-buzz/visits.gif">

<hr>

## About the Reference Solution

You're free to style your application at your discretion. With that said, the reference solution does use some outside resources:

* background image from [xmple.com](https://www.xmple.com/wallpaper/black-beehive-honeycomb-yellow-hexagon-2736x1824-c2-ffd700-000000-l2-8-96-a-0-f-5-image/)
* fonts (Merriweather and Lobster) from [Google Fonts](https://fonts.google.com/)

</div>

</div>

