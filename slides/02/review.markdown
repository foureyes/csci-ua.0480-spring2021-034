---
layout: slides
title: Review
---
<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## Converting Types

JavaScript has a bunch of rules when it comes to automatic conversion.

__Get around them by:__  &rarr;

* always using === ... 
* converting things yourself
{:.fragment}
</section>

<section markdown="block">
## Converting Types Continued

__So... uh... how do I get from one type to another?__ &rarr;

* !!5
* 5 + ""
* +"5"
* also constructors
* also parseInt with radix
{:.fragment}

</section>


<section markdown="block">
## Scope

__What's the only way to create scope in JavaScript?__ &rarr;

* the only way to create scope in javascript is with functions!
* closest enclosing scope first 
{:.fragment}
</section>

{% comment %}
<section markdown="block">
## Function Declaration

__What's the difference between these two ways of creating functions...__ &rarr;

<pre><code data-trim contenteditable>
function f() {}

var f = function() {};
</code></pre>

The function declaration (the first one) is hoisted.
{:.fragment}
</section>
{% endcomment %}

<section markdown="block">
## Some Rules

__Lastly... some important things you should remember to do!__ &rarr;

* {:.fragment} always end statements with a semicolon 
    * {:.fragment} our static analysis tool is set up to catch missing semicolons
    * {:.fragment} (though there's also the opposite approach to just drop all semicolons)
* {:.fragment} always declare your variables (use <code>var</code>)
* {:.fragment} don't use function declaration in a non-function block (such as an if statement)
</section>
