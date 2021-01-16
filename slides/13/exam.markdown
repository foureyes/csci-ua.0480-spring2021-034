---
layout: slides
title: "About the Exam, Review"
---
<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## First...

This goes without saying, but __please prepare adquately for the exam__:

* it's definitely not super _difficult_ 
* but it's also not _easy_

<br> 

If you're a graduating senior... or if you're a major that __needs__ a particular grade in this elective, __you know what you have to do!__

* I've had issues in the past regarding both situations!
* don't be that person

<br> 

Ask me any questions if you have any concerns - in class or via email. For office hours today, I'll be around at 3:15 instead for of 12:30 due to committee meeting.


</section>
<section markdown="block">
## Exam Details

* __4/10__

* in this room, {{ site.vars.course_room }}
* during regular class time (11:00-12:15am)
* please come on time to get full amount of time for exam
* pen/pencil and paper, no laptops
* some notes will be provided (just a list of String, Array, Request and Response methods and properties)
</section>

<section markdown="block">
# Topics

</section>
<section markdown="block">
## Sources 

The material for the exam will come from:

* slides (1 - 12)
* homework (1 - 5)
* {{ site.vars.book_js }} (1 through 5, 6, 8, 13, 17 up to browsers and http, and 20 up to streams)

<br>
(of course, see the sample questions to get an idea of the types of questions on the exam)
</section>

<section markdown="block">
## Some More Details on Slides

* slides from classes 1 through 12 will be on the exam
* exceptions (these will __not__ be on the exam):
	* Static Sites, Remote Server (using ssh, scp, etc.)
	* Forms Revisted (using _other_ form elements)
* note that you can append a ?print-pdf to the end of the url for a printable version (the formatting is slightly off, though)
* for example:[http://foureyes.github.io/csci-ua.0480-fall2015-001/slides/09/request-response.html?print-pdf#/](http://foureyes.github.io/csci-ua.0480-fall2015-001/slides/09/request-response.html?print-pdf#/)
</section>


<section markdown="block">
## Will Not Be on Exam

No need to memorize exact setup code for built-in middleware and templating engines:

* express handlebars
* body-parser
* express-static 
* express-session 

<br>

__However__ your should know conceptually what do they do, as well as why / when you'd use them.
</section>


<section markdown="block">
## JavaScript Basics

* values, types, operators
* type coercion and type casting (including +, + '', parseInt, etc.)
* undefined, checking for
* loops, conditionals, switch case
* variables
* functions

</section>
<section markdown="block">
## Functions

* functions as values
* nested functions
* function declaration syntax vs declare variable and assign to function
* variable scope
* hoisting
* closures
* arguments object
* higher order functions (and their implementations)
* function invocation (function call, method, call/apply)and  _this_
</section>

<section markdown="block">
## Objects 

* objects, properties and methods
* _this_
* 'call by sharing'
* looping over properties, hasOwnProperty
* mutability / aliasing, get around this by slicing
* JSON
* String and Array, properties and methods
* prototypal inheritance, prototype chain
* Object.prototype, Object methods and properties
* constructors
* console object
* modules (export, require)
* readline-sync, request

</section>

<section markdown="block">
## Node/npm

* what's node?
* non-blocking io
* using npm
* package.json
* node_modules directory
* finding modules

</section>

<section markdown="block">
## Web

* internet, www, hypertext
* URLs
* protocols
* servers / clients
* HTTP... (continued)

</section>

<section markdown="block">
## HTTP

* request message (request line, headers, body)
* response message (status line, headers, body)
* request headers (ones mentioned in class/slides)
* response headers (ones mentioned in class/slides)
* response codes, response classes (ones mentioned in class/slides)
* tools
	* netcat
	* curl
	* web inspector
</section>

<section markdown="block">
## Node's http module

* createServer
* writeHead
* send
* using fs module
* mainly homework
* ...and difference between http and using Express...

</section>

<section markdown="block">
## Express

* request/response objects
* routes
* middleware
* serving static files (middleware) ...not exact code, but _how_ it works
* templating
* paths
</section>

<section markdown="block">
## Forms

* form markup, form elements
* post/redirect/get
* session and body parsing middleware
* accessing data from request originating from form (via query and body)
* storing in session, cookies
</section>

<section markdown="block">
## MongoDB and Mongoose

* background information on databases
* mongodb commandline client insert, find and findOne
* mongoose - find and find with criteria

</section>

<section markdown="block">
# Format

</section>

<section markdown="block">
## Pen/Pencil and Paper

* no laptops
* no books/notes (except provided notes)
* 4 ~ 5 pages (12 ~ 16 questions)
</section>

<section markdown="block">
## Types of Questions

* true / false
* short answer 
* code comprehension
* code from scratch
* fill-in-the-blanks

</section>

<section markdown="block">
## True or False

__Are the following statements true or false. If false, why?__ &rarr;

* __HTTP is a request-response protocol__ &rarr;
	* {:.fragment} true
* __<code>(typeof 9 === 'int')</code>__ &rarr;
	* {:.fragment} false - JavaScript's numeric type is _number_, there are not types specifically for ints, floats and doubles
* __Node.js is usually multi-threaded, even though I/O is always blocking__  &rarr;
	* {:.fragment} __false__ - node is usually single-threaded, and I/O is asynchronous
</section>

<section markdown="block">
## Short Answer

__What is function and variable hoisting. Give an example of each.__ &rarr;

* __function / variable__ hoisting is when a function or variable declaration is brought to the top of the enclosing scope.
* an example of function hoisting:
{:.fragment}

<pre><code data-trim contenteditable>
f(); // function declaration syntax gets hoisted

function f() {
	console.log('I\'m a function!');
}

console.log(x); // undefined (but no reference error)

var x = 12; // definition stays, but declaration hoisted
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Code Comprehension

<pre><code data-trim contenteditable>
if ('5' == 5) {
	console.log('first');
}

if ('5' === 5) {
	console.log('second');
}
</code></pre>

__What is the output of the code above?__ __Why?__ &rarr;

<code>first</code> - <code>===</code> checks for both type and value
{:.fragment}

</section>

<section markdown="block">
## Code From Scratch 

Expect small programs or functions, such as:

* create a hello world Express app that responds to GET requests on /
	* needs require, app creation, simple route and listen
* write a function called only_large_arrays... that takes two arguments:
	* an Array of Arrays and a number
	* it will return a new Array composed of Arrays that have more elements than the number passed in
	* example: only_large_arrays([[1, 2], [3, 4, 5], [6, 7, 8], [9]], 2) &rarr; [[3, 4, 5], [6, 7, 8]]

</section>

<section markdown="block">
## Fill in the Blank

What's missing from this <code>views/layouts/main.handlebars</code> template? __Fill in the missing line__ &rarr;

<pre><code data-trim contenteditable>
<!doctype html>

&lt;html&gt;

&lt;body&gt;

&lt;/body&gt;

&lt;/html&gt;

</code></pre>

(It needs {{"{{{body"}}}}}) between the body tags
{:.fragment}
</section>


