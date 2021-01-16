---
layout: slides
title: "Require"
---
<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## Globals, Built-In Functionality, Modules

### As we saw, node has several built-in objects and variables, (for example, <code>console</code>). 

__How do we show all of these built-in objects and variables?__ &rarr;

Check the <code>global</code> object. __Let's see what's there.__ &rarr;
{:.fragment}

In addition to what's available in the global scope, you can access even more functionality (both built-in and external) __via modules__.
{:.fragment}
</section>

<section markdown="block">
## We've Already Seen a Few Modules

__Where have we seen them before? What were the modules we used? What do they do?__ &rarr;

* we used <code>readline-sync</code> in our blackjack homework
	* provides a way to ask the user for input
	* _synchronously_
* the <code>request</code> module is in our current homework about basketball stats
	* a simple interface for making web requests
{:.fragment}
</section>
<section markdown="block">
## Modules Continued

Modules allow the inclusion of other JavaScript files into your application. From the Node docs:

> Files and modules are in one-to-one correspondence

In other words, __modules are just JavaScript files__. The [Node docs](http://nodejs.org/api/modules.html#modules_modules) are pretty comprehensive about how modules work.
</section>

<section markdown="block">
## Core Modules

Some modules are __compiled directly into the node binary__. They're available without having to create or download a module. __A couple of useful core modules include:__ &rarr;

* [HTTP](http://nodejs.org/api/http.html) - for creating both HTTP clients and servers
* [File System](http://nodejs.org/api/fs.html) - for manipulating files and directories

<br>
</section>

<section markdown="block">
## Require

__Using a module__:

* the <code>require</code> function loads a file 
	* it takes a single argument, the name of the file to load (the .js extension can optionally be omitted when loading)
	* it gives back an object
* ...the object that it returns has all of the exported properties of the module / file loaded
* __let's try it out with a core module__ &rarr;

<pre><code data-trim contenteditable>
// bring in the http module
var http = require('http');
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Downloaded Modules

Of course, we're not stuck with just using the core modules. We could download pre-built modules as well. __How did we install some Node modules and how did we use them?__ &rarr;

<pre><code data-trim contenteditable>
npm install module-name
</code></pre>
{:.fragment}

<pre><code data-trim contenteditable>
var prompt = require('readline-sync').prompt;
var request = require('request');
</code></pre>
{:.fragment}

</section>

<section markdown="block">
## Creating your own module:

* there's an available __<code>exports</code>__ object in Node
* creating properties on that object makes those properties _public_ to whatever is _importing_ the file
* variables that aren't exported are _private_ to the module
* __lets take a look (notice that the <code>exports</code> object is not available in the shell)__ &rarr;

<pre><code data-trim contenteditable>
// showing what's in exports
console.log(exports);
</code></pre>
{:.fragment}

<pre><code data-trim contenteditable>
// adding a property to exports
exports.foo = 'bar, baz';
</code></pre>
{:.fragment}

</section>

<section markdown="block">
## All Together

__Here's an example of creating and using a module__: &rarr;

A module called __creatures.js__:

<pre><code data-trim contenteditable>
exports.makeCreatureList = function (r) {
	return ['narwhale', 'unicorn'];
};
</code></pre>

__And... using that module__: &rarr;

<pre><code data-trim contenteditable>
var creaturesModule = require('./creatures.js');
creaturesModule.makeCreatureList().forEach(function(name) {
	console.log(name);
});
</code></pre>
</section>

<section markdown="block">
## Module Location

__Where do you think the <code>require</code> function looks for a module? (we can probably guess 3 places correctly!)__ &rarr;

Some hints: 
{:.fragment}

* installing modules for homework
* consider the examples in the previous slides
{:.fragment}

1. if it's a __core module__, just bring the module in (it's compiled into the node binary)
2. if it's a __file__ (starts with /, ../, ./, etc.), 
	* try to find that file relative to the location of the file that has the call to require
	* or as an absolute path
3. or load it from the __node\_modules__ folder (which is where modules are downloaded when you install from npm)
{:.fragment}

<br>
Or... just [check out the crazy docs](http://nodejs.org/api/modules.html#modules_all_together).
{:.fragment}
</section>

<section markdown="block">
## Notes About Downloading and Installing Modules

* modules are downloaded and installed in the __node\_modules__ directory located in in the directory that you ran npm
* if it's not found there, it will look at the parent's directory's __node\_modules__ folder
* it will continue to look one directory up until the node\_modules (if it exists) directory at the root of the filesystem is reached 
* __be careful with regards to where things are installed / moving projects around__
</section>

<section markdown="block" data-background="#440000">
# You should place your dependencies locally in <code>node_modules</code> folders

</section>

<section markdown="block">
## Why Modules?

__Why do modules exist? Why is certain functionality broken out into modules? Why would we create our own modules?__

* {:.fragment} modules provide __solutions to commonly encountered programming tasks__
* {:.fragment} they promote __code reuse__ 
* {:.fragment} __namespacing__ and preventing naming collisions
* {:.fragment} organizing code / __keeping related functionality together__
</section>

<section markdown="block">
## Node's Module System

JavaScript, the language, doesn't actually have a module system!

Node's module system is built off of a spec/API called CommonJS.

__You won't be able to use this same module system in browser implementations of JavaScript without first including other JavaScript files/libraries (and there are a few to choose from) manually on your page.__
</section>
