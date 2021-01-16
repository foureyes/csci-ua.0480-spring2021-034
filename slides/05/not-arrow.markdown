---
layout: slides
title: "Where Not to Use Arrow Functions"
---
<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>
<section markdown="block">
## Arrow Functions are Useful!

In arrow functions, `this` is whatever `this` refers to in the context where the arrow function was created. So, the code below, which produces a bunch of `undefined`'s,  __can be fixed by converting the anonymous function into an arrow function__. &rarr;

<pre><code data-trim contenteditable>
const counter = {numbers: [1, 2, 3, 4], animal:'owl'};
counter.count = function() {
    this.numbers.forEach(function(n) {
        console.log(n, this.animal + (n > 1 ? 's' : ''));
    });
};
counter.count(); // uh-oh... prints undefined 4 times!!!!
</code></pre>

__Fixed by arrow functions:__ &rarr;
{:.fragment}

<pre><code data-trim contenteditable>
counter.count = function() {
    this.numbers.forEach((n) => {
        // this refers to the this in count!
        console.log(n, this.animal + (n > 1 ? 's' : ''));
    });
}; // ah, saved by an arrow function
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Where _Not_ to Use Arrow Functions

Well, if arrow functions are so great, __why don't we use arrow functions all of the time?__ &rarr;

__There are some places where they don't work quite right.__ 
{:.fragment}

* {:.fragment} creating constructors
* {:.fragment} creating methods
    * {:.fragment} either on object literals
    * {:.fragment} or on prototypes
* {:.fragment} (not relevant now, but) creating `addEventListener` callbacks where you want `this` to refer to the element that generated the event

<br>
__But why not?__ &rarr;
{:.fragment}

Remember, arrow functions do not bind `this` to a new value, and instead gets its `this` from the enclosing scope
{:.fragment}
</section>


<section markdown="block">
## Arrow Functions Cannot be Constructors

__In the following code, we try to use an arrow function as a constructor.__ &rarr;

<pre><code data-trim contenteditable>
const Cat = (name) => {
    this.name = name;
}
</code></pre>

Creating the function works fine, but if we try to use it with `new`:

<pre><code data-trim contenteditable>
var c = new Cat();
</code></pre>

We get...

<pre><code data-trim contenteditable>
var c = new Cat();
        ^
TypeError: Cat is not a constructor
</code></pre>
{:.fragment}

Instead, use the usual function declaration to create constructors:
{:.fragment}

<pre><code data-trim contenteditable>
function Cat(name) {
    this.name = name;
}
</code></pre>
{:.fragment}

</section>

<section markdown="block">
## Arrow Functions as Methods

__What is the output of this code?__ &rarr;

<pre><code data-trim contenteditable>
function Cat(name) {
    this.name = name;
}
Cat.prototype.meow = (() => {
    console.log(this.name, 'meows');
});
var c = new Cat('paw newman');
c.meow();
</code></pre>

<pre><code data-trim contenteditable>
undefined meows
</code></pre>
{:.fragment}

* {:.fragment} ...because arrow functions do not bind a new value to `this`
* {:.fragment} again, `this` remains the same as the `this` in the containing context / scope
* {:.fragment} (which, in this case is the global object)
</section>

<section markdown="block">
## Arrow Functions as Methods on Object Literals

__What's the output of this code?__ &rarr;

<pre><code data-trim contenteditable>const cat = {
    sound: 'meow',
    meow: () => {console.log(this.sound);}
};
cat.meow();
</code></pre>

<pre><code data-trim contenteditable>
// once again...
undefined
</code></pre>
 {:.fragment} 
</section>
<section markdown="block">
## Arrow Functions and `addEventListener`

__To be complete... be careful when using arrow functions and `addEventListener`__ &rarr;

Starting with this code:
<pre><code data-trim contenteditable>
const button = document.createElement('button');
document.body.appendChild(button).textContent = 'Click Me';
</code></pre>

The following listeners alert different messages!
{:.fragment}

<pre><code data-trim contenteditable>
// alerts window object (essentially global)
button.addEventListener('click', () => {alert(this)});
</code></pre>
{:.fragment} 

<pre><code data-trim contenteditable>
// alerts button element
button.addEventListener('click', function()  {alert(this)});
</code></pre>
{:.fragment}

* {:.fragment} if you want `this` in your event handler to reference the element event's target element, then use function expressions
* {:.fragment} ...because arrow functions don't create their own `this`, and instead use the this from the surrounding context

</section>

