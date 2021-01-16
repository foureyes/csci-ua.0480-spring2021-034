---
layout: slides
title: A Tiny Review (Types, Operators, Control Structures, etc.)
---

<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## A Tiny Review

### Previously on ...

* we talked about __types__, __operators__, and __variables__
* oh, and some __built-in functions__
* ....and __control structures__
	* <code>if</code> and <code>if</code>-<code>else</code>
	* <code>for</code>
* __let's do a quick recap__ &rarr;

</section>

<section markdown="block">
## Types

__Name 6 types that we know in JavaScript and a literal example of each.__ &rarr;

* number - <code>317</code>
* string - <code>"yup, a string"</code>
* boolean - <code>true</code>
* function - <code>function f(x) {return x * 2}</code>
* object - <code>{'classSection': '002'}</code>
* undefined - <code>undefined</code> (of course!)
{:.fragment}
</section>

<section markdown="block">
## Operators

We talked about a bunch of operators:

* __arithmetic__: <code class="fragment">+&nbsp;&nbsp;-&nbsp;&nbsp;*&nbsp;&nbsp;/&nbsp;&nbsp;%</code> <!--* -->
* __bitwise__: <code class="fragment">&&nbsp;&nbsp;|&nbsp;&nbsp;^&nbsp;&nbsp; ~&nbsp;&nbsp; &lt;&lt;;&nbsp;&nbsp;&gt;&gt;&nbsp;&nbsp;&gt;&gt;&gt;</code>
* __logical operators__: <code class="fragment">&&&nbsp;&nbsp;||&nbsp;&nbsp;!</code>
* __comparison operators__: <code class="fragment">==&nbsp;&nbsp;!=&nbsp;&nbsp;===&nbsp;&nbsp;!==&nbsp;&nbsp;&gt;&nbsp;&nbsp;&lt;&nbsp;&nbsp;&gt;=&nbsp;&nbsp;&lt;=</code>
* __miscellaneous__: 
	* unary <code>+</code> and <code>-</code> ... convert to positive or negative number
	* <code>typeof</code> ... obvs, returns string representation of type of operand
	* unary and postfix <code>++</code> and <code>--</code> ... increment and decrement
	{:.fragment}

</section>



<section markdown="block">
## Equality

__What's the difference between__ <code>==</code> __and__ <code>===</code>__?__ &rarr;

* {:.fragment}<code>==</code> - allows coercion when testing if both values are equal
<pre><code data-trim contenteditable>
>"5" == 5
true
</code></pre>
{:.fragment}
* {:.fragment} <code>===</code> - checks both type and value
<pre><code data-trim contenteditable>
>"5" === 5
false
</code></pre>
{:.fragment}

__Always use__ <code>===</code> (and its friend, <code>!==</code>)!
{:.fragment}

</section>

<section markdown="block">
## Variables

__How is a variable declared in JavaScript?__ &rarr;

(create a variable called officeHoursRoom and set it equal to the number 423)

<pre><code data-trim contenteditable>
var officeHoursRoom = 423;
</code></pre>
{:.fragment}

* notice the keyword <code>var</code>? __Use it! All. The. Times. Really!__  
* does anyone remember what happens if you don't declare with <code>var</code>? <span class="fragment">__... you get a global variable ಠ_ಠ__</span>
{:.fragment}

<!--_ -->
</section>

<section markdown="block">
## Variable Names

__What are the rules for a valid identifier (variable name) again?__ &rarr;

* {:.fragment} start with a __letter__, __underscore__ ( <code>_</code> ), or __dollar__ ( <code>$</code> ) <!--_-->
* {:.fragment} following characters can be any of above, and/or __digits (0-9)__
* {:.fragment} can't use reserved words / keywords

</section>

<section markdown="block">
## Reassignment

__What's the output of this code? Error, 25 or "foo"?__ &rarr;

<pre><code data-trim contenteditable>
var x = 25;
x = "foo";
console.log(x);
</code></pre>

<pre><code data-trim contenteditable>
foo
</code></pre>
{:.fragment}

You can bind an _identifier_ (variable name) to values of different types during run time! Remember, JavaScript is __dynamically typed__.
{:.fragment}
</section>



<section markdown="block">
## Built-In Functions

We saw 2 built-in functions. __What were they__ &rarr; 

* {:.fragment} <code>console.log(obj1, [obj2, obj3, ... objN])</code>
* {:.fragment} <code>parseInt(string,radix)</code> 
</section>



<section markdown="block">
## Ok... so Keeping in Mind These Definitions... 

* __boolean expression__ - an expression that results in a boolean value
	* <code>423 === 423</code> &rarr;
		* JavaScript &#10084;s coercing values for you; a value will be coaxed into boolean when the need arises
	* <code>!!5</code> &rarr;
		* logical not, logical not, number 5 ... <code>¯\_(ツ)_/¯</code>
* __block__ - a sequence of grouped statements bound by curly braces - <code>{</code>'s and <code>}</code>'s
* __iteration__ - repeated execution of a set of programming statements
* __loop__ - the construct that allows allows us to repeatedly execute a statement or a group of statements until a terminating condition is satisfied
</section>

<section markdown="block">
## If and Else

Should look familiar...

<pre><code data-trim contenteditable>
if (some_boolean_expression) {
	// do stuff here if expression is true
}

if (some_boolean_expression) {
	// do stuff 
} else if (another_boolean_expression) {
	// do other stuff
} else {
	// do other other stuff
}
</code></pre>

</section>

<section markdown="block">
## Switch-Case

<code>if ... else</code> getting too cumbersome? You can use [<code>switch ... case</code>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch) too...

<pre><code data-trim contenteditable>
var day = "fri";
switch (day) { 
	case "fri":
		console.log("Friday");
	case "thu":
		console.log("Thursday");
		break;
	case "wed":
		console.log("Wednesday");
		break;
}
</code></pre>

__What is the output of the above programs?__ &rarr; 

<pre><code data-trim contenteditable>
Friday
Thursday
// notice that there's no break at the end of case "fri"
// so execution continues
</code></pre>
{:.fragment}
</section>

<section markdown="block">
##  Loops

A <code>for</code> loop: 

* __Note how the loop variable, <code>i</code> is initialized (use var!)__.
* also, increment and decrement operators work as you'd expect

<pre><code data-trim contenteditable>
for(var i = 0; i <= 5; i++) {
	console.log(i);
}
</code></pre>

A <code>while</code> loop:

<pre><code data-trim contenteditable>
while (boolean_expression) {
	// repeat this stuff as long as boolean expression is true
}
</code></pre>

And, if you want the body executed first, <code>do ... while</code>
<pre><code data-trim contenteditable>
do {
	// repeat this stuff at least once
} while (boolean_expression)
</code></pre>
</section>

<section markdown="block">
## Break and Continue

Of course, there's <code>break</code> and <code>continue</code>....

The __keyword__ <code>break</code> immediately stops the execution of a loop:

<pre><code data-trim contenteditable>
for (var num = 1; num < 30; num++) { 
	if (num % 7 == 0 && num % 3 == 0)
		break; 
	console.log(num);
}
</code></pre>

The __keyword__ <code>continue</code> stops the current iteration and immediately skips to the next one:

<pre><code data-trim contenteditable>
for(var num = 1; num < 30; num++) { 
	if (num % 7 == 0 && num % 3 == 0)
		continue; 
	console.log(num);
}
</code></pre>

__What is the output of the above programs?__ &rarr; 

<span class="fragment">__1 through 20__ and __1 through 29 skipping 21__ respectively</span>
</section>


<section markdown="block">
## An Exercise

### (We didn't get to do this during the last class, so let's try it now)
</section>

<section markdown="block">
## FizzBuzz

__From Eloquent JavaScript__:

* write a program that uses console.log to print all the numbers from 1 to 100
* for numbers divisible by 3, print "Fizz" instead of the number
* for numbers divisible by 5 (and not 3), print "Buzz" instead
* for numbers divisible by __both__ 3 and 5, print "FizzBuzz" instead
</section>

<section markdown="block">
## Type Coercion

JavaScript _really_ likes to help out when you're working with values of different types. __There's a bunch of rules when it comes to coercing one type to another.__ &rarr;

* __when adding values__ ...
	* {:.fragment} if either of the values is a string, coerce the other to perform string concatenation
	* {:.fragment} otherwise convert both sides to numbers (if they aren't already) and perform addition
* __when comparing values with relational operators, such as &lt;__
	* {:.fragment} try to convert both sides to numbers first, so that comparison can be easily performed
	* {:.fragment} if either operand is NaN, the result is False
* {:.fragment} __when it doubt, check the [spec](http://www.ecma-international.org/ecma-262/5.1/#sec-11.8.5)__ (or, of course [SO](http://stackoverflow.com/questions/14687876/how-do-the-javascript-relational-comparison-operators-coerce-types) it)

</section>

<section markdown="block">
## Type Coercion Continued

__What are some ways to avoid making mistakes with type coercion (other than memorizing all of the rules)?__ &rarr;

* {:.fragment} always use <code>===</code> or <code>!==</code> when checking for equality
* {:.fragment} explicitly convert from one type to another before using value (casting)

</section>

<section markdown="block">
## Converting Types

__What are some operators that we could use to convert a value into ...__ &rarr;

* a <code>boolean</code>
	* {:.fragment} negate twice!? ...for example: <code>!!5</code>
* a <code>string</code>
	* {:.fragment} add empty string to it: <code>5 + ""</code>
* a <code>number</code>
	* {:.fragment} use the unary plus: <code>+"5"</code>
	* {:.fragment} also <code>parseInt</code> with radix
* {:.fragment} also constructors that are the same name of type (<code>Number</code>, <code>String</code>, etc.)
* {:.fragment} __let's try these in the interactive shell__ &rarr;

</section>
