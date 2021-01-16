---
layout: slides
title: "Extracting Parameters from URL Paths"
---
<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
# We're going to be talking about URLs...

</section>

<section markdown="block">
## URLs are Important!

URLs determine how your content / site is organized. They should be designed with clarity and longevity (we want URLs that don't disappear or change) in mind! __What makes a good URL?__ &rarr;

* it makes it obvious what content or resource you're retrieving!
	* a list of blog posts may go under __<code>/posts</code>__ or __<code>/post</code>__
	* a single blog post my go in __<code>/post/[date]/[name-of-post]</code>__
	* it helps identify a specific _resource_: __<code>order/762190</code>__
* a URL should be human readable when possible:
	* __<code>post/how-to-make-good-urls</code>__
	* this is an example of a __slug__, a unique, short name with special characters (such as spaces) replaced by hyphens
* sometimes you may want to include an action in your url 
	* form pages or URLs that you post to may belong under: __<code>post/create</code>__
{:.fragment}
</section>

<section markdown="block">
## Some Technical Considerations and Conventions

In general, __good URLs are meaningful__ (their relevance to your content __helps__ site usability and even search engine optimization)!

Some additional __best practices that should be followed when creating URLs__ include: &rarr;

* never expose technical details (for example, extensions that reveal the technology stack that you use, such as .asp or .php)
* avoid meaningless information (although we used it in a previous homework, /home as a prefix to other URLs is superfluous, such as /home/about... when about can just come off of root)
* avoid needlessly long URLs
* be consistent with word separators (hyphen seems to be an accepted convention)
* never use whitespace or untypable characters
* use lowercase for your URLs
{:.fragment}
</section>

<section markdown="block">
# Ok, great. We have a meaningful URL... how do we deal with pesky clients that ask for that URL? 

</section>

<section markdown="block">
## Routing

One of the advantages of using a web framework is that most frameworks come with __routing__.

__Routing__ is the mechanism by which requests (as specified by a __URL__ and an HTTP __method__) are routed to the code that _handles_ the request. 

__How does routing usually work for URLs in our application? How about routing for static files?__ &rarr;

* {:.fragment} a url is requested...
* {:.fragment} and we map those urls to callback functions in our <code>app</code> or <code>router</code> objects (<code>app.get</code>, <code>app.post</code> or <code>router.get</code> and <code>router.post</code>)
* {:.fragment} or the path that's specified is used by the static files middleware to retrieve the contents of the file matching that path, starting from  some folder on the file system 
* {:.fragment} (of course, other middleware may provide responses as well)
</section>


<section markdown="block">
## Routers Gonna Route

Which brings us to... __what's a router again (an _actual_ router object)?__ &rarr;

A router is an _isolated instance_ of route handlers and middleware. It's an object that's essentially a __mini-application__ &rarr;
{:.fragment}

* you can define routes (or  _route handlers_ - the HTTP verb methods, path and callback)
* you can also use middleware in a router
{:.fragment}

<br>
A few other notes:
{:.fragment}

* routers are just middleware ... so to load a Router, just pass it into app.use
* __you can't do other things that the application object can do, like listen.__
{:.fragment}

</section>

<section markdown="block">
## Defining Paths

In our previous examples of route handlers, we've matched paths __exactly__ (well, with the exception of trailing slashes and casing):

<code>/about</code>

Sometimes, an exact match isn't what we want, though. __In some cases we may want a single route handler for multiple, similar, paths__ (for example <code>posts/some-post-title</code> may always map to a route handler that retrieves a post with <code>some-post-title)</code>.

</section>

<section markdown="block">
## Paths and Regular Expressions

Route handlers can use regular expressions to _capture_ incoming requests that are all going to similar paths. We can specify patterns to match URLs.

A __regular expression__ is a series of characters that define a pattern. These patterns can be made up of:

* simple characters - characters that you want to match directly
* special characters - characters that specify some a pattern rather than a direct match

</section>

<section markdown="block">
## Regular Expressions

__What are some examples of regular expression special characters?__ &rarr;

* __.__ - any character
* __\w__ - any _word_ character
* __\d__ - any digit character
* [xyz] - one of any of these characters
* [^xyz] - any character that's not in this set of characters
* __^__ - beginning of line
* __$__ - end of line
* {n} - n of the preceding
* {n,m} - at least n and at most m of the preceding
* __?__ - 0 or 1 of the preceding
* __*__ - 0 or more of the preceding
* __+__ - 1 or more of the preceding
{:.fragment}
</section>

<section markdown="block">
## Regular Expressions in JavaScript

In JavaScript, __regular expressions are bounded by forward slashes__ (they're not strings, so no quotation marks). 

Here are a few examples of regular expressions using a <code>String</code>'s <code>match</code> method (searches for regular expression in string):

<pre><code data-trim contenteditable>
'hello'.match(/ell/) // exactly ell
'swell'.match(/.ell/) // any character and ell
'hello'.match(/^.ell/) // starts with any character and ell
'swell'.match(/^.ell/) // starts with any character and ell
</code></pre>

<pre><code data-trim contenteditable>
// these all demonstrate how to specify number of matches
'hello'.match(/el*/) // e, then 0 or more l's
'he'.match(/el*/) // e, then 0 or more l's
'hello'.match(/el+/) // e, then 1 or more l's
'he'.match(/el+/) // e, then 1 or more l's
'helllllo'.match(/el+/) //  e, then 1 or more l's
'hello'.match(/el{1,2}/) // e, then at least one l, at most 2 l's
'helllllo'.match(/el{1,2}/) // e, then at least one l, at most 2 l's
</code></pre>
</section>
<section markdown="block">
## Some More Examples!


* <code>/\d\d\d/</code> - 3 digits
* <code>/h.\*$/</code> - h followed by 0 or more of any character up to the end of the line
* <code>^\w\d?\d?$</code> - one letter at the beginning of a line followed by exactly 0, 1 or 2 digits
</section>

<section markdown="block">
## Let's See This Work

In one of route handlers, let's try to use a regular expression that matches the following URLs:

<pre><code data-trim contenteditable>
/class01
/class02
...
etc.
</code></pre>

<pre><code data-trim contenteditable>
// notice that the first argument, the path, is a regular expression
router.get(/class\d\d/, function(req, res) {
	res.send('All the classes!');
});
</code></pre>
</section>

<section markdown="block">
## Regular Expressions Continued

__What path would you specify in your router to make all of these URLs match?__ &rarr;

* /jam
* /jem
* /jaaaaam
* /jingoism

<br>
But doesn't match

* /jm
* /ajam

<br>
<pre><code data-trim contenteditable>
router.get(/^\/j.+m$/, function(req, res) {
	res.send('Matched');
});
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## That Was Neat and All, But...

What if the path you're responding to has some meaningful information trapped in the URL? For example, maybe we want take the class number out of our <code>class\d\d</code> URL?

Or perhaps you've seen a URL like this:

<pre><code data-trim contenteditable>
posts/2015-10-27/paths-are-great
</code></pre>

__What are some bits of this URL that may be important to our applications?__ &rarr;

* the date
* the _slug_
{:.fragment}
</section>

<section markdown="block">
## Extracting Values From Paths

We can capture the values in a path by:

* specifying a path - as a string - with a part that's __prefixed by a colon__ for every value we want to capture
* using <code>req.params</code> to access that variable

<br>

<pre><code data-trim contenteditable>
'/some/other/parts/:var1/:var2'
</code></pre>

<code>var1</code> and <code>var2</code> can be accessed through:

<pre><code data-trim contenteditable>
req.params.var1
req.params.var2
</code></pre>
</section>

<section markdown="block">
## A Full Example of Extracting Parameters from a URL

<pre><code data-trim contenteditable>
router.get('/some/other/parts/:var1/:var2', function(req, res) {
	res.send(req.params.var1 + ', ' + req.params.var2);
});
</code></pre>

In your browser:

<pre><code data-trim contenteditable>
http://localhost:3000/some/other/parts/hello/world
</code></pre>
</section>

<section markdown="block">
## Capturing Bits of a Regular Expression

__We can also group parts of a regular expression so that they're captured in params as well!__.

* surround the part you'd like to capture with parentheses: <code>/class(\d\d)/</code> (captures the 2 digits after class)
* reference that part by indexing into <code>req.params</code>, with 0 being the first group, 1 the next, etc. ... <code>req.params[0]</code>

<br>
Using our previous <code>/class\d\d/</code>class example... to grab just the digits, we could:

<pre><code data-trim contenteditable>
router.get(/class(\d\d)/, function(req, res) {
  res.send(req.params[0]);
});
</code></pre>
</section>
