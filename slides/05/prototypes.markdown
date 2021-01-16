---
layout: slides
title: "Prototypes"
---
<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## Where did we Leave Off?

At a cliffhanger! 

<br>
(Actually... doing some magic tricks)
{:.fragment}
</section>


<section markdown="block">
## Pulling Properties Out of Thin Air!

__Let's check out this code.__ &rarr;

<pre><code data-trim contenteditable>
// an empty object
const hat = {}; 

// printing out a properties
console.log(hat.toString);

// calling a method
console.log(hat.toString());
</code></pre>

* __Have we defined any properties on the object, <code>hat</code>, yet?__ &rarr;
* __What do we expect the output to be?__ &rarr;

<pre><code data-trim contenteditable>
[function: toString]
[object object]
</code></pre>
{:.fragment}

</section>

<section markdown="block">
## So Where Did Those Properties Come From?

<pre><code data-trim contenteditable>
const hat = {}; 
console.log(hat.toString); // a function
console.log(hat.toString()); // returns object
</code></pre>

<div markdown="block" class="img">
![rabbit out of a hat]({{ site.vars.slides_img_prefix }}/rabbit-hat.gif)
</div>
</section>

<section markdown="block">
## "Inherited" Properties

__All objects have a link to another object that's called its <code>[[prototype]]</code>__.

* note that `[[prototype]]` means the concept, _prototype_ not the actual syntax (confusingly, there are properties and objects in JavaScript that are named `prototype` but are not exactly the concept `[[prototype]]`)
* __objects__ are basically just a __collection of properties__
* when an objects gets a request for a __property that it doesn't have, the object's prototype is searched for that property__
* <code>[[prototype]]</code> objects have [[prototype]]s as well!
* searching goes on __up the chain of prototypes until__
	* {:.fragment} the property is found
	* {:.fragment} an object with a <code>null</code> prototype is reached / the last object in the chain: <code>Object.prototype</code>
</section>

<section markdown="block">
## Object.prototype

The top level prototype is [Object.prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype):

* all objects in JavaScript are descended from <code>Object</code>
* all objects inherit methods and properties from <code>Object.prototype</code>
* __<code>Object.prototype</code>'s [[prototype]] is <code>null</code>__

<br>
__Let's do some exploring.__ &rarr;

* use <code>Object.getPrototypeOf(obj)</code> 
* this gives back the [[prototype]] of the passed in object <code>obj</code>... 

<pre><code data-trim contenteditable>
console.log(
	Object.getPrototypeOf({}) == Object.prototype);

console.log(
	Object.getPrototypeOf(Object.prototype)); 
</code></pre>
{:.fragment}

</section>

<section markdown="block">
## Object.prototype Continued

<code>Object.prototype</code> isn't always an object's direct [[prototype]]; instead, most objects have a [[prototype]] of another object

* __functions__ derive from <code>Function.prototype</code>
* __arrays__ derive from <code>Array.prototype</code>

<br>
__Let's see what happens when we call <code>getPrototypeOf</code>.__ &rarr;

<pre><code data-trim contenteditable>
function f(x) { return x;}

console.log(
	Object.getPrototypeOf(f) == Function.prototype);

console.log(
	Object.getPrototypeOf([1, 2, 3]) == Array.prototype);
</code></pre>
{:.fragment}

</section>

<section markdown="block">
## Object.prototype Continued Some More

__What do you think the [[prototype]] of Array.prototype is?__&rarr;

<pre><code data-trim contenteditable>
console.log(
	Object.getPrototypeOf(Array.prototype) == Object.prototype);
</code></pre>
{:.fragment}

* __<code>Object.prototype</code>__ is at the top of the prototype chain (it's the last object checked for properties)
* it provides a bunch of [methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype#Methods) and [properties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype#Methods) to all JavaScript objects
	* __<code>toString()</code>__
	* __<code>hasOwnProperty()</code>__ (we've seen this before!)
{:.fragment}
</section>

<section markdown="block">
## Using <code>Object.create</code>

__<code>Object.create</code>__ - creates a new object with the specified [[prototype]] object and properties

<pre><code data-trim contenteditable>
// our "template" object
const protoWerewolf = { 
	description: 'hairy', 
	howl: function(thing) {
		console.log('The werewolf howls at the ' + thing + '.');
	}
};

// make a new werewolf with Object.create
const sadWerewolf = Object.create(protoWerewolf);
sadWerewolf.mood = 'sullen';
sadWerewolf.howl('moon');
</code></pre>

(It turns out, for inheritance, it's common to use Object.create(MyObj.prototype) ... we'll see why later)
</section>

<section markdown="block">
## Constructors

Another way to create an object with a particular prototype is to use a __constructor__.

* a __constructor__ is basically just a function with the __<code>new</code>__ keyword in front of it
	* it's a convention to make the first letter of a constructor uppercase
	* this helps distinguish between regular functions and constructors
* an __instance__ is an object created by using __<code>new</code>__
* a constructor's __<code>this</code>__ object is bound to a __fresh, empty object__
* this is the object that's returned from invoking the constructor with <code>new</code> (unless the constructor explicitly returns a different object)
</section>

<section markdown="block">
## Constructors Continued

In the code below, both <code>sadWerewolf</code> and <code>partyWerewolf</code> are __instances__ of <code>Werewolf</code>. Note that:

* a property is added to the constructor's <code>this</code> object
* <code>this</code> is the object that's returned after calling <code>new Werewolf</code>

<pre><code data-trim contenteditable>
function Werewolf(mood) {
	this.mood = mood;
}

const sadWerewolf = new Werewolf('sad'); 
const partyWerewolf = new Werewolf('partying'); 
console.log(partyWerewolf.mood);
</code></pre>

You can think of the above constructor as doing the following when invoked with new...

<pre><code data-trim contenteditable>
function Werewolf(mood) {
    // this = {}
	this.mood = mood;
    // return this
}
</code></pre>
__Let's try adding some more properties to <code>this</code>.__&rarr;

</section>
<section markdown="block">
## Constructors, Prototype 

__All constructors have a property named <code>prototype</code>.__

* the default value of a constructor's prototype is a plain, empty object that derives <code>from Object.prototype</code>
* every instance created with the constructor will have that object as its _actual_ prototype
* note that there's a difference between the constructor's prototype property that's used to set an instance's prototype versus the constructor's _actual_ prototype... __can you guess what that is?__ &rarr;<span class="fragment"><code>Function.prototype</code></span> 
* for example, we could use a constructor's prototype to add a howl method on every instance of Werewolf 

<pre><code data-trim contenteditable>
Werewolf.prototype.howl = function(thing) {
	console.log('The werewolf howls at the ' + thing + '.');
}
sadWerewolf.howl('moon');
partyWerewolf.howl('bowl of chips');
</code></pre>
</section>

<section markdown="block">
### Something Happened! Just one Prototype

When we added a property to the constructor's prototype, something unusual happened!  __How were the instances of that constructor affected?__ &rarr;

__The instances immediately had access to the new property__, even though they were instantiated before the prototype was set.
{:.fragment}

1. {:.fragment} all instances share that prototype object
2. {:.fragment} so... when a property is looked up on any of those instances and isn't found
3. {:.fragment} it looks at that shared prototype object
4. {:.fragment} it's typical for a prototype object to only contain methods
</section>

<section markdown="block">
## Searching for a Property

__When a property is requested from an object, where are the places that the property is searched for?__

* the object itself
* the object's prototype
* the object's prototype's prototype
* and so on up the prototype chain up until <code>Object.prototype</code>
{:.fragment}
</section>

<section markdown="block">
## Overriding Properties 

If you add a property directly to an object, it is added to the object _itself_, not the object's prototype. __What's the output of the following code?__ &rarr;

<pre><code data-trim contenteditable>
Werewolf.prototype.clothing = 'tattered shirt';
console.log(partyWerewolf.clothing);

partyWerewolf.clothing = 'backwards cap';

console.log(partyWerewolf.clothing);
console.log(sadWerewolf.clothing);
</code></pre>

<pre><code data-trim contenteditable>
tattered shirt
backwards cap
tattered shirt
</code></pre>
{:.fragment}

</section>
<section markdown="block">
## Overriding Properties Continued

__Again, when you add a property to an object, that property is added to the object itself...__

* (not the prototype)
* this happens regardless of whether or not there's already a property with the same name in the prototype 
* if there is a property with the same name in the prototype, it is _masked_ or __overridden__ by the new property
* __note that the prototype itself is not changed__
</section>

<section markdown="block">
## Where Did Those Properties Come From?

__Let's break down all of the properties of our <code>partyWerewolf</code> object and determine where they came from__ &rarr;

<pre><code data-trim contenteditable>
partyWerewolf properties
=====
</code></pre>
{:.fragment}

<pre><code data-trim contenteditable>
from partyWerewolf object
-----
clothing: backwards cap  
mood: partying 
</code></pre>
{:.fragment}

<pre><code data-trim contenteditable>
from Werewolf.prototype
-----
clothing: tattered shirt (masked)
howl: (function)
</code></pre>
{:.fragment}

<pre><code data-trim contenteditable>
from Object
-----
toString: (function)
etc.
</code></pre>
{:.fragment}

</section>

<section markdown="block">
## Overriding Properties

__Why would overriding properties be useful?__ &rarr;

* it allows for convenient way of dealing with objects that have exceptional properties (without having to create an entirely new constructor)
* while still allowing a default property to be set for all instances
* __let's override the inherited <code>toString()</code> method__ &rarr;
	* the string representation of the werewolf object should be <code>[mood] werewolf</code>
{:.fragment}

<pre><code data-trim contenteditable>
console.log(partyWerewolf);
Werewolf.prototype.toString = function() {
	return this.mood + ' werewolf';
};
console.log(partyWerewolf + '');
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Common Pattern for Inheritance

__A common pattern for implementing inheritance is to:__ &rarr;

* use a fresh object that has the prototype set to the parent constructor's prototype property (WAT?)
* as the child constructor's prototype property
* ... which can be done with <code>Object.create</code>

Using our parent constructor, <code>Werewolf</code>

<pre><code data-trim contenteditable>
function Werewolf(mood) {
    this.mood = mood;
}
Werewolf.prototype.howl = function(thing) {
	console.log('The werewolf howls at the ' + thing + '.');
}
</code></pre>

Create a constructor for a space werewolf (!!!) by setting its prototype to a new object who's prototype is <code>Werewolf.prototype</code>
<pre><code data-trim contenteditable>
function SpaceWerewolf() {}
SpaceWerewolf.prototype = Object.create(Werewolf.prototype);
</code></pre>

__This isn't quite complete, though.__ &rarr;
</section>

<section markdown="block">
## Inheritance Continued

__In the previous implementation, there's actually some stuff missing when we create a <code>SpaceWerewolf</code>.  What's missing from the previous implementation that results in incomplete inheritance?__ &rarr;

* {:.fragment} the prototype only contains methods
* {:.fragment} what about properties set from the constructor (like <code>mood</code>)?

<br>
<pre><code data-trim contenteditable>
const w = new SpaceWerewolf();
console.log(mood)
</code></pre>
{:.fragment}
</section>


<section markdown="block">
## Calling Super

Hm. The constructor, <code>Werewolf</code>, sets the property, <code>mood</code>...

* if only we can execute the parent constructor (you know... like call <code>super</code> in Java).
* __but we can, how?__ &rarr;
* {:.fragment} use <code>call</code>

<pre><code data-trim contenteditable>
function SpaceWerewolf(mood) {
    Werewolf.call(this, mood);
}
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## One Last Detail, Constructor Property

All object's have a property named <code>constructor</code>. __<code>constructor</code>__ is the function that was used to create the instance's prototype.

<pre><code data-trim contenteditable>
const a = [];
console.log(a.constructor); // [Function: Array] 
</code></pre>

So we should probably set that on our child constructor's prototype property explicitly so that all objects created from <code>SpaceWerewolf</code> have that as its constructor.

<pre><code data-trim contenteditable>
SpaceWerewolf.prototype.constructor = SpaceWerewolf;
</code></pre>
</section>

<section markdown="block">
## All Together


<pre><code data-trim contenteditable>
function Werewolf(mood) {
    this.mood = mood;
}
Werewolf.prototype.howl = function(thing) {
	console.log('The werewolf howls at the ' + thing + '.');
}
</code></pre>

<pre><code data-trim contenteditable>
function SpaceWerewolf(mood) {
    Werewolf.call(this, mood);
}
SpaceWerewolf.prototype = Object.create(Werewolf.prototype);
SpaceWerewolf.prototype.constructor = SpaceWerewolf;

const w = new SpaceWerewolf('in space');
console.log(w.mood);
console.log(w.constructor);
</code></pre>

</section>
<section markdown="block">
## Prototype: An Example

__Check out the following example...__ &rarr;

<pre><code data-trim contenteditable>
function Monster() {
	this.scary = true;
}

Monster.prototype.boo = function() { console.log('Boo!');}
</code></pre>

<pre><code data-trim contenteditable>
function Werewolf(mood) {
    Monster.call(this);
	this.mood = mood;	
}

Werewolf.prototype = Object.create(Monster.prototype);
Werewolf.prototype.constructor = Werewolf;
</code></pre>

<pre><code data-trim contenteditable>
Werewolf.prototype.howl = function(thing) {
	console.log('The werewolf howls at the ' + thing + '.');
}
</code></pre>
</section>

<section markdown="block">
## Example Continued

__What would the output be if the following code were run...__ &rarr;

<pre><code data-trim contenteditable>
const sadWerewolf = new Werewolf('sad');
const partyWerewolf = new Werewolf('partying');
partyWerewolf.scary = false;

console.log(sadWerewolf.scary);
console.log(partyWerewolf.scary);
partyWerewolf.boo();
</code></pre>

<pre><code data-trim contenteditable>
true
false
Boo!
</code></pre>
{:.fragment}

Some notes on the example:
{:.fragment}

* {:.fragment} to inherit properties from Monster...
    * {:.fragment} we set our Werewolf constructor's prototype to a fresh object with <code>Monster.prototype</code> as the prototype
    * {:.fragment} we called the "super" constructor
* {:.fragment} <code>const sadWerewolf = new Werewolf('sad'); </code>
* {:.fragment} ...which is why scary was found in the prototype chain for <code>sadWerewolf</code>
</section>

{% comment %}
<section markdown="block">
## Create Your Own!

__Create the following constructors and objects.__ &rarr;

* a Vehicle constructor that sets its wheels property to <code>4</code>
* a Car constructor that sets its convertible property to <code>false</code>
* a Bike constructor
* Bike and Car should inherit their properties from Vehicle
* modify the Bike prototype so that its wheels are always 2
* modify the Bike prototype to add a honk method (it should log 'ring ring')
* create two objects, a Bike and a Car
* have the bike honk
* print out the number of wheels for each

</section>

<section markdown="block">
## A Potential Implementation

<pre><code data-trim contenteditable>
function Vehicle() {
	this.wheels = 4;
}
function Car() {
	this.convertible = false;
}
function Bike() {
}
</code></pre>

<pre><code data-trim contenteditable>
Car.prototype = new Vehicle();
Bike.prototype = new Vehicle();
Bike.prototype.wheels = 2;
Bike.prototype.honk = function() {
	console.log('ring ring');
};
</code></pre>

<pre><code data-trim contenteditable>
const myCar = new Car();
const myBike = new Bike();
myBike.honk();
console.log(myCar.wheels);
console.log(myBike.wheels);
</code></pre>

</section>	
{% endcomment %}

<section markdown="block">
## Enumerating Properties Revisited

__How do we list every property in an object?__ &rarr;

<pre><code data-trim contenteditable>
for (const prop in obj) {
	console.log(prop)
}
</code></pre>
{:.fragment}

__Let's list every property and value in <code>partyWerewolf</code> and <code>sadWerewolf</code>.__ &rarr;
{:.fragment}

<pre><code data-trim contenteditable>
for (const p in partyWerewolf) {
	console.log(p + ': ' + partyWerewolf[p]);
}
for (const p in sadWerewolf) {
	console.log(p + ': ' + sadWerewolf[p]);
}
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Own Property

__What if we only want the properties that were explicitly set on our object, rather than including inherited ones.__ &rarr;

We could use the <code>hasOwnProperty</code> method that every object inherits from <code>Object.prototype</code>!
{:.fragment}

<pre><code data-trim contenteditable>
console.log('party\n-----');
for (const p in partyWerewolf) {
	if (partyWerewolf.hasOwnProperty(p)) {
		console.log(p + ': ' + partyWerewolf[p]);
	}
}
console.log('\n');

console.log('sad\n-----');
for (const p in sadWerewolf) {
	if (sadWerewolf.hasOwnProperty(p)) {
		console.log(p + ': ' + sadWerewolf[p]);
	}
}
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## What Instance do I Have?

If you have an object, and you'd like to know what constructor it came from, you can use the __<code>instanceof</code>__ operator.

* instance on left
* constructor on right

__What do you think the following code will print out?__ &rarr;

<pre><code data-trim contenteditable>
console.log(myCar instanceof Car);
console.log(myCar instanceof Bike);
</code></pre>

<pre><code data-trim contenteditable>
true
false
</code></pre>
{:.fragment}

(in _actuality_ instance of checks if an object has in its prototype chain the prototype property of a constructor)
{:.fragment}
</section>

<section markdown="block">
## About prototype and this

There are two ways to set properties automatically when using a constructor. __What are they?__ &rarr;

<pre><code data-trim contenteditable>
function Thing() {
	this.prop1 = 'some value';
}

Thing.prototype.prop2 = 'another value';
</code></pre>
{:.fragment}

* generally, you would use the prototype method if you only want one version of that object to exist
* see the [SO article]( http://stackoverflow.com/questions/422476/setting-methods-through-prototype-object-or-in-constructor-difference).
{:.fragment}
</section>

<section markdown="block">
## About Creating Objects

__There are a few ways to create objects... what are they?__ &rarr;

* object literal - <code>{}</code>
* Object.create
* new
{:.fragment}

<br>
<code>Object.create</code> seems to be gaining some traction.
{:.fragment}


</section>
<section markdown="block">
## A Few Things to Remember

__What object is at the top of the prototype chain?__ &rarr;

<code>Object.prototype</code> is at the top of the prototype chain
{:.fragment}

__What is <code>Object.prototype</code>'s prototype?__ &rarr;

Its prototype is null.
{:.fragment}

__What are some properties that are inherited from <code>Object.prototype</code>?__ &rarr;

toString, hasPropertyOf
{:.fragment}

</section>
<section markdown="block">
## And Some More Questions

__What does the <code>hasOwnProperty</code> method do?__ &rarr;

return <code>true</code> if property was set on actual object rather than inherited
{:.fragment}

__What does the <code>instanceof</code> operator do?__ &rarr;

It determines whether the operand on the left is an instance of the operand on the right.
{:.fragment}
</section>

<section markdown="block">
## ES6 Classes

In ES6, there's yet another way to create a prototype chain of objects, and that's using a _familiar_ construct, __classes__.

* they're syntactic sugar for creating constructor functions and a prototype object with methods
* (in actuality, everything is still prototypes and constructor functions)
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

__Use `extends` to inherit from a class!__ (read: set up a prototype chain)

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

<section markdown="block">
## Calling Super Constructor

__In the previous example, `super` was used to call the base class constructor.__ &rarr;

* {:.fragment} `super` must be called in your subclass constructor if...
* {:.fragment} you use `this` within your constructor
* {:.fragment} (it's essentially initializing `this` properties the way that the superclass would
* {:.fragment} __`super` must be called before using this within a subclass__

</section>

<section markdown="block">
## High Level Summary 

__Every object in JavaScript links to another object called its [[prototype]].__ &rarr; 

* when a property cannot be found in the original object, it goes up the prototype chain
* objects can be given prototypes in 3 ways:
    1. {:.fragment} `Object.create`
    2. {:.fragment} constructor functions
    3. {:.fragment} ES6 Classes
    4. {:.fragment} (there's also something called `__proto__` that allows direct access to a [[prototype]], but its use is discouraged)
</section>
