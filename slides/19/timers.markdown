---
layout: slides
title: "JavaScript Timers"
---
<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## Timing Functions

There are __three built-in JavaScript functions__ that we could use for __deferred and optionally repeated execution of functions__.

* setTimeout
* setInterval
* window.requestAnimationFrame

</section>

<section markdown="block">
## requestAnimationFrame 

__window.requestAnimationFrame(callback)__ 

asks the browser to perform an animation based on the function supplied as the argument. This callback function is invoked before the screen is _repainted_. 

* it has a single argument, __callback__, which _draws_ the frame
* requestAnimationFrame must be called for every frame that you want to animate
* (that means that it must be called repeatedly)
* typically, the resulting animation is 60 frames per second
	* but the rate at which the callback is invoked may be adjusted based on resource utilization and priority
	* for example, the frame rate may drop if it's not the currently active tab 
</section>
<section markdown="block">
## Animation Example 

Here's how __window.requestAnimationFrame(callback)__ could be used to move the content div horizontally in our [sample page](../../code/class18.html) from a previous set of slides:

* the div is animated by changing the left property value (which is a string that ends in px)
* note that the callback function must tell the browser to continue to animate by calling requestAnimationFrame

<pre><code data-trim contenteditable>
let pos = 0;
window.requestAnimationFrame(animate);
function animate() {
	console.log('I am being animated!')
	const c = document.getElementById('content')
	c.style.left = pos + 'px';
	pos += 1;
	window.requestAnimationFrame(animate);
}
</code></pre>
</section>

<section markdown="block">
## Let's Try It Elsewhere...

Open up a page... and __modify the following code in the developer console to animate an element off screen__!

<pre><code data-trim contenteditable>
let pos = 0;
const ele = document.getElementsByClassName('className')[0];
ele.style.position = 'relative';
ele.style.zIndex = 1000;
function move() {
	ele.style.top = pos + 'px';
	pos += 1
	window.requestAnimationFrame(move);
}
window.requestAnimationFrame(move)
</code></pre>

</section>
<section markdown="block">
## setInterval, setTimeout

A couple of other timing functions are:

* __setInterval(callback, delay)__
	* calls callback in delay ms
	* continues to call the callback __repeatedly at specified interval__
* __setTimeout(callback, delay)__
	* calls callback in delay ms
	* only invokes callback __once__
</section>

<section markdown="block">
## Using setInterval/setTimeout

The following example uses set interval to:

* insert an h1 tag containing the current date/time
* ... into the nyu homepage 
* ... every 2 seconds:

<br>

<pre><code data-trim contenteditable>
setInterval(function() {
	const header = document.getElementsByClassName('header')[0];
	header.appendChild(document.createElement('h1')).innerText = Date();
}, 2000);
</code></pre>
</section>

<section markdown="block">
## When to Use Each

What reasons would you choose to use one timing function (__requestAnimationFrame__, __setTimeout__ and __setInterval__) over the others?. __This may be obvious, but...__ &rarr;

For animation, use __requestAnimationFrame__ because:
{:.fragment}

* allows browser to make optimizations
* consequently more efficient
* (for example, Chrome will throttle setInterval)
{:.fragment}

<br>
Maybe setInterval, setTimeout... when you need to specify the timing of a function call (though may be unreliable based on throttling!)
{:.fragment}

</section>

{% comment %}
* timing functions
	* getNextFrame
	* setInterval / otherOne TODO: research difference among all three
	* difference? 
	* create a bookmarklet that makes all of the div elements
	* animating canvas
	* button delay trigger 
{% endcomment %}
