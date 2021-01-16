---
layout: slides
title: "Events"
---

<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## A Clicked Button

Our textbook, Eloquent JavaScript, sets up the following scenario...

* imagine that you're working with some user interface library
* ... that has a button that contains some state - whether it has been clicked or not
* the only way to determine if the button is being pressed is by asking the button for its state
* __how can you have an action occur as soon as the button is clicked?__ &rarr;

<br>
You'd have to repeatedly _ask_ (read) the button for its state (at a very tiny time interval), and then perform the desired action.
{:.fragment}

* this approach is called __polling__
* it could be a bit resource intensive, as you have to do very often to make the button click seem _responsive_
{:.fragment}

</section>

<section markdown="block">
## Event Handlers

__Another paradigm for dealing with events is to have an API that allows functions to be called as a reaction to an event.__

The API that JavaScript in the browser offers allows us to:

1. register a function as a __handler__ for a specific event
2. have that function called when the event occurs

<br>

__All of this is done through a method called [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)__ &rarr;

</section>

<section markdown="block">
## addEventListener

__Where does this `addEventListsener` come from, and what kind of object can you call it on (let's try it out)?__ &rarr;

* document.addEventListener
* document.body.addEventListener
* document.getElementsByTagName('div')[0].addEventListener

<br>

Remember that __Node__ objects have a prototype of __EventTarget__... and all elements are just nodes in the DOM
{:.fragment} 

<pre><code data-trim contenteditable>
let ele = document.getElementsByTagName('div')[0];
while (Object.getPrototypeOf(ele)) { 
	console.log(Object.getPrototypeOf(ele)); 
	ele = Object.getPrototypeOf(ele);
}
</code></pre>
{:.fragment}

So... that means every DOM element has __addEventListener__, and you can use it to listen for events on that specific element.
{:.fragment}
</section>

<section markdown="block">
## addEventListener Example

__Here's a quick example of using `addEventListsener`:__ &rarr; 


The markup:

<pre><code data-trim contenteditable>
&lt;button&gt;Hello&lt;/button&gt;
</code></pre>

Print `hello` to the console whenever the button is clicked:

<pre><code data-trim contenteditable>
const b = document.querySelector(&#x27;button&#x27;);
b.addEventListener(&#x27;click&#x27;, sayHello);
function sayHello(evt){
  console.log(&#x27;hello&#x27;);
}
</code></pre>
</section>

<section markdown="block">
## addEventListener Details

__So... some things to note about `addEventListener` ...__ &rarr;

It takes two arguments, an event (as a string), and a callback

1. the __event name__ is a string
	* there are [lots of standard events](https://developer.mozilla.org/en-US/docs/Web/Events)
	* we're interested in <code>click</code> and <code>DOMContentLoaded</code>
2. the __callback__ is a function with an optional parameter - the event object that represents the event
	* the event object may have information such as which mouse button was clicked
	* what its x and y value are
	* the unicode code point of the key pressed
	* etc.
</section>

<section markdown="block">
## The Event Listener's Callback

__A few more details about the callback__ &rarr;

1. within the callback function, __this__ is set to the element the that event listener was added to
2. the __callback__ can be __named or anonymous__
    * but you have to have a named function to remove it with <code>removeEventListener</code> (we'll see this a little later)
	* <code>removeEventListener('eventName', nameOfCallback);</code>
3. The __callback should not be an arrow function!__ 
    * why? <span class="fragment">we want to retain `this` for the element...</span>

<br>

__Great, let's see some of this in action__ &rarr;

</section>


<section markdown="block">
## Handling Clicks, This

__Make all of the paragraphs clickable... and change the text of the paragraph so that it displays the x and y position of the mouse click using the event object__ &rarr;

<pre><code data-trim contenteditable>
&lt;style&gt;p {border: 1px solid #000}&lt;/style&gt; 
&lt;p&gt;FOO&lt;/p&gt; &lt;p&gt;BAR&lt;/p&gt; &lt;p&gt;BAZ&lt;/p&gt;
</code></pre>

<pre><code data-trim contenteditable>
function handleClick(event) {
	this.textContent = event.x + ',' + event.y;
}
</code></pre>
{:.fragment}

<pre><code data-trim contenteditable>
const paragraphs = document.querySelectorAll('p');
paragraphs.forEach((p) => {
	p[i].addEventListener('click', handleClick);
});
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Where Does This Code Live?

__So, now that you have code:__ &rarr;

1. that registers an event listener...
2. and specifies a function that handles the event

<br>
__What are some criteria for where this stuff should live?__ &rarr;

* probably in an external file included at the end of the body
* we could even use that <code>DOMContentLoaded</code> event, right?
    * that is, only call once the DOM has been fully loaded
    * ...just in case your code depends on the presence of a specific element
{:.fragment}

<br>

<pre><code data-trim contenteditable>
function main() {
    console.log('THE DOM IS RED E');
}
document.addEventListener('DOMContentLoaded', main);
</code></pre>
{:.fragment}


</section>

<section markdown="block">
## Events Types

__Again we'll be using these two events types (out of the many that are available - [check out the mdn docs](https://developer.mozilla.org/en-US/docs/Web/Events)):__ &rarr;

* __click__ - triggered on mouse click (press and release) on a single element
* __DOMContentLoaded__ - document has been completed loaded and parsed (without waiting for CSS, images, etc.)

<br>

Some other events that may be useful in your projects include:
{:.fragment}

* `blur` - when an element loses focus
* `focus` - when an element receives focus
* `keydown` - when a key is pressed down
* `mousemove` - when the mouse moves
* `mouseover` - when the mouse hovers over an element
{:.fragment}

</section>

<section markdown="block">
## Event Object Revisited

__The callback to `addEventListener` is called with an object that represents the event that occurred__ &rarr;

Depending on the event, the object may have the following properties

* `target` - the element that received the event
* `x` - the x coordinate of a mouse click
* `y` - the y coordinate of a mouse click
* `key` - the key pressed (the character or a text description, such as `ArrowDown`

</section>

<section markdown="block">
## Event Object, this and Removing Event Handlers

Using an example from the previous slides, __let's remove the event listener on click so that it only says hello on the first click... and does nothing afterwards. We'll also log out some event object properties__ &rarr;

<pre><code data-trim contenteditable>
const b = document.querySelector(&#x27;button&#x27;);
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

__So... what happens if you have two elements nested within each other, and both have event listeners?__ &rarr;

Imagine that both the `div` and `h2` have event listeners. What happens when the `h1` is clicked?

<pre><code data-trim contenteditable>
&lt;div&gt; 
I have an event listener
&lt;h1&gt;So do I&lt;/h1&gt;
&lt;/div&gt;
</code></pre>

1. {:.fragment} the event handler of the __more specific element__ (the innermost element) gets called __first__
2. {:.fragment} ...then the event bubbles up through the element's parent elements, triggering their event handlers as well
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
const a = document.querySelector(&#x27;article&#x27;);  
const b = document.querySelector(&#x27;button&#x27;);
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

Most events have default actions on them. That is, there are some elements that react to events already. __Can you think of any?__ &rarr;

* {:.fragment} clicking an __input of type submit__ will GET or POST a form
* {:.fragment} clicking on a __link__ will take you to that link

<br>
But... __what if the default action was not your intention?__ &rarr;
{:.fragment}

Use the __preventDefault()__ method on the event object!
{:.fragment}
</section>

<section markdown="block">
## preventDefault Example

__Create a link... but add an event listener to stop the browser from going to the page linked to...__ &rarr;

<pre><code data-trim contenteditable>
&#x3C;a href=&#x22;http://nyu.edu&#x22;&#x3E;a link to nyu&#x3C;/a&#x3E;

// in js
const a = document.querySelector(&#x27;a&#x27;);  

a.addEventListener(&#x27;click&#x27;, function(evt) {
  console.log(&#x27;link clicked!&#x27;);  
  evt.preventDefault();
});
</code></pre>
</section>

<section markdown="block">
## And Now for Something Silly

__Let's make this face spin when we click it__ &rarr;

<pre><code data-trim contenteditable>
&lt;div id="face"&gt;
  &amp;#128581;
&lt;/div&gt;
</code></pre>

Some styles:

<pre><code data-trim contenteditable>
#face {
    font-size: 15em;
    display: inline-block;
}
</code></pre>

<pre><code data-trim contenteditable>
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.dizzy {
    animation: spin 5s linear infinite;
}
</code></pre>

</section>


<section markdown="block">
## And the JavaScript 

__Simply toggle the dizzy class__ &rarr;

<pre><code data-trim contenteditable>
document.addEventListener('DOMContentLoaded', main);

function main() {
    const face = document.querySelector('#face');
    face.addEventListener('click', function clicked(evt){
        this.classList.toggle('dizzy');
    });
}
</code></pre>

<style>
#face {
    font-size: 5em;
    display: inline-block;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.dizzy {
    animation: spin 5s linear infinite;
}

#animation-container {
    text-align:center;
    margin: auto;
    margin-top: 4em;
}
</style>


<div id="animation-container">
    <div id="face">
      &#128581;
    </div>
    <br>
    (Click me!)
</div>

<script>
    const face = document.querySelector('#face');
    face.addEventListener('click', function clicked(evt){
        this.classList.toggle('dizzy');
    });

</script>


</section>
