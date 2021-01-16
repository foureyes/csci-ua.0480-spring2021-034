---
layout: homework
title: CSCI-UA.0480 - Socket IO Lab
---

<div class="panel panel-default">
	<div class="panel-heading">socket.io Lab</div>
	<div class="panel-body" markdown="block">

# Socket IO Lab - Emoji Racer 

## Submission Process

* work in groups of 3 or 4 
* __submit using [the form on the schedule](../#class22)__
* __each person on the team should submit their own individual form__

If you'd like, you can work directly in glitch.com. Additionally, if you want to collaboratively edit, you'll likely have to create an account (though you're not required to).

## Scoring

* __+60%__ for showing up and submitting form  (that's it, really! 😮)
* __+25%__ form submitted with a _reasonable_ amount of _valid looking_ code
* __+15%__ code deployed on glitch.com (kind of optional, since you basically get 85% for just submitting a form with some code!)

## Overview

### Goals / Topics Covered

You'll be using the following concepts:

* socket.io
* some simple dom manipulation
* absolute or fixed positioning

### Description


Make a real time web app that:

1. displays two emoji
2. displays two buttons
3. displays a finish line
4. clicking on one button moves one emoji
	* the entire element containing the emoji should move
	* ⚠️ do not just change the margin or padding
5. everyone connected to the game can click either button
6. everyone connected to the game can see the emoji move in real time
7. when someone new connects to the game, the should see the current position of both emoji
8. try playing your game / looking over your code
	* 👀 does your game handle the case where two clients click on the same emoji... and it's registered as two movements (rather than 1) on the server?
	* 🤔 can you reduce your client side code so that there's only one click handler that's used for both buttons?
9. try to deploy to glitch.com

Finished already? 

* end game and show a message when one emoji crosses the finish line
* end game and show a message when one emoji wins, then show a reset button; when pressed, it will bring both emoji back to the start
* same as above, but when brining emoji back to start, animate with one of our JavaScript timing functions!




<img src="../resources/img/hw09-screen.gif" alt="example emoji racer animation">


## Instructions

### Setup

Use the _one-page_ version of the slides to guide you through socket.io:

[https://cs.nyu.edu/courses/fall20/CSCI-UA.0480-034/_site/slides/23/socketio.html?print-pdf](https://cs.nyu.edu/courses/fall20/CSCI-UA.0480-034/_site/slides/23/socketio.html?print-pdf)

1. create a directory to store your project
2. create your `package.json` and install these packages:
	<pre><code data-trim contenteditable>
npm init
npm install --save express socket.io
</code></pre>
3. use this boilerplate code for the server (perhaps in server.js or app.js):
    <pre><code data-trim contenteditable>
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
app.use(express.static('public'));
// server code goes here!
// first listen for connection using io.on
// then... within callback, use socket.on, socket.emit, socket.broadcast, etc.
// NOTE THAT WE ARE LISTENING WITH server, NOT app!
server.listen(3000);
</code></pre>
4. use this boilerplate code for the markup (in `public/index.html`):
	<pre><code data-trim contenteditable>
&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;title&gt;&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;script src="/socket.io/socket.io.js"&gt;&lt;/script&gt;
&lt;script src="racer.js"&gt;&lt;/script&gt;
&lt;button class="player1Btn"&gt;Move Tears of Joy &amp;rarr;&lt;/button&gt;
&lt;div class="play-area"&gt;
  &lt;div class="racer player1"&gt;&amp;#128514;&lt;/div&gt;
  &lt;div class="racer player2"&gt;&amp;#128561;&lt;/div&gt;
&lt;/div&gt;
&lt;button class="player2Btn"&gt;Move Face Screaming &amp;rarr;&lt;/button&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre>
5. use this boilerplate code for the client (in `public/racer.js`):
    <pre><code data-trim contenteditable>
    const socket = io();
</code></pre>

## Deployment

### Deploying to glitch.com

1. [go to glitch.com/edit](https://glitch.com/edit/)
2. modify the existing `package.json` so that it has both socket.io and express as requirements (but __keep everything else the same__)
3. add/modify necessary files!
    * for example...
    * modify `server.js` 
		* make sure you're listening with server obj
		* change the port to `process.env.PORT`
    * add the html from your `public/racer.html` to `public/index.html`
		* do this by clicking on `New File`
		* type in `public/index.html`
		* this will create a file in the `public` folder
    * change the name of `public/client.js` to `public/racer.js`
    * etc.
4. __again, change the port so that it looks in the env for the port number!__
    * `server.listen(process.env.PORT);`
5. click on the look link...  
    * instantly deployed app!
    * (click on logs link to see server output)

<div class="hideInner" markdown="block">

## Major Hints (Click to Reveal)

<div class="hidden" markdown="block">

### Wait, How Do I Even?

Most real-time games work by having the server be the _single source of truth_ for game state (for example, the positions of the emoji). 

An easy way to implement this game is by:

1. storing the positions of both emoji on the server (global variables would be sufficient)
2. pushing out the exact positions of each emoji to the connected clients
    * rather than incrementing the position
    * (because it reduces the possibility of the positions becoming out of sync)


### Don't feel like dealing with css? You can use this:

<pre><code data-trim contenteditable>
&lt;style type="text/css" media="screen"&gt;

.racer {
  position: absolute;
  left: 0px;
  font-size: 100px;
}

.player1 {
  top: 50px;
}    

.player2 {
  top: 300px
}    

.play-area {
  position: relative;
  width: 800px;
  height: 500px;
  border-right: 3px dashed black;
}

button {
  font-size: 3em;
}
&lt;/style&gt;

</code></pre>


</div>
<script>
document.addEventListener('DOMContentLoaded', main);
function main() {
    const divs = document.querySelectorAll('.hideInner');

    function handleClick() {
        this.querySelector('div').classList.toggle('hidden');
    }

    divs.forEach((d) => {
        d.addEventListener('click', handleClick);
    });
}

</script>
<style>
.hidden {
    display: none;
}
</style>


</div>
</div>
