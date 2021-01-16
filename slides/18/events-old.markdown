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
## Events

We can have JavaScript run whenever a specific even happens.  We'll use __[document.addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget.addEventListener)__ to monitor for events.

* it takes two parameters...
* an event as a string ([see some event types in the mdn docs for events](https://developer.mozilla.org/en-US/docs/Web/Events))
* the name of a function that should run when the event is triggered:

<br>
<pre><code data-trim contenteditable>
// calls the function called main once the DOM has fully loaded
document.addEventListener('DOMContentLoaded', main);
</code></pre>



</section>

<section markdown="block">
## Events Types

We'll be using these two (out of the [many available](https://developer.mozilla.org/en-US/docs/Web/Events)):

* __click__ - triggered on mouse click (press and release) on a single element
* __DOMContentLoaded__ - document has been completed loaded and parsed (without waiting for CSS, images, etc.)

<br>

__The callback function receives an <code>event</code> object...__ &rarr;

* contains useful information
* such as the x and y position of where the mouse was clicked
* __this in the callback refers to the element clicked!__

</section>

<section markdown="block">
## Handling Clicks

__Make all of the paragraph links clickable... and change the text of the paragraph to the position of the mouse__ &rarr;

<pre><code data-trim contenteditable>
function handleClick(event) {
	this.textContent = event.x + ',' + event.y;
}

var p = document.getElementsByTagName('p');
for (var i = 0; i < p.length; i++) {
	p[i].addEventListener('click', handleClick);
}
</code></pre>
</section>

<section markdown="block">
## Where Does This Code Live?

So, now that you have code:

* that registers an event listener...
* and specifies a function that handles the event

<br>
__What are some criteria for where this stuff should live?__ &rarr;

* probably in an external file
* perhaps at the end of the body
* and maybe we could even use that <code>DOMContentLoaded</code> event, right?
{:.fragment}
</section>
