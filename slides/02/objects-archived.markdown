---
layout: slides
title: Objects
---
<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## Topics

* Objects, Object Creation
* Properties
* Methods
* String Methods
* Array Methods
* Math Methods 
* Modifying and Deleting Properties
* Detecting Properties
* Looping Over Objects
</section>

<section markdown="block">
## Types So Far

__What are the six types that we've learned so far?__ &rarr;

(sort of in order of how we've seen them)...
{:.fragment}

* {:.fragment} <code>number</code>
* {:.fragment} <code>string</code>
* {:.fragment} <code>boolean</code>
* {:.fragment} <code>undefined</code>
* {:.fragment} <code>function</code>
* {:.fragment} <code>object</code>
</section>

<section markdown="block">
## The One We Haven't Talked About ...

We've explored <code>numbers</code>, <code>strings</code>, <code>booleans</code>, <code>undefined</code> and <code>functions</code> a bit, but we haven't really talked about __objects__ yet.

<div class="fragment" markdown="block">
__Objects__ are essentially:

* an "arbitrary collections of properties" 
* ...and their associated values
* these properties can be added, removed and modified

<br>
__Can anyone think of analogous types in other languages?__ &rarr;

* __HashMaps__ in Java
* __associative arrays__ in PHP
* __dictionaries__ in Python
* __Hashes__ in Ruby
{:.fragment}

</div>
</section>

<section markdown="block">
## Creating Objects

Here's an example of an object (scroll over to see the whole thing):

<pre><code data-trim contenteditable>
var course = {name:'Applied Internet Technology', section:2, undergraduate:true};
</code></pre>

__Object literals__ consist of:

* surrounding curly braces - <code>{}</code>
	* an empty object is just <code>{}</code>
* property/value pairs separated by commas - <code>,</code>
* properties and values separated from each other with a colon - <code>:</code>
	* __properties that aren't valid variables names or valid numbers must be quoted__
	* for example: <code>{"still a property name":true}</code>
</section>

<section markdown="block">
## Object Literals Continued...

### Ah, that's better.

__Internal white space and newlines won't cause any syntax issues.__ &rarr;

* you could use them for formatting
* indentation also helps with readability

<pre><code data-trim contenteditable>
var course = {
    name:'Applied Internet Technology',
    section:2,
    undergraduate:true
};
</code></pre>
</section>

<section markdown="block">
## Properties

* __properties can be any value__, including numbers, strings, and booleans
* they can also contain other objects... __even functions__
* a __method__ is a __property that contains a function__
* __almost all JavaScript values have properties__
	* the only exceptions are <code>null</code> and <code>undefined</code>
	* strings, numbers and booleans _act like they have properties_
* which implies that __almost everything in JavaScript is an object__ (or again, _acts like_ an object for some values)!
</section>


<section markdown="block">
## Accessing Properties

Sooo... how do we access properties? Using our previous object:

<pre><code data-trim contenteditable>
var course = {
    name:'Applied Internet Technology',
    section:2,
    undergraduate:true
};
</code></pre>

There are two ways to access properties:

* the __dot operator__ 
<pre><code data-trim contenteditable>
// gives us 2
console.log(course.section);
</code></pre>
{:.fragment}
* __square brackets__
<pre><code data-trim contenteditable>
// gives us 2
console.log(course["section"]);
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Accessing Properties Continued

__What's the difference between the two ways of accessing properties?__ &rarr;
<pre><code data-trim contenteditable>
course.section;
course["section"];
</code></pre>

* when using __dot__, the part after the __dot__ directly names the property
	* the property name must adhere to the rules of valid variables names.  
	(__what were they again?__ &rarr;)
	* {:.fragment} start with a __letter__, __underscore__ ( <code>_</code> ), or __dollar__ ( <code>$</code> ) <!--_ -->
	* {:.fragment} following characters can be any of above, and/or __digits (0-9)__
* when using __square brackets__, the part within the brackets is evaluated and is used as the property name
	* this allows for _dynamically_ created property names
	* also allows property names that are not valid variable names <code>obj["I'm ok"] = true</code> (oof, maybe avoid that))
</section>

<section markdown="block">
## Hey Wait... 

Let's see some examples of these _so called_ properties (and methods) on some values that we've already seen. __Can you recall any?__ &rarr;

* {:.fragment} length is a property of both Strings and Arrays
<pre><code data-trim contenteditable>
var exclamation = 'wow!',
    listOfExclamations = ['golly!', 'gosh!'];
console.log(exclamation.length, listOfExclamations.length)
</code></pre>
{:.fragment}
* {:.fragment} log is a method of the built-in, global __console__ object
<pre><code data-trim contenteditable>
console.log("here's one!")
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## These Methods You Talk About Sound Intriguing 

### Let's take a look at some more methods!

* [Strings have a bunch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#Methods_2 )
* [Arrays do too](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#Methods_of_array_instances)
* We'll take a closer look at these when we go over strings and Arrays in the next set of slides
</section>

{% comment %}
<section markdown="block">
### Some Useful String Methods

(note... these methods don't mutate the original string)

* __split([separator][, limit])__ - splits a String object into an array of strings by separating the string into substrings - default is one element of original string if no separator is specified. &rarr;
* __toUpperCase()__ and __toLowerCase__ - um... self explanatory? &rarr;
* __slice(beginSlice[, endSlice])__ - extracts a section of a string and returns a new string starting at index, beginSlice, and going to end of string or endSlice
* __replace(regexp\|substr, newSubStr\|function[, flags])__ - returns a new string with some or all matches of a pattern replaced by a replacement (both substrings and regexes work) &rarr;
</section>

<section markdown="block">
### Some Useful Array Methods

(these methods actually modify the array that they're called on)

* __pop()__ - removes the last element from an array and returns that element
* __push(element1, ..., elementN)__ - adds one or more elements to the end of an array and returns the new length of the array
* __reverse()__ - reverses the order of the elements of an array — the first becomes the last, and the last becomes the first.
* __sort([compareFunction])__ - sorts the elements of an array in place and returns the array
* __splice(index, howMany[, element1[, ...[, elementN]]])__ - adds and/or removes elements from an array
</section>

<section markdown="block">
### And Even More Array Methods

* __join([separator = ','])__ &rarr; joins all elements of an array into a string using separator (default is comma)
* __slice(index, howMany[, element1[, ...[, elementN]]])__ -  returns a shallow copy of a portion of an array into a new array object
* __forEach(callback[, thisArg])__ - calls a function for each element in the array
* __every(callback[, thisArg])__ -  tests whether all elements in the array pass the test implemented by the provided function
</section>

<section markdown="block">
### Looping Over Arrays

Errrr. It looks like there are a lot of ways to do this. __What are they (there are three, and one of 'em is the old classic.__ &rarr;

* use a for loop
* use the forEach method
* use the every method
{:.fragment}

<br>
__Which one should we use?__ &rarr;
{:.fragment}

* the classic <code>for</code> loop is actually the fastest (though, for some engines, you'll have to cache the length!?)
* <code>forEach</code> and every are a little bit closer to what you're actually doing (_more expressive_)
	* though using a callback / dealing with scoping may be tricky
	* can't break out of <code>forEach</code>
	* can break out of <code>every</code> by returning <code>false</code> (you have to return <code>true</code> on every iteration, though)
{:.fragment}

</section>

<section markdown="block">
### Looping Over Arrays Part 1

Loop over <code>nums = [1, 2, 3, 4];</code> and print out double the value of every element. __Do this three ways__ &rarr;

<pre><code data-trim contenteditable>

// with classic for loop and length caching
for(var i = 0, cachedLength = nums.length; i < cachedLength; i++) {
	console.log(nums[i] * 2);
}
nums.every(doubleItLessThanThree);
</code></pre>
{:.fragment}
</section>

<section markdown="block">
### Looping Over Arrays Part 2

<pre><code data-trim contenteditable>
// with forEach (define callback first)
var doubleIt = function(x) {
	console.log(x * 2);
}
nums.forEach(doubleIt); 
</code></pre>

<pre><code data-trim contenteditable>
// with forEach (define callback first)
// with every and simulating break (define callback first)
var doubleItLessThanThree = function(x) {
	if (x >= 3) {
		return false;
	}
	console.log(x * 2);
	return true;
}

nums.every(doubleItLessThanThree);
</code></pre>
</section>

<section markdown="block">
## Again,With More Anonymous Functions

<pre><code data-trim contenteditable>
// with forEach
nums.forEach(function(num, i) {
	console.log(num * 2);
});

// with every and simulating break
nums.every(function(num, i) {
	if (num >= 3) {
		return false;
	}
	console.log(num * 2);
	return true;
});
</code></pre>
</section>
{% endcomment %}

<section markdown="block">
## Math! 

[There are a bunch of built-in objects that are available globally](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects). We've already seen some... like the <code>console</code> object or the <code>isNan()</code> and <code>parseInt</code> functions.

There's also the built-in <code>Math</code> object. It provides a bunch of miscellaneous [number crunching methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math#Methods)...

* the usual trig functions like __sin__, __cos__, etc.
* of course, __ceil__ and __floor__ (don't know? __let's try__ &rarr;) to round up or down
* ...and the related __round__
* __random__ - returns a random number between 0 and 1
</section>

{% comment %}
<section markdown="block">
## An Exercise

__Write a function called <code>humanReadableArray</code>:__ &rarr;

* it takes __one argument__, an __Array called items__, and it __returns a string__ representation of the Array 
*  the string representation of the Array is... 
	* an empty string if the incoming Array is empty: <code>[]</code> &rarr; <code>""</code>
	* the only item in the Array if the Array has just one element: <code>["Alice"]</code> &rarr; <code>"Alice"</code> 
	* item 1 and item 2 combined by using "and" if the Array has 2 elements: <code>["Alice","Bob"]</code> &rarr; "Alice and Bob"
	* all items separated by commas, with the last element joined with "and" (with a serial comma, of course!): <code>["Alice","Bob","Carol"]</code> &rarr; "Alice, Bob, and Carol" 

<br>
[By the way, who are Alice and Bob?](http://en.wikipedia.org/wiki/Alice_and_Bob)
</section>
{% endcomment %}

<section markdown="block">
## Reading, Modifying and Deleting

* if the property doesn't exist, we'll get back <code>undefined</code>:
<pre><code data-trim contenteditable>
// &rarr; gives us undefined
console.log(course.nothingToSeeHere);
</code></pre>
* you can assign values to properties by using the __<code>=</code> operator__:
<pre><code data-trim contenteditable>
course.nothingToSeeHere = 'maybe something';
console.log(course.nothingToSeeHere);
</code></pre>
* you can remove properties by using the __delete operator__:
<pre><code data-trim contenteditable>
delete course.nothingToSeeHere;
console.log(course.nothingToSeeHere);
</code></pre>

</section>


<section markdown="block">
## Detecting Properties

Note that if a property doesn't exist, reading that property yields <code>undefined</code>.

__Why might this be confusing?__ &rarr;

How can we distinguish between a property that actually exists, but is intentionally <code>undefined</code> versus a property that doesn't actually exist? 
{:.fragment}

</section>

<section markdown="block">
## Detecting Properties Continued

There are two ways to determine if a property actually exists (rather than being undefined by default). Using the previously defined <code>course</code> object:

__hasOwnProperty__ - method on all objects that tests if argument is property of object that hasOwnProperty is called on

<pre><code data-trim contenteditable>
// true
course.hasOwnProperty('name');

// false
course.hasOwnProperty('oh no, not here');
</code></pre>

__in__ - an operator that tests if left operand (a string or number) is property of object in right operand... picks up "inherited" properties

<pre><code data-trim contenteditable>
// true
'name' in course;

// false
'oh no, not here' in course;
</code></pre>

__Use hasOwnProperty for now... so you won't have to worry about "inherited" properties.__
</section>

<section markdown="block">
## Looping Over Properties

Use a <code>for (prop in obj)</code> loop:

* make sure that you use __hasOwnProperty__ in loop to exclude _inherited_ properties
* don't use this kind of loop for <code>Arrays</code>
	* does not preserve order
	* includes _inherited_ properties
<pre><code data-trim contenteditable>
for (property in course) {
	if (course.hasOwnProperty(property)) {
		console.log(property +  " is " + course[property]);
	}
}
</code></pre>
</section>
<section markdown="block">
## Some Behind the Scenes

In reality, though, <code>strings</code>, <code>numbers</code> and <code>booleans</code> aren't objects; they're __primitives__ (you know, kind of like Java).

However, as soon as you perform an _object-like_ operation on them, such as a method call:

* __JavaScript creates an actual String, Number or Boolean object that wraps that primitive...__
* and throws it away immediately, once the operations is done
* this does mean, however, that __you can't create arbitrary properties on primitives

<br>

[See this article on the _secret_ life of JavaScript primitives!](http://javascriptweblog.wordpress.com/2010/09/27/the-secret-life-of-javascript-primitives/)
</section>
{% comment %}
<section markdown="block">
## Topics

* Arrays
* almost everything in javascript is an object
* almost everything in javascript has values
	* there are primitives
	* accessing properties on primtives makes them behave like objects; but it's not what you think
* references
* mutability
* prototype yet?
* primitives

</section>
{% endcomment %}

