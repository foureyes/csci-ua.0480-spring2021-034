---
layout: slides
title: Functions (Closures, Optional Arguments)
---
<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}

<p><small></small></p>
</section>

<section markdown="block">
## Topics

* Review hoisting
* Optional Arguments
* Closures

	
</section>

<section markdown="block">
## A Quick Review on Hoisting

__What's hoisting?__ &rarr;

* {:.fragment} __hoisting__ is the processing of _declarations_ before any code is executed.
* {:.fragment} what's a __declaration__?
* {:.fragment} a __declaration__ is a way of telling the interpreter (or compiler) that a name or identifier exists
* {:.fragment} Soooo... __Hoisting__ basically brings declarations to the __top of the current scope__
* {:.fragment} which means declarations do not have to occur before they are used depending on how you declare identifiers!
</section>

<section markdown="block">
## Hoisting Continued?

__What are some hoisting rules?__ &rarr;

* {:.fragment} `let` and `const` declarations are _sort of hoisted_ (their names are created, but they can't be used until they're actually declared)
* {:.fragment} `var` declarations are brought to the top of the scope
* {:.fragment} assignment / initialization is not hoisted (it happens at the original location of that line, so these `var` variables are `undefined`)
* {:.fragment} function declarations are hoisted (including their definition)

</section>

<section markdown="block">
## What's the Output?

__What is the output of the following code? Error or no output are possible.__ &rarr;

<pre><code data-trim contenteditable>
console.log(x);
</code></pre>

<pre><code data-trim contenteditable>
ReferenceError: x is not defined
</code></pre>
{:.fragment}

(x wasn't declared yet)
{:.fragment}

</section>

<section markdown="block">
## What's the Output?

__What is the output of the following code? Error or no output are possible.__ &rarr;
<pre><code data-trim contenteditable>
let x;
console.log(x);
</code></pre>

<pre><code data-trim contenteditable>
undefined
</code></pre>
{:.fragment}

`let` variables are initialized to `undefined`
{:.fragment}

<pre><code data-trim contenteditable>
console.log(x);
let x;
</code></pre>

<pre><code data-trim contenteditable>
ReferenceError
</code></pre>
{:.fragment}

Temporal Dead Zone - can't access `let` variable before actual declaration
{:.fragment}

<pre><code data-trim contenteditable>
console.log(x);
var x;
</code></pre>

<pre><code data-trim contenteditable>
undefined
</code></pre>
{:.fragment}

the `var` declaration for x is hoisted
{:.fragment}

</section>


<section markdown="block">
## What's the Output?

__What is the output of the following code? Error or no output are possible.__ &rarr;

<pre><code data-trim contenteditable>
f(5); 
var f = function(x) {
	console.log(x);
}
</code></pre>

<pre><code data-trim contenteditable>
TypeError: undefined is not a function
</code></pre>
{:.fragment}

variable declaration is hoisted, but the initialization of its value is not.... the value, <code>undefined</code> is being used as a function!?
{:.fragment}

</section>

<section markdown="block">
## What's the Output?

__What is the output of the following code? Error or no output are possible.__ &rarr;

<pre><code data-trim contenteditable>
f(5); 
function f(x) {
	console.log(x);
}
</code></pre>

<pre><code data-trim contenteditable>
5
</code></pre>
{:.fragment}

when using function declaration syntax, both declaration and _actual definition_ of function are hoisted
{:.fragment}

</section>

<section markdown="block">
## About `var` 

A quick summary on __using var__ &rarr;

* if you drop `var` (and don't have a `const` or `let` either), the declaration is not hoisted
* if you're in a function then `var` will create a local variable ... and the scope of it will be that function
* within a function, but without `const`, `let` or `var`, __the interpreter will look up the scope chain until it finds that variable or hits the global scope (at which point it will create it)__
</section>

<section markdown="block">
## Aaaand... Back to Using / Not Using `const`, `let` or `var`

__What's the output of this code?__ &rarr;

<pre><code data-trim contenteditable>
let g = 7;

function f() {
	g = 5;
}
f();
console.log(g);
</code></pre>

<pre><code data-trim contenteditable>
// the variable, g, within the function, f...
// changes the global variable, g
5
</code></pre>
{:.fragment}

</section>

<section markdown="block">
## A Tricky One...

__What's the output of this code?__ &rarr;

<pre><code data-trim contenteditable>
let g = 7;
function f() {
    g = 5;
    function g() {}
}
f();
console.log(g);
</code></pre>

<pre><code data-trim contenteditable>
7 (!?)
</code></pre>
{:.fragment}

* {:.fragment} function g is hoisted and is local to function f
* {:.fragment} g = 5 reassigns the local variable g!

</section>

<section markdown="block">
## And From the Previous Slides

This illustrates going up the scope chain... __what's the output?__ &rarr;

<pre><code data-trim contenteditable>
let x = 10;
function f() {
  function g() {
    x = 20; 
  }
  g(); 
}
console.log(x);
f();
console.log(x);
</code></pre>

<pre><code data-trim contenteditable>
10 // global
20 // nearest x is global, so global is changed by x = 20
</code></pre>
{:.fragment}

</section>

<section markdown="block">
## Scope Chain Continued

A minor change in code.... (declaring a local in f). __What's the output this time?__ &rarr;

<pre><code data-trim contenteditable>
let x = 10;
function f() {
  let x = 30;
  function g() {
    x = 20; 
  }
  g(); 
}
f();
console.log(x);
</code></pre>

<pre><code data-trim contenteditable>
// nearest x is in f, so global x is not changed
10
</code></pre>
{:.fragment}

</section>

<section markdown="block">
## Optional Arguments

You can pass as many or as few arguments to functions as you like!

__Wait... what!?__ &rarr;
{:.fragment}

* if there are __aren't enough__ arguments, the remaining parameters are <code>undefined</code>
* if there are __too many__ arguments passed in, they're ignored
* there's also an <code>arguments</code> variable added to the function's context (along with a this variable) ... maybe we'll check these out later
{:.fragment}

<br>
__Let's check this out__ &rarr;
{:.fragment}
</section>

<section markdown="block">
## Optional Arguments Continued

__Given the following function...__

<pre><code data-trim contenteditable>
function f(a, b) {
	console.log(a, b);
}
</code></pre>

__What is output of this function if called with the following arguments?__ &rarr;

<pre><code data-trim contenteditable>
f(1, 2);
f(1);
f();
</code></pre>

<pre><code data-trim contenteditable>
1 2
1 undefined
undefined undefined
</code></pre>
{:.fragment}

</section>

<section markdown="block">
## Rest Parameters

__Using the following syntax for rest parameters__ ... you can create functions that __have an indefinite number of arguments represented as a real Array__ mixed in with initial positional arguments &rarr;

<pre><code data-trim contenteditable>
function hiEveryone(greeting, ...names) {
    console.log(greeting);
    console.log(names);
}
hiEveryone('Hello', 'Alice', 'Bob', 'Carol')
</code></pre>

<pre><code data-trim contenteditable>
Hello
[ 'Alice', 'Bob', 'Carol' ]
</code></pre>
{:.fragment}

`names` is an actual `Array`, so you can use `Array` methods on it (unlike the `arguments` object, which is a _fake_ Array-like object)
{:.fragment}

</section>

<section markdown="block">
## Arguments Object

When a function is called, it gets an __arguments__ object in its context, along with its defined parameters (and __this__, but we'll talk about that later). __Let's see this in action.__ &rarr;


<pre><code data-trim contenteditable>
const f = function() {
    console.log("number of args " + arguments.length);
    for (let i = 0, j = arguments.length; i < j; i++) {
        console.log(arguments[i]);
    }
};
f(1, 2, 3);
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Arguments Object Continued

The arguments object is array-like, but not an array. (__Let's see.__ &rarr;)

* you can index into it
* you can get its length
* you can loop over it (with a _regular_ <code>for</code> loop)
* no methods, though (no <code>slice</code>, <code>pop</code>, <code>forEach</code>, etc.)

</section>

<section markdown="block">
## Using the Arguments Object

Create a function called <code>mySum</code> that takes an arbitrary number of numbers as separate arguments and returns the sum of all of the arguments

<pre><code data-trim contenteditable>
console.log(mySum(1, 2, 3)); // --> 6
</code></pre>

<pre><code data-trim contenteditable>
var mySum = function() {
	var total = 0;
	for(var i = 0; i < arguments.length; i++) {
		total += arguments[i];
	}
	return total;
}
</code></pre>
{:.fragment}

</section>

<section markdown="block">
## Arguments vs Rest Parameters

Both __`arguments`__ and __rest parameters__ allow for an arbitrary number of arguments. __Which should be used?__ &rarr;

1. {:.fragment} prefer using rest parameters
2. {:.fragment} you get access to a _real_ `Array`
3. {:.fragment} you can name the resulting `Array`
4. {:.fragment} however, rest parameters are only available as of ES6

</section>

<section markdown="block">
## Default Values

__What operator could we use to give parameters default values if they're not passed in?__ &rarr;

For example, how would we create a function called <code>greetTheWorld</code>

* has one parameter, <code>greeting</code> 
* prints out the <code>greeting</code>, followed by <code>"world"</code>
* <code>greetTheWorld("Hi")</code> &rarr; <code>Hi world!</code>
* however, if an argument is not passed in, greeting should default to <code>"Hello"</code>
* <code>greetTheWorld()</code> &rarr; <code>Hello world!</code>

<br>
__Let's see an implementation in the next slide.__ &rarr;
</section>

<section markdown="block">
## Default Values Continued

We can use the `||` operator to give a default value if the value on the left is _false-y_:

<pre><code data-trim contenteditable>
function greetTheWorld(greeting) {
	console.log((greeting || "Hello") + " world!");
}
</code></pre>

</section>

<section markdown="block">
## Default Values in ES6

__You can also add default values directly in the function header in ES6__ &rarr;

<pre><code data-trim contenteditable>
function f(x=1) {
    console.log(x);
}
f(); // no args, result is 1!
</code></pre>


[See more examples at mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters)
{:.fragment}

</section>

<section markdown="block">
## Default Parameter Value Details

These values are __evaluated at call time, so a new object is created each time__ (that way, changes won't be persisted across function calls for default arguments that are  mutable) &rarr;
<pre><code data-trim contenteditable>
function extraSauce(condiments = []) {
	condiments.push('ketchup');
	console.log(condiments);
}
extraSauce() // ['ketchup']
extraSauce() // still just ['ketchup']
</code></pre>
{:.fragment}

You can even __reference other parameters in your expression__!
{:.fragment}

<pre><code data-trim contenteditable>
function foo(a = 1, b = (2 * a)) {
	console.log(a, b);
}
foo();  // 1 2
foo(7); // 7 14
</code></pre>
{:.fragment}

</section>

<section markdown="block">
## More Default Parameter Value Details!

__Parameters with default values can be anywhere in parameter list__ &rarr;

<pre><code data-trim contenteditable>
function foo(a, b = 'it me!', c) {
	console.log(a, b, c);
}
foo(1, 2, 3)  // 1 2 3
foo(1)        // 1 'it me!' undefined
</code></pre>
{:.fragment}

The value, `undefined`, is what actually triggers the default value
{:.fragment}

<pre><code data-trim contenteditable>
foo(1, undefined, 3)  // 1 it me! 3
</code></pre>
{:.fragment}

</section>

<section markdown="block">
## Closure

Functions retain access to their original scope, even when the outer function they were defined in has returned. __What happens here?__ &rarr;

<pre><code data-trim contenteditable>

let gimmeFunction = function() {

	let a = "I'm in here!";

	return function() {
		console.log(a);
	}
}

let myFunction = gimmeFunction();
myFunction();
</code></pre>

I'm in here!
{:.fragment}

</section>

<section markdown="block">
## Wait. What Happened?

([Via MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures))...

* normally, the local variables within a function only exist for the duration of that function's execution
* once the outer function <code>gimmeFunction</code> finishes executing, you'd expect that its local variable, `a`, would no longer be accessible
* however... a __closure__ is created when it returns a function!
* a __closure__ is a special kind of __object that combines two things__: 
	* a function
	* the environment in which that function was created
	* the environment consists of any local letiables that were in-scope at the time that the closure was created

</section>

<section markdown="block">
## MakeAdder

__Try writing a function called `makeAdder`:__ &rarr;

* it should take a single argument, a number
* it should return a new function 
    * ... that also takes one argument
    * but returns that argument with the argument from the outer function added to it

<br>
It should look like this:

<pre><code data-trim contenteditable>
let addTwo = makeAdder(2);
console.log(addTwo(5));
// should print out 7
</code></pre>
</section>

<section markdown="block">
## MakeAdder Continued 

__Here's a possible solution:__ &rarr;

<pre><code data-trim contenteditable>

let makeAdder = function(x) {
	return function(y) {
		return y + x;
	}
};

let addTwo = makeAdder(2);
console.log(addTwo(5));
</code></pre>
</section>

