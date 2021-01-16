---
layout: slides
title: "Higher Order Functions (Continued)"
---

<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}

<p><small></small></p>
</section>

<section markdown="block">
## Abstraction

__What's abstraction again?__ &rarr;

<div markdown="block" class="img">
![pollock]({{ site.vars.slides_img_prefix }}/pollock.jpg)
</div>

__Abstraction__ is the process of hiding away necessary, yet immaterial details so that the programmer can focus on solving the actual higher-level problem...
{:.fragment}

__What are some _features_ in JavaScript that facilitate abstraction?__ &rarr;
{:.fragment}

* (obvs) functions
* functions as first-class objects
* __higher order functions__ 
{:.fragment}
</section>

<section markdown="block">
## Higher Order Functions

Greeeaaaat. __What's a higher order function, though?__ &rarr;

A __higher order function__ is a function that does at least one of the following things: &rarr;
{:.fragment}

* accepts a function or functions as a parameter 
* returns a function
{:.fragment}
</section>

<section markdown="block">
## Array Methods

We learned about (and even _re-implemented_) four array methods that accepted functions as arguments (specifically as _callback_ functions). __What were these array methods, and what do they do?__ &rarr;


* [forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach]) - calls callback on each array element
* [filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) - returns a new filtered array based on test/callback
* [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) - returns a new transformed array based on callback
* [reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) - reduces original array to single value based on callback
{:.fragment}
</section>

<section markdown="block">
## forEach

An array's __forEach__ method executes a callback on every array element.

* __1 parameter__ - a callback function that is executed with the current element, index and original array
* __returns__ undefined
* __example__ &rarr;

<pre><code data-trim contenteditable>
// log double the value of every element in the array
const numbers = [3, 4, 5];
numbers.forEach(function(element) {
	console.log(element);
});
</code></pre>

Also, our homegrown implementation as a standalone function.
{:.fragment}

<pre><code data-trim contenteditable>
function forEach(arr, action) {
	for (let i = 0; i < arr.length; i++) {
		action(arr[i]); 
	}
}
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## filter

An array's __filter__ method returns a new array of elements that each pass some test/callback.

* __1 parameter__ a function, test, that is executed with the current element, index and original array... and returns either true or false
* __returns__ a new filtered array
* __example__ (note...  <code>indexOf</code> returns the index of a substring in a string... and it returns -1 if the substring is not found)

<pre><code data-trim contenteditable>
// only give back the strings that start with 'ba'

const words = ['foo', 'bar', 'baz', 'qux'];
const filtered_words = words.filter(function(word) {
	return word.indexOf('ba') !== -1;
});
console.log(filtered_words);
</code></pre>

</section>

<section markdown="block">
## A DIY Filter Function

We implemented <code>filter</code> as a standalone function as well. __The algorithm was fairly compact; what was it?__ &rarr;

1. create a new array to hold the filtered elements
2. go through every element in the original array
3. check to see if it passes the test (execute the callback on it)
4. if it passes, add it to the new array
{:.fragment}

<br>
__And the implementation...__ &rarr;
{:.fragment}

<pre><code data-trim contenteditable>
function filter(arr, test) {
	const filtered = [];
	arr.forEach(function(element) {
		if(test(element)) {
			filtered.push(element)
		}
	});
	return filtered;
}
</code></pre>
{:.fragment}
</section>

<section markdown="block">
# Now let's check out map and reduce.

### Let's build our own version of each first ...
</section>

<section markdown="block">
## Transforming with Map

__Create a function called map that creates a new array based on calling a function on each element of an array passed in:__ &rarr;

* __2 parameters__ - an array to base new array off of and a function to transform each element
* __returns__ a new array with each element of original transformed by callback function
* test it by creating an array of words and transforming that array into an array of words each with two exclamation points at the end

<br>
__What would the algorithm be?__&rarr;

1. create a new array to hold the transformed elements
2. go over every element in the original array
3. call the function on each element
4. add the result of calling the function to the other array
{:.fragment}
</section>

<section markdown="block">
## Map Continued

__Here's a potential implementation, along with example usage, of our own <code>map</code> implementation.__ &rarr;

<pre><code data-trim contenteditable>
function map(arr, transform) {
	const transformed = [];
	arr.forEach(function(element) {
		transformed.push(transform(element));
	});
	return transformed;
}
const result = map(['hello', 'hey', 'hi'], function(greeting) {return greeting + '!!'});
console.log(result);
</code></pre>
</section>

<section markdown="block">
## Using an Array's Map Method

Again, JavaScript arrays already have a [map method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)...

* __1 parameter__ - a callback (the function that transforms each element) 
* the _callback_ is executed with the current value, index and original array 
* the _callback_ __returns__ a new value/object to be added
* map __returns__ a new array with every element transformed

<br>
__Try using it to change every word in the list <code>['hey','yo','sup']</code> to uppercase with an exclamation point.__ &rarr;

<pre><code data-trim contenteditable>
words = ['hey', 'yo', 'sup']
const shoutedWords = words.map(function(word) {
	return word.toUpperCase() + '!';
});
console.log(shoutedWords);
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Reducing an Array to a Single Value

__Create a function called reduce... that repeatedly calls a function to reduce an array to a single value.__ &rarr;

* __3 parameters__ 
	* the original array 
	* a callback function to perform the reduction 
	* a start value to initialize the variable that will hold the single value to be returned 
* the _callback_ should 
	* take both the current _accumulated_ value, and the current element
	* return the new _accumulated_ value
* an __example__ in the next slide... &rarr; 

</section>

<section markdown="block">
## Reduce Continued

<pre><code data-trim contenteditable>
// result is 20
console.log(reduce([4, 12, 5], function(accum, ele) {
  return accum + ele;  
}, 0));
</code></pre>

__What do you think the algorithm for reduce would look like?__ &rarr;

1. create a variable, an accumulator, that will be returned
2. initialize it to _start_
3. for every element in the original array...
4. apply the callback... 
5. set the accumulator to the result of the callback
6. return the accumulator
{:.fragment}
</section>

<section markdown="block">
## Our Version of Reduce

<pre><code data-trim contenteditable>
function reduce(arr, combine, start) {
  const accum = start;
  arr.forEach(function(ele){
    accum = combine(accum, ele); 
  }); 
  return accum;
}

console.log(reduce([4, 12, 5], function(accum, ele) {
  return accum + ele;  
}, 0));

</code></pre>
</section>


<section markdown="block">
## Reduce Continued

Here's an example of finding the minimum (uses first element as initial min) with reduce:

<pre><code data-trim contenteditable>
const numbers = [-5, -2, -1, -10, -3];

console.log(reduce(numbers, function(accum, ele) {
  if(accum < ele) {
    return accum;
  } else {
    return ele; 
  }
}, numbers[0]));
</code></pre>
</section>


<section markdown="block">
## Using an Array's Reduce Method

 JavaScript arrays have a built-in [reduce method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce). (Note that in other functional languages, __reduce__ is sometimes called __fold__.)

* __2 parameters__ a callback function (the function that _reduces_ the array) and the optional start value of the accumulator (if the start doesn't exist, it uses the first element of the array that it was called on)
* callback is executed with accumulator, element value, element index and original array object
* callback returns a value (the new value for the internal accumulator)
* reduce __returns__ a single value (that value can be an Array, Object, etc.)

<br>
__Try using it to calculate the product of all of the elements in <code>[2, 5, 4, 3,]</code>.__ &rarr;

<pre><code data-trim contenteditable>
[2, 5, 4, 3,].reduce(function(product, currentNumber ){
	return product * currentNumber;
}, 1);
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Aaaaand Freestyle

Using <code>forEach</code>, <code>filter</code>, <code>map</code>, and/or <code>reduce</code>, __can you try to count all of the face cards in the following array?__ &rarr;

<pre><code data-trim contenteditable>
const cards = [{'suit':'♦', 'face':'4'},
             {'suit':'♠', 'face':'J'},
             {'suit':'♠', 'face':'Q'},
             {'suit':'♣', 'face':'Q'},
             {'suit':'♠', 'face':'2'},
             {'suit':'♦', 'face':'7'},
             {'suit':'♥', 'face':'K'}];
</code></pre>
<div markdown="block" class="img">
![jack]({{ site.vars.slides_img_prefix }}/jack.png)
</div>
</section>

<section markdown="block">
## Counting Face Cards

__Let's try the most convential way... together__. 

{% comment %}
(also, add it to your [in-class programming activity form](https://docs.google.com/a/nyu.edu/forms/d/e/1FAIpQLSfvbcstf1-IKNVD-YFK77X_zr4ph3f8dYLlo1jBwdNswTwVaQ/viewform)). &rarr;
{% endcomment %}

<pre><code data-trim contenteditable>
let count = 0;
cards.forEach(function(card) {
	if (['K', 'Q', 'J'].indexOf(card.face) !== -1) {
		count += 1;
	} 
});
console.log(count);
</code></pre>
{:.fragment}


__Now write your own versions using the following two methods...__  &rarr;
{:.fragment}

1. {:.fragment} with an <code>Array</code>'s <code>filter</code> method
2. {:.fragment} ...and an <code>Array</code>'s <code>reduce</code> method

{% comment %}
<pre><code data-trim contenteditable>
function isFaceCard(card) {
  return ['J', 'Q', 'K'].indexOf(card.face) !== -1;
}
console.log(cards.filter(isFaceCard).length);
</code></pre>
{:.fragment}

__Finally, with reduce__ ...
{:.fragment}

<pre><code data-trim contenteditable>
function count(curTotal, card) {
  return ['J', 'Q', 'K'].indexOf(card.face) !== -1 ? curTotal + 1: curTotal;
}
console.log(cards.reduce(count, 0));
</code></pre>
{:.fragment}
{% endcomment %}
</section>

<section markdown="block">
## Composability / Chaining

__Try using all 3 methods to run an analysis on some stats from game 5 of the 2014 NBA finals.__  &rarr;

* print out the __average shooting percentage for each team__, the Spurs and the Heat
* use the object below as the data set
* each player is associated with either team through the <code>"team"</code> property
* shooting percentage is field goals made (<code>"FGM"</code>) divided by field goals attempted (<code>"FGA"</code>)

<pre><code data-trim contenteditable>
const players = [
{"lastName":"Duncan", "team":"Spurs", "FGM":5, "FGA":10},
{"lastName":"Parker", "team":"Spurs", "FGM":7, "FGA":18},
{"lastName":"Ginobili", "team":"Spurs", "FGM":6, "FGA":11},
{"lastName":"James", "team":"Heat", "FGM":10, "FGA":21},
{"lastName":"Wade", "team":"Heat", "FGM":4, "FGA":12},
{"lastName":"Bosh", "team":"Heat", "FGM":6, "FGA":14}
];
</code></pre>
</section>

<section markdown="block">
## Shooting Percentages for The Spurs and Heat

Note that you can continue to chain calls to <code>map</code>, <code>filter</code>, and <code>reduce</code> as long as you get an array back. 

__Here's a potential solution. There are a few utility functions declared for clarity and readability.__ &rarr;

<pre><code data-trim contenteditable>
function heat(player) { return player.team === 'Heat'; }
function spurs(player) { return player.team === 'Spurs'; }
function shootingPercentage(player) { return player.FGM / player.FGA; }
function sum(curTotal, num) { return curTotal + num}
function average(arr) { return arr.reduce(sum, 0) / arr.length; }

console.log(average(players.filter(heat).map(shootingPercentage)).toFixed(2));
console.log(average(players.filter(spurs).map(shootingPercentage)).toFixed(2));
</code></pre>

__Seems to map more closely to what we're actually trying to do rather than creating a bunch of for loops.__

</section>

<section markdown="block">
## Two Separate Functions for Filtering?

Maybe having a function that checks against a hardcoded string doesn't sit well with you. Admittedly, <code>heat(player)</code> and <code>spurs(player)</code> do seem like throw away functions.

__Is there a way that we can replace both of those functions with one?__ &rarr;


<pre><code data-trim contenteditable>
function inTeam(teamName) {
  return function(player) { return player.team === teamName; }
}
console.log(average(players.filter(inTeam('Heat')).map(shootingPercentage)).toFixed(2));
console.log(average(players.filter(inTeam('Spurs')).map(shootingPercentage)).toFixed(2));

</code></pre>
{:.fragment}
</section>
<section markdown="block">
## GINOBILI!!!

A quick side note: that guy __Ginobili__ is an Argentinian basketball player that once hit a flying bat out of the air during a game.

<div markdown="block" class="img">
![ginobili]({{ site.vars.slides_img_prefix }}/ginobili.gif)
</div>
{:.fragment}

(BTW, I don't condone hurting animals, but I do love animated gifs _a lot_)
{:.fragment}

</section>

<section markdown="block">
## A Quick Summary of the Methods we Just Saw

* [forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach]) - calls callback on each array element
* [filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) - returns a new filtered array based on test/callback
* [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) - returns a new transformed array based on callback
* [reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) - reduces original array to single value based on callback
</section>


<section markdown="block">
## Performance

### We're gaining readability, expressiveness, etc. ... at the cost of performance

__We make that trade-off all the time__, which is why we're not writing with super-fast machine code, but with _slower_ high-level languages, like JavaScript or Python.

* a <code>for</code> loop will likely outperform <code>forEach</code>, <code>map</code>, <code>filter</code> and <code>reduce</code>
* some of it may stem from the overhead of repeatedly executing functions
* but... for general cases, modern-day computers are fast enough where it's not really a perceptible difference (depending on the data set and number of iterations, of course)
</section>

<section markdown="block">
## An Aside on Arrow Function Usage

For now, __we'll use arrow functions as:__ &rarr; 

* {:.fragment} a quick way of creating anonymous callback functions...
* {:.fragment} for example, if we need to pass a one-time use function as an argument to a higher order function (like map):
    <pre><code data-trim contenteditable>const nums = [1, 2, 3, 4, 5];
console.log(nums.filter(x => x % 2 === 0));
</code></pre>
* {:.fragment} or... occasionally, we can use them to define _regular_ functions as well:
    <pre><code data-trim contenteditable>
const isEven = (x) => {return x % 2 === 0;};
</code></pre>
* {:.fragment} we'll see later that arrow functions are sometimes useful because the `this` value within its body is the same as `this` in the scope that it was created in (this will make more sense when we discuss `this`!)



</section>


<section markdown="block">
## Functions as Objects

__Continuing on with the notion that functions are just values or objects... do you think functions also have properties and methods?__

Why yes - functions have both [properties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function#Properties) and [methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function#Methods)!  For example:
{:.fragment}

<pre><code data-trim contenteditable>
const f = function(x, y, z) {
	return x - y + z;
}
console.log(f.length);
</code></pre>
{:.fragment}

Let's check out some __methods__ that you can call on function objects: 
{:.fragment}

* <code>bind</code>
* <code>apply</code> 
* <code>call</code>
{:.fragment}
</section>

<section markdown="block">
## Methods on Function Objects

So, what do these methods do?

* [call](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call) - calls a function with given <code>this</code> and individual arguments
* [apply](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) - calls a function with given <code>this</code> and array as arguments
* [bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) - creates a new function with given <code>this</code>, and optionally with set argument values

<br>
(we'll talk about __this__ in a moment)

</section>
<section markdown="block">
## Call and Apply

__Both <code>call</code> and <code>apply</code> immediately execute the function that they're called on.__

* they differ in the way that arguments are passed to the original function object (<code>call</code> passes each argument individually, while <code>apply</code> passes an array)
* the example below sets <code>this</code> to null - we'll see more about <code>this</code> later
<pre><code data-trim contenteditable>
function areaTriangle(base, height) {
	return (1 / 2 ) * base * height;
}

const result1 = areaTriangle.call(null, 10, 20);
console.log(result1);
const result2 = areaTriangle.apply(null, [10, 20]);
console.log(result2);
</code></pre>

</section>

<section markdown="block">
## Bind

Unlike the previous methods, __<code>bind</code>__ doesn't execute the function that it's called on. Instead, <code>bind</code>:

* takes a <code>this</code> argument
* and an optional set of fixed parameters
* returns a new function

<br>
It's actually an implementation of __partial application__...

* __partial application__ - fixing a number of arguments to a function, producing another function of smaller __arity__
* __arity__ - the number of arguments or operands that a function or operation accepts
</section>

<section markdown="block">
## Bind Example

__Fixing the first parameter, called <code>base</code>, of our function.__

<pre><code data-trim contenteditable>
const areaTriangleBase100 = areaTriangle.bind(null, 100);

// call with only one argument now
console.log(areaTriangleBase100(3));
</code></pre>

<br>
Note that you'll also see <code>bind</code> used to fix/set a function or method's <code>this</code>.
</section>

<section markdown="block">
## ES6 Spread and Rest

Hey... so remember the rest operator, `...args`? __What was it?__ &rarr;

* {:.fragment} if the last named argument of a function has `...` before it (the `rest` operator) 
* {:.fragment} then the arguments passed in at that position are condensed into a single `Array`
* {:.fragment} for example: 
    <pre><code data-trim contenteditable>
function f(a, b, ...args) { console.log(args); }
f('foo', 'bar', 'baz', 'qux'); // prints out ['baz', 'qux']
* {:.fragment} notice that every value after and including the 3rd argument are collected into an Array
* {:.fragment} again, this allows for an arbitrary number of trailing arguments to be passed in to a function
* {:.fragment} (this is called a __variadic__ function, a function that can have and indefinite number of arguments / arity!)

</section>

<section markdown="block">
## ES6 Spread and Rest Continued

An operator that shares the same syntax but __does the opposite of the rest operator__ is the __spread operator__. 

* {:.fragment} the spread operator takes an Array and breaks it up into parts!
* {:.fragment} this can be used in function calls: `f(...someArray)`
* {:.fragment} as well as in `Array` literals: `[1, 2, ...someArray]`

</section>

<section markdown="block">
## Spread Operator in Function Calls

The parameters for res are value and radix... and in this case, we're able to expand the incoming Array to fit the arguments by using the __spread operator__:

<pre><code data-trim contenteditable>
const stuff = ['101', 2];
const res = parseInt(...stuff);
console.log(res);
</code></pre>

* {:.fragment} the first element of stuff becomes the first argument to `parseInt`, the second becomes the last argument 
* {:.fragment} if there are too few or too many elements in the `Array`, JavaScript will behave as if there were too few or too many arguments
* {:.fragment} which is to say... _fine_ - excess arguments are ignored and arguments not given a value are undefined... 


</section>

<section markdown="block">
## Spread Operator in Function Calls Continued
    
__What does the following code print out?__ &rarr;

<pre><code data-trim contenteditable>
const words = ['foo', 'bar'];
function logThreeThings(a, b, c) {
    console.log(a, b, c); 
}
logThreeThings(...words); 
</code></pre>
{:.fragment}

`foo bar undefined`
{:.fragment}
</section>

<section markdown="block">
## Spread Operator in Array Literals

The __spread operator__ can also be used to expand Arrays within Array literals:

<pre><code data-trim contenteditable>
const words = ['foo', 'bar', 'baz'];
const moreWords = ['start', ...words, 'end']
console.log(moreWords);
// [ 'start', 'foo', 'bar', 'baz', 'end']
</code></pre>

You can also use the spread operator to make a shallow copy of an Array:

<pre><code data-trim contenteditable>
const arrs = [[1, 2], [3, 4]];
const newArrs = [...arrs];
console.log(newArrs); // yay copied!

arrs[0].push('surprise!');
console.log(newArrs); // beware, shallow!
</code></pre>
</section>

<section markdown="block">
## Now Back to Higher Order Functions; We Can Make Our Own!

### (As we saw with our own implementations of some array methods)

* create functions that return entirely new functions (we've done this)
* create functions that wrap or _decorate_ other functions
</section>



<section markdown="block">
## Let's Try Creating a Wrapping Function

__How about creating a function that logs how much time a function takes to execute?__ &rarr;

* create a function, <code>logExecutionTime</code>, that takes a function, <code>f</code>, as an argument
* it returns a new version of <code>f</code> that logs how much time it took to execute (in addition to doing whatever it usually does as a function, of course!)
* we can use <code>console.time</code> and <code>console.timeEnd</code> to take the timings

{:.fragment}

</section>
<section markdown="block">
## Function Timing Implementation

__Here's one possible way to do it.__ &rarr;

* create a function that just calls the function passed into it
* and gives back whatever that function returns
* the only extra thing that it will do is take the time before and after the function call

<pre><code data-trim contenteditable>
function logExecutionTime(f) {
	return function(arg) {
		console.time('function timing');
		const val = f(arg);
		console.timeEnd('function timing');
		return val; 
	};
}

function wasteTime(limit) { for(let i=0;i < limit; i++) { }}
wasteTime = logExecutionTime(wasteTime);
wasteTime(5000000);
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Another Look at Function Timing

Hm. So... there's a limitation with regards to the kinds of functions that we can time. __Can you spot it?__ &rarr;

__Hint__: __How would it handle the following function?__ &rarr;
{:.fragment}

<pre><code data-trim contenteditable>
function wasteTime2(start, limit) { 
	for(let i = start; i < limit; i++) { } 
}
</code></pre>
{:.fragment}

__What if the timed function needs more than one argument?__ &rarr;
{:.fragment}

<pre><code data-trim contenteditable>
function logExecutionTime(f) {
  return function(...args) {
  	console.time('function timing');
    // use spread and rest
    const val = f(...args);

    // old way with es5, with apply
  	// const val = f.apply(null, arguments);
  	console.timeEnd('function timing');
  	return val; 
  };
}
wasteTime = logExecutionTime(wasteTime);
wasteTime(-5000000, 5000000);
</code></pre>
{:.fragment}

</section>

<section markdown="block">
## Decorators

A function that accepts another function as a parameter, wraps its call in another function, and returns that wrapper as a new function... is called a __function decorator__.

__Why might function decorators be a useful? When would it make sense to implement a decorator rather than to modify an actual function?__ &rarr;

* {:.fragment} they allow us to modify how a function runs, even one that we did not write!
* {:.fragment} decorators can be reused! for example, you can make any function a timed function, but should you need to change the implementation of timing, you only change it in one place
* {:.fragment} there's potential for combining / chaining decorators!
</section>

<section markdown="block">
## Practical Applications

__Decorators might come in handy whenever you want to do something before or after a function runs.__ &rarr;

* {:.fragment} as we saw, function timing makes a lot of sense
* {:.fragment} perhaps caching
* {:.fragment} permissions checking (before a function runs)

</section>
<section markdown="block">
## Review

__We just saw a bunch of higher order functions in JavaScript__... and we even __created our own__.

* Array Methods
	* forEach
	* map
	* filter
	* reduce
* Function Methods
	* call
	* apply
	* bind

</section>
{% comment %}

null

* simulates method call
* we're using null

## difference between null and undefined

{% endcomment %}

