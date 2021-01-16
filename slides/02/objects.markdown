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
* Math Methods 
* Modifying and Deleting Properties
* Mutability
* Detecting Properties
* Looping Over Objects
</section>
<section markdown="block">
## Types (Again) According to the Specification

[The ECMAScript 5 specifications list 6 types, but they're not the ones that typeof returns](http://www.ecma-international.org/ecma-262/5.1/#sec-8) (of course!):

* <code>Undefined</code>
* <code>Null</code>
* <code>Boolean</code>
* <code>String</code>
* <code>Number</code>
* <code>Object</code>
* We didn't talk about this, but also... <code>Symbol</code> (ES6)

</section>

<section markdown="block">
## Ok... So What About typeof?

1. number
2. string
3. boolean
4. object
5. function
6. undefined 
{:.fragment}

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

<br>
(Note that ES6 introduces a `Map` data structure because objects carry excess baggage, such as inherited properties, with them, making them poor substitutes for _actual_ maps)

</div>
</section>

<section markdown="block">
## Creating Objects

Here's an example of an object:

<pre><code data-trim contenteditable>
const course = {name:'AIT', section:8, undergraduate:true};
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
const course = {
    name:'Applied Internet Technology',
    section:8,
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
## ES6 Shorthand Property Names

__There's also a shortcut to creating properties and values if you already have variables defined.__  &rarr;

* In ES6...
* creating an object that consists of only variable names
* will initialize an object with those variable names as properties

<br>

<pre><code data-trim contenteditable>
const a = 'foo';
const b = 'baz';
const obj = { a, b};
console.log(obj)
</code></pre>

</section>

<section markdown="block">
## Accessing Properties

Sooo... how do we access properties? Using our previous object:

<pre><code data-trim contenteditable>
const course = {
    name:'Applied Internet Technology',
    section:8,
    undergraduate:true
};
</code></pre>

There are two ways to access properties:

* the __dot operator__ 
<pre><code data-trim contenteditable>
// gives us 8
console.log(course.section);
</code></pre>
{:.fragment}
* __square brackets__
<pre><code data-trim contenteditable>
// gives us 8
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
## Dynamic Properties

__To clarify the use of brackets for property access, let's examine this scenario. The code below...__ &rarr;

1. asks for user input, specifying a key / property name
2. and _should_ output the value at the key

<pre><code data-trim contenteditable>
// using the same object from previous slides...
const course = { name:'Applied Internet Technology', section:8, undergraduate:true };
</code></pre>

<pre><code data-trim contenteditable>
// setting up user input
const readline = require('readline');
const p = readline.createInterface({ input: process.stdin, output: process.stdout });
p.question('Type in an object key\n>', function (resp) {
	// TODO: print value at key
    p.close();
});
</code></pre>

Here, we have to use bracket notation: `console.log(course[resp])`.
{:.fragment}
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
## Methods (Again)

It's worthwhile to repeat that __an object property can be a function__. 

* if object's property is a function, it's sometimes called a __method__
* let's try creating some methods...

<pre><code data-trim contenteditable>
const obj = {};
function f() {
    console.log("Hi, I'm a method!");
}
obj.doStuff = f;
</code></pre>
{:.fragment}

<pre><code data-trim contenteditable>
const obj = {
    doStuff: function() {
        console.log("Hi, I'm a method!");    
    },
};
</code></pre>
{:.fragment}

<pre><code data-trim contenteditable>
const obj = {};
obj.doStuff = function() {
    console.log("Hi, I'm a method!");    
};
</code></pre>
{:.fragment}

</section>

<section markdown="block">
## ES6 Shorthand Methods

It's pretty __common to create methods on objects__, so __ES6 introduces a shortcut for creating methods on objects__ simply by setting properties equal to function expressions: &rarr;

<pre><code data-trim contenteditable>
const obj = {
    f() {console.log('fffff!');},
    g() {console.log('ggggg!');},
};
obj.f();
obj.g();
</code></pre>
{:.fragment}

Contrast this with the ES5 way of creating methods:
{:.fragment}

<pre><code data-trim contenteditable>
const obj = {
  f: function() {console.log('fffff!');},
  g: function() {console.log('ggggg!');},
};
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Whew. Back to Objects. The Math One

[There are a bunch of built-in objects that are available globally](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects). We've already seen some... like the <code>console</code> object or the <code>isNan()</code> and <code>parseInt</code> functions.

There's also the built-in <code>Math</code> object. It provides a bunch of miscellaneous [number crunching methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math#Methods)...

* the usual trig functions like __sin__, __cos__, etc.
* of course, __ceil__ and __floor__ (don't know? __let's try__ &rarr;) to round up or down
* ...and the related __round__
* __random__ - returns a random number between 0 and 1
</section>


<section markdown="block">
## Reading, Modifying and Deleting

* __if the property doesn't exist__, we'll get back <code>undefined</code>:
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
## Objects and Mutability

__Uh... so what's the implication here regarding objects and mutability?__ &rarr;

* {:.fragment} clearly __objects are mutable__
    * functions are objects; they're mutable too!
    * arrays are objects; they're mutable too (we'll see this again later)!
* {:.fragment} primitives (such as numbers, strings, booleans, null, and undefined) are not, though! 
</section>

<section markdown="block">
## Mutability and References

__What will this print out?__ &rarr;

<pre><code data-trim contenteditable>
const a = {'foo':1, 'bar':2};
const b = a;
b['baz'] = 3;
b.qux = 4;
console.log(a);
</code></pre>

<pre><code data-trim contenteditable>
{ foo: 1, bar: 2, baz: 3, qux: 4 }
</code></pre>
{:.fragment}

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

There are two ways to determine if a property actually exists (rather than being undefined by default). Using the <code>course</code> object from before:

* {:.fragment} __hasOwnProperty__ - method on all objects that tests if argument is property of object that hasOwnProperty is called on
* {:.fragment} <pre><code data-trim contenteditable>
course.hasOwnProperty('name'); // true
course.hasOwnProperty('oh no, not here'); // false
</code></pre>
* {:.fragment} __in__ - an operator that tests if left operand (a string or number) is property of object in right operand... picks up "inherited" properties
* {:.fragment} <pre><code data-trim contenteditable>
'name' in course; // true
'oh no, not here' in course; // false
</code></pre>

<br>

__Use hasOwnProperty for now... so you won't have to worry about "inherited" properties.__
{:.fragment}
</section>

<section markdown="block">
## Looping Over Properties

__Use a <code>for (const prop in obj)</code> loop:__ &rarr;

* {:.fragment} note that prop can be `const` declared
* {:.fragment} make sure that you use `obj`.__hasOwnProperty__ in loop to exclude _inherited_ properties
* {:.fragment} avoid using this kind of loop for <code>Arrays</code>
	* does not preserve order

<pre><code data-trim contenteditable>
for (const property in course) {
	if (course.hasOwnProperty(property)) {
		console.log(property +  " is " + course[property]);
	}
}
</code></pre>
{:.fragment}
</section>
<section markdown="block">
## Some Behind the Scenes

In reality, though, <code>strings</code>, <code>numbers</code> and <code>booleans</code> aren't objects; they're __primitives__ (you know, kind of like Java).

However, as soon as you perform an _object-like_ operation on them, such as a method call:

* __JavaScript creates an actual String, Number or Boolean object that wraps that primitive...__
* and throws it away immediately, once the operations is done
* this does mean, however, that __you can't create arbitrary properties on primitives__

<br>

[See this article on the _secret_ life of JavaScript primitives!](http://javascriptweblog.wordpress.com/2010/09/27/the-secret-life-of-javascript-primitives/)
</section>

<section markdown="block">
## And Finally... JSON


__JSON or _JavaScript Object Notation_ is a data storage and communication format__ based off of JavaScript object literals... but with a few modifications:

* {:.fragment} all property names are surrounded by __double quotes__
* {:.fragment} values are restricted to __simple data__: no function calls, variables, comments or computations


<br>
Conversion to-and-from JSON can be done using the following methods on the built-in JSON object:
{:.fragment}

* [`stringify(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) - returns a JSON string representation of the value passed in
* [`parse(text)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) - returns an object created from the supplied JSON text
* for example: `JSON.parse("[1, 2, 3]")`
{:.fragment}

</section>


{% comment %}
* for-of
* shorthand properties
* shorthand methods

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

