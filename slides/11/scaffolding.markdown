---
layout: slides
title: "Scaffolding"
---
<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## Scaffolding Topics

We'll discuss:

* what it takes to _bootstrap_ an Express app
* a peek at scaffolding
* revisit modules
* revisit middleware
* revisit handlebars / yet another handlebars module
* revisit installing with npm
* scaffolding
	* installation
	* our modifications
	* running an app 
	* stacktraces
	* layout
</section>

<section markdown="block">
## Bootstrapping an Express App

Hey. So good news. We know to create an express app. __Walk me through all of the boilerplate stuff that we have to do to...__ &rarr; 

* create a __simple express app__
* that __contains a form__ (that POSTs data) 
* ...and has __handlebars__ templates
* ...and serves __static files__ (for CSS and images)
* ...that has adequate __logging__

<br>
(kind of the bare minimum for a reasonable app, right?)
</section>

<section markdown="block">
## Bootstrapping an Express App Continued

Not _sooooo much_ work, but __there's still enough to make it a bit cumbersome:__ &rarr;

1. require and setup an actual Express app (create an app object, listen)
2. require handlebars and configure your Express app to use it
3. create your <code>view</code> directories so you have a place to put your templates
4. configure your Express app to use static files
5. create your <code>public</code> directory so you have a place to store your static resources, like images, css, etc.
6. require and configure body-parser to make sure you can read form data
7. create middleware to log requests and responses to the console
{:.fragment}

</section>

<section markdown="block">
## WHEW! I AM TIRED

### We're lazy, so even though that's not _so much_, it's still __definitely__ _too much_ work.

* that's a lot of tasks for such a tiny web app
* they're all pretty boilerplate too
* __you _know_ who's really good at finishing up tons of tiny and tedious tasks?__
* {:.fragment} your computer!

</section>

<section markdown="block">
# Instead of doing all of this stuff on our own, we can just let a computer do it for us.

</section>
<section markdown="block">
## Express Generator

__Express Generator__ is a commandline tool that creates a __skeleton__ Express project with a single, simple command.  The project will come with a bunch of stuff baked in:

__All of the stuff we asked for...__

* {:.fragment} creating a simple express app with...
* {:.fragment} templating 
* {:.fragment} serving static files
* {:.fragment} parsing the request body
* {:.fragment} logging

<br>
__And even more!__
{:.fragment}

* {:.fragment} bootstrapping package.json
* {:.fragment} laying out the directory structure of your project
* {:.fragment} setting up 404 and 500 pages

</section>

<section markdown="block">
## A Peek at Scaffolding

__Let's take a quick peek at what this thing does!__ &rarr;

1. install it: <code>npm install -g express-generator</code>
2. generate a skeleton app: <code>express --hbs myapp</code>
3. install dependencies <code>cd myapp</code>, then <code>npm install</code>
4. run your app at localhost:3000: <code>./bin/www</code>

</section>

<section markdown="block">
## Let's Check Out What it Made

You can find [a more detailed list in the Express docs](http://expressjs.com/starter/generator.html), but here are some highlights:

* a few directories
	* the actual app's directory
	* <code>views</code> (but no <code>layout</code>)
	* <code>public</code> (but the folders in are named differently)
	* something called <code>routes</code> and <code>bin</code>
* a bunch of files
	* of course, <code>app.js</code>
	* a package.json
	* and _others_
* for the most part, things are slightly different, but familiar
</section>

<section markdown="block">
## Revisiting a Few Topics Before Moving On

The are a few things that need a bit of explanation before diving in to what the scaffolding generated....

* installing with npm (finally using package.json)
* modules (creating our own)
* middleware (mounting at a specific location)
* handlebars again (a different module)
</section>

<section markdown="block">
## package.json? 

__What does package.json contain again?__ &rarr;

* meta data about your app (mainly for packaging and distribution purposes)
* but most importantly, __a list of module dependencies__
* we've been <code>--save</code>'ing dependencies to it, but we haven't done anything with it yet... __so what can we actually do with it?__ &rarr;
{:.fragment}

<br>
Notice that right after we generated our scaffolding, we ran __<code>npm install</code>__ in our application's root directory! &rarr;
{:.fragment}


* this installs everything that's in <code>package.json</code>!
* ... without having to install each module individually
* (that means that everything that's required in the generated <code>app.js</code> gets installed)
{:.fragment}
</section>

<section markdown="block">
## npm install

Straight from the docs:

__npm install__ (in package directory, no arguments):

* install the dependencies in the local <code>node_modules</code> folder.
* by default, npm install will install all modules listed as dependencies
* (with the --production flag, npm will not install modules listed in devDependencies ... we don't have any yet, so this can be safely ignored)
</section>

<section markdown="block">
## Modules

__Does anyone remember what a module is?__ &rarr;

* it's just a __JavaScript file__
* its contents can be brought in to another file by using the __<code>require</code>__ statement (like <code>const express = require('express')</code>
* you can name a specific path in <code>require</code> (<code>require('./somemodule')</code>)
* you can also drop the .js extension 
* __for variables to be usable by (exposed to) the file that's including the module...__ &rarr;
	* {:.fragment} you have to use the built-in __<code>exports</code>__ variable (in module: <code>exports.publicname = myVar;</code> to make things public 
	* {:.fragment} after requiring module, <code>module.publicname</code>)
{:.fragment}

<br>
__Let's try making a module that has a function in it... and using that function in another file.__ &rarr;
{:.fragment}
</section>

<section markdown="block">
## Modules in the Scaffolding

__Note that there's a directory called routes...__ &rarr;

* it has two files in it 
* <code>index.js</code> and <code>users.js</code>
* with (surprise) routes in them!
* ...it looks like the files are just modules
* (notice the use of <code>module.exports</code> - the built in <code>exports</code> variable is just a [shorter name/alias for it](http://nodejs.org/api/modules.html#modules_module_exports))
* __also it uses an Express router...__ &rarr;
</section>

<section markdown="block">
## Routers

A router is an object that has the ability to define routes and use middleware. __Sound familiar?__ &rarr;

__(Because it should a little bit...)__ &rarr;
{:.fragment}

__Straight from [the docs](http://expressjs.com/api.html#router):__ &rarr;
{:.fragment}

* a __router__ is an isolated instance of middleware and routes
* routers can be thought of as "mini" applications... 
* capable only of performing middleware and routing functions
* __we've seen this before__ because it acts just like our __app object__ 
	* the router can have middleware 
	* ... and http VERB routes added just like an application
	* __but no listen...__
* routers behave like middleware themselves and can be <code>.use()'d</code> by the app or in other routers 
{:.fragment}
	
</section>

<section markdown="block">
## Route Modules as Middleware

To use the route modules, the generated __<code>app.js</code>__ does the following:

* the route modules are brought in using <code>require</code>
* which are used like middleware by using __<code>app.use</code>__
* __let's take a look at the generated code...__ &rarr;
* {:.fragment} speaking of middleware, there are two version of calling the <code>use</code> method... __what were they?__
	* {:.fragment} with a single argument... middleware is enabled for all paths - <code>app.use(someFunction)</code>
	* {:.fragment} with a two arguments... middleware is enabled for the path specified - <code>app.use('/path', someFunction)</code>
</section>

<section markdown="block">
## _External_ Routes / Middleware at Specific Paths

Notice that the route modules are used just like middleware. 

* they're _mounted_ at specific paths
* __why might we have a separate folder for each set of routes, and why do we want them external to app.js?__ &rarr;
	* {:.fragment} as code base grows, a single file with all routes may end up unwieldy!
	* {:.fragment} helps organize functionality by top level paths
	* {:.fragment} (for example, all blog related stuff goes in /blog, all account related stuff goes in /account)
	* {:.fragment} for our simple projects, separating this stuff out may seem a bit like over-engineering, but it's handy to know for larger projects...
</section>

{% comment %}
<section markdown="block">
## Handlebars

One last thing. __Notice the handlebars setup?__ &rarr;

* it uses a different module for handlebars (see the package.json)
* it's essentially the same thing, but
	* [waaaaay easier to setup](https://github.com/donpark/hbs)
	* possibly not as _feature-ful_ compared to [express-handlebars](https://github.com/ericf/express-handlebars)
	* doesn't use a layouts folder, just convention: <code>layout.hbs</code>
	* <code>hbs</code> is the default extension
	* not quite as well documented (compare their explanations on layouts)
* either one will work for our purposes, though <code>hbs</code> will be easier going forward as it is generated as part of the scaffolding
</section>
{% endcomment %}


<section markdown="block">
## Back to Scaffolding

Recap so far...

* __How do we install it?__ &rarr;
* {:.fragment} <code>npm install express-generator</code>
* {:.fragment} __How do we generate a project?__ &rarr;
* {:.fragment} <code>express --hbs myapp</code> (the --hbs specifies that handlebars should be the template engine)
* {:.fragment} __How do we run an app?__ &rarr;
* {:.fragment} <code>./bin/www</code> or <code>node bin/www</code> &rarr;
* {:.fragment} that's weird... __let's take a closer look__ &rarr;
	* (note that app is just a module required by www)

</section>

<section markdown="block">
## The Project Layout

<pre><code data-trim contenteditable>
├── app.js (main app and app configuration)
├── bin
│   └── www (file that we run to start app)
├── package.json (dependencies, project meta data)
├── public (static assets)
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
</code></pre>
<pre><code data-trim contenteditable>
├── routes - (we'll do a lot of work here)
│   ├── index.js
│   └── users.js (get rid of this, yeah?)
└── views (layouts and templates)
    ├── error.hbs
	├── index.hbs
	└── layout.hbs
</code></pre>
</section>

<section markdown="block">
## Odds and Ends

* stack trace
	<code>NODE_ENV='development' node bin/www</code>
* check out the logging!
* what should we remove?
	* user routes?
</section>

<section markdown="block">
## Some Annoyances

* delete a bunch of stuff - users, any unwanted modules
* forces specific handlebars module
* some folder names are odd (javascripts?)
* two space indents may not match your indentation
* ups complexity somewhat (more files and requires)
</section>
<section markdown="block">
## Yeah, Scaffolding! 

For __convenience__, we'll be using scaffolding in class demonstrations from time to time. 

* you know, because live demos are prone to typos, misspellings and a bunch of on-the-spot debugging (fun sometimes, but maybe too time consuming)
* now that you (_hopefully_) are comfortable with some of the basic concepts behind express, feel free to use the generator 
* so, for your projects / homework, you can decide whether or not you'd like to use it (__why wouldn't you?__ &rarr;)
	* {:.fragment} maybe it's just not to your liking (too much extraneous stuff!)
	* {:.fragment} fortunately, express is _unopinionated_, you can use whatever project structure you like
	* {:.fragment} [check out some other options in the faq](http://expressjs.com/starter/faq.html)
	* {:.fragment} ... this layout will continue to evolve
</section>
