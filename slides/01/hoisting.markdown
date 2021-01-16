---
layout: slides
title: Hoisting
---

<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## Hoisting


__hoisting__ is the processing of _declarations_ before any code is executed.

What's a __declaration__ though?
{:.fragment}

* a __declaration__ is a way of telling the interpreter (or compiler) that a name or identifier exists
* we learned a few ways of declaring names in JavaScript (the 1st is easy, the 2nd, a bit tricky)... __what were they__? &rarr;
	* {:.fragment} variable declarations (using `const`, `let`, and `var`)
	* {:.fragment} function declarations (using <code>function f(x) {}</code>)
{:.fragment}

<br>
__Hoisting__ basically brings declarations to the __top of the current scope__.  __What does that mean for us?__ &rarr;
{:.fragment}
<div class="fragment" markdown="block">

* some declarations do not have to occur before they are used!
* we already saw this with functions declarations...

<br>

(btw, [this article](http://www.i-programmer.info/programming/javascript/5364-javascript-hoisting-explained.html?start=1) explained a lot, as well as [Chapter 4](http://eloquentjavascript.net/03_functions.html) in {{ site.vars.book_js }})
{:.fragment}
</div>
</section>

<section markdown="block">
## Hoisting and Functions

So... we basically know what happens here. __What's the output of the following code examples?__ &rarr;

<pre><code data-trim contenteditable>
f();
function f() {
	console.log("TO THE TOP, PLZ!")
}
</code></pre>

__output__: <code>TO THE TOP, PLZ!</code>
{:.fragment}

<pre><code data-trim contenteditable>
f();
var f = function() {
	console.log("TO THE TOP, PLZ!")
}
</code></pre>

__output__: <code>TypeError: undefined is not a function</code>
{:.fragment}

<pre><code data-trim contenteditable>
f();
</code></pre>

__output__: ReferenceError: f is not defined
{:.fragment}


</section>

<section markdown="block">
## Hoisting and Functions SOME MORE!

__What's the output of this code?__ &rarr;

<pre><code data-trim contenteditable>
function outer() {
	inner();
	function inner() {
		console.log('hello');	
	}
}
outer();
</code></pre>

<code>hello</code> is printed out. __What happens if we add in a call to <code>inner at the end, outside of the function</code>__?
{:.fragment}

<pre><code data-trim contenteditable>
// same as above (function outer() ... )
// but add the line below at the very end
inner();
</code></pre>
{:.fragment}

<code>ReferenceError</code> - function declarations are hoisted to the top of their __current scope__ (not to the top of the global scope)
{:.fragment}

</section>
<section markdown="block">
# Great! But What About `var` Declarations?

### (We'll see why <code>var f = function ... </code> behaves the we way it does)

</section>


<section markdown="block">
## `var` Examples

Treating each code example as a completely separate program, __what is the output of the following lines of code?__ &rarr;

<pre><code data-trim contenteditable>
console.log(x);
</code></pre>

<pre><code data-trim contenteditable>
// variable not yet declared (easy)
ReferenceError: x is not defined
</code></pre>
{:.fragment}

<pre><code data-trim contenteditable>
var x;
console.log(x);
</code></pre>
<pre><code data-trim contenteditable>
// x is declared before ... works obvs!
undefined
</code></pre>
{:.fragment}

<pre><code data-trim contenteditable>
// so... what do we get here?
console.log(x);
var x;
</code></pre>

<pre><code data-trim contenteditable>
undefined
</code></pre>
{:.fragment}

__Note that the last example would be an error if using `let` (or `const`)__
{:.fragment}
</section>

<section markdown="block">
## `var` Declarations are Hoisted


<pre><code data-trim contenteditable>
console.log(x);
console.log(y);
var x;
var y;
</code></pre>

In the above example:

* the variable declarations are taken from the regular top-to-bottom flow
* ... and __they are treated as if they were moved to the beginning of their enclosing scope__
* consequently, this prints out <code>undefined</code> twice rather than <code>ReferenceError</code>

</section>

<section markdown="block">
## How About Initializing a Variable Along with `var`?

Let's start simple. __What's the output of this code?__
<pre><code data-trim contenteditable>
var x = 5;
console.log(x);
</code></pre>

<pre><code data-trim contenteditable>
// no surprise here!
5
</code></pre>
{:.fragment}

__But how about this?__ &rarr;
{:.fragment}

<pre><code data-trim contenteditable>
console.log(x);
var x = 5;
</code></pre>
{:.fragment}

<pre><code data-trim contenteditable>
// oof. what!?
undefined
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## `var` and Initialization

* `var` declarations are hoisted
* but the __initialization is executed in the location of the program where the initialization statement is actually placed__
* soooo... that means:

<pre><code data-trim contenteditable>
console.log(x);
var x = 5;
</code></pre>

* is executed as:

<pre><code data-trim contenteditable>
var x;
console.log(x);
x = 5;
</code></pre>

</section>
<section markdown="block">
## Another Note on `var` and Hoisting

This probably doesn't matter since, we all know that you should __never declare a variable without var__, but: 

* __implicit variable declarations are not hoisted!__
* the following gives us a <code>ReferenceError</code>

<pre><code data-trim contenteditable>
// (all we did here was take out var!)

console.log(x); // oops ... ReferenceError
x = 5;

</code></pre>

</section>
<section markdown="block">
## What About `let` and `const`?

__As we saw previously, `let` and `const` have a Temporal Dead Zone__ &rarr;

* {:.fragment} __a variable declared with `let` and `const` cannot be accessed...__ 
    * between the time that the containing scope is entered
    * and the actual `let` or `var` declaration
* {:.fragment} however... an identifier _is actually created for it_ at the beginning of the scope! you just can't use it yet!
* {:.fragment} (so it's _sort of hoisted_; there seems to be some debate on the terminology for this)
* {:.fragment} consequently, this code gives an error:
    <pre><code data-trim contenteditable>
console.log(x);
let x = 5;
</code></pre>

</section>

<section markdown="block">
## Hoisting Summary

__This is all you need to know about hoisting__:

* {:.fragment} `let` and `const` declared variables cannot be accessed until their declaration (this is _actually_ sane)
* {:.fragment} `var` declarations and function declarations are brought to the beginning of their enclosing scope
	* all function declarations are hoisted 
	* `var` declarations are hoisted, but the assignment part occurs where the original statement was located
    * `var` declarations that haven't been assigned a value yet are initialized with `undefined` (just like `let`)
* {:.fragment} implicit variable declarations (no `const`, `let`, or `var`) are not hoisted (but you always use `let`, `const` or `var`, so not relevant, right?)
</section>

<section markdown="block">
## Hoisting Example 1

__What's the output of the following code?__ &rarr;

<pre><code data-trim contenteditable>
var num = 1000; 
f(); 

function f(){ 
	console.log(num)
	var num = 5;
};
</code></pre>
<pre><code data-trim contenteditable>
undefined

</code></pre>
{:.fragment}

* the global <code>num</code> is not used
* instead, <code>num</code> within the function is hoisted to the top of its enclosing scope, the function, <code>f</code>
*  but note the initialization is executed in the place where it occurs... consequently, <code>undefined</code>
{:.fragment}
</section>

<section markdown="block">
## Hoisting Example 2

__What's the output of the following code?__ &rarr;
<pre><code data-trim contenteditable>
console.log(f);
var f = function(x) {
	console.log("hello " + x);
}
</code></pre>

* yup, still <code>undefined</code> - the declaration is hoisted
* ... but the initialization to a value is not
{:.fragment}

<pre><code data-trim contenteditable>
// it's executed as if it were
var f;
console.log(f);
f = function(x) {
	console.log("hello " + x);
}
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Hoisting Example 3

__What's the output of this code?__ &rarr;
<pre><code data-trim contenteditable>
var inner = 1000;
function outer () {
    inner = 5;
    function inner() {}
}
outer();
console.log(inner);
</code></pre>

* {:.fragment} the output is <code>1000</code>
* {:.fragment} the function declaration of <code>inner</code> is hoisted to the top of the enclosing scope
* {:.fragment} which renders the first line of the function, <code>inner = 5</code>, a reassignment of the local <code>inner</code>, not the global

</section>

<section markdown="block">
## Hoisting Example 4

__What's the output of this code?__ &rarr;
<pre><code data-trim contenteditable>
console.log(f);

const f = function() {
    console.log('I am function!');
}
</code></pre>
</section>
<section markdown="block">
## Back to an Earlier Mystery

__And that's why the following gives us <code>undefined is not a function</code>__ &rarr;

<pre><code data-trim contenteditable>
f();
var f = function(x) {
	console.log("hello " + x);
}
</code></pre>

* we know that the declaration of <code>f</code> is hoisted
* but it has no value at the point that it is invoked/called (it's <code>undefined</code>)
* consequently, the program is attempting to use <code>undefined</code> as a function
</section>

<section markdown="block">
# Whew! That Seemed Unnecessarily Complicated.

### Why even? ಠ_ಠ
</section>

<section markdown="block">
## No Seriously...

Hoisting.  __Why?__ &rarr;

* generally a top-down approach is taken to programming
	* so it may make sense for the "main" part of the program to go on top, calling functions elsewhere
	* those functions are likely to be declared below main
	* so it's more natural... ¯\\_(ツ)\_/¯ (maybe)
* as for `var`, I don't know if I can excuse that!
{:.fragment}

* according to [this SO](http://stackoverflow.com/questions/15005098/why-does-javascript-hoist-variables) article....
* it may possibly just be due to the interpreter implementation: scan source for variable and function declarations first, then execute code next
{:.fragment}
</section>

<section markdown="block">
## Easy, Right?

### A lot of the design decisions in JavaScript seemed to be made for ease of use

<div style="text-align:center">Though, in certain cases these features actually make things more complex (weak typing, hoisting, etc.)</div>


</section>

<section markdown="block">
## Hoisting Can Lead to Tricky Situations

Like the one we saw before:

<pre><code data-trim contenteditable>
var num = 1000; 
f(); 

function f(){ 
	console.log(num)
	var num = 5;
};

</code></pre>

__How can we get around this ambiguity?__ &rarr;

Always declare your variables at the beginning of your function!
{:.fragment}

Aaaaand... possibly, avoid using `var`; use `let` and `const` instead!
</section>

{% comment %}
<section markdown="block">
## One Last Thing

### Multiple variable declarations on one line (YES!)
A bit off topic... but since we're talking about __variable declarations__...

You can define multiple variables at once with var. This works fine (that is, there's no <code>ReferenceError</code>):

<pre><code data-trim contenteditable>
console.log(foo, bar, baz);
var foo, bar, baz;
</code></pre>

Initialization also works too :

<pre><code data-trim contenteditable>
var foo = 1, bar = 2, baz = 3;
console.log(foo, bar, baz);
</code></pre>

Lastly, preferred formatting is each initialization on a new line:

<pre><code data-trim contenteditable>
var foo = 1, 
    bar = 2,
    baz = 3;
</code></pre>
</section>

{% endcomment %}
