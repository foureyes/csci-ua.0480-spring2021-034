---
layout: slides
title: "Styling and Layout"
---
<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## Hm. So Many Elements.

__There are a ton of HTML elements that we can use.__

[Check out the list of valid HTML5 elements on MDN](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/HTML5_element_list)

Whew! __How do we know which element we should use for a mark-up? How do we choose? (easy for headers, images links, etc... but other content?)__ &rarr;

Use the one that describes / represents the content best. 
{:.fragment}

* if a tag doesn't exist that describes your content, you'll often see a generic container element, like [div](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div)
* (a div doesn't inherently represent anything)
* but, with so many tags, it should be easy to find one that's appropriate (there are a bunch of new ones)
	* if your element contains navigation elements, use [nav](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav)
	* if it's your header or footer, use [header](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header) or [footer](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/footer)
	*etc.
{:.fragment}
</section>

<section markdown="block" data-background="#440000">
## Remember, Mark-up is for structure and meaning, not style
</section>

<section markdown="block">
## CSS

__We use Cascading Style Sheets__ to style our pages.

* CSS is a stylesheet language
* used to describe the presentation and layout of an HTML document
* for the next few slides, I'm assuming some very _basic_ knowledge of CSS
</section>


<section markdown="block">
## Definitions 

__Name the parts of this code:__ &rarr;

<pre><code data-trim contenteditable>
h3 {
	font-size: 2em;
	color: #ff0000;
}
</code></pre>

<pre><code data-trim contenteditable>
this whole thing is a rule...

selector
|   property    value 
|      |        |		    
h3 {
	font-size: 2em; ---+
	                   |---- declaration block
	color: #ff0000; ---+
	|_____________|
          |
		  declaration
}

</code></pre>
{:.fragment}

</section>

<section markdown="block">
## Definitions

Just to get some terminology straight. __When talking about CSS.__ &rarr;

* __rule__ - the selector and all of its accompanying property:value pairs
* __selector__ - specifies an element(s) within the markup where styles will be applied
* __property__ - the name of a particular style 
* __value__ - the _actual_ style being applied on the property
* __declaration__ - the property and its value - for example: <code>color:red;</code>
* __declaration block__ - the curly braces and all of the declarations within them
	* there can be multiple __declarations__ in each __declaration block__, separated by semicolons (<code>;</code>'s)
	* (_technically_, you can leave off the semicolon of the last declaration, but that's considered bad practice -- potentially leads to errors when you add another declaration)

</section>

<section markdown="block">
## But Wait!!

__Do you see any difference in how elements are laid out, even if we haven't explicitly applied styles?__ &rarr;

Take for example... a paragraph (a <code>p</code> tag) and an anchor (a link, and <code>a</code> tag)

* paragraphs seem to go on separate lines
* while anchor links stay on the same line
{:.fragment}
</section>


<section markdown="block">
## The Display Property

In CSS, the <code>display</code> property determines how elements are laid out.

* every element has a default display value
* the default for most elements are either <code>block</code> or <code>inline</code>, but there are actually 4 possible values:
	* <code>block</code>
	* <code>inline</code>
	* <code>none</code>
	* <code>inline-block</code>

<br>
 (Well, and [a bunch of others](https://developer.mozilla.org/en-US/docs/Web/CSS/display))
</section>

<section markdown="block">
## Block-Level Elements

__block-level elements__ - start on a new line and stretch out horizontally as far as they can; have a height and width

__What are some common block-level elements?__ &rarr;

* <code>div</code> - standard and generic block level element (again, doesn't inherently represent any type of content)
* <code>p</code> - paragraph
* <code>h1</code> - header
* etc.
* __Let's see this in action.__ &rarr;
{:.fragment}
</section>

<section markdown="block">
## Inline Elements

__inline elements__ - stay on the same line (do not start a new line); do not have height and width

__What are some common inline elements?__ &rarr;

* <code>span</code> - standard and generic inline element
* <code>a</code> - anchor (link)
* <code>em</code> - emphasis
* etc.
* __Let's see these in action.__ &rarr;
{:.fragment}
</section>

<section markdown="block">
## None

An element with a display value of __none__:

* will not appear on the page
* the remainder of the page will be rendered as if the element did not exist
* often used to toggle element on/off page (different from visibility property, though!)

<br>
__What are some common elements that are _not_ displayed?__ &rarr;

* <code>script</code>
* <code>style</code>
* <code>title</code>
{:.fragment}
</section>

<section markdown="block">
## Inline-block

Wait, what? An __inline-block__ element is an element that has a width and height (a box), but flows with surrounding content inline (no new line).

* this is useful if you want elements on the same line that have an actual height and width!
* for example, a grid of elements (if you're not using floats or a table)
</section>

<section markdown="block">
## A Quick Example

__On our sample page, try making the div with id="content" inline... and none:__ &rarr;

<pre><code data-trim contenteditable>
#content {
	display: inline;
}
</code></pre>

<pre><code data-trim contenteditable>
#content {
	display: none;
}
</code></pre>
</section>

<section markdown="block">
## More About Block Level Elements

* setting the width on a block level element prevents it from stretching out horizontally
* use <code>max-width</code> if you don't want scrollbars when you resize to small window or have smaller resolution device
* a block-level element can be centered by specifying a width and setting a margin to auto

<br>
__Let's try it out on our sample page...__ &rarr;
<pre><code data-trim contenteditable>
#content {
	border: 1px solid #000;
	max-width: 500px;
	margin:auto;
}
</code></pre>
</section>

<section markdown="block">
## Visibility

As mentioned above, there's another CSS property that can hide and show elements.

__visibility__ - can hide an element but leave space where it should have appeared

__Let's see what this looks like on our sample page.__

<pre><code data-trim contenteditable>
#content {
	visibility: none;
}
</code></pre>

</section>

<section markdown="block">
## Position

After display, the next most important property for layout is __position__.

An element's position can be:

* static
* relative
* absolute
* fixed

<br>
We'll take a look at the first two...

</section>

<section markdown="block">
## Static 

__static__ is the default position value

* not _positioned_ in any special way
* element with <code>position: static</code> is also called (no surprise here) __not positioned__

</section>

<section markdown="block">
## Relative

An element with a position of __relative__ can be positioned _relative_ to where it normally would be placed. 

It can take these addtional properties to position it relative to what its normal position would be:

* __top__
* __bottom__
* __left__
* __right__

<br>
</section>

<section markdown="block">
## Relative Continued


__Let's try using position relative on our sample page__ &rarr;

* select the div with an id of content
* set the position to relative
* set top to 50px

<br>
<pre><code data-trim contenteditable>
#content {
	border:1px solid #000;
	position: relative;
	top: 50px;
}
</code></pre>
</section>

<section markdown="block">
## Accessing CSS Properties

It turns out you can __access CSS properties__ through __JavaScript__!

Use the __style__ property on an element to access each individual CSS property as a property on styles. (Whew... that was a jumble... easier to show than tell!)

__Doing the same as the previous slide (but making the display relative in CSS first).__ &rarr;

<pre><code data-trim contenteditable>
var c = document.getElementById('content')
c.style.display = 'relative';
c.style.top = '150px';
</code></pre>

</section>
<!--
<section markdown="block">
* what element to use (again)
* block, inline, inline block
* how elements are laid out 
	* box model
	* positioning
* absolute, relative, ? TODO: research positioning
* styles
	* CSS selectors
	* changing classes class/inline
* get/set attribute here as well
* toggle display on/off TODO: research best way to toggle, why?

</section>
-->
