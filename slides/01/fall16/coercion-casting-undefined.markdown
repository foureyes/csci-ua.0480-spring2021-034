---
layout: slides
title: Coercion (Revisited), Casting, Undefined, and Some Style
---
<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

</section>

<section markdown="block">
## Coercion Rules

__What are the values that result from the following expressions?__&rarr;

<pre><code data-trim contenteditable>
"5" + 5
false + 5
undefined + 5
"10" > 5
NaN > 5
undefined > 5
</code></pre>

The results: 
{:.fragment}

* <code>"55"</code>
* <code>5</code>
* <code>NaN</code>
* <code>true</code>
* <code>false</code>
* <code>false</code>.
{:.fragment}

<br>
How do we know? We can read the [ECMA](http://es5.github.io/#x11.6.1) [Script](http://es5.github.io/#x9.3) [Specifications](http://es5.github.io/#x11.8)!
{:.fragment}

</section>

<section markdown="block">
## Type Coercion With Numeric Operators

* for __addition__:
	* when one operand is a string and the other is not, the other operand is converted into a string, and the two strings are concatenated
	* for all other cases, the operands are converted to numbers
		* true &rarr; 1
		* false &rarr; 0
		* null &rarr; 0
		* undefined is still undefined, and result gives back __NaN__
* for __other numeric operators__, such as __subtraction__:
	* will usually try to convert to number 
	* if something _cannot be converted easily_ (like the string, "hello"), the result is <code>NaN</code>
</section>

<section markdown="block">
## Addition is Sooo Weird

Armed with that knowledge, __what values do these two expressions produce?__ &rarr;

<pre><code data-trim contenteditable>
'foo' + (1 + 2)
('foo' + 1) + 2
</code></pre>

{:.fragment}
Order of evaluation matters... these two expressions produce different values

<pre class="fragment"><code data-trim contenteditable>
foo3
foo12
</code></pre>

</section>

<section markdown="block">
## Type Coercion With Equality Operators

* JavaScript will do its best to convert types so that they can be checked for equality - __these all return true__ &rarr;
	* <code>"10" == 10</code>
	* <code>0 == false</code>
	* <code>"" == false</code>
* this is Usually an unwanted behavior; __to avoid this, use: === and !==__
	* these operators check __type__ and __value__ 
	* use these three-character comparison operators to prevent unexpected type conversions 

    
</section>
<section markdown="block">
## Relational / Ordering Operators

__For relational / ordering operators like &gt;, &lt;, etc.__ &rarr;

1. convert objects to a _primitive_: booleans, numbers, strings, null, and undefined
2. if strings, compare lexicographically
3. otherwise convert both to numbers
4. NaN is compared as unordered with everything (which is why NaN === NaN is false)
</section>
<section markdown="block">
## Back to Unary Operators

What the what????

<pre><code data-trim contenteditable>
+-12 
-+12
+"hello"
</code></pre>

These expressions evaluate to...
<pre><code data-trim contenteditable>
-12
-12
NaN
</code></pre>

From the [docs on mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Unary_negation_(-))...

* unary + ... will try to convert its operand to a number (if it can't be converted to a number, then NaN)
* unary - ... will convert its operand to negative number

<br>
I'm assuming that order of operations is innermost prefix operator first (right to left).

</section>

<section markdown="block">
## Bitwise Operators Again

__For bitwise operators... <code>Nan</code>, <code>Infinity</code>, and <code>-Infinity</code> are all converted to 0__ &rarr;

<pre><code data-trim contenteditable>
NaN | 2 // evaluates to 2
Infinity & 10 // evaluates to 0
</code></pre>

Why? Because [the specs](http://es5.github.io/#x11.10) [say so](http://es5.github.io/#x9.5)

Also... there is definitely a binary representation for these special numbers (<code>Nan</code>, <code>Infinity</code>, and <code>-Infinity</code>)... the [closest I came to determining it was here](http://www.2ality.com/2012/04/number-encoding.html)
</section>
<section markdown="block">
## Ugh All of That is Kind of Crazy

### A quick summary of all of that automatic conversion business.

* __when adding values__
	* if either of the values is a string, coerce the other to perform string concatenation
	* otherwise convert both sides to numbers (if they aren't already) and perform addition
* __when comparing values with &lt;__
	* try to convert both sides to numbers first, so that comparison can be easily performed
	* if either operand is NaN, the result is False
* __when it doubt, check the spec__ (or, of course [SO](http://stackoverflow.com/questions/14687876/how-do-the-javascript-relational-comparison-operators-coerce-types) it)
</section>

<section markdown="block">
## Equality

As you know, this automatic type conversion continues on with <code>==</code>...

__How do we get out of this mess? ...without having to remember a series of obscure rules__ &rarr;

* one way is to use triple equals - <code>===</code> (we've gone over this before!)
* another way is to just explicitly _cast_ your operand(s) to minimize surprises
{:.fragment}
</section>

<section markdown="block">
## Casting

We can use __object contructors__ to cast from one type to another: 

* you can use constructors as functions (without the keyword <code>new</code>) to convert to that particular type
* however, using <code>new</code>...
    * wraps the primitive type in an object (we'll discuss objects later)
    * when asked for a value, these objects usually yield the value of their primitive type

__To cast, use constructors without new if you want the _primitive_.__ &rarr;

<pre><code data-trim contenteditable>
// do this
a = Boolean(false);
// not this
b = new Boolean(false);
// because
console.log(typeof a); // --> boolean
console.log(typeof b); // --> object
// you'll have a SAD FACE after you try this...
Boolean(new Boolean(false))
</code></pre>
</section>

<section markdown="block">
## Casting Continued

Another option is to use some of the __operators__ that we learned to coax JavaScript into doing a predictable automatic conversion for us:

* __convert to a boolean__
	* use _not_ twice (negate the not, but preserve the type conversion)
	* <code>!!"hello"</code>
* __convert to a number__
	* use unary <code>+</code>
    * for example: <code>+"5"</code>, <code>+"hello"</code>
    * use `parseInt`
* __convert to a string__
	* just add an empty string to it
	*  <code>5 + ""</code>

<br>
See [this page](http://bonsaiden.github.io/JavaScript-Garden/#types.casting) on type casting.
</section>

<section markdown="block">
## Checking for undefined 

Undefined (and also null) means __the absence of a _meaningful_ value__.

How would you check if a value is __undefined__? __The two ways to do this are__: &rarr;

* {:.fragment} (preferred) <code>if (myVar === undefined)</code>
* {:.fragment} <code>if (typeof myVar === 'undefined')</code>
	* {:.fragment} handles undeclared variables

</section>

<section markdown="block">
## Checking for NaN

Use the isNaN function to determine if a value is __not a number__.

__(comparing NaN to itself always yields false)__ &rarr;

<pre><code data-trim contenteditable>
NaN == NaN
NaN === NaN

// false
// false
// weird, eh?
</code></pre>

Remember... NaN is not ordered with any value!. Use <code>isNaN</code>...

<pre><code data-trim contenteditable>
isNaN(NaN)
</code></pre>
</section>

<section markdown="block">
## Some Style

The previous material in this set of slides are about general best practices. Not adhering to them may:

* result in your code yielding unexpected results
* difficult to understand / non-standard code

<br>
__The next few suggestions, however, are purely stylistic - just about how code is formatted:__ &rarr;

<div markdown="block" class="img">
![poochie](http://i.kinja-img.com/gawker-media/image/upload/s--ZbZrlXcj--/xnfzofkxpckzxbkqxnbq.jpg)
</div>

</section>
<section markdown="block">
## Style Continued

* use 1TBS, __One True Brace Style__: open curly brace on same line of code as last line preceding the current block of code / statement header (not on a new line)
<pre><code data-trim contenteditable>
if (some_boolean_expression) { // <-- curly brace here!
	// do stuff
}
</code></pre>
* use (lower) camel case to separate words in identifiers / variables names: <code>myVerboseVariableName</code>
* remember to indent blocks of code!
</section>

<section markdown="block">
## Summary

* __automatic type conversion is tricky__; sometimes it's helpful to check the specs, mdn, speaking javascript or even stackoverflow 
* you can get around automatic type conversion (if that's desirable) by __casting__ - use operators like <code>!!</code>, <code>+</code>, <code>+ ""</code>
* to __check for undefined__: <code>if(typeof myVar == 'undefined')</code>
* to __check for NaN__: <code>isNan(myVar)</code>
</section>
