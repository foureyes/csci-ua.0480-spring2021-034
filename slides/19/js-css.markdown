---
layout: slides
title: "JavaScript and CSS"
---
<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## Topics

* selectors
* querySelector
* classList 
* best practices
</section>

<section markdown="block">
## Let's Practice Some Selectors

<pre><code data-trim contenteditable>
&lt;h1&gt;Some Elements:&lt;/h1&gt;
&lt;a&gt;Link Zero&lt;/a&gt;

&lt;div id="container"&gt;
&lt;a&gt;Link One&lt;/a&gt;
&lt;h2&gt;A List:&lt;/h2&gt;
&lt;ul&gt;
	&lt;li&gt;&lt;a&gt;Link Two&lt;/a&gt;&lt;/li&gt;
	&lt;li&gt;&lt;a&gt;Link Three&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;
&lt;/div&gt;
</code></pre>
</section>

<section markdown="block">
## How Do You...

__Change all of the headers so that their color is green?__ &rarr;

<pre><code data-trim contenteditable>
h1, h2 { color:#0f0; }
</code></pre>
{:.fragment}

__Change all links so that when you hover over them, they change to twice the size of the root element's font size.__ &rarr;
{:.fragment}

<pre><code data-trim contenteditable>
a:hover { font-size:2rem; }
</code></pre>
{:.fragment}

__Change "Link One" so that its background is yellow.__ &rarr;
{:.fragment}

<pre><code data-trim contenteditable>
#container > a { background-color: #ff2; }
</code></pre>
{:.fragment}

__Change the color of all links nested under the div with id="container" to red.__ &rarr;
{:.fragment}

<pre><code data-trim contenteditable>
#container a { color: #f00;}
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Selector Summary

* <code>A E</code> - Any E element that is a descendant of an A element (that is: a child, or a child of a child, etc.)
* <code>A > E</code> - Any E element that is a child of an A element
* <code>E:first-child</code> - Any E element that is the first child of its parent
* <code>B + E</code> - Any E element that is the next sibling of a B element (that is: the next child of the same parent)
</section>

<section markdown="block">
## Selector Summary Continued

* <code>:hover</code> - mouse hovers over (any element, not just links)
* <code>:link</code> - non visited link
* <code>:visited</code> - visited link
</section>

<section markdown="block">
## Using JavaScript with CSS Selectors

__I've been holding out on you.__ &rarr;

Yeah, __document.getElementById__ is pretty good, but it's kind of a drag because you have to slap ids on everything.

You can use the following methods to select elements by their CSS selector!

* __<code>document.querySelector('selector')</code>__ returns a single matching element
* __<code>document.querySelectorAll('selector')</code>__ - returns a list of matching elements

<br>

__Let's try these out with the selectors from the previous slide.__ &rarr;
</section>

<section markdown="block">
## Revisiting ClassList

Let's take a quick look at the __classList__ property again.

In addition to <code>add</code> and <code>remove</code>, classList also has a toggle method:

<pre><code data-trim contenteditable>
ele.classList.toggle('someClassName')
</code></pre>

* it will remove the class if it's present
* it will add the class if it's not
</section>

<section markdown="block">
## On Style

__Stylesheets can get unwieldy pretty quickly__. Some ways to keep things readable an organized are:

* use grouped /multiple selectors 
* one property value per line, indented
* comments (<code>/\* \*/</code>) when appropriate
* group like rules together or use some other organization scheme
* use container elements if you need to hook into style exceptions
* use a framework and/or use a css precompiler!

<br>

Some others in:

* [mdn's article on readable css](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Getting_Started/Readable_CSS)
* [and this article on organizing css tips](http://red-team-design.com/tips-to-organize-your-css/)

</section>


<section markdown="block">
## Some Best Practices

Besides the previous slide on organizing CSS, we also learned:

* use relative sizing so that you only need to change your code in one place
* modify classes instead of individual styles to separate application logic from presentation
* use the appropriate positioning, box model and display property to layout your document
</section>
