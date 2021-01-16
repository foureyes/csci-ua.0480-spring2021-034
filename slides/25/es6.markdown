---
layout: slides
title: "Some ES6 Features!"
---
<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## ES6

__Where is it available?__ &rarr;

* most features are supported by __node (server side)__
    * [see the compatibility table](http://kangax.github.io/compat-table/es6/)
    * there are some exceptions, notably `import`/modules
* same for most modern browsers (client side)
* feel free to use in your code!
</section>

<section markdown="block">
## Declaring Variables

__We can declare variables using these keywords:__ &rarr;

* `var` - (we've know this!) function level scope
* `let` - es6! ... block level scope
* `const` - es6! ... block level scope, but you can't reassign this name to another object
    * note - does not make value constant
    * you just can't use `=` again
        <pre><code data-trim contenteditable>
// AN ERROR OCCURS!
const foo = 'bar';
foo = 'baz';
</code></pre>

<br>

</section>

<section markdown="block">
## const, let, and var

__OK... so, which is the right one to use?__ &rarr;

1. __NEVER USE__ `var` again!
2. consider using `const` for all variable declarations
3. some common places to use `let`: ... perhaps in a for loop
    <pre><code data-trim contenteditable>
for(let i = 0; i < 5; i++) {
    console.log(i);
}
</code></pre>

<br>

Note that this will not work!

<pre><code data-trim contenteditable>
for(const i = 0; i < 5; i++) {
    console.log(i);
}
</code></pre>
</section>

<section markdown="block">
## Block Level Scope?

Using `let` and `const` gives you block level scope, so, now, __JavaScript may behave more _normally_:__ &rarr;

<pre><code data-trim contenteditable>
for(let i = 0; i < 5; i++) {
    console.log(i);
    let greeting = "hello " + i;
}
// these console.logs  will give an error!
console.log(i); 
console.log(greeting); 
</code></pre>

`greeting` and `i` are only available within curly braces, such as within:

* within a function definition
* a loop / other control structure
* etc.


</section>

<section markdown="block">
## Temporal Dead Zone

ALSO.. __`let` and `const` now act _normally_ vs `var`__ &rarr;

<pre><code data-trim contenteditable>
console.log(foo);
var foo = 'bar';
// works fine
</code></pre>
<pre><code data-trim contenteditable>
console.log(foo);
let foo = 'bar';
// does not work
</code></pre>

Temporal because... it's __when__ let is declared, not where it is in actual code.

</section>

<section markdown="block">
## Arrow Functions

__We use function expression__ &rarr;

* as anonymous functions (when we need a callback, but we don't want to define a separate named function)
* for creating functions as values to assign to a variable or property name

<pre><code data-trim contenteditable>
function(arg1, arg2) {
    // body
}
</code></pre>

ES6 allows new syntax and semantics for doing this, using __arrow function__ &rarr;

<pre><code data-trim contenteditable>
(arg1, arg2) => { // body goes here }
</code></pre>

* `this` in arrow function is this of enclosing context / scope
* works the way you expect (it won't _just be global_ for most cases)
    * maybe no more `bind` needed!
</section>

<section markdown="block">
## Why Use Arrow Functions

This just seems like the same thing as function expressions, though. __Why use arrow functions _at all_?__ &rarr;

* concise syntax!
* `this` is the same this as context that arrow function was declared in

<br>
__Um, what does that mean exactly?__

</section>


<section markdown="block">
## First, A Problem

__Check out this contrived code. What do you think the output is?__ &rarr;

<pre><code data-trim contenteditable>
function Transformer(number) {
    this.number = number;
}
</code></pre>

<pre><code data-trim contenteditable>
Transformer.prototype.multiply = function(arr) {
    return arr.map(function(ele) {
        return this.number * ele;
    });
};
</code></pre>

<pre><code data-trim contenteditable>
const t = new Transformer(2);
const result = t.multiply([1, 2, 3, 4]);
console.log(result);
</code></pre>

<pre><code data-trim contenteditable>
// the output is (!!??):
[ NaN, NaN, NaN, NaN ]
</code></pre>
{:.fragment}

</section>

<section markdown="block">
## What Happened?

__Take a close look at the `multiply` method:__ &rarr;

<pre><code data-trim contenteditable>
Transformer.prototype.multiply = function(arr) {
    return arr.map(function(ele) {
        return this.number * ele;
    });
};
</code></pre>

__Why did we get an `Array` of `NaN`'s?__ &rarr;

* {:.fragment} the function passed to map refers to `this.number`
* {:.fragment} that function is called as a regular function because it's not called with the context of an object
* {:.fragment} so `this` is global, and `this.number` is undefined
</section>

<section markdown="block">
## And Back to Arrow Functions

__If we make a slight modification to our `multiply` method, we'll see the advantage of arrow functions in this situation__ &rarr;

<pre><code data-trim contenteditable>
Transformer.prototype.multiply = function(arr) {
    return arr.map((ele) => {
        return this.number * ele;
    });
};
</code></pre>

* now... `this` will be the same this as the enclosing context (which is the `multiply` method)
* the `multiply` method's `this` is set to the instance that it was called on!

<br>
__We'll discuss arrow functions a little more later on in these slides.__ &rarr;

</section>

<section markdown="block">
## String Interpolation

Create a string with backticks:

<pre><code data-trim contenteditable>
const target = 'world';
console.log(`hello ${target}`)
</code></pre>


</section>

<section markdown="block">
##  Destructuring

Think of it as multiple assignment:

* works with Arrays
* works with objects (but you use curly braces instead)

<br>

<pre><code data-trim contenteditable>
const coord = [1, 2];
let [x, y] = coord;
console.log(x); // 1
console.log(y); // 2
</code></pre>

<pre><code data-trim contenteditable>
const {a, b} = {a: 1, b:2}
</code></pre>

</section>

<section markdown="block">
# More ES6!
</section>


<section markdown="block">
## Arrow Functions Again

Arrow functions are already pretty concise. In ES5, you might find code that looks like this:

<pre><code data-trim contenteditable>
var numbers = [1, 2, 3, 4];
var result = numbers.map(function(num) { return num * 2});
</code></pre>
{:.fragment}

With arrow functions, that becomes:
{:.fragment}

<pre><code data-trim contenteditable>
const numbers = [1, 2, 3, 4];
const result = numbers.map((num) => {return num * 2});
</code></pre>
{:.fragment}

In fact, we can drop the parentheses, curly braces and rely on the fact that arrow functions will implicitly return the last expression to drop the `return` to get this:
{:.fragment}

<pre><code data-trim contenteditable>
const numbers = [1, 2, 3, 4];
const result = numbers.map(num => num * 2);
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Where _Not_ to Use Arrow Functions

That was pretty great, so __why don't we use arrow functions all of the time?__ &rarr;

__There are some places where they don't work quite right.__ 
{:.fragment}

* {:.fragment} creating addEventListener callbacks where you want `this` to refer to the element that generated the event
* {:.fragment} creating constructors
* {:.fragment} creating methods
    * {:.fragment} either on object literals
    * {:.fragment} or on prototypes

<br>
__But why not?__ &rarr;
{:.fragment}

Remember, arrow functions do not bind this to a new value, and instead gets its this from the enclosing scope
{:.fragment}


</section>

<section markdown="block">
## Arrow Functions and `addEventListener`

__Be careful when using arrow functions and `addEventListener`__ &rarr;

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
## Object Literals

__While we're on the subject of object literals, we should also take a quick look at:__ &rarr;

* Shorthand methods
* Dynamic / calculated properties

</section>

<section markdown="block">
## Shorthand Methods

__In ES5, you can create methods on objects simply by setting properties equal to function expressions:__ &rarr;

<pre><code data-trim contenteditable>
const obj = {
  f: function() {console.log('fffff!');},
  g: function() {console.log('ggggg!');},
};
obj.f();
obj.g();
</code></pre>

Unfortunately, we can't use arrow functions (see previous slides) for methods on objects, but there is a shorthand ES6 syntax that makes things a little more concise:

<pre><code data-trim contenteditable>
// the function() part can be dropped:
const obj = {
    f() {console.log('fffff!');},
    g() {console.log('ggggg!');},
};
</code></pre>

</section>

<section markdown="block">
## Calculated Property Names 

__ES6 allows you to use calculated/dynamic values as property names in object literal notation__ &rarr;

<pre><code data-trim contenteditable>
const propName = 'published';
const book = {title: 'Snowcash', [propName]: 1992};
console.log(book.published);
</code></pre>

* `propName` is a variable that contains the value `published`
* which means that using `[propName]` creates a property on the object `book` called `published`
* (you could always create property/value pairs with properties that are variables by using assignment on an existing object) 
* (but now it can be done in an object literal as well!)

</section>

<section markdown="block">
## Classes

__Since we're talking about objects, we should also discuss ES6 classes.__

* they're syntactic sugar for creating constructors and methods
* in actuality, everything is still prototypes and constructor functions
* but now there's more familiar syntax to create constructors, methods... and "classes"
</section>

<section markdown="block">
## Example ES6 Class

__These two bits of code both produce a function called `HttpRequest`!__ &rarr;

ES6 class:

<pre><code data-trim contenteditable>
class HttpRequest {
}
</code></pre>

ES5 constructor:

<pre><code data-trim contenteditable>
function HttpRequest() {
}
</code></pre>

Both result in the same output when used in the following manner:

<pre><code data-trim contenteditable>
const req = new HttpRequest();
console.log(HttpRequest);
console.log(typeof req.constructor);
console.log(req.constructor.name);
</code></pre>

</section>

<section markdown="block">
## Constructors

ES6 style classes allow for a constructor to be defined as follows:

* within the class definition, create a function called constructor
* no function keyword is required
* the constructor has access to `this` which represents the instance that is created

<br>
<pre><code data-trim contenteditable>
class HttpRequest {
    constructor(method, url) {
        this.method = method;
        this.url = url;
    }
}
</code></pre>

The above code is _mostly_ the same as this ES5 function that can be used as a constructor:

<pre><code data-trim contenteditable>
function HttpRequest(method, url) {
   this.method = method;
   this.url = url;
}
</code></pre>

We'll see later that subclass constructors must call super before using `this`.
</section>

<section markdown="block">
## Methods in ES5

__In ES5, to add a method to the prototype, we'd have to do something like this:__&rarr;

<pre><code data-trim contenteditable>
function HttpRequest(method, url) {
   this.method = method;
   this.url = url;
}
</code></pre>

<pre><code data-trim contenteditable>
HttpRequest.prototype.makeRequest = function() {
    return this.method + ' ' + this.url + ' HTTP/1.1';
}
</code></pre>

</section>

<section markdown="block">
## Methods in ES6

__In ES6, we can define methods directly in the class definition, and they will show up in the instances' prototype__ &rarr;

<pre><code data-trim contenteditable>
class HttpRequest {
  constructor(method, url) {
    this.method = method;
    this.url = url;
  }

  makeRequest() {
    return this.method + ' ' + this.url + ' HTTP/1.1';
  }
}
</code></pre>

* note that there are no commas between method and constructor definitions
* again, you do not have to use the keyword, `function`
* methods, of course, can reference `this`, and if the method is called within the context of an instance, then `this` refers to the instance

</section>

<section markdown="block">
## ES6 Methods Continued

__Note that creating these methods in ES6 style classes is _actually_ just adding to the prototype!__ &rarr;

<pre><code data-trim contenteditable>
const req = new HttpRequest('GET', 'http://foo.bar/baz');
console.log(req.makeRequest());
console.log(Object.getPrototypeOf(req).makeRequest);
</code></pre>

</section>

<section markdown="block">
## Inheritance

__Use `extends` to inherit from a class!__

<pre><code data-trim contenteditable>
class Element {
    constructor(name) {
        this.name = name; 
    }
}
</code></pre>

<pre><code data-trim contenteditable>
class ImgElement extends Element {
    // make sure to call super before using this
    // within subclass
    constructor(url) {
        super('img');
        this.url = url;
    }
}
</code></pre>

<pre><code data-trim contenteditable>
const img = new ImgElement('http://foo.bar/baz.gif');
console.log(img.name);
console.log(img.url);
</code></pre>




</section>
{% comment %}


<section markdown="block">
## 

<section markdown="block">
## 


* classes
    * classes and inheritance look like classical inheritance (it looks normal now)
    * behind the scenes it's still prototype
    * constructor
    * methods
    * no commas
    * class syntax
    * extending classes




</section>


{% endcomment %}









