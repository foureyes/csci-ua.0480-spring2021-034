---
layout: slides
title: "Global Object, Methods, This"
---
<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}

<p><small></small></p>
</section>

<section markdown="block">
## A Closer Look

Let's check out:

* global object
* methods
* and this


</section>

<section markdown="block">
## The Global Object

__What's the name of the global object in node (pssst... the answer is right there)?__ &rarr;


I gave that one away; it's... <code>global</code>
{:.fragment}

Let's check out what's in the __global__ object right now!
{:.fragment}

<pre><code data-trim contenteditable>
console.log(global)
</code></pre>
{:.fragment}

And let's try (inadvertently, of course. oops!) adding something to the global object:
{:.fragment}

<pre><code data-trim contenteditable>
function makeMessage() {
	// oops, forgot var/let/const... I'm a global!
	message = 'hello there';
}
makeMessage();
console.log(message);
console.log(global.message);
</code></pre>
{:.fragment}

(oh yeah, in the browser, the global object is <code>window</code>)
{:.fragment}
</section>

<section markdown="block">
## A Variable That's Not There Yet

__And... what do I get if I try to print out a property on the global object that doesn't exist?__ &rarr;

<pre><code data-trim contenteditable>
console.log(global.surprise);
</code></pre>

<pre><code data-trim contenteditable>
undefined
</code></pre>
{:.fragment}

<pre><code data-trim contenteditable>
// just like accessing a property that doesn't exist
// on any ol' object:

obj = {};
console.log(obj.unicorn);
</code></pre>
{:.fragment}

</section>
<section markdown="block">
## Methods

__What's a method?__ &rarr;

* a __method__ is an object property that is a function (or _a function within the context of an object_).
* you can create methods pretty easily...
{:.fragment}

<pre><code data-trim contenteditable>
const person = {};
person.emote = function() {
	console.log('(っ˘̩╭╮˘̩)っ'); 
};
person.emote(); // sad face - (っ˘̩╭╮˘̩)っ
</code></pre>
{:.fragment}

To call a method on an object, use:
{:.fragment}

* the __object's name__
* followed by a __dot__, 
* then a __method name__ 
* ...and finally __parentheses__ (with an optional list of arguments!)
{:.fragment}
</section>

<section markdown="block">
## Functions

When a function is invoked, it has access to its declared parameters. It also has access to __two additional parameters__.  __What are they?__ &rarr;

* <code>this</code>
* <code>arguments</code>
{:.fragment}

<br>
__What's the <code>arguments</code> object?__ &rarr;
{:.fragment}

__arguments__ is an array like object that contains all of the arguments (surprise!) passed in to a function. __What is the preferred way of declaring an arbiratry number of parameters for a function in ES6, though__ &rarr;
{:.fragment}

use the __rest operator__: `...args`
{:.fragment}

<br>
__With <code>arguments/...args</code> out of the way, let's talk about <code>this</code>__ (but before we do, a detour)&rarr;
{:.fragment}
</section>

<section markdown="block">
## Executing a Function

There are actually a few different ways (_patterns_) that a function can be called. __What are some ways of executing a function that we've seen so far?__ &rarr;

* as a _regular_ __function__: <code>myFunction()</code>
* as a __method__ if the function is attached to an object: <code>obj.myFunction()</code>
* via a __method on a function object__ (!) (__you remember those, right__? &rarr;)
	* {:.fragment} <code>call</code>
	* {:.fragment} <code>apply</code>
	* {:.fragment} <code>bind</code>
{:.fragment}

<br>
__Depending on which invovaction pattern we use, a function's <code>this</code> is bound to a different value.__ &rarr;
{:.fragment}
</section>


<section markdown="block" data-background="#440000">
# A function's <code>this</code> varies based on how the function is invoked!
</section>

<section markdown="block">
## Calling a Method, This

When a function is invoked as a method, <code>this</code> is bound to the object that it's called on. __Here's an example.__ &rarr;

<pre><code data-trim contenteditable>
function showEmotion() {
	console.log(this.emotion);
}

const person1 = {emotion:"(• ε •)", emote: showEmotion};
const person2 = {emotion:"(╯°□°）╯︵ ┻━┻", emote: showEmotion};

person1.emote(); // (• ε •)
person2.emote(); // (╯°□°）╯︵ ┻━┻
</code></pre>
</section>

<section markdown="block" data-background="#440000">
# In methods, <code>this</code> refers to the object that the method was called on.

</section>


<section markdown="block">
## What About 'Regular' Functions?

If a function that's not attached to an object is invoked, its <code>this</code> refers to the global object (uh, bad. maybe?). __What will the following code print out?__ &rarr;

<pre><code data-trim contenteditable>
function returnThis() {
	return this;	
}

console.log("Is global the same as function? " + (returnThis() === global));
</code></pre>
<pre><code data-trim contenteditable>
Is global the same as function? true
</code></pre>
{:.fragment}

<br>
<code>this</code> refers to the global object when a _regular_ function is invoked.
{:.fragment}
</section>

<section markdown="block">
## `let`, `const` and the global object

Note that __`let` and `const` declared variables__ in the _top level_ of a file (outside of functions, in the _global_ scope) __actually do not properties to the global object.__ 

* {:.fragment} they just create variables in the global scope
* {:.fragment} but, of course, `var` behaves differently
* {:.fragment} (and it depends on whether you're using node or browser based JavaScript!)

</section>
<section markdown="block">
## `var` and the global object

In node, when a variable is declared with <code>var</code> outside of a function, __it is placed in the module (or file level) scope__. Check out the following example:

* the variable, <code>moduleScope</code> is not actually attached to the global object
* ... but the variable, <code>globalScope</code> is

<pre><code data-trim contenteditable>
var moduleScope = 'hi, I\'m in yr module';
globalScope = 'hey there, I\'m a global';

function printThis() {
	console.log("this.moduleScope: " + this.moduleScope);
	console.log("this.globalScope: " + this.globalScope);
}

printThis();
</code></pre>

Output:

<pre><code data-trim contenteditable>
this.moduleScope: undefined
this.globalScope: hey there, I'm a global
</code></pre>
</section>

<section markdown="block">
## What About JavaScript in Your Browser?

There's no module level scope in browser implementations, so both variables are global. __Here's what happened in Chrome's console.__ &rarr;

<div markdown="block" class="img">
![global this]({{ site.vars.slides_img_prefix }}/global-this.png)
</div>

There's some more info in: [the node docs](http://nodejs.org/api/globals.html#globals_global)... [and, of course, SO](http://stackoverflow.com/questions/19850234/node-js-variable-declaration-and-scope).

<br>
__Of course, that doesn't change the fact that a _regular_ function's <code>this</code> points to the global object.__
</section>

<section markdown="block">
## Looks the Same, But Different

Let's go back to the function we defined before. 

<pre><code data-trim contenteditable>
function showEmotion() {
	console.log(this.emotion);
}
</code></pre>

In our previous slides, we invoked this function as a method on an object.

<pre><code data-trim contenteditable>
const whyYouNo = {emotion:"ლ(ಠ益ಠლ)", emote: showEmotion};
whyYouNo.emote(); // y u no - ლ(ಠ益ಠლ)
</code></pre>

__What gets printed out if we just call the <code>showEmotion</code> function without it being attached to an object?__ &rarr;

<pre><code data-trim contenteditable>
showEmotion();
</code></pre>

</section>

<section markdown="block">
## ...Continued

__So here's our function and function call again:__

<pre><code data-trim contenteditable>
function showEmotion() {
	console.log(this.emotion);
}

showEmotion();
</code></pre>

Hmmm. __First we have to figure out what <code>this</code> refers to when the function that's not the property of an object is invoked__ &rarr;
{:.fragment}

It refers to the <code>global</code> object. __Accessing a value that doesn't exist will yield...__ &rarr;
{:.fragment}

<pre><code data-trim contenteditable>
// our good friend...
undefined
</code></pre>
{:.fragment}
</section>

<section markdown="block" data-background="#440000">
# In _regular_ functions (not bound to an object), <code>this</code> refers to the global object.
</section>

<section markdown="block">
## Using Apply, Call, Bind

The last way (at least the last way _we've seen_... we'll see another shortly) we can invoke a function is by calling the following methods on a function object: __<code>apply</code>__, __<code>call</code>__ or __<code>bind</code>__ 

Let's review what these functions do. __Does anyone remember?__ &rarr;

* [call](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call) - calls a function with given <code>this</code> and individual arguments
* [apply](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) - calls a function with given <code>this</code> and array as arguments
* [bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) - creates a new function with given <code>this</code>, and optionally with set argument values
{:.fragment}

<br>
__What argument does each of these methods have in common!?__ &rarr;
{:.fragment}

__<code>this</code>__ one &larr;, right here.
{:.fragment}
</section>

<section markdown="block">
## Apply, Call, Bind and This

### So. There's a clue!


__What will this code print out?__ &rarr;

<pre><code data-trim contenteditable>
function showEmotion() {
	console.log(this.emotion);
}
const justAnotherObject = {emotion:'(=^ェ^=)'};
showEmotion.call(justAnotherObject);
</code></pre>
<pre><code data-trim contenteditable>
(=^ェ^=)
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Another Example

This time, with <code>bind</code>. __Notice that bind returns a new function that's bound to the object that's passed in.__ &rarr;

<pre><code data-trim contenteditable>
function showEmotion() {
	console.log(this.emotion);
}

const justAnotherObject = {emotion:'(=^ェ^=)'};

const boundShowEmotion = showEmotion.bind(justAnotherObject);

boundShowEmotion();
</code></pre>
<pre><code data-trim contenteditable>
// prints out:
(=^ェ^=)
</code></pre>
</section>

<section markdown="block" data-background="#440000">
# Neat, eh? Call, Apply, and Bind allow a function's this object to be explicitly set.
</section>

<section markdown="block">
## Now That We're Done With That 

### Since I've been using so much emoticons, emoji, and unicode symbols...

My current favorite is: [Face with no good gesture](http://www.unicode.org/reports/tr51/full-emoji-list.html?_ga=1.264356175.114587267.1411437595#1f645)

Apparently, this could be the symbol for [incorrect, bad, wrong or false](http://qz.com/250350/the-origins-of-two-cryptic-emoji/).

<div markdown="block" class="img">
![face no good]({{ site.vars.slides_img_prefix }}/face-no-good.png)
</div>

</section>

<section markdown="block">
## Summary

There are three patterns we've seen for invoking functions. __Name those three patterns, and what <code>this</code> refers to each.__ &rarr;

* __method__ invocation - <code>this</code> refers to the object the method was called on
* __function__ invocation - <code>this</code> refers to the global object
* __apply__, __call__, and __bind__ - <code>this</code> is whatever you pass in as the first argument
{:.fragment}

</section>

