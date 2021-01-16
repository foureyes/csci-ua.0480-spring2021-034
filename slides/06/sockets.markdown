---
layout: slides
title: "Networking and Sockets"
---
<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## Some Definitions

Before we start, we should probably get a few definitions out of the way!

* __ip address__ - number given to a computer / device on a network
* __port__ - a number given to a communication end point that usually represents some specific service... allowing multiple services to be run on the same device... an analogy from this [guide to network programming](http://beej.us/guide/bgnet/output/html/singlepage/bgnet.html) compares an ip address to a street address of a building, and a port to an apartment number in that building
* __socket__ - an endpoint to a connection... so there are two sockets per connection, but in network programming apis, a socket object is typically the object that mediates communication (reads/writes) to a connected client or server... [this SO article goes deep on sockets vs ports](http://stackoverflow.com/questions/152457/what-is-the-difference-between-a-port-and-a-socket)
* __localhost__ - 127.0.0.1 ... or your _local_ computer... when used as the domain name in `nc`, your browser, etc. ... the connection is made from your computer to a service running on itself

</section>
<section markdown="block">
## net module

Node comes with a built in `net` module. It provides __functions for creating servers and clients__.

The following creates a server that listens on port `8080`. It will log out the address and port that connected to it.

(Details in following slide)

<pre><code data-trim contenteditable>
const net = require('net');
const HOST = '127.0.0.1';
const PORT = 8080;

const server = net.createServer((sock) => {
    console.log(`got connection from ${sock.remoteAddress}:${sock.remotePort}`);
});

server.listen(PORT, HOST);
</code></pre>

</section>

<section markdown="block">
## Running the Above Example

To run the above example, you'll have to have two terminal windows / tabs open.

1. run `node myFile.js` in one window
    * this is your __server__, it's waiting for connections
    * note that it'll look like terminal is _frozen_ or waiting for _something_
    * anything you `console.log` out will be shown in this window
    * to stop your server, use CTRL + c
2. in another terminal, use netcat as a client to connect to your server
    * `nc localhost 8080`
    * you can type text that gets sent to the server...
    * again, CTRL + c will close the client

</section>

<section markdown="block">
## createServer

__The `createServer` function__:

1. can be called with one argument, a callback function specifying what to when a client connects
    * the callback has an argument, the "socket" that represents a "connection" to the client 
    * (though again, a socket conceptually is just an end point)
2. returns an instance of a `Server` object
    * this object can be bound to a port and address
    * ... so that it can start listening for client connections

</section>

<section markdown="block">
## Server Object and Listen

__Again, the server object has a `listen` method__ &rarr;

* {:.fragment} this tells the server to start accepting connections on the supplied port and hostname
* {:.fragment} 127.0.0.1 is _localhost_
* {:.fragment} if hostname is left out, it'll accept connections on _any_ address (for example, binding to the current address of the machine that it's running on so that it's accessible outside of localhost)
* {:.fragment} leaving out the port number lets the os decide what the port number should be

</section>

<section markdown="block">
## Socket Object Events

__You can specify what your server will do based on specific events by using the socket object that's passed in to your anonymous function / callback for initial connection.__ 

Some examples of socket events include:

* `data` - generated when socket receives data
* `close` - generated when socket is closed

<br>
Use `someSocketObject.on(eventName, callback)` to specify what to do on these events.
</section>


<section markdown="block">
## On Data and On Close

Here's an example of logging out when a socket receives data... and when a socket is closed:

<pre><code data-trim contenteditable>
// setup above
const server = net.createServer((sock) => {

    sock.on('data', (binaryData) => {
        console.log(`got data\n=====\n${binaryData}`);
    });

    sock.on('close', (data) => {
        console.log(`closed - ${sock.remoteAddress}:${sock.remotePort}`);
    });
});

// listen below
</code></pre>

<br>
</section>


<section markdown="block">
## Socket On....

Let's take a closer look at one of these event handlers:

<pre><code data-trim contenteditable>
sock.on('data', function(data) {
});
</code></pre>

<br>
The callback function for `sock.on` has a single parameter, `data`, which represents the binary data sent to the server.

* `data` is (usually) going to be a `Buffer` object 
* a `Buffer` is just a representation of binary data (perhaps it's in this format because no encoding was specified!)
* you can call `toString` on a `Buffer` object which assumes `utf-8`
* you can create a buffer from a string using `Buffer.from("some string", encoding)`, where encoding can be:
    * `'utf8'`
    * `'ascii'`
</section>

<section markdown="block">
## Write and End

Of course, you can also send data to the client with socket's `write` and `end` methods

1. __`write(data, encoding)`__ - sends data back to the connected client
    * you can send back binary data (a buffer)
    * or a string (which, by default uses utf-8 for encoding... otherwise specify by explicitly passing encoding)
2. __`end`__ - let's the client know that it wants to stop the connection
    * end also takes a single argument... which is just data to send just before closing  (like calling `write` then `end` consecutively)

<br>
Example usage demonstrating a few writes, and then an end:
<pre><code data-trim contenteditable>
sock.write('hello'); 
sock.write('how are you?'); 
sock.end('goodbye');  // lets client know connection will be closed 
// (there's also sock.destroy to close the connection immediately)
</code></pre>

</section>

<section markdown="block">
## Echo

Here's a server that just sends back the data that it is sent to it by the client. To have it disconnect after it gets data, uncomment `sock.end()`.

<pre><code data-trim contenteditable>
// within create server
sock.on('data', function(binaryData) {
    console.log('got data\n=====\n' + binaryData); 
    sock.write(binaryData);

    // uncomment me if you want the connection to close
    // immediately after we send back data
    // sock.end();
});
</code></pre>
</section>

<section markdown="block">
## Some Things to Try

1. point your browser to your server!
2. check out what data you receive
3. is that data meaningful?
4. how can you extract information from it?
5. try sending stuff back to the browser!

</section>

