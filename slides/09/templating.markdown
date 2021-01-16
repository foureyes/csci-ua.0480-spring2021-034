---
layout: slides
title: "Templating with HandleBars"
---
<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>


<section markdown="block">
## Templating

__What's a templating engine? Describe what it does...__ &rarr;

A templating engine is software/an application/a library that:
{:.fragment}

* merges one or more templates (a document with placeholders)
* ... with data
* ... to create a single complete document
* templating engines are usually built so that they are decoupled from the rest of the application that is using it
{:.fragment}
</section>

<section markdown="block">
## Templating Continued

In our case, we're using a templating library called __handlebars__:

* ...so that we could dynamically generate web pages 
* ...by combining variables/data with html layouts and templates.

<br>
__Why bother using templating? We were able to emit html directly by using <code>res.end("<html>...") or res.send("<html>...")</code>?__
</section>
<section markdown="block">
## Why Use Templating

__Using a templating engine that's decoupled from your application's logic is useful because:__ &rarr;

* {:.fragment} constructing html manually is easy for small pages, but quickly gets complicated as more markup gets written
* {:.fragment} it can be much more difficult to spot malformed html!
* {:.fragment} changes to your applications logic can be tangled with changes to your presentation (and vice versa), having some separation gives you at least a chance of avoiding unwanted side-effects
* {:.fragment} having separate templates allows isolation of work... a designer or front-end developer can work on the templates, while a backend developer can work on the application logic
* {:.fragment} most templating engines are featureful... providing conveniences such as automatic character escaping (why is this important? __Let's check out a _bad_ form.__)
</section>


<section markdown="block">
## Installation and Setup

Install:

<pre><code data-trim contenteditable>
npm install hbs --save
</code></pre>

Configure using [app.set (see other configurations you can set)](http://expressjs.com/en/api.html#app.set)

<pre><code data-trim contenteditable>
app.set('view engine', 'hbs');
</code></pre>

__hbs directory structure__ &rarr;

<pre><code data-trim contenteditable>
views/layout.hbs
views/index.hbs
</code></pre>
</section>

<section markdown="block">
## Context Objects

__When a template is rendered using <code>res.render</code>, there are two arguments.__ &rarr;

The _view_ or _template_ to render... and the _context object_.
{:.fragment}

The __context object__'s properties are available to your template as variable names!
{:.fragment}

<pre><code data-trim contenteditable>
// the second argument is an object
res.render('myview', {'item':'pizza', 'description':'tasty'});
</code></pre>
{:.fragment}

<pre><code data-trim contenteditable>
<h3>{{"{{ description "}}}} {{"{{ item "}}}}</h3>
</code></pre>
{:.fragment}

<pre><code data-trim contenteditable>
<h3>tasty pizza</h3>
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Ok... Variables Make Sense

Just use double curly braces (no spaces) to drop a value in your context into your template!

__But what about _some_ logic. What if the value that I'm passing in is an array or object?__ &rarr;

Handlebars actually has some basic facilities for:

* looping
* conditionals
* ...and other structures
</section>

<section markdown="block">
## Block Expressions / Helpers

__From the handlebars docs__ 

> Block expressions allow you to define helpers that will invoke a section of your template with a different context than the current

* {:.fragment} ...errr ... basically, that means __you'll be able to add control structures to your templates, like conditionals and iteration.__
* {:.fragment} use double curly braces, but prefix your helper with a hash... and make sure you close it at the end
* {:.fragment}<code>{{"{{#helper"}}}}stuff{{"{{/helper"}}}}</code>
* {:.fragment} notice that there are no spaces!
</section>

<section markdown="block">
## Looping Over Arrays Example

The <code>#each</code> helper:

* allows you iterate over a series of items
* within <code>#each</code>, you can use <code>{{"{{this"}}}}</code> or <code>{{"{{."}}}}</code> to output the current item

<br>
__In your application:__ &rarr;

<pre><code data-trim contenteditable>
app.get('/templating-arrays', function(req, res) {
	res.render('templating-arrays', {'luckyNumbers':[42, 7, 78, 3, 5]});
});
</code></pre>

__In your view:__ &rarr;

<pre><code data-trim contenteditable>
&lt;ul&gt;
{{"{{#each luckyNumbers"}}}}
	&lt;li&gt;{{"{{this"}}}}&lt;/li&gt;
{{"{{/each"}}}}
&lt;/ul&gt;
</code></pre>

</section>


<section markdown="block">
## Arrays with Named Elements

__Handlebars allows _named block parameters_, which allows you to give each element a name while iterating:__ &rarr;

<pre><code data-trim contenteditable>
&#123;&#123;#each words as |word|&#125;&#125;
&lt;p&gt;word again: &#123;&#123;word&#125;&#125;&lt;/p&gt;
&#123;&#123;/each&#125;&#125;
</code></pre>

</section>
<section markdown="block">
## Also Works With Objects

__In your application:__ &rarr;

<pre><code data-trim contenteditable>
app.get('/templating-objects', function(req, res) {
	res.render('templating-objects', {'obj':{'topping':'mushroom', 'size':'medium'}});
});
</code></pre>

__In your view, use `this` to get the value:__ &rarr;

<pre><code data-trim contenteditable>
&lt;ul&gt;
{{"{{#each obj"}}}}
	&lt;li&gt;{{"{{this"}}}}&lt;/li&gt;
{{"{{/each"}}}}
&lt;/ul&gt;
</code></pre>
</section>

<section markdown="block">
## Objects Continued

Assuming this context object (cat is an object):

<pre><code data-trim contenteditable>
{cat: {name:'bill furry', lives:9}};
</code></pre>

If you want both the key and the value, use `@key` and `this` &rarr;

<pre><code data-trim contenteditable>
&lt;ul&gt;
{{"{{#each cat"}}}}
&lt;li&gt;{{"{{@key"}}}}, {{"{{this"}}}}&lt;/li&gt;
{{"{{/each"}}}}
&lt;/ul&gt;
</code></pre>
</section>

<section markdown="block">
## Dealing with an Array of Objects

Assuming this context object (points is an Array of objects):

<pre><code data-trim contenteditable>
{points: [{x:1, y:2, z:3}, {x:21, y:34, z:55}]}
</code></pre>

Use dot notation to access properties:

<pre><code data-trim contenteditable>
&lt;ul&gt;
{{"{{#each points"}}}}
&lt;li&gt;{{"{{this"}}}}, {{"{{this.x"}}}}, {{"{{this.y"}}}}, {{"{{this.z"}}}} &lt;/li&gt;
{{"{{/each"}}}}
&lt;/ul&gt;
</code></pre>

Or just the property name!

<pre><code data-trim contenteditable>
&lt;ul&gt;
{{"{{#each points"}}}}
&lt;li&gt;{{"{{x"}}}}, {{"{{y"}}}}, {{"{{z"}}}}&lt;/li&gt;
{{"{{/each"}}}}
&lt;/ul&gt;
</code></pre>
</section>



<section markdown="block">
## Conditionals

(Note - no equality operators 4 U) ...

<pre><code data-trim contenteditable>
{{"{{#if isActive"}}}}
  <img src="star.gif" alt="Active">
{{"{{else"}}}}
  <img src="cry.gif" alt="Inactive">
{{"{{/if"}}}}
</code></pre>
</section>

<section markdown="block">
## Template Error?

By the way, if you see something like:

<pre><code data-trim contenteditable>
Expecting 'ID', 'DATA', got 'INVALID'
</code></pre>

You probably have spaces in your <code>{{"{{ #helper "}}}}</code>.
</section>

<section markdown="block">
## More Haaalp Plese!

[Check out the docs for more block helpers!](http://handlebarsjs.com/block_helpers.html)
</section>

<!--
<section markdown="block">
## Oh Yes...

__We can use express-handlebars now (you might have noticed that the express3-handlebars version is deprecated)__ &rarr;
<pre><code data-trim contenteditable>
npm install express-handlebars
</code></pre>

<pre><code data-trim contenteditable>
var handlebars = require('express-handlebars')
	.create({defaultLayout:'main'});
</code></pre>
</section>
-->
