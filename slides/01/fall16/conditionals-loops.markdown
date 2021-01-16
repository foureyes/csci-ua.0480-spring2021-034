---
layout: slides
title: Control Structures
---

<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

</section>



<section markdown="block">
## Control Structures

* as you might expect, JavaScript programs are generally executed line-by-line from top to bottom
* __but there are ways to _control_ that flow of execution (_of course_)!__ &rarr;
	* {:.fragment} conditionals
	* {:.fragment} repetition
	* {:.fragment} creating a function (to jump to the code in the function definition)
	* {:.fragment} (we'll see others as well)


</section>

<section markdown="block">
## Conditionals and Loops

__This stuff should look really familiar__ ...

* we'll go through the following material quickly because...
* you know all of these concepts already
* and it looks a lot like Java/C/C++
</section>

<section markdown="block">
## Again With the Definitions

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

Conditionally execute a __block__ of code (should look _familiar_):

* __keyword__ <code>if</code> followed by a __boolean expression__ enclosed in parentheses
* __block__ of code to be executed if expression is true
* optional additional <code>else if</code>'s to chain conditionals, with corresponding __block__ of code to execute
* optional <code>else</code>, with corresponding __block__ of code to execute

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
## A For Loop


Again, should look familiar... repeatedly execute a __block__ of code:

<pre><code data-trim contenteditable>
//    initialization
//    |        condition
//    |        |       afterthought/increment
//    |        |       |
for(var i = 0; i <= 5; i = i + 1) {
	console.log(i);
}

// (i++ works too, of course)
</code></pre>

{{ site.vars.book_js }} calls the three parts: initialization, check and update.

__Hey - notice that <code>var</code> in front of the loop variable declaration?  Do that.__
{:.fragment}
</section>


<section markdown="block">
## A While Loop

Conditionally repeat a __block__ of code:
<pre><code data-trim contenteditable>
while (boolean_expression) {
	// repeat this stuff as long as boolean expression is true
}
</code></pre>
<br>

Conditionally repeat a __block__ of code __and__ ensure that code is executed at least once:
<pre><code data-trim contenteditable>
do {
	// repeat this stuff at least once
} while (boolean_expression)
</code></pre>
</section>

<section markdown="block">
## Break and Continue

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
## Switch-Case

Execute code based on value of switch.

<pre><code data-trim contenteditable>
var day = "thu";
switch (day) { 
	case "fri":
		console.log("Friday");
		break;
	case "thu":
		console.log("Thursday");
		break;
	case "wed":
		console.log("Wednesday");
		break;
}
</code></pre>

__What is the output of the above programs?__ &rarr; 

<span class="fragment">Thursday</span>

</section>

<section markdown="block">
## Lastly, a Preview of Functions

One way to define a function in JavaScript is to create a variable, and set it equal to a function:

<pre><code data-trim contenteditable>
var f = function(x) {
	return x
}

</code></pre>
</section>

<section markdown="block">
## Some Quick Exercises

### Some silly practice programs to get you warmed up
</section>

<section markdown="block">
## FizzBuzz

__From Eloquent JavaScript__:

* write a program that uses console.log to print all the numbers from 1 to 100
* for numbers divisible by 3, print "Fizz" instead of the number
* for numbers divisible by 5 (and not 3), print "Buzz" instead
* for numbers divisible by __both__ 3 and 5, print "FizzBuzz" instead
</section>

<!--
<section markdown="block">
## Max Number

* write a function that takes one parameter, an array - assume that it will only have 0 or more numbers
* the function should return the largest number in the array
</section>
-->
