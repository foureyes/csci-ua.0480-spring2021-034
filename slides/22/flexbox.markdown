---
layout: slides
title: "Flexbox"
---

<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>


<section markdown="block">
## Different Screen Sizes

With so many different devices that can be used to view a page, coming up with a design for different resolutions is pretty challenging...

__What are some layout/visual strategies that you can use to deal with different screen resolutions?__ &rarr;


</section>

<section markdown="block">
## Different Screen Sizes

__To cope with varying screen dimensions:__ &rarr;

* {:.fragment} we may consider resizing the actual elements on the page as the screen size changes
	* {:.fragment} for example, text and images could shrink or grow
	* {:.fragment} (but, of course, until a certain point)
* {:.fragment} we may also consider re-flowing the elements, or laying elements out differently
	* {:.fragment} for example, for a narrower display, we may stack elements rather than have them adjacent to each other
* {:.fragment} we could add or remove elements 
	* {:.fragment} for example, remove non-essential elements from a page on small resolutions
	* {:.fragment} or replace user interface elements that are more appropriate for the resolution (such as a _hamburger_ menu on a phone)

</section>

<section markdown="block">
## Layout

So... working with the display properties of __inline__ and __block__ is a bit limiting, especially when it comes to accommodating different screen sizes.

* {:.fragment} we don't have much control of how things flow/resize/are added or removed when a screen resolution changes
* {:.fragment} for example, block level elements don't really reflow in any way
* {:.fragment} span elements just wrap, but don't have an explicitly _settable_ width and height
* {:.fragment} block and inline are rigid in the direction that elements are laid out (either biased vertically or horizontally)

</section>
<section markdown="block">
## Flexbox

One way to deal with these issues is to use __flexbox__.

* __flexbox__ is a layout mode that allows for more control over how elements are laid out, aligned, and sized to fill up available space
* flexbox gives the developer the ability to specify an elements' dimensions, arrangement, alignment, and surrounding white space:
	* when the layout must accommodate different screen sizes
	* ...even when the sizes of elements are unknown or dynamic
* use it for:
	* _simple_ layouts
	* or layouts for components of a larger application

</section>
<section markdown="block">
## Flexbox Examples

The following slides will build off of this html, css and JavaScript:

* [jsbin](https://jsbin.com/zapuhezowi/1/edit?css,output)

</section>

<section markdown="block">
## Flex Container and Items

__Flexbox__ isn't a single property. Instead, it's a set of values and properties that are set on:

* __the flex container__ ... the element that contains items to be arranged using flexbox
* __flex items__ ... child elements within the flex container

</section>
<section markdown="block">
## Activating Flexbox

Set the __display__ property of the containing element, the flex container, to __flex__:

<pre><code data-trim contenteditable>
#container {
	display: flex; 	
}
</code></pre>

<br>
The items within the flex container will be laid out according to additional flexbox related properties.

__Let's try this.__ &rarr;
</section>

<section markdown="block">
## Flex Direction / Flex Wrap

Because flexbox isn't tied to a horizontal/inline layout or a vertical/block layout, its layout is defined by __flex direction__ and __flex wrap__, which in turn specify the main axis and the cross axis.

* the __main axis__ of a flex container is the primary axis in which a container's items are laid out
	* it's the axis along which items _follow_ each other
	* it's not always horizontal
* the __cross axis__ of a flex container is perpendicular to the main axis
	
</section>

<section markdown="block">
## Main and Cross Axis Start and End

The items are placed in a flex container on the __main axis__:

* __main start and main end__ specify the start and end of where elements can be placed on the __main axis__
* __cross start and cross end__ specify the start and end of the perpendicular axis on which elements are placed 
	* for example, imagine that wrapping is enabled...
	* and that the main axis is horizontal
	* the cross axis would then be vertical...
	* so cross start would be the first line of horizontal items
	* and cross end would be the last line of horizontal items
</section>

<section markdown="block">
## Um. Pics or it Didn't Happen.

Let's take a look at the [flexbox diagram on mozilla developer network](https://developer.mozilla.org/files/3739/flex_terms.png):

![flexbox diagram on mozilla developer network](https://developer.mozilla.org/files/3739/flex_terms.png)

__Specifically, notice the following items...__ &rarr;

* {:.fragment} flex container and flex items
* {:.fragment} main and cross axis
* {:.fragment} main and cross start and end

</section>

<section markdown="block">
## flex-direction

The _actual_ direction of the main and cross axis are specified by the __flex-direction__ property of the containing element. The possible values are:

* <code>row</code> - (default) lays out elements horizontally
* <code>row-reverse</code> - horizontally in reverse order of the source
* <code>column</code> - lays out elements vertically
* <code>column-reverse</code> - vertically in reverse order of the srouce


</section>

<section markdown="block">
## flex-direction example

__Let's try some of these values.__ &rarr;


<pre><code data-trim contenteditable>
.item {
	flex-direction: column;
}
</code></pre>

<p data-height="388" data-theme-id="0" data-slug-hash="ZbgwGd" data-default-tab="result" data-user="foureyes" class='codepen'>See the Pen <a href='http://codepen.io/foureyes/pen/ZbgwGd/'>flex box - flex-direction</a> by Joe Versoza (<a href='http://codepen.io/foureyes'>@foureyes</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
</section>

<section markdown="block">
## No More space!?

By default, __flexbox will try to fit everything on the same main-axis...__ ... even when resized:

* {:.fragment} reducing the dimensions results in the container and items shrinking
* {:.fragment} when the items can't shrink anymore, items will overflow
* {:.fragment} the content may fall outside of the viewable area of the window 

<br>

<div markdown="block">

__Let's try resizing our window full of flex elements__ &rarr;

<p data-height="268" data-theme-id="0" data-slug-hash="KdObLG" data-default-tab="result" data-user="foureyes" class='codepen'>See the Pen <a href='http://codepen.io/foureyes/pen/KdObLG/'>flex box - base</a> by Joe Versoza (<a href='http://codepen.io/foureyes'>@foureyes</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

</div>
{:.fragment}

<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

</section>

<section markdown="block">
## flex-wrap 

If you'd rather have content wrap, there's the aptly named __flex-wrap__:

* it __specifies what to do with flex items if the main axis no longer has space__
* this property is set on the flex container, and these are its possible values:
	* {:.fragment} <code>nowrap</code> - default, as mentioned in previous slides... items will fit on one line of main axis
	* {:.fragment} <code>wrap</code> - wrap to next line
	* {:.fragment} <code>wrap-reverse</code> - wrap to next line, opposite direction
	* {:.fragment} note that direction matters (we can try column, but we'll have to explicitly set a height for the container)
</section>

<section markdown="block">
## flex-wrap example

__Let's try flex-wrap with some different values.__ &rarr;

<pre><code data-trim contenteditable>
#container {
	flex-wrap: wrap;
}
</code></pre>

<p data-height="316" data-theme-id="0" data-slug-hash="VvoOpW" data-default-tab="result" data-user="foureyes" class='codepen'>See the Pen <a href='http://codepen.io/foureyes/pen/VvoOpW/'>flex box - flex-wrap</a> by Joe Versoza (<a href='http://codepen.io/foureyes'>@foureyes</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
</section>


<section markdown="block">
## order


Items within the flex container are arranged in order that they appear in the markup (_source order_)

However, __you can change the visual rendering of these items__ by using the __order__ property on specific __item__ elements:

* the possible values of order are integers
* the default value is 0
* elements are laid out in ascending order of __order__ values


</section>

<section markdown="block">
## order example

__How would you move the first 2 elements in this row of divs to the end of the row without changing the markup?__ &rarr;

<p data-height="268" data-theme-id="0" data-slug-hash="dYxaOv" data-default-tab="result" data-user="foureyes" class='codepen'>See the Pen <a href='http://codepen.io/foureyes/pen/dYxaOv/'>flex box - order</a> by Joe Versoza (<a href='http://codepen.io/foureyes'>@foureyes</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

<pre><code data-trim contenteditable>
#item1 {
  order: 1; 
}
#item2 {
  order: 2; 
}
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Justifying Content

The __justify-content__ property defines how space is distributed around the flex items in the main axis. It's possible values are:

* flex-start - items are packed at the beginning of main axis 
* flex-end - ... at end of main axis
* center - items are centered
* space-between - space distributed evenly between items, but items start and end at main-start and main-end
* space-around - space distributed evenly... including before and after first and last item

</section>


<section markdown="block">
## justify-content example

__Let's try a few of these values.__ &rarr;

<pre><code data-trim contenteditable>
.container {
  display: flex;
  justify-content: space-around;
}
</code></pre>

<p data-height="212" data-theme-id="0" data-slug-hash="BoXedO" data-default-tab="result" data-user="foureyes" class='codepen'>See the Pen <a href='http://codepen.io/foureyes/pen/BoXedO/'>flex box - justify-content</a> by Joe Versoza (<a href='http://codepen.io/foureyes'>@foureyes</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

</section>

<section markdown="block">
## Aligning Along the Line on the Cross Axis

The __align-items__ property specifies how space should be distributed __along the flex line__ on the cross axis (that is, the perpendicular axis).

* flex-start - at the beginning of cross axis
* flex-end - at end of cross axis
* center - centered along cross axis
* baseline - items aligned such that baseline of text is aligned
* stretch - fill cross axis while still respecting specified height if specified (_stretch_)
<br>

</section>

<section markdown="block">
## align-items Example

__Let's try this.__ &rarr;

<pre><code data-trim contenteditable>
.container {
  display: flex;
  align-items: baseline;
}
</code></pre>

<p data-height="325" data-theme-id="0" data-slug-hash="ZbgNxY" data-default-tab="result" data-user="foureyes" class='codepen'>See the Pen <a href='http://codepen.io/foureyes/pen/ZbgNxY/'>flex box - align-items</a> by Joe Versoza (<a href='http://codepen.io/foureyes'>@foureyes</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

</section>
<section markdown="block">
## Aligning the Content (All Lines) Along Cross Axis

The __align-content__ property specifies how space should be distributed __around and between all flex lines__ on the cross axis (that is, the perpendicular axis).

* flex-start - lines are packed at the beginning of cross axis 
* flex-end - ... at end of cross axis
* center - lines are centered along cross axis
* space-between - space distributed evenly between lines, but lines start and end at cross-start and cross-end
* space-around - space distributed evenly... including before and after first and last line
<br>

</section>

<section markdown="block">
## align-content Example Setup

Let's add a border and a height to our container so that we can see where lines are aligned.

<pre><code data-trim contenteditable>
.container {
	display: flex;
	flex-wrap: wrap;
	height: 400px;
	border: 1em solid #277;
}
</code></pre>

</section>

<section markdown="block">
## align-content Example Setup

__Let's try using align-content to align lines.__ &rarr;

<pre><code data-trim contenteditable>
.container {
	align-content: flex-end;
}
</code></pre>

<p data-height="457" data-theme-id="0" data-slug-hash="qOeGLX" data-default-tab="result" data-user="foureyes" class='codepen'>See the Pen <a href='http://codepen.io/foureyes/pen/qOeGLX/'>flex box - align-content</a> by Joe Versoza (<a href='http://codepen.io/foureyes'>@foureyes</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
</section>

<section markdown="block">
## flex-grow

The __flex-grow__ property is set on a flex item, and it determines how much space (in a container) an item should take up if the item needs to grow.

* the possible values are integers
* the integer represents a proportion 
* if all are equal, then all items take up equal space
* however, if all items are 1... but one item is 2, this one item would take up twice the space of all of the others

</section>


<section markdown="block">
## flex-grow Example 

__Let's see how flex-grow works.__ &rarr;

<pre><code data-trim contenteditable>
#item2 {
	flex-grow: 2;
}
.item {
    flex-grow: 1;
	height: 2em;
	/* width: 2em; */
}
</code></pre>

<p data-height="214" data-theme-id="0" data-slug-hash="ojKrbd" data-default-tab="result" data-user="foureyes" class='codepen'>See the Pen <a href='http://codepen.io/foureyes/pen/ojKrbd/'>ojKrbd</a> by Joe Versoza (<a href='http://codepen.io/foureyes'>@foureyes</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

</section>

<section markdown="block">
## flex-shrink

The __flex-shrink__ property is set on a flex item, and it determines how much space (within the container) an item should take up if the item needs to shrink.

* the possible values are integers
* the integer represents a factor
* if all are equal, then all items take up equal space
* however, if all items are 1... but one item is 2, this one item would take up twice the space of all of the others

</section>

<section markdown="block">
## flex-shrink Example

__Let's see how flex-grow works (try resizing).__ &rarr;

<pre><code data-trim contenteditable>
#item2 {
	flex-shrink: 2;
}

.item {
	flex-shrink: 1;
	height: 2em;
	width: 6em; 
}
</code></pre>

<p data-height="202" data-theme-id="0" data-slug-hash="gaVNgy" data-default-tab="result" data-user="foureyes" class='codepen'>See the Pen <a href='http://codepen.io/foureyes/pen/gaVNgy/'>gaVNgy</a> by Joe Versoza (<a href='http://codepen.io/foureyes'>@foureyes</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
</section>

<section markdown="block">
## Overriding align-items 

You can override the container's __align-items__ property  for a specific item by using __align-self__ on a flex item. The same values are still relevant: 

* flex-start - at the beginning of cross axis
* flex-end - at end of cross axis
* center - centered along cross axis
* baseline - items aligned such that baseline of text is aligned
* stretch - fill cross axis while still respecting specified height if specified (_stretch_)
<br>

</section>

<section markdown="block">
## align-self Example

__Let's try this.__ &rarr;

<pre><code data-trim contenteditable>
#item4 {
	background-color: #ea1;
	align-self: flex-end;
}
</code></pre>

<p data-height="310" data-theme-id="0" data-slug-hash="pjMXpN" data-default-tab="result" data-user="foureyes" class='codepen'>See the Pen <a href='http://codepen.io/foureyes/pen/pjMXpN/'>flex box - align-self</a> by Joe Versoza (<a href='http://codepen.io/foureyes'>@foureyes</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
</section>

<section markdown="block">
## Center Vertically and Horizontally

__Using flex box related properties, center (horizontally and vertically) the inner div in the containing div__ &rarr;


<p data-height="400" data-theme-id="0" data-slug-hash="yYmdEb" data-default-tab="result" data-user="foureyes" class='codepen'>See the Pen <a href='http://codepen.io/foureyes/pen/yYmdEb/'>flex box - center the item</a> by Joe Versoza (<a href='http://codepen.io/foureyes'>@foureyes</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
</section>

<section markdown="block">
## Centering

One way to center horizontally and vertically is to use flex box. Set both __justify-content__ and __align-items__ to __center__ &rarr;

<pre><code data-trim contenteditable>
.container {
	display: flex;
	justify-content: center;
 	align-items: center;
}
</code></pre>
</section>

<section markdown="block">
## Layout with Flex Box


Use the following markup....

<pre><code data-trim contenteditable>
<div id="main">
  <article>article</article>
  <nav>nav</nav>
  <aside>aside</aside>
</div>
<footer>footer</footer>
</code></pre>
</section>

<section markdown="block">
## Layout with Flex Box Continued

And this CSS...

<pre><code data-trim contenteditable>
article, nav, aside, footer {
  font-family: sans-serif;
  border: 1px solid #000;
  padding: 5px;
  margin: 5px;
}

nav {
  width: 200px;
}

aside {
  width: 200px;
}

article {
  height: 300px;
}
</code></pre>

</section>

<section markdown="block">
## Layout with Flex Box...

__Create this layout by using flexbox properties__ &rarr;

* don't peek at the css tab
* only use flex properties

<br>

<p data-height="344" data-theme-id="0" data-slug-hash="OyKeoP" data-default-tab="result" data-user="foureyes" class='codepen'>See the Pen <a href='http://codepen.io/foureyes/pen/OyKeoP/'>flex-box - 3 column</a> by Joe Versoza (<a href='http://codepen.io/foureyes'>@foureyes</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
</section>

<section markdown="block">
## Resources

* [flexbox mdn docs](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_CSS_flexible_boxes)
* [flexbox guide from css tricks](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
* [flexbox in 5 minutes](https://cvan.io/flexboxin5/)
* [flexbox decision tree](http://jonibologna.com/content/images/flexboxsheet.pdf)

</section>
{% comment %}
## What is it?

* allows for control of layouts on varying screen resolutions

## Diagram
## Definitions

container:
display: flex
flex-direct: ... default is row, the direction flex items are placed in container 
{% endcomment %}


