---
layout: slides
title: "Using GET, Review"
---

<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## GET

__In a GET request, how is data sent to the server?__ 

Data is passed through the url, in the __query string__.
{:.fragment}

* starts with a __question mark__
* followed by __name/value__ pairs joined by an __equals sign__
* with each pair separated by __ampersands__
* <code>?heardItAlready=yes&nextThingPlease=ok</code>
{:.fragment}
</section>

<section markdown="block">
## Query String & Encoding

__Is the query string encoded in any way?__ &rarr;

* query strings are URL encoded (also called percent encoded)
* numbers and letters are characters that __do not have a special meaning in URL__, and they don't have to be encoded
* however, there numeric references for characters with special meaning 
* they're prefixed with a % ... what characters do you think need this substitution?
* __what other characters do you think are encoded?__ &rarr;
	* {:.fragment} <code>%26</code> - ampersand, <code>%2F</code> - forward slash, <code>%40</code> - at symbol
	* {:.fragment} and of course, a percent sign itself %25. what would _double urlencoding_ <code>&</code> be?
	* {:.fragment} <code>%2525</code>
    * {:.fragment} space is special in that it _should_ be %20, but it's +
{:.fragment}
</section>

<section markdown="block">
# Aside: Typing a URL in your browser results in a GET request!
</section>

<section markdown="block">
## Access to the Query String

__Is there a way for our application to access the query string?__ &rarr;

Just check out the req.query property. __Let's take a look. What's the simplest application we can write? It should just respond to / and log out query string data if any.__. &rarr;
{:.fragment}

<pre><code data-trim contenteditable>
const express = require('express');
const app = express();

app.get('/', function(req, res) {
	console.log(req.query);
});
app.listen(8080);

</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Access to Query String Data

In order to access the data passed along in the data string, just look at __<code>req.query</code>__.

* each query string name is a property name 
* each query string value is the value of a property in a JavaScript object.

</section>


<section markdown="block">
## A Quick Application

__Define a route, call render... and pass it some context:__ &rarr;

<pre><code data-trim contenteditable>
app.get('/', function(req, res) {
	res.render('index', {'items':[1, 2, 3, 4, 5, 6]});
});
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Create Your Templates and Layouts

__Create your surrounding html in <code>views/layout.hbs</code> (don't forget <code>body</code> with 3 curly braces):__ &rarr;

<pre><code data-trim contenteditable>
&lt;!doctype html&gt;
&lt;html&gt;
&lt;body&gt;
in the layout
{{ "{{{body" }}}}}
&lt;/body&gt;
&lt;/html&gt;
</code></pre>
{:.fragment}

__And of course, a template. Here, we're iterating over the value <code>items</code> passed in as the <code>context</code>:__ &rarr;
{:.fragment}

<pre><code data-trim contenteditable>
<ul>
{{"{{#each items"}}}}
<li>{{"{{this"}}}}</li>
{{"{{/each"}}}}
</ul>
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Using Query String Params

__Can we use query string params to filter the numbers we're seeing in the list?__ &rarr;

<pre><code data-trim contenteditable>
http://localhost:8080/?greaterThan=4

# show only numbers greater than 4 in the template!
</code></pre>

<pre><code data-trim contenteditable>
// in your callback for / ...
const numbers = [1, 2, 3, 4, 5, 6];
const context = numbers;
if (req.query.greaterThan !== undefined) {
	context = numbers.filter(function(num) {
		return num > +req.query.greaterThan;
	});
}
res.render('index', {'items':context});
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## We Can Do the Same for Basketball Stats!

__Create a global stats variable (_don't really do this_, we'll find better data stores later) using data from the higher order functions slides.__ &rarr;

<pre><code data-trim contenteditable>
const stats = [
{"lastName":"Duncan", "team":"Spurs", "FGM":5, "FGA":10},
{"lastName":"Parker", "team":"Spurs", "FGM":7, "FGA":18},
{"lastName":"Ginobili", "team":"Spurs", "FGM":6, "FGA":11},
{"lastName":"James", "team":"Heat", "FGM":10, "FGA":21},
{"lastName":"Wade", "team":"Heat", "FGM":4, "FGA":12},
{"lastName":"Bosh", "team":"Heat", "FGM":6, "FGA":14}
];
</code></pre>

</section>
<section markdown="block">
## Basketball Continued

__In your route's callback function, create a similar filter, but for minimum field goals made:__ &rarr;

<pre><code data-trim contenteditable>
const minFgm = req.query.minFgm || 0;
const filteredPlayers = stats.filter(function(player) {
	return player.fgm >= +minFgm;
});
res.render('index', {'players':filteredPlayers});
</code></pre>

__In the view.__ &rarr;

<pre><code data-trim contenteditable>
{{"{{#each players"}}}}
<li>{{"{{lastName"}}}} - {{"{{FGM"}}}} field goals made </li>
{{"{{/each"}}}}
</code></pre>

__Use this query string.__ &rarr;

<pre><code data-trim contenteditable>
?minFgm=3
</code></pre>
</section>
