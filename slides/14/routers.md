---
layout: slides
title: "Routers"
---
<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## What's a Router?


A __router__ is an _isolated instance_ of route handlers and middleware. It's an object that's essentially a __mini-application__. This means that:

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

</section>
