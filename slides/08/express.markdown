---
layout: slides
title: "Express"
---
<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>
<section markdown="block">
## So... We Learned About Node's HTTP Module

It was little bit low level. __What were some objects that we looked at?__ &rarr;

* the [http module](http://nodejs.org/api/http.html#http_http) itself
* the [Server object](http://nodejs.org/api/http.html#http_class_http_server)
* the [IncomingMessage object](http://nodejs.org/api/http.html#http_http_incomingmessage) (the request object)
* the [ServerResponse object](http://nodejs.org/api/http.html#http_class_http_serverresponse)
</section>


<section markdown="block">
## Creating a Web Server

__We brought up a web server and served some simple static pages by...__ &rarr;

1. {:.fragment} creating a Server object that listens on a particular port
2. {:.fragment} specifying a function to be called when a request event is triggered
3. {:.fragment} using the passed in request and response objects in the callback to create a response

<br>
</section>
<section markdown="block">
## Setting Up

To create a Server object that 

* listens on port 3000
* has callback, a _request handler_, bound to a request event

<br>
... __We needed to do two things__ &rarr;

<pre><code data-trim contenteditable>
// bring in the http module
const http = require('http')

// create a server object that listens on port 3000
// ...and bind the handleRequest function to a requeset event
http.createServer(handleRequest).listen(3000)
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Handling Requests

We created a callback function to handle requests. __What were the two arguments that it could take?__ &rarr;

* a Request object (we named this <code>req</code>)
* a Response object (we named this <code>res</code>)
{:.fragment}

<br>
<pre><code data-trim contenteditable>
function handleRequest(req, res) { ... } 
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## The Request (IncomingMessage) Object

__What did we use the IncomingMessage (_request_) object for?__ &rarr;

We mainly just used it to determine what url the client was attempting to request:
{:.fragment}

<code>if(req.url == '/') .. </code>
{:.fragment}
</section>

<section markdown="block">
## The Response Object

__What did we use the Response object for?__ &rarr;

We used it to send back the response headers and body. __What were two methods that we used on it?__ &rarr;
{:.fragment}

* writeHead(status, headers)
* end(body)
{:.fragment}

<pre><code data-trim contenteditable>
res.writehead(200, {'content-type':'text/plain'});
res.end('hello');
</code></pre>
{:.fragment}
</section>

<section markdown="block">
##  It Looks a Little Something Like This:

__So, all together__ ...

<pre><code data-trim contenteditable>
const http = require('http');

http.createServer(handleRequest).listen(3000);
console.log('starting server on port 3000';

function handleRequest(req, res) {
	if(req.url == '/') {
		res.writehead(200, {'content-type':'text/plain'});
		res.end('hello');
	} else {
		res.writeHead(404, {'Content-Type':'text/plain'});
		res.end('Not Found');

	}
}
</code></pre>
</section>

<section markdown="block">
## Serving Static Files

We modified our program so that it served static files. __How did we do that (what module and method did we use?)__ &rarr;

We used the <code>fs</code> module.
{:.fragment}

...and we used the <code>readFile</code> method, which takes a path and a callback.
{:.fragment}

<pre><code data-trim contenteditable>
// within our serveStatic function
fs.readFile(path, function(err, data) { ... });
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## serveStatic

Our <code>serveStatic</code> function did two things:

1. attempted to read the contents of a file...
2. and when it finished, it would send back an HTTP response

<pre><code data-trim contenteditable>
function serveStatic(res, path, contentType, resCode) {
	fs.readFile(path, function(err, data) {
		if (err) {
			res.writeHead(500, { 'Content-Type': 'text/plain' }); 
			res.end('500 - Internal Error');
		} else {
			res.writeHead(resCode, { 'Content-Type': contentType }); 
			res.end(data);
		}
	});
}
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Using serveStatic 

We modified our request handling callback to use our new <code>serveStatic</code> function instead of sending back a response directly.

<pre><code data-trim contenteditable>
function handleRequest(req, res) {
	if (req.url === '/') {
		serveStatic(res, './public/index.html', 'text/html', 200);
	} else if (req.url === '/about') {
		serveStatic(res, './public/about.html', 'text/html', 200);
	}
	// remainder of function definition omitted for brevity
}
</code></pre>
</section>

<section markdown="block">
# That Wasn't So Bad

### (At least it was better than the net module, right?)
</section>

<section markdown="block">
## Some Shortcomings

__Well... maybe some if it was not so great. What were some challenges in writing that program, and what were some missing features?__ &rarr;

* the URLs are pretty brittle; they don't handle trailing slashes, query strings, etc. ... without _a lot_ of work
* for every response... 
	* we have to set the status code
	* as well as the content-type headers
	* a bit of a pain (accommodating all of the possible assets that could served, such as images, css, video, etc.)
* the files are read from the disk every time (no caching)
* _there's a lot of manual work in general_
{:.fragment}
</section>

<section markdown="block">
## A Little Help

Let's use a __server side web framework__. A __web framework__ is a set of tools, libraries or software that reduces the overhead of developing web applications.  

__Some features that a web framework may provide are:__ &rarr;

* __templating__ - to keep logic out of your presentation
* __routing__ - for mapping urls to pages/functionality
* __middleware__ - a pipeline of functions to manipulate and work with the request and response
* __database access__ - an abstraction layer for dealing with databases
* __general project structure__ - a standard way for organizing your project
{:.fragment}
</section>

<section markdown="block">
## Web Frameworks

Web frameworks can be very featureful:

* providing everything for you from database access to templating... 
* and even dictating your project layout
* (these tend to be larger, and occasionally more complex)

<br>
Web frameworks can also be very minimal: 

* only providing a small amount of core functionality 
* ... and leaving other features to be integrated piecemeal as needed
* (these tend to be smaller, and more bare bones)

<br>
__Web frameworks can generally be categorized in this manner, or fall somewhere inbetween.__
</section>

<section markdown="block">
## Some Popular Web Frameworks

There are a lot of options for web frameworks, and they vary by language:

* __ruby__ - rails, __sinatra__
* __python__ - django, __flask__
* __PHP__ - laravel, symfony, __slim__
* __node__ - __express__

<br>
The highlighted ones are __microframeworks__.
</section>
<section markdown="block">
## Microframeworks

Generally, a microframework, or a minimal web framework:

* has a __simple, but extensible__ set of core functionality
* __won't make too many design decisions__ for you (and the ones that are made are usually changeable)
* leaves many features up to the developer (and usually relies on third-party tools and libraries for those features)
* __maybe even fits in a single file!__

</section>

<section markdown="block">
# We're Using Express, a "minimal and flexible Node.js web application framework"

</section>
<section markdown="block">
## Express

We'll be using __Express 4__. __A little bit about Express...__ &rarr;

* __built on top of node__ and node's <code>http</code> module
* you'll find some __familiar__ (but augmented) objects, like __request__ and __response__
* __minimal__, more like sinatra or flask rather than rails or django
* __flexible__ - your project layout is up to you, you choose what features you'd like integrated, etc.
</section>

<section markdown="block">
##  Express 4 Features

Some features that Express comes with:

* extends request and response objects
	* <code>response.sendFile</code>
	* <code>response.redirect</code>
	* <code>request.ip</code>
	* etc.
* routing
* views and templating
* middleware
* scaffolding

Some things that Express doesn't do (on its own):

* database access (we'll have to bring in another module for that)
* no opinion on how your project is structured - it's up to you to make it as organized or _unorganized_ as you want!
</section>

<section markdown="block">
## When to Use Express

Some use cases for express

* an API
* an API backed single page web app
* a traditional html page based app
* a hybrid single page web app / traditional app
</section>

<section markdown="block">
## Installing Express

__How do we install express?__ &rarr;

<pre><code data-trim contenteditable>
npm install express
</code></pre>
{:.fragment}

__What if we want to save it as a dependency of our project?__ &rarr;
{:.fragment}

<pre><code data-trim contenteditable>
// if you don't already have a package.json
npm init

// install express and save dependency to package.json
npm install express --save
</code></pre>
{:.fragment}
</section>

<section markdown="block">
# A Reminder, We're Using Express 4

</section>
<section markdown="block">
## A Simple Express Program

Hello World
<pre><code data-trim contenteditable>
const express = require('express');
const app = express();

app.get('/', function(req, res){
	res.send('hello');
});

app.listen(3000);
console.log('Started server on port 3000');
</code></pre>
</section>

<section markdown="block">
## Another URL

__Let's try adding another url. The URL should be /faq.__ &rarr;

<pre><code data-trim contenteditable>
app.get('/faq', function(req, res) {
	res.send('you has q, i has answer');
});
</code></pre>
{:.fragment}

</section>
<section markdown="block">
## Testing it Out...

__Try navigating to your app with...__ &rarr;

* <code>http://localhost:3000/</code>
* <code>http://localhost:3000/faq</code>
* <code>http://localhost:3000/faq?question=1</code>
* <code>http://localhost:3000/faq/</code>
* <code>http://localhost:3000/faQ</code>
* <code>http://localhost:3000/nope</code>

__What are some differences with our previous implementation using only node's http module?__ &rarr;

* trailing slashes and query strings work
* case insensitive
* content type is set implicitly to text/html
* 404's built in
{:.fragment}
</section>

<section markdown="block">
## Line by Line

<pre><code data-trim contenteditable>
// require the express module
const express = require('express');

// create our express app
const app = express();
</code></pre>
<pre><code data-trim contenteditable>
// use a router to bind a callback, a request handler
// to a particular url
app.get('/', function(req, res){

	// sends back a response; that is all
	res.send('hello');
});
</code></pre>
<pre><code data-trim contenteditable>
// listen on port 3000
app.listen(3000);
console.log('Started server on port 3000');
</code></pre>
</section>

<section markdown="block">
## express() and VERB()

__express()__ - creates a new express application

* allows for configuration
* takes on functionality of Server object in http module only example
* note that you can call some methods on it based on http verbs (_request methods_)

<br>
__app.VERB(path, [callback]..., callback)__ - defines routes

* verb is an HTTP request method (such as <code>get</code>)
* maps a url to a callback (or multiple callback functions)
* path is case insensitive, can have trailing slash and query string
</section>

<section markdown="block">
## send() and set()

__res.send([body])__ - send a response

* sends all set headers
* if the body is a string, content type is set to <code>text/html</code>
* if the body is an object or an array, content type is set to <code>application/json</code>

<br>
Of course, you can still manipulate headers before sending...

__res.set()__ - set a response header

</section>
<section markdown="block">
## Serving Static Files

This code will allow __any__ file found in the public directory in your project to be served as a static file!

<pre><code data-trim contenteditable>
const path = require("path");

const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));
</code></pre>
<!--__ -->
No more individual urls (YES!)
</section>

<section markdown="block">
## Path and Static Middleware

Use the path module to create a path that specifies where your static files are located.

<pre><code data-trim contenteditable>
// bring in the path module
const path = require("path");

// create a cross-platform compatible path name (don't just use public)
const publicPath = path.resolve(__dirname, "public");
</code></pre>
<!--__ -->

Use the built-in __static files__ middleware to serve up any file in <code>publicPath</code>

<pre><code data-trim contenteditable>
app.use(express.static(publicPath));
</code></pre>
</section>

<section markdown="block">
# Let's Try Serving Some Static Files

### Remember to _actually_ create the public directory
</section>

<section markdown="block">
## Generating / Rendering HTML

Serving flat HTML files is nice and all, but __is it adequate for building all _sorts_ of web applications__? &rarr;

Well, we want to serve __dynamic content__. That is, our web application will be generating html on-the-fly.  
{:.fragment}

__To do this, we'll need a way to:__ &rarr; 
{:.fragment}

1. {:.fragment} create templates that content can be dropped into
2. {:.fragment} ...and render those templates into an html document (or whatever format your application requires)
</section>

<section markdown="block">
## Templating

There are many templating solutions that we can use, both on the server side and the client side.

* __jade/pug__ comes with express, and it has a meta language for writing html!
    * terse syntax based on indentation (no closing tags!)
    * _very_ quick to write, but you have to learn a lot more new syntax
* __handlebars__ is based off of a basic templating language called mustache
    * it's basically just html
    * with some special _tokens_ for inserting data


</section>

<section markdown="block">
# We'll be using handlebars.

(slightly less to learn ... but __definitely feel free to use jade/pug instead__)

</section>

<section markdown="block">
## Handlebars

First, install the express handlebars module: 

<pre><code data-trim contenteditable>
npm install hbs --save
</code></pre>
<br>

And in your code, bring in handlebars for templating:

<pre><code data-trim contenteditable>
app.set('view engine', 'hbs');
</code></pre>
<br>

Render a template!

<pre><code data-trim contenteditable>
res.render('index', { "greeting":"HELLLOOOO" });
</code></pre>

</section>

<section markdown="block">
## Layouts

In <code>views/layout.hbs</code> ...

(Notice 3 curly braces!)

<pre><code data-trim contenteditable>
<!-- surrounding html -->
{{ "{{{ body " }}}}}
<!-- surrounding html -->
</code></pre>
</section>

<section markdown="block">
## Templates

In <code>views/viewname.hbs</code> ... drop in your content

<pre><code data-trim contenteditable>
{{ "{{ greeting " }}}} world!
</code></pre>
</section>

