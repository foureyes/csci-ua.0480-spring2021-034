---
layout: slides
title: "Back to HTML Elements, Attributes"
---
<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## Element Attributes

__What's an attribute again? What are some examples of attributes?__ &rarr;

* it's additional information about the element
* it's written as a name/value pair within an opening tag: <code>&lt;element attributeName="attributeValue"&gt;</code>
* some examples include the <code>type</code> in <code>input elements</code>, the <code>src</code> in an <code>img</code> tag
{:.fragment}
</section>

<section markdown="block">
## Changing Attributes

Most attributes can be accessed as properties on that particular element's object. The property name is usually just the camel-case name of the attribute.

__Try writing a tiny script that takes all of the images on a page and changes the src of those images to [the look of disapproval](https://foureyes.github.io/csci-ua.0480-fall2017-007/resources/img/disapproval.png)__ &rarr;

<pre><code data-trim contenteditable>
const images = document.getElementsByTagName('img');

for (let i=0; i < images.length; i++) {
	images[i].src = "http://foureyes.github.io/csci-ua.0480-fall2017-007/resources/img/disapproval.png";;
}
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Any Attribute!

__HTML actually lets you create your own attributes... so you can add any attribute you'd like to elements.__ &rarr;

* generally, custom attributes are prefixed with data (you'll see this in many frameworks, such as Angular.js)
* data-\* attributes allow you to store extra information on standard, semantic HTML elements 
* ([see the using data attributes article on mdn](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_data_attributes))
* for example: <code>&lt;p data-highlight&gt;</code>
</section>

<section markdown="block">
## Getting and Setting Attributes

The following methods can be called on elements in order to read or set attributes:

* __[<code>element.getAttribute(name)</code>](https://developer.mozilla.org/en-US/docs/Web/API/Element.getAttribute)__ - gives back value of attribute with specified name; if it doesn't exist, depending on implementation, you'll get back null or empty string
* __[<code>element.setAttribute(name, value)</code>](https://developer.mozilla.org/en-US/docs/Web/API/element.setAttribute)__ - changes attribute with specified name to specified value; if attribute doesn't exist, create it with that value
* __[<code>element.hasAttribute(name)</code>](https://developer.mozilla.org/en-US/docs/Web/API/Element.hasAttribute)__ - returns true if attribute exists in element, false otherwise

</section>
<section markdown="block">
## Attribute Related Methods Continued

You could use these methods on both standard element attributes, such as <code>href</code>, <code>value</code>, etc. ... but they're also useful for custom attributes

__Let's try these out on our [sample page](../../code/class18.html)__ &rarr;

<pre><code data-trim contenteditable>
// change an image's src (similar to just using the attribute)
document.getElementsByTagName('img')[0].setAttribute('src', 'http://foureyes.github.io/csci-ua.0480-fall2017-007/resources/img/disapproval.png')

// check for a class attribute... and try to read it
document.getElementById('content').hasAttribute('class')
document.getElementById('content').getAttribute('class')

// set it
document.getElementById('content').setAttribute('class', 'highlight');

// check again, and read it
document.getElementById('content').hasAttribute('class')
document.getElementById('content').getAttribute('class')
</code></pre>

</section>
<section markdown="block">
## Data-\* as JavaScript Hooks

We can use __data-\*__ attributes as hooks for our JavaScript.

__Create a script that substitues all of the periods with 5 exclamation points in the [sample page](../../code/class18.html). Only do this for paragraph elements that have a <code>data-shout</code> attribute.__

You can use the string's replace method and a regular expression to do this: <code>replace(/\./g, '!!!!!')</code>

* <code>/</code>'s mean regular expression
* \\. is match period
* the g after the regex delimiters mean find all matches instead of just the first (_global_)
</section>

<section markdown="block">
## A Potential Solution

Using a __data-\*__ attribute...

<pre><code data-trim contenteditable>
const paragraphs = document.getElementsByTagName('p');
for (let i = 0; i < paragraphs.length; i++) {
	if (paragraphs[i].hasAttribute('data-shout')) {
		paragraphs[i].textContent = paragraphs[i].textContent.replace(/\./g, '!!!!!');
	}
}
</code></pre>
</section>

