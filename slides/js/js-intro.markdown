---
layout: slides
title: Introducing JavaScript
---
<section markdown="block" class="intro-slide">
# Introducing JavaScript

### {{ site.vars.course_number }}

<p><small> 
</small></p>
</section>

<section markdown="block">

## A Little Bit About JavaScript

__What are we getting ourselves into?__ We'll introduce JavaScript by &rarr;

1. {:.fragment} Defining what __JavaScript__ is? 🤔
2. {:.fragment} Taking a quick look at some interesting JavaScript features 👀
3. {:.fragment} Going over why _we're_ using JavaScript? 🕸
3. {:.fragment} And, finally, we'll discuss how to run JavaScript programs 🏃

</section>




<section markdown="block">
## About JavaScript

### Perhaps You've Used it Before?

__It's pretty much the standard language for developing for the web__ (for better or worse).
{:.fragment}

__JavaScript is__ &rarr;
{:.fragment}

* {:.fragment} a high-level programming language __available on many platforms__
* {:.fragment} that __supports multiple programming paradigms__, such as imperative, functional and object oriented programming
* {:.fragment} it has a __Java / C-like syntax__ - (curly braces for blocks, etc.)
* {:.fragment} it's __dynamically typed__ (eh... maybe not a great feature? 😐)
* {:.fragment} it's __weakly typed__ (definitely not a great feature 😟)
* {:.fragment} most implementations are __interpreted__ rather than compiled 
* {:.fragment} it has a lot of really great (and sometimes quirky 🙃) features, but it also has some really terrible parts too 😖 

<aside class="notes">
Have you used JavaScript before? 
JQuery
dynamically typed? - type checking occurs during runtime, practically - don't have to declare types when creating variables
weakly typed? - types of variables can be changed, type coercion (implicit casting) occurs frequently
</aside>

</section>

<section markdown="block">
## Interesting JavaScript Features

__We'll go over these in more detail in the next couple of classes__ but it's nice to get a preview here as motivation to learn the language &rarr;

1. {:.fragment} __first-class functions__ (functions are just objects that can be passed around as values like strings and numbers)
2. {:.fragment} __closures__ (a function has access to the variables in scope when the function was created)
3. {:.fragment} __versatile and dynamic objects__ (object literal notation is _pretty powerful_)
4. {:.fragment} __prototypal inheritance__  (using another object to base new objects off of)
</section>

<section markdown="block">
## Functions as First Class Citizens

In JavaScript, __functions are just objects__ that can be &rarr;

__Passed around__:
{:.fragment}

<pre><code data-trim contenteditable>
// in the code below, w => w.toUpperCase() is a shorthand 
// way of creating a function (an arrow function or a 
// lambda), which is then passed to the array method, map

const  words = ['yachty', 'boaty', 'canooey'];
console.log(words.map(w => w.toUpperCase()));
</code></pre>
{:.fragment}

<br>

__Or even have properties and methods__!
{:.fragment}

<pre><code data-trim contenteditable>
// another way to declare a function

function sayBroccoli(times=1) {
    console.log('broccoli'.repeat(times));
}
// WAT? this function has a method called bind!?
const sayBroccoliTwice = sayBroccoli.bind(null, 2);
</code></pre>
{:.fragment}

<aside class="notes">
Python also has first class functions
Java 8 also has a feature that behaves like first class functions!
</aside>
</section>

<section markdown="block">
## Closures

__A function has access to the variables in scope when the function was created__:

<pre><code data-trim contenteditable>
// val is available to returned function 
// even after stringAccumulator returns
function stringAccumulator(val='') {
    return function(s) {
        val += '\n' + s;
        console.log(val);
    };
}
</code></pre>
{:.fragment}

<pre><code data-trim contenteditable>
const addColdStates = stringAccumulator('Cold states:');
addColdStates('Minnesota');
addColdStates('Maine');
addColdStates('Michigan');
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Expressive Syntax for Creating Powerful Objects

Object literal notation is easy!

<pre><code data-trim contenteditable>
const obj = {nights: 0};
</code></pre>
{:.fragment}

<br>

Add a method? No problem!
{:.fragment}

<pre><code data-trim contenteditable>
obj.incrementNights = function() {
    this.nights += 1;
}

obj.incrementNights();
console.log(obj.nights);
</code></pre>
{:.fragment}

<aside class="notes">
Syntax is kind of like Python dictionaries, huh?
</aside>

</section>

<section markdown="block">
## Prototypal Inheritance

Perhaps you want another object to have the same "properties" and "methods" as the object, `obj`, in the previous slide...

<pre><code data-trim contenteditable>
// set obj to be the "prototype" of anotherObj using Object.create
const anotherObj = Object.create(obj);
</code></pre>
{:.fragment}


Now... `anotherObj` has both `nights` and `incrementNights` as properties
{:.fragment}

<pre><code data-trim contenteditable>
anotherObject.incrementNights();
anotherObject.incrementNights();
console.log(anotherObj.nights);
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## About Those Examples

So, hopefully that quick tour of language features makes JavaScript enticing to learn! 

However, __the examples in the previous slides may have looked unusual, even if you already knew JavaScript__ &rarr;

1. {:.fragment} don't worry, __we'll cover everything in-depth in this class and the next few classes__
2. {:.fragment} if you've used JavaScript before and are confused by the lack of `var` usage and the weird `=>` syntax...
    * it's because __we're using recent JavaScript language features__
    * specifically stuff from __ES6__, and maybe beyond!

</section>

<section markdown="block">
## ECMAScript and ES6

__ECMAScript__ is the name of the __standard__ that __JavaScript implementations are based off of__.

1. {:.fragment} new features are included in yearly editions of [this standard](https://www.ecma-international.org/publications/standards/Ecma-262.htm)
2. {:.fragment} the 6th edition of ECMAScript was published in 2015 (called __ES6__ or __ES2015__) 
3. {:.fragment} the specification is continually evolving, with new features being added through [a proposal process](http://2ality.com/2015/11/tc39-process.html)
4. {:.fragment} the most recent version is the 8th edition in 2017 (__ES8__ / __ES2017__)

<br> 
__We're going to be using ES6 (and possibly features from later editions) in this course__ 
{:.fragment}
</section>

<section markdown="block">
## ES6 Continued

We're going to use a lot of __ES6__ (features from 2015) for this course. 

__ES6 contained a large set of features that signficantally influenced JavaScript syntax and best practices ...__ for example:

* {:.fragment} __arrow functions__ (instead of anonymous functions): `x => 2 * x`
* {:.fragment} __let and const__ (instead of var): 'let x = 1'
* {:.fragment} __destructuring__ (instead of single assignment): `const [x, y] = [1, 2]`
* {:.fragment} ...and others (like `class`, various `String` and `Array` methods)

<br>
At this point:
{:.fragment}

* {:.fragment} most of these features are implemented by a significant number of JavaScript engines
* {:.fragment} see [this table](http://kangax.github.io/compat-table/es6/) to find out which features are implemented by various JavaScript engines
</section>

<section markdown="block">
## Why JavaScript / ES6

So... __that leads to why we're using JavaScript (and additionally, why ES6)__:

* {:.fragment} it's __ubiquitous on the web__
* {:.fragment} it has some __interesting features__, making it _fun_ to program in
* {:.fragment} it can be __installed easily in many environments__
* {:.fragment} most of these environments support the features specified in ES6
* {:.fragment} in ES6 introduced many syntactic improvements and features, many of which are in wide usage

</section>

<section markdown="block">
## Availability

__JavaScript can be run in many different environments__, from servers and  microcontrollers.... all the way to its most common use in client side (web browser) programming.

* {:.fragment} you can install server-side JavaScript on multiple platforms (Node.js has __Windows__, __Linux__, and __OSX__ installers)
* {:.fragment} it's available on every major browser (such as __Chrome__, __Safari__ or __Edge__)
* {:.fragment} ...and there are sites like [gomix](https://glitch.com/edit/), [jsfiddle](https://jsfiddle.net/), and [codepen](codepen.io) that allow you to run JavaScript in various capacities

<aside class="notes">
Let's check out these sites ^^^
</aside>
</section>

<section markdown="block">
## Running JavaScript

We'll be running JavaScript on both the server and the client... so we'll rely on:

* {:.fragment} the __Node.js__ commandline interpreter / [REPL](http://nodejs.org/api/repl.html), which is really just [V8](http://en.wikipedia.org/wiki/V8_(JavaScript_engine)) (what's v8? &rarr;)
    <pre><code data-trim contenteditable>
node myfile.js
</code></pre>
    <pre><code data-trim contenteditable>
pines:~ joe$ node
> console.log('REPL time!')
</code></pre>
* {:.fragment} and Chrome for running JavaScript in browser (which is, coincidentally, also __v8__)

<aside class="notes">
Let's try some server side and browser JavaScript
</aside>
</section>


<section markdown="block">
## A few Notes on How You'll be Writing Programs

* use any text editor you want 
* some editors that I, as well as other students, have used in the past:
    * [Visual Studio Code](https://code.visualstudio.com/) (has great debugging tools, frequent releases)
	* [WebStorm](https://www.jetbrains.com/webstorm/) (for a full _IDE_ experience)
    * [Atom](https://atom.io/) 
	* [sublimetext](https://www.sublimetext.com/)
	* [vim](https://vim.sourceforge.io/) or [emacs](https://www.gnu.org/software/emacs/) 

<br>
__Choose the one that you're most comfortable with__! 

(I use vim in class, but you should work with the editor that you're the most productive in).
{:.fragment}
</section>

{% comment %}
<section markdown="block">
## Let's End With a Quick Survey

I'd like to get an idea of what languages / technologies everyone has had experience with. 

* __please fill out__ [this survey]({{ site.vars.survey_intro }}) rn 
* take ~5 minutes to do this in class (you can finish it up outside of class later)
* (it's also my secret way of taking attendance)
* (and collecting your GitHub usernames)
</section>
{% endcomment %}
