---
layout: slides
title: "Authentication"
---
<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## Authentication vs Authorization


__In the context of the web, what is authentication? Is it the same as authorization?__ &rarr;

* {:.fragment} __Authentication__ the process of determining whether or not who they claim to be.
* {:.fragment} __Authorization__ is the set of rules that determine whether a user is allowed to perform an action that they are trying to perform.
* {:.fragment} You may hear authentication and authorization referred to as AuthN and AuthZ respectively
* {:.fragment} In today's class, we'll be discussing __authentication__
</section>

<section markdown="block">
## Authentication and the Web

__How do websites verify that a user is who they claim to be? How do websites implement authentication?__ &rarr;

* traditionally through __username__ and __password__
* __...what are some other ways?__ &rarr;
	* {:.fragment} requiring more than just a username and password (maybe both something you know and something you _have_) ... __any examples of this _two-factor auth_ thing?__ &rarr;
	* {:.fragment} (a code that's texted to your phone - think gmail's 2-factor auth, or a dedicated device, like yubikey)

	* {:.fragment} some sort of integration with with a social media site that can vouch for your credentials!
		* {:.fragment} like Facebook Connect
		* {:.fragment} or Google Sign-In
{:.fragment}
</section>

<section markdown="block">
## Before We Go On

If our site collects any _sensitive_ information from a user, __the communication between our server and the client should be encrypted__.  To do this, you'll need to use TLS/SSL (that's when you see the padlock icon and https in the schema part of the url):

__TLS/SSL__ are cryptographic protocols

1. a method to encrypt traffic between the server and client 
2. a typical exchange involves the following steps:
    * the client and server agree on which protocol and version to use
    * the server sends back a cryptographically signed certificate supplied from a trusted third party 
    * this certificate is used by the browser to verify the identity of the server that the browser is connecting to
    * keys for encryption (a parameter to an encryption algorithm) are exchanged, and are subsequently used to communicate through symmetric encryption

</section>

<section markdown="block">
## Where do I Get My Cert?

__You'll have to__: &rarr;

* buy a cert from a Certificate Issuer, like digicert, geotrust, etc.
* or use a cert from __Let's Encrypt__.

<br>
__Let's Encrypt__ is a free certificate authority backed by a non-profit.  Check out:

* [greenlock-express](https://www.npmjs.com/package/greenlock-express), a node module for installing and renewing Let's Encrypt certs
* ...and this [blog article](https://justinmccandless.com/post/setting-up-https-on-node-for-free-with-lets-encrypt/) for how to set everything up.


</section>

<section markdown="block">
## Using SSL/TLS

A fully detailed lecture on security and encryption is beyond the scope of this class (we'll talk a _little_ more about tls/ssl). __However, you should know there's support for TLS/SSL in Node.js and Express.__ &rarr; 

* you'll have to obtain a certificate from a certificate issuer, such as DigiCert, Comodo, Let's Encrypt etc. 
* (you can also create a _self-signed_ one (not suitable for production)
* ...and configure express to use it (notice that you have to explicitly call createServer, and that the options may vary depending on how you've obtained your cert - [see relevant docs](http://expressjs.com/api.html#app.listen))

<pre><code data-trim contenteditable>
// require http, https, express, etc.
const options = {
	key: fs.readFileSync(__dirname + '/ssl/server.pem'), 
	cert: fs.readFileSync(__dirname + '/ssl/server.crt'),
};
https.createServer(options, app).listen(app.get('port'), function(){ 
	console.log('Express started ...');
});
</code></pre>

</section>

<section markdown="block">
## Use TLS/SSL!

__If you're curious about how it works under the hood:__ &rarr; 

1. we'll cover a little bit more about tls/ssl in the next set of slides
2. check out this [StackExchange Information Security article on TLS/SSL](http://security.stackexchange.com/questions/20803/how-does-ssl-tls-work)

<br>

__Also, we can actually check out certs in our browser.__ &rarr;

(try going to home.nyu.edu in chrome... and check on the padlock)
{:.fragment}
</section>





<section markdown="block">
## Back to Authentication

Ok... now that that's out of the way... __If we'd like to add username and password for authentication, where do we store that information?__ &rarr;

Our database makes sense, of course, but __what would our Schema look like, and what would the contents be of each field?__ &rarr;
{:.fragment}

Simple enough... just two fields, username to store username and password to store password. Easy!
{:.fragment}

<pre><code data-trim contenteditable>
const userSchema = mongoose.Schema({
{
	username: String,
	password: String,
})
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## The Password Field

That password field is just the password in plain text. __Why is storing a password in plain text a bad idea?__ &rarr;

The data in our database may be compromised (__how?__ &rarr;):
{:.fragment}

* someone hacking into the database server and obtaining users' passwords 
* an inadvertent leak of data from a misconfigured server
* a person that has access to the database server misusing their access privileges to read sensitive information
* database backups being lost or stolen
* (yikes! ...[more on this](http://security.blogoverflow.com/2011/11/why-passwords-should-be-hashed/))
{:.fragment}
</section>

<section markdown="block" data-background="#440000">
# Don't Store Passwords in Plain Text

</section>
<section markdown="block">
## Hashing vs Encryption

Both are ways that we can use to transform a string into another string... but __what's the difference between the two?__ &rarr;

* {:.fragment} __hashing__ is a one way function (mapping)
* {:.fragment} __encryption__ is a two way function
	* {:.fragment} it's reversible
	* {:.fragment} you can decrypt an encrypted string

<br>
__Which do you think is appropriate for storing passwords? Why?__ &rarr;
{:.fragment}

* {:.fragment} __we should hash our passwords__
* {:.fragment} if the transformation were reversible, then it would be possible to retrieve the actual passwords!
</section>

<section markdown="block">
## Hashing Passwords

__Ok... so, how do I find or create an adequate hashing algorithm? What are some properties that we would look for?__ &rarr;

* kind of a trick question
	* we don't want to create or choose an algorithm ourselves! 
	* we should let [expert cryptographers and/or standards bodies do this for us](http://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-132.pdf)
* but, maybe some characteristics are:
	* collision resistant
	* computationally difficult to generate (__why? ... we'll see in the next couple of slides__ &rarr;) 
{:.fragment}
</section>

<section markdown="block">
## Hashing Algorithms

__It turns out that these are the ones that are recommended:__ &rarr;

1. {:.fragment} `bcrypt`
2. {:.fragment} `PBKDF2`

<br>
__But only for _now_ ... as the landscape continues to change:__ &rarr;

* {:.fragment} computational power increases
* {:.fragment} flaws found in existing algorithms
* {:.fragment} better algorithms discovered
</section>

<section markdown="block">
## Common Attacks Against Hashed Passwords

__What are some ways of figuring out a password from a hash? (You'll see why the hashing algorithm should be computationally expensive)__ &rarr;

* {:.fragment} most naive way is to guess the password, hash the guess... and compare with the password's hash using:
	* {:.fragment} brute force - construct every possible string up to a length and use that as a guess 
	* {:.fragment} dictionary - use a set of known passwords (super [easy](https://www.google.com/search?q=password+dictionary&oq=password+dictionary&aqs=chrome..69i57j0l5.2589j0j9&sourceid=chrome&es_sm=91&ie=UTF-8) [to](http://security.stackexchange.com/questions/1376/where-can-i-find-good-dictionaries-for-dictionary-attacks)  [find](https://wiki.skullsecurity.org/Passwords))
* {:.fragment} precompute hashes and use a lookup table
* {:.fragment} [and others](https://crackstation.net/hashing-security.htm)
</section>


<section markdown="block">
## Are We Done Yet?

__Is a one way hash of a password adequate? Are we done yet? What's another consideration?__ &rarr;

__What can be inferred from two passwords if their hash is the same?__ &rarr;
{:.fragment}

They're the same passwords! If you figure out one, you've figured out the other.
{:.fragment}

__How can we make the hash of two of the same passwords different from eachother?__ &rarr;
{:.fragment}

Add salt.
{:.fragment}

</section>

<section markdown="block">
## Salting and Hashing

To prevent the hash of two of the same passwords from being the same, we can __salt__ the password.

* add a random string (you'll need to store the salt as well as the password in your database) to the password
* ...hash the string formed from the salt and password
* the salt should be unique per-user, per-password (__don't reuse salts... why?__ &rarr;)
	* {:.fragment} two users with the same password will still have the same hash!
</section>

<section markdown="block">
## TLS/SSL and Storing Passwords Summary 

* __use TLS/SSL__ to encrypt traffic between server and client
* __never store passwords in plain text__
* __hash__ passwords (one way, unlike encryption, which is reversible)
* __salt__ and hash passwords

<br>

And here are some particularly good resources

* [How to securely hash passwords](http://security.stackexchange.com/questions/211/how-to-securely-hash-passwords)
* [Salted Password Hashing - Doing it Right](https://crackstation.net/hashing-security.htm)
* [NIST - Recommendation for Password-Based Key Derivation](http://csrc.nist.gov/publications/nistpubs/800-132/nist-sp800-132.pdf)

</section>

<section markdown="block">
## Back to Authentication

Assuming that we have all of the previous stuff on password storage right. What's next? We'll need to manage:

* a way to __authenticate__ a user 
* keep that authentication persistent through a user's session
</section>

<section markdown="block">
## Passport

We'll use the following node modules for authentication and session management:

* [passport](http://passportjs.org/guide/) - authentication middleware
* [passport-local](https://github.com/jaredhanson/passport-local) - allows password/username authentication with passport
* [passport-local-mongoose](https://github.com/saintedlama/passport-local-mongoose) - mongoose plugin for facilitating username/password auth, and user storage
* [express-session](https://www.npmjs.org/package/express-session) - session middleware (no __s__!)
</section>

<section markdown="block">
## Passport Usage

__So... what does it actually do?__ &rarr;

* __handles authentication__ (ask for user and password)
* __persists that authentication__ (session management)
* __supplies__ a `req.user` object 
	* enabled when user is authenticated
	* you can use to access username, determine if authenticated, etc. 

<br>
__To setup passport... you'll need to__ &rarr;

1. {:.fragment} Specify authentication strategies (how we want someone to be able to login)
2. {:.fragment} Enable the middleware
3. {:.fragment} Enable sessions 
</section>

<section markdown="block">
## Passport Strategies

Passport uses __strategies__ to authenticate a request. There are multiple ways to authenticate a user (we mentioned them before). __What are some possible authentication strategies?__ &rarr;

* check for username and password in the database (called __local__ strategy)
* Facebook Connect
* Google
* authentication protocols, such as OAuth, OpenID
{:.fragment}

<br>
We'll be using __local authentication__... authentication with a  username and password stored in a _local_ database (MongoDB).
{:.fragment}

</section>

<section markdown="block">
## Passport Strategies Continued

__When we create a strategy, we define a callback function that:__ &rarr;

1. {:.fragment} finds and returns the user that possesses a set of credentials
2. {:.fragment} for our local strategy, that means we have to retrieve a user from our database using their username and (hashed) password
3. {:.fragment} soooo... we could write this function ourselves, or use a module that does this for us (we'll take the easier route: use passport-local-mongoose)

</section>
<section markdown="block">
## Middleware

We also have to activate two pieces of middleware:

* passport.initialize - to start up passport
* passport.session - to enable persistent login sessions

<pre><code data-trim contenteditable>
app.use(passport.initialize());
app.use(passport.session());
</code></pre>

</section>

<section markdown="block">
## Sessions


__Username and password (credentials) are usually only transmitted once during the initial login request.__ &rarr;

* once a user is authenticated... 
* a session is created and maintained...
* via data stored on the server that's associated with a cookie in the user's browser
* (each subsequent request will not have the username and password, but instead, the cookie that identifies the session)


</section>
<section markdown="block">
## Sessions Continued

To support login sessions, Passport will serialize and deserialize instances of the user object to and from the session store (for us the session store is in memory).

__By the way, what do we mean by serialization?__ &rarr;

Translate a data structure / object to a _storable_ format). We'll have to __define functions that do this and tell passport all about it or rely on (again) a module.__ &rarr;
{:.fragment}

<pre><code data-trim contenteditable>
passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## TL;DR Passport

__Passport__ is middleware that authenticates requests.  It'll give us:

* a __req.user__ object that contains the currently logged in user
* __use__() - to specify an _authentication_ strategy (how we want users to be able to login)
* __serializeUser__() and __deserializeUser__() - specifies how to store / retrieve a user from the session (and populate __req.user__)
* __authenticate__() - to authenticate a request using a specified _strategy_ (there are various ways to use this.... as middleware or as a plain function called within your route handler)
* __req.login__() - to start a logged in session (once a user has been authenticated)

</section>

<section markdown="block">
## Steps for Site Registration and Login

If someone registers for our site, __what are the steps that we should take for storing their login/password info?__ &rarr;

1. generate a salt
2. append or prepend that salt to the supplied password
3. hash the resulting string (some algorithms suggest multiple passes)
4. save both the salt and the hash
{:.fragment}

<br>
__And what about logging in... how can we tell if a person's password is correct. What steps should we take?__ &rarr;
{:.fragment}

1. look up the username
2. retrieve the password hash
3. salt and hash the incoming password
4. compare hashes
{:.fragment}

</section>

<section markdown="block">
## Passport Local Mongoose

Again, Passport allows the flexibility of writing our own _strategy_ for:

* registration
* storing a password
* login 
* checking username / password.

<br>

However... that's a lot of work, and it's _easy_ to get that stuff wrong (for something so important, it's maybe too easy to get wrong).


__Passport-Local Mongoose__ is a plugin for Mongoose that bundles up all of that functionality by bringing together passport and Mongoose.

</section>

<section markdown="block">
## What Does Passport Local Mongoose Do?

It provides a bunch of static methods for us - that we otherwise have to write on our own - for:

* __register__() - actually create a new user (with salting and hashing, of course)
* __authenticate__() - local strategy authentication (checking for username / passwoord)
* __serializeUser__() - for storing a user in the session
* __deserializeUser__() - for retrieving a user in the session (and populating req.user)

<br>
We have an idea what these might look like, right? __Let's check [the actual implementation](https://github.com/saintedlama/passport-local-mongoose/blob/master/index.js#L196)__
</section>

<section markdown="block">
# Phew! Ok... let's get into some interaction design stuff for a moment...

</section>
<section markdown="block">
## Login / Registration Considerations

* __what are some possible outcomes of login that we'll have to handle?__ &rarr;
	* {:.fragment} user does not exist
	* {:.fragment} password incorrect
	* {:.fragment} how specific should the error message be? &rarr;
	* {:.fragment} specificity helps usability, but may be a vector for snooping for valid usernames
* {:.fragment} __...and registration errors__ &rarr; 
	* {:.fragment} user already exists
	* {:.fragment} password or username doesn't meet requirements


</section>
<section markdown="block">
## Considerations Continued

Outside of registration and login, what else might we need to support if we have username/password authentication?

* {:.fragment} password reset? __how?__ &rarr;
	* {:.fragment} ... common practice is to send email with reset link
	* {:.fragment} ... obvs, not send new password!
* {:.fragment} forgot username?
</section>

<section markdown="block">
# Implementation (Uh-oh, live demo time)
</section>

<section markdown="block">
## Demo Overview

We'll support the following features:

* users that have usernames and passwords
* login
* register

</section>

<section markdown="block">
## User Schema 

As usual, we'll create a <code>db.js</code> that contains our schemas, registers our models and connects to the database.

The user schema can be totally blank. __Passport local mongoose will add properties to the schema, as well as some static methods!__ &rarr;

* username, password, salt
* authenticate, serialize, deserialize, etc.

<pre><code data-trim contenteditable>
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({ });

UserSchema.plugin(passportLocalMongoose);

mongoose.model('User', UserSchema);
mongoose.connect('mongodb://localhost/class16db');
</code></pre>
</section>


<section markdown="block">
## Some Passport Setup

In a file called <code>auth.js</code> in the root of your project, let passport know what strategy you want to use as well as how to serialize and deserialize a user:

<pre><code data-trim contenteditable>
const mongoose = require('mongoose'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	User = mongoose.model('User');
</code></pre>

<pre><code data-trim contenteditable>
// hey... one of those static functions that passport-local
// mongoose gives our model...
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
</code></pre>
</section>

<section markdown="block">
## Prepping app.js

At the top of app.js, bring in the two files that we created, <code>db.js</code> and <code>auth.js</code>:

<pre><code data-trim contenteditable>
require('./db');
require('./auth');

const passport = require('passport');

</code></pre>
</section>

<section markdown="block">
## Add Session Support

We've done this before (put this after you've created your app object):

<pre><code data-trim contenteditable>
const session = require('express-session');
const sessionOptions = {
	secret: 'secret cookie thang (store this elsewhere!)',
	resave: true,
	saveUninitialized: true
};
app.use(session(sessionOptions));
</code></pre>


</section>


<section markdown="block">
## Enable the Passport Middleware 

Start up passport and allow login sessions using the following middleware (do this before defining/using your routes!):

<pre><code data-trim contenteditable>
app.use(passport.initialize());
app.use(passport.session());

</code></pre>

</section>

<section markdown="block">
## Make User Data Available to All Templates

Add some middleware that drops req.user into the context of every template. This is done by adding properties to res.locals.

<pre><code data-trim contenteditable>
app.use(function(req, res, next){
	res.locals.user = req.user;
	next();
});
</code></pre>
</section>

<section markdown="block">
# Wowz. Lots of Setup, and we Don't Even Have Routes!

</section>

<section markdown="block">
## Requires for our Routes

In a file in the routes directory, let's setup our usual set of requires for creating routers. Additionally, add dependencies for passport and mongoose so that we can actually login and register. (Don't forget to export your router too)

<pre><code data-trim contenteditable>
const express = require('express'), 
    router = express.Router(),
    passport = require('passport'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');
</code></pre>

<pre><code data-trim contenteditable>
// route handlers go above
module.exports = router;
</code></pre>


</section>

<section markdown="block">
## The Easy Ones (Home, Login and Reg Forms)

These route handlers will handle requests to home, the login form and the registration form:

<pre><code data-trim contenteditable>
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/login', function(req, res) {
  res.render('login');
});

router.get('/register', function(req, res) {
  res.render('register');
});
</code></pre>

</section>

<section markdown="block">
## Templates for Login and Register

The templates for both of these will pretty much be the same. The auth strategy we use expect _username_ and _password_, so we'll name our input fields that.

We'll also reserve a spot for error messages.


<pre><code data-trim contenteditable>
<h2>...</h2>
{{message}}
<form method="POST" action="">
		username: <input name="username" type="text">	
		password: <input name="password" type="password">	
		<input type="submit" value="...">	
</form>
</code></pre>

Lastly, it might be nice to drop in username in our <code>layouts.hbs</code> (Remember, we put user into the context using some not-so-fancy middleware).

<pre><code data-trim contenteditable>
{{ "{{#if user" }}}}
Logged in as {{ "{{user.username" }}}}
{{ "{{/if" }}}}
</code></pre>
</section>

<section markdown="block">
## Registration Post

Our registration post handler will create a new user or render an error if something goes wrong. If a new user is created, go ahead and log them in!

<pre><code data-trim contenteditable>
router.post('/register', function(req, res) {
  User.register(new User({username:req.body.username}), 
      req.body.password, function(err, user){
    if (err) {
      res.render('register',{message:'Your registration information is not valid'});
    } else {
      passport.authenticate('local')(req, res, function() {
        res.redirect('/');
      });
    }
  });   
});
</code></pre>
</section>

<section markdown="block">
## Login Post

Ugh... so login is a bit weird. Here, we authenticate, and on successful authentication, use req.logIn to start the logged in session.

Otherwise, render an error message...

<pre><code data-trim contenteditable>
router.post('/login', function(req,res,next) {
  passport.authenticate('local', function(err,user) {
    if(user) {
      req.logIn(user, function(err) {
        res.redirect('/');
      });
    } else {
      res.render('login', {message:'Your login or password is incorrect.'});
    }
  })(req, res, next);
});
</code></pre>

</section>

<section markdown="block">
## Canned Demos

There are a couple of demos that I've created in the [examples repository](https://github.com/nyu-csci-ua-0480-001-fall-2016/examples/tree/master/class16)  (__you need to be logged in to github to see these__): 

* A _bare minimum_ demo using passport-local-mongoose
* Another version that has more user specific features

<br>
The 2nd version allows a user to store image urls. 

* outside of login and register, there's a single page: <code>/users/some-username</code>
* ... that shows all of the images urls that someone has saved
* if the person is logged in, the same page will show a form to add another image
</section>

<section markdown="block">
## Check Out

* defining (or supplying) the strategy
* the actual passport-local-mongoose code
* the schema that utilizes the passport-local-mongoose plugin
* the middleware
* the routes; watch out for... 
	* using req.body
	* calls to authenticate
	* populating related schemas!
</section>

<section markdown="block">
## Other Tutorials / Demos

* From mherman.org: [a straightforward guide to authentication](http://mherman.org/blog/2015/01/31/local-authentication-with-passport-and-express-4/#.VjGSOq6rSRs)
* [The passport docs](http://passportjs.org/docs)
* From scotch.io: [a comprehensive authentication with passport tutorial (without passport-local-mongoose)](http://scotch.io/tutorials/javascript/easy-node-authentication-setup-and-local)
* From passport-local-mongoose: [a somewhat dated version](https://github.com/saintedlama/passport-local-mongoose/tree/master/examples/login)

</section>


