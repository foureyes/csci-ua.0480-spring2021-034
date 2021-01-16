---
layout: slides
title: "Questions on Default Values, Splice, Cloning and Logging"
---

<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## Miscellaneous Topics

Some questions from the previous class brought up the following topics:

1. I mentioned that __default values for function parameters exist for ES6__. Thankfully, _that was not a lie_. Let's see how it works and where it's possible to use.
2. We played around with <code>splice</code> (different from <code>slice</code>), but it wasn't clear what exactly was going on! I'll clarify the behavior of the <code>splice</code> method.
3. How do you copy an Array?
4. Is it just me, or does logging nested objects look _funny_?
</section>

<section markdown="block">
## Default Parameter Values

We already know one way to set default parameter values when we create a function. __What was it?__ &rarr;

Use <code>||</code> (logical or) to check if a parameter has a value, otherwise, use some default value.
{:.fragment}

<pre><code data-trim contenteditable>
function myFunc(a) {
	a = a || 'my default value';
	console.log(a);
}
myFunc();
myFunc("hello");
</code></pre>
{:.fragment}

__Basically, we just test if somethings is undefined__
{:.fragment}

</section>


<section markdown="block">
## A Quick Aside on Testing for Undefined

In a previous class, we learned that you can test for <code>undefined</code> by checking the type:

<pre><code data-trim contenteditable>
if(typeof a == 'undefined') {
	a = 'my default value';
}

// ternary operator (as in Java, PHP, etc. also works)
a = typeof a ? a : "my default value";
</code></pre>

</section>

<section markdown="block">
## Default Parameter Values in ES6

In ES6, the ability to define default values for function parameters with the function signature itself has been introduced. The syntax should look familiar if you've used Python _keyword_ arguments:

<pre><code data-trim contenteditable>
function myFunc(a='my default value') {
	console.log(a);
}
</code></pre>

* Um. [But no one really supports that yet](https://kangax.github.io/compat-table/es6/) (except for FireFox)
* Check out [the full docs on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters)
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
## Cloning

__What's the output of this code?__ &rarr;

<pre><code data-trim contenteditable>
a = [1, 2, 3];
b = a;
a.push(4);
console.log(b);
</code></pre>

<code>[1, 2, 3, 4]</code>! ... In the previous class, I mentioned one possible technique for cloning. __What was it?__ &rarr;
{:.fragment}

Use <code>slice</code>.
{:.fragment}

Turns out this is _actually_ a common way of duplicating an Array.
{:.fragment}

<pre><code data-trim contenteditable>
a = [1, 2, 3];
b = a.slice();
a.push(4);
console.log(b);
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Logging Out Nested Objects

When using printing out nested objects for than 2 levels deep, the third object is just represented by <code>[Object]</code>. __Let's check out this example.__ &rarr;

<pre><code data-trim contenteditable>
var nested = {a:{b:{c:{d:{}}}}};
console.log()
</code></pre>

Don't worry... all of the nested objects still exist. If you want the full details, you can check out [this article on printint out nested objects](http://www.2ality.com/2011/10/node-print-json.html)

<pre><code data-trim contenteditable>
console.log('%j', nested); // json in the format string
console.log(util.inspect(nested, false, null)); // don't show hidden, no depth
</code></pre>

</section>
