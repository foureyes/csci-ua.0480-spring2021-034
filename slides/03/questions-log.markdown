---
layout: slides
title: "Question on Logging"
---

<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

{% comment %}
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
{% endcomment %}


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
