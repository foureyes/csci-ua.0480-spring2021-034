* x javascript
* x js on the server
* js on the client (in the browser)


coded stuff on a server

all of the modules and built-in objects are more about server side concerns

* process
* console
* bring in modules
	* net
	* fs

^^^ common server side libraries to accomplish certain tasks

js on the browser

* your code runs on someone else's computer (the client)
* front-end development (vs server-side)

the web....
http - protocol
documents/resources.... html

html:
markup language
	* describe the content
	* annotating text
	* examples: xml, yaml, markdown, tex, pdf, svg
	* it's unambiguous what is content vs what is meta data / structure

html: provides structure and metadata to your document
css, js: style/presentation and interactively respectively

HTML IS FOR STRUCTURE (not for style)


* em
* strong

html is a markup ... a markup languague distinguishes between content and metadata


elements
p
a
body
html

elements are compose of tags of the same name that may or may not have content

 the element
+---------------------------------+
|                                 |
<a href="foo.bar">this is a link</a>
|   |                            | end tag
|   |
|   attribute and its value
start tag

special characters that have some meaning for html:
a non-breaking space
angle brackets

^^^^ you can't use literal notation... >
html entity
&nbsp;
&gt;
&20; <--- unicode code point

go through the html (parse it)
but if sees script tag:
	* stop parsing html
	* immediately download js
	* and run it

1. js embedded in page through script tags

```
<body>
<p></p>
<script>
const foo = 'bar'
</script>
```
2. js is in external file... included by <script>

```
<script src="/js/foo.js"></script>
```

3. inline within a tag

<a href="/foo/bar" onclick="baz()"></a>



1. when embedding code in page:
	* code and your markup is mixed together
	* no longer have good separation
		* having different roles will be tricky
		* or you may have conflicts
		* bad for separating presentation and behavior
	* no extra requests - good for perceived page load speed
	* easy to write embedded - good for prototyping
2. external script tags
	* number of requests go up
	* good for having your code and markup in separate places
3. inline js ... <a onlick="">
	* your code is actually intertwined with markup
		* bad... if you change presentation, behavior may change as well!?
		* good??? ... all of the "component" is in a single place
			* easy to find code; easy to find markup / css
			* if it's bundled you could reuse that component

1. all js is external
2. include it using script tag
3. include at the bottom

at the bottom... the page has the opportunity to be rendered first
* perception is: page loads faster

ensures that page is present before you modify w/ javascript

script tag has these attributes:

* async - javascript will be run in parallel with parsing of page (instead of blocking)
* defer - javascript will be run at end


what runs javascript

* on the server, you could use node to run javascript
* on the browser, whatever engine is used... chrome v8, mozilla - spidermonkey
* curl does not have javascript engine
* nc ^^^^ same
* headless browsing 
	* headless chrome




<script src="foo.js">
<script src="bar.js">
<script src="baz.js">

* reduce page load time:
	* concatenation of files
	* process to minify javascript before delivery
	* browser will cache resources if it's the same resource
		* cdn - content delivery network
		* if you've already another site that uses same cdn for same resource
			* ... that resource can be retrieved from cache

Document Object Model DOM

* standardized platform agnostic api - for working with and manipulating html documents
* fully object oriented
* objects reprsent differents parts of the page
* represents html document as a tree
* it has object to represent:
	* the actual document `document`
	* node
	* elementnode
	* htmlelement
	* divelement
	* imgelement
	* these are related to each other.... inheritance hierarchy

<html>
<head>
<script>
</head>
<body>
</body>
</html>

everything's a node

different node types:

* element
* text
* comment
* there are others...

access to the dom is mediated by `document`

someNode.nodeType .... numeric value that maps to constant on document

someNode.parentNode
someNode.parentNodes (NodeList)
someNode.nextSibling 
someNode.previousSibling 

id <---- value that can only occur once in document
class <--- can be shared by elements in doc

final project

* express + mongodb (another db and/or framework is ok, permission tho)
	* adheres to some technical specs
* somewhat _original_ (not taken from tutorial or previous homework)... your own code

not taken into account for your grade

* practicality of idea / how good it is?
* aesthetics




























































































































































































