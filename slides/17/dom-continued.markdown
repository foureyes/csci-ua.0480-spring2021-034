---
layout: slides
title: "DOM Continued"
---
<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## In This Set of Slides...

* a brief review of the DOM, moving around, finding elements
* a word on the objects involved
* changing the DOM
* creating new elements
* a peek at events
</section>

<section markdown="block">
# A Brief Review
</section>

<section markdown="block">
## About the DOM

Sooo... __describe what the Document Object Model is__: &rarr;

* {:.fragment} it's a standard that specifies how an HTML document (or XML, XHTML, SVG, etc.) is represented, interacted with and accessed by objects
* {:.fragment} it's separate from a programming language; it's not tied to JavaScript 
* {:.fragment} the DOM + some programming language... is our API for programmatically manipulating a web page
* {:.fragment} the DOM is a fully object-oriented representation of an HTML Document
* {:.fragment} an HTML document is represented as a tree of node objects
</section>

<section markdown="block">
## The DOM and JavaScript

__How do we access the dom in JavaScript?__ &rarr;

Through the <code>document</code> object. __About the <code>document</code> object__: &rarr;
{:.fragment}

* it serves as an entry point to the DOM
* each page loaded in your browser has its own document object
* any global functionality (document wide functionality) is provided by this object
	* the page's url
	* retrieving an element in the document by the element's id attribute, etc.
{:.fragment}
</section>

<section markdown="block">
## Document Properties

We learned a few properties that the <code>document</code> object contains.  __What were they?__ &rarr;

<pre><code class="js" data-trim contenteditable>
// the head and body element of the current document
document.head
document.body

// the document's root element; in an HTML document, 
// the actual html element
document.documentElement 
</code></pre>
{:.fragment}

You can find a full list of Document properties, such as [URL](https://developer.mozilla.org/en-US/docs/Web/API/Document.URL), [images](https://developer.mozilla.org/en-US/docs/Web/API/Document.images), etc. ... [here](https://developer.mozilla.org/en-US/docs/Web/API/Document).
{:.fragment}

(__btw__ ... __why not just use <code>document.firstChild</code> instead of <code>document.documentElement</code>?__ &rarr;)
{:.fragment}

There's probably a <code>doctype</code> element before <code>html</code>
{:.fragment}
</section>

<section markdown="block">
## Traversing the DOM

Speaking of the <code>firstChild</code> property, what other properties are there for navigating the DOM?

<pre><code class="js" data-trim contenteditable>
// first and last child of current element
firstChild 
lastChild

// an array-like object containing all of the current 
// node's children
childNodes 

// the parent of the current node
parentNode 	

// the previous and next adjacent node
previousSibling 
nextSibling 
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Traversing the DOM Continued

Assuming that all of this markup is in the __body__, __how would I get__: &rarr;

* an easy one... the <code>body</code>
* the first <code>div</code> element, with id="content"
* the first <code>p</code> (paragraph) in the first <code>div</code> element 
* the _actual_ text in the first paragraph from above ("One")

<br>

<pre><code class="html" data-trim contenteditable>
&lt;body&gt;
&lt;style&gt;#three {color:red;}&lt;/style&gt;
&lt;div id="content"&gt;
    &lt;p&gt;One&lt;/p&gt;
    &lt;p class="cta"&gt;Two&lt;/p&gt;
    &lt;p class="cta" id="three"&gt;Three&lt;/p&gt;
&lt;/div&gt;
&lt;/body&gt;
</code></pre>
</section>

<section markdown="block">
## Traversing the DOM Potential Solutions

Ugh. That was _terrible_. 

* an easy one... the <code>body</code>
	* <code>document.body</code>
* the first <code>div</code> element, with id="content"
	* <code>document.body.firstChild.nextSibling</code>
* the first <code>p</code> (paragraph) in the first <code>div</code> element 
	* <code class="js">document.body.firstChild.nextSibling.firstChild.nextSibling</code>
* the _actual_ text in the first paragraph from above ("One")
	* <code>document.body.firstChild.nextSibling.firstChild.nextSibling.firstChild</code>
</section>

<section markdown="block">
## Whew! That Was Fun (!?)

__So, besides the tedium, what's not great about how we retrieved elements?__ &rarr;

* we have to navigate through text nodes
* we've hardcoded paths!
	* what if the document changes?
	* we have to know about the structure of the document beforehand (what if that structure is dynamic)
* it'd be great if we could just find the elements directly rather than traversing the DOM tree
* (we'll take a look at that later)
{:.fragment}

</section>

<section markdown="block">
# Let's Take a Closer Look at Some of the Objects That We Retrieved
</section>


<section markdown="block">
## Some Documentation 

First, [check out Mozilla Developer Network's reference](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model):

* it contains an exhaustive list of objects...
* each object shows
	* properties
	* methods
	* __and where they're inherited from / what interface they're implementing__ &rarr;
* __let's take a look at [Document / HTML Document](https://developer.mozilla.org/en-US/docs/Web/API/Document) too__ &rarr;

</section>


<section markdown="block">
## Introspection Tools and Getting to the Bottom of Things

__Let's see if we can use the following tools to investigate the built-in <code>document</code> object... and the first <code>div</code>__ &rarr;

* <code>Object.getPrototypeOf</code> - returns the prototype of the object (the next object up in the prototype chain)
* <code>someInstance.constructor</code> - the function (the constructor) used to create someInstance
* <code>someInstance.constructor.name</code> - the name of the above function
* <code>someInstance instanceof obj</code> - determine if someInstance has obj somewhere in its prototype chain

</section>
<section markdown="block">
## Investigating the Built-In Document Object

We can walk up the prototype chain by continuously calling <code>Object.getPrototypeOf</code>. __A bit ridiculous, but...__ &rarr;

<pre><code data-trim contenteditable>
Object.getPrototypeOf(document);
&gt; HTMLDocument
</code></pre>
<pre><code data-trim contenteditable>
Object.getPrototypeOf(document);
Object.getPrototypeOf(Object.getPrototypeOf(document));
&gt; Document
</code></pre>
<pre><code data-trim contenteditable>
Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(document)));
&gt; Node 
</code></pre>
<pre><code data-trim contenteditable>
Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(
Object.getPrototypeOf(document))));
&gt; EventTarget 
</code></pre>
<pre><code data-trim contenteditable>
Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(
Object.getPrototypeOf(Object.getPrototypeOf(document)))));
&gt; Object {}
</code></pre>
</section>

<section markdown="block">
## A Div Element

__Let's try doing the same with the first <code>div</code> element.__ &rarr;
<pre><code data-trim contenteditable>
// first, extract the div element
var ele = document.body.childNodes[1];
</code></pre>

__Then, calling Object.getPrototypeOf a few times, we get the following types.__ &rarr;

* HTMLDivElement
* HTMLElement
* Element
* Node
{:.fragment}
</section>

<section markdown="block">
## Node Objects

__So... it looks like _every_ object we've seen so far inherits from [Node](https://developer.mozilla.org/en-US/docs/Web/API/Node).__ &rarr;

* we know that there are a few node types (in fact, because everything inherits from Node, we can check out the nodeType property). __What were a couple that we saw?__ &rarr;
* {:.fragment} element, text, comment (there are others)
* {:.fragment} each nodeType is represented by a class that _ultimately_ descends from Node
* {:.fragment} we'll mostly encounter two node types, elements and text, which are represented by the following objects
	* {:.fragment} [<code>HTMLElement</code>](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) which descends from [<code>Element</code>](https://developer.mozilla.org/en-US/docs/Web/API/Element) 
	* {:.fragment} [<code>Text</code>](https://developer.mozilla.org/en-US/docs/Web/API/Text) which descends from [<code>CharacterData</code>](https://developer.mozilla.org/en-US/docs/Web/API/CharacterData)

<br>
[Check out this (slightly out-of-date -- Attr will no longer descend from Node) class diagram](http://web.stanford.edu/class/cs98si/slides/the-document-object-model.html)
{:.fragment}
</section>

<section markdown="block">
## Event Target?

So... does Node inherit from anything?

__YES__

* it inherits from [EventTarget](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)
* EventTarget is an interface implemented by objects that can receive / listen for events
* we'll see listening for events later
	* document loaded
	* click
	* ...[and many others](https://developer.mozilla.org/en-US/docs/Web/Events)

</section>

<section markdown="block">
## Some Examples...

Things can get convoluted quickly as many objects also implement multiple interfaces, which is why <code>getPrototypeOf</code>, <code>instanceof</code>, and <code>constructor.name</code> come in handy.

__Let's see what we can do with all of those.__

<pre><code data-trim contenteditable>
var p = content.getElementsByTagName('p')[1];
p.constructor.name;
p instanceof HTMLParagraphElement
p instanceof HTMLDivElement
p instanceof Text
p instanceof Element
</code></pre>
</section>

<section markdown="block">
## Finding Elements

Great... so back to the original problem. __How do we find elements directly__? &rarr;

* __<code>document.getElementById</code>__ - returns node with specified id attribute
* __<code>someNode.getElementsByClassName</code>__ - returns nodes with specified class attribute; searches only within element called on
* __<code>someNode.getElementsByTagName</code>__ - returns nodes with specified tag name ; searches within element that it was was called on 
{:.fragment}
</section>

<section markdown="block">
# Finding, Reading and Modifying Elements
</section>

<section markdown="block">
## _Finding_ Elements

__Using following code...__  &rarr;

<pre><code class="html" data-trim contenteditable>
&lt;body&gt;
&lt;style&gt;#three {color:red;}&lt;/style&gt;
&lt;div id="content"&gt;
    &lt;p&gt;One&lt;/p&gt;
    &lt;p class="cta"&gt;Two&lt;/p&gt;
    &lt;p class="cta" id="three"&gt;Three&lt;/p&gt;
&lt;/div&gt;
&lt;/body&gt;
</code></pre>

* find the first <code>div</code> element, with id="content"
	* {:.fragment} <code>document.getElementById('content')</code>
* {:.fragment} find the first <code>p</code> (paragraph) in the first <code>div</code> element 
	* {:.fragment} <code>document.getElementById('content').childNodes[0]</code>
* {:.fragment} ...the _actual_ text in the first paragraph from above ("One")
	* {:.fragment} <code>document.getElementsByTagName('p')[0].firstChild</code>
* {:.fragment} ...only the <code>p</code> (paragraph) tags that have a class="cta" in the first <code>div</code> element 
	* {:.fragment} <code>div.getElementsByClassName('cta')</code>
</section>

<section markdown="block">
## Modifying the DOM

__Nodes__ have a few methods for adding/removing child nodes.

* [<code>.removeChild(childNodeToRemove)</code>](https://developer.mozilla.org/en-US/docs/Web/API/Node.removeChild) - removes a child node from the DOM and returns it
	* returns removed node
	* node still exists in memory, but is no longer in DOM tree
* [<code>.appendChild(nodeToAppend)</code>](https://developer.mozilla.org/en-US/docs/Web/API/Node.appendChild) - puts node at end of list of this node's child nodes
	* returns appended node
* [<code>.insertBefore(nodeToInsert, beforeThisNode)</code>](https://developer.mozilla.org/en-US/docs/Web/API/Node.insertBefore) - inserts node before the node given as child of current node
	* returns the inserted node
* [<code>.replaceChild(nodeToInsert, nodeToReplace)</code>](https://developer.mozilla.org/en-US/docs/Web/API/Node.replaceChild) - replaces a child of the current node with the nodeToInsert
	* returns the replaced node
</section>

<section markdown="block">
## Swapping Paragraphs

Nodes can only exist in one place at a time... so if you take an existing node and pass it to insertBefore, the node will be moved. 

__Using the same markup as before, move the 3rd paragraph between the first two.__ &rarr;

<pre><code data-trim contenteditable>
content.insertBefore(paragraphs[2], paragraphs[1]);
</code></pre>
{:.fragment}

__Now, instead of just inserting before, let's replace paragraph "Two" with paragraph "Three":__ &rarr;
{:.fragment}

<pre><code data-trim contenteditable>
content.replaceChild(paragraphs[2], paragraphs[1]);
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## _Live_ Data Structures

Back to our favorite fragment. __How do I remove every paragraph element from this div?__ &rarr;
<pre><code data-trim contenteditable>
&lt;style&gt;#three {color:red;}&lt;/style&gt;
&lt;div id="content"&gt;
    &lt;p&gt;One&lt;/p&gt;
    &lt;p class="cta"&gt;Two&lt;/p&gt;
    &lt;p class="cta" id="three"&gt;Three&lt;/p&gt;
&lt;/div&gt;
</code></pre>
<pre><code data-trim contenteditable>
var div = document.getElementById('content');
var p = div.getElementsByTagName('p');

for(var i = 0; i < p.length; i++) {
	div.removeChild(p[i]);
}
</code></pre>
{:.fragment}

__Hey wait... what?__ &rarr;
{:.fragment}
</section>

<section markdown="block">
## _Live_ Data Structures Continued

The elements returned by the methods and properties that we've seen are __live__. That is, they change as the document changes in real time!

__Let's add one line to see what's actually going on.__ &rarr;

<pre><code data-trim contenteditable>

var div = document.getElementById('content');
var p = div.getElementsByTagName('p');

for(var i = 0; i < p.length; i++) {
	// watch the length decrease
	console.log(i, "length", p.length);
	div.removeChild(p[i]);
}
</code></pre>
</section>

<section markdown="block">
## I Fear Change

__What are some ways to work around this so that we can delete the list of elements?__ &rarr;

* start from the end of the Array
* a while loop:
	* as long as the parent has a firstChild
	* remove that firstChild from the DOM
{:.fragment}

<pre><code data-trim contenteditable>
while (div.firstChild) {
  div.removeChild(div.firstChild);
}
</code></pre>
{:.fragment}

</section>

<section markdown="block">
## Aaand, a Tricky Way

__Take a snapshot__ &rarr;

* putting together a bunch of things we learned from a while ago
* slice to make a copy 
	* but a nodeList and HTMLCollection aren't really Arrays, so (???)
	* use call to execute an Array's slice on our list of elements (!?)
	* slice copies objects by reference
{:.fragment}

<pre><code data-trim contenteditable>
// make a copy
var copy = Array.prototype.slice.call(p, 0)

// remove without having to worry about the list 
// shrinking while you iterate

copy.forEach(function(ele) {
	div.removeChild(ele)
});
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Reading and Modifying a Node's Content


The following __Node__ property and methods allow you to read and / or modify that Node's content:

[nodeValue](https://developer.mozilla.org/en-US/docs/Web/API/Node.nodeValue) - represents content of text and comment nodes, null otherwise

<pre><code data-trim contenteditable>
// assuming we have an element_node, and we know its first child is a text element
console.log(node.firstChild.nodeValue);
node.firstChild.nodeValue = 'new text';
</code></pre>

[textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node.textContent) - the text content of the node and all of its descendants (!)

<pre><code data-trim contenteditable>
var text = element.textContent; 
element.textContent = "this is some sample text";
</code></pre>

There are other properties similar to <code>textContent</code>, such as <code>innerHTML</code> (which includes markup) and <code>innerText</code> which is aware of styling (for example, ignores hidden elements).
</section>

<section markdown="block">
## Node Content Continued

__What do the following lines of code represent / do based on the markup below?__ &rarr;
<pre><code data-trim contenteditable>
&lt;style&gt;#three {color:red;}&lt;/style&gt;
&lt;div id="content"&gt;
    &lt;p&gt;One&lt;/p&gt;
    &lt;p class="cta"&gt;Two&lt;/p&gt;
    &lt;p class="cta" id="three"&gt;Three&lt;/p&gt;
&lt;/div&gt;
</code></pre>

<pre><code data-trim contenteditable>
document.body.textContent
document.body.innerHTML
document.getElementsByTagName('p')[0].firstChild.nodeValue
document.getElementsByTagName('p')[0].firstChild.nodeValue = 'Surprised?'
document.getElementsByTagName('p')[0].textContent = 'Maybe not.'
</code></pre>
</section>
<section markdown="block">
## Creating Nodes


The following methods actually create new Nodes!

__Note... that they're called on the built-in <code>document</code> object, not on <code>Node</code> or an instance of <code>node</code>.__

* [<code>document.createTextNode(text)</code>](https://developer.mozilla.org/en-US/docs/Web/API/document.createTextNode)
* [<code>document.createElement(elementName)</code>](https://developer.mozilla.org/en-US/docs/Web/API/document.createElement)
</section>

<section markdown="block">
## Replacing All Paragraphs With Text

Replace each paragraph element with text that says "this was a paragraph".
<pre><code data-trim contenteditable>
&lt;div id="content"&gt;
    &lt;p&gt;One&lt;/p&gt;
    &lt;p class="cta"&gt;Two&lt;/p&gt;
    &lt;p class="cta" id="three"&gt;Three&lt;/p&gt;
&lt;/div&gt;
</code></pre>

<pre><code data-trim contenteditable>
var div = document.getElementById('content');
var p = div.getElementsByTagName('p');

for(var i = p.length - 1; i >= 0; i--) {
	div.replaceChild( 
		document.createTextNode("this was a paragraph"),
		p[i]);
}
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Now Let's Try Adding Some Elements

__Instead of just a text node, replace each paragraph with an <code>h1</code> (a header). The text should remain the same.__ &rarr;

<pre><code data-trim contenteditable>
var div = document.getElementById('content');
var p = div.getElementsByTagName('p');

for(var i = p.length - 1; i >= 0; i--) {
	var header = document.createElement("h1");
	var content = document.createTextNode(p[i].textContent);
	header.appendChild(content);
	div.replaceChild(header, p[i]);
}
</code></pre>
</section>

<section markdown="block">
## Convenience

Creating each element and adding a child was a bit of a drag...

__The book uses a convenience method to add an element and an arbitrary number of child elements.__

It acts like this: <code>elt(type, [, child1, ..., child2);</code> &rarr; 

* creates an element of type <code>type</code> 
* an optional list of Elements follows
* each element will be added as a child
* if the element is just a string, create and add a text node
* <code>elt('div', 'hi', elt('h2', 'hello'), elt('p', 'how are you?'))</code>
* ... creates a div, with 'hi',  an h2, and a p nested within it

<br>
__How would we create this?__ &rarr;

</section>

<section markdown="block">
## elt Implementation

__A potential implementation...__ &rarr;

* uses the arguments object 
* checks typeof to determine whether or not to create a text node
<pre><code data-trim contenteditable>
function elt(type) {
	var ele = document.createElement(type);
	// start at 1 or else we'll get the type argument!
	for (var i = 1; i < arguments.length; i++) {
		var child = arguments[i];
		if (typeof child === "string") {
			child = document.createTextNode(child);
		}
		ele.appendChild(child);
	}
	return ele;
}
var ul = elt('ul', elt('li', 'item one'), elt('li', 'item two'));
document.body.appendChild(ul);
</code></pre>
</section>

<section markdown="block">
## Accessing Element Attributes

Some elements have accessible attributes, such as the <code>href</code> of an anchor tag or the <code>src</code> of an image (an [HTMLImageElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement)).

__Let's change the image of a jackfruit in the following markup.__ &rarr;

<pre><code data-trim contenteditable>
&lt;body&gt;
.
.
&lt;img src="https://openclipart.org/image/400px/svg_to_png/203184/jackfruit_monsterbrain.png"&gt;
&lt;/body&gt;
</code></pre>

<pre><code data-trim contenteditable>
document.getElementsByTagName('img')[0].src = 
'https://openclipart.org/image/400px/svg_to_png/194496/Clipart-Search-2.3-Android-App-Released.png';
</code></pre>
{:.fragment}
</section>
