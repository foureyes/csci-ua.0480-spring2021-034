---
layout: slides
title: "Routers, Directory Layout"
---

<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## Generating Scaffolding

With express generator, you can run:

<pre><code data-trim contenteditable>
express --hbs projectname
</code></pre>

...to create a directory called projectname, with a bunch of files and code auto-generated for you.

</section>

<section markdown="block">
## Directory Layout

Created by express-generator:

* __routes__ - directory that contains your routers (and consequently your route handlers, like app.get)
* __app.js__ - app wide requires and configuration, mount routers and specific paths (app.use('/list', listRouter))
* __bin/www__ - your run script
* __views__ - handlebar templates (views), name must match what you use in res.render
* __views/layout.hbs__ - your _outer_ template file... the surrounding html

</section>

<section markdown="block">
## Uh. What's a Router?


A __router__ is an _isolated instance_ of route handlers and middleware. It's an object that's essentially a __mini-application__. This means that you can:

1. you can define routes (or  _route handlers_ - the HTTP verb methods, path and callback)
2. you can also use middleware in a router (which means that you can _mount_ a router at a specific path and effectively have a path prefix for all of the paths that your router handles)

<br>
__Let's see an actual example__ ...

</section>

<section markdown="block">
## Creating a Router

The top level express object has a <code>Router()</code> function ([see the docs](http://expressjs.com/4x/api.html#router))... that __creates a new router object__. (Note that it's not a constructor, so don't invoke it with <code>new</code>).

<pre><code data-trim contenteditable>
const express = require('express')
const router = express.Router();
</code></pre>
</section>

<section markdown="block">
## Adding Route Handlers to a Router

Just like the <code>app</code> object we would create to represent an Express application, our <code>router</code> has a bunch of methods named after HTTP verbs... so we can add some route handlers:

<pre><code data-trim contenteditable>
// note that we're calling get on the router object that we created before
router.get('/bar/baz', function(req, res) {
  res.send('qux');
})
</code></pre>

</section>

<section markdown="block">
## Using Your Routers

If your router is in a different file, you will need to expose the router object (make it _public_) by adding it to your <code>module.exports</code> (so... if your router code is in <code>routes/myrouter.js</code>):

<pre><code data-trim contenteditable>
module.exports = router;
</code></pre>

Then, just require it in <code>app.js</code>:

<pre><code data-trim contenteditable>
// the router object you defined in myrouter.js
// is now referenced by myRouter
const myRouter = require('./routes/myrouter');
</code></pre>
</section>

<section markdown="block">
## Using Your Routers Continued

Finally, to actually _activate_ all of the route handlers, you'll have to __use__ your router object like any other middleware. If you mount it at a specific path, all URLs in your router will be prefixed by that path.

<pre><code data-trim contenteditable>
app.use('/foo', myRouter);
</code></pre>

In our code above, our router was mounted on <code>'/foo'</code>... so the full path to the single route handler that we declared would be:

<pre><code data-trim contenteditable>
/foo/bar/baz
</code></pre>

__Let's see if it works!__ &rarr;
</section>

<section markdown="block">
## Routers and Express Generator

If you use the scaffolding created by express generator, you'll notice that there are two routers created for you:

* <code>index.js</code>
* <code>users.js</code>

<br>
Feel free to remove them... but if you do, make sure you take out the requires as well.
</section>

<section markdown="block">
## Hey Wait, There's Something That Wasn't Generated!

__Where do I put my database code?__ &rarr;

Wherever you want! For small apps:
{:.fragment}

* __db.js__ - schema, models and connection
* __app.js__ - make sure to require db.js here to connect to database and define models
* __routes/yourRouter.js__ - possibly a good place to retrieve model and use CRUD methods on model instance
{:.fragment}
</section>

<section markdown="block">
## Running Your App

If you generated your application with Express generator, then you can run your app by:

<pre><code data-trim contenteditable>
./bin/www
</code></pre>

(from within the project directory)



</section>

<section markdown="block">
## Restarting Server on Code Changes

If you're tired of restarting your application whenever you change some code, you can install nodemon ([see the docs](https://github.com/remy/nodemon/blob/master/README.md).

__nodemon will run your application and watch for changes to files; when a change occurs, it restarts your application__ &rarr;

To install:

<pre><code data-trim contenteditable>
npm install -g nodemon
</code></pre>

To run your application:

<pre><code data-trim contenteditable>
nodemon app.js
nodemon ./bin/www
</code></pre>

To watch for specific extensions, add the -e flag
<pre><code data-trim contenteditable>
nodemon -e js,hbs
</code></pre>

</section>
