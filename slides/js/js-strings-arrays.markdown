---
layout: slides
title: "Strings and Arrays"
---

<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number }}

<p><small></small></p>
</section>

<section markdown="block">
## Strings and Arrays

First... a quick note.

* __Strings__ are primitives. They just _act_ like objects when they're called upon to do so
    <pre><code data-trim contenteditable>
const s = "I'm not really an object";
s.message = "prove it!"
console.log(s.message);
</code></pre>
* Uh turns out that <code>Arrays</code> are actually _just_ objects (they're not a separate type on their own)

</section>

<section markdown="block">
## Strings

__They're pretty unremarkable (whew!)__ &rarr;

* just an ordered sequence of characters
* they're __immutable__
* a string literal can be constructed with single or double quotes: <code>'</code> or <code>"</code>
* backslash escapes the next character (new line, tab, literal backslash, etc.)
* the <code>.length</code> property contains the number of characters in a string
* you can get a specific character by using the indexing operator: myString[0] ...
* (negative indexes don't work, you'll have to use myString.length - 1 for the last index)

</section>
<section markdown="block">
## Arrays

<code>Arrays</code> though... __are a little strange__.  First - 2 ways to create an Array:

1. {:.fragment} literal (square brackets with comma separated values): <code>[1, 2, 3]</code> 
    * an empty array is just open and close bracket: <code>[]</code>
    * you can index with brackets, and you can retrieve the number of elements using <code>.length</code>
2. {:.fragment} you may see Arrays created with an <code>Array</code> constructor
    * __but be careful when using the `Array` constructor__!!!
    * {:.fragment} with a single `Number` argument, it creates an <code>Array</code> of that length
    * {:.fragment} ...anything else constructs an Array with the arguments as elements
        <pre><code data-trim contenteditable>
new Array(2) // an array with two empty elements !?!?!?! 
new Array('abc') // ['abc'] oookaaaay
new Array(2, 4, 6) // [2, 4, 6] sure!
</code></pre>
</section>

<section markdown="block">
## Arrays are What?

__Also, <code>Arrays</code> are _actually just objects_. This means that their indexes are properties.__ &rarr;

* {:.fragment} indexes don't have to be contiguous!?
* {:.fragment} you can have _holes_ in your arrays (length counts them as elements, though):
    <pre><code data-trim contenteditable>
const a = [];
a[0] = 'ok'
a[4] = 'where are the previous elements?'
console.log(a);
console.log(a.length);
</code></pre>
* {:.fragment} generally, avoid doing this... behavior when working with <code>Array</code> holes varies depending on what you're doing!
* {:.fragment} [there's actually a section in the book devoted to this](http://speakingjs.com/es5/ch18.html#array_holes)
</section>

<section markdown="block">
## String and Array Methods

Strings are object like when you want them to be, and Arrays are secretly objects. __They both have a bunch of built-in methods.__ &rarr;

* [Strings have a lot](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#Methods_2 )
* [Arrays do too](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#Methods_of_array_instances)
</section>


<section markdown="block">
## Some Useful String Methods

__Note that these methods don't change the original string that they're called on:__ &rarr;

* [split([separator][, limit])](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split) - splits a String object into an array of strings by separating the string into substrings - default is one element of original string if no separator is specified. &rarr;
* [toUpperCase()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase) and [toLowerCase()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase) - um... self explanatory? &rarr;
* [slice(beginSlice[, endSlice])](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice) 
	* extracts a section of a string and returns a new string starting at index, beginSlice, and going to end of string or up to, but not including endSlice <code>"racecar".slice(1, 4)</code> &rarr; <code>'ace'</code>
	* negative values for both parameters are ok (treated as length + index value): <code>"racecar".slice(0, -1)</code> &rarr; <code>'raceca'</code>
* [replace(regexp\|substr, newSubStr\|function[, flags])](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace) - returns a new string with some or all matches of a pattern replaced by a replacement (both substrings and regexes work) &rarr;
</section>

<section markdown="block">
## Some Useful Array Methods

__These methods *modify* the array that they're called on!__ &rarr;

* [pop()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop) - removes and returns the last element from the array 
* [push(element1, ..., elementN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push) - adds one or more elements to the end of an array and __returns the new length__ of the array
* [reverse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse) - reverses the order of the elements of an array — the first becomes the last, and the last becomes the first.
* [sort([compareFunction])](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) 
	* sorts the elements of an array in place and returns the array (default sort is by unicode code point value)
	* <code>compareFunction(a, b)</code> &rarr; <code>return</code> <code>-1</code>, <code>0</code>, or <code>1</code>
* [splice(index, howMany[, element1[, ...[, elementN]]])](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
	* adds and/or removes elements from an array, starting at <code>index</code>... and removing <code>howMany</code> elements
	* __returns spliced elements as array__
	* negative <code>index</code> - begin that many elements from end
</section>

<section markdown="block">
## And Even More Array Methods

__These don't mutate the array that they're called on.__ &rarr;

* [slice(index, howMany[, element1[, ...[, elementN]]])](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) -  returns a shallow copy of a portion of an array into a new array object
	* called with no arguments - copies entire array (start at index 0, end at last element)
* [join([separator = ','])](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join) - joins all elements of an array into a string using separator (default is comma)
* [forEach(callback[, thisArg])](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) - calls a function for each element in the array
* [every(callback[, thisArg])](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every) -  tests whether all elements in the array pass the test implemented by the provided function
* [indexOf(searchElement[, fromIndex=0])](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf) - returns index of searchElement or -1 if not found
</section>

<section markdown="block">
## Splice and Slice

These methods may not be so intuitive, so __let's go over them in depth__. &rarr;

</section>
<section markdown="block">
## Splice

<code>splice</code> __removes elements__ (in place) from an Array, and __optionally inserts elements__.

* 1st parameter, <code>start</code> specifies the index (inclusive) to start modifying the Array 
	* negative indexes start from left
	* indexes greater than last index is set to the last index
* 2nd parameter, <code>deleteCount</code> specifies the number of elements to be deleted
	* omitting this argument will cause all elements after <code>start</code> to be removed
</section>

<section markdown="block">
## Splice Continued

* __all arguments after the second parameter are elements that will be added to the original Array__
	* these elements will be inserted at the <code>start</code> specified
	* if there are no parameters after the second, <code>splice</code> will only remove elements
* __returns the elements removed as an Array__
</section>

<section markdown="block">
## TL;DR

* <code>splice</code> removes elements from an existing Array
* it optionally replaces those elements with _other_ elements
* it gives back the elements that were removed as an Array

</section>
<section markdown="block">
## Splice Examples

Using the following code, <code>a = [2, 4, 6, 8, 10, 12]</code>,  __what is the new content of a... and what is returned... after calling splice (assume a is reset each time)?__ &rarr;

<pre><code data-trim contenteditable>
a.splice(2);
a.splice(2, 2);
a.splice(-2);
a.splice(2, 2, 1, 1);
</code></pre>

<pre><code data-trim contenteditable>
returned: [ 6, 8, 10, 12 ], a: [ 2, 4 ]
returned: [ 6, 8 ],         a: [ 2, 4, 10, 12 ]
returned: [ 10, 12 ],       a: [ 2, 4, 6, 8 ]
returned: [ 6, 8 ],         a: [ 2, 4, 1, 1, 10, 12 ]
</code></pre>
{:.fragment}

</section>

<section markdown="block">
## Splice vs Slice 

They sound the same! __They do different stuff though!__ ... totally different stuff.

Think of <code>slice</code> as a way of copying a sub-Array from an existing an Array.

* parameter 1, <code>begin</code>, is the start index (inclusive) of the sub-Array to be copied out
	* begins at index 0 if it is not specified
	* negative starts from end
* parameter 2, <code>end</code>, is the end of the sub-Array (exclusive ... so goes up to, but does not include)
	* ends at last index if not specified
	* negative starts from end
* think slices in Python lists
* __it does not alter the original Array__

</section>

<section markdown="block">
## Slice Examples

__What is the output of the following code?__ &rarr;

<pre><code data-trim contenteditable>
a = [2, 4, 6, 8];
console.log(a.slice());
console.log(a.slice(1));
console.log(a.slice(1, 3));
console.log(a.slice(-1));
console.log(a);
</code></pre>

<pre><code data-trim contenteditable>
[ 2, 4, 6, 8 ]
[ 4, 6, 8 ]
[ 4, 6 ]
[ 8 ]
[ 2, 4, 6, 8 ]
</code></pre>
{:.fragment}

</section>

<section markdown="block">
## Arrays and Mutability

__What's the output of this code?__ &rarr;

<pre><code data-trim contenteditable>
a = [1, 2, 3];
b = a;
a.push(4);
console.log(b);
</code></pre>

<code>[1, 2, 3, 4]</code>
{:.fragment}

Remember... <code>Arrays</code> are just objects anyway (so, yeah, they're mutable).
{:.fragment}

</section>

<section markdown="block">
## Using Slice to Copy 

__A common way of duplicating an Array is to use slice.__ &rarr;

<pre><code data-trim contenteditable>
const a = [1, 2, 3];
const b = a.slice();
a.push(4);
console.log(b);
</code></pre>

* er... be careful, though...
* object references are copied which means they'll still refer to the same object
* __what is the output of the code below?__ &rarr;

<pre><code data-trim contenteditable>
const a = [{}, 2, 3];
const b = a.slice();
b[0].tricky = 'yup, same object';
console.log(a);
</code></pre>

<pre><code data-trim contenteditable>
[ { tricky: 'yup, same object' }, 2, 3 ]
</code></pre>
{:.fragment}

<a href="http://pythontutor.com/javascript.html#code=const+a+%3D+%5B%7B%7D,+2,+3%5D%3B%0Aconst+b+%3D+a.slice(%29%3B%0Ab%5B0%5D.tricky+%3D+'yup,+same+object'%3B%0Aconsole.log(a%29%3B&mode=display&origin=opt-frontend.js&cumulative=false&heapPrimitives=false&textReferences=false&py=js&rawInputLstJSON=%5B%5D&curInstr=3)">See the diagram</a>
{:.fragment}

</section>

<section markdown="block">
## Spread to Copy

As of ES6, you can also use __spread syntax__ to copy an Array:

<pre><code data-trim contenteditable>
const numbers = [1, 2, 3, 4];
const copy = [...numbers]
</code></pre>

1. in your `Array` literal
2. add three dots 
3. followed by the name of the Array you're copying
4. only goes one-level deep (shallow)
5. note that you can also use this on multiple Arrays (to __concatenate__):
    <pre><code data-trim contenteditable>
const words1 = ['foo', 'bar'];
const words2 = ['baz', 'qux'];
const allWords = [...words1, ...words2]
</code></pre>
{:.fragment}

[See more about spread syntax on mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator#Copy_an_array)
{:.fragment}



</section>


<section markdown="block">
## Back to Arrays and Mutability

__Objects are _mutable_.__ (__What does that mean?__) &rarr;

* {:.fragment} objects can be changed
* {:.fragment} ...for example, creating new properties on-the-fly: <br> <code>obj.newProp = 5</code>
* {:.fragment} __arrays are objects; they're mutable too!__

<br>
Numbers, strings and booleans are all immutable!
{:.fragment}
</section>

<section markdown="block" data-background="#440000">
## Um. Again... Numbers, strings and booleans are immutable!
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
const numbers = [1, 2, 3];
const doubleValues = function(arr) {
	const doubled = [];
	for(let i = 0; i < arr.length; i++) {
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
const numbers = [1, 2, 3];
const doubleValuesInPlace = function(arr) {
	for(let i = 0; i < arr.length; i++) {
		arr[i] *= 2;
	}
};
const result = doubleValuesInPlace(numbers);
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
Note that __semantics of these phrases differ based on language / community__! better to just describe the behavior as above.
{:.fragment}

<br> 
Lastly, TL;DR - similar behavior in Java and Python
{:.fragment}


</section>

<section markdown="block">
## Call By Sharing Continued

__What is the output of the following code?__ &rarr;
<pre><code data-trim contenteditable>
const p = {'x':5, 'y':3}; 
const changePoint = function(point, distance) {
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
const p = {'x':5, 'y':3}; 
const changePoint = function(point, distance) {
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
## indexOf

If you'd like to find something in an Array, you can use the <code>indexOf</code> method. ([see the docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)).

* it returns the index of first occurrence of an element
* -1 if the element doesn't exist
* it has an optional start index as the second arg (where to start the search from)

<pre><code data-trim contenteditable>
console.log([1, 3, 3, 7].indexOf(3));
console.log([1, 3, 3, 7].indexOf(8));
console.log([1, 3, 3, 7].indexOf(3, 2));
</code></pre>

</section>
<section markdown="block">
## Looping Over Arrays

Errrr. It looks like there are a lot of ways to do this. __What are they (there are three, and one of 'em is the old classic.__ &rarr;

* use a for loop
* use the forEach method
* use for...of
{:.fragment}

<br>
__Which one should we use?__ &rarr;
{:.fragment}

* the classic <code>for</code> loop is actually the fastest (though, for some engines, you'll have to cache the length!?)
* <code>forEach</code> and every are a little bit closer to what you're actually doing (_more expressive_)
	* though using a callback / dealing with scoping may be tricky
	* can't break out of <code>forEach</code>
* `for of` - ES6 syntax that allows looping over every element in an iterable object
{:.fragment}

</section>

<section markdown="block">
### Looping Over Arrays Part 1

Loop over <code>nums = [1, 2, 3, 4];</code> and print out double the value of every element. __Do this three ways__ &rarr;

<pre><code data-trim contenteditable>

// with classic for loop and length caching
for(let i = 0, cachedLength = nums.length; i < cachedLength; i++) {
	console.log(nums[i] * 2);
}
</code></pre>
{:.fragment}
</section>

<section markdown="block">
### Looping Over Arrays Part 2

<pre><code data-trim contenteditable>
// with forEach (define callback first)
const doubleIt = function(x) {
	console.log(x * 2);
}
nums.forEach(doubleIt); 
</code></pre>

(Or with an anonymous function)

<pre><code data-trim contenteditable>
// with forEach
nums.forEach(function(num, i) {
	console.log(num * 2);
});

</code></pre>

</section>

<section markdown="block">
### And Part 3: for...of

__Use for...of__. It's similar in expressiveness to `forEach`, but only available in ES6 &rarr;

<pre><code data-trim contenteditable>
const words = ['foo', 'bar', 'baz']
for (let w of words) {
    console.log(words);
}
</code></pre>

* you can use `break` and `continue`!
* can be used to go over other iterable objects, like strings, the arguments object, etc.

</section>

<section markdown="block">
## Arrays are Mutable

Arrays are really just objects. Sooo this example should look familiar.  __What will this print out?__ &rarr;
<pre><code data-trim contenteditable>
a = [1, 2, 3]
b = a;
b.push(4);
console.log(a);
</code></pre>

<pre><code data-trim contenteditable>
[1, 2, 3, 4]
</code></pre>
{:.fragment}

(We can use the slice method to copy an Array instead of _aliasing_: <code>a.slice()</code>) 
{:.fragment}
</section>

<section markdown="block">
## Arguments Object

When a function is called, it gets an __arguments__ in its context, along with its defined parameters (and __this__, but we'll talk about that later).


<pre><code data-trim contenteditable>
const f = function() {
    // btw... ok - I get the funny coercion rules now
    console.log("number of args " + arguments.length);
    for (let i = 0, j = arguments.length; i < j; i++) {
        console.log(arguments[i]);
    }
};
f(1, 2, 3);

</code></pre>

</section>

<section markdown="block">
## Arguments Object Continued

* Array like, but not an Array (__let's see__ &rarr;)
* you can index into it
* you can get it's length
* you can loop over it
* no methods, like slice
* how might you do required and optional arguments?
* {:.fragment} loop over arguments, but start at appropriate index

</section>

<section markdown="block">
##  Destructuring

Think of it as multiple assignment:

* works with Arrays
* works with objects (but you use curly braces instead)

<br>

<pre><code data-trim contenteditable>
const coord = [1, 2];
let [x, y] = coord;
console.log(x); // 1
console.log(y); // 2
</code></pre>

<pre><code data-trim contenteditable>
const {a, b} = {a: 1, b:2}
</code></pre>

</section>


<section markdown="block">
## Destructuring Continued

* {:.fragment} number of values and variables don't have to match (you'll get undefined tho!)
* {:.fragment} can leave `[a, , c]` blank to skip a value
* {:.fragment} can use rest operator `[a, b, ...rest]` for remainder
* {:.fragment} swapping `[a, b] = [b, a]`
* {:.fragment} within a loop: `for(const [x, y] of points)`

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

