---
layout: slides
title: "The Document Object Model"
---
<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## An HTML Document As Boxes

One way to visualize an HTML document is as a set of nested boxes.

* [see the sample markup](http://eloquentjavascript.net/13_dom.html) and [diagram in our book](http://eloquentjavascript.net/img/html-boxes.svg)
* the outermost tag, <code>html</code>, encloses the <code>head</code> and the <code>body</code>, which in turn, encloses other inner elements, such as headers and paragraphs

</section>


<section markdown="block">
## Data Structures!

__If you were tasked with writing a rendering engine for a browser, what kind of data structure would you use to represent an HTML document in your program?__ &rarr;

(maybe you're planning on building your own in [Swift](http://www.screaming.org/blog/2014/08/15/lets-build-a-browser-engine-in-swift/) or [Rust](http://limpet.net/mbrubeck/2014/08/08/toy-layout-engine-1.html))

* a linked list?
* a tree?
* a hash map?
* a combination of all of the above?
* some custom object?
{:.fragment}

<br>

__Let's look at another way of visualizing an HTML document__ &rarr;
{:.fragment}

</section>

<section markdown="block">
## An HTML Document as a Tree

Another way to view an HTML document is as a tree:

* nested structures, such as ones where each element can have similar sub-elements nested within themselves, can be modeled as a tree
* all of the elements in a document can be thought of as nodes in a tree
* for nested elements, the outer element is a parent, and the inner element is a child
* [see the tree diagram](http://eloquentjavascript.net/img/html-tree.svg) in our book

</section>

<section markdown="block">
## The Document Object Model

The __DOM__, or __Document Object Model__, is a standardized programming interface (an API) for representing and working / interacting with objects in HTML documents

* {:.fragment} it's __language independent__! (...it's not tied to JavaScript) and __cross platform__
* {:.fragment} the DOM is a __fully object-oriented__ representation of a web page
* {:.fragment} it provides a structured representation of the document and defines the way that the document can be accessed programmatically
* {:.fragment} this access allow the reading and modification of a document's content, structure and even visual presentation
* {:.fragment} it's essentially the _bridge_ between a web page and a programming language!
</section>

<section markdown="block">
## DOM Continued

Again, __the DOM and the programming language are separate entities__:

* page content is stored in the DOM
* which is manipulated by a programming language
* the _actual_ __implemented__ DOM API of a web page is the DOM + the programming language

<br>
The DOM represents an HTML document as a group of nodes

* these nodes are organized in a tree structure (as described in the previous slides)
* each node is an object with properties and methods 
</section>

<section markdown="block">
## JavaScript and the DOM

As a point of comparison... there were built-in global objects that were accessible and __specific__ to JavaScript in Node - __what were some built-in objects that we used?__ &rarr;

* <code>console</code>
* <code>global</code>
* the <code>require</code> function
* ...and others, like <code>process</code>, <code>module</code>, [etc.](http://nodejs.org/api/globals.html)
{:.fragment}

<br>
__The JavaScript engine in your browser also has access to a bunch of built in objects - and those objects let us access the DOM__!
{:.fragment}

</section>

<section markdown="block">
## Accessing the DOM

The DOM can be accessed by through a built-in global object called <code>document</code>.

<code>document</code> contains additional objects:

* <code>documentElement</code> - the root of the tree; represents the HTML element (the tags that enclose the entire document)
* <code>body</code> - the body element
* <code>head</code> - the head element

<br>
__Let's see what these objects look like.__ &rarr;
</section>

<section markdown="block">
## Nodes and Node Types

Nodes can be categorized into types. __What kind of node types do you think there are in an HTML document (let's check out the tree structure again)?__ &rarr;

* element 
* text
* comment
* [and a bunch of others](https://developer.mozilla.org/en-US/docs/Web/API/Node.nodeType)
{:.fragment}
<br>

Notice that the [type of a node](https://developer.mozilla.org/en-US/docs/Web/API/Node.nodeType) is specified by a constant. For example...
{:.fragment}

* <code>document.ELEMENT_NODE</code>
* <code>document.TEXT_NODE</code>
{:.fragment}

</section>

<section markdown="block">
##  Node Types Continued

All nodes have a <code>nodeType</code> property that specifies what kind of node it is.

* the nodeType maps to the constants contained in the document object (see the previous slide)
* note that text nodes exist for any text within an element (including white space!)
* __Let's see this in action...__ &rarr;

<br>
Note that the objects we've seen so far, such as <code>document</code>, <code>document.body</code>, etc. are also nodes. 

Consequently, they also have a __nodeType property (compare with [the constants](https://developer.mozilla.org/en-US/docs/Web/API/Node.nodeType)__ &rarr;
</section>

<section markdown="block">
## Node Name and Node Value

Another two properties of Nodes are:

* <code>nodeName</code> - the name of the current node (read only)
* <code>nodeValue</code> 
	* for most node types, such as document, element, etc., <code>nodeValue</code> is null ([see the docs](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeValue))
	* for text, comment, and CDATA node types, <code>nodeValue</code> is the _actual_ content of the node
* __let's check these out__ &rarr;
</section>

<section markdown="block">
## Shortcomings

{{ site.vars.book_js }} mentions that there are some shortcoming with the way the DOM interface is designed. For example:

* {:.fragment}the <code>childNodes</code> property of a node is not actually an array (__let's see... it has length, but what methods would we expect from an array?__&rarr;) 
	* {:.fragment} (no slice())
	* {:.fragment} (no forEach())
* {:.fragment} there are no facilities to immediately add children to a newly created node
	* {:.fragment} rather, each child of a new node must be added one-by-one!


</section>
<section markdown="block">
## Some Solutions

Fortunately, JavaScript allows us to create abstractions that smooth over these design flaws. There are many libraries available that make manipulating the DOM a breeze (JQuery being the most popular).

* with that said, we'll still be taking a look at the plain vanilla API that the DOM has to offer 
* in fact, there's a bit of a movement to limit the use of libraries and dependencies to only those that are essential __why?__ &rarr;
	* {:.fragment} page download size increases with each dependency
	* {:.fragment} sometimes libraries are _too magical_ (maybe you don't know what it's actually doing under-the-hood)
* {:.fragment} [check out youmightnotneedjquery.com](http://youmightnotneedjquery.com/) for some examples

<br>
Of course, you can see that libraries, like JQuery, make things much easier for the programmer.
{:.fragment}

</section>

<section markdown="block">
## Moving Around

Some properties that you can use to move around the DOM are:

* <code>parentNode</code> - the node containing the current node
* <code>childNodes</code> - an array-like object containing all of the current node's children
	* has a <code>length</code> property
	* does not have typical Array methods, such as slice and forEach
* <code>firstChild</code> - first child node
* <code>lastChild</code> - last child node
* <code>previousSibling</code> - the previous adjacent node
* <code>nextSibling</code> - the next adjacent node

<br>
__And... let's see what these look like.__ &rarr;

</section>

<section markdown="block">
## An Exercise

[Write a function](https://docs.google.com/a/nyu.edu/forms/d/1bqPF8NaUAj1AtVwEcnWnEoaeriOU6MWRmTPpZ0BuGR0/viewform) called <code>talksAbout</code>. Test on this [markup](https://gist.github.com/foureyes/bf13be6e98f1bf0211652a74ba2e4870).

* two parameters, a node to search in, and a string to look for 
* returns true if it finds the string anywhere within the node or the node's children
* <code>talksAbout(document.body, 'schedule'); // returns true if the word 'schedule' is in body</code> 
* try a recursive solution
* check the node's type by comparing to <code>document.ELEMENT_NODE</code> or <code>document.TEXT_NODE</code>
* if it's an element node, you know it has children, so call function again on all of those children (return false if the search isn't successful in the child nodes)
* if it's a text node, use <code>indexOf</code> to determine if the search string is a substring of the __node's value__ (<code>nodeValue</code>)
* remember that <code>indexOf</code> returns -1 if the substring is not found


</section>

<section markdown="block">
## A Potential Solution

<pre><code data-trim contenteditable>
function talksAbout(node, search) {
	if (node.nodeType === document.ELEMENT_NODE) {
		for (var i = 0; i < node.childNodes.length; i++) {
			if (talksAbout(node.childNodes[i], search)) {
				return true;
			}
		}
		return false
	} else if (node.nodeType === document.TEXT_NODE) {
		return node.nodeValue.indexOf(search) > -1 {
	}
}
</code></pre>
</section>

<section markdown="block">
## A Note on Class vs ID

All HTML elements can have a class and an ID attribute. 

* generally IDs can occur only once in a document: <code>id="foo"</code>
* however, there can be multiple elements with the same class: <code>class="bar"</code>
* these are typically not enforced by the browser

</section>

<section markdown="block">
## Finding Elements

The following methods will give back an element or elements based on search criteria:

* <code>document.getElementById</code> - returns node with specified id attribute
* <code>document.getElementsByClassName</code> - returns nodes with specified class attribute (an HTML Collection)
	* also callable on elements (searches only within element called on)
* <code>document.getElementsByTagName</code> - returns nodes with specified tag name (an HTML Collection)
	* also callable on elements (searches only within element called on)

<br>
</section>

<section markdown="block">
## Modifying Elements

Changing attributes

<pre><code data-trim contenteditable>
// we can change certain attributes simply by using assignment... for example, id, src, or href
document.getElementById('foo').id = 'bar';
</code></pre>

Changing text node values

<pre><code data-trim contenteditable>
// assuming we have an element_node, and we know its first child is a text element
node.firstChild.nodeValue = 'new text'
</code></pre>

</section>

<section markdown="block">
## Modifying Elements Continued

Assuming the following markup within a body tag, how would you change the href of the last link so that it takes you to an image search for cookies (using JavaScript)?

<pre><code data-trim contenteditable>
<div id="announcement">
  announcement
</div>
<div id="content">
  content
  <p class="body-text"> stuff 1 </p>
  <p class="body-text"> stuff 2 </p>
  <p> stuff 3 <a href="">with a link </a></p>
  <p> Um Cookies <a id="cookies" href="">&#127850; &#127850; &#127850; &#127850; &#127850;</a></p>
</div>

</code></pre>

</section>

