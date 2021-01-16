---
layout: slides
title: "Socket.io, Rooms"
---
<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>



<section markdown="block">
## Don't Want to Broadcast to Everyone?

Socket.IO allows you to have rooms...

* sockets can join and leave rooms
* messages can be emitted to specific rooms
</section>

<section markdown="block">
## Rooms Continued

The server can add a client to a room by using <code>join</code>:

<pre><code data-trim contenteditable>
socket.join('some room', optional_cb_function);
</code></pre>

The callback is called when the socket has successfully joined a room.

You can see all of the rooms that a socket is in as an object with:

<pre><code data-trim contenteditable>
socket.rooms
</code></pre>

Note that: 

* everyone starts off in a default room based on their socket id
* you can also be in multiple rooms
</section>

<section markdown="block">
# Joining a Room Demo

</section>
<section markdown="block">
## On the Server

Join a room immediately upon connection (this can be a custom event sent from the client).

<pre><code data-trim contenteditable>
  // listen for a custom event from the client and join that room
  socket.on('join', function(room) {
    console.log('join', room);
    // joining 
    socket.join(room, function() {
        console.log(socket.rooms); 
    });
  });

</code></pre>
</section>


<section markdown="block">
## On the Client

We just have to make sure that we send the custom join event... with the room that we'd like to join.

<pre><code data-trim contenteditable>
	socket.on('connect', onConnect);
	function onConnect() {
		console.log('connected');
		socket.emit('join', 'my very own room');
	}
</code></pre>
</section>

<section markdown="block">
## Sending Messages in Rooms

To send everyone in that room:

<pre><code data-trim contenteditable>
socket.to('some room').emit('some event', 'message'):
</code></pre>

To send to everyone in that room, but the connected client (socket):

<pre><code data-trim contenteditable>
socket.to('some room').emit('some event', 'message'):
</code></pre>
</section>

<section markdown="block">
# Multi Room Chat Demo

</section>

<section markdown="block">
## Multi Room Chat

In this demo:

1. the initial page will have two buttons, one for room 1, and another for room 2
2. clicking on one of the buttons will join that room and change the interface
    * the room buttons will be removed/hidden
    * a text input and a button will appear to send messages
3. sending a message will send only to clients in the same room
4. the messages will be displayed under the text input and button
</section>


<section markdown="block">
## Server Code

Boiler-plate setup code for socket.io.

<pre><code data-trim contenteditable>
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
app.use(express.static('public'));

io.on('connect', (socket) => {
  // add custom event listeners here
});

server.listen(3000);
</code></pre>

</section>

<section markdown="block">
## Server Code Continued

Now we'll handle what to do when:

* a client joins a room
* a client sends a message

<pre><code data-trim contenteditable>
// in connect handler...
    let room; // capture the room in our closure
</code></pre>

<pre><code data-trim contenteditable>
    socket.on('join', (num) => {
        console.log(num);
        room = `room${num}`;
        socket.join(room);
    });
</code></pre>

<pre><code data-trim contenteditable>
    socket.on('chat message', (message) => {
        console.log('got message', message);
        io.to(room).emit('chat message', message);
    });
</code></pre>
</section>

<section markdown="block">
## Mark Up

We'll have our join room buttons and our chat interface in the markup...

* the room buttons should be visible
* the chat interface will default to hidden

<pre><code data-trim contenteditable>
&lt;style type="text/css" media="screen"&gt;
.hidden {
  display: none;
}
&lt;/style&gt;
</code></pre>
<pre><code data-trim contenteditable>
&lt;script src="/socket.io/socket.io.js"&gt;&lt;/script&gt;
&lt;script src="game.js"&gt;&lt;/script&gt;
&lt;button data-room="1"&gt;Room 1&lt;/button&gt;
&lt;button data-room="2"&gt;Room 2&lt;/button&gt;
&lt;input type="text" class="hidden" id="message"&gt;
&lt;button class="hidden" id="sendBtn"&gt;Send&lt;/button&gt;
</code></pre>
</section>

<section markdown="block">
## Client Code

The client code will have to handle:

* joining a room
* sending a message
* reacting to a sent message

<br> 
First, let's start with some globals, and our DOMContentLoaded...

<pre><code data-trim contenteditable>
document.addEventListener("DOMContentLoaded", init);
// connect (note that we should probably only proceed after on connect,
// but we're ignoring that in this example code)
const socket = io();
</code></pre>

<pre><code data-trim contenteditable>
function init() {
    // add listeners for our room buttons
    const buttons = document.querySelectorAll('button[data-room]');
    for(const button of buttons) {
        console.log(button);
        button.addEventListener('click', handleRoomClick); 
    }
}
</code></pre>

</section>

<section markdown="block">
## Choosing a Room

Let's define handleRoomClick so that our client can join a room:

<pre><code data-trim contenteditable>
function handleRoomClick() {
    // join a room
    const room = this.getAttribute('data-room');
    socket.emit('join', room);

    // deal with interface below...
    
}
</code></pre>

</section>

<section markdown="block">
## Changing the Interface

Remove buttons and add a header:

<pre><code data-trim contenteditable>
const buttons = document.querySelectorAll('button[data-room]');
for(const button of buttons) {
    button.classList.add('hidden');
}

document.body.appendChild(
        document.createElement('h2'))
        .textContent = `Room ${room}`;
</code></pre>

Add in chat interface and event listeners...

<pre><code data-trim contenteditable>
const sendBtn = document.querySelector('#sendBtn');
const message = document.querySelector('#message');

sendBtn.classList.remove('hidden');
message.classList.remove('hidden');
sendBtn.addEventListener('click', sendMessage);
socket.on('chat message', onMessage);
</code></pre>

</section>
<section markdown="block">
## Event Listeners for Sending / Receiving

<pre><code data-trim contenteditable>
function sendMessage() {
    const message = document.querySelector('#message').value;
    socket.emit('chat message', message);
}
</code></pre>

<pre><code data-trim contenteditable>
function onMessage(msg) {
    document.body.appendChild(
            document.createElement('div')) 
            .textContent = msg;
}
</code></pre>

</section>
