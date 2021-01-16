---
layout: slides
title: "Canvas"
---
<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## Let's Draw

Tired of text?  We can actually __draw__ with JavaScript using a __canvas__.

* a __canvas__ is an html element that be used for programmatic rendering of graphics on a web page
* think of it is a blank rectangle on your page that you can draw on
</section>

<section markdown="block">
## Setting up a Canvas 

again, a __canvas__ is an html element - it's a tag.  You can draw on it by using JavaScript.  Here's how you set it up:

1. create an html page
2. tell the page to _call your code_ once the whole page is loaded
3. add your canvas tags
4. add your script tags
5. create a function that will do your drawing!
6. write some setup code so that you have access to the canvas
</section>

<section markdown="block">
## Our Usual Template

Let's start with our usual template....

<pre><code class="js" data-trim contenteditable>
&lt;html&gt;
&lt;head&gt;
	&lt;title&gt;&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;script&gt;
&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre>
</section>

<section markdown="block">
## Telling Your Page to Draw Something

We'll have to let the page know that it should start drawing once the entire page is loaded.  

* we do this by adding event handler that gets called once the page is loaded
* it'll call a function called main() that we'll define later
* this can go in a script tag at the end of the file

<pre><code class="js" data-trim contenteditable>
document.addEventListener('DOMContentLoaded', main);
</code></pre>
</section>

<section markdown="block">
## A Canvas

Let's add a place to draw!.  Use a pair of opening and closing tags called canvas... with attributes, id, width, and height.

* __id__ will be used later in order to reference this particular canvas
* __width__ and __height__ are the dimensions of your drawing area
* make sure to add an __id attribute__!
* (remember what we use to retrieve that element?)

<pre><code class="js" data-trim contenteditable>
&lt;canvas id="sketch" width="300" height="300"&gt;
&lt;/canvas&gt;
</code></pre>
</section>



<section markdown="block">
## Main Function

Also within your script tags (or external JavaScript), define the function that you specified in your addEventListener 

<pre><code class="js" data-trim contenteditable>
function main() {
 // your drawing goes here
}
</code></pre>
</section>

<section markdown="block">
## Using Your Canvas in JavaScript

In order to draw on your canvas, you have to:

1. _retrieve_ the canvas element from your page using the id
2. get the context from your canvas element (which is what we'll be using to draw)
<pre><code class="js" data-trim contenteditable>
var sketch = document.getElementById('sketch');
var context = sketch.getContext("2d");
</code></pre>

</section>

<section markdown="block">
## All Together Now...

Here's everything put together.

<pre><code class="js" data-trim contenteditable>
&lt;body onload="draw()"&gt;
&lt;canvas id="sketch" width="300" height="300"&gt;
&lt;/canvas&gt;
&lt;script&gt;
function main() {
	var sketch = document.getElementById('sketch');
	var context = sketch.getContext("2d");
	// draw stuff here!
}
document.addEventListener('DOMContentLoaded', main);
&lt;/script&gt;
&lt;/body&gt;
</code></pre>
</section>


<section markdown="block">
## Drawing

About the canvas... __where would you think the origin is, and what about the positive values for x and y?__ &rarr;

* the canvas origin is at 0, 0, and it's at the upper left hand corner
* positive y values go down, positive x values go right
{:.fragment}

<br>
Once you have your context, you can call _methods_ on it for drawing:
{:.fragment}

<pre><code class="js" data-trim contenteditable>
context.fillRect(30, 30, 50, 50);
</code></pre>
{:.fragment}
</section>


<section markdown="block">
## A Rectangle

__fillRect__ creates a rectangle.  It takes 4 arguments:

* __x__ position
* __y__ position
* __width__ of rectangle
* __height__ of rectangle

<pre><code class="js" data-trim contenteditable>
context.fillRect(x, y, width, height);
</code></pre>

</section>

<section markdown="block">
## A Circle

A circle is a bit more complicated. It uses the context's [arc](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.arc) method. Additionally, it uses begin and close path to draw a line.

__Here's a template:__ &rarr;

<pre><code class="js" data-trim contenteditable>
context.beginPath();
context.arc(x, y, radius, start angle, end angle, clockwise);
context.closePath();
context.fill();
</code></pre>

</section>

<section markdown="block">
## Circle Example

__Now with some actual arguments.__ &rarr;

Note that the end angle is 2 * pi (the number of radians for a full circle):

<pre><code class="js" data-trim contenteditable>
context.beginPath();
context.arc(30, 10, 10, 0, 2 * Math.PI, true);
context.closePath();
context.fill();
</code></pre>
</section>

<section markdown="block">
## Colors 

You can color your shapes by setting __fillStyle__:

<pre><code class="js" data-trim contenteditable>
context.fillStyle = "#00ff00"
</code></pre>

* this sets the fill color for all shapes drawn subsequently
* notice that it's not a function call
* rather... you set that property equal to a value
* the value is a _string_ representation of a hexadecimal color code
	* "#ff0000" - red
	* "#00ff00" - green
	* "#0000ff" - blue
	* "#000000" - black
</section>

<section markdown="block">
## More About Drawing
 
Each shape you create draws on top of all of your previous drawwings.  In this case, the green circle is drawn over the black square:

<pre><code class="js" data-trim contenteditable>
context.fillRect(40, 30, 100, 100);

context.fillStyle = "#00ff00"
context.beginPath();
context.arc(50, 40, 40, 0, 2 * Math.PI, true);
context.closePath();
context.fill();
</code></pre>

</section>

<section markdown="block">
## An Example Program:

<pre><code class="js" data-trim contenteditable>
&lt;canvas id="sketch" width="300" height="300"&gt;
&lt;/canvas&gt;
</code></pre>
<pre><code class="js" data-trim contenteditable>
&lt;script&gt;
function main() {
	var sketch = document.getElementById('sketch');
	var context = sketch.getContext("2d");

	context.fillRect(40, 30, 100, 100);

	context.fillStyle = "#00ff00"
	context.beginPath();
	context.arc(50, 40, 40, 0, 2 * Math.PI, true);
	context.closePath();
	context.fill();
}
document.addEventListener('DOMContentLoaded', main);
&lt;/script&gt;
</code></pre>
</section>
