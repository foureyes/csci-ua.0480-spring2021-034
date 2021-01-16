---
layout: slides
title: "Express - Request and Response Objects"
---
<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>
<section markdown="block">
## How Does it All Work Again?

__What protocol is used when a browser asks for a web page?__ &rarr;

* {:.fragment} HTTP ... __great, but what's HTTP?__ &rarr;
* {:.fragment} __HTTP__ specifies the rules and conventions that allow documents and resources on the web to be requested over a network. These rules define:
	* {:.fragment} The format for exchanging messages
	* {:.fragment} The meaning/semantics of a messages
	* {:.fragment} The process for communication
</section>

<section markdown="block">
## Retrieving a Resource

Each document or resource on the web is retrievable by a name. __What is that name called, and what does the name consist of?__ &rarr;

A __URL__... URLs consist of the follow parts:
{:.fragment}

* __scheme/protocol__ - http
* __domain or actual ip address__ - pizzaforyou.com
* __port__ (optional) - 80 (default if http)
* __path__ - /search
* __query_string__ (optional) - ?type=vegan
* __fragment_id__ (optional) - #topresult
{:.fragment}

<br>
<code>scheme://domain:port/path?query_string#fragment_id</code>
{:.fragment}
</section>

<section markdown="block">
## URL

These are silly questions, but __why is the domain part of the URL important?__ __What does it specify?__ &rarr;

* {:.fragment} The __domain__ (or the ip address) is the server that your browser is connecting to! 
* {:.fragment} __Why is the path part of the URL important? What does it specify?__ &rarr;
* {:.fragment} The __path__ represents the document or resource that your browser is trying to retrieve from the server.
</section>

<section markdown="block">
## URLs Continued

### For our web application, the path is generally the first part of the URL that's useful. 

__Why? What did we use the path for in our homework and our previous classes?__  &rarr;

* the path uniquely identifies pages, resources, and even functionality!
* we used it to determine what content to serve (a _static_ file, a string of text, etc.) 
{:.fragment}
</section>

<section markdown="block">
## Back to HTTP 

__HTTP is a request-response protocol.__ 

* the client sends a request for a resource
* the server responds to the request

<br>
__When you type a URL into your browser...__

1. your browser will attempt to connect to the domain specified in the URL (the server)
2. the browser sends a request message (which includes the path specified in the url) to the server
3. the server responds based on the content of the request...
</section>

<section markdown="block">
# An Aside on Web Servers and Web Applications
</section>
<section markdown="block">
## Node, Express, Web Servers and Web Applications

A __web application__ is any kind of software that runs in a web browser.

* it's usually more than just static pages
* some examples of web applications might include gmail, albert, etc.

<br>
A __web server__ is basically software that processes HTTP requests

* web servers can _host_ static files
* they can also serve up web applications
* a web server and a web application are usually different technologies.
* for example, maybe you run a Rails web application on Nginx, a web server.

<br>
__For Node and Express, things are slightly different.__
</section>

<section markdown="block">
# With Node and Express, you're building both the web server and the web app!

</section>

<section markdown="block">
## Express Apps

Again, __when we use Express, you're writing both the web server and a web app.__ That means:

* we'll need to know how to handle HTTP requests (on a high level)
* we'll have to be able to send back an HTTP response 
</section>

<section markdown="block">
## An HTTP Request

So, your browser is making a request. __What does it actually send to the server?__ &rarr;

* {:.fragment} the first line is the request line, which consists of
	* {:.fragment} the __request method__ (usually GET or POST) - sometimes referred to the HTTP verb 
	* {:.fragment} a __path__ ...
	* {:.fragment} the __http version__ being used 
	* {:.fragment} for example: <code>GET /about HTTP/1.1</code>
* {:.fragment} some __request headers__ - or additional information about your request (_user-agent_ or browser, language, etc.)
	* {:.fragment} for example: <code>Host: localhost:8080</code>
* {:.fragment} __an empty line__
* {:.fragment} __an optional body__ (perhaps data you're ending over via _POST_)
</section>

<section markdown="block">
## Data All Over!

Note that in an HTTP request, additional data can be sent over to the server in both:

* __the query string__ (in the path)
* the __body__

<br>
These two methods of sending data to the server are usually associated with specific HTTP verbs.

* data in a __POST__ request is sent within the body 
* data in a __GET__ request is sent in the url's query string as name value pairs: <code>?firstname=joe&amp;lastname=versoza</code>
</section>

<section markdown="block">
## GET Requests

More about __GET__:

* __when you enter a URL into you're browser, you're issuing a GET request!__
* __GET__ requests usually don't have a body
* the data in a __GET__ request is in the __query string__ part of the URL 
* __query strings__ are URL encoded (also known as [percent encoded](http://en.wikipedia.org/wiki/Percent-encoding).
* any characters that have special meaning in a URL are replaced with a numeric reference prefixed by %
* [it's slightly more complicated than that](http://stackoverflow.com/questions/1634271/url-encoding-the-space-character-or-20), with form submissions causing spaces to be substituted by +
* spaces in a url: <code>http://localhost:8080/this%20is%20url%20encoded</code>
* spaces in a query string after form submission: <code>http://localhost:8080/?value=also+url+encoded</code>

</section>

<section markdown="block">
## POST Requests

More about __POST__:

* __POST__ requests, on the other hand, do have a body
* the content or data that's being sent is placed in the body of the __POST__ request 
* the __content-type__ header specifies what kind of content is contained in the body
	* generally, __POST__ bodies have a __content-type__ of <code>application/x-www-form-urlencoded</code>, which is the same as url encoding a query string
	* if the data is an image being uploaded, the __content-type__ is <code>multipart/form-data</code>
	* finally, if the data being POSTed is JSON, the __content-type__ is <code>application/json</code>

</section>



<section markdown="block">
## An Example Request

Below is a request sent from my browser to a sample node.js web app:

<pre><code data-trim contenteditable>
GET /about HTTP/1.1
Host: localhost:8080
Connection: keep-alive
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.124 Safari/537.36
Accept-Encoding: gzip,deflate,sdch
Accept-Language: en-US,en;q=0.8
</code></pre>
</section>

<section markdown="block">
## Viewing a Request

__Where did I find the request headers from the previous slide?__ &rarr; 

1. Chrome &rarr; View &rarr; Developer &rarr; Web Developer Tools
2. Click on Network tab &rarr; Click on page &rarr;  Click on view headers
{:.fragment}

<div markdown="block" class="img">
![chrome]({{ site.vars.slides_img_prefix }}/chrome-req-headers-sm.gif)
</div>
{:.fragment}
</section>

<section markdown="block">
## Getting Back a Response

__When a web app/web server receives a request, it serves up content and resources based (usually) on the following attributes of the request__: &rarr;

* path
* query string
* body
{:.fragment}

</section>
<section markdown="block">
## Response Continued

__What does a server's response look like?__ &rarr;

* {:.fragment} __a status line__
	* {:.fragment} __HTTP version__
	* {:.fragment} __response status code__ 
	* {:.fragment} __reason__
	* {:.fragment} for example:  <code>HTTP/1.1 200 OK</code>
* {:.fragment} __response header fields__ 
	* {:.fragment} for example <code>Content-Type: text/html</code>
	* {:.fragment} also, content-type matters a lot... __why?__ &rarr; <code class="fragment">it determines how the client/browser should render the content!</code>
* {:.fragment} __an empty line__
* {:.fragment} __an optional message body__ - maybe an HTML document, CSS, an image, etc.
</section>

<section markdown="block">
## A Sample Response

This is an example response generated by a simple node web app:

<pre><code data-trim contenteditable>
HTTP/1.1 200 OK
Content-Type: text/html
Date: Tue, 07 Oct 2014 03:38:37 GMT
Connection: keep-alive
Transfer-Encoding: chunked
</code></pre>

<pre><code data-trim contenteditable>
<!DOCTYPE html>
&lt;html&gt;
	&lt;head&gt;
		&lt;link rel="stylesheet" href="/css/base.css" type="text/css" media="screen"&gt;
	&lt;/head&gt;
	&lt;body&gt;
		&lt;h1&gt;Home&lt;/h1&gt;
		&lt;p&gt;This is the homepage!&lt;/p&gt;
		&lt;img src="/img/image1.png"&gt;
	&lt;/body&gt;
&lt;/html&gt;
</code></pre>

(__Let's check this out in Chrome's Web Developer Tools too.__ &rarr;)
</section>

<section markdown="block">
## How's Your Browser Feel About That?

__When your browser receives a response, it looks at...__ &rarr;

* the response code
* the headers
* the body

<br> 
It uses the above three items to determine what to do next...

{% comment %}
* perhaps display content
* retrieve additional resources
* go to a different page
{:.fragment}
{% endcomment %}

</section>

<section markdown="block">
## Browser Behavior

What do you think your browser does with this data? Why might the response code or headers be important? __What are some examples of how response code, headers, or body influence your browser's behavior?__ &rarr;

* the __response code__ may tell the browser that a page has permanently moved (301) ... 
	* so the browser should automatically go to the next url 
	* (let's see that at work with jvers.com/teaching or google.com)
* the content-type __header__ may tell the browser that the content being served up is actually an image, not text/html
* the body may have links to images, css, etc.
{:.fragment}
</section>

<section markdown="block">
## Browser Behavior Continued

__What happened when you requested the homepage from your homework? How many actual requests did it turn out to be... why?__

* there were actually at least three requests
	* the initial request for the index page
	* the request for css
	* the request for an image
    * maybe even a request for the favicon
    * the initial request that as made had determined that the resource had associated images and css
	    * consequently, the browser requested an image
	    * ... as well as css
	* __we can check out the additional requests in Chrome__ &rarr;
{:.fragment}
</section>

<section markdown="block">
## HTTP Is All About the Request and the Response

### Turns out... node and Express have objects that model these two concepts.

In actuality, __the majority of our work with Express will start with an incoming request object and end with a response object__.
</section>

<section markdown="block">
## The Request Object

The __request object__ is usually the first argument passed to a callback.

* a common convention is to call it <code>req</code> or <code>request</code>, but you can name it _whatever_ you want
* it's actually an http.IncomingMessage object (remember that?), but with a bunch of stuff added to it from Express

</section>

<section markdown="block">
## Request Object Properties


__Originally from node's <code>http</code> module:__

* {:.fragment} <code>req.url</code> - path and querystring (no protocol, port, or domain)
* {:.fragment} <code>req.headers</code> - object with request headers as property names and header values as property values
* {:.fragment} <code>req.method</code> - request method (POST, GET, PUT, etc.)

<br>
__Added by Express:__
{:.fragment}

* {:.fragment} <code>req.path</code> - request path (without protocol, host, port, or querystring)
* {:.fragment} <code>req.query</code> - an object containing query string parameters
* {:.fragment} <code>req.body</code> - an object containing POST parameters (requires middleware to make available)

<br>
__We'll also learn about <code>req.route</code> and <code>req.params</code> later in class.__
</section>

<section markdown="block">
## Let's Run a Quick Demo

Our usual setup, with an extra bit for dealing with request bodies.

<pre><code data-trim contenteditable>
const express = require('express');

const port = 8080;
const app = express();

app.set('view engine', 'hbs');
</code></pre>
</section>

<section markdown="block">
## Some Middleware 

We'll enable some middleware by using __<code>app.use</code>__ 

* __middleware__ is just a function that operates on request and response objects, and calls the next middleware function 
* this will demo some of the properties we mentioned

<br>

This part makes the req.body property available.

<pre><code data-trim contenteditable>
// to display request body...
app.use(express.urlencoded({ extended: false }));

</code></pre>
</section>

<section markdown="block">
## Middleware Continued

...And for logging all of the other properties:

<pre><code data-trim contenteditable>
// for logging request information
app.use(function(req, res, next) {
	console.log('params for ', req.method, req.url);
	console.log('======');
	console.log('req.url:', req.url);
	console.log('req.method:', req.method);
	console.log('req.path:', req.path);
	console.log('req.query:', req.query);
	console.log('req.headers:', req.headers);
	console.log('req.body:', req.body);
	console.log('\n\n\n');
	next();
});
</code></pre>

(__we'll talk more about middleware later__)
</section>

<section markdown="block">
## Finally, Some Routes

Home and a Redirect

<pre><code data-trim contenteditable>
app.get('/', function(req, res) {
	res.render('index');
});

app.get('/home', function(req, res) {
	res.redirect(302, '/');
});
</code></pre>

A Form and a Success Page

<pre><code data-trim contenteditable>
app.get('/post-demo', function(req, res) {
	res.render('post-demo');
});

app.post('/post-demo', function(req, res) {
	res.redirect(303, '/success');
});

app.get('/success', function(req, res) {
	res.render('success');
});
</code></pre>
</section>

<section markdown="block">
## By the Way, Check Out the Redirects

By default, the redirect method sends back a __301__. 

* __301__ - Moved Permanently... you should use the new URL to request this resource
* __302__ - Found (Moved Temporarily)... you should continue to request resource at this URL
* __303__ - See Other... the resource can't be retrieved with the request method used

<br>
(the response headers for redirects must include location, which specifies the url to redirect to)
</section>
<section markdown="block">
## Oh, Of Course, We Can't Forget This

Listen...

<pre><code data-trim contenteditable>
app.listen(port);
console.log('started server on port', port);
</code></pre>

__Now let's try figuring out what the req properties will be for these requests. Will there be a body? Query string? What will the headers look like?__ &rarr;
</section>

<section markdown="block">
## Home/Index

__Is there anything in the query or body? What's the method? What's the path?__ &rarr;

<pre><code data-trim contenteditable>
req.url: /
req.method: GET
req.path: /
req.query: {}
</code></pre>
{:.fragment}
<pre><code data-trim contenteditable>
req.headers: { host: 'localhost:8080',
  connection: 'keep-alive',
  .
  .
  .
  'accept-language': 'en-US,en;q=0.8',
  'if-none-match': 'W/"f2-f4d539eb"' }
</code></pre>
{:.fragment}

<pre><code data-trim contenteditable>
req.body: {}
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Redirect

Note that there are two consecutive requests. __What's the url for each?__ &rarr;

<pre><code data-trim contenteditable>
req.url: /home
req.method: GET
req.path: /home
.
.
.
req.url: /
req.method: GET
req.path: /
</code></pre>
{:.fragment}
</section>


<section markdown="block">
## With a Query String

__Is there anything in the query or body properties?__ &rarr;

<pre><code data-trim contenteditable>
req.url: /?description=this%20is%20a%20query%20string
req.method: GET
req.path: /
req.query: { description: 'this is a query string' }
</code></pre>
{:.fragment}

<pre><code data-trim contenteditable>
req.headers: { host: 'localhost:8080',
  connection: 'keep-alive',
  .
  .
  .
  'if-none-match': 'W/"f2-f4d539eb"' }
</code></pre>
{:.fragment}

<pre><code data-trim contenteditable>
req.body: {}
</code></pre>
{:.fragment}

</section>

<section markdown="block">
## After Posting a Form

__Is there anything in the query or body properties? How many consecutive requests are there? What are the methods?__ &rarr;

<pre><code data-trim contenteditable>
req.url: /post-demo
req.method: POST
req.path: /post-demo
req.query: {}
</code></pre>
{:.fragment}

<pre><code data-trim contenteditable>
req.headers: { host: 'localhost:8080',
  connection: 'keep-alive',
  .
  .
  .
  'content-type': 'application/x-www-form-urlencoded',
  referer: 'http://localhost:8080/post-demo',
  'accept-encoding': 'gzip,deflate',
  'accept-language': 'en-US,en;q=0.8' }
</code></pre>
{:.fragment}

<pre><code data-trim contenteditable>
req.body: { item: 'Pizza', description: 'Delicious' }
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Post Continued

... The success page is then requested. Post, Redirect, Get is a common pattern... __why?__ &rarr; <span class="fragment">to avoid [duplicate form submissions](http://en.wikipedia.org/wiki/Post/Redirect/Get)</span>

<pre><code data-trim contenteditable>
req.url: /success
req.method: GET
req.path: /success
req.query: {}
req.headers: { host: 'localhost:8080',
.
.
.
'if-none-match': 'W/"55-c9e1cd0e"' }
req.body: {}
</code></pre>

</section>
<section markdown="block">
## The Response Object

The __response object__ is usually the second parameter passed to a callback. It's a common convention to name it <code>res</code> or <code>response</code>, but again, you can name it _whatever_ you like.

* just like request, the response object has its beginning as an object from node's http module: <code>http.ServerResponse</code>
* Express adds some really useful methods
</section>

<section markdown="block">
## Response Object Methods 

__We've seen <code>send</code> and <code>render</code> before.__ __A couple of others that we're likely to use are <code>json</code> and <code>redirect</code>.__ &rarr;

* {:.fragment} <code>res.status(status)</code> - sends response with <code>status</code> code back, can be chained with <code>send</code>: <code>res.status(200).send('hello')</code>
* {:.fragment} <code>res.send(body)</code>, <code>res.send(status, body)</code> - sends a response back to the client with an optional status code (the default is 200)
* {:.fragment} <code>res.render(view, [locals], callback)</code> - render a view using the locals object - the property names of the object are variables in the template
* {:.fragment} <code>res.redirect([status], url)</code> - redirect to a specific page using an optional status (the default is 302)
* {:.fragment} <code>res.json(json)</code>, <code>res.json(status, json)</code> - sends json back as a response with an optional status code
* {:.fragment} <code>res.set(name, val)</code> - you can still do stuff like manually set headers, or specify media type, but this functionality is usually for special cases 

</section>
