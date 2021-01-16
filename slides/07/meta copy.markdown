---
layout: slides
title: "About Class #8"
---
<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
# Done With JavaScript, Finally!

### (Well not really)
{:.fragment}

### (Just a tiny bit more today)
{:.fragment}
</section>

<section markdown="block">
## JavaScript From Here on In

__Of course, we'll still be using JavaScript heavily throughout the class.__ 

* But we won't be focusing on the language itself anymore. 
* There are a few things that we didn't have chance to cover:
	* {:.fragment} composition vs inheritance
	* {:.fragment} calling super methods and constructors

<br>
I'll write something up on those topics...
{:.fragment}
</section>


<section markdown="block">
# So Up Next...
</section>


<section markdown="block">
## Making Web Applications

### Starting with a general overview of the ...
<div markdown="block" class="img">
![the internet]({{ site.vars.slides_img_prefix }}/internet.gif)
</div>
</section>

<section markdown="block">
## The Internets

__We'll finally be moving on to topics about web development__: &rarr;

* An Intro to Web Development
* A Web Server

</section>

<section markdown="block">
## Upcoming Classes

For the next couple of weeks we'll be covering Node and a web framework called Express.

[Check out the schedule](../../schedule.html#class08) &rarr;
</section>

<section markdown="block">
## Before We Go On

A re-cap of questions that I've received a few times...

</section>
<section markdown="block">
## This

During our last class, we went over a few patterns for function invocation.  __Do you remember any of those patterns and how they affected _this_?__

* __method invocation__ (this &rarr; object that method was called on)
* __function invocation__ (this &rarr; global)
* __call, apply__ (this &rarr; whatever we want it to be!)

</section>

<section markdown="block">
## Constructors / Properties

When writing a constructor, we can set properties and values on the instances that are created from it. __How do we do this? (hint... there are two ways)__ &rarr;

* using __this__
* adding to the __prototype__ property
{:.fragment}

<pre><code data-trim contenteditable>
function MyConstructor() {
	this.prop = 'I\'m a property';
}

MyConstructor.prototype.printSomething = function() {
	console.log('me too');
};

var foo = new MyConstructor();
console.log(foo);
foo.printSomething();
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Constructors / Properties

__Which one do we use?__ &rarr;

From [Mozilla's JavaScript documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures#Performance_considerations)...
{:.fragment}

> "methods should normally be associated to the object's prototype rather than defined into the object constructor"
{:.fragment}

As we mentioned before, a function is assigned to every object when using this, but there's only one function for every instance when using prototype.
{:.fragment}

[And another reference.](http://stackoverflow.com/questions/12180790/defining-methods-via-prototype-vs-using-this-in-the-constructor-really-a-perfo)
{:.fragment}
</section>

<section markdown="block">
## Before we Go On... About Homework

__Homework #1__ grades should be posted this week

</section>

<section markdown="block">
## Readings

[BTW, have you been following along with the readings](../../schedule.html#class08) &rarr;

</section>
