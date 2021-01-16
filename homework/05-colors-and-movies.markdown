---
layout: homework
title: CSCI-UA.0480 - Homework #5
---

<div class="panel panel-default">
	<div class="panel-heading">Homework #5</div>
	<div class="panel-body" markdown="block">

# More Colors / Let's Watch Some Movies! (Sessions and Storing Data) - <strike>Wednesday Nov 1st</strike> __Thursday, Nov 2nd, by 11PM__

## Overview

### Goals

There are two main parts to this assignment

1. Session Management / Handling Cookies (Part 1)
    * build your own middleware to parse cookies
    * build your own middleware to create an in-memory session store
2. Storing and Retrieving Data (Parts 2 - 6)
    * use the commandline mongodb client to create a database, collection and several documents
    * use mongoose to read data from mongodb
    * use mongoose to write data to mongodb
    * use pre-built session middleware  (Part 6)

### Description

By the end of this project... you should be familiar with:

* writing middleware
* setting and reading cookies
* some basic read and write operations with mongodb... 
* integrating mongodb with an Express web application using Mongoose (See the [example interaction at the end of this page](#examples)).

You'll create / modify two express apps:

1. A simple demo site that has two pages (partially written for you):
    * a page to change the background color of the site: `/preferences`
        * has a simple form
        * changes made in the form are stored in the user's session
    * a page showing the current data that's stored in that user's session: `/`
2. A site that has a list of movies:
    * the first page is a list of movies: <code>/movies</code>
        * displays a table of movies
        * has a form to filter the movies by director name
    * the second page allows the user to add movies: <code>/movies/add</code>

Just like the previous assignment, we'll have a non-standard layout for our project since it will have to separate sites. When you're done with all of the directions, the folder hierarchy should look like this:

* `/` (project root)
    * `package.json`
    * `node_modules`
    * `.gitignore`
    * `.eslintrc.js`
    * `/src`
        * `/cookied` (part 1)
            * `app.js`
            * `public`
                * `img`
                * `css`
            * `views`
                * `layout.hbs`
        * `/movies` (parts 2 - 5)
            * `app.js`
            * `public`
                * `img`
                * `css`
            * `views`
                * `layout.hbs`

`

### Submission Process

You will be given access to a private repository on GitHub. 

* __Push__ your changes to the homework repository on GitHub.

### (4 points) Make at Least 4 Commits

* Commit multiple times throughout your development process.
* Make at least 4 separate commits - (for example, one option may be to make one commit per part in the homework).

## Part 1 - Session Management

In this part of the assignment, you'll write two middleware functions: one to parse cookies, and one to manage sessions. 

The end goal of the program is to create session management where a session id is assigned to a client via cookies... and that session id is associated with data on the server. 

For this program the data that is stored is the user's session id and their favorite color preference (which changes the background color of the site). __The majority of the site is already written for you; you are just implementing middleware__. 

See the animation below for the site works (note that the 2nd browser is in incognito mode).

<br>

![demo](/csci-ua.0480-fall2017-007/resources/img/hw05-cookied-00-demo.gif)



1. in the root of your project, create the following files with appropriate configuration:
    * `.eslintrc.js` (you can use one from our previous projects and customize it if you like)
    * `.gitignore` (minimally ignore `node_modules`)
    * `package.json` (by hand or by `npm init`)
2. again, in the root of your project,  install the appropriate modules for:
    * the express framework
    * templating
    * parsing a POST body
    * `node-uuid` (for generating a session id)
    * remember to save your dependencies in `package.json`
3. open up `src/cookied/app.js` and read through the code to get an idea of what it's doing:
    * it only has 3 routes that render 2 _actual_ pages
    * it makes use of two middleware function (both of which don't exist yet; you'll be writing these functions!)
        1. `parseCookies`
        2. `manageSession`
4. write a `parseCookies` middleware
    * this middleware...
        * checks the incoming request for a `Cookie` header ...
        * and parses name value pairs from the value into a property on the 'req' object called `hwCookies` 
    * open up `src/cookied/cookied.js
    * create a function called `parseCookies`
    * it should have 3 arguments ([see middleware](../slides/09/middleware.html))
    * SPOILERS / WALK THROUGH (feel free to implement on your own rather than use the details below) 
        * use `req.get` to retreive the `Cookie` header from the request
        * check out our readings to parse the names and values out of the cookie header ([MDN on Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies) and [nczonline's article on cookies](https://www.nczonline.net/blog/2009/05/05/http-cookies-explained/))
        * create a property called `hwCookies` on the request object; it should be initialized as an empty object
        * add the names and values parsed from the `Cookie` as properties and values on `req.hwCookies`
        * don't forget to call `next` when you're done!
        * export the function from the module so that it's availabe when `require`'d
5. write a `manageSession` middleware
    * this middleware...
        * checks cookies from the request for a session id
        * tries to retrieve data for that session id from an in-memory (_read: global variable_)
        * if it's not an existing session id (or if no session id came through), generate a new session id and send it back to the browser
    * open up `src/cookied/cookied.js
    * create a function called `manageSession`
    * it should have 3 arguments ([see middleware](../slides/09/middleware.html))
    * when it is done running, `req` should have a property called `hwSession` where data retrieved from the session store is placed
    * additionally, `req.hwSession` should have a property called `sessionId` that stores the current session id (just for debugging purposes)
    * if it generates a session id, the id that it generates should be created by the `uuid` module using `const uuid = require('node-uuid'), then... `uuid.v4()`
    * when it tells the browser to set a session id cookie, the name of the cookie should be `sessionId` and it should be `HttpOnly`
    * it should also log out `session already exists: [session id]` if the middleware found an existing session
    * finally, it should log out `session generated: [session id]` if it creates a new session id
    * SPOILERS / WALK THROUGH (feel free to implement on your own rather than use the details below) 
        * create a global variable in your module; initialize it to an empty object
        * this will be your session store - session ids will be keys, and values will be an object of name / value pairs associated with that session
        * within your `manageSession` function, check if `sessionId` is in `req.hwCookies` and check if that session id exists within your session store
            * if the above conditions are true, we know we can set `req.hwSession` to the data that's in our session store for that session id
        * however, if there is no `sessionId` in `hwCookies` or if the `sessionId` isn't in our session store, then generate a new session id and create an empty object for that ids data in the session store
            * again, `req.hwSession` can be set to the data associated with the id from the session store (Which, of course, is just an empty object)
            * add a `Set-Cookie` header to the response useing `res.append`... so that the browser will send back the session id in every subsequent request
        * finally, add a property called `sessionId` to `req.hwSession` that has a value of the current session id (regardless of whether or not it was an existing id or one that was just generated)
        * don't forget to call `next` when you're done!
        * export the function from the module so that it's availabe when `require`'d
6. when you're done writing your middleware functions, you can test that they all work by running the application (change into the `src/cookied` directory and run `app.js`)
7. when you first go to `localhost:3000`, clear your cookies <br>
    ![clear cookies](/csci-ua.0480-fall2017-007/resources/img/hw05-cookied-01-clear.gif)
8. refresh your page....
9. check that your application is generating session ids
    * when you refresh, you should see your server logging out `session generated`
    * this should be true for first time visits to both pages: `/` and `/preferences`
    * you should also see a `sessionId` in your browser's cookies for `localhost:3000`
    * `/` should show your current session id as well (again for debugging purposes; the session id shouldn't be so readily viewable!)
    * see below for an example: <br>
        ![home generated](/csci-ua.0480-fall2017-007/resources/img/hw05-cookied-02-home-generate.gif)
10. note, however, that once a session is generated... 
    * if you go to the other page ...
    * or refresh again ...
    * your application should log out `session already exists`
    * see below for an example: <br>
        ![found a session](/csci-ua.0480-fall2017-007/resources/img/hw05-cookied-04-found.gif)
11. finally, if you set a color through the `/preferences` page ...
    * that color should be persistent for both pages for that session 
    * which means that opening another browser will have a different color
    * `/` will now show that color is part of the session store
    * see example below: <br>
        ![color](/csci-ua.0480-fall2017-007/resources/img/hw05-cookied-05-color.gif)
12. note that incognito mode will also give you a different session: <br>
    ![incognito](/csci-ua.0480-fall2017-007/resources/img/hw05-cookied-06-incognito.gif)


## Part 2 - Setup for Movies App (Storing Data in a Database)

### Installing MongoDB and Preparing Data

* follow the [install instructions](http://docs.mongodb.org/manual/installation/) for your operating system
* or (recommended), use a package manager, like apt or homebrew (brew install mongodb)
* by default, mongodb does not require a username/password to connect (__!?__), but if you'd like to add authentication [you can follow this guide](https://docs.mongodb.com/manual/tutorial/enable-authentication/) (optional, but recommended)
* in order for you to connect to your database to work with data, your database server must be running
	* for some installations, mongodb will start when your computer starts
	* for other installations, you'll have to start it manually
	* you can test if your database is running by:
		* attempting to connect to the test database
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
* once you're connected with a commandline client (mongo), start inserting documents into a database called <code>hw05</code> and a collection called <code>movies</code>:
	* movies will have a title, year and director
	* so to insert, just do this in the commandline client: <code>db.movies.insert({title:'Los Abrazos Rotos', year:2009, director:'Pedro Almodovar'});</code>
	* (inserting will automatically create the database and collection for you if they don't already exist)
	* insert the following movies:

<pre><code data-trim contenteditable>Stroszek (1977) by Werner Herzog
Fitzcarraldo (1982) by Werner Herzog
Cave of Forgotten Dreams (2010) by Werner Herzog
Me and You and Everyone We Know (2005) by Miranda July
In the Mood for Love (2000) by Wong Kar-wai
Chungking Express (1994) by Wong Kar-wai
Enough Said (2013) by Nicole Holofcener
Walking and Talking (1996) by Nicole Holofcener
Los Abrazos Rotos (2009) by Pedro Almodovar
</code></pre>

* use <code>db.movies.find()</code> to show all of the movies that you've inserted
	* make sure there's _something_ there...
	* so that you know your web app actually has movies to read!
* use <code>ctrl + d</code> to exit the commandline client 
* (make sure you keep your database server running, though)

### Directory Structure and Dependencies

Start your usual express app in `src/movies` by:

* creating an `app.js` file
* installing the appropriate modules and saving them to `package.json` using <code>--save</code> (this should have already been done from the previous parts)  in the root directory of your project
* additionally, install __mongoose__: <code>npm install --save mongoose</code>
* creating the appropriate folders for your templates, public, etc.

### Connect to the Database

Create a file called <code>db.js</code> within `src/movies`. <code>db.js</code> will contain:

* the code to connect to our database
* ...and our Schema and model (which we'll use to access data in our database)

In <code>db.js</code>, add the require for the <code>mongoose</code> module:

<pre><code data-trim contenteditable>var mongoose = require('mongoose') </code></pre>

Leave a placeholder for your schema...

<pre><code data-trim contenteditable>// my schema goes here!</code></pre>

And, finally, add the code that connects to the database. We'll connect to the local instance of MongoDB, and we'll use a database called <code>hw05</code> (this will be created for you once you start inserting documents... which you should have done already above!).

<pre><code data-trim contenteditable>mongoose.connect('mongodb://localhost/hw05');
</code></pre>

Or... with authentication

<pre><code data-trim contenteditable>mongoose.connect('mongodb://username:password@localhost/hw05');
</code></pre>

### Schema 

For larger projects, there is usually one file per schema, all located in a separate folder called models. For now, however, define the following Schema within <code>db.js</code>. Check out the slides on:

* [the MongoDB Demo](../slides/14/mongo.html) 
* [and/or the Mongoose API](../slides/14/mongoose.html) 
* (or alternatively [check out the docs!](http://mongoosejs.com/docs/guide.html))


Since we're storing movies, we'd like each document to have:

* a title (a <code>String</code>)
* a director  (also a  <code>String</code>)
* a year (a <code>Number</code>)

Create a schema based on the above slides, and insert your code under your <code>// my schema goes here!</code> comment.

Then, use your schema to define your model... the model is used as a constructor to create new documents... or as an object with methods that allows the read or update of existing documents. 

You can place the following code after your schema and before the connection (assuming that you're schema looks something like this) so that mongoose is aware that your model exists (it _registers_ our model so that you can retrieve it later):

<pre><code data-trim contenteditable>mongoose.model('Movie', Movie);
</code></pre>

## Part 3 - Displaying All Movies

### Overview

We'll be using mongoose to read in all of the movies from the database. Then, we'll be able to display the movies in a table. 

### Details

There's a bunch of setup that we need in order to integrate our databases access code with our express app:

* in <code>app.js</code>, require the <code>db.js</code> file that you created so that the code that you wrote for the Schema and for connecting to the databases is executed
* at the top of <code>app.js</code>, after you've created your application object: <code>require('./db');</code>
* after that, retrieve the model that you registered with mongoose:

<pre><code data-trim contenteditable>var mongoose = require('mongoose');
var Movie = mongoose.model('Movie');
</code></pre>

You can now use <code>Movie.find</code> to retrieve all of the movies in your database!

* create a route handler that accepts requests for <code>/movies</code>
* in that route handler, the callback should use <code>Movie.find</code> to retrieve all movies!
* <code>find</code> takes an __query object__ (just a regular object) that specifies the criteria for what we're searching for using name/value pairs... for example {year: 1978} would be all movies made in 1978
* if you leave the query object empty, it'll just give back all movies
* the second argument it find is yet another callback... this time, it's the function that's executed when mongoose finishes finding stuff for you
* find works like this:

<pre><code data-trim contenteditable>SomeModel.find({search: criteria}, function(err, varToStoreResult, count) {
	console.log(varToStoreResult); // <---- variable contains found documents!

});
</code></pre>
* so, once you've retrieved stuff from the database, you'll probably want to render your template... so in your callback, call <code>res.render</code>, rendering whatever template you'd like to display your table
* of course, you'll have to pass in your find results so that you can iterate over them in your template
* in your template, use standard <code>table</code> markup, with each row containing a movie
* try opening your page in your browser to show a table of all movies!


## Part 4 - Filtering

### Overview

In this part of the assignment, you'll add a form to your page that allows you to filter the table by director name via GET and query string parameters.

### Details

You already know how to do most of this, but here's a rough sketch of some of the relevant tasks:

* create a form that uses GET, and goes to (submits or makes a request to) <code>/movies</code>
	* note that we don't need <code>body-parser</code> middleware since we're using GET
	* also... why are we using GET instead of POST? because we're merely reading data... (pretty common convention for search)
* modify your request handler to try to get the value of query string parameters (<code>req.query.nameOfFormElement</code>)
	* for example, submitting your form may result in adding a ?foo=bar to the url
	* to access that name/value pair in the query string on the server side, <code>req.query.foo</code>
* use the value passed in from the form (via GET and the query string) to filter the movies by director name

[Check out the example interaction at the end of this page](#examples4)


## Part 5 - Adding a Movie

### Overview

In this part of the assignment, you'll create another page that contains a form to add new movies. The form will POST data... and then redirect back to <code>/movies</code>.

### Details

You already know how to do most of this, but here's a rough sketch of some of the relevant tasks:

* add a link on the bottom of your /movies page
* set up body-parser so that you'll have access to POST data
* create the appropriate route handlers that accepts requests for <code>/movies/add</code>
    * GET will handle showing the form
        * create another template file
        * add a form to your template
    * POST will handle the form submission
        * your request handler that deals with POSTs will create a new movie in the database... [check out the slides](../slides/14/mongo.html) 

[Check out the example interaction at the end of this page](#examples5)

## Part 6 - Sessions 

* create another page, `/mymovies`,  showing all of the movies that have been added by the user during their session (it can be as simple as an unordered list)
* you must use the `express-session` middleware to do this ([see the relevant slides](../slides/10/sessions.html#/17))
* make sure you link to `/mymovies` from both of the existing pages so that the graders can see that you've implemented this feature

<a name="examples"></a>

## Example Interaction

<a name="examples4"></a>
By the end of parts 2-4:

<div markdown="block" class="img">
![let's watch movies](/csci-ua.0480-fall2017-007/resources/img/movies.gif)
</div>

<a name="examples5"></a>
Part 5:

<div markdown="block" class="img">
![let's watch movies](/csci-ua.0480-fall2017-007/resources/img/movies-add.gif)
</div>

</div>

</div>
