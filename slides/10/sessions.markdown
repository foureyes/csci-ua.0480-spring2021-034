---
layout: slides
title: "Sessions"
---
<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## About HTTP and State

__HTTP is a stateless protocol.__ 

That means HTTP requests don't know anything about each other. __However, there are situations where we want to maintain state across HTTP requests. What are some of those situations?__ &rarr;

1. {:.fragment} authentication (is this client logged in? ... maintaining logged in state means the user doesn't have to log in per request!)
2. {:.fragment} any time that we want to store persistent data about a client, like:
    * {:.fragment} have they visited the site before
    * {:.fragment} what are some _user's preferences_ (personalization)
    * {:.fragment} tracking / analyzing their behavior (!?)
    * {:.fragment} etc.
</section>

<section markdown="block">
## Maintaining State Between Requests

OK, fine - HTTP is stateless, but maintaining state can be useful. 

__So... how might we maintain state or share data between requests?__ &rarr;

* {:.fragment} store data on the server about a user
* {:.fragment} __link that data to the requests from a particular client__
    * {:.fragment} by using a __session id__ that represents that client
    * {:.fragment} ...that __session id is always retransmitted back to the server with every request from _the same client_!__
    * {:.fragment} which essentially __maintains state__

</section>

<section markdown="block">
## About That Session ID

__Welp! That sounds terribly insecure. Why should that make you wince just a little bit.__ &rarr;

* {:.fragment} once you own that id, you own that session!
* {:.fragment} which means that session ids shouldn't be easy to:
    * {:.fragment} _steal_
    * {:.fragment} guess

<br>

This means that:
{:.fragment}

1. {:.fragment} __session ids shouldn't be generated sequentially__
2. {:.fragment} they __shouldn't be present in the query string__ of a url (where someone shoulder surfing could see it, it appears in request logs, etc.)
3. {:.fragment} they __should be _adequately_ long / complex__ to prevent brute force guessing
</section>

<section markdown="block">
## Back to Maintaining State

A browser has to keep a session id, and send it over to the server on every request in order to maintain state. __What are some potential mechanisms for doing this?__ &rarr;


* {:.fragment} add a query string parameter for the session id on each request (__is this a good idea__? &rarr; <span class="fragment">no! shoulder surfing, logs, etc.</span>)
* {:.fragment} add a secret form input for every page (input type is hidden), __but...__ &rarr; <span class="fragment">same problem as above if using get, otherwise every request isn't a post</span>
* {:.fragment} cookies! - text files stored by your browser (Chrome actually stores cookies in a sqlite database, which is _essentially_ just a text file)
* {:.fragment} they can store a session id which links to more data on the server
* {:.fragment} as well as client side data (though there are better ways to do this)

<br>
Check out the [Open Web Application Security Project for more details](https://www.owasp.org/index.php/OWASP_Application_Security_FAQ#Which_is_the_best_way_to_transmit_session_ids-_in_cookies.2C_or_URL_or_a_hidden_variable.3F)
{:.fragment}


</section>


<section markdown="block">
## Um What? How Does That Work?

__Here's how state is maintained between requests using cookies.__ &rarr;

1. {:.fragment} the server __generates a session id__ for an http request
2. {:.fragment} as part of the response, it tells the browser to __store a session id in a cookie__ (to _set_ a cookie)
2. {:.fragment} upon receiving the response, your browser __creates or updates a cookie__ (tied to the domain that was visited)
3. {:.fragment} it contains some identifier (the session id)
4. {:.fragment} __when your browser makes a request to the server, it sends along that identifier__
5. {:.fragment} the server finds the __session__ associated with that identifier
6. {:.fragment} the __session store__ can be as simple as in-memory or file-based store... or it can be a database!
7. {:.fragment} you can store data for that user's session, including authentication, in the session store

</section>

<section markdown="block">
## Cookie Documentation 

__First... check out the documentation on cookies__:

1. [Cookies on mdn](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies) 
2. [Cookies on nczonline](https://www.nczonline.net/blog/2009/05/05/http-cookies-explained/)
3. [Cookies and Security on nczonline](https://www.nczonline.net/blog/2009/05/12/cookies-and-security/)
</section>

<section markdown="block">
## Cookie Creation

Cookies are stored by your browser, but __how do they get there?__ &rarr;

1. {:.fragment} the server __sets a header in an http response called `Set-Cookie`__ (multiple `Set-Cookie`'s in a single http response are allowed)
2. {:.fragment} this header instructs the __browser to create a cookie__
3. {:.fragment} `Set-Cookie` header values can specify (separated by `;`'s):
    * an arbitrary __`name=value`__ pair
    * __expiration__ / how long a cookie is valid for
    * various security options (we'll see later)
4. {:.fragment} now, __every request that the browser makes to the domain that set the cookie will contain a `Cookie` header__ 
    * the value is all of the cookies that the browser has for that domain, separated by semicolons
    * (the original security options and expiration are not sent back)

</section>

<section markdown="block">
## Set-Cookie and Cookie examples

__An http response that sets a few cookie values.__ &rarr;

<pre><code data-trim contenteditable>
HTTP/1.0 200 OK
Content-type: text/html
Set-Cookie: foo=bar
Set-Cookie: baz=qux 
Set-Cookie: session_id=5d6d473c-a370-44c8-bff0-4f28efd7c92a; HttpOnly; Secure
</code></pre>

__An http request that sends back cookies.__ &rarr;
<pre><code data-trim contenteditable>
GET / HTTP/1.1
Cookie: foo=bar;baz=qux
</code></pre>

Note that:

* you can use multiple `Set-Cookie` headers in one response
* the client sends all values in a single `Cookie` header in the request

<br>We'll discuss `HttpOnly` and `Secure` in a moment
</section>

<section markdown="block">
## Session vs Permanent Cookies 

__Cookies will be deleted when the client is shut down__ (for example, when you quit your browser). These are __session cookies__.

For cookies that last longer (or shorter!), you can create __permanent cookies__ that expire at a certain date or after a certain length of time. 

__You can do this by adding options to the `Set-Cookie` header__ &rarr;

* Expires (date)
    * `Set-Cookie: foo=bar; Expires=Thu, 29 Oct 2016 07:28:00 GMT;`
* Max-Age (number of seconds)
    * `Set-Cookie: foo=bar; Max-Age=300;`
    
<br>
__Note that a server cannot force the browser to delete cookies!__ ... but it can set an expiration date which will hopefully convince the client to eventually delete them.

</section>

<section markdown="block">
## Security Options

In addition to name value pairs of arbitrary data, there are also __options that can be set through the `Set-Cookie` header__ (also separated by semicolons):

* {:.fragment} `Domain` - cookies sent will only be valid for this domain (default is current domain)
* {:.fragment} `Path` - cookies sent will only be valid for this path (default is all paths)
* {:.fragment} `HttpOnly` - only allow reading of cookies via http, __don't allow JavaScript!!!!__ ...__why do this?__ &rarr; <span class="fragment">3rd party JavaScript included on your page is allowed to read cookies for that domain!?</span>
* {:.fragment} `Secure` - cookies will only be sent if the request is encrypted (using SSL/HTTPS)

<br>
Out of these, __definitely use `HttpOnly` and `Secure`__... though for most of class, we'll be omitting `Secure` until we get to SSL/HTTPS.
{:.fragment}
</section>



<section markdown="block">
## Sessions

Ok, so back to this idea of sessions. __Sessions allow you to:__ &rarr;

* {:.fragment} store data on a _per-session_ basis
* {:.fragment} by maintaining a small piece of data on the client (via cookies)
* {:.fragment} that matches with data on the server
* {:.fragment} that means... different clients will have different sessions (and consequently different state)
* {:.fragment} a session is ended, from the browser perspective, when the browser is closed
</section>

<section markdown="block">
## Creating Your Own Session Management

__You can create your own session management by creating custom middleware that:__ &rarr;

1. {:.fragment} has an __in-memory store of session ids__ (read: global variable)
2. {:.fragment} __checks__ every request for __a `Cookie` header__ 
3. {:.fragment} if there is no `Cookie` header that contains a session id, it'll __generate a session id__ (using the `crypto` module)
    * {:.fragment} then __sends back the `Set-Cookie` header with that id__
4. {:.fragment} however, if there is a `Cookie` header with a session id, it'll:
    * {:.fragment} search for that id in the session store
    * {:.fragment} retrieve that data
    * {:.fragment} add it as a property on the request object so that it can be accessed programmatically
    * {:.fragment} send back a response like usual

</section>

<section markdown="block">
## Creating Your Own Session Management Continued

__You can try writing some session management middleware by using__ &rarr;

* `req.get` - to retrieve the `Cookie` header
* parsing that header into name/value pairs
* the `crypto` module to create a session id
* `res.set` or `res.append`- to set the `Set-Cookie` header

<br>
__Note that... `res.set` doesn't allow you to set multiple `Set-Cookie` headers__ (it only leaves the last cookie set). So [res.append](http://expressjs.com/en/api.html#res.append) allows you to add values to an already set response field.

<br>
Of course, as you might expect, session middleware already exists... but we'll try a little bit of the above to see what's going on.

</section>


<section markdown="block">
## Managing Cookies on the Client Side

_Stock_ Chrome always you to __view cookies as well as delete them__: &rarr;

1. {:.fragment} Web Developer Tools
2. {:.fragment} Application (tab bar on top of web developer tools)
3. {:.fragment} Cookies (left panel, under "Storage")
4. {:.fragment} use dropdown to see cookies
5. {:.fragment} or chrome://settings/cookies

</section>

<section markdown="block">
## Setting Some Cookies

Use `res.set` or `res.append` to __set the `Set-Cookie` header__ &rarr;

<pre><code data-trim contenteditable>
app.get('/make-a-cookie', function(req, res) {
    // used append so that we can Set-Cookie more than once
    res.append('Set-Cookie', 'MY_SESSION_ID=123; HttpOnly');
    res.append('Set-Cookie', 'color=#00ff00');
    res.send('made you a cookie');
});
</code></pre>

<br>
__Watch all following requests send those cookies back via the `Cookie` header.__!

</section>


<section markdown="block">
## HttpOnly?

Here's an example of displaying cookies using __client side JavaScript, using `document.cookie`.__ &rarr;

<pre><code data-trim contenteditable>
app.get('/peek', function(req, res) {
    // uncomment this: 
    // const s = "alert(document.cookie);";
    res.send('<script>' + s + '</script>' + 'check out yr cookies!');
});
</code></pre>

<br>
If you used the example in the previous slide, the `HttpOnly` cookie, `MY_SESSION_ID`, should not appear in the `alert`.
</section>

<section markdown="block">
## Session Middleware

The previous slides sketch out a way of implementing manual cookie management.

__For "production", instead of using a custom solution , you can use the [`express-session` module](https://github.com/expressjs/session)!__ &rarr;

* {:.fragment} handles session id generation for you!
* {:.fragment} deals with setting cookies on the browser, parsing cookies and retrieving session ids from requests
* {:.fragment} __most importantly, it provides a property on your request object that contains session data: req.session!__
	* on the server, you can store data in a user's session by using req.session.someData = 'some value'
	* ... and, of course, you can read it back out by using `req.session.someData`

<br>
__How might you use this?__
{:.fragment}

* {:.fragment} tracking views to a page: in a route handler for a path, `req.session.count += 1`
* {:.fragment} keeping preferences: in route that handles form input, `req.session.favoriteColor = req.body.favoriteColor` 



</section>

<section markdown="block">
## Setting Up Session Middleware

__Use npm to install as usual:__ `npm install express-session`

__Boilerplate setup.__
<pre><code data-trim contenteditable>
const express = require('express');
</code></pre>

{% comment %}
const bodyParser = require('body-parser');
{% endcomment %}

__Include the express-session module...__

<pre><code data-trim contenteditable>
const session = require('express-session');
</code></pre>

<pre><code data-trim contenteditable>
const app = express();

app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: false }));
</code></pre>

</section>

<section markdown="block">
## Storing Data in Your Session 

__Set up some session options (the secret should really be externalized and not in version control, but we'll keep it here for convenience).__

<pre><code data-trim contenteditable>
const sessionOptions = { 
	secret: 'secret for signing session id', 
	saveUninitialized: false, 
	resave: false 
};
app.use(session(sessionOptions));
</code></pre>


</section>

<section markdown="block">
## What's the Deal With These Options

Check out the [docs for details on all of the options](https://github.com/expressjs/session). The ones that we set explicitly are:

* __secret__ - used to sign the session id cookie to prevent tampering (and possibly to ensure length/complexity to make _unguessable_)
* __saveUnitialized__: false - don't save new empty session (to preserve space)
* __resave__: false - prevents session data from being resaved if session data is unmodified

<br>

Some others interesting ones that we don't explicitly set:

* __store__ - where session data is stored, defaults to in memory storage
* __genid__ - function that generates session id 

</section>

<section markdown="block">
## Default MemoryStore

__By default, `express-session` uses an in memory session store, `MemoryStore`__ &rarr;

* {:.fragment} this works great for development and prototyping because you don't have to set up a database to store sessions
* {:.fragment} however, from the module's documentation:
* {:.fragment} "__Warning__ The default server-side session storage, `MemoryStore`, is purposely not designed for a production environment. It will leak memory under most conditions, does not scale past a single process, and is meant for debugging and developing." 

So, for our purposes, it's ok to use the in-memory store, but any production application should use another compatible [session store](https://github.com/expressjs/session#compatible-session-stores), such as memcache, mongodb, etc.
{:.fragment}

</section>

<section markdown="block">
## req.session, req.session.id

__Once you have all of the setup finished, you'll have a new property available on your request object. It will allow you to use:__ &rarr;

1. {:.fragment} `req.session` - an object that you can read and write session data to 
2. {:.fragment} `req.session.id` and `req.sessionID` - the id for the session (both are the same and both are read only)

</section>

<section markdown="block">
## Saving Data in a Session

__Let's create a simple-form that:__ &rarr;

* allows a user to submit their name using a form
* the form page will have a heading that consists of the user's submitted name (so, before submitting data, the name will be blank, but afterwards, it will display the submitted data)
* the form is at /
* the form will post to itself (the same url that the form is on)
* the name submitted will be stored in the session
* it will redirect back to the form

</section>

<section markdown="block">
## Routes

__Our usual routes, but note the use of <code>req.session.</code>__

<pre><code data-trim contenteditable>

app.get('/', function(req, res) {
    const name = req.session.myName || '';
    res.render('index', {'myName':name});
});

app.post('/', function(req, res) {
    console.log(req.body);
    req.session.myName = req.body.firstName;
    res.redirect('/');
});


app.listen(3000);
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## And, In the Template

<pre><code data-trim contenteditable>
<h1>myName: {{"{{myName"}}}}</h1>

<form method="POST" action="">
my name: <input name="firstName" type="text">
<input type="submit">section
</form>
</code></pre>

</section>


<section markdown="block">

## Try Entering Data With Two Different Browsers Or Incognito Mode

__What do you think will happen?__ &rarr;

Session data will be unique to each browser session (so you can have foo for one name and bar for another name if you're using two different browsers)
{:.fragment}

</section>

<section markdown="block">
## Let's Prove That There's Some Data Stored on the Client Side

1. chrome://settings/cookies
2. find localhost:3000
3. check out the content of __connect.sid__

</section>

<section markdown="block">
## Copying Cookie Data, Stealing Sessions!

__What do you think will happen if we request the page with curl? Will the name be there?__ &rarr;

<pre><code data-trim contenteditable>
curl localhost:3000 
</code></pre>
{:.fragment}

Nooope... no info to identify the session, so name isn't there.
{:.fragment}

We can actually use curl to send cookies by using the `--cookie` flag. Let's copy over the cookie data...
{:.fragment}

<pre><code data-trim contenteditable>
curl localhost:3000 -v --cookie "connect.sid=..."
</code></pre>
{:.fragment}

</section>

<section markdown="block">
## Shutting Down the Server

__What will happen if we restart the server? Will the session data still be present?__ &rarr;

We're using an in-memory session store, so, the session data will not be persisted.
{:.fragment}

</section>

