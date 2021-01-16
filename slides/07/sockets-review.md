---
layout: slides
title: "Sockets / net Module Review"
---

<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.course_number}}-{{ site.course_section }}

<p><small></small></p>
</section>
<section markdown="block">
## Node's net Module

__What's the `net` module used for?__ &rarr;

It's for creating TCP/IP servers and clients.
{:.fragment}

__What are the objects that we used when creating a server?__ &rarr;

* {:.fragment} a _Server_ object (of course!) ... which binds to a hostname and port, and accepts connections and data from clients
* {:.fragment} a _Socket_ object ... that allows reading and writing data to a specific connection

</section>

<section markdown="block">
## Creating a Server

So, how do we __create a server?__ &rarr;

* {:.fragment} easy - just call createServer!!!!
* {:.fragment} `createServer` gets a callback function, though... __what is this callback for?__ &rarr;
* {:.fragment} it's the function that's called when a client connects to the server... the callback gets a socket passed to it as an argument... which can be used to read and write data to the client
* {:.fragment} here's a simple example:

<pre><code data-trim contenteditable>
const net = require('net');
const server = net.createServer(function(sock) {
    console.log('Got connection from (addr, port):', sock.remoteAddress, sock.remotePort); 
});
server.listen(8080, '127.0.0.1');
</code></pre>
{:.fragment}

</section>

<section markdown="block">
## The Socket Object

__On every connection:__ &rarr;

* the callback passed to `createServer` gets called with an instance a `Socket` object
* you can think of that socket object _as our interface to the connection_ to the client
* __what can the socket object do?__ &rarr;
    * {:.fragment} respond to `data` events (that is, read data...)
    * {:.fragment} respond to `close` events (listen for a closed connection)
    * {:.fragment} `write` data to the client
* {:.fragment} note that events work by calling `on` and sending it a callback that determines what to do on that event
</section>

<section markdown="block">
## An Echo Server Example

The classic _hello world_ for network programming is an __echo server__. __Here's our version__. &rarr;

<pre><code data-trim contenteditable> sock.on('data', function(binaryData) {
    console.log('got data\n=====\n' + binaryData); 
    sock.write(binaryData);

    // uncomment me if you want the connection to close
    // immediately after we send back data
    // sock.end();
});
</code></pre>
</section>

<section markdown="block">
## Echo Server &rarr; Web Server

So... if we try pointing our browser to our echo server, not much happens. __Our server doesn't "speak HTTP" yet__. 
__What do we have to do if we want to turn our echo server into a web server that responds to different paths by sending back html documents?__ &rarr;

* {:.fragment} treat the incoming data as http, and parse out the path
* {:.fragment} send back valid http responses with an html document as the body

</section>

<section markdown="block">
## Web Server - Setup

Aaand... we did just that! During our live coding demo, __we came up with this code__... &rarr;

First, some setup:

<pre><code data-trim contenteditable>
const net = require('net');

// Request object goes here...

const server = net.createServer(function(sock) {
    // "routing" goes here
});
server.listen(8080, '127.0.0.1');
</code></pre>
</section>

<section markdown="block">
## Web Server - Request Object

__Then, a `Request` object to parse out the path:__ &rarr;

<pre><code data-trim contenteditable>
class Request {
    constructor(s) {
        const requestParts = s.split(' ');
        const path = requestParts[1];
        this.path = path;
    }
}
</code></pre>
</section>

<section markdown="block">
## Web Server - Routing / Content

__Now let's do routing and serving content all in one shot!__ &rarr;

On connection ...
<pre><code data-trim contenteditable>
    console.log('connected', sock.remoteAddress, sock.remotePort);
    sock.on('data', (binaryData) => {
        const reqString = '' + binaryData; 
        const req = new Request(reqString);
        if(req.path === '/about') {
            sock.write('HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n<h2>hello</h2>');
        } else  if(req.path === '/test') {
            sock.write('HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n<h2>test</h2>');
        }         
        sock.end();
    });
</code></pre>
</section>



