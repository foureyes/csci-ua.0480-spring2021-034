---
layout: slides
title: "A Quick Look at jQuery"
---
<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## Why jQuery


So... all of the stuff that we've doing manually, __JQuery makes sooo much easier.__ &rarr;

* manipulating the DOM
* facilitating event handling
* a cleaner ajax interface
* animation/visual effects

<br>
It also abstracts away the details of:

* what should I use to change style? .style, classList, etc.?
* which event handling should I use for ajax? onload or addEventListener('load', callback)

<br>
It's __a lot__. Sometimes it's overkill. But usually it's super useful. </section>

<section markdown="block">
## $, jQuery

Everything in jQuery revolves around the __<code>jQuery</code>__ function.

* __<code>jQuery</code>__ allows you to select elements: <code>var paragraphs = jQuery('p')</code>
* the <code>jQuery</code> function is more commonly used as __<code>$</code>__: <code>$('p')</code>
* you can use any css selector as an argument:
	* <code>#someID</code>
	* <code>.aClass</code>
	* <code>ul li</code>
</section>

<section markdown="block">
## Determining if the DOM Content is Ready

Instead of adding an event listener, you could use...

<pre><code data-trim contenteditable>
$(document).ready(callback);
</code></pre>

</section>

<section markdown="block">
## Creating Elements

<pre><code data-trim contenteditable>
$
</code></pre>

</section>
