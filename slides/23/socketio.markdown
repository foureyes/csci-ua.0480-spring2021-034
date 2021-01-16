---
layout: slides
title: "socket.io"
---

<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## It's Time to Get Real(time)

In all of our web applications so far (with the exception the client-side only app)...

__We've always had to ask the server if there was new information or data.__ &rarr;

* {:.fragment} the server couldn't push information to the browser without being asked first
* {:.fragment} that's the way http (well, 1.1) works (it's a request / response protocol)
* {:.fragment} it's kind of [like this](http://i.stack.imgur.com/TK1ZG.png), right? (thanks for [the diagrams](http://stackoverflow.com/questions/11077857/what-are-long-polling-websockets-server-sent-events-sse-and-comet), Stack Overflow)
</section>

<section markdown="block">
## So What?

__What are the consequences of the client not being able to be updated for a user's experience on an application that relies changing data?__ &rarr; (like... say a chat application, a stock ticker, or a game) 

* {:.fragment} the user doesn't see the data unless they ask for it
* {:.fragment} the data that a user sees gets stale / out of date
* {:.fragment} it's not _real time_

</section>

<section markdown="block">
## We Can Fake Real Time Though

Our attempt at making a _chat application_ looked pretty real time, though. __How did that work again?__ &rarr;

* {:.fragment} we used __AJAX polling__...
* {:.fragment} we loaded the initial page
* {:.fragment} in the background, we used JavaScript to continually ask if there were any new messages (approximately every 500 ms! ... looks realtime enough ,right?)
* {:.fragment} still http based (request / response)

</section>

<section markdown="block">
## AJAX Polling

__AJAX Polling__ is totally a fine solution, and may actually be the optimal solution based on the problem at hand. __But there are some drawbacks.__ &rarr;

* {:.fragment} there still could be delays! it's not _actually_ realtime, so if you can't have lag, this isn't the way to go
* {:.fragment} that's a lot of requests / responses! kind of not really that efficient
* {:.fragment} it [looks like this](http://i.stack.imgur.com/qlMEU.png)
</section>

<section markdown="block">
## Techniques for Realtime (or Near Realtime) Communication 

So... there are actually a bunch of ways to have (or at least mimic) realtime communication between a client and a server. We know the first one, of course!

* __AJAX Polling__
* __Long Polling__
* __Server-Sent Events__
* __Web Sockets__

</section>

<section markdown="block">
## Long Polling

__Long Polling__ is actually just a slight variation on the regular polling technique from before. 

* like regular polling, long polling isn't actually realtime, it just fakes it
* it polls as well, but less frequently 
* when the server receives a request it immediately returns new data if it's available
* however, if there's no new data to return, it keeps the connection open, and returns the data once it becomes available
* once the client receives data, it immediately sends another request to the server again
* it's still over http
* [it looks like this](http://i.stack.imgur.com/ziR5h.png)
</section>

<section markdown="block">
## Server Side Events

__Server Side Events, or SSEs__ allow servers to push data to their clients!

* still over http
* after the initial page is loaded...
* in the background, JavaScript connects to the server
* the connection remains open, and the server is able to _push_ data
* the client can't send data back to the server
* [here's what it looks like](http://i.stack.imgur.com/ziR5h.png)
</section>

<section markdown="block">
## Web Sockets

Finally, there's __WebSocket__. __It's not HTTP__.  __WebSocket__ is actually __another protocol__. It allows simultaneous communication in both directions (that is, it's _full duplex_).

* designed to be _implemented_ by both browsers and servers
* it's independent from HTTP
* however, the initial page is still loaded using HTTP
* but after that, the page uses JavaScript to create a two way connection with the server (there's a point where the protocol is _upgraded_ from HTTP to Web Sockets)
* the server and client can send messages to each other freely!
* __allows cross origin communication__ (though, possibly at the cost of security!)
* [here's what it looks like](http://i.stack.imgur.com/CgDlc.png)
</section>

<section markdown="block">
## Web Sockets Continued

Web Sockets are __great__! They're pretty much the _real_ deal when it comes to _real_ time communication. The server and client can send data whenever they want! There are a few drawbacks, though:

* both the server and the client have to support an entirely new, and additional protocol 
* as a protocol, it's more complex than HTTP (but, fortunately, we don't really have to deal with implementation details)
</section>

<section markdown="block">
## Socket.IO

So... that's quite a few competing technologies! Instead of choosing a single one, let's use a library that supports multiple techniques. __Let's use Socket.IO__ &rarr;

__Socket.IO__ is a library for realtime web applications.
{:.fragment}

* it has both a server side and a client side component
* both have very similar APIs (_nice_)
* it's event driven
* behind the scenes, it primarily uses Web Sockets, but it can fall back to polling (maybe the server or client doesn't support Web Sockets)
* (though that's hidden away, as it _really_ uses its own protocol that works on top of these)
{:.fragment}
</section>

<section markdown="block">
## Socket.IO Continued

Again, Socket.IO is made up of two parts:

* a server that mounts on or attaches to Node's HTTP Server
* a client-side library that allows interaction with the server

</section>
<section markdown="block">
## Socket.IO Client and Server API

Both the client and server parts essentially do the same thing:

* allow the sending (or emitting) of events
* provide a way to define event handlers 
</section>

<section markdown="block">
## Setting up the Socket.IO Server Component	

__The general steps for working on the server-side with Socket-IO are:__ &rarr;

* {:.fragment} create a Socket.IO server and attach it to your existing HTTP server 
* {:.fragment} define what the server will do on connection
* {:.fragment} within that connection handler: 
	* {:.fragment} define what the server will handle other _custom_ events
	* {:.fragment} emit messages
</section>

<section markdown="block">
## Setting up Socket.IO on the Client

__To get the client portion of Socket.IO working:__ &rarr;

* {:.fragment} bring in the client side library
* {:.fragment} create a socket object (an interface to the connection) 
* {:.fragment} use that socket object to:
	* {:.fragment} send messages
	* {:.fragment} define callbacks that get triggered on specific events
</section>

<section markdown="block">
## Notes About the Available Objects

On the server, you'll be using these two objects to send messages to clients and to handle events from clients.:

* a [Server object](http://socket.io/docs/server-api/#server) (a convention is to name this io)
	* 
* a [Socket object](http://socket.io/docs/server-api/#socket) - the main object used for interacting with the browser

<br> 

On the client:

* you'll get a global [IO object](http://socket.io/docs/client-api/#client-api) that allows you to create a Socket object
* your client-side [Socket object](http://socket.io/docs/client-api/#socket) let's you communicate with the server
</section>
<section markdown="block">
## (Some) Server Functions

The `Server` object represents socket.io server. Instantiate it by:

<pre><code data-trim contenteditable>
const io = require('socket.io')();
</code></pre>

Some methods that you can call on it are:

* __<code>io.on('event name', callback)</code>__
	* {:.fragment} register a callback to handle a server event
    * {:.fragment} callback takes a socket as a param; socket is an object that allows interaction with a connected client
	* {:.fragment} start off by defining what to do on the 'connect' event
* __<code>io.emit('event name', 'message')</code>__ (or <code>io.sockets.emit('event name', 'message')</code>)
	* {:.fragment}send a message to all connected clients (including the one that is on the _current_ socket!)
	* {:.fragment} the message can be anything supported by JSON (strings, objects, etc. ... but not functions)
</section>

<section markdown="block">
## (More) Server Functions (and Properties)

The callback passed to `on` for a connection event has a __socket__ as a parameter. This socket object can be used to interact with the connected client:

* __<code>socket.on('event name', callback)</code>__
	* {:.fragment} define a callback to handle socket event
	* {:.fragment} usually custom event names (events that you create)
* __<code>socket.emit('event name', 'message')</code>__ <span class="fragment"> - send a message to this connected client only</span>
* __<code>socket.broadcast.emit('event name', 'message')</code>__
	* {:.fragment} send a message to all connected clients __except__ for yourself (the socket that sends the message)
* __<code>socket.id</code>__ <span class="fragment"> - a unique identifier for the socket session / connected client</span>
</section>

<section markdown="block">
## (Some) Client Functions

* __<code>io</code>__ 
    * {:.fragment} a function that gives back a socket object
    * {:.fragment} socket can be used to interact with server
    * {:.fragment} `const socket = io('http://localhost');`
* __<code>socket.on('event name', callback)</code>__ 
    * {:.fragment} listen for an event name, trigger the callback
* __<code>socket.emit('event name', 'message')</code>__  
    * {:.fragment} send a message to the server

</section>
<section markdown="block">
## Events

Both the server and client side of have built-in events. __A couple of common ones are:__ &rarr;

* <code>connect</code> - a client connects to the server
* <code>disconnect</code> - a client disconnects from the server

<br>
Note, however, __you can define any custom event name that you'd like__ - just specify it as the first argument when calling your <code>emit</code> or <code>on</code> methods.
{:.fragment}
</section>

<section markdown="block">
# Let's Start Simple... Just Log Some Client Server Connections
</section>

<section markdown="block">
## Installing on the Server

First, create your Express project. We can generate a project as usual or build an express app from scratch.


__Then, install the Socket.IO Node module:__ &rarr;

<pre><code data-trim contenteditable>
npm install --save socket.io
</code></pre>
</section>

<section markdown="block">
## Some Server-Side Set Up

Socket.IO requires access to the underlying HTTP server object that backs express (you remember the __<code>http</code>__ module, right!?).

In its simplest form, you can _attach_ a socket.io Server to Express using this code:

<pre><code data-trim contenteditable>
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
app.use(express.static('public'));


server.listen(3000);
</code></pre>


</section>
<section markdown="block">
## Server Side Set Up with with Generator

That was a little different than what we're used to doing. If you want to use express generator, a quick way to attach a socket.io server is to:

* copy the contents of __<code>/bin/www</code>__
* ... to __<code>app.js</code>__
* remove the unnecessary require line
* the end of your app.js file should now look like this (after: module.exports = app)

<pre><code data-trim contenteditable>
const debug = require('debug')('projectname');

app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
</code></pre>
</section>

<section markdown="block">
## Set Up the Socket.IO Server

Create a Socket.IO server by 

* requiring <code>socket.io</code>
* and immediately calling it as a function, passing in your HTTP server from your previous Express setup code 

<br>
<pre><code data-trim contenteditable>
const io = require('socket.io')(server);
</code></pre>

This adds Socket.IO support to your HTTP server!
</section>

<section markdown="block">
## Listen for Connections

Once your server is set up, you can define what it should do when a client connects. __Let's just log that someone has connected, along with their ID.__ &rarr;


<pre><code data-trim contenteditable>
io.on('connection', function(socket) {
	console.log(socket.id, 'has connected!');
}
</code></pre>
{:.fragment}

Note that the callback:
{:.fragment}

* has a single parameter, a Socket object
* you'll use that within your callback to define other event handlers
* __the socket object is unique per connected client__
{:.fragment}
</section>

<section markdown="block">
## Setting Up You Client

Create a new static page in your <code>/public</code> folder... or create an appropriate view / route combination for the page that you'll serve.

</section>

<section markdown="block">
## Including the Client Side Library

The _development_ server automatically serves up the client-side library at:

<pre><code data-trim contenteditable>
/socket.io/socket.io.js
</code></pre>

This gives your page access to a global <code>io</code> object. So... make sure to include the library:

<pre><code data-trim contenteditable>
&lt;script src="/socket.io/socket.io.js"&gt;&lt;/script&gt;
</code></pre>
</section>

<section markdown="block">
## Create a Socket

Use the global io object to create a Socket object

<pre><code data-trim contenteditable>
const socket = io();
</code></pre>

...And __that's it!__. Let's test it out. __Start your server and load your page in a few browser windows.__

</section>

<section markdown="block">
## Adding Another Event on the Server

We can listen for disconnects using the <code>disconnect</code> event. Instead of using the Server object, we'll use the socket that we have from the connect event handler. 

__Add this code within your connect event handler.__ &rarr;

<pre><code data-trim contenteditable>
socket.on('disconnect', function() {
	console.log(socket.id, 'good bye!');
});
</code></pre>
__Try closing a connected browser tab. Try refreshing.__
</section>

<section markdown="block">
## Send and Receive Custom Events

Let's try sending an event from our client immediately after connecting:

__Set up a connect handler on the client.__ &rarr;

<pre><code data-trim contenteditable>
socket.on('connect', onConnect); 
</code></pre>

__In your callback, send a custom event to the server.__ &rarr;

<pre><code data-trim contenteditable>
function onConnect() {
	socket.emit('my awesome event', 'a message');
}
</code></pre>
</section>

<section markdown="block">
## Send and Receive Custom Events Continued

Now our server has to listen for that custom event. __Within your main on connect handler in app.js...__ &rarr;

<pre><code data-trim contenteditable>

socket.on('my awesome event', function(message) {
	console.log(message);
}
</code></pre>

You can name your callback's argument whatever you like. It represents the second value passed in to your client's emit.

In fact... __we can try changing the data that we send from a plain old string to an object!__ &rarr;

</section>

<section markdown="block">
## Let's Rewrite Our Chat

We can write a simpler version of our chat (it'll be slightly different, since we won't have it be database backed) using Socket.IO.

__How might we do this?__ &rarr;

* set up as described above
* create a custom event for chat messages
	* these will be emitted from the client
	* ...when received by the server, the message, in turn, will be relayed to all clients using some version of emit
	* the client will listen for that event in order to update the ui
{:.fragment}
</section>

<section markdown="block">
## Server Side Chat Code

Really... __all we have to add here is a custom event handler that just emits to everyone (<code>io.sockets.emit</code>)__: &rarr;

<pre><code data-trim contenteditable>
// our previous setup 
const io = require('socket.io')(server);
io.on('connection', function(socket) {
  console.log(socket.id, 'connected');  
  socket.on('disconnect', function() {
    console.log(socket.id, 'disconnected');
  });
  // our custom event handler goes here
});
</code></pre>
{:.fragment}

<pre><code data-trim contenteditable>

  // handling our custom event
  socket.on('chat message', function(msg) {
    console.log('got message:' + msg);
    io.sockets.emit('chat message', msg);
  });
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Client Side Markup

__Minimally, what markup would we need for this app?__ &rarr;

* a text input and a button
* a place to dump the messages
* (remember to include the Socket.IO client library)
{:.fragment}

<br>
<pre><code data-trim contenteditable>
&lt;ul id="messages"&gt;&lt;/ul&gt;
&lt;input id="message-input" type=text autocomplete="off"&gt;&lt;input type="button" value="Submit"&gt;
&lt;script src="/socket.io/socket.io.js"&gt;&lt;/script&gt;
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Now for Some Setup

__Let's create our socket... and setup our button to trigger a function called <code>sendMessage</code> when it's clicked:__ &rarr;

<pre><code data-trim contenteditable>
const socket = io();
const button = document.querySelector('input[type=button]');
console.log(button);
button.addEventListener('click', sendMessage);
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Define SendMessage

Send message should simply grab the value of the input field and emit it to the server using our custom event name.

__How would we code that up?__ &rarr;

<pre><code data-trim contenteditable>
function sendMessage(evt) {
	console.log('sending message', evt);
	socket.emit('chat message', document.querySelector('#message-input').value);
	document.querySelector('#message-input').value = '';
}
</code></pre>
{:.fragment}

__Let's pause here to test it out. We should get some console output both in our client and server.__ &rarr;
{:.fragment}
</section>

<section markdown="block">
## Now, Let's Handle a Message From the Server

Ok... so the server should be emitting messages whenever it receives them from a client. How do we define some action to take on the message emitted from the server?

__Define a function that listens for a chat message from the server... and add a list item to our unordered list.__ &rarr;

<pre><code data-trim contenteditable>
socket.on('chat message', onMessage);
function onMessage(msg) {
	document.querySelector('#messages').appendChild(document.createElement('li')).textContent = msg;
}
</code></pre>
{:.fragment}

__Let's see if it works!__ &rarr;
{:.fragment}

__Such real time! (maybe, if all goes well)__
{:.fragment}
</section>

<section markdown="block">
# But how realtime can we get? Can we track mouse info?
</section>

<section markdown="block">
## Mouse Tracking

Create an app that:

* that shows the mouse position of other connected users
* their position should be tracked realtime
* their cursor can be represented by their socket id
* maybe a <code>div</code> element with a textContent equal to their socket id
* __that div element can have an id that's set to the socket id... so that we can track each individual mouse__
</section>

<section markdown="block">
## About Mouse Movement

We know that we can grab a <code>click</code> event from our mouse.  It turns out that we can also trigger a function _whenever our mouse moves!_. 

* call addEventListener on the element that you want to track mouse moves over (use <code>document</code> for the whole page)
* __The event object passed to your callback will hold the mouse coordinates!__

<br>
<pre><code data-trim contenteditable>
document.addEventListener('mousemove', function(evt) {
	console.log(evt.x, evt.y);
});
</code></pre>

Again, note that evt has <code>x</code> and <code>y</code> properties. __Let's try it.__ &rarr;

__Armed with this knowledge, we can code up our mouse tracking application.__ &rarr;

</section>

<section markdown="block">
## Let's Start on the Client This Time

First... let's modify our mousemove handler so that it sends over its x and y coordinates to the server instead of just logging it.

<pre><code data-trim contenteditable>
document.addEventListener('mousemove', function(evt) {
	console.log(evt.x, evt.y);
	socket.emit('mouse', {x:evt.x, y:evt.y});
});
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Now, on the Server...

__How do we listen for all of these mouse events that are being sent our way!? Let's log out the x and y coordinates AND the socket.id where they came from.__ &rarr;

Within our connection handler, specify what we should do when we receive a mouse event.
{:.fragment}

<pre><code data-trim contenteditable>
// inside our main connection handler

socket.on('mouse', function(data) {
	// might be nice to see who's moving
	data.id = socket.id;
	console.log('other mouse', data);
});
</code></pre>
{:.fragment}

__Note that we add the socket id here. We'll use that later!__
{:.fragment}
</section>

<section markdown="block">
## If That Works, Let's Broadcast

Hopefully we'll get console output on the server for every mouse move!

If we do, we can go ahead and emit those coordinates and id as another custom event to all _other_ clients. __Let's make a simple addition. The whole thing should look like:__ &rarr;

<pre><code data-trim contenteditable>
io.on('connection', function(socket) {
  socket.on('mouse', function(data) {
    data.id = socket.id;
	console.log('other mouse', data);
    socket.broadcast.emit('other mouse', data);
  });
});
</code></pre>
</section>

<section markdown="block">
## Aaaaaand Back to the Client

Let's create our custom <code>other mouse</code> event handler. __What do you think it should:__ &rarr;

* listen for the custom event
* check to see if an element with the socket id from the event exists
* if it doesn't, create one
	* set its textContent to the socket id
	* set its id to the socket id
	* set its class to otherMouse so that we can add some styling...
* set the coordinates of the div
* __(by the way, how do we get this div to be positioned at specific coordinates)__ &rarr;
{:.fragment}

Use top and left ... and
{:.fragment}

<pre><code data-trim contenteditable>
.otherMouse {
	position: fixed;
}
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## OK... Let's Get Some Code Together

So... from the description in the previous slide, __the analogous code may look like this.__ &rarr;
<pre><code data-trim contenteditable>
socket.on('other mouse', function(data) {
	console.log(data);
	let otherMouse = document.getElementById(data.id);
	if (!otherMouse) {
		otherMouse = document.body.appendChild(document.createElement('div'));
		otherMouse.id = data.id;
		otherMouse.textContent = data.id;
		otherMouse.classList.add('otherMouse');
	}
	otherMouse.style.top = data.y + "px";
	otherMouse.style.left = data.x + "px";
});
</code></pre>
{:.fragment}

__Note that the top and left values are in pixels.__
{:.fragment}

</section>
