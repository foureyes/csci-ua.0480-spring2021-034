---
layout: slides
title: Functions
---
<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}

<p><small></small></p>
</section>

{% comment %}
TODO: 
* arrow
* default values
{% endcomment %}

<section markdown="block">
## Back to Definitions

* __function__ - <span class="fragment">a named sequence of statements that performs a specific task or useful operation
</span>
* __parameter__ - <span class="fragment">a variable that receives an argument that is passed into a function, think of it as as the variable(s) in the function header / signature </span>
* __call/invoke/apply__ - <span class="fragment">to run or execute a function</span>
* __argument__ - <span class="fragment"> a piece of data that is passed into a function when that function is called </span>
* __scope__ - <span class="fragment">the area of the code where a name/identifier is available for access and/or use</span>
</section>

<section markdown="block">
## Defining a Function

__We'll take a look at 3 ways of defining functions in JavaScript__ &rarr;

1. {:.fragment} __function declarations__
    <pre><code data-trim contenteditable>
function foo(arg1, arg2) {
    return arg1 + arg2; 
} 
</code></pre>    
2. {:.fragment} __function expressions__
    <pre><code data-trim contenteditable>
const foo = function(arg1, arg2) {
    return arg1 + arg2; 
}
</code></pre>
3. {:.fragment} __arrow functions__
    <pre><code data-trim contenteditable>
(arg1, arg2) => { return arg1 + arg2 }    
</code></pre>

</section>

<section markdown="block">
## Function Declarations

__Function declaration syntax__:

<pre><code data-trim contenteditable>
function foo(arg1, arg2) {
    return arg1 + arg2; 
} 
</code></pre>    

1. {:.fragment} start with the key word `function` (note that return type is not specified)
2. {:.fragment} followed by function name
3. {:.fragment} followed by optional comma separated parameters within parentheses (again, no types precede the arguments)
4. {:.fragment} and finally, the function body surrounded by curly braces (with an optional return)
    * __what do you think you get back if return is omitted?__ &rarr; <span class="fragment">... <code>undefined</code></span>

<br>
We'll see later that function declarations are special in that they can used before they are declared in your code!
{:.fragment}

</section>

<section markdown="block">
## Function Expressions

__Another way to create a function is by using a function expression (remember, functions are first-class citizens):__ &rarr;

<pre><code data-trim contenteditable>
const doubleTheNumber = function(n) {
	return n + n;
};
console.log(doubleTheNumber(5));
</code></pre>

1. {:.fragment} declare a variable
2. {:.fragment} set it equal to the keyword, <code>function</code>
3. {:.fragment} followed by parentheses and an __optional__ list of __parameters__ (separated by commas if more than one)
4. {:.fragment} the function body is just a __block__ of code (surrounded by curly braces, of course! ...and again with an optional return)
5. {:.fragment} note the semicolon at the end of the function definition (it is an assignment statement after all!)
6. {:.fragment} finally, the variable, <code>doubleTheNumber</code>, can be called/invoked because it's a function!
</section>	


<section markdown="block">
## Function Expressions Continued

__Function expressions, as the name implies, _are_ expressions!__ &rarr;

1. {:.fragment} that means that they evaluate to a value (that is... they evaluate to a function)
2. {:.fragment} so, you can use them anywhere values are needed... some examples:
    <pre class="fragment"><code data-trim contenteditable>
// to initialize a variable    
const doubleTheNumber = function(n) { return n + n; };
</code></pre>
    <pre class="fragment"><code data-trim contenteditable>
// as an argument
const numbers = [1, 2, 3, 4];
numbers.map(function(n) { return n + n; });
</code></pre>
    <pre class="fragment"><code data-trim contenteditable>
// as a return value
function f() {
    return function(n) { 
        return n + n; 
    });
}
</code></pre>

</section>


<section markdown="block">
## Arrow Functions

__Introduced in ES6, arrow functions are a way of writing function expressions in a very concise syntax.__ &rarr;

<pre><code data-trim contenteditable> (arg1, arg2) => { /* body goes here */}
</code></pre>


* {:.fragment} it's a __shorthand / more convenient__ way of writing a function expression
* {:.fragment} its behavior is subtly different from regular function expressions
    * {:.fragment} it doesn't have a built in `arguments` object (we'll see this later)
    * {:.fragment} its `this` is the value of `this` where it was defined (we'll talk about `this` later as well)

</section>

<section markdown="block">
## Arrow Function Syntax

__There are a few ways to write arrow functions.__ &rarr; 

* {:.fragment} Parentheses around parameters, curly braces around body:
    <pre><code data-trim contenteditable>
(p1, p2, ..., pN) => { statements }
</code></pre>
* {:.fragment} You can drop the curly braces if you have a single expression. The value of that expression will be __implicitly returned__ if you drop curly braces:
    <pre><code data-trim contenteditable>
(p1, p2, ..., pN) => expression // same as { return expression; }
</code></pre>
* {:.fragment} If there's only one parameter, you could also drop the parentheses:
    <pre><code data-trim contenteditable>
singleParam => { statements }
</code></pre>
* {:.fragment} If you have no parameters, use empty parentheses:
    <pre><code data-trim contenteditable>
() => { statements }
</code></pre>

</section>



<section markdown="block">
## Let's Create a Function Together

__Let's create a function called <code>myPow</code>. It will (surprisingly) raise some number to a power:__ &rarr;

* two parameters: <code>base</code> and <code>exponent</code>
* calculate the <code>base</code> raised to the <code>exponent</code>
* return the resulting value
* use function expression syntax to do this!

<pre><code data-trim contenteditable>
const myPow = function(base, exponent) {
	let result = 1;
	for(let i = 0; i < exponent; i++) {
		result = result * base;
	}
	return result;
};
console.log(myPow(2,0));
console.log(myPow(2,1));
console.log(myPow(2,8));
</code></pre>
{:.fragment}

</section>
<section markdown="block">
## Additional Assignment Operators

That line was a bit verbose, wasn't it? 
<pre><code data-trim contenteditable>
result = result * base;
</code></pre>

We can tighten that up using another __assignment operator.__

<pre><code data-trim contenteditable>
let x = 3;
x *= 2;
console.log(x);

// this works with +=, -= and /= as well
</code></pre>
<!--* -->
</section>

<section markdown="block">
## Putting the FUN in Functions

### Yeah, really. I said that.

This is when things start to get interesting...

</section>

<section markdown="block">
## Block Scope vs Function Scope

Again, __scope__ is the area or portion of your program where a variable name or identifier is available.

* some languages (C, Java) use blocks to create new scopes
* ES6 does that
* but ES5 doesn't do that (of course); instead... it only uses functions to create scope
</section>

<section markdown="block" data-background="#440000">
## In ES5, functions are the only constructs that can create a new scope!

(but with ES6, `let` and `const` give you block level scope!)

</section>
<section markdown="block">
## Scope

Variables declared at the "top level" of your program (outside of functions) and variables declared without `const`, `let` or `var` (in most cases) are in the __global scope__.

* __global variables__ are accessible anywhere
* __global variables__ are considered harmful... __why?__ &rarr;
	* because global variables are accessible everywhere, it makes things difficult to debug and fix issues as many places may read or write a value
	* when creating functions that depend on global variables, those functions will not be portable across multiple programs (as they depend on a global variable being defined)
	{:.fragment}
</section>


<section markdown="block">
## Functions and Scope

* __parameters__ in a function __are local__ to that function
* variables declared __with__ the keyword, <code>var</code> are __local__ to the function
* variables declared __with__ the keywords, `const` or `let` are __local__ to the block that they're declared in
* variables declared __without__ the `let`, `const` or `var` affect the global scope... ⊙﹏⊙
    * (actually, the nearest enclosing scope containing the name - most of the time this is global, but it could be an outer function!)
* global variables (again) are accessible throughout your program, even from within you function's body

</section>
<section markdown="block">
## An Example

__Based on the previous slide, what is the output of the following code?__ &rarr;
<pre><code data-trim contenteditable>
let x = "hi!"; // hello... I'm a global variable

const f = function() {
	let x = "from f";
};

const g = function() {
	x = "from g";
};
console.log(x)
f();
console.log(x);
g();
console.log(x);
</code></pre>
<pre><code data-trim contenteditable>
hi!
hi!
from g
</code></pre>
{:.fragment}

</section>

<section markdown="block" data-background="#440000">
## Oh yeah. Always use `let` or `const` (or `var`) when declaring variables plz

</section>

<section markdown="block">
## It's Functions All the Way Down

<div markdown="block" class="img" height="50%">
![turtles](http://upload.wikimedia.org/wikipedia/commons/4/47/River_terrapin.jpg)
</div>

[The world is really a flat plate supported on the back of a giant tortoise](http://en.wikipedia.org/wiki/Turtles_all_the_way_down);

(Let's look at nested functions)
</section>
<section markdown="block">
## Nested Functions

* __functions can be defined within functions__
* just create a function within another function using declarations, expressions or arrow functions
* the variables in the outer function are available to the inner function and can be used just by using the variable name (no new declaration is needed)
* but the variables in the inner function are local to the inner function
</section>

<section markdown="block">
## Without Const, Let, or Var Revisited

__Variables declared without `const`, `let`, or `var` actually reference the variable in nearest enclosing scope (if it's not a `const`) containing the name__ (usually global, but a bit tricky for nested functions).

<pre><code data-trim contenteditable>
let x = 1;
function f() {
  let x = 2;
  function g() {
    x = 3;
    console.log(x);
  }
  g(x);
  console.log(x);
}
f();
console.log(x);

</code></pre>
<pre><code data-trim contenteditable>
3
3
1
</code></pre>
{:.fragment}


</section>

<section markdown="block">
## Nested Functions Example

__What is the output of this code? What would happen if we put <code>console.log(y)</code> right at the end of function, <code>outer</code>'s body?__ &rarr;
<pre><code data-trim contenteditable>
const outer = function() {
	let x = "outside";
	let inner = function() {
		x += " modified by inside";
		let y = "inner";
	};
	console.log(x);
	inner();
	console.log(x);
};
outer();
</code></pre>
<pre><code data-trim contenteditable>
outside
outside modified by inside
// we would get a ReferenceError if we tried to print out y from the outer function
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Functions as Values

* functions are objects... and they can exist as __values__, like __numbers__, __strings__, etc.
* the names that we use for functions are just like regular __variables__
* reassignment works fine!

<pre><code data-trim contenteditable>
const sayHello = function() {
	console.log("Hola!");
};

sayHello();

sayHello = function(x) {
	return x * x
};

console.log(sayHello(5));
</code></pre>
</section>

<section markdown="block">
## Functions as Values Continued

You can even pass functions around, return them as values, etc. 

* __describe the first function__ &rarr;
* __what do you think the output of this code is?__ &rarr;

<pre><code data-trim contenteditable>
const callTwice = function(f) {
	f();
	f();
};

const g = function() {
	console.log("nobody's home!");
};
callTwice(g);
</code></pre>

<pre><code data-trim contenteditable>
nobody's home!
nobody's home!
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Function Declarations Revisited

__Let's take a look at function declarations again__ &rarr;

<pre><code data-trim contenteditable>
function f(x) {
	return x;
}
</code></pre>
</section>

<section markdown="block">
## Hoisting

However, functions defined in this manner, through _function declarations_, are __hoisted__ to the top of the scope:

* they're taken out of the usual flow of control
* and brought to the top of the scope
* even if they're defined below their first use, they'll still work...
* (this isn't true when you create functions via assignment)

<pre><code data-trim contenteditable>
console.log(f(5));

function f(x) {
	return x;
}
</code></pre>
</section>

<section markdown="block">
## Hoisting Continued

From {{ site.vars.book_js }}:

__What happens when you put such a function declaration inside an if statement or a loop?__ 

* don’t do that
* different JavaScript platforms in different browsers have traditionally done different things
* the latest standard actually forbids it
</section>

<section markdown="block">
## Time for Another Exercise!

### (Yes!)
</section>

<section markdown="block">
## A Quick Aside on Arrays 

An __Array__ literal, assignment and the __length__ property

<pre><code data-trim contenteditable>
const numbers = [1, 2, 3];
console.log(numbers[0]);
console.log(numbers.length);
// an empty array ... []
</code></pre>
</section>

<section markdown="block">
## Max Number

__Write a function that:__ &rarr;

* takes one parameter, an `Array` 
* assume that the `Array` will only 0 or more values that are of type, `Number` &rarr;
* the function should return the largest number in the `Array`
* if the `Array` is empty, just return undefined
</section>

{% comment %}
* Definingafunction
* Parametersandscopes
* Nestedscope.............................
* Functionsasvalues
* Declarationnotation
* Thecallstack
* OptionalArguments.........................
* Closure................................
* Recursion...............................
* Growingfunctions..........................
* Functionsandsideeffects
* Summary...............................
* Exercises
{% endcomment %}

