---
layout: slides
title: "About Class #5"
---
<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
# How Was the Homework?
</section>

<section markdown="block">
## Where We Are

We're almost done with our whirlwind tour of JavaScript!

* objects, prototypes, patterns, error handling are left
* (we can get that done in this class and next)
* and that means web development next week (__finally__)!

</section>

<section markdown="block">
## Call By Sharing

[I sent out an article on call-by-sharing](https://en.wikipedia.org/wiki/Evaluation_strategy#Call_by_sharing)

* assignments to function arguments passed in are not seen by the caller
* if the argument is mutable, however, it can be changed within the function
* (and the caller will see the change)

__Java, Python, and JavaScript exhibit this behavior, but call it different things!__ &rarr;

* {:.fragment} in Java it's called _pass-by-value_
* {:.fragment} but in Ruby, it's called _pass-by-reference_
* {:.fragment} sometimes Python uses _call-by-sharing_, though it's a term that's not as widely used as the others
</section>

<section markdown="block">
### Misc Stuff

Before we go on, I want to cover some odds and ends:

* <code>.length</code> property
* <code>indexOf</code> 
* <code>toFixed</code>
* timing...

</section>


<section markdown="block">
## The .length Property

Both Strings and Arrays have a property called <code>length</code>:

* it returns the number of characters in a string
* ...and the number of elements in an Array

<pre><code data-trim contenteditable>
"hello".length // --> 5
[1, 2, 3].length // --> 3
</code></pre>
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

<pre><code data-trim contenteditable>
1 ... -1 ... 2
</code></pre>
{:.fragment}

</section>

<section markdown="block">
## toFixed

The [toFixed](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) method for Numbers specifies the number of digits that appear after the decimal point:

<pre><code data-trim contenteditable>
var n = 42;
cosnole.log(n.toFixed(4)); 
// prints out 42.0000
</code></pre>

</section>

<section markdown="block">
## Timing

Some implementations of JavaScript have functions that can measure elapsed time (read: it's not standard!).

In v8 (node and Chrome), you can use:

* <code>console.time('name of timer')</code>.... to start timing
* <code>console.timeEnd('name of timer')</code>.... to stop timing and output the elapsed time since the start of the timer
* note that 'name of timer' must match between the two calls
</section>
