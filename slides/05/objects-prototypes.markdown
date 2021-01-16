---
layout: slides
title: "Objects Revisited, Prototypes"
---

<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## Object-Oriented Programming


__Describe the following object oriented programming concepts__: &rarr;

* __inheritance__ <span class="fragment">- basing a class off of another class so that it maintains the same behavior as its super class</span>
* __polymorphism__ <span class="fragment">- having the same interface to instances of different types</span>
* __encapsulation__ <span class="fragment">- information hiding, internals/implementation details not accessible publicly</span>
* __abstraction__  <span class="fragment">- (again) creating tools / interfaces that allow a programmer to address the actual problem they're solving rather than having to deal with necessary, but irrelevant (to the problem) details</span>

</section>

<section markdown="block">
## Object-Oriented Programming in Java

In Java, __what language features / constructs allow inheritance, polymorphism, encapsulation, and abstraction?__ &rarr; 

* __inheritance__ - subclassing... using extend
* __polymorphism__ - instances of different classes that are subclasses of the same superclass
* __encapsulation__ - private methods and private members variables
* __abstraction__ - creating classes, interfaces, abstract classes, and methods
{:.fragment}
</section>

<section markdown="block">
## _Object-Oriented Programming_ in JavaScript

Although JavaScript _has_ objects, its approach to _object-oriented programming_ is a bit unconventional. 

* it still supports __encapsulation__, __inheritance__, __polymorphism__, and __abstraction__ 
* ... but it does so __differently__ than Java (and other languages that support _classical object-oriented_ techniques) &rarr;

<br>

* inheritance - prototypes and/or functions
* polymorphism - _duck typing_
* encapsulation - closures
* abstraction - higher order functions, prototypes, etc.
{:.fragment}
</section>

<section markdown="block">
## An Aside on Duck Typing

### _If it looks like a duck and it quacks like a duck... it's a duck_

* when an object's methods and properties determine valid semantics
* ... rather than its class or the class that it inherits from

<div markdown="block" class="img">
![duck]({{ site.vars.slides_img_prefix }}/duck.jpg)
</div>

</section>

<section markdown="block">
# Let's dive into objects

### (ouch)
</section>

<section markdown="block">
## Globals

First off, in both Node and browser-based JavaScript implementations a __global object__ exists:

* <code>global</code> for node
* <code>window</code> for browsers

<br>
__Let's see what this looks like by__: &rarr;

* checking out global in the interactive shell
* inadvertently creating a global variable within a function definition (dropping `var`, `let` and `const`)

<pre><code data-trim contenteditable>
console.log(global)
function oopsGlobal() {
	mistake = "yup";
}
oopsGlobal();
console.log(mistake);
console.log(global.mistake);
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Methods

__Methods__ are object properties that are functions (a function within the context of an object).

<pre><code data-trim contenteditable>
const cat = {};
cat.speak = function() {
	console.log("meow"); 
};
cat.speak();
</code></pre>

Notice that you can attach methods to any arbitrary object instance! (???)
</section>

<section markdown="block">
## This

"When a function is called as a method—looked up as a property and immediately called, as in object.method()—the special variable __<code>this</code>__ in its body will point to the object that it was called on". __What will be printed out in the code below?.__ &rarr;

<pre><code data-trim contenteditable>
function speak() {
	if(this.nationality == "Japanese") {
		console.log("nyan");
	} else if (this.nationality == "American") {
		console.log("meow");
	} else {
		console.log("default cat noise");
	}
}
</code></pre>
<pre><code data-trim contenteditable>
const japaneseCat = {nationality:"Japanese", speak:speak};
const americanCat = {nationality:"American", speak:speak};
</code></pre>
<pre><code data-trim contenteditable>
japaneseCat.speak();
americanCat.speak();
</code></pre>
<pre><code data-trim contenteditable>
nyan
meow
</code></pre>
{:.fragment}
</section>
<section markdown="block" data-background="#440000">
## In methods, <code>this</code> refers to the object that the method was called on

</section>

<section markdown="block">
## Hm. What if a Function isn't Attached to an Object?

A standalone function's __<code>this</code>__ refers to the global object. __What will the following code print out?__ &rarr;

<pre><code data-trim contenteditable>
global.outside = 5;
const f = function() {
	console.log(this.outside);
}
f();
</code></pre>
<pre><code data-trim contenteditable>
5

// this is the global object!
</code></pre>
{:.fragment}
</section>


<section markdown="block">
## Standalone Functions and This

__Aaaand... what's the output of our speak function from the previous slide if we call it on its on (not within the context of an object)?__ &rarr;

<pre><code data-trim contenteditable>
function speak() {
	if(this.nationality == "Japanese") {
		console.log("nyan");
	} else if (this.nationality == "American") {
		console.log("meow");
	} else {
		console.log("default cat noise");
	}
}
speak();
</code></pre>
<pre><code data-trim contenteditable>
default cat noise
</code></pre>
{:.fragment}

* if we <code>console.log(this.nationality)</code> ...  we'll see it's <code>undefined</code>
* nationality was not yet defined on the global object, so we get <code>undefined</code>
{:.fragment}
</section>
<section markdown="block">
## Oh. Also...

[How to say meow in different languages](http://www.eleceng.adelaide.edu.au/personal/dabbott/animal.html)

</section>

<section markdown="block" data-background="#440000">
## In standalone functions, <code>this</code> refers to the global object 
</section>

<section markdown="block">
## A Magic Trick

__Let's try running this code...__ &rarr;

* have we defined any properties on the object called <code>empty</code>?
* will this produce output or give us an error?

<pre><code data-trim contenteditable>
const empty = {}; 
console.log(empty.toString);
console.log(empty.toString());
</code></pre>

<pre><code data-trim contenteditable>
[Function: toString]
[object Object]
</code></pre>
{:.fragment}

<div markdown="block" class="img">
Magic!<br>
![magic]({{ site.vars.slides_img_prefix }}/magic.gif)
</div>
{:.fragment}
</section>

<section markdown="block">
## Inherited Properties

__If we started off with an empty object in the previous slide, where did the toString method come from?__

* "in addition to their set of properties, almost all objects also have a __prototype__"
* "a __prototype__ is another object that is used as a fallback source of properties"
* "when an object gets a request for a property that it does not have..."
* "its prototype will be searched for the property, then the prototype’s prototype, and so on"
{:.fragment}

</section>
