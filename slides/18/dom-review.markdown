---
layout: slides
title: "DOM Review, Finding and Changing"
---
<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## Accessing the DOM

__What object gives us access to the DOM?__ &rarr;

<code>document</code>
{:.fragment}

__What properties in the document object represent the following elements in the DOM: html, body, head?__ &rarr;
{:.fragment}

* <code>document.documentElement</code>
* the other two are super easy:
	* <code>document.body</code>
	* <code>document.head</code>
{:.fragment}
</section>

<section markdown="block">
## Getting to an Element's Relatives

__What properties let us access the very first element nested, the very last element nested, and all the elements nested under the current element.__ &rarr;

* <code>firstChid</code> and <code>lastChild</code>
* <code>childNodes</code>
{:.fragment}

<br>
__What about the element containing this element, and what about elements adjacent to the current element.__ &rarr;
{:.fragment}

* <code>parentNode</code>
* <code>previousSibiling</code> and <code>nextSibling</code>
{:.fragment}

<br>
__Oh yeah... and what object do I call these on?__ &rarr;
{:.fragment}

Anything that inherits from Node (which is pretty much _everything_, right?)
{:.fragment}
</section>

<section markdown="block">
## Finding Elements

__What are some ways of finding elements in the DOM without having to traverse related DOM elements?__ &rarr;

* __<code>document.getElementById</code>__ - returns Node with specified id attribute
* __<code>someNode.getElementsByClassName</code>__ - returns an HTMLCollection, an Array-like object containing nodes (HMTLElements) with the specified class attribute; searches only within element called on
* __<code>someNode.getElementsByTagName</code>__ - returns an HTMLCollection containing HTMLElements with the specified tag name; searches within element that it was was called on 
{:.fragment}
</section>

<section markdown="block">
## Objects

The DOM is composed of many different objects that inherit from / implement other common objects.

* almost everything descends from Node (which itself inherits from EventTarget)
* all elements are HTMLElements

[A slightly out-of-date, but mostly accurate, class diagram (ignore Attr)](http://web.stanford.edu/class/cs98si/slides/the-document-object-model.html)
</section>

<section markdown="block">
## Modifying the DOM

__Whare are some methods for adding/removing nodes? Do they return anything?__ &rarr;

* [<code>.removeChild(childNodeToRemove)</code>](https://developer.mozilla.org/en-US/docs/Web/API/Node.removeChild) - removes a child node from the DOM and returns it
	* returns removed node
	* node still exists in memory, but is no longer in DOM tree
* [<code>.appendChild(nodeToAppend)</code>](https://developer.mozilla.org/en-US/docs/Web/API/Node.appendChild) - puts node at end of list of this node's child nodes
	* returns appended node
* [<code>.insertBefore(nodeToInsert, beforeThisNode)</code>](https://developer.mozilla.org/en-US/docs/Web/API/Node.insertBefore) - inserts node before the node given as child of current node
	* returns the inserted node
* [<code>.replaceChild(nodeToInsert, nodeToReplace)</code>](https://developer.mozilla.org/en-US/docs/Web/API/Node.replaceChild) - replaces a child of the current node with the nodeToInsert
	* returns the replaced node
{:.fragment}
</section>

<section markdown="block">
## Reading or Creating Nodes and their content

__How do we read or change text contained within a node? How do we create new nodes?__ &rarr;

* <code>node.nodeValue</code>
* <code>node.textContent</code> (just the text within a node a child nodes), <code>innerHTML</code> (includes mark-up), and <code>innerText</code> (stylesheet aware)
* [<code>document.createTextNode(text)</code>](https://developer.mozilla.org/en-US/docs/Web/API/document.createTextNode)
* [<code>document.createElement(elementName)</code>](https://developer.mozilla.org/en-US/docs/Web/API/document.createElement)
{:.fragment}
</section>

<section markdown="block">
## Be Careful When Removing/Replacing Elements

When going over an HTMLCollection of elements, you have to __be careful when you remove, replace or modify elements. Why?__ &rarr;

* the data structures we're working with are _live_
* __they change as the document changes in real time__
* we can do the following to work around this:
	* iterate over collection in reverse order
	* use a while loop in conjunction with <code>firstChild</code>
	* take a _snapshot_

</section>
<section markdown="block">
## Some Quick Exercises

__Let's practice.__ &rarr;

1. find the header on the NYU home page - [http://www.nyu.edu/](http://www.nyu.edu/) (the element that contains the navigation, logo and search box)
2. remove it with JavaScript
3. (refresh the page) find the header again, but instead of removing it, add an heading element (h1) with text that says "Hello" to its list of child elements

<br>
<pre><code data-trim contenteditable>
// find the header (it has an id... easy!)
document.getElementById('headerContainer');

// 'cheap' way to remove the header
var header = document.getElementById('headerContainer');
header.parentNode.removeChild(header);

// adding an h1... note that appendChild returns the 
// element added
var header = document.getElementById('headerContainer');
header.appendChild(document.createElement('h1')).textContent = 'Hello';
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## EventTarget

As mentioned previously, almost everything inherits from Node... which in turn inherits from EventTarget.

EventTarget objects are DOMobjects that can receive events.

__How do we set up an element that responds to events? What are some events that we know?__ &rarr;

* __<code>element.addEventListener('eventName', callback)a</code>__
* __<code>addEventListener</code>__ allows multiple event handler to be added to the same event on the same element
* we looked at two events:
	* __click__ - triggered on mouse click (press and release) on a single element (__this__ represents the element clicked on in the callback function)
	* __DOMContentLoaded__ - document has been completed loaded and parsed (without waiting for CSS, images, etc.)
{:.fragment}
</section>


<section markdown="block">
## One Last Exercise

Back to the nyu homepage.

__Add an h1 with the text hello as the last element in the header anytime the header is clicked.__

<pre><code data-trim contenteditable>

var header = document.getElementById('headerContainer');
header.addEventListener('click', add_h1_to_header);

function add_h1_to_header(event) {
	this.appendChild(document.createElement('h1')).textContent = 'Hello';
}
</code></pre>
{:.fragment}
</section>
