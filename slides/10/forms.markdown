---
layout: slides
title: "Forms"
---
<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>
<section markdown="block">
## Sending Data


__For now, we have two options (methods) of sending data to the server. What are they, and how do they send their data?__ &rarr;

* __GET__ - data is in the query string
* __POST__ - data is in the request body
{:.fragment}

<br>
Note that __POST__ is not any more secure than __GET__ ....
{:.fragment}

* {:.fragment} since someone eavesdropping on your request can still see all parts of it (including the body, as long as it's not over HTTPS) 
* {:.fragment} (though... __can you think of a way that spills info in your GET request, that won't happen in POSTs?__ &rarr;)
* {:.fragment} your browser's history, or bookmarking!
</section>

<section markdown="block">
## Sending Data

__So far... we know two ways that the user can make a browser send a request to the server:__ &rarr;

* entering it in the URL bar
* __or submitting in through a form__
{:.fragment}

<br>
__Let's see how form submission works.__ &rarr;
{:.fragment}
</section>

<section markdown="block">
## Creating a Form That Sends Data

To create a form that sends data, you'll need to:

* create the actual form in your mark-up
	* form fields (like input, type=text)
	* something to tell the browser to send the form (like a submit button)
* routes in your app to handle:
	* GETing the original form at some path
	* POSTing (or __GET__ing) the form to a path
	* optionally, __GET__ after submission
</section>

<section markdown="block">
## Creating the HTML Form

An HTML <code>form</code> element has the following attributes:

* __method__ - the method of the request... __GET__ or __POST__
	* generally use __POST__ for creating new (or even modifying) resources/pages/content (add, modify or delete data, for example)
	* generally use __GET__ for retrieving resources/pages/content (search or filter, for example)
* __action__ - the URL that your browser will send data to

<br>
Your form's fields have the following attributes:

* __name__ - the name of the specific value you're sending over
* __value__ - (optionally) set the default value of this field
</section>

<section markdown="block">
## In Your Application

To handle data in the request body, you'll need to:

* use body-parser middleware
* __add the appropriate routes... what will they be?__ &rarr;
	* {:.fragment} you'll need an <code>app.get</code> to handle requesting the original form
	* {:.fragment} and a route to handle the post (the route handling the __POST__ can use request.body.property-name)
    * {:.fragment} you may want another route for a success page, or send back to the original form
</section>

<section markdown="block">
## Using the Body Parser Middleware

Again, the body of a POST is likely to be encoded and compressed, so to parse out the data and add it to the <code>request</code> object, use the body-parser middleware:

<pre><code data-trim contenteditable>
// only handle urlencoded data...
// extended: false specifies that incoming values will be treated as strings
// or arrays
app.use(express.urlencoded({ extended: false }));
</code></pre>
</section>

<section markdown="block">
## A Very Simple Example

Here's an example that takes a name entered by the user... and displays it on the page directly. __In your app.js...__ &rarr;

(some setup)

<pre><code data-trim contenteditable>
const express = require('express');
const app = express();

app.set('view engine', 'hbs');
</code></pre>
<pre><code data-trim contenteditable>
app.use(express.urlencoded({ extended: false }));

// this is middleware to log method and path

app.use(function(req, res, next) {
	console.log(req.method, req.path);
	next();
});
</code></pre>

</section>
<section markdown="block">
## Example Continued

We'll create a global variable to _store_ our data. Definitely not conventional; we'll use real data stores later.

<pre><code data-trim contenteditable>
// oops, a global... ok for now...
const myName = '';
</code></pre>
<pre><code data-trim contenteditable>
app.get('/', function(req, res) {
	res.render('simple-form', {'myName':myName});
});
</code></pre>
<pre><code data-trim contenteditable>
app.post('/', function(req, res) {
	console.log(req.body);
	// change the global
	myName = req.body.myName;
	res.redirect('/');
});
</code></pre>
<pre><code data-trim contenteditable>
app.listen(8080);
</code></pre>

</section>

<section markdown="block">
## And our View

In simple-form.handlebars

<pre><code data-trim contenteditable>

<strong>Current value of "myName":</strong> {{"{{myName"}}}}
<form method="POST" action="/">
Enter your name: <input type='text' name="myName">
<input type="submit">
</form>
</code></pre>
</section>

<section markdown="block">
## Some Other Exercises


__keeping track of cat names__ (from our previous demo)

* display a list of cat names
* have a form that allows you to add a cat name
* a global Array of names is useful for this

<br>
__a mad libs form...__

* display lyrics to your favorite song
* replace 4 words by words submitted through a form

<br>
__a number guessing game...__

* your app keeps a secret number
* your form will submit a number... 
    * if it matches the secret number redirect to a win page
    * if it doesn't match, get the form again for another chance to guess
</section>


