---
layout: slides
title: "Higher Order Functions"
---

<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}

<p><small></small></p>
</section>

<section markdown="block">
## Abstractions

__Abstraction__ is:

* the process of hiding away necessary, but immaterial details 
* ... to allow for a programmer to work more closely with the problem that is actually being solved

<br>
For example: 

* we abstract away the underlying machine when we use __high-level__ programming languages, like JavaScript and Python 
* whereas __low-level__ languages are tied closely to the architecture and organization of the machine that you're working on

</section>


<section markdown="block">
## Abstraction Continued

__What are some constructs for abstraction in Java?__

* {:.fragment} Classes (there's even a keyword, __abstract__... __what does that do__?)
* {:.fragment} Interfaces
* {:.fragment} Methods / Functions
</section>

<section markdown="block">
## Higher Order Functions as Constructs for Abstractions

A __higher order function__ is a function that does at least one of the following:

* takes a function or functions as a parameter (input)
* returns a function
</section>


<section markdown="block">
## You Might Know These Higher Order Functions From...

In languages where functions are _first class citizens_ it's common to have some implementation of the following __higher order functions__ that work with arrays:

* foreach - calls a function for every element in an array (no return value)
* map - calls a function on every element in an array to return a new array composed of those elements
* filter - creates and returns a new array composed of only elements that pass a supplied test function
* reduce - reduces an array to a single value, and returns that value

<br>
__Are you familiar with these functions?__ &rarr;

* array_walk, array_map, array_filter, array_reduce in PHP
* for in, map, filter, reduce in Python
{:.fragment}


</section>

<section markdown="block">
## We Can Implement All of These Higher Order Functions in JavaScript

### (Pssssst. They actually all exist as array methods, but let's try exploring their implementations.)
</section>

<section markdown="block">
# First, let's see why we would use these functions

### (think expressiveness, abstraction)
</section>

<section markdown="block">
## Array Traversal / Do Something With Every Element

__Write a quick loop. For every element in the following array, print it out.__ &rarr;

<code>var numbers = [1, 2, 3];</code>

<pre><code data-trim contenteditable>
for (var i = 0; i < numbers.length; i++) {
	var current = numbers[i];
	console.log(current); 
}

</code></pre>
</section>

<section markdown="block">
## Seems Pretty Conventional

Easy, but... for code that just prints out every element, __we have to do a bunch of extra things that / deal with some practical, yet immaterial details... like__: &rarr;

* use a _counter variable_ <code>i</code>
* continually check against the array's length
* pick out / index the current element 
{:.fragment}

<br>
__What are some places where we could accidentally make a mistake?__ &rarr;

* inadvertently reuse the <code>i</code> variable
* misspell _lenght_ 
* confuse the <code>i</code> and <code>current</code> variables (are we looking at the index or the actual current element!)
* (I know... a for loop isn't _that difficult_ to deal with)
{:.fragment}
</section>

<section markdown="block">
## Let's Create a Function

__One simple abstraction is to hide the details of the iteration by creating a function called logEach.__ &rarr;

* it'll take an array as a parameter 
* ... and just print out every element

<pre><code data-trim contenteditable>
var numbers = [1, 2, 3];
function logEach(arr) {
	for (var i = 0; i < arr.length; i++) {
		console.log(arr[i]); 
	}
}
logEach(numbers);
</code></pre>
{:.fragment}
</section>
<section markdown="block">
## Ok, the logEach Function was Pretty Straightforward

But... what if we want to perform a different action instead of printing out each element? We could:

* create a function for each action that we want to perform
* __abstract out the action so that it's passed in as a parameter__ &rarr;
{:.fragment}
</section>
<section markdown="block">
## Our Implementation of forEach

__Create a function called <code>forEach</code>.__ &rarr;

* it'll take two parameters, the array, <code>arr</code>, and some sort of function, <code>action</code>
* it will run the function for every element in the array

<pre><code data-trim contenteditable>
var numbers = [1, 2, 3];
function forEach(arr, action) {
	for (var i = 0; i < arr.length; i++) {
		action(arr[i]); 
	}
}
// instead of just logging each number as is, log the square of ever number
forEach(numbers, function(arrayElement) { console.log(arrayElement * arrayElement)});
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Great We've Just Implemented ForEach!

__What are some advantages?__

* no indexing, convenient, eh?
* reads more clearly / like natural language

<br>
__Of course, JavaScript already has a [forEach implementation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach):__

* simply a method called on an array object
* works off of the elements of the object it's called on, so it only needs one parameter, the __callback__
* callback is executed with element value, element index and original array object
* doesn't return anything (gives back undefined)
</section>

{% comment %}
<section markdown="block">
# Here's a hint for the homework - (a trivial function to write, so kind of harmless)

</section>
{% endcomment %}

<section markdown="block">
## generateCards

__Write a function that creates a deck of cards. The function will__ &rarr;

* generate and return an array of card objects
* each card object has a suit (♠, ♥, ♦, ♣) and a face (the strings '2' .. '10', 'J', 'Q', 'K', 'A')
* the 52 resulting objects should represent every combination of suit and face
* example list with two card objects: <code>[{ suit: '♣', face: '2' }, { suit: '♦', face: '6' } ]</code>
* example usage: <code>var cards = generateCards()</code>
</section>
<section markdown="block">
## generateCards with Standard For Loop

<pre><code data-trim contenteditable>
var generateCards = function() {
	var suits = ['♠','♥','♦','♣'],
        faces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
        cards = [];
	for(var i = 0; i < suits.length; i++) {
		for(var j = 0; j < faces.length; j++) {
			cards.push({'suit':suits[i], 'face':faces[j]}); 
		}
	}
	return cards;
};
console.log(generateCards());

</code></pre>
</section>

<section markdown="block">
## generateCards with forEach

__Perhaps slightly more expressive: only dealing with suit and face in the forEach loops__... &rarr;

<pre><code data-trim contenteditable>
var generateCards = function() {
	var suits = ['♠','♥','♦','♣'],
        faces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
        cards = [];
	suits.forEach(function(suit) {
		faces.forEach(function(face) {
			cards.push({'suit':suit, 'face':face}); 
		});
	});
	return cards;
};
console.log(generateCards());
</code></pre>
</section>

<section markdown="block">
## A Few Other Notes on Both Implementations

* all variables are declared at the top of the function (__why?__ &rarr;) <span class="fragment">...to avoid ambiguities when a variable declaration is hoisted</span>
* the formatting of the variable declarations is one per line, indented... in a single statement
* __indentation__ for both nested <code>for</code> loops and nested <code>forEach</code> calls greatly helps readability
* either function works fine!
	* forEach - more expressive / reads more naturally, less complexity
	* for - slightly faster
</section>


<section markdown="block">
## Filtering an Array

__Create a function called filter that filters an array by:__ &rarr;

* taking an array as one argument and a function, a test, as the other
* it should return an entirely new array populated with only the elements that pass the test
* test by using it to keep only the odd numbers in an array of numbers

<pre><code data-trim contenteditable>
function filter(arr, test) {
	var filtered = [];
	arr.forEach(function(element) {
		if(test(element)) {
			filtered.push(element)
		}
	});
	return filtered;
}
result = filter([1, 2, 3, 4], function(x) { 
	return x % 2 == 1;
});
console.log(result);
</code></pre>
{:.fragment}
</section>
<section markdown="block">
## Using Filter!

Again, JavaScript arrays already have a [filter method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter): 

* an array method, so only one parameter, a callback function (the test) ... no need to pass in the array
* callback is executed with element value, element index and original array object
* callback returns either true or false
* filter returns a new filtered array

<br>
__Try using it to filter our deck of cards so that we only have cards that have a numeric value that's less than or equal to 3__ &rarr;

<pre><code data-trim contenteditable>
var deck = generateCards();
var filtered = deck.filter(function(card) {
	return parseInt(card.face, 10) <= 3;
});
console.log(filtered);
</code></pre>
{:.fragment}
</section>

