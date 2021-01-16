---
layout: slides
title: "Events Revisited"
---

<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## A Clicked Button

Our textbook sets up the following scenario...

* imagine that you're working with some user interface library
* ... that has a button that contains some state - whether it has been clicked or not
* the only way to determine if the button is being pressed is by asking the button for its state
* __how can you have an action occur as soon as the button is clicked?__ &rarr;

<br>
You'd have to repeatedly _ask_ (read) the button for its state (at a very tiny time interval), and then perform the desired action.

* this approach is called __polling__
* it could be a bit resource intensive, as you have to do very often to make the button click seem _responsive_

</section>

<section markdown="block">
## Event Handlers

Another paradigm for dealing with events is to have an API that allows functions to be called as a reaction to an event.

This is what JavaScript in the browser allows us to do:

* register a function as a __handler__ for a specific event
* the function is called when that event occurs
* this is done through a method called [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)

</section>

<section markdown="block">
## addEventListener

Hey... __where does this method come from... what kind of object can you call it on (let's try it out)?__ &rarr;

* document.addEventListener
* document.body.addEventListener
* document.getElementsByTagName('div')[0].addEventListener

<br>

Remember that __Node__ objects have a prototype of __EventTarget__... and all elements are just nodes in the DOM
{:.fragment} 

<pre><code data-trim contenteditable>
var ele = document.getElementsByTagName('div')[0];
while (Object.getPrototypeOf(ele)) { 
	console.log(Object.getPrototypeOf(ele)); 
	ele = Object.getPrototypeOf(ele);
}
</code></pre>
</section>

<section markdown="block">
## addEventListener Example

So... that means every DOM element has __addEventListener__, and you can use it to listen for events on that specific element.

For example:

<pre><code data-trim contenteditable>
var b = document.querySelector(&#x27;button&#x27;);
b.addEventListener(&#x27;click&#x27;, sayHello);
function sayHello(evt){
  console.log(&#x27;hello&#x27;);
}
</code></pre>
</section>

<section markdown="block">
## addEventListener Details

So... some things to note about __addEventListener__ ...

* it takes two arguments, an event (as a string), and a callback
* the __event name__ is a string
	* there are [lots of standard events](https://developer.mozilla.org/en-US/docs/Web/Events)
	* we're interested in <code>click</code> and <code>DOMContentLoaded</code>
* the __callback__ is a function with an optional parameter - the event object that represents the event
	* the event object may have information such as which mouse button was clicked
	* what its x and y value are
	* the unicode code point of the key pressed
	* etc.
</section>

<section markdown="block">
## About the Event Listener's Callback

__A few more details about the callback__ &rarr;

* any function will do - named or anonymous, but you have to have a named function to remove it with <code>removeEventListener</code>
	* <code>removeEventListener('eventName', nameOfCallback);</code>
* also, within the function __this__ is set to the element the that event listener was added to
* __let's see all of this in action__ &rarr;

</section>

<section markdown="block">
## Event Object, this and Removing Event Handlers

Using the same example.... __let's remove the event listener on click so that it only says hello on the first click... and does nothing afterwards. We'll also log out some event object properties__ &rarr;

<pre><code data-trim contenteditable>
var b = document.querySelector(&#x27;button&#x27;);
b.addEventListener(&#x27;click&#x27;, sayHello);
function sayHello(evt){
  console.log(&#x27;hello&#x27;);
}
</code></pre>

<pre><code data-trim contenteditable>
console.log(evt.x, evt.y, evt.which);
this.removeEventListener('click', sayHello);
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Bubbling / Propagation

So... what happens if you have two elements nested within each other, and both have event listeners?

* {:.fragment} the event handler of the more specific element (the innermost element) gets called first
* {:.fragment} ...then the element bubbles up through the element's parent elements, triggering their event handlers as well
</section>

<section markdown="block">
## Bubbling / Propagation Example

__Let's try nesting two elements (maybe a button in an article), add adding event listeners to both.__ &rarr;

<pre><code data-trim contenteditable>
&#x3C;article&#x3E;
  &#x3C;h1&#x3E;About Events&#x3C;/h1&#x3E;
  &#x3C;button&#x3E;Click to Say Hello&#x3C;/button&#x3E;
&#x3C;/article&#x3E;

// in js
var a = document.querySelector(&#x27;article&#x27;);  
var b = document.querySelector(&#x27;button&#x27;);
a.addEventListener(&#x27;click&#x27;, function(evt) {
  console.log(&#x27;article!&#x27;);  
});
b.addEventListener(&#x27;click&#x27;, function(evt) {
  console.log(&#x27;button!&#x27;);
});
</code></pre>
</section>

<section markdown="block">
## Preventing Propagation

You can also prevent events from bubbling up by calling <code>stopPropagation()</code> on the event object. __Let's try it with the previous example to stop the paragraph event listener from being triggered.__ &rarr;


<pre><code data-trim contenteditable>
// modify your previous button event listener
b.addEventListener('click', function(evt) {
  console.log('button!');
  // the event won't bubble up!
  evt.stopPropagation();
});
</code></pre>
</section>

<section markdown="block">
## Preventing Default Event Actions

Most events have default actions on them:

* clicking an input of type submit will GET or POST a form
* clicking on a link will take you to that link

<br>
But... __what if the default action was not your intention?__ &rarr;

Use the __preventDefault()__ method on the event object!
</section>

<section markdown="block">
## preventDefault Example

__Create a link... but add an event listener to stop the browser from going to the page linked to...__ &rarr;

<pre><code data-trim contenteditable>
&#x3C;a href=&#x22;http://nyu.edu&#x22;&#x3E;a link to nyu&#x3C;/a&#x3E;

// in js
var a = document.querySelector(&#x27;a&#x27;);  

a.addEventListener(&#x27;click&#x27;, function(evt) {
  console.log(&#x27;link clicked!&#x27;);  
  evt.preventDefault();
});
</code></pre>


</section>
