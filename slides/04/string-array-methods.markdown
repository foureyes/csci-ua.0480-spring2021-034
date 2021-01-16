---
layout: slides
title: "String and Array Methods Review"
---
<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
# A Quick Run-Down of String and Array Methods

### (It occurred to me that I didn't link to the docs for each specific method)
</section>
<section markdown="block">
## Some Useful String Methods

__Note that these methods don't mutate the original string:__ &rarr;

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
</section>
