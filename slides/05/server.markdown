---
layout: slides
title: "A Web Server in Node"
---
<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## A Sample Web Server in Node

From our book... {{ site.vars.book_web }}

<pre><code data-trim contenteditable>
var http = require('http');
http.createServer(function(req,res){
	res.writeHead(200, { 'Content-Type': 'text/plain' }); 
	res.end('Hello world!');
}).listen(3000);
console.log('Server started on localhost:3000; press Ctrl-C to terminate....');
</code></pre>

</section>
<section markdown="block">
# Let's Use nc, curl and Chrome to test it!
</section>

<section markdown="block">
## http, createServer

Note that we:

* brought in the http module
* called a function named createServer
	* the function createServer took a callback
	* the callback responds to requests
	* the response object was populated with headers and text
* the object created from createServer listened on port 3000
</section>

<section markdown="block">
## Another One With Routing

<pre><code data-trim contenteditable>
var http = require('http');
http.createServer(function(req,res){
	// normalize url by removing querystring, optional
	// trailing slash, and making it lowercase
	var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase(); 
	switch(path) {
		case '':
			res.writeHead(200, { 'Content-Type': 'text/plain' }); res.end('Homepage');
			break;
		case '/about':
			res.writeHead(200, { 'Content-Type': 'text/plain' }); res.end('About');
			break;
		default:
			res.writeHead(404, { 'Content-Type': 'text/plain' }); res.end('Not Found');
			break;
   }
}).listen(3000);
console.log('Server started on localhost:3000; press Ctrl-C to terminate....');
</code></pre>

</section>
