---
layout: slides
title: Variables and Some Built-In Functions
---

<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

</section>

<section markdown="block">
## Some Definitions

We learned how to produce values from using operators on other values. __We created expressions!__.

* __expression__ - a fragment of code that produces a value
	* not a statement by itself
	* every literal value is an expression - <code>27</code>, <code>"YES!"</code>
* __statement__ - a full instruction for the computer
	* __all statements end in a semicolon__ in JavaScript (you know __;__)
	* the simplest statement is an expression with a semicolon at the end - <code>27;</code>, <code>"YES!";</code>
* __program__ - <span class="fragment"> a sequence of statements that specify to a computer actions to perform</span>
* __function__ - <span class="fragment"> a named sequence of code that can be called by name</span>
* __built-in function__ <span class="fragment"> - a function available in the _global_ namespace that is part of the core language</span>

</section>

<section markdown="block">
## Expressions and Statements Continued

<pre><code data-trim contenteditable>
// Expression (no semicolon)
1 + 5

// Statement
1 + 5;

// Even these are statements:
1;
"hi";
</code></pre>
</section>

<section markdown="block" data-background="#440000">
## All statements end with a semicolon.
</section>

<section markdown="block">
## Functions

__What's a function?__ &rarr;

* a __function__ is a named sequence of statements that perform some useful action.
* it can take inputs, and it can return values, but it doesn't have to do either
* to __call__ (or execute) a function, just call it by name, with parentheses after (with an optional list of commas separated inputs within the parentheses)
* the values passed to a function are called __arguments__
* for example: isNaN(12) is a function call
</section>

<section markdown="block">
## To call a function, use its name followed by parentheses.
</section>

<section markdown="block">
## Built-In Functions

JavaScript comes with a bunch of built in functions (and objects) that are available globally. Here are a couple:

* __parseInt(string, radix)__ - [returns an integer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt) based on the string and radix
	* always specify radix
	* <code>parseInt("100", 2)</code> &rarr;
	* <code>parseInt("100", 10)</code> &rarr;
* __console.log(obj1 [,obj2 ..., objN])__ - [outputs a message](https://developer.mozilla.org/en-US/docs/Web/API/console.log) (the string representation of obj) to the console (more on objects and methods later)
	* <code>console.log("hi")</code>
	* <code>console.log("hi", "hello")</code>
</section>


<section markdown="block">
## Variables


* __variables__ are symbolic names for values. 
	* you can use a variable's name wherever you want to use that value.
	* to create a variable, use the __keyword__, __var__, followed by =, then the value, and finally a semicolon
	* <code>var x = 23;</code>
	* <code>console.log(x + 7); // using that variable</code>
* we can create __identifiers__, or variable names, based on these rules:
	* start with a __letter__, __underscore (_)__, or __dollar ($)__ 
	* following characters can be any of above, and/or __digits (0-9)__
	* variable names are case sensitive
	* cannot be a reserved word
</section>

<section markdown="block">
## Reserved Words

__Don't use these as variable names__

<pre><code data-trim contenteditable>
abstract
boolean break byte
case catch char class const continue
debugger default delete do double
else enum export extends
false final finally float for function
goto
if implements import in instanceof int interface
</code></pre>
<pre><code data-trim contenteditable>
long
native new null
package private protected public
return
short static super switch synchronized
this throw throws transient true try typeof
var volatile void
while with
</code></pre>
</section>

<section markdown="block" data-background="#440000">

## Always use <code>var</code> when declaring variable names!

Otherwise, you get global variables! This is particularly important when dealing with variable declarations in functions.
</section>

<section markdown="block">
## Let's See This in Action

__How is a variable declared in JavaScript?__ &rarr;

(create a variable called officeHoursRoom and set it equal to the number 423)

<pre><code data-trim contenteditable>
var officeHoursRoom = 423;
</code></pre>
{:.fragment}

* notice the keyword <code>var</code>? __Use it! All. The. Times. Really!__  
{:.fragment}

<!--_ -->
</section>

<section markdown="block">
## (Not) Declaring a Variable

__What happens if you don't use var?__ &rarr;

* {:.fragment} ... you might end up modifying a variable in an outer scope!
* {:.fragment} or inadvertently creating a global variable __ಠ_ಠ__

<br>

__What happens if you don't declare a variable _at all_?__ &rarr;

* {:.fragment} if you use a variable/identifier without ever declaring it (with or without var)
* {:.fragment} you get a runtime error: `ReferenceError: variable is not defined`

</section>

<section markdown="block">
## And Speaking of a Look of Disapproval

### (Variable Names)

__What are the rules for a valid identifier (variable name) again?__ &rarr;

* {:.fragment} start with a __letter__, __underscore__ ( <code>_</code> ), or __dollar__ ( <code>$</code> )
* {:.fragment} following characters can be any of above, and/or __digits (0-9)__
* {:.fragment} can't use reserved words / keywords
</section>

<section markdown="block">
## Don't Do This, But...

BTW, __Unicode characters are allowed in variable names!!!__ &rarr;


<!--_ -->
<pre><code data-trim contenteditable>
var ಠ_ಠ = "disapproval";
console.log(ಠ_ಠ);
// totally works (O_o !?)
</code></pre>
{:.fragment}

Thanks [Stackoverflow](http://stackoverflow.com/questions/1661197/valid-characters-for-javascript-variable-names/9337047#9337047)! Also, here's more [about that look](http://knowyourmeme.com/memes/%E0%B2%A0_%E0%B2%A0-look-of-disapproval).
{:.fragment}

Oh, and [this is a site that let's you check if a variable name is valie or not.](https://mothereff.in/js-variables)
{:.fragment}

<!--_ -->
</section>

<section markdown="block">
## Another Note on Variables

Because JavaScript is dynamically typed... __variable reassignment, even of different types, is ok__ &rarr;

<pre><code data-trim contenteditable>
var x = 25;
x = "foo";
</code></pre>

Lastly, a quick aside...
{:.fragment}

* {:.fragment} [foo, bar, and baz are metasyntactic variables](http://en.wikipedia.org/wiki/Metasyntactic_variable)
* {:.fragment} apparently there are different metasyntactic variables for different natural languages!
</section>

<section markdown="block">
## Definition Time

### (What time is it?)

From {{ site.vars.book_js }}: 

* the __environment__ is the collection of variables and their values that exist at a given time
* when a program starts up, __this environment is not empty__
* it always __contains variables that are part of the language standard__
* for example: 
	* the <code>console</code> object is an available variable from the start of your program!
	* same with _built-in_ functions!
</section>


