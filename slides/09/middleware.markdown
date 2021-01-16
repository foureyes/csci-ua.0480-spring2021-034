---
layout: slides
title: "Middleware"
---
<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## Middleware

From the [Express docs](http://expressjs.com/api.html#middleware)...

> A __middleware__ is a function with access to the request object (req), the response object (res), and the next middleware in line in the request-response cycle of an Express application.

* {:.fragment} invoked before your final request handler is
* {:.fragment} (between the raw request and the final intended route)
* {:.fragment} called in order that they are added
</section>

<section markdown="block">
## What's That Mean?

Again, but with more details.

* __middleware__ is  _just_ a __function__
* it's a function that has three parameters: 
	* a __request__ object (usually <code>req</code>)
	* a __response__ object (usually <code>res</code>)
	* and the __next middleware function__ to be executed (conveniently called <code>next</code>)
</section>

<section markdown="block">
# Hey. That Sounds Familiar. __Isn't That the Same As...__ &rarr;

</section>

<section markdown="block">
## It's All Just Middleware

This should sound pretty familiar to you. __It's the same kind of function that we pass to our <code>app.VERB</code> methods.__

<pre><code data-trim contenteditable>
app.get('/', function(req, res) {
	res.send('Familiar, no?');
});
</code></pre>

* the callback functions that we pass as arguments to these methods behave just like middleware
* it turns out, __Express apps are just a bunch of middleware chained together and called sequentially__
</section>

<section markdown="block">
# "An Express application is essentially a stack of middleware which are executed serially."
</section>

<section markdown="block">
## Using Middleware

Middleware can be: 

* __application__ - executed for the entire application
* or __router level__ - only executed for a specific path

<br>
You can use middleware simply by calling the aptly named:

<pre><code data-trim contenteditable>
// for the whole application:
app.use(yourMiddleWareFunction);

// or... for a specific path:
app.use('path', yourMiddleWareFunction);
</code></pre>

</section>

<section markdown="block">
## So... I'm Using Some Middleware

__Can I have multiple middleware?__ &rarr;

The fact that there's a <code>next</code> parameter implies... __YES!__
{:.fragment}

__But what order is the middelware executed in?__ &rarr;
{:.fragment}

* middleware functions are executed sequentially in the request-response cycle
* ...which means that the order that middleware is included is significant!
{:.fragment}
</section>

<section markdown="block">
# Middleware Functions are executed in the order of their inclusion!

</section>

<section markdown="block">
## Let's Try Creating Your Own Middleware 

So, you say you want to make your own middleware, eh? __What can you do in your fancy middleware function?__ &rarr;

* you can execute any code you want in your middleware (_anything your heart desires!_)
* because they have access to the request and response, they could change those objects before it gets to your routing (__!!!__)
* they could also end the whole request-response cycle by sending a response immediately
* or they could call the next middleware in the stack
{:.fragment}

<br>
__Ohhhh. Is there a danger with calling render or send in middleware then?__ &rarr;
{:.fragment}

You can end up skipping other chained middleware.
{:.fragment}
</section>

<section markdown="block">
## Calling Next

Furthermore, if the current middleware doesn't end the request-response cycle, it should really __remember to call <code>next()</code>__. __What will happen if it doesn't?__  &rarr;

* a response will never be sent
* the request will be left hanging
* (nothing good)
{:.fragment}
</section>

<section markdown="block">
## Let's Build Some Hello World Middleware

__Create middleware that always logs the word 'hello' for every request.__ &rarr;

<pre><code data-trim contenteditable>
app.use(function(req, res, next) {
	console.log('hello');
	next();
});
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## How About Some Useful Middleware, Please!

__Create middleware that always logs the request's method and path.__ &rarr;

<pre><code data-trim contenteditable>
app.use(function(req, res, next) {
	console.log(req.method, req.path);
	next();
});
</code></pre>
{:.fragment}

(__also... let's play around with ordering.__ &rarr;)
</section>

<section markdown="block">
## One Last Custom Middleware

__Does anyone remember a _response_ header that identifies the type of server that's being run?__ &rarr;

<pre><code data-trim contenteditable>
Server:Apache/2.2.22 (Ubuntu)
</code></pre>
{:.fragment}

__How about we set our own <code>Server</code> response header?__ 
{:.fragment}

We can use <code>res.set(headerName, headerValue)</code>.
{:.fragment}

<pre><code data-trim contenteditable>
app.use(function(req, res, next) {
	res.set('Server', 'MY AMAZING SUPER COOL SERVER');
	next();
});
</code></pre>
{:.fragment}
</section>
<section markdown="block">
## About That...

__Actually, most people try to suppress or remove that Server header. Why?__ &rarr;

Security through obscurity!
{:.fragment}

* maybe it's better if you don't reveal anything about your technology or infrastructure
* (what if there were known exploits for a specific version of the web server that you're running?)
{:.fragment}
</section>

<section markdown="block">
## All Together (If You Were Curious)

<pre><code data-trim contenteditable>
const express = require('express');
const app = express();
</code></pre>
<pre><code data-trim contenteditable>
app.use(function(req, res, next) {
	console.log(req.method, req.path);
	next();
});
</code></pre>
<pre><code data-trim contenteditable>
app.use(function(req, res, next) {
	console.log('hello');
	next();
});
</code></pre>
<pre><code data-trim contenteditable>
app.use(function(req, res, next) {
	res.set('Server', 'MY AMAZING SUPER COOL SERVER');
	next();
});
</code></pre>
<pre><code data-trim contenteditable>
app.get('/', function(req, res) {
	res.send('We\'re done here');
});
</code></pre>
<pre><code data-trim contenteditable>
app.listen(3000);
</code></pre>
</section>

<section markdown="block">
## Pre-Made Middleware

Hey. So... DIY is cool and all, but making our own middleware seems like _a lot_ of work. __Are there any pre-built middleware out there? (hint we've used one, and we've seen others)__ &rarr;

Some middleware that we've either seen or actually used:
{:.fragment}

* __static files__ 
* __bodyparser__
{:.fragment}
</section>

<section markdown="block">
## The Static File Middleware

__What do you think the static file middleware does? How does it work in the request-response life cycle?__ &rarr;

* it checks the path in the incoming request
* tries to find if the file exists in the file system
* if it doesn't, it calls the next middleware (so if the path is not there, it'll drop through to your routes)
* [more info in the docs](http://expressjs.com/api.html#express.static)
{:.fragment}
</section>

<section markdown="block">
## Using the Static File Middleware

__How do we actually use the static file middleware?__ &rarr;

* (there's nothing to install, it's bundled with express)
* you only need to specify your public directory (but you could be _courteous_ about it)
{:.fragment}

<pre><code data-trim contenteditable>
app.use(express.static('public'));
</code></pre>
{:.fragment}

<pre><code data-trim contenteditable>
const path = require('path');
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static('public'));
</code></pre>
{:.fragment}

<!--__ -->
</section>

<section markdown="block">
## Playing Well With Others

__By the way... if we were using our logging middleware from before, how do we make sure that requests handled by the static file middleware are actually logged?__ &rarr;

Just make sure that logging is included (<code>app.use</code>) before static files.
{:.fragment}
</section>

<section markdown="block">
## Body Parser

The body parser middleware:

* parses the body (_of course_) of a request object... __why does a request body need parsing?__ &rarr;
	* {:.fragment} it's probably encoded
	* {:.fragment} it's probably compressed
* {:.fragment} body parser gives you access to a compressed and encoded body as JavaScript object 
	* {:.fragment} we'll mostly use it for urlencoded strings
	* {:.fragment} <code>app.use(express.urlencoded({ extended: false }));</code>
* {:.fragment} [more info in the docs](https://github.com/expressjs/body-parser)
</section>

<section markdown="block">
# Ahhhh. So Why? What kind of request actually has data in the body? 
</section>


<section markdown="block">
## POST Requests

__POST__ requests send their data in the body. __How can we issue a POST request?__ &rarr;

* forms
* (actually, we can also do it with CURL, Chrome apps/plugins, programmatic clients, like <code>request</code>)
{:.fragment}

<br>
__Sooooo... maybe it's time to figure out what this form thing is all about.__ &rarr;
{:.fragment}
</section>
