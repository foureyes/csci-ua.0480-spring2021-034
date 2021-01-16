---
layout: slides
title: "HTML Primer, JavaScript and the Browser"
---
<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>
<section markdown="block">
## JavaScript, HTML, the Browser and _You_

In this set of slides, we'll briefly discuss:

* HTML
* browsers and how they render HTML
* using JavaScript on the client side
</section>

<section markdown="block">
## HTML

Hey... so remember when we talked about the internet, the web, interconnected documents and hyper-text?

__HTML__ is the language that describes the __structure__ and __semantic content__ of a document on the web; it consists of:

* __content__ (just plain text)
* and elements (tags) that give structure to the __text__

<br>
Content and structure aren't the whole story when viewing a web page, though. __What pieces are missing (let's see)?__ &rarr;

* style (presentation)
* interactivity 
</section>

<section markdown="block" data-background="#440000">
# HTML is for content and structure

</section>

<section markdown="block">
## HTML is a _Mark Up_ Language

__HTML__ stands for Hyper-Text Markup Language. We get the Hyper-Text part. 

__What about the markup part?__ &rarr;

* a markup language is a method of annotating text...
	* where the markup itself is syntactically distinguishable from the content
	* markup is applied to text by using _tags_
* HTML is generally not considered a language in the _programming_ language sense

</section>

<section markdown="block">
## Elements and Tags

An __element__ a single part of an HTML document; it encompasses both structure and (optionally) content: a paragraph, the head of the document, etc. 

* an element is made up of __tags__ and, optionally, text: <code>&lt;p&gt;Some Content&lt;/p&gt;</code>
* __tags__ are used to mark the start and end of an HTML element: <code>&lt;p&gt; ... &lt;/p&gt;</code>
* an __opening tag__ is an element's name surrounded by angle brackets: <code>&lt;p&gt;</code>
* an __closing tag__ is an element's name prefixed with a forward slash and surrounded by angle brackets: <code>&lt;/p&gt;</code>
</section>

<section markdown="block">
## Tags Continued

There are a few ways that __tags__ and content can be combined to create __elements__. __What are they?__ &rarr;

* {:.fragment} an open and close tag surrounding content: <code>&lt;h1&gt;The Busy Birder&lt;/h1&gt;</code>
* {:.fragment} an open and close tag without content: <code>&lt;script src="main.js"&gt;&lt;script&gt;</code>
* {:.fragment} only an open tag <code>&lt;img src="logo.png"&gt;</code>

</section>

<section markdown="block">
## Attributes

An __opening tag__ can contain __attributes__. __In the context of HTML, what's an attribute?__ &rarr;

* {:.fragment} an __attribute__ is part of a tag that provides additional information about an element
* {:.fragment} it's composed of a name/value pair joined by an equal sign
* {:.fragment} it's is placed after the name of the element in a tag, but before the last angle bracket: <code>&lt;img src="logo.png"&gt;</code>
* {:.fragment} the value doesn't have to be quoted, but it's good practice to do so... to avoid issues like this:<code>&lt;input type=text value=what is this&gt;</code>
</section>

<section markdown="block">
## A Quick Diagram

__Name the parts of this markup__ &rarr;

<pre><code data-trim contenteditable>
&lt;a href="www.nyu.edu&gt;NYu&lt;/a&gt;
</code></pre>

<pre><code data-trim contenteditable>
<!--             element
                    |
     +--------------+-----------+
     |                          | 
    &lt;a href="www.nyu.edu"&gt;NYU&lt;/a&gt;
     |     |                    |
     |   attribute              |
start tag                    end tag
-->
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Special Characters

__What if you want your content to contain a literal less than sign... or some other special character?__ &rarr;

Use an __HTML entity__. An __entity__ is a sequence of characters that represent a special characters that is not readily available on most keybaords... such as the less-than sign, an ampersand, a space:
{:.fragment}

* {:.fragment} HTML entities start with an ampersand, followed by a name, and end with a semicolon
* {:.fragment} for example, <code>&amp;lt;</code> is <code>&lt;</code> and <code>&amp;amp;</code> is an <code>&amp;</code>
* {:.fragment} a [list of HTML entities](http://dev.w3.org/html5/html-author/charref)
</section>

<section markdown="block">
## Some Commonly Used HTML Entities:

<pre><code data-trim contenteditable>
&amp;amp; ... ampersand (&amp;)
&amp;nbsp; ... non breaking space (&nbsp;)
&amp;lt; ... less than (&lt;)
&amp;gt; ... greater than (&gt;)
&amp;quot; ... double quotes (&quot;)
&amp;apos; ... single quote (&apos;)
</code></pre>
</section>

<section markdown="block">
## We're Using _Modern_ HTML

HTML has evolved greatly since its inception in the early 90's. There are [multiple versions](http://en.wikipedia.org/wiki/HTML#HTML_versions_timeline) that have cropped up over time.

__We're using _modern HTML_.__

HTML is specified by two groups: WHATWG and W3C.
</section>

<section markdown="block">
## Modern HTML, Specifications

WHATWG and W3C work together to specify HTML

* WHATWG (Web Hypertext Application Technology Working Group) has a [living HTML standard](https://html.spec.whatwg.org/multipage/)
	* the standard is continuously evolving, as necessary
	* no version numbers
	* it is driven by _the community_; [everyone can contribute]()!
* W3C (World Wide Web Consortium) is basing the most recent versions of HTML on WHATWG's living standard
	* it snapshots versions 
	* the [latest specification is version 5 - HTML5](https://wiki.whatwg.org/wiki/FAQ#Is_participation_free.3F)
	* these version releases are a bit slower than WHATWG's

</section>
<section markdown="block">
## HTML5

In this class, we're using the most modern version of HTML that's currently supported by most browsers. We're using __HTML 5__.

__By the way, why do you think snapshots / versions are necessary? Why not just work off of the living standard?__ &rarr;

* {:.fragment} web browsers and developers need something stable to code against!
* {:.fragment} ensure operability among different browsers, such as desktop, and mobile browsers
</section>

<section markdown="block">
## So, What is HTML5, Exactly

__HTML5__ is the newest version of HTML, which includes new elements, attributes and behaviors. It introduces changes and features in:

* actual markup
* scripting APIs
* error handling / graceful degradation

</section>
<section markdown="block">
## HTML5 and Markup Improvements

HTML5 introduces elements and attributes that reflect typical components of modern web sites:

* adds new semantic elements, such as <code>video</code>, <code>nav</code>, etc.
* adds additional attributes, such as new input types - <code>number</code>, <code>range</code>, <code>date</code>, etc.
* removes purely presentational elements, such as <code>font</code> and <code>center</code>
* simplifies some markup, such as the introductory doctype line, which is now merely <code>&lt;!doctype html&gt;</code>
* (this doctype tells browsers to render the document based on a standards compliant mode)
</section>


<section markdown="block">
## HTML5 and New Scripting APIs

HTML5 also specifies new scripting APIs for JavaScript:

* canvas element for 2D drawing
* browser history management 
* offline web applications
* drag and drop support
* [and](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5) [others](http://en.wikipedia.org/wiki/HTML5#New_APIs)
</section>

<section markdown="block">
## A Reminder About Doctype

__To indicate that your page uses HTML5, use the following doctype declaration__:

<pre><code data-trim contenteditable>
&lt;!DOCTYPE html&gt;
</code></pre>

This doctype:

* this will force most browsers into standards mode
* ...even ones that don't support HTML5 
* which means that they'll handle the long established parts of HTML5
* but ignore the newer features gracefully
</section>

<section markdown="block">
## Rendering an HTML Page

__What are some steps that your browser must perform to get from a URL to a rendered page?__ &rarr;

* download the page (the _actual_ HTML)
* parse the HTML
* download any additional resources, such as scripts and CSS
* layout the page
* _paint_ the page onto the screen
* ...it's more complicated than this, of course 
* [check out this article on how Webkit (Safari and Chrome's rendering engine) and Gecko (the rendering engine for FireFox) work](http://taligarsiel.com/Projects/howbrowserswork1.htm#Main_flow_examples))
{:.fragment}
</section>

<section markdown="block">
## A Few Notes About Parsing HTML

When working through HTML, if the parser encounters JavaScript (whether inline, in the page or external): 

* it will stop parsing the HTML (dealing with scripts _blocks_ the HTML parsing process)
* it'll download the script (if applicable)
* ...then run the script
* and finally, go back to parsing the document


<br>
__Why do you think document parsing stops in order to run scripts?__ &rarr;

Some scripts will actually change elements on the page!
{:.fragment}
</section>
<section markdown="block">
## Fun with Malformed Markup

For each of the code snippets below, __guess what markup the browser actually uses (that is, how does it interpret the malformed markup)__ &rarr;

<pre><code data-trim contenteditable>
No tags surrounding me!
</code></pre>
{:.fragment}

<code>html</code>, <code>head</code>, and <code>body</code> tags are inserted
{:.fragment}

<pre><code data-trim contenteditable>
&lt;html&gt;
&lt;body&gt;
		Where's my close body?
&lt;/html&gt;
</code></pre>
{:.fragment}

<code>body</code> is automatically closed
{:.fragment}

<pre><code data-trim contenteditable>
&lt;html&gt;&lt;body&gt; Some nested forms....
	&lt;form method="POST"&gt;
	&lt;form method="GET"&gt;
	&lt;/form&gt;
&lt;/form&gt;
&lt;/body&gt; &lt;/html&gt;
</code></pre>
{:.fragment}

The second nested form element is removed.
{:.fragment}
</section>
<section markdown="block">
## Dealing with Bad Markup

Browsers are extremely forgiving when it comes to markup: 

* for example, Chrome allows the [errors listed in this article](http://taligarsiel.com/Projects/howbrowserswork1.htm#Browsers_error_tolerance) (some of which we saw in the previous slide).
* it may seem like these are arbitrary workarounds
* ...but the way that browsers deal with malformed markup is surprisingly consistent.
</section>

<section markdown="block">
## JavaScript on the Client Side

In order to use JavaScript on the client side, you can use script tags:

<pre><code data-trim contenteditable>
&lt;script src="main.js"&gt; &lt;/script&gt;
</code></pre>

Note that:

* in HTML5, you can omit the type attribute; text/javascript is assumed
* the <code>script</code> element requires a closing tag
</section>
<section markdown="block">
## Script Tags, JavaScript in Attributes

You can specify an external script by using the src attribute in the <code>script</code> tag

<pre><code data-trim contenteditable>
&lt;script src="main.js"&gt; &lt;/script&gt;
</code></pre>

Or you can write the script inline, within the script tags itself
<pre><code data-trim contenteditable>
&lt;script&gt; 
var x = 10;
alert(x);
&lt;/script&gt;
</code></pre>

And finally, you can have JavaScript in an element's attributes:

<pre><code data-trim contenteditable>
&lt;button onclick="alert('hello!');&gt;Say hello&lt;/button&gt;
</code></pre>
</section>
<section markdown="block">
## Best Practice for JavaScript on the Frontend

__Which of the methods in the previous slide:__
 
* external JavaScript file
* JavaScript between script tags
* JavaScript as an element's  attribute

<br>
__do you think is the recommended method for integrating JavaScript code and why?__ &rarr;

</section>
<section markdown="block">
## Using External JavaScript

The most commonly accepted best practice for integrating JavaScript is using external JavaScript files. __This is because external JavaScript files__ &rarr;

* {:.fragment} helps separate content and style from functionality
* {:.fragment} encourage code reuse
* {:.fragment} allows for caching of often used code resources

<br>
What may be some reasons to use inline JavaScript (JavaScript code embedded directly into a page using script tags or as HTML attributes).
{:.fragment}

* {:.fragment} simplicity of development / faster prototyping
* {:.fragment} reduce the total number of requests made 
</section>

<section markdown="block">
## Where to Include JavaScript?

Ok, so we know we what external JavaScript files, __but where do we put the actual script tags? In the head? The body? In either case, at the top, bottom or middle? Why?__ &rarr;

We'll generally include JavaScript at the bottom of the body tag.
{:.fragment}

* this prevents the inclusion of scripts from blocking the parsing of the page 
* (which in turn, allows most of the page to be rendered before the parser encounters the script tags)
{:.fragment}
</section>


<section markdown="block">
## Reducing Page Load Time

__What are some other things that we can do with our external JavaScript to make our page load more quickly?__ &rarr;

* {:.fragment} minimize our external JavaScript
* {:.fragment} compress our external JavaScript
* {:.fragment} lastly, script tags in HTML5 may have:
	* {:.fragment} an __async__ attribute which signals to the browser that the script does not have to be blocking; it can be downloaded asynchronously
	* {:.fragment} a __defer__ attribute - tells the browser that the script can be downloaded and run after the page has been parsed

<pre><code data-trim contenteditable>
&lt;script defer async src="main.js"&gt; &lt;/script&gt;
</code></pre>
{:.fragment}

</section>

<section markdown="block">
## JavaScript and the Browser

As we've discussed in the past, JavaScript is based on a standard called [ECMAScript](http://www.ecma-international.org/ecma-262/5.1/)

* {:.fragment} as of 2012, __all modern browsers fully support ECMAScript 5__
* {:.fragment} many browsers already support the __majority of features of ECMAScript 6__ (ES6, ES2015, etc.) ... like:
	* {:.fragment} additions to the standard library (for example, adding  Array methods like find() and fill())
	* {:.fragment} new objects, such as Set and Map
    * {:.fragment} syntactic sugar (for example class style definitions for inheritance, _fat arrow_ anonymous functions)
	* {:.fragment} default parameters for functions (like Python keyword arguments)
	* {:.fragment} [and others](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla)
* {:.fragment} older browsers support at least ECMAScript 3  
</section>

<section markdown="block">
## What Does ECMAScript Define?

* the language's type system (Number, String, etc.)
* language syntax (parsing rules, keywords, control flow)
* error handling mechanisms (throw, try/catch) 
* built in objects / standard library (Array methods, JSON object, etc.)
* strict mode

</section>

<section markdown="block">
## You're Lucky

Consider yourself lucky to be developing for the web at a time when __browsers conforming to standards__ has become the __norm__.

* while there are still differences between browsers and how they render pages
* it is much more pleasant to develop for the front-end on the web today than it was than just a few years ago
* (well, with the exception of JavaScript fatigue)
* the latest versions of most mainstream browsers behave surprisingly uniformly
{:.fragment}
</section>
