---
layout: slides
title: "AJAX"
---

<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>


<section markdown="block">
## Writing an Express App

We've made a couple of dynamic, database driven web applications. 

__How did they work? What made the request? How was the response generated? What did the response consist of?__ &rarr;

1. {:.fragment} the browser would make some request based on url entered, a clicked link or a submitted form
2. {:.fragment} our Express application would respond to that request by:
	1. getting or writing data to the database
	2. using resulting data to fill out a template
	3. sending back html in the response body
3. {:.fragment} the browser would render the resulting html page
</section>
<section markdown="block">
## A High Level View

Let's make a quick diagram of how that all worked. __A run-of-the-mill database driven web application.__ &rarr;

<div markdown="block" class="img">

![html]({{ site.vars.slides_img_prefix }}/html-small.png)

</div>
{:.fragment}
</section>

<section markdown="block">
## _Traditional_ Web Applications

__We've made _traditional_ web applications.__ 

* {:.fragment} the application itself is __mostly server-side__; the client side is usually just presentation
* {:.fragment} __it's typical for most interactions to result in another page being loaded entirely (or in the same page being refreshed)__.
* {:.fragment} sometimes, you have to __wait a little bit__ for the next page (bummer)
* {:.fragment} this is kind of expected behavior, though. After all, the web _is just_ a bunch of interconnected documents, right?

<br>

__How does this user experience differ from _native_ desktop and mobile apps?__ &rarr;
{:.fragment}

* generally speaking, desktop and mobile apps _seem more real time_
* there's no waiting for a page to load; it _just_ happens
{:.fragment}
</section>

<section markdown="block">
## Single Page / Hybrid Web Applications

__Another way to deliver a web application is as a single page:__

* in this type of application, a single page is loaded 
* appropriate data and resources are added to the page as necessary (usually in response to user interactions)
	* __without the page reloading__
	* __without transferring control to another page__
* the majority of the application itself is on the client side, and the server acts as a simple data store
* which results in a faster and more responsive user experiences (again, similar to a desktop or mobile application)
{:.fragment}
</section>

<section markdown="block">
## Single Page / Hybrid Web Applications Continued

__How do you think this is achieved? What processes would need to take place?__ &rarr;

* while on a page, the user can trigger background requests to the server through certain interactions
* the server sends back data rather than an html document...
* when these requests return they augment or modify the page that the user is on
* consequently, the page does not reload, but ui elements change based on the interaction
{:.fragment}
<br>
__This is possible using combination of client side technologies, commonly called AJAX...__ &rarr; 
{:.fragment}
</section>
<section markdown="block">
## AJAX

__AJAX__ is short for asynchronous JavaScript and XML. It's basically a bunch of interrelated technologies and techniques used to create _asynchronous_ web applications:

1. {:.fragment} HTML and CSS for presentation
2. {:.fragment} __JS__ and access to the __DOM__ to create dynamic user interfaces
3. {:.fragment} __JS and XMLHttpRequest__ (or the new [fetch api](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)) to allow asynchronous data exchange between browser and server
4. {:.fragment} __Server side applications__ to allow reading and writing of data
5. {:.fragment} __JSON__ as a convenient and flexible data format
	* {:.fragment} the XML part of the name is a misnomer, as the data format can be anything else, such as JSON or even HTML fragments!
	* {:.fragment} sometimes you may run into other funny acronyms to accommodate this ([AJAJ](http://en.wikipedia.org/wiki/AJAJ) comes to mind)

</section>

<section markdown="block">
## AJAX - a High Level View

__Let's draw out how all of these technologies may come together as a single page web app...__ &rarr;

<div markdown="block" class="img">

![ajax]({{ site.vars.slides_img_prefix }}/ajax-small.png)

</div>
{:.fragment}

</section>

<section markdown="block">
## Putting Everything Together / The Missing Ingredient

When these technologies are combined, our client side web applications can make incremental updates to the user interface without reloading the entire page. Great!

__We know most of these technologies. What's missing?__ &rarr;

* {:.fragment} <strike>HTML and CSS</strike> (most of you already knew this coming into class, and we did a quick review)
* {:.fragment} <strike>JavaScript and access to the DOM</strike> (we went over this _a lot_)
* {:.fragment} <strike>Server side applications</strike> (Express)
* {:.fragment} <strike>JSON</strike> 
* {:.fragment} however, we have yet to look at __XMLHttpRequest__ 
</section>

<section markdown="block">
## HTTP Requests

Hey. So. __Remember that time when we actually used some Server Side Javascript to make HTTP Requests?__ &rarr;

* we used the _request_ module to issue asynchronous http requests from Node
* (specifically, we saw it in the basketball homework assignment)
* note that it's a __server side__ module
{:.fragment}

</section>
<section markdown="block">
## XMLHttpRequest

In client-side JavaScript, there's a feature analogous to the request module. 

__<code>XMLHttpRequest</code>__ is JavaScript object that allows browser based JavaScript to make http requests!

* it provides an interface for retrieving data from a URL 
* (without having to reload a page or load another page)
* a page can update just a part of the itself rather than reloading itself entirely

<br>
__THIS IS AMAZING!__ (though the api is kind of terrible)

<br>
(Again, you can [check out the fetch api](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), for a newer, but less supported way of making background http requests)


</section>

<section markdown="block">
## XMLHttpRequest History

We need a campfire. We don't have one. __But here it goes__: &rarr;

* {:.fragment} __XMLHttpRequest__ was originally designed by Microsoft for Internet Explorer in the 1990's (crazy times, eh?) 
* {:.fragment} XML (a robust, but [fairly _heavy_](http://c2.com/cgi/wiki?XmlSucks) markup-language / data exchange format) was en vogue at the time (__anyone familiar with it?__)
* {:.fragment} so rather than just calling the object HttpRequest (which would have been totally accurate)
* {:.fragment} XML was tacked on to the beginning of the name 
	* {:.fragment} though... XML was a valid response format 
	* {:.fragment} (as was JSON, HTML, etc.)
* {:.fragment} it became so popular (because it allowed features such as type-ahead autocomplete) that it was adopted by Mozilla
* {:.fragment} it's currently being standardized by the w3c
* {:.fragment} (also, what's going on with the [inconsistent casing](http://programmers.stackexchange.com/questions/157375/why-does-xmlhttprequest-not-seem-to-follow-a-naming-convention))? XMLHttpRequest?
</section>

<section markdown="block">
## Great... XMLHttpRequest

__How does it work?__ &rarr;

* create an XMLHttpRequest object
* configure it with the appropriate request method and url
* specify what it should do:
	* on error
	* when the content loads
* send the request
</section>

<section markdown="block">
## XMLHttpRequest, Creation and Open

Create an XMLHttpRequest object using the constructor:

<pre><code data-trim contenteditable>
const req = new XMLHttpRequest();
</code></pre>

Use the <code>open</code> method to configure the object. It takes 3 arguments:

* request method (string)
* url (string)
* asynchronous (boolean)

<pre><code data-trim contenteditable>
req.open('GET', url, true);
</code></pre>
</section>

<section markdown="block">
## XMLHttpRequest, Load and Error

__Specify what it should do on error vs onload.__ 

You can also use the __addEventListener__ interface that we just learned:

<pre><code data-trim contenteditable>
req.addEventListener('load') { ... };
req.addEventListener('error') { ... };
</code></pre>

There's also the older style __<code>onerror</code>__ and __<code>onload</code>__ properties on the XMLHttpRequest object:
{:.fragment}

<pre><code data-trim contenteditable>
req.onload = function() { ... };
req.onerror = function() { ... };
</code></pre>
{:.fragment}

</section>

<section markdown="block">
## XMLHttpRequest responseText and status

Your __XMLHttpRequest__ object has a couple of useful properties:

* __<code>status</code>__ - the response status code (for example, 200)
* __<code>responseText</code>__ - the actual body of the response

<br>
Typically, you would use the status to determine if the request were successful:

<pre><code data-trim contenteditable>
if (req.status >= 200 && req.status < 400) {
	// do some cool stuff
}
</code></pre>
</section>

<section markdown="block">
## XMLHttpRequest, send()

Use __<code>send()</code>__ to actually send your request.

* send has an optional argument -- the data that you want send as your request body
	* you'll usually leave out this argument
	* unless you're posting data (in which case the POST data is sent along as the arugument)
* any event listeners you wish to set must be set before calling send()

<pre><code data-trim contenteditable>
req.send();
</code></pre>
</section>
<section markdown="block">
## A Quick Example

Using [this json file](../../code/hello.json): 

* request the file from a blank page 
* parse the JSON... and insert each object's message into document.body as a div

<br>
__Some setup to serve this exercise, as well as a few others:__ &rarr;

1. {:.fragment} setup a barebones express app
2. {:.fragment} create the json file above in your public folder
3. {:.fragment} create an html file called <code>hello.html</code> in your public folder
	* set up some boilerplate html
	* just add script tags to include the following
4. {:.fragment} create a JavaScript file called <code>hello.js</code> in your public/javascripts folder

</section>

<section markdown="block">
## Setting Up a Request

In your JavaScript file, <code>hello.js</code>:

* write code to setup a request to the following url:
	* <code>'http://localhost:3000/hello.json'</code>
* the request should be GET, and asynchronous should be true

<br>

<pre><code data-trim contenteditable>
const url = 'http://localhost:3000/hello.json';
const req = new XMLHttpRequest();
req.open('GET', url, true);
</code></pre>
{:.fragment}
</section>

<section markdown="block">
##  On Load Event Handler

Once we've successfully received data, __add each object's message as a div to the body of the blank document.__ &rarr;

<pre><code data-trim contenteditable>
req.addEventListener('load', function() {
	if (req.status >= 200 && req.status < 400) {
		const messages = JSON.parse(req.responseText);
		messages.forEach(function(obj) {
			document.body.appendChild(
				document.createElement('div')).
				textContent = obj.message;
		});
	}
});

</code></pre>
{:.fragment}
</section>

<section markdown="block">
## On Error Event Handler... and Sending

__If there's an error... just create a text node for now:__ &rarr;

<pre><code data-trim contenteditable>
req.addEventListener('error', function(e) {
	document.body.appendChild(document.createTextNode('uh-oh, something went wrong ' + e));
});
</code></pre>
{:.fragment}

__Lastly... send the request.__ &rarr;
{:.fragment}

<pre><code data-trim contenteditable>
req.send();
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## What Happened?

Hey - we started out with a completely blank html page, but it has some text in it!?

__Let's check out the network tab and refresh the page.__ &rarr;

* we made a request to <code>hello.html</code>
* which in turn requested <code>hello.js</code>
* which in turn used XMLHttpRequest to request <code>hello.json</code>
{:.fragment}

<br>
__hello!__
{:.fragment}

</section>

<section markdown="block">
## Let's Cause an Error!

__How do you think we can get an error to show up?__ &rarr;

* change the domain to something that doesn't exist
* change the page we're accessing so that we get a 404
	* um... wait, do we handle a 404?
	* we can! __let's try it...__ &rarr;
{:.fragment}

<pre><code data-trim contenteditable>
else {
	document.body.appendChild(
		document.createTextNode(
		'request received a ' + req.status));
}
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Triggering From a Click

We could also modify the code so that the request is only made when a user clicks a button. __Let's start off by adding this markup.__ &rarr;

<pre><code data-trim contenteditable>
&lt;h1&gt;Messages&lt;/h1&gt;
&lt;input type="button" id="get-messages-button" value="GET MAH MSGS"&gt;
</code></pre>

__How would we change our JavaScript so that whenever you click the button above, it requests the messages in the json file and inserts them into the DOM?__ &rarr;
</section>

<section markdown="block">
## Integrating a Click Event

Just get the button and add a "click" event listener.

<pre><code data-trim contenteditable>
const button = document.getElementById('get-messages-button');
button.addEventListener('click', function() { 
.
.
.
});
</code></pre>

You can drop in all of you request code in the callback above.

* notice each time you press a button, a new request comes up in the network tab.
</section>

<section markdown="block">
## Will This Work With Any URL?

Let's try a little experiment:

* instead of requesting hello.json
* what if we tried requesting a page from cs.nyu.edu?

{% comment %}
<br>
[http://foureyes.github.io/csci-ua.0480-fall2015-001/homework/02/2014-06-15-heat-spurs.json](http://foureyes.github.io/csci-ua.0480-fall2015-001/homework/02/2014-06-15-heat-spurs.json)
{% endcomment %}
<br>

__What do you think will happen? (Ignore the fact that the documents don't match at all, and we're not getting back json; there's something else off)__ &rarr;

* totally not allowed!
* the request will fail
* __let's see.__ &rarr;
{:.fragment}

</section>

<section markdown="block">
## What? Access-Control-Allow-Origin. Huh? What?

Here's the error that we get:

<pre><code data-trim contenteditable>
XMLHttpRequest cannot load ...

'No Access-Control-Allow-Origin' header is present on 
the requested resource. Origin 'http://localhost:3000' 
is therefore not allowed access.
</code></pre>

__What do you think it means?__ &rarr;

* {:.fragment} there's some header that's not present in the response
* {:.fragment} so we can't have access to the content / resource
* {:.fragment} (uh, maybe that wasn't much help)
</section>

<section markdown="block">
## CORS and SOP

__No, really, what does it mean?__ &rarr;

We were not given access to the content, __because we're not allowed to make cross domain requests to that server__.

The two ideas that govern this are:

* Same Origin Policy (__SOP__) 
* Cross Origin Resource Sharing (__CORS__)
</section>

<section markdown="block">
## Same Origin Policy

The __same origin policy__ is a policy implemented by browsers that __restricts how a document, script or data from one _origin_ can interact with a document, script or data from _another origin_.__

* {:.fragment} it __permits scripts__ running on pages originating from the same site to access documents, scripts or data from each other 
* {:.fragment} but __prevents scripting__ access to these resources if they are on different sites
    * note that __access__ depends on the kind of request being made
    * (for regular GET requests, this usually means that the request can be made, but the response is not allowed to be read by the script)
    * (for other requests, the request may be outright denied!)
* {:.fragment} of course, because this is specification includes scripting access, it applies to XMLHttpRequests (we'll see an exception shortly)
</section>

<section markdown="block">
## Same Site?

__What does _same site_ or _same origin_ mean exactly?__ &rarr;

From MDN...
{:.fragment}

* {:.fragment} two pages have the same origin if the __protocol__, __port__ (if one is specified), and __host__  are the same for both pages
* {:.fragment} __determine if the following pages would have the same origin as__: &rarr; <code>http://store.company.com/dir/page.html</code>
	* {:.fragment} <code>http://store.company.com/dir2/other.html</code> <span class="fragment">Yes</span>
	* {:.fragment} <code>http://store.company.com/dir/inner/another.html</code> <span class="fragment">Yes</span>
	* {:.fragment} <code>https://store.company.com/secure.html</code> <span class="fragment">No - different protocol</span>
	* {:.fragment} <code>http://store.company.com:81/dir/etc.html</code> <span class="fragment">No - different port</span>
	* {:.fragment} <code>http://news.company.com/dir/other.html</code> <span class="fragment">No- different host</span>
</section>

<section markdown="block">
## Why Same Origin Policy?

That seems weirdly restrictive, right? __Why do you think same origin policy exists? What is it trying to prevent?__ &rarr;

A hint from wikipedia: "This mechanism bears a particular significance for modern web applications that extensively depend on HTTP cookies to maintain authenticated user sessions"
{:.fragment}

* if a user is logged in to another site
* and a script from a different origin is allowed to make requests
* it could make requests to and from the site that the user is logged into!
* __Cross Site Request Forgery! (CSRF)__
{:.fragment}
</section>

<section markdown="block">
## An Example of CSRF

__Imagine that you're logged into your bank account:__ &rarr;

* {:.fragment} same origin policy is __not implemented__ in your browser, and your bank has no additional csrf protection (_bad news_)
* {:.fragment} I send you a link to my page of _animated gifs of dancing pizza_
* {:.fragment} no one can resist animated gifs and pizza, so you click on the link
* {:.fragment} once on my page, behind the scenes, I can use `XMLHttpRequest` to...
* {:.fragment} get a page that's behind your bank's login (something like mybank/account) because you're already logged in
* {:.fragment} from there I can:
	* steal data - read information that I should not be allowed to read
	* possibly take actions by issuing POST requests
	* (^^^ slightly more complicated than this, but... you get the idea)
	* YIKES!
</section>

<section markdown="block">
## Convinced?

I think we can agree that Same Origin Policy is kind of... um _important_.

__But... how do we share data across sites? How do APIs work?__ &rarr;

__Let's try a quick experiment with githubs public API.__ &rarr;
</section>

<section markdown="block">
## GitHub API

You can actually get info from a GitHub user through [GitHub's api](https://developer.github.com/v3/) by using the following URL:

<pre><code data-trim contenteditable>
https://api.github.com/users/[a username]/repos
</code></pre>

Let's try checking out what it says about one of my GitHub accounts by hitting the actual api url: [https://api.github.com/users/foureyes/repos](https://api.github.com/users/foureyes/repos)

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
## Let's Build a Repository Browser

__We could probably build a quick form that takes in a username__ &rarr;

* ...and lists off all of the repositories that the user has
* __let's give it a try.__ &rarr;
	* how about a wireframe?
	* a use case?
	* maybe some markup first (what form elements would we need? should we have some styles... sure!)
	* then some JavaScript

<br>

__Some more docs regarding the GitHub API:__ &rarr;

* [rate limit status](https://developer.github.com/v3/rate_limit/)
* [list user repos](https://developer.github.com/v3/repos/#list-user-repositories)

</section>

<section markdown="block">
## Repository Viewer Wireframe

__Our repository viewer will have:__ &rarr;

* one text field where you can input a github username
* a list all of that person's pubic repositories when you click on submit
* (optionally) a button to check for rate limit (of course!)

<br>

It might look like this:

<div markdown="block" class="img">
![github]({{ site.vars.slides_img_prefix }}/github-repo-browser.jpg)
</div>

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
## Take a Quick Look at the Domains

__See anything strange?__ &rarr;

Yeah... wait a second. Those are different domains? __Aren't cross domain requests allowed?__ &rarr;
{:.fragment}

* Well. Yes...
* That is, unless the server your sending your request to sets some specific headers
* That's where CORS or Cross Origin Resource Sharing comes in
{:.fragment}
</section>

<section markdown="block">
## Cross Origin Resource Sharing


__Cross Origin Resource Sharing__ (CORS) is a mechanism that allows resources, such as JSON, fonts, etc. to be requested from a domain from a different origin.  From [mdn](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS):

* it works by adding HTTP headers that allow servers to describe the set of origins that are permitted to read that information using a web browser
* for example, __Access-Control-Allow-Origin__ (a URL that specifies an allowed origin, or \* for all), is header that the server will set in the response
* the browser will use that information to determine how to deal with cross domain requests
</section>

<section markdown="block">
## Hm. If That's The Case

__How do you think we were able to contact GitHub's api?__ &rarr;

* it must have had some of those fancy CORS headers set
* Access-Control-Allow-Origin must be set to \*
* __how can we tell; how can we prove this?__ &rarr;
* {:.fragment} __let's check out the network tab on Chrome's developer tools__ &rarr;

</section>

<section markdown="block">
## It's Up to the Browser (and the Server)

__So... how does this work _behind_ the scenes.__ &rarr;

* {:.fragment} for GETs and POSTs, the script _can actually_ make a cross domain request and get a response back (wait, what?)
* {:.fragment} but the browser, at the network level, prevents access to the response from the script
* {:.fragment} for other HTTP request methods (and maybe more _complicated_ GETs and POSTs), browsers will "preflight" the request by:
	* soliciting supported methods from the server with an HTTP OPTIONS request method 
	* and then, upon "approval" from the server, sending the actual intended request with the appropriate HTTP request method
</section>

<section markdown="block">
## Back to CSRF

Going to our example of cross-site request forgery, issuing a background POST via scripting ... to another domain seems like it'll work, because the request will actually go through!

__Then... how is CSRF prevented, and how does SOP/CORS help in preventing CSRF__

1. {:.fragment} one common method is to have token generated for each form that's a hidden input
2. {:.fragment} this token is checked when the form is submitted... __but wait, this seems like we can circumvent it__ &rarr;
3. {:.fragment} the 1st background request can read the form's token! ... __but can it?__ &rarr;
4. {:.fragment} SOP prevents this from happening!
5. {:.fragment} some resources: [CSRF prevention](https://en.wikipedia.org/wiki/Cross-site_request_forgery#Prevention), [SOP vs CSRF](http://stackoverflow.com/questions/12823390/what-stops-someone-from-reading-csrf-tokens-in-form-inputs-with-js)

</section>

<section markdown="block">
## Whoah Neat. Cross Domain Totally Works.

However, you may not always have access or contact with the server that's running the services. So, maybe they won't set the CORS headers for you. __What are some other options around cross domain requests?__ &rarr;

* {:.fragment} create a proxy that requests the resource for you (server side), but is on your domain
* {:.fragment} request the data server side and _cache_ the data; create a service that serves the cached data
* {:.fragment} of course, these are all likely against terms of use
* {:.fragment} (probably don't do this)
* {:.fragment} also note that many apis have rate limits
* {:.fragment} they also mostly require some sort of authentication
</section>

<section markdown="block">
## Hm. Does That Mean We Can Make Our Own APIs?

Yes. __We can make our own APIs with Express__.

The secret is:

<pre><code data-trim contenteditable>
res.json()
</code></pre>

This returns a json response of the object that is passed in.

__Let's try one where we read message objects out of MongoDB__ &rarr;
</section>

<section markdown="block">
## Here's a Schema

Just a run-of-the-mill message:

<pre><code data-trim contenteditable>
const Message = new mongoose.Schema({
	message: String,
	dateSent: Date
});
</code></pre>


</section>
<section markdown="block">
## A Router That Exposes the API

Get all messages as JSON...

<pre><code data-trim contenteditable>
router.get('/api/messages', function(req, res) {
  Message.find({}, function(err, messages, count) {
    res.json(messages.map(function(ele) {
      return {
        'message': ele.message,
        'date': ele.dateSent
      }; 
    }));
  });
});
</code></pre>
</section>
<!--
<section markdown="block">
## 

* AJAX overview
* NBA Example, push button... spinner that's replaced
	* try with local to show example that's actually working
		* show json loading
		* show nettab
		* note that there's not an additional request to the server
	* try with live example to show cors
	* demo transition effects and timer TODO: youmightnotneedjquery
* Same Origin Policy
* How to get around?
* Wait, what about different domains
* Why?
* promises?
	* CORs
* GitHub Example... another one with a form

* Tumblr Example... show that you can look for trending tags... click... get images
* CORS
* lots of callbacks... what about promises?
</section>
-->
