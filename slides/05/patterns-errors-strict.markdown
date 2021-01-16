---
layout: slides
title: "Patterns, Errors, Use Strict"
---

<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## Patterns 

__Patterns__ are reusable strategies / solutions for frequently occurring problems in designing and writing software. 

__Have you encountered any design patterns in your previous classes (Java has a lot of 'em! ... we also saw a JavaScript one earlier)?__ &rarr;

* {:.fragment} function decorator - modify how a function works without changing its internals
* {:.fragment} singleton - only have one instance of an object for the lifetime of your program... (for example, a configuration object or an object to manage database connections)
* {:.fragment} MVC - separate the responsibilities of an application to model, view and controller
* {:.fragment} facade - simplify an api or mask it to mitigate against api changes
</section>

<section markdown="block">
## JavaScript Patterns

Besides the decorator pattern, we'll take a look at

* IIFE - immediately invoked function expressions for constraining scope
* module / revealing module for encapsulation
* namespacing 

</section>

<section markdown="block">
## IIFE

__IIFE__ (proncounced iffy) stands for immediately invoked function expression.

What's it used for? ...Well, __what is the only thing that creates scope in JavaScript (we're not using ES6 yet)?__ &rarr;

Functions!
{:.fragment}

__IFFEs__ are created by wrapping your code in a function that's immediately called! __Why would we do such a thing?__ &rarr;
{:.fragment}

* {:.fragment} all of your variables are now local to function (does not create global variables)
* {:.fragment} variables are only hoisted to top of current scope
* {:.fragment} an easy way of controlling access to your variables!

</section>
<section markdown="block">
## Function Declarations vs Expressions

Let's talk about the __function expression__ part of _Immediately Invoked Function Expressions_ first...

A __function declaration__:

<pre><code data-trim contenteditable>
function myAwesomeFunction() {}
</code></pre>

A __function expression__ (an anonymous function; an expression that produces a function):

<pre><code data-trim contenteditable>
function() {}
</code></pre>

</section>

<section markdown="block">
## The Immediately Invoked Part

You can immediately run an anonymous function by wrapping it in parentheses, and immediately calling it with parentheses at the end:

<pre><code data-trim contenteditable>
(function(){
  console.log('stuff to do');
})(); 
</code></pre>

__Why wrap the function expression in parentheses?__ &rarr;

When the interpreter sees function as the first _token_, it assumes function declaration syntax... but there's no function name, sooooo... syntax error.
{:.fragment}
</section>

<section markdown="block">
## Passing Arguments to an IIFE

You can even pass in arguments to an IIFE. This effectively "saves" or "locks in" the values that are passed in as arguments, so that any functions created within the IIFE have access to that argument.

<pre><code data-trim contenteditable>
(function(greeting){
  console.log(greeting + ' world');
})('hello'); 
</code></pre>

</section>

<section markdown="block">
## Application / For Loops and Closures

This simulates a common problem when trying to add event handlers to multiple elements in an html document. We'll use an IIFE to fix it. __What's the output of this code?__ &rarr;

<pre><code data-trim contenteditable>
var funcs = [];
// creating three functions, each should log 1
for (var i = 0; i < 3; i++) {
  funcs[i] = function() {
    console.log("My value: " + i);
  };
}

// but what?
for (var j = 0; j < 3; j++) {
  funcs[j]();
}
</code></pre>

</section>

<section markdown="block">
## The Problem

* there's only one environment that every function 'captures'!
* i ends up being 3 at the end for all of them

</section>
<section markdown="block">
## Using an IFFE to "Save State"

<pre><code data-trim contenteditable>
var funcs = [];
for (var i = 0; i < 3; i++) {
  funcs[i] = (function(val) {
     return function() { console.log("My value: " + val);
    };
  })(i);
}

for (var j = 0; j < 3; j++) {
  funcs[j]();
}
</code></pre>

On each iteration, the IIFE is a new function object, with its own scope and local variable val, which is unchanged, even after it returns. It will stay constant for the created closure!

The next iteration does not change the environments of the previously created function objects.
</section>


<section markdown="block">
## Module Pattern

We can use an IIFE to simulate encapsulation (think _access modifier_, __private__). From [Ben Alman's article on IIFE's](http://benalman.com/news/2010/11/immediately-invoked-function-expression/):

<pre><code data-trim contenteditable>

var counter = (function(){
  var i = 0;

  return {
    get: function(){
      return i;
    },
    set: function( val ){
      i = val;
    },
    increment: function() {
      return ++i;
    }
  };
}());

</code></pre>

</section>

<section markdown="block">
## Using Our Module

i is private! The returned object specifies the public methods!

<pre><code data-trim contenteditable>
counter.get(); // 0
counter.set( 3 );
counter.increment(); // 4
counter.increment(); // 5
</code></pre>
</section>

<section markdown="block">
## Namespaces

Another way to keep global variables under control, and to prevent naming collisions is to use __namespaces__. Simply drop all of your variables into a single object!

<pre><code data-trim contenteditable>
var myNamespace = {};
myNamespace.var1 = 24;
myNamespace.var2 = 24;

// var1 and var2 do not pollute the global namespace
</code></pre>

[Check out some more sophisticated ways to deal with namespacing](http://addyosmani.com/blog/essential-js-namespacing/) (for example, dealing with cumbersome deep nesting)
</section>

<section markdown="block">
## use strict

Place <code>"use strict"</code> at the top of a file or function to make JavaScript a little _less lenient_. __Strict mode__...

* throws an error when code inadvertently causes a global variable to be created by dropping var
* prevents methods / constructors from being called incorrectly (in such a way that <code>this</code> references the global object)

</section>

<section markdown="block">
## use strict Example 1

From {{ site.vars.book_js }}:

<pre><code data-trim contenteditable>
function canYouSpotTheProblem() {
  "use strict";
  for (counter = 0; counter < 10; counter++) {
    console.log("Happy happy"); 
  }
}
canYouSpotTheProblem();

</code></pre>
</section>

<section markdown="block">
## use strict Example 2

From {{ site.vars.book_js }}:

<pre><code data-trim contenteditable>
"use strict";
function Person(name) { this.name = name; }
// Oops , forgot 'new '
var ferdinand = Person("Ferdinand");

</code></pre>
</section>

<section markdown="block">
## Exception Handling

Creating errors...

<pre><code data-trim contenteditable>
throw new Error("some stuff");
</code></pre>

Handling errors...
<pre><code data-trim contenteditable>
try {
  throw new Error("makin' some errors");
} catch(e) {
  console.log('caught it', e);
}
</code></pre>

</section>

<section markdown="block">
## Error Instances

To catch specific errors:

* create a new error object (using Error.prototype as prototype)
* use instanceof in catch

</section>
