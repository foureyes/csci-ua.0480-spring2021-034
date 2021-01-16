---
layout: slides
title: "Modifying and Creating Elements"
---

<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## Modifying the DOM

__What were some methods that we could use to add or get rid of elements from the DOM__ &rarr;

* {:.fragment} [<code>.removeChild(childNodeToRemove)</code>](https://developer.mozilla.org/en-US/docs/Web/API/Node.removeChild) - removes a child node from the DOM and returns it (node still exists in memory, but is no longer in DOM tree)
* {:.fragment} [<code>.appendChild(nodeToAppend)</code>](https://developer.mozilla.org/en-US/docs/Web/API/Node.appendChild) - puts node at end of list of this node's child nodes and returns the appended node
* {:.fragment} [<code>.insertBefore(nodeToInsert, beforeThisNode)</code>](https://developer.mozilla.org/en-US/docs/Web/API/Node.insertBefore) - inserts node before the node given as child of current node and returns the inserted node
* {:.fragment} [<code>.replaceChild(nodeToInsert, nodeToReplace)</code>](https://developer.mozilla.org/en-US/docs/Web/API/Node.replaceChild) - replaces a child of the current node with the nodeToInsert and returns the __replaced node__
</section>

<section markdown="block">
## Swapping Paragraphs

We didn't have a chance to try this previously... so let's check out [another sample page](../../code/class19.html).
 Starting with:

<pre><code data-trim contenteditable>
const content = document.getElementById('content');
const paragraphs = document.getElementsByTagName('p');
</code></pre>

__Move the 3rd paragraph between the first two.__ &rarr;

<pre><code data-trim contenteditable>
const inserted = content.insertBefore(paragraphs[2], paragraphs[1]);
</code></pre>
{:.fragment}

__Now, instead of just inserting before, let's replace paragraph "Two" with paragraph "Three":__ &rarr;
{:.fragment}

<pre><code data-trim contenteditable>
const replaced = content.replaceChild(paragraphs[2], paragraphs[1]);
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Removing Elements

We also looked at removing elements with __removeChild__. This was our first attempt:

<pre><code data-trim contenteditable>
const div = document.getElementById('content');
const p = div.getElementsByTagName('p');

for(let i = 0; i < p.length; i++) {
	div.removeChild(p[i]);
}
</code></pre>

But... __what happened?__ &rarr;

There was an element left over because we were editing a _live_ data structure. __How did we fix this?__ &rarr;
{:.fragment}
</section>

<section markdown="block">
## Removing Elements Continued

To get around this issue, we could:

* work backwards
* use a while loop

<pre><code data-trim contenteditable>
while (div.firstChild) {
  div.removeChild(div.firstChild);
}
</code></pre>

* use a copy... 

<pre><code data-trim contenteditable>
const copy = Array.prototype.slice.call(p, 0)
copy.forEach(function(ele) {
	div.removeChild(ele)
});
</code></pre>
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

[textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node.textContent) - the __text content__ of the node and all of its descendants (!)

<pre><code data-trim contenteditable>
const text = element.textContent; 
element.textContent = "this is some sample text";
</code></pre>

There are other properties similar to <code>textContent</code>, such as <code>innerHTML</code> (which includes markup) and <code>innerText</code> which is aware of styling (for example, ignores hidden elements).
</section>

<section markdown="block">
## Node Content Continued

__What do the following lines of code represent / do based on the markup below?__ &rarr;
<pre><code data-trim contenteditable>
&lt;div id="content"&gt;
	&lt;p&gt;One&lt;/p&gt;
	&lt;p class="cta"&gt;Two&lt;/p&gt;
	&lt;p class="cta"&gt;Three&lt;/p&gt;
&lt;/div&gt;
</code></pre>

<pre><code data-trim contenteditable>
document.body.textContent
document.body.innerHTML
document.body.nodeValue
const p = document.getElementsByTagName('p')[0]
p.firstChild.nodeValue
p.firstChild.nodeValue = 'Surprised?'
p.textContent = 'Maybe not.'
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
	&lt;p class="cta"&gt;Three&lt;/p&gt;
&lt;/div&gt;
</code></pre>

<pre><code data-trim contenteditable>
const div = document.getElementById('content');
const p = div.getElementsByTagName('p');

for(let i = p.length - 1; i >= 0; i--) {
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

* in a  loop...
* create an h1 element node and a text node
* add the text node to the h1
* replace the div

<pre><code data-trim contenteditable>
const div = document.getElementById('content');
const p = div.getElementsByTagName('p');

for(let i = p.length - 1; i >= 0; i--) {
	const header = document.createElement("h1");
	const content = document.createTextNode(p[i].textContent);
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

__How would we create this?__ &rarr;

</section>

<section markdown="block">
## elt Implementation

__A potential implementation...__ &rarr;

* uses the arguments object 
* checks typeof to determine whether or not to create a text node

<pre><code data-trim contenteditable>
function elt(type) {
	const ele = document.createElement(type);
	// start at 1 or else we'll get the type argument!
	for (let i = 1; i < arguments.length; i++) {
		let child = arguments[i];
		if (typeof child === "string") {
			child = document.createTextNode(child);
		}
		ele.appendChild(child);
	}
	return ele;
}
const ul = elt('ul', elt('li', 'item one'), elt('li', 'item two'));
document.body.appendChild(ul);
</code></pre>
</section>
