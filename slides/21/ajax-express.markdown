---
layout: slides
title: "AJAX and Express"
---
<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## A Quick Review

__What object do we use to make an asycnhronous, HTTP Request in JavaScript?__ &rarr;

__<code>XMLHttpRequest</code>__ (an object that allows browser based JavaScript to make HTTP requests)
{:.fragment}

__Does the result have to be XML?__ &rarr;
{:.fragment}

Nope... it can be:
{:.fragment}

* {:.fragment} (of course, XML)
* {:.fragment} JSON
* {:.fragment} even HTML fragments!
</section>

<section markdown="block">
## Asynchronous JavaScript Requests

__What advantages do we get (from a user interaction perspective) by having JavaScript make asynchronous HTTP requests?__ &rarr;

* rather than request an entirely new page, we can make JavaScript calls to retrieve, create or update data
* this means fewer page reloads
* ui elements change rather than the entire page
* __the application seems more responsive__
{:.fragment}
</section>

<section markdown="block">
## XMLHttpRequest Details

At a high level, what are the steps for using XMLHttpRequest to make a request?

* {:.fragment} __create__ an XMLHttpRequest object
* {:.fragment} __configure__ it with the appropriate request method and url
* {:.fragment} specify what it should do:
	* {:.fragment} __on load__ 
		* {:.fragment} check the status
		* {:.fragment} parse the response text 
	* {:.fragment} __on error__
* {:.fragment} lastly, __send__ the request
</section>

<section markdown="block">
## Create an XMLHttpRequest Object

__How do create an XMLHttpRequest object?__ &rarr; 

Just use the constructor with new:
{:.fragment}

<pre><code data-trim contenteditable>
var req = new XMLHttpRequest();
</code></pre>
{:.fragment}

</section>
<section markdown="block">
## Configure the Request Object

__How do we set the url of the request that we're making? What are some other parts of the request that we can configure?__ &rarr;

The __<code>open</code>__ method allows us to configure our request by setting:
{:.fragment}

* request method (string)
* url (string)
* asynchronous (boolean)
{:.fragment}

<br>
<pre><code data-trim contenteditable>
req.open('GET', url, true);
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## We Have a Response; Now What?

We also have to specify what to do when we get a response. __Name two ways to handle a response.__ &rarr;

* define the __onload__ property of the __XMLHttpRequest__ object
* add a __load__ event listener to the __XMLHttpRequest__ object
{:.fragment}

<br>
<pre><code data-trim contenteditable>
req.onload = function() { 
	console.log('content loaded!');
};

req.addEventListener('load') { 
	console.log('content loaded!');
};
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Working With the Response Data

__What are some typical things that we'll do in our onload / load event handler?__ &rarr;

* {:.fragment} check the __<code>status</code>__ 
* {:.fragment} parse the __<code>responseText</code>__ 

<br>
<pre><code data-trim contenteditable>
if (req.status >= 200 && req.status < 400) {
	data = JSON.parse(req.responseText);
}
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## We Has a Problem

Something always goes wrong...

__We should probably also define what to do if there's an error! How do we do that?__ &rarr;

* define the __onerror__ property of the __XMLHttpRequest__ object
* add an __error__  event listener to the __XMLHttpRequest__ object
{:.fragment}

<br>
<pre><code data-trim contenteditable>
req.onerror = function() { 

};
req.addEventListener('error') {

};
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Making the Actual Request

WHEW! That was a lot of configuration. But we haven't actually sent anything to the server yet. __How do we make the actual request?__ &rarr;

* use the __<code>send()</code>__ method to actually send your request.
* send has an optional argument -- the data that you want send as your request body
	* you'll usually leave out this argument
	* unless you're posting data
* any event listeners you wish to set must be set before calling send()
{:.fragment}

<pre><code data-trim contenteditable>
req.send();
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Repository Viewer (Review)

Another look at the demo that we _may_ have done.... __a GitHub repository viewer__ &rarr;

It has:

* has one text field where you can input a github username
* will list all of that person's pubic repositories when you click on submit
* additionally, has a button to check for rate limit (of course!)


<div markdown="block" class="img">
![github]({{ site.vars.slides_img_prefix }}/github-repo-browser.jpg)
</div>

</section>

<section markdown="block">
## We'll Use GitHub's API!

Where do we get this data? We can get it from __GitHub's API__. GitHub's API is

* accessible cross domain
* does not require a user account / authentication

<br>
Great! But... because we're using their API unauthenticated, we'll have to deal with [rate limits](https://developer.github.com/v3/#rate-limiting) (~60 requests per hours by IP Address). We'll use the following two API end points (URLs) to retrieve data:

* [rate limit status](https://developer.github.com/v3/rate_limit/)
* [list user repos](https://developer.github.com/v3/repos/#list-user-repositories)
* the domain we'll be making requests to is <code>https://api.github.com</code>
</section>

<section markdown="block">
## Reading API Documentation

Typically, API documentation will specify:

* {:.fragment} http request method to use
* {:.fragment} the path to the resource
* {:.fragment} the response format and status code
* {:.fragment} the actual data contained within the response 

<br>
__Let's take a look at the two end points we'll be using.__ &rarr;
{:.fragment}

</section>
<section markdown="block">
## Show Rate Limit Status

The endpoint / URL for retrieving info about the rate limit is:

<pre><code data-trim contenteditable>
GET /rate_limit
</code></pre>

Using this URL with my account: [https://api.github.com/rate_limit](https://api.github.com/rate_limit)

We're interested in resources.core.limit... this is what we get back:

<pre><code data-trim contenteditable>
{
  "resources": {
    "core": {
      "limit": 60,
      "remaining": 58,
      "reset": 1447761547
    },
    "search": {
      "limit": 10,
      "remaining": 10,
      "reset": 1447759711
    }
  },
  "rate": {
    "limit": 60,
    "remaining": 58,
    "reset": 1447761547
  }
}

</code></pre>

</section>

<section markdown="block">
## List User Repos

The endpoint / URL for retrieving repository info from GitHub is:

<pre><code data-trim contenteditable>
GET /:username/repos
</code></pre>

Using this URL with my account: [https://api.github.com/users/foureyes/repos](https://api.github.com/users/foureyes/repos)

We get back...

<pre><code data-trim contenteditable>
[{
"id": 26084780,
"name": "bjorklund",
"full_name": "foureyes/bjorklund",
"owner": { 
	"login": "foureyes",
	"avatar_url": "https://avatars.githubusercontent.com/u/356512?v=3",
	"url": "https://api.github.com/users/foureyes",
	.
	.
},
"private": false,
.
.
}]
</code></pre>
</section>


<section markdown="block">
## Let's Start With Some Markup

We'll need:

* a text input for the username
* a button to submit
* a button to ask for the rate limit
* a place to insert the repository names as a list
* a place to insert the rate limit info

</section>

<section markdown="block">
## Maybe Some Markup Like This?

Here's our HTML:

<pre><code data-trim contenteditable>
&lt;h2&gt;Repository Viewer&lt;/h2&gt;
&lt;input type="button" id="get-rate-limit" name="get-rate-limit" value="Get Rate Limit"&gt;
&lt;pre id="rate-limit"&gt;
&lt;/pre&gt;
&lt;label for="username"&gt;GitHub Username&lt;/label&gt;
&lt;input type="text" id="username" name="username"&gt;
&lt;input type="button" id="get-repos" name="get-repos" value="Get Repositories"&gt;
&lt;div id="container"&gt;
			&lt;ul&gt;&lt;/ul&gt;
&lt;/div&gt;
</code></pre>
</section>

<section markdown="block">
## Setting Up ... Getting Required Elements

__Let's gather the buttons and add event listeners to them.__ &rarr;
<pre><code data-trim contenteditable>
document.addEventListener('DOMContentLoaded', init);

function init() {
	console.log('init');
	var button = document.getElementById('get-repos'),
		rateLimitButton = document.getElementById('get-rate-limit');

	button.addEventListener('click', handleClick);
	rateLimitButton.addEventListener('click', handleRateLimitClick);
}
</code></pre>
</section>

<section markdown="block">
## Handling a Click on the Rate Limit Button

To get the rate limit, we can use the following url [http://api.github.com/rate_limit](http://api.github.com/rate_limit).  __Let's set up the request in our <code>handleRateLimitClick</code> function__ &rarr;

<pre><code data-trim contenteditable>
function handleRateLimitClick() {
	var req = new XMLHttpRequest(),
		url = 'http://api.github.com/rate_limit';

	req.open('GET', url, true);
	req.addEventListener('load', handleRateLimitResponse);
	req.send();
}
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Dealing with the Response

__Let's define a function that populates an element, the pre tag, with the data from the API Limit call.__ &rarr;
<pre><code data-trim contenteditable>
function handleRateLimitResponse() {
	var pre = document.getElementById('rate-limit'), 
		response = JSON.parse(this.responseText);
	if (this.status >= 200 && this.status < 400) {
		pre.textContent = response.rate.limit + ' Limit, ' 
				+ response.rate.remaining + ' Remaining, ' 
				+ new Date(response.rate.reset * 1000);
	}
}
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Now for the Actual Repo Browser...

When clicking view repositories, we should retrieve the repositories for the user in the text field. __First, let's set up our click handler... and configure a request within it.__ &rarr;

<pre><code data-trim contenteditable>
function handleClick(evt) {
	var req = new XMLHttpRequest(),
		url = 'http://api.github.com/users/' + 
			document.getElementById('username').value + '/repos';

	req.open('GET', url, true);
	req.addEventListener('load', handleResponse);
	req.send();
}
</code></pre>
{:.fragment}
</section>


<section markdown="block">
## Lastly, Once we Have the Repository Data....

We can use the response from the API to drop in the repositories. __Create a function that gets called when the data from the request has loaded.__ &rarr;

<pre><code data-trim contenteditable>
function handleResponse() {
	if (this.status >= 200 && this.status < 400) {
		var div = document.getElementById('container'), 
			oldList = document.querySelector('#container ul'),
			ul = document.createElement('ul'),
			repos = JSON.parse(this.responseText);

		repos.forEach(function(obj) {
			ul.appendChild(document.createElement('li')).textContent = obj.name;
		});
		div.replaceChild(ul, oldList);
	}
}
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Cross Domain Requests

__Can your client-side JavaScript application make requests to domains other than the one that your app is on?__ &rarr;

Nope! __Why?__ &rarr;
{:.fragment}

Cross domain requests could allow access to sessions you have on other sites! __But wait, what criteria do we use to determine if our app and our request are coming from the same site (same _origin_)__ &rarr;
{:.fragment}

Same __protocol__, __domain (including subdomain)__, and __port__
{:.fragment}

This __Same Origin Policy__ is implemented by your browser to prevent cross site request forgery.
{:.fragment}
</section>

<section markdown="block">
## Accessing 3rd Party APIs on the Client Side

So... __how were we able to make a request to GitHub's API__? &rarr;

* GitHub set a few headers that let our browser know that it was ok to make the cross domain request
* for example: __Access-Control-Allow-Origin__ specifies a particular allowed origin URL or \* for all
* this is called __Cross Origin Resource Sharing__, or __CORS__
{:.fragment}
</section>

<section markdown="block">
## Creating Our Own API

If we have a bunch of data in our database, and we want to access it via a single page web app or a heavy client-side application, we'll need to make our own API.

__What's an API?__ &rarr;

* it's a set of functions, tools, and protocols for building an application
* (hence the name - Application Programming Interface)
* in the context of this class, we'll use API to refer to:
	* a set of services that we expose via HTTP 
	* ...to allow access to our Express app and data in our database
{:.fragment}
</section>

<section markdown="block">
## Designing Our API, A Base URL

We'll have a base URL to access our API. For example:

<pre><code data-trim contenteditable>
http://my.domain/api
http://api.my.domain
</code></pre>

Optionally, to allow for different versions of our API, it may make sense to add versioning to the URL:

<pre><code data-trim contenteditable>
http://my.domain/api/v1
</code></pre>

</section>

<section markdown="block">
## API Design, Resources

We could think of all of the _things_ in our web app as resources. For example... Users, Lists, Items, Birds.

The path in your URL should reflect this. Generally, the convention is:

For a list of resources

<pre><code data-trim contenteditable>
/resources
</code></pre>

For a single resource

<pre><code data-trim contenteditable>
/resource/id
</code></pre>
</section>

<section markdown="block">
## API Design, HTTP Methods

The actions that we can perform on our resources will be dictated by the HTTP method that's used.

* __GET__ - read or retrieve
* __POST__ - create or add
* __PUT__ - update
* __DELETE__ - delete (didn't see that coming)
</section>

<section markdown="block">
## CHATTY - API Design, Example URLs

Let's design an API for a __naive chat application__. &rarr; It should allow us to: 

* retrieve all messages... 
* and create a message.

<br>
__What HTTP method and URL should we use for the features above?__ &rarr;

<pre><code data-trim contenteditable>
GET  /messages
POST  /message
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## API Design, Format

The URLs from the previous slide respond with some data. We can designate what format that data is in. It could be:

* plain old HTML
* XML
* JSON

<br>
We'll be using JSON - it's widely used and it's easy to work with.

</section>

<section markdown="block">
## Before We Get Started

A few miscellaneous things regarding some tools we'll need. Chat messages are typically displayed in chronological order, __so we'll need to know a few things regarding dates / timestamps__ &rarr;

* JavaScript's date object
* mongo's comparison operators (to compare dates, for example!)

</section>

<section markdown="block">
## JavaScript Date Object

JavaScript has a [<code>Date</code> object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)... __you can create a date by using the Date() constructor__ &rarr;

* without arguments, it represents the current date and time
* it can take a number of optional arguments... 
	* one of these is a date string in this format: <code>new Date('November 17, 2015 09:30:00');</code>
* to get nicely formatted string based on your locale (language, region, etc.) from a date object, you can call the <code>toLocaleTimeString()</code>
* __note that this could be used as a Mongoose Type!__ &rarr;
* You can call a static method, now,  on date to get the current milliseconds since the epoch (we'll be using this when we create documents in mongoose)


</section>

<section markdown="block">
## JavaScript Date Objects Examples

<pre><code data-trim contenteditable>
console.log(Date.now());

var d1 = new Date();
console.log(d1);
console.log(d1.toLocaleString());

var d2 = new Date('November 17, 2015 09:30:00');
console.log(d2.toLocaleString());
</code></pre>

</section>

<section markdown="block">
## Query Comparison Operators

So far, our mongo queries have only asked for documents with property values that match our query values exactly:

<pre><code data-trim contenteditable>
db.stuff.find({foo:bar});
</code></pre>

However, you can also use [operators to perform comparisons, like less than or not equals](https://docs.mongodb.org/v3.0/reference/operator/query-comparison/): 

* <code>$lt</code> - less than
* <code>$gt</code> - greater than
* <code>$ne</code> - not equals

</section>

<section markdown="block">
## Using Query Comparison Operators

To use <code>$lt</code>, <code>$gt</code>, <code>$ne</code>, etc. ...

* rather than {property: value} as your query object...
* use {property: {$operator: value}

<br>
For example, if we had a collection with documents that looked like <code>{name: 'french fries', price: 2.00}</code>:

<pre><code data-trim contenteditable>
> db.food.insert({name: 'french fries', price: 2.00});
WriteResult({ "nInserted" : 1 })
> db.food.insert({name: 'a burrito made of gold', price: 5000.00});
WriteResult({ "nInserted" : 1 })
> db.food.find({price: {$lt: 4}})
{ "_id" : ObjectId("564b2d3ce73ab98f9279ac15"), "name" : "french fries", "price" : 2 }
</code></pre>

{%comment%}
close_
{%endcomment %}
</section>

<section markdown="block">
## Ok. Whew. Back to Chat.

So... now that we know about:

* dates in JavaScript
* comparisons in mongo (and consequently mongoose!)

<br>
__we can start implementing our chat app...__ &rarr;
</section>
<section markdown="block">
## Let's Start with Some Setup

In order to create our API, we'll need:

* an Express app
* database access
* a couple of routes
* (specifically routes that return JSON)
</section>

<section markdown="block">
## Returning JSON from Express

Instead of calling res.render to put together a template/view, you can call the __<code>json</code>__ method on the response object to send back (surprise) json!

* just pass in an Array or Object
* Express will convert it to JSON
* it'll also set the appropriate headers for you: <code>Content-Type:application/json</code>
* __Let's give it a try__ &rarr;

<br>
<pre><code data-trim contenteditable>
router.get('/json', function(req, res) {
  res.json({foo: 'bar'});
});
</code></pre>
</section>

<section markdown="block">
## Let's Create a Schema

__How do we set up our database and create a Schema for a message document that just contains text and a date?__ &rarr;

In db.js:
{:.fragment}

<pre><code data-trim contenteditable>
var mongoose = require('mongoose');
URLSlugs = require('mongoose-url-slugs');

var Message = new mongoose.Schema({
	text: String,
	dateSent: Date
});

mongoose.model('Message', Message);
mongoose.connect('mongodb://localhost/jaxindb/');
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Oh Yes, Remember to Require

Don't forget to include db.js in your app.js file:

<pre><code data-trim contenteditable>
require('./db');
</code></pre>

Do this at the top of app.js, otherwise your connection won't run, and your models won't be registered.
</section>

<section markdown="block">
## A Route Handler That Exposes the API

__Let's create a route handler in index.js that retrieves all messages from the database and sends it back as JSON__ &rarr;

<pre><code data-trim contenteditable>
var mongoose = require('mongoose');
var Message = mongoose.model('Message');
</code></pre>
{:.fragment}

<pre><code data-trim contenteditable>
router.get('/api/messages', function(req, res) {
  Message.find({}, function(err, messages, count) {
    res.json(messages.map(function(ele) {
      return {
        'message': ele.text,
        'date': ele.dateSent
      }; 
    }));
  });
});
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Test Out Your API

Use Curl or your browser to request the following URL:

<pre><code data-trim contenteditable>
http://localhost:3000/api/messages
</code></pre>

* you should get json back
* you should see the appropriate headers: Content-Type should be application/json
</section>

<section markdown="block">
## On the Client Side, It's Our Usual Display


Assuming we're adding to an element with an id = messageList:

<pre><code data-trim contenteditable>
var req = new XMLHttpRequest(),
url = 'http://localhost:3000/api/messages';
req.open('GET', url, true);
</code></pre>
{:.fragment}

<pre><code data-trim contenteditable>
req.addEventListener('load', function() {
	if (req.status >= 200 && req.status < 400){
		data = JSON.parse(req.responseText);
    	messageList = document.getElementById('message-list');
		data.forEach(function(msg) {
			var div = messageList.appendChild(document.createElement('div'));
			div.textContent = (new Date(msg.date)).toLocaleString() + ' - ' + msg.message;
		});
	} });
</code></pre>
{:.fragment}

<pre><code data-trim contenteditable>
req.send()
</code></pre>
{:.fragment}
</section>


<section markdown="block">
# Reading was a Breeze, What About Adding a New Message?
</section>

<section markdown="block">
## Creating Messages

__What URL and method should we use for creating a single message?__ &rarr;

<pre><code data-trim contenteditable>
POST /message
</code></pre>

</section>

<section markdown="block">
## Let's Start off With Handling Our Post

__How do we create a route that accepts a POST... and creates a new Message based on that POST?__ &rarr;

(let's return the id of the object created as JSON)

<pre><code data-trim contenteditable>
router.post('/api/messages/', function(req, res) {
  var message = new Message({
    text: req.body.message,
    dateSent: Date.now()
  });
  message.save(function(err, saved_message, count) {
    if (err) { return res.send(500, 'Error occurred: database error.'); }
    res.json({id:saved_message._id});
  });
});
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## A Few Things to Note 

__In the previous slide, we saw:__ &rarr;

* __Date.now()__ .... number of milliseconds since 1/1/1970 (unix epoch time)
* notice the manual call to __res.send__ ... so we can send back a 500
* additionally, there's a return there to end the function
</section>

<section markdown="block">
## Client Side Code for POSTs

* we'll need to specify POST for our XMLHttpRequest
* we'll also need to send the data through the request's body
* lastly, have to specify the appropriate content type
* (this is done by setting the Content-Type header)

</section>

<section markdown="block">
## setRequestHeader

We can set arbitrary headers using the setRequestHeader method on our XMLHttpRequest object.

It takes two parameters:

* header
* value

<br>
For example, we'll use the following for our form submission:

<pre><code data-trim contenteditable>
req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
</code></pre>
</section>

<section markdown="block">
## send Revisited

In order to send data with our request, we have to pass in an argument to send when we call it.

The argument is a url encoded string of name value pairs. For example:


<pre><code data-trim contenteditable>
req.send('name1=val1&name2=val2');
</code></pre>

In our case, it would look something like this:

<pre><code data-trim contenteditable>
req.send('message=' + message);
</code></pre>
</section>

<section markdown="block">
## Getting a Form Element's Value

As we saw in previous classes, there are some conventional attributes that we can access as properties on elements. 

The following example grabs the value from a text input with an id of message:

<pre><code data-trim contenteditable>
var message = document.getElementById('message').value;
</code></pre>
</section>

<section markdown="block">
## All Together for POST

__Now that we have all of the building blocks, we can put together our request.__ &rarr;

<pre><code data-trim contenteditable>
var message = document.getElementById('message').value;
var req= new XMLHttpRequest();
req.open('POST', 'http://localhost:3000/api/message', true);
req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
req.send('message=' + message);
</code></pre>
</section>

<section markdown="block">
# Demo Time - Faking Real-Time Chat

</section>

<section markdown="block">
## Chat Implementation

__How do you think we could fake realtime chat with what we currently have?__ &rarr; (we pretty much know everything we need to be able to put this together).

* just a lot of requests!
* (polling)
* using XMLHttpRequeset along with setTimeout, of course
{:.fragment}
</section>

<section markdown="block">
## Some Fancy Mongo Querying

Actually, there is _some_ additional stuff that we have to know.

We can use $gt in our query object to filter results that are greater than some value.

<pre><code data-trim contenteditable>
{sentDate {$gt:new Date(someDateString)}};
</code></pre>

We can also sort by a property by calling sort after find, and chaining an exec call to specify a callback:

<pre><code data-trim contenteditable>
Message.find(q).sort('dateSent').exec(callback)
</code></pre>

(this was actually in the auth demo project for populating related records)

</section>

<section markdown="block">
## A Revised GET Route Handler

__Let's use sorting and filtering by &gt to amend our api so that it accepts a query parameter called lastRetrievalDate.__ &rarr;

We can filter by that to only get _recent_ messages.

<pre><code data-trim contenteditable>
router.get('/api/messages', function(req, res) {
  console.log(req.query.lastRetrievalDate);

  var q = {};
  if (req.query.lastRetrievalDate) {
    q.dateSent = {$gt:new Date(req.query.lastRetrievalDate)};
    console.log(q);
  }

  Message.find(q).sort('dateSent').exec(function(err, messages, count) {
    console.log('messages:', messages);
    console.log('err:', err);
    res.json(messages.map(function(ele) {
      return {
        'message': ele.text,
        'date': ele.dateSent
      }; 
    }));
  });
});
</code></pre>
</section>

<section markdown="block">
## Client Side

On the client side, we'll add some timing so that we only need to retrieve messages since the one that we last saw:

<pre><code data-trim contenteditable>
var lastRetrievalDate, 
    timer, 
    delay = 1000;

document.addEventListener("DOMContentLoaded", getMessages);
document.querySelector('input[type=button]').addEventListener("click", sendMessage);

function sendMessage() {
	var message = document.getElementById('message').value;
	console.log('sending message', message);
	var req= new XMLHttpRequest();
	req.open('POST', 'http://localhost:3000/api/messages/create', true);
	req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	req.send('message=' + message);
	req.addEventListener('load', function(eve) {
    clearTimeout(timer);
		getMessages();
	});
}

</code></pre>
</section>

<section markdown="block">
## Client Side Continued

<pre><code data-trim contenteditable>
function getMessages() {
	var req = new XMLHttpRequest(),

  url = 'http://localhost:3000/api/messages';

  console.log(lastRetrievalDate);
  if (lastRetrievalDate) {
    url += '?lastRetrievalDate=' + lastRetrievalDate;
  }
	req.open('GET', url, true);

	// place event listeners here	

	req.send();
}

</code></pre>
</section>

<section markdown="block">
## Event Listeners

<pre><code data-trim contenteditable>
  req.addEventListener('load', function() {
    if (req.status >= 200 && req.status < 400){
      data = JSON.parse(req.responseText);
      messageList = document.getElementById('message-list');
      data.forEach(function(msg) {
        var div = messageList.appendChild(document.createElement('div'));
        div.textContent = (new Date(msg.date)).toLocaleString() + ' - ' + msg.message;
      });
      console.log(data);
      if(data.length >= 1) { 
        lastRetrievalDate = data[data.length - 1].date;
      }
      timer = setTimeout(getMessages, delay);
    } else {
      console.log(req.status);
    }
  });
</code></pre>

</section>
<section markdown="block">
## Handling an Error

<pre><code data-trim contenteditable>
  req.addEventListener('error', function() {
    console.log('uh-oh... network error or cross domain request');
  });
</code></pre>
</section>


