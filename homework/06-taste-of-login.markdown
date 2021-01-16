---
layout: homework
title: CSCI-UA.0480 - Homework #6
---
<style>
.warning {
    background-color: #eecccc;
}
</style>

<div class="panel panel-default">
	<div class="panel-heading">Homework #6</div>
	<div class="panel-body" markdown="block">

# A Taste of Login - __Due Saturday, April 8th, by 11PM__

## Overview

### Description

#### Implement parts of user authentication, _mostly_ from scratch!

Create a site that allows user registration and login. User data will be stored in MongoDB, with passwords salted and hashed. A successful registration or login will result in an authentication session. Some pages on the site will require an authenticated session to view content.

### Goals / Concepts and Technologies Used

To implement the features above, we'll use the following techniques:

* using the bcrypt module to salt and hash a password
* using express-session to store user data  / an authenticated session
* applying the concepts from [the slides on authentication](../slides/16/auth.html) to create login and registration

### Disclaimers

<span class="warning">Note, however, that our authentication implementation will not be complete / suitable for _real world_ use because:</span>

* our application will not be served over an encrypted connection and cookies aren't set to secure
* using nested callbacks instead of promises makes error handling complex
* not all errors accounted for
* user interaction and error messaging will be minimal (for example, successful login should redirect to page that required login) 
* some error messages reveal will info about the existence of a user
* our session secret will be in version control


### Features

#### In this application, users will be able to:

* register a new account
* login using an existing account
* view a home page that has content that changes depending on logged in state
* view a restricted page that can only be seen if logged in


Aaaand, if you do the extra credit...

* implement logout

#### You'll have 4 pages and 2 forms:

* __/__ - home page
* __/register__ - register form
* __/login__  - login form
* __/restricted__ - a page that can only be seen if logged in


#### Example Interaction

Here's an example of registration, login and viewing a restricted page.

* registration
    <br> ![register](../resources/img/hw06-auth-02-register.gif)
* login
    <br> ![login](../resources/img/hw06-auth-03-login.gif)
* restricted page
    <br> ![viewing a restricted page](../resources/img/hw06-auth-04-restricted.gif)


### Submission Process

You will be given access to a private repository on GitHub. Generate an Express application using express-generator (see instructions below) when you clone it.

The final version of your assignment should be in GitHub

* __Push__ your changes to the homework repository on GitHub.
* Add the URL of the repository to your assignment submission in NYU Classes.

### Make at Least 3 Commits

* Commit multiple times throughout your development process.
* Make at least 3 separate commits - (for example, one option may be to make one commit per part in the homework).


## Part 1 - Setup

### Starting Project

Start your project by creating the following files. This can be done directly in the root folder of your repository:

* `.gitignore` - ignore `node_modules`
* `.eslintrc.js` - you can use a previous configuration for this
* `package.json` - `npm init`
* `app.js` - this is your main express file

### Install (using `npm`) and Configure the Following Modules

(Use previous homework instructions / completed homeworks for examples)

* `express`
* `hbs` - for templating
* `body-parser` - for parsing POST request bodies (from form submission)
* `express-session` - for session management
    * generate a random secret for this 
    * (for example, you can start node as in interactive shell and run `require('crypto').randomBytes(64).toString('hex')`)
    * ideally the secret would not be stored in version control (perhaps using something like `process.env` to retrieve the secret from the environment)...
    * but to easy the grading process, you can check in the secret for this homework
* `mongoose` - for database access

<span class="warning">Make sure to use dynamically generated paths for your views and static files by using `__dirname`</span>

```
// express static setup
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// hbs setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
```
<span class="warning">Configure your app to listen on port 3000</span>


### Install bcrypt

`npm install bcrypt`

We'll use this module in our code for login and registration.  `bcrypt` is a node module for password hashing. The result of using bcrypt contains both the hash and the salt! Check out the details in the first section of the [wikipedia article](https://en.wikipedia.org/wiki/Bcrypt) and the diagram below illustrating the output of bcrypt: 

```
$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy
|_____||____________________||_____________________________|
   |             |                          |
   |             |                          +-- hash
   |             |
   |             +-- salt
   |
   +-- algorithm and cost factor

```

There are some errors that you may encounter while installing `bcrypt`. Here's how to troubleshoot:

1. If npm says `ERR! Tried to download(404)` - this means that it couldn't locate the binary for the module... but it'll fall back to trying to download the source and compiling, so it may still work!
2. If the installation ends with the following, then `bcrypt` has successfully been installed despite the message from part #1
    <pre><code data-trim contenteditable>netid-homework06@1.0.0 /Users/username/Desktop/AIT/homeworks/netid-homework06
└── bcrypt@1.0.2 
</code></pre>
3. If you see `Error: Python executable ... is xxxx which is not supported by gyp`, that means that you may need to explicitly pass a version of python to `npm` to compile the source
4. In this case, when running `npm install`  add the `--python=/path/to/python` flag with the path to a version of Python that's greater than 2.5.x, but not 3.x.x. The path to the right version of python may be `/usr/bin/python` or `/System/Library/Frameworks/Python.framework/Versions/2.7/bin/python2.7` (change the version numbers) if you're on OSX. If you're on windows, you could try installing python 2.x and python 3.x side-by-side... or for a quicker solution...
5. Try using [an alternate module, such bcryptjs](https://www.npmjs.com/package/bcryptjs) which has a very similar api. Check out the docs to see what methods you'd use to salt and hash... as well as compare hashes.

### Database Setup

* create a `db.js` file in the root of your project
* using mongoose, write a `User` schema with username and password 
    * both should be type, `String`
    * username should be a unique field, so set as `{type: String, unique: true}`
    * typically hash and salt should be stored in separate fields
    * however, when using bcrypt, hash will contain both salt and salted and hashed password, so no separate field needed for salt
* don't forget to register your model
    * `mongoose.model('User', User);`
* name your database `hw06`:
    * `mongoose.connect('mongodb://localhost/hw06');`

## Part - 2 Registration

### Description

Registration should allow a user to create a new account and immediately start a new authenticated session. To do this, follow these steps:

1. show a registration form
2. after submitting the form, salt and hash the password using bcrypt
3. save the username and salt/hash combination 
4. regenerate the session (create a new session id)
5. add some information, such as the username, to the session
6. redirect to home, `/`, if registration is successful


Create two routes for registration

1. `GET /register` - to display the form
2. `POST /register`- to process the form input

### GET /register Overview and Implementation

* create the route for `GET /register` in `app.js`
* it should render a template, `register.hbs` that contains a form
* `register.hbs` should contain a form
    * the form will `POST` to `/register`
    * (that is, when you press the submit button, a POST request will be made to `/register`)

### POST /register Overview

<span class="warning">Warning: the following code you'll write will have several nested callbacks!</span>

* we haven't covered promises yet, but if you want to remove nesting, using promises is one solution (though you'll have to research this on your own): both `mongoose` and `bcrypt` provide promises (instead of callbacks) as part of their api
* another way of dealing with this is wrapping some functionality in a function, but if you do this, you'll need to write a function that takes a callback!

For registration, we'll handle a couple of error states:

1. password length too short 
2. user already exists

### POST /register Validation

To implement the POST logic for `/register`:

* <span class="warning">unless specified otherwise, any errors (`err`) that occur when using callbacks can just be logged out to the console, with a generic error message sent to the client:`</span> 
    * `console.log(err);`
    * `res.send('an error has occurred, please check the server output')`
* create the route for `POST /register` in `app.js`
* it should check the length of the password entered by the user
* if the password is under 8 characters, send a message back saying that the password length is too short, and have a link that goes back home, `/`, or ideally allow the user to re-register immediately
    * there's no need to redirect
    * if you want, you can re-render the registration template with an error message (again, this is ideal)
    * or render a generic error template
    * or even more simply just use `res.send` to send back a string of markup
    * the error message can be as simple as this:
        <br> ![password length](../resources/img/hw06-auth-05-length.png)
* it should check if user already exists 
    * remember to pull out your `User` model by using `const User = mongoose.model('User');`
    * use `User.findOne((err, result, count) => {   })` to check if the user already exists
        * you can check the object with `if(result)` to determine if a `User` object was returned
    * or use `User.find((err, result, count) => {   })`... the 
        * you can check if the length of the resulting `Array` is greater than 0
    * the error message should be similar to the password length error message, with a link back to home (`/`) or a way to "re-register" 
    * there's no need to redirect
    * again, you can re-render the registration template to show the form again... but add an error message
    * or you can use a generic error template or simply use `res.send` to send back a string of markup
    * here's an example of a simple error page for trying to register an existing user:
        <br> ![username exists](../resources/img/hw06-auth-06-exists.png)
* <span class="warning">if the user doesn't already exist and the password is at least 8 characters long... you can proceed with salting and hashing the password, saving the new user and automatically starting an authenticated / logged in session</span>

### POST /register Salting and Hashing Password

* the following can all be done in your registration route handler, but a nicer solution would be to move some of this out to a module (though the functions that you create will require callbacks)
* first, salt and hash the password using the `bcrypt` module
    * [check out the documentation on the bcrypt module](https://github.com/kelektiv/node.bcrypt.js/blob/master/README.md)
    * require `bcrypt`: const bcrypt = require('bcrypt');
    * use the async versions of these functions (we don't want this to block)
    * there are two techniques that you can use:
    * manually generating the salt and then hashing:
        <pre><code data-trim contenteditable>bcrypt.genSalt(saltRounds, function(err, salt) {
          bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
            // Store hash in your password DB.
          });
});
</code></pre>
    * auto generate a hash and a salt:
        <pre><code data-trim contenteditable>// you can use a default value of 10 for salt rounds 
bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
          // Store hash in your password DB.
});
</code></pre>

### POST /register Saving User

* remember that the output of `bcrypt` contains both the hash and the salt... so now we can simply create and save the new user in our database
    * create a new `User` object
    * set the `username` and `password` with the password as the single string (the hash and salt combined) created from `bcrypt`
    * don't forget to call `save` on the resulting object!
* again any errors from salting and hashing or saving should just be logged out to the console on the server side and a generic error message sent to the frontend

### POST /register Starting an Authenticated Session

* once you've successfully saved the user, start an authenticated session:
    * regenerate a session id
    * add the username to the session
    * this way, to check if someone is logged in, we simply check if username exists in session (`if(req.session.username)`)
        <pre><code data-trim contenteditable>
// assuming that user is the user object just saved to the database
req.session.regenerate((err) => {
    if (!err) {
        req.session.username = user.username; 
    } else {
        console.log('error'); 
        res.send('an error occurred, please see the server logs for more information');
    }
});
</code></pre>

### POST /register Redirect to Homepage

* finally, create a home page and redirect to that page once registration has succeeded (all validation passed, a new user is saved, and a new authenticated session is started)...
    * add `res.redirect('/');` to your successful registration (that is... within the callbacks to generating the hash, saving and starting a new session)
    * create a route handler for `/`
    * for the homepage, show a message that says whether or not a user is logged in
    * you can do this by passing `req.session.username` to the template when calling `render`
* checking your work
    * use the commandline client, `mongo`, to connect to your running mongo db instance
    * `use hw06`
    * `db.users.find()`
    * check that you have user documents with username and password filled in
* here's an example of how a successful registration should look:
    <br> ![register](../resources/img/hw06-auth-02-register.gif)

## Part 3 - Login

### Description

Login should allow a user to authenticate using a username and password. To do this, follow these steps:

1. show a login form
2. search the database for the username specified in the login form
3. after finding the user, salt and hash the incoming password and compare with the password in the database by using `bcrypt.compare`
4. if the passwords match then start a new authenticated session
5. redirect to the home page

Create two routes for login

1. `GET /login` - to display the form
2. `POST /login`- to process the form input

### GET /login Implementation

* create the route for `GET /login` in `app.js`
* it should render a template, `login.hbs` that contains a form
* `login.hbs` should contain a form with the following specifications
    * the form will `POST` to `/login`
    * (that is, when you press the submit button, a POST request will be made to `/login`)

### POST /login Implementation

Now it's time to handle the data POSTed by the form above...

* create the route for `POST /login` in `app.js`
* your route handler should find the user with username entered in the form using `findOne`
    <pre><code data-trim contenteditable>
User.findOne({username: req.body.username}, (err, user, count) => {
        if (!err && user) {
            // compare with form password!
    }
});
</code></pre>
* if the user doesn't exist, show a message on the login form or show a generic error page saying that the user doesn't exist (in terms of security, this reveals too much information, but for debugging and for ease of use, this is what we'll use)
* if the user exists... then check if the password entered matches the password in the database
    * the password in the database is salted and hashed... and contains the salt
    * so a simple compare with `===` is not adequate
    * we must salt and hash the password and compare with the hash stored in the database
    * we can use the function, `bcrypt.compare` to do this:
        <pre><code data-trim contenteditable>bcrypt.compare(req.body.password, user.password, (err, passwordMatch) => {
    // regenerate session if passwordMatch is true
});
</code></pre>
    * note that `passwordMatch` within the callback will be either true or false, signifying whether or not the salted and hashed version of the incoming password matches the one stored in the database
* once the match is verified, a new authenticated session can be started - you can use the same code that you used in registration
    <pre><code data-trim contenteditable> // assuming that user is the user retrieved from the database
req.session.regenerate((err) => {
    if (!err) {
        req.session.username = user.username; 
    } else {
        console.log('error'); 
        res.send('an error occurred, please see the server logs for more information');
    }
});
</code></pre>
* finally, once the session has been started, you can redirect to the homepage, `/`
* here's an example of how a successful login should look:
    <br> ![login](../resources/img/hw06-auth-03-login.gif)


## Part 4 - Restricted Page

Finally, create a page at the path, `/restricted`. This path should:

* redirect to `login` if the user is not logged in
* display the message: `your are logged in so you can see secret stuff`

Here's what the restricted page interaction should look like:

<br> ![viewing a restricted page](../resources/img/hw06-auth-04-restricted.gif)

## Extra Credit (15 points)

### Logout

1. create a route for logging out
2. it should respond to `GET /logout`
3. invalidate the authenticated session by calling [destroy](https://github.com/expressjs/session#sessiondestroycallback)
4. if `destroy` is successful, redirect to home (`/`)


</div>

</div>

