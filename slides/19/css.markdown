---
layout: slides
title: "CSS"
---
<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>



<section markdown="block">
# Layout

</section>

<section markdown="block">
## Layout

__Name two CSS properties that we learned that help define the layout of an HTML document.__ &rarr;

* {:.fragment} <code>display</code>
* {:.fragment} <code>position</code>

</section>

<section markdown="block">
## Let's Talk About Display

Every element on a webpage is essentially treated as a box.  

The __display__ property determines how that box is rendered. __What are some possible values of the <code>display</code> property?__ &rarr;

* <code>inline</code>
* <code>inline-block</code>
* <code>block</code>
* <code>none</code>
{:.fragment}

<br>
We'll take a peek at some other interesting ones later. __But first.__ &rarr;
{:.fragment}

</section>

<section markdown="block">

## Block 

An element that is <code>display:block</code>:

* starts a new line 
* ...and stretches out as far horizontally as possible (full width)
* you can specify a block-level element's width and height!
* some elements that are commonly displayed as block: <code>div</code>, <code>p</code>, <code>h1</code>, etc.

<br>

<iframe width="100%" height="300" src="https://jsfiddle.net/3o7t0dzz/1/embedded/html,result,css/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
</section>

<section markdown="block">
## Inline 

An element that is <code>display:inline</code>

* stays in line with its surrounding elements
* think of a single word in a paragraph.
* __does not have a <code>width</code> or <code>height</code> that can be specified__
* however (as we saw _in previous slides_) it can have a border, background... and even a margin and padding (though only horizontal margin and padding)


<iframe width="100%" height="300" src="https://jsfiddle.net/rdosf6ra/1/embedded/html,result,css/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
</section>

<section markdown="block">
## None

If an element is <code>display:none</code>:

* the element is not displayed and has no effect on layout
* all elements nested within it are also not displayed
* the document is rendered as if the element did not exist

<br>

<iframe width="100%" height="300" src="https://jsfiddle.net/eyumt37L/embedded/html,css,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

</section>

<section markdown="block">
## Inline-Block

If an element is <code>display:inline-block</code>:

* it behaves similarly to _inline_ elements in that it will stay inline (no new line)
* however, you can give it a height and a width

<br>

<iframe width="100%" height="300" src="https://jsfiddle.net/ds331u52/embedded/html,css,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

</section>

<section markdown="block">
## Ok, a Quick Summary

Two consecutive __inline__ elements will display \_\_\_\_\_\_\_\_\_\_\_\_\_\_ each other. &rarr;

adjacent to
{:.fragment}

Two consecutive __block-level__ elements will display \_\_\_\_\_\_\_\_\_\_\_\_\_\_ each other. &rarr;
{:.fragment}

stacked on
{:.fragment}

Two consecutive __inline-block__ elements will display \_\_\_\_\_\_\_\_\_\_\_\_\_\_ each other.  &rarr;
{:.fragment}

adjacent to
{:.fragment}
</section>

<section markdown="block">
## Some Weird Ones

There are many other possible values for the <code>display</code> property. __Let's take a look at a weird one:__ &rarr;


Table related values:

* <code>table</code>
* <code>table-cell</code>
* <code>table-row</code>

</section>

<section markdown="block">
## Table-\* (Yikes!)

So... <code>table</code>, <code>table-cell</code> and <code>table-row</code> are all display properties that apply to (as their names imply) tables, cells and rows. 

However, you can make any element behave like a table; __just add the appropriate display__ __(but _whyyyyy_?)__ &rarr;

<iframe width="100%" height="350" src="https://jsfiddle.net/zu1f5req/2/embedded/html,css,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

Maybe there's an element that describes your content more accurately than <code>td</code>?
{:.fragment}
</section>
<section markdown="block">
## Visibility

__Oh yeah... what's the difference between <code>visibility:hidden</code> vs <code>display:none</code>.__ &rarr;

* <code>display:none</code> takes the element out of the document completely
	* surrounding elements are arranged as if element never existed!
* ...however, <code>visibility:hidden</code> keeps the element in the document, but does not show it
	* surrounding elements are arranged as if the element were still in place
{:.fragment}


</section>

<section markdown="block">
# Box Model

</section>

<section markdown="block">
## An Element's Width and Height

Now that we know some elements have a width and height, while some don't... __we should probably figure out what width and height actually mean__.

__Is the width and height all there is to figuring out the dimensions of an element? What else has to be taken into account?__ &rarr;

* <code>border</code>
* <code>margin</code>
* <code>padding</code>
{:.fragment}

<br>

__How are they all related? Let's see on the next few slides.__ &rarr;
{:.fragment}
</section>

<section markdown="block">
## box-sizing

__box-sizing__ is the CSS property that determines the __box-model__ used to calculate the <code>width</code> and <code>height</code> of an element.

Two values that we'll look at are:

* <code>content-box</code> (the default)
* <code>border-box</code> 
</section>

<section markdown="block">
## content-box

__content-box__ is the default value for box-sizing. This box-model:

* <code>width</code> and <code>height</code> are __calculated by the content only__
* it does not include <code>padding</code>, <code>border</code>, or <code>margin</code>

<br>

<iframe width="100%" height="300" src="https://jsfiddle.net/e60z8oyq/embedded/result,css,html/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

</section>

<section markdown="block">
## content-box Diagram


<div markdown="block" class="img">

![box-model]({{ site.vars.slides_img_prefix }}/boxmodel.gif)

</div>

* {:.fragment} the border is between the margin and padding
* {:.fragment} padding adds space between the actual content and its border
</section>

<section markdown="block">
## content-box Issue

* clearly, in the default box model, border, padding (and margin) are not included in width calculations
* __why is this an issue?__ &rarr;
* {:.fragment} __the following are both 150px wide (!?)__ &rarr;

<br>

<iframe width="100%" height="350" src="https://jsfiddle.net/25cmdru0/1/embedded/result,html,css/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
{:.fragment}
</section>

<section markdown="block">
## border-box

If the value of the <code>border-box</code> property is set to __border-box__,

* <code>width</code> and <code>height</code> include <code>padding</code> and <code>border</code>
* it, however, does not include <code>margin</code>

<br>

<iframe width="100%" height="350" src="https://jsfiddle.net/up46uvhg/1/embedded/result,html,css/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
</section>

<section markdown="block">
## Not Quite Fully Supported

<code>box-sizing: border-box</code> is a bit new:

* you'll need to use browser/vendor prefixes to get this working in all browsers
* using prefixes is a way for browsers to support new and/or not-yet-finalized features
* (some prefixes include: <code>-moz-</code> for firefox and <code>-webkit-</code>  for Chrome and Safari

<br>

<pre><code data-trim contenteditable>
* {
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
}
</code></pre>
</section>

<section markdown="block">
## Positioning

The __position__ property specifies what rules to use for positioning an element in the document:

__What are some possible values? (we know two of them at least)__ &rarr;

* <code>static</code>
* <code>relative</code>
* <code>absolute</code>
* <code>fixed</code>
* <code>sticky</code>
{:.fragment}

</section>

<section markdown="block">
## Static / Not Positioned

__The default positioning of an element is <code>static</code>, or _not positioned_.__:

* it is laid out in its current position in the flow (no special positioning)
* <code>top</code>, <code>bottom</code>, <code>left</code>, <code>right</code>, and <code>z-index</code> (depth) properties do not apply to an element that is  __not positioned__ 
</section>
<section markdown="block">
## Relative

An element with <code>position:relative</code> can be positioned relative to where it would normally be in the document:

* behaves the same as static... that is, __unless__...
* you supply <code>top</code>, <code>bottom</code>, <code>left</code>, <code>right</code>, or <code>z-index</code> properties, the element will be moved accordingly
* other elements flow as if the positioned element were in its normal place!

<br>

<iframe width="100%" height="300" src="https://jsfiddle.net/njncjbf9/3/embedded/html,css,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
</section>

<section markdown="block">
## A Note About top, bottom, left and right

For relatively positioned elements:

* __top__  specifies how far an element is moved below its normal position
* __bottom__ specifies how far an element is moved above its normal position
* __left__ specifies the offset that the element is moved left from its normal position
* __right__ specifies the offset that the element is moved right from its normal position

<br>
By default, these are all set to <code>auto</code>. They can be set to a length or percentage of the containing element.
</section>

<section markdown="block">
## Depth

There's also a property called __z-index__. __What does z-index do?__ &rarr;

* specifies the _depth of an element_
* when elements overlap, z-index determines which element covers the other element
* an element with a larger z-index covers an element with a lower z-index
{:.fragment}
</section>
<section markdown="block">
## Fixed

An element with <code>position:fixed</code>:

* is positioned outside of the normal flow (no space is left where the element would normally be)
* it's positioned relative to the screen's viewport 
* it stays in the same place even when it's scrolled
* the top, right, bottom, and left properties are used
* __width will shrink to fit content unless width explicitly specified__

<br>

<iframe width="100%" height="300" src="https://jsfiddle.net/3qfjwp77/2/embedded/html,css,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
</section>
<section markdown="block">
## Absolute

An element with <code>position:absolute</code>:

* similar to fixed except relative to _nearest positioned ancestor_ (or body if no positioned ancestor)
* also positioned outside of the normal flow (no space is left where the element would normally be)
* the top, right, bottom, and left properties are used
* width of element will shrink to fit content unless width specified

<br>

<iframe width="100%" height="300" src="https://jsfiddle.net/cLsjgpsv/2/embedded/html,css,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
</section>

<section markdown="block">
## How About a Practical Example

__Let's talk through what's involved in creating this layout.__ &rarr;

* maybe check out the actual page itself... then the html
* with an eye towards the header, nav and sidebar

<br>

<iframe width="100%" height="400" src="https://jsfiddle.net/gcggzpuj/1/embedded/result,html,css/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
</section>

<section markdown="block">
## About the Header

__How did we make the header stay in place, cover every element and stretch across?__ &rarr;

<pre><code data-trim contenteditable>
header {
	position: fixed;
	top: 0;
	left: 0;
	height: 50px;
	background-color: white;
	width: 100%;
	border:3px solid #090;
	z-index: 1;
}
</code></pre>
{:.fragment}

* note the z-index to make sure it's above the other elements.
* also the width is set to 100% (since the default width of a fixed element shrinks to wrap content)
{:.fragment}
</section>
<section markdown="block">
## And That Nav?

__How do you think the nav is positioned so that it's on the top right of the header?__ &rarr;

<pre><code data-trim contenteditable>
nav {
	position: absolute;
	right: 0px;
	top: 0px;
}
</code></pre>
{:.fragment}

It's relative to its ancestor, the header... so we can use absolute.
{:.fragment}
</section>
<section markdown="block">
## How About the Sidebar?

__Finally... how is the sidebar right aligned using the position property?__ &rarr;

<pre><code data-trim contenteditable>
.sidebar {
	position: absolute;
	right: 0px;
	width: 150px;
	border: 3px solid #800;
}
</code></pre>
{:.fragment}

__What will happen if we make position absolute?__ &rarr;
{:.fragment}

It'll go under the header and above the div with class="hero".
{:.fragment}
</section>

<section markdown="block">
# Sizing

</section>

<section markdown="block">
## Sizing

You might have noticed that there are multiple units of measurement that we could use for properties such as <code>width</code> or <code>margin</code>.

__What are the possible units?__ &rarr;

There are [many](https://developer.mozilla.org/en-US/docs/Web/CSS/length)! (Here are a few that we'll go over).
{:.fragment}

* relative
	* <code>em</code>
	* <code>rem</code>
* absolute
	* <code>px</code>
{:.fragment}
</section>

<section markdown="block">
## em

An __em__ is a dynamic sizing unit relative to font-size: 

* an <code>em</code> is equal to the __size of the font that applies to the parent of the element__
* for example, <code>2em</code> is twice the size of the parent's font-size
* (usually, the default browser styles for font-size end up being about 16px)

<br>

<iframe width="100%" height="350" src="https://jsfiddle.net/tjbw4jjj/embedded/result,html,css/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

</section>
<section markdown="block">
## rem

__rem__ represents the font-size of the root (<code>&lt;html&gt;</code>element).

* <code>2rem</code> is twice the size of the root element's font-size
* behaves similarly to ems, but doesn't stack for nested elements

<br>

<iframe width="100%" height="300" src="https://jsfiddle.net/wqvnb39n/2/embedded/result,html,css/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

</section>
<section markdown="block">
## Relative Units

Both <code>rem</code> and <code>em</code> are relative measurements.

__Why might using relative measurements be useful?__ &rarr;

* easy to change sizes throughout
* just change the root element / parent element, and everything else changes in proportion
* particularly useful for media queries / responsive design
{:.fragment}

<br>

__Let's try upping the font size ... when we have them initially set to pixels.__ &rarr;
{:.fragment}

<iframe width="100%" height="300" src="https://jsfiddle.net/eddmheor/2/embedded/result,css,html/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
{:.fragment}
</section>
<section markdown="block">
## When to Use px/rem/em

It may be confusing determining which one to use. It depends on what you're trying to accomplish.

* generally, use relative sizes so that changing is easy
* use pixels when you want elements that stay a consistent size (usually things like setting max/min width, margins, borders or padding, rather than text)

<br>
Some articles...

* [em for everything, pixels on borders](https://j.eremy.net/confused-about-rem-and-em/)
* [perhaps set pixel sizes at the root element, rem for _components_, and em for text](http://css-tricks.com/rems-ems/)
</section>

<section markdown="block">
# Selectors

</section>

<section markdown="block">
## Selectors

__What's a selector again?__ &rarr;

A selector is the part of a CSS rule that determines what element or elements the style declarations apply to:
{:.fragment}

In the following code, <code>p</code> is the selector:
{:.fragment}

<pre><code data-trim contenteditable>
p {
	margin: 10px;
}
</code></pre>
{:.fragment}

</section>

<section markdown="block">
## Possible Selectors

__This one may be a bit difficult to answer... but what are the possible values for selectors?__ &rarr;

Some that you might be familiar with are:
{:.fragment}

* by tag name... simply reference the name of the tag, and the style will be applied to all of those tags
* by <code>class</code> name
* by <code>id</code>
{:.fragment}
</section>

<section markdown="block">
## Class and ID 

<code>class</code> and <code>id</code> are attributes that you can place in your elements. __What's the difference between the two again?__ &rarr;

* multiple elements in a document can have the same value for <code>class</code>
* but values for ids should be unique within a document - only one element can have an id with a specific value
* an element may have both a class and id attribute.
</section>

<section markdown="block">
## Using Class and ID Selectors

* to select elements with a specific __class__, prefix the class name with a period
* to target an element with a specific __id__, prefix the id name with a hash sign (pound or number symbol)

<br>
This has a selector, <code>.highlight</code> that gives an element a yellow background, and a couple of ids that specify borders.

<iframe width="100%" height="300" src="https://jsfiddle.net/u9j2a58s/3/embedded/css,html,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
</section>

<section markdown="block">
## Element Name with Class/ID

You can use both a tag name and class or id as your selector for increased specificity:

* for an id: tagname#idvalue
* for a class: tagname.classvalue

<br>
__In the previous example, how could be modify the markup so that <code>div</code>s that are highlighted have a green background, while paragraphs that are highlighted stay with a yellow background?__ &rarr;


<iframe width="100%" height="300" src="https://jsfiddle.net/yx1m40vf/1/embedded/css,html,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
{:.fragment}
</section>

<section markdown="block">
## More Attributes

You're not limited to <code>class</code> and <code>id</code> for attributes:

* you can actually specify any attribute and attribute value that you want!
* use brackets, and within the brackets, either an <code>attribute </code> or <code>attribute_name='value'</code>
* examples:
	* <code>[type='button']</code> - selects only elements with a type attribute that's equal to "button" 
	* <code>[data-pinned]</code> - selects elements that just have an attribute called data-pinned (no associated value is necessary)
	* <code>input[type='button']</code> - you can also prefix to specify tag with attribute!

</section>

<section markdown="block">
## Using Arbitrary Attributes

A couple of examples using attributes other than class or id:

<iframe width="100%" height="300" src="https://jsfiddle.net/vLh2bjsj/1/embedded/css,html,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
</section>

<section markdown="block">
## Multiple Selectors

In some of the previous examples, you have noticed that there were several selectors on one line, separated by commas.

__Selector grouping__ allows multiple selectors to be defined for a single rule:

<iframe width="100%" height="300" src="https://jsfiddle.net/xLu3q2da/embedded/css,html,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
</section>

<section markdown="block">
## Relationships 

Relationships between elements can also be expressed with selectors! ([from the CSS selectors article on MDN](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Getting_started/Selectors)):

* <code>A E</code> ...  <span class="fragment">Any E element that is a descendant of an A element (that is: a child, or a child of a child, etc.)</span>
* <code>A > E</code> ... <span class="fragment">Any E element that is a (direct) child of an A element</span>
* <code>E:first-child</code> ... <span class="fragment">Any E element that is the first child of its parent</span>
* <code>B + E</code> ... <span class="fragment">Any E element that is the next sibling of a B element (that is: the next child of the same parent)</span>
</section>

<section markdown="block">
## Some Examples

This demonstrates the selection of elements based on their relationships:

<iframe width="100%" height="400" src="https://jsfiddle.net/v41xqhwc/embedded/css,html,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
</section>

<section markdown="block">
## Pseudo-classes

__pseudo-classes__ are keywords that you add to a selector to specify the state of the element.

__For example, what are some states that you think an anchor element (a link) could have?__ &rarr;

* hovered over
* non-visited 
* visited
{:.fragment}

<br>
__There are pseudo-classes for each of these states!__ &rarr;
{:.fragment}
</section>

<section markdown="block">
## Pseudo Classes on Links

* <code>:hover</code> - mouse hovers over (any element, not just links)
* <code>:link</code> - non visited link
* <code>:visited</code> - visited link


<iframe width="100%" height="300" src="https://jsfiddle.net/gmot5jnL/embedded/css,html,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
</section>

<section markdown="block">
## Before/After

Before and after actually lets you insert content before or after an element!

* <code>::before</code>
* <code>::after</code>
* they don't actually appear in the dom!

<br>
Some values that the content can be are

* a string
* an image

</section>
<section markdown="block">
## Before and After Example

Two examples, one with text... and the other with an image.

<iframe width="100%" height="300" src="https://jsfiddle.net/yw8et5b0/embedded/css,html,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

</section>
<section markdown="block">
## nth-child

__:nth-child(...)__ matches an element that is the _nth_ child of its parent. Children are numbered starting from 1. The argument for nth-child can be:

* __a single integer__ - <code>nth-child(5)</code> - selects the 5th child
* __a keyword, even or odd__ - <code>nth-child(even)</code> - selects every even numbered child
* __an expression in the form of an + b__ - <code>nth-child(2n + 3)</code> - selects every 2nd child starting from the 3rd
	* n represents the sequence of integers starting from 0, and incrementing by 1
	* evaluating the expression gives you the number of each child selected (in the case above, 3, 5, 7, etc.)

<br>

</section>


<section markdown="block">
## nth-child Examples

Try out nth-child using the [nth-child tester from css-tricks](https://css-tricks.com/examples/nth-child-tester/)...

Or, check out the fiddle:

<iframe width="100%" height="300" src="https://jsfiddle.net/bowcbxLe/embedded/css,html,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

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
## Of Course, Some JavaScript

As we mentioned in the previous class, you can use an element's __style__ property to modify its _actual_ style properties.

An element's style property has properties as well... and these are the names of CSS properties.

<pre><code data-trim contenteditable>
var myelement = document.getElementById('myelement');
myelement.style.color = '#a20';
</code></pre>

If the style property is hyphenated, use camel case.

<pre><code data-trim contenteditable>
// background-color becomes backgroundColor
myelement.style.backgroundColor = '#797';
</code></pre>
</section>

<section markdown="block">
## classList

You can also use the __classList__ property of an element to add or remove classes. It has methods of the same name.

For the following element:
<pre><code data-trim contenteditable>
&lt;p class="foo bar"&gt;first one&lt;/p&gt;
</code></pre>

You can use this code to manipulate its classes.

<pre><code data-trim contenteditable>
myelement.classList.add('baz');
myelement.classList.remove('foo');
</code></pre>
</section>

<section markdown="block">
## Specificity

__What color will the background of the list item be, and how did you come to that conclusion?__ &rarr;

<iframe width="100%" height="300" src="//jsfiddle.net/5jmsm4t8/embedded/html,css,result" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

</section>

<section markdown="block">
## Specificity Calculation

The [CSS 3specs](http://www.w3.org/TR/css3-selectors/#specificity) provides an algorithm for determining __specificity__ - which selector has precedence over another:

* count the number of __ID selectors__ in the selector (= a)
* count the number of __class selectors__, attributes selectors, and pseudo-classes in the selector (= b)
* count the number of __type selectors__ (this includes _regular_ elements) and __pseudo-elements__ in the selector (= c)
* ignore the universal selector and the negation pseudo-selector (but count selectors within it)
* concatenate the three numbers a-b-c (in a number system with a large base) 
* larger specificity wins
</section>

	
<section markdown="block">
## Specificity Examples

Whew... um, so how did that _actually_ work? Let's check out some examples:

* [this specificity calculator](http://specificity.keegan.st/) also includes inline styles as part of its calculation 
* [the CSS3 specs](http://www.w3.org/TR/css3-selectors/#specificity) also have some examples

</section>
<section markdown="block">
## Generally, Switch Classes, Not Styles

Try to avoid access style... and instead toggle classes

* have your styles pre-built in your css
* use classList to toggle classes than 
* helps prevent mixing logic and presentation from being too intertwined 
	* for example, matching colors in your css and your js
	* allows you to change styles without modifying code
</section>
<!--
<section markdown="block">
# Topics
	* cascade
	* specificity
	* javasript
		* style
		* query selector
		* class list
	* responsive
		* break points
</section>
-->
