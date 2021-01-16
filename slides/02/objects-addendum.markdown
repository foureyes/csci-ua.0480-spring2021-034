---
layout: slides
title: Objects Addendum
---
<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>
<section markdown="block">
## Objects and Mutability

__Objects are _mutable_.__ (__What does that mean?__) &rarr;

* {:.fragment} objects can be changed
* {:.fragment} ...for example, creating new properties on-the-fly: <br> <code>obj.newProp = 5</code>
* {:.fragment} __arrays are objects; they're mutable too!__

<br>
Numbers, strings and booleans are all immutable!
{:.fragment}
</section>

<section markdown="block" data-background="#440000">
## Numbers, strings and booleans are immutable!
</section>

<section markdown="block">
## Working With Arrays

Because __arrays are mutable__, we have to be careful when we work with them. 

For example, we can create functions that work on arrays:

*  __in place__  (that is, change the elements in the array itself)
* ... or __return an entirely new array__ with the elements of the original array changed

<br>
(__Let's see...__ &rarr;)
</section>

<section markdown="block">
## Double Values, New Array

__Create a function called doubleValues.__ &rarr;

* it should have one parameter, an array called <code>arr</code>
* it should return an entirely new array, with the elements of the original array doubled
* double each element by multiplying by 2 (regardless of the type)
</section>

<section markdown="block">
## Double Values, New Array, Implementation

__What do you think the following code prints out?__ &rarr;
<pre><code data-trim contenteditable>
var numbers = [1, 2, 3];
var doubleValues = function(arr) {
	var doubled = [];
	for(var i = 0; i < arr.length; i++) {
		doubled.push(arr[i] * 2);
	}
	return doubled;
};
result = doubleValues(numbers);
console.log(numbers);
console.log(result);
</code></pre>

<pre><code data-trim contenteditable>
[1, 2, 3]
[2, 4, 6]
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Double Values, In Place

__Create a function called doubleValuesInPlace.__ &rarr;

* it should have one parameter, an array called <code>arr</code>
* it should double each element in place by multiplying each element by 2 (regardless of the type)
* it does not return a value
</section>

<section markdown="block">
## Double Values, In Place, Implementation

__What do you think the following code prints out?__ &rarr;
<pre><code data-trim contenteditable>
var numbers = [1, 2, 3];
var doubleValuesInPlace = function(arr) {
	for(var i = 0; i < arr.length; i++) {
		arr[i] *= 2;
	}
};
result = doubleValuesInPlace(numbers);
console.log(numbers);
console.log(result);
</code></pre>

<pre><code data-trim contenteditable>
[2, 4, 6]
undefined
</code></pre>
</section>


<section markdown="block">
# Which leads us to call-by-sharing

</section>
<section markdown="block">
## Call By Sharing

It's not quite __pass-by-value__, and it's not quite __pass-by-reference__:

* "assignments to function arguments within the function aren't visible to the caller" 
* "however since the function has access to the same object as the caller (no copy is made), mutations to those objects, if the objects are mutable, within the function are visible to the caller"

<br>
Um ok. __What does that mean?__ &rarr;

</section>

<section markdown="block">
## Call By Sharing Continued

__What is the output of the following code?__ &rarr;
<pre><code data-trim contenteditable>
var p = {'x':5, 'y':3}; 
var changePoint = function(point, distance) {
	point.x = 0;
	console.log('in function:', point);
};
changePoint(p);
console.log('outside', p);
</code></pre>

<pre><code data-trim contenteditable>
in function: { x: 0, y: 3 }
outside { x: 0, y: 3 }
</code></pre>
{:.fragment}

__We can mutate the original object passed in!__
{:.fragment}

</section>
<section markdown="block">
## And Even More Call By Sharing

__What is the output of the following code?__ &rarr;
<pre><code data-trim contenteditable>
var p = {'x':5, 'y':3}; 
var changePoint = function(point, distance) {
	point = {};
	console.log('in function:', point);
};
changePoint(p);
console.log('outside', p);
</code></pre>

<pre><code data-trim contenteditable>
in function: {}
outside { x: 5, y: 3 }
</code></pre>
{:.fragment}

__The code outside of the function doesn't see the reassignment!__
{:.fragment}
</section>
<section markdown="block">
## A Quick Summary

__A function...__ &rarr;

* can mutate a mutable object passed in as a parameter 
* can reassign a mutable or an immutable object
	* but that reassignment is only within the scope of the function
	* (the caller is not affected by the reassignments)
* can't mutate an immutable object (obvs!) passed in as a parameter

<br>
Some references:

* [an article on JavaScript references](http://skilldrick.co.uk/2010/12/clearing-up-the-confusion-around-javascript-references/)
* [the wikipedia article on call by sharing](http://en.wikipedia.org/wiki/Evaluation_strategy#Call_by_sharing)
* [call by sharing in Python](http://effbot.org/zone/call-by-object.htm)
</section>

<section markdown="block">
## Arguments Object

When a function is called, it gets an __arguments__ object in its context, along with its defined parameters (and __this__, but we'll talk about that later). __Let's see this in action.__ &rarr;


<pre><code data-trim contenteditable>
var f = function() {
    // btw... ok - I get the funny coercion rules now
    console.log("number of args " + arguments.length);
    for (var i = 0, j = arguments.length; i < j; i++) {
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
* you can get it's length
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
## Mutability and References

__What will this print out?__ &rarr;
<pre><code data-trim contenteditable>
a = [1, 2, 3];
b = a;
b.push(4);
console.log(a, b);
</code></pre>

<pre><code data-trim contenteditable>
[ 1, 2, 3, 4 ] [ 1, 2, 3, 4 ]
</code></pre>
{:.fragment}

(We can use the slice method to copy an Array instead of _aliasing_: <code>a.slice()</code>) 
{:.fragment}
</section>

<section markdown="block">
## And Finally... JSON


JSON or _JavaScript Object Notation_ is a data storage and communication format based off of JavaScript object literals... but with a few modifications:

* all property names are surrounded by double quotes
* values are restricted to simple data: no function calls, variables, comments or computations


<br>
Conversion to-and-from JSON can be done using the following methods on the built-in JSON object:

* [stringify(value)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) - returns a JSON string representation of the value passed in
* [parse(text)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) - returns an object created from the supplied JSON text

</section>
