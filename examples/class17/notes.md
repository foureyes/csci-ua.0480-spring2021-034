* javascript running on the server...
	* node
	* express
	* built-in
		* module.exports
		* process (process.env)
		* console (console.log)
		* require.... net, fs, etc.
* js on the client
	* runs in the browser
	* on the website user's computer
	* built-in object deal with documents and the browser
		* instead of global: window <--- browser window
		* document <--- the html document that you're viewing
* html
	* language... mark-up language 
		* mark-up - describe content
		* annotating text
		* unstructured text.... you're adding some structure or meta data
	    * it's clear what the content is vs what the meta data is
		* other examples of mark-up language: xml, tex/latex, pdf, svg
	* it really doesn't have anything to do with style
		* (only structure)
	* style / interactivity: css and js

elements
<tag>content </tag>

 element
------------------------
|                      |
<a href='bar.baz'>foo</a>
|     |                | end tag
|    attribute
|
start tag

attribute: name / (optional) value pairs ..... that are within the start tag

html5

<!doctype html>
* process the html
* when it encounters javascript
* blocks.... downloads the js, and then executes
	* perhaps the js... is required to render the page


client side:

embedded in a script tag
<script>
const foo = 'bar';
</script>

separated by location

external js
<script src="foo.js"></script>
<script src="bar.js"></script>
<script src="baz.js"></script>

inline with a start tag
<a onlclick="foo()"></a>
no separation: bad for working together
logically consistent



1. make all js external
2. move all js to the bottom of the page

downloading js to local machine <---- caching

1. use a cdn (content delivery network)
	* other sites may use the same cdn, so resources are cached
	* cdn s usually have a global network of servers.... so
	* ... there's going to be one geographically closer to the client
2. post processing of resources
	* concatenate
	* compress
	* for images.... move all images into a single image (usually for icons)
		* when displayed, only show cropped
		* (sprites)

script tag includes:

async - non blocking
defer - wait 'til the end

DOM - Document Object Model

standardized api that's platform agnostic that represents an html document
what is the programmer's interface to these objects
* fully object oriented api
* where objects represent the html document and its parts
	* `document` - that represents the actual document
	* `node`
	* `HTMLElement`
	* `DivElement`
the actual api (the implementation of it):
the DOM API + some language's implementation

on the client side, the DOM is implemented by client side js

there's a node object

* element
* text
* comment
* cdata
* etc.
type of a node?

* parentNode
* childNodes <--- collection of elements (not an Array) ... so you can index
no slice, forEach, etc.
* nextSibling
* previousSbiling
* someObject.nodeType
* someObject.nodeValue
	* TEXT_NODE ... are the only node type that have a value (which is writable)

all elements

* class  <--- its value can be shared through the document
* id <-- only one element can have an id with a particular value
* this is not enforced by the browser

id and classes are usually used for hooks for styling and interactivity
(css and js)

finding elements
document.getElementById
document.getElementsByClassName
document.getElementsByTagName

modify elements
* get the text node (usually by using childNodes) and set its nodeValue property
* add arbitrary attributes to an element by . and using the attribute name
	* to add an href ... someElement.href = 'http://whatever.com'
		* id
		* src
		* href
	* some attributes have reserved words as names:
		* class -> .className



* median - 80, average slightly lower
* bump the score 2 or 3 .... low b high b-
* homeworks 2 and 3 are out
* so all quizzes and release hw will be midterm grade
* for the final ... if you score significantly (10%)
	* shift over: 30 and 35
	* minimally... I'll shift 15: 15 and 50
























































