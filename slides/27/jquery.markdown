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
It does __a lot__. Usually super useful! 
</section>

<section markdown="block">
## $, jQuery, Selecting Elements

Everything in jQuery revolves around the __<code>jQuery</code>__ function.

* __<code>jQuery</code>__ allows you to select elements: <code>var paragraphs = jQuery('p')</code>
* the <code>jQuery</code> function is more commonly used as __<code>$</code>__: <code>$('p')</code>
* you can use any css selector as an argument:
	* <code>#someID</code>
	* <code>.aClass</code>
	* <code>ul li</code>
</section>

<section markdown="block">
## Selecting Elements Continued

Note that selectors will give back a set of elements. Most operations that you use on that set will apply to all elements.

Some examples of selectors:

<pre><code data-trim contenteditable>
// get all paragraphs
$('p')

// get all links in paragraphs
$('p a')

// get all input elements of type button
$('input[type=button]')

// get element with id of content
$('#content')

// get elements with class of hidden
$('.hidden')
</code></pre>
</section>

<section markdown="block">
## Demo Some JQuery Stuffs

For the following slides, we'll be using this fiddle:

[http://jsfiddle.net/8zeobyvL/](http://jsfiddle.net/8zeobyvL/)
</section>

<section markdown="block">
## Getting or Setting Text Content

Use <code>text</code> to both get and set text!
<pre><code data-trim contenteditable>
// get text
$('#foo').text('bar');
// set text
$('#foo').text('bar');
</code></pre>
</section>

<section markdown="block">
## Basic Hide / Show

[The following](http://api.jquery.com/category/effects/basics/) allow you to hide and show selected elements:

* hide()
* show()
* toggle()

<br>
<pre><code data-trim contenteditable>
// hide everything with class of secret
// sort of like display: none
$('.secret').hide();

// toggle between hiding and showing an element
$('.switcheroo').toggle();
</code></pre>
</section>

<section markdown="block">
## Handling Click Events

[There are a bunch of click events in the JQuery docs](http://api.jquery.com/category/events/mouse-events/).

For example, you can trigger both click and doubleclick:

* click(callback)
* dblclick(callback)

<pre><code data-trim contenteditable>
// bring up an annoying modal if you double click
$('button').dblclick(function() {alert('stop it, plz!')});
</code></pre>
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

[There are several ways to manipulate the DOM](http://api.jquery.com/category/manipulation/)

* maybe you want to add a child? - __append()__
* or add a parent!? - __wrap()__
* or insert immediately after - __after()__

<pre><code data-trim contenteditable>
// wrap this link in h1's
$('header a').wrap('&lt;h1&gt;');

$('header a').after('&lt;a&gt;Yeah&lt;/a&gt;');
</code></pre>

</section>

<section markdown="block">
## Working With Styles

* addClass()
* removeClass()
* toggleClass()
* css()

<br>
<pre><code data-trim contenteditable>
// change the background-color property (note no camel case!)
$('.callout').css('background-color', '#8f9');

// add a class called highlight
$('.callout').addClass('highlight');

</code></pre>
</section>	

<section markdown="block">
## Ajax

get

<pre><code data-trim contenteditable>
$.getJSON('https://api.github.com/users/someuser/repos', function(data) {
	data.forEach(function(ele) {
  $('body').append('<pre>' + ele.name + '</pre>');
  });
});
</code></pre>

post 

<pre><code data-trim contenteditable>
$.ajax({
	type: 'POST',
	url: '/list',
	data: 'name=mylist'
});
</code></pre>
</section>

<section markdown="block">
## Some Effects

* __fadeIn()__
* __fadeOut()__
* __slideIn()__
* __slideOut()__

<br>
<pre><code data-trim contenteditable>
$('#container').fadeOut(2000);
</code></pre>

</section>
