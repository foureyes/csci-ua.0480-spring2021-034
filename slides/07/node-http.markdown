---
layout: slides
title: "Node's HTTP Module"
---

<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## A Step Back

__What's the internet?__ &rarr; <span class="fragment"> a global network of networks</span>

__What's the underlying protocol that computer's on the internet use to communicate?__ &rarr; <span class="fragment">TCP/IP</span>

__What's the world wide web?__ &rarr; <span class="fragment"> a bunch of documents connected by hyperlinks ... that are retrievable by url</span>

__What protocol is the web based on?__ &rarr; <span class="fragment"> HTTP</span>

<span class="fragment">The web is a service built on top of the internet. HTTP is a protocol built on top of TCP/IP (TCP/IP handles the connection, sending/routing/transmitting of data, etc. ... while HTTP is the message).</span>

</section>

<section markdown="block">
## A TCP/IP Server &rarr; Web Server

So... previously, we made a simple web server using nothing more than the `net` module. The TCP/IP part was taken care of by the module, but we had to build http on top of it. __That meant:__ &rarr;

* {:.fragment} parsing a request
* {:.fragment} manually writing a response back

<br>
Also, it had a lot of shortcomings:
{:.fragment}

* {:.fragment} trailing slashes, casing
* {:.fragment} html as strings!?
* {:.fragment} etc. (NOT FUN!)

</section>
<section markdown="block">
## The HTTP Module

Sooo... let's use another module that takes care of the http bits for us. __The built-in HTTP module gives us:__ &rarr;

[(From the docs, on the http module)](http://nodejs.org/api/http.html#http_http) is

* a low-level API for creating HTTP
	* __servers__
	* __clients__
* it only parses a message into headers and a body 
	* it __does not__ work with the _actual_ headers
	* or _actual_ body


</section>
<section markdown="block">
## Using the HTTP Module

__How do we bring in a module in node?__ &rarr;

Use the <code>require</code> function. 
{:.fragment}

* __...so, how do we bring in the http module?__ &rarr;
* __do we have to install it first?__ &rarr;
{:.fragment}

<br>
<pre><code data-trim contenteditable>
// http is a core node module 
// it's compiled in to the node binary

const http = require('http');
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Let's Look at What HTTP Can Do

__How can we see what's in the node module?__ &rarr;

Just try importing it in the interactive shell, and typing out http:
{:.fragment}

<pre><code data-trim contenteditable>
const http = require('http');
http
</code></pre>
{:.fragment}

We'll be going over:
{:.fragment}

* status codes constant
* a Server object and its methods
* the Request object and its methods
* the Response object and its methods
* (and a brief detour _in time_)
{:.fragment}
</section>

<section markdown="block">
# About Reading Node's Documentation

</section>
<section markdown="block">
## Reading Function Signatures

When reading node documentation, note that:

* all arguments are shown within parentheses after the function name
* arguments surrounded by brackets are optional

<br>
<pre><code data-trim contenteditable>
functionName(requiredArg1, [optionalArg2], [optionalArg3]);

// an example from the docs
response.writeHead(statusCode, [reasonPhrase], [headers])
</code></pre>

</section>
<section markdown="block">
## So, Let's Take a Look at Some Details

It's pretty spartan:

* <code>http.STATUS_CODES</code>
* <code>http.createServer</code>
</section>

<section markdown="block">
## http.STATUS_CODES

__http.STATUS_CODES__ is an object that contains:

* all of the standard HTTP response status codes as properties
* and their short descriptions as values

<pre><code data-trim contenteditable>
{ '100': 'Continue',
  '101': 'Switching Protocols',
  '102': 'Processing',
  '200': 'OK',
  '201': 'Created',
  .
  .
  '418': 'I\'m a teapot',
  .
  .
  '510': 'Not Extended',
  '511': 'Network Authentication Required' }
</code></pre>
{:.fragment}

[I'm](http://en.wikipedia.org/wiki/Hyper_Text_Coffee_Pot_Control_Protocol) a [teapot](http://tools.ietf.org/html/rfc2324)
{:.fragment}


</section>
<section markdown="block">
## createServer

__createServer__ returns a new _web server_ object: 

<pre><code data-trim contenteditable>
http.createServer([requestListener])
</code></pre>

* note that [it takes](http://nodejs.org/api/http.html#http_http_createserver_requestlistener) one optional parameter - a function that handles [request events](http://nodejs.org/api/http.html#http_event_request)
* the callback function takes two arguments, a <code>request</code> object and a <code>response</code> object
</section>

<section markdown="block">
## Server Object

The server object that results from calling <code>http.createServer</code> is simply an object that emits (generates) events, some of which include:

* __request__ - whenever a new request is received
* __connection__ - when a tcp connection is made
* __close__ - emitted when a server stops listening and closes

<br>
Additionally, some useful methods that it has are:

* [server.listen](http://nodejs.org/api/http.html#http_server_listen_port_hostname_backlog_callback) - accept connections at the given port number and hostname
* __server.close__ - stop the server from accepting new connections
</section>

<section markdown="block">
## Back to createServer

<code>http.createServer</code> binds a callback function to a <code>request</code> event. __What are the two arguments that this callback function takes?__ &rarr;

* __request__ - an instance of <code>http.IncomingMessage</code>
* __response__ - an instance of <code>http.ServerResponse</code>
{:.fragment}
</section>

<section markdown="block">
## http.IncomingMessage 

__http.IncomingMessage__ is an object that represents a client's [HTTP request](http://nodejs.org/api/http.html#http_http_incomingmessage). 

* it's the __first argument__ passed in to the _request event's_ callback 
* some of its properties include:
	* __httpVersion__ - the HTTP version sent by the client
	* __url__ - the url that the client requested
	* __headers__ - the request headers sent by the client (as an object with lowercase header names as properties)
	* __method__ - the request method used by the client (GET, POST, PUT, DELETE, etc.)

</section>

<section markdown="block">
## http.ServerResponse

__https.ServerResponse__ is an object that represents the [HTTP response](http://nodejs.org/api/http.html#http_class_http_serverresponse) that the server will return.

* it's the __second argument__ passed in to the _request event's_ callback 
* it's created internally by the HTTP server (not by the user)
* has two methods of sending headers - explicit and implicit
</section>

<section markdown="block">
## http.ServerResponse Continued

Some useful properties and methods that a <code>ServerResponse</code> object has are:

* __writeHead(statusCode, [reasonPhrase], [headers])__ - explicitly send a response header (status code and headers) to the request
* __setHeader(name, value)__ - sets a single header value for response for implicit sending of headers
* __getHeader(name)__ - reads out a header that's been queued for implicit sending (if <code>writeHead</code> wasn't called) to the client
* __removeHeader(name)__ - removes a header that's been queued for implicit sending (if <code>writeHead</code> wasn't called) to the client
* __write(chunk, [encoding])__ - sends a chunk of the response body (causes implicit headers to be sent if <code>writeHead</code> wasn't called
* __end([data], [encoding])__ - signals to the server that all of the response headers and body have been sent
* __statusCode__ - the status code of the response for implicit sending (if <code>writeHead</code> wasn't called)

</section>

<section markdown="block">
## response.writeHead()

<code>writeHead(200, {'Content-Type':'text/plain'})</code>

* [writeHead](http://nodejs.org/api/http.html#http_response_writehead_statuscode_reasonphrase_headers) has one required argument, the 3-digit HTTP status code (as a <code>Number</code>)
* last argument is headers (an object with property names as HTTP response header names)
* there's an optional second argument for a human readable version of the status code
* __this method must only be called once on a message and it must be called before <code>end()</code> is called__
* if you call <code>write()</code> or <code>response.end()</code> before <code>writeHead</code>, the implicit headers will be determined and <code>writeHead</code> will be called with those headers
</section>

<section markdown="block">
## response.end()

<code>end('<!DOCTYPE html><html><body>hello</body></html>')</code>

* [end](http://nodejs.org/api/http.html#http_response_end_data_encoding) has one required argument, the body of the HTTP response that's being sent back to the client
* signals to server that the message, the response, is complete
* __<code>end()</code>, must be called on each response__
</section>

<section markdown="block" data-background="#440000">
# <code>writeHead()</code> will (either explicitly or implicitly) be called before end
</section>

<section markdown="block" data-background="#440000">
# <code>end()</code> must be called on each response
</section>

<section markdown="block">
## A Web Server in Node (Revisited)

__Let's try writing our own web server, with help from the http module!__ &rarr;

* bring in the http module
* create a web server object and listen on port 3000... use the callback below
* create a callback function
	* the function will send back a 200 OK, and the header Content-Type set to 'text/plain'
	* the body will just be 'hello world'
</section>

<section markdown="block">
## A Web Server in Node, Implemented

<pre><code data-trim contenteditable>
const http = require('http');
const port = 3000;

http.createServer(handleRequest).listen(port);
console.log('starting server on ' + port);

</code></pre>

<pre><code data-trim contenteditable>
function handleRequest(req, res) {
	const responseStatusCode = 200;
	res.writeHead(responseStatusCode, {'Content-Type':'text/plain'});
	res.end('hello');
}
</code></pre>
</section>

<section markdown="block">
## Adding Some Features

__Let's try adding some logging. On the server side, output the requested url to the console whenever a request is made.__ &rarr;

<pre><code data-trim contenteditable>
// in handleRequest
console.log(req.url);
</code></pre>
{:.fragment}

</section>

<section markdown="block">
## AND MOAR FEATURES

__How about sending back some html?__ &rarr;

__First let's try actually sending back html in the body...__ &rarr;
{:.fragment}

<pre><code data-trim contenteditable>
// in handleRequest
res.end('<!DOCTYPE html><html><body><strong>Hi</strong> there!</body></html>');
</code></pre>
{:.fragment}

__What happened?__ &rarr; <span class="fragment">The content type needs to be changed to text/html</span>
{:.fragment}

</section>

<section markdown="block">
## Response Headers?

[Check out the rfc](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html)... here are few that you'll commonly see:

* __cache-control__ - specifies directives that __MUST__ be obeyed by all caching mechanisms (for example, don't cache this page if no-cache)
* __content-encoding__ - type of encoding used on data - primarily used to allow a document to be compressed
* __content-type__ - the MIME type of the response
	* standard identifier used on Internet to indicate the type of data that file contains
	* signals to client (browser, email client) how to display content 
* __date__ - the date and time at which the message was originated
* __last-modified__ - date and time at which the origin server believes the resource was last modified
* __server__ - server's name
</section>

<section markdown="block">
## Some Sample Response Headers

<pre><code data-trim contenteditable>
cache-control:no-cache
content-encoding:gzip
content-type:text/html; charset=utf-8
date:Mon, 29 Sep 2014 01:15:00 GMT
server:cloudflare-nginx
status:200 OK
vary:Accept-Encoding
version:HTTP/1.1
</code></pre>



</section>
<section markdown="block">
## Sending Back HTML

__Which header(s) will fix our problem, again?__ &rarr;

<pre><code data-trim contenteditable>
// change Content-Type header to text/html
res.writeHead(200, {'Content-Type':'text/html'});
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Aaaand An Aside on Node

Node's primary programming paradigm is __event driven programming__. __Event driven programming__ is a way of programming where:

* rather than just the conventional top-to-bottom execution, the flow of the programming is determined by events 
	* these events are usually some sort of I/O
	* ...such as user input
	* or network events
* there's generally a main loop (in node's case, that's the event loop) 
	* the main loop triggers a callback function when an event is detected
	* __what's the event that's being handled in our web server?__ &rarr; <span class="fragment">[a request event](http://nodejs.org/api/http.html#http_event_request)</span>
</section>

<section markdown="block">
## Additional URLs

Great. So, _usually_ there's more than one page on a site, so __let's figure out how to serve up additional URLs.__ &rarr;

* serve up different text based on a case insensitive URL
* the urls and their corresponding response code and text/html body should be as follows:
	* __/__ or __/home__ &rarr; 200 OK, "homepage v2, now with routing!"
	* __/about__ &rarr; 200 OK, "made with node"
	* __any other page__ &rarr; 404 Not Found, "nothing to see here!"
* on the server side, log both the url and the response code
* test with <code>/</code>, <code>/home</code>, <code>/about</code>, <code>/about/</code>, <code>/about?q=something</code>, <code>/blog</code>

</section>


<section markdown="block">
## Additional URLs Implementation

__In <code>handleResponse:</code>__ &rarr;

<pre><code data-trim contenteditable>
  const resCode,
    body,
    headers = {'Content-Type':'text/html'},
    path = req.url.toLowerCase();
  if(path === '/about') {
    resCode = 200;
    body = 'made with node';    
  } else if (path === '/' || path === '/home') {
    resCode = 200;
    body = 'homepage v2, now with routing';    
  } else {
    resCode = 404;
    body = 'nothing to see here'
  }
</code></pre>
{:.fragment}

<pre><code data-trim contenteditable>
  res.writeHead(resCode, headers);
  res.end(body);
  console.log(req.url, res.statusCode);
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Hm... Something Feels Wrong

Hardcoding html in our code, doesn't seem great.  __How about we just read some files, and serve them up?__ &rarr;

</section>
<section markdown="block">
## The File System Module

The code node module, __fs__, [allows general file I/O](http://nodejs.org/api/fs.html). It allows the reading and manipulation of files.

As usual, bring it in to your program by using <code>require</code>.

<pre><code data-trim contenteditable>
const fs = require('fs');
</code></pre>

</section>

<section markdown="block">
## Let's Use the File System Module 

In order to have our web server read static files, we'll use __fs.readFile()__. [fs.readFile()](http://nodejs.org/api/fs.html#fs_fs_readfile_filename_options_callback) __asynchronously__ reads the entire contents of a file. __You know what that means, right?__ &rarr; <span class="fragment">callback time!</span>

<pre><code data-trim contenteditable>
fs.readFile(filename, [options], callback)#
</code></pre>

* the __filename__ is the full path to the file. 
* __options__ is an object specifying details such as encoding <code>{'encoding':'utf-8'}</code>
* the __callback__ takes two parameters:
	* __err__ - an error object (present if something goes wrong)
	* __data__ - the contents of the file
</section>


<section markdown="block">
## Using fs.readFile

__Let's try printing out the contents of a file...__ &rarr;

* create a file
* bring in the fs module
* use readFile by passing in the path to your file, an encoding (use utf-8), and your callback
* your callback should check if there's an error
	* if there's an error, log a message
	* otherwise, log the contents of the file
</section>

<section markdown="block">
## Using fs.readFile Example

<pre><code data-trim contenteditable>
const fs = require('fs');

fs.readFile('./public/index.html', {'encoding':'utf-8'}, function(err, data) {
	if (err) {
		console.log('uh oh!');
	} else {
		console.log(data);
	}
});
</code></pre>
</section>

<section markdown="block">
## Back to Serving Static Files

We'll serve 3 pages and an image:

* __/__, __home__ - read from public/index.html
* __about__ - read from public/about.html
* __404__ - read from public/404.html
* __magicman.png__ - an image ... read from [public/img/magicman.png]({{ site.vars.slides_img_prefix }}/magicman.png)

</section>
<section markdown="block">
## Static Files Implementation

Define a function called <code>serverStatic</code>... it should:

* read a file and send it out as an http response
	* if there's an error, send out a 500
	* if it reads the file successfully, use the file's contents as the body of the response
* it'll have 4 parameters
	* __res__ - the response object
	* __path__ - the path of the file to read
	* __contentType__ - the file's content type
	* __resCode__ - the response code that will be sent back
		* it will default to a 200
</section>


<section markdown="block">
## Let's Create Our Static Files

__We'll have to create a couple of folders and files:__ &rarr;

<pre><code data-trim contenteditable>
mkdir -p public/img
</code></pre>

Sample body for index.html, home.html

<pre><code data-trim contenteditable>
		<h1>homepage v3, now with static files!</h1>
		<img src="img/magicman.png">

</code></pre>

And, of course, drop [magicman.png]({{ site.vars.slides_img_prefix }}/magicman.png) into img.

</section>

<section markdown="block">
## serveStatic

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
</section>

<section markdown="block">
## Using serveStatic 

__Let's modify our handleRequest so that it uses serveStatic.__ &rarr;
</section>

<section markdown="block">
## Using serveStatic Continued
<pre><code data-trim contenteditable>
const http = require('http'),
	fs = require('fs');
const port = 3000;
http.createServer(handleRequest).listen(3000);
console.log('Started server on port', port);
</code></pre>

<pre><code data-trim contenteditable>
function handleRequest(req, res) {
	if (req.url === '/home' || req.url === '/') {
		serveStatic(res, './public/index.html', 'text/html', 200);
	} else if (req.url === '/about') {
		serveStatic(res, './public/about.html', 'text/html', 200);
	} else if (req.url === '/img/magicman.png') {
		serveStatic(res, './public/img/magicman.png', 'image/png', 200);
	} else {
		serveStatic(res, './public/404.html', 'text/html', 404);
	}
}
</code></pre>
</section>

<section markdown="block">
# BTW, Can We Move the Callback Out to a Function Declaration?
</section>


<section markdown="block">
## Callbacks

__Let's try it.__

In this case, not really (mainly because of the way we've structured our program):
{:.fragment}

* it depends on the closure to get the context of the function that calls it
* specifically, the callback needs access to res
* maybe we could use bind... but seems little gross
{:.fragment}

<pre><code data-trim contenteditable>
fs.readFile(path, handleFileRead.bind(
	{res:res, contentType:contentType, resCode:resCode}));
</code></pre>
{:.fragment}

We'll see a better way to do this later...
{:.fragment}
</section>

<section markdown="block">
## Well. That Was Fun.

Great. We just implemented a __terrible__ static file web server (we already have Apache, Nginx, etc. to handle that).

__What was difficult to deal with... and what were some shortcomings?__ &rarr;

* urls (we didn't use regexes, trailing slash and query strings)
* mapping to specific static files
* rewrites / aliases
* just to name a few...
* seems like not so great for static sites... but for __dynamic__?
* {:.fragment} that's where express comes in
* {:.fragment} but before that, I mentioned Apache and Nginx...
</section>

{% comment %}




		* date
			* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
			* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString
			* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString

* compare to apache
* packages.json
* request
{% endcomment %}
