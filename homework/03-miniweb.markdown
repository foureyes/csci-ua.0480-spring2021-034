---
layout: homework
title: CSCI-UA.0480 - Homework #3
---
<style>
hr {
    color: #ccc;
    border-color: #ccc;
}
</style>

<div class="panel panel-default">
	<div class="panel-heading">Homework #3</div>
	<div class="panel-body" markdown="block">

# Creating a Tiny Web Framework, __Due Thursday, October 5th by 11PM__

## Overview

### Description

You'll be writing a small web framework that allows a developer to write simple web applications. These web applications will be built off of and run from node's built-in TCP server (from the `net` module).

__You can only use the following two modules for this assignment__ &rarr;

1. `net` - a module for creating TCP servers and clients
2. `fs` - a module for file system related tasks, such as reading and writing files

__You can't use the `http` module... or install additional frameworks, such as `express`__

### Submission Process

You will be given access to a private repository on GitHub. It will contain: 

1. stub source files in the `src` directory
2. default assets (images, css, etc.) in the `public` folder
3. unit tests in `test`
4. various configuration files, such as `package.json`, `.eslintrc`, etc.

* __Push__ your changes to the homework repository on GitHub.
* Commits later than the deadline will not be included in grading

### (4 points) Make at Least 4 Commits

* Commit multiple times throughout your development process.
* Make at least 3 separate commits - (for example, one option may be to make one commit per part in the homework).

## `miniWeb` - Framework Overview 


### About the Framework

Your framework, called `miniWeb`, will be built off of node's `net` module. It'll use the `net` module to create a TCP server that will allow connections from clients. The code that you'll write will handle an incoming http request from a client by parsing the http request, determining what do based on the request, and finally sending back an http response. You'll do this by minimally creating these objects (you can create more objects, but these 3 must be present):

1. `Request` - an object that represents an http request
2. `Response` - an object that represents an http response... and has the ability to actually send back a response to the client
3. `App` - represents your web application; takes incoming requests and determines what to do based on path, method, etc. ... 

You can use the objects that you create to write simple web applications. Here are some example of how you might use your mini web framework. Again, __you are making the library / objects / module__ that makes the following possible:

* Create a new web application
    <pre><code data-trim contenteditable>const App = require('./miniWeb.js').App;
const app = new App();
</code></pre>
* Serve the contents of the file in `$PROJECT_ROOT/html/index.html` when a request for `/` is received
    * here's the code that you would use:
        <pre><code data-trim contenteditable>app.get('/', function(req, res) {
    res.sendFile('/html/index.html');
});
</code></pre>
* Serve the string `"just some text"` as plain text (`text/plain`)by manually setting a `Content-Type` header, status code, and response body ...when a request for the path, `/just/text`, is received
    <pre><code data-trim contenteditable>app.get('/just/text', function(req, res) {
    // set header
    res.setHeader('Content-Type', 'text/plain');

    // return a 200 with body, "just some text"
    res.send(200, 'just some text!');
});
</code></pre>
* Send back a temporary redirect when a client requests the path, `/gone`
    <pre><code data-trim contenteditable>app.get('/gone', function(req, res) {

    // set the status code and location of a redirect
    res.redirect(301, '/just/text');
});
</code></pre>
* Bind your application / web server to port 8080 on localhost
    <pre><code data-trim contenteditable>app.listen(8080, '127.0.0.1');
</code></pre>

### Building the Framework

This homework is split into __3 parts__. Coding starts with __part 1__.

Each part builds off of the previous, with the last parts culminating in finishing up your web framework and building a small fan site 💖 with your web framework! (YES!). __Please do the following in order!__ &rarr;

1. __Part 1 - Warm Up__ - get familiar with the `net` module!
    * work with nodes' net module to create a simple server 
    * use callbacks to handle new connections and arriving data
    * handle http requests from the browser
    * create a small "hello world" site
2. __Part 2 - Even Warmer__ - build on the previous part, but adding functionality through `Request` and `Response` objects
    * create a `Request` object to encapsulate http requests
    * create a `Response` object to encapsulate http responses; this object will be able to:
        * send http responses back using a socket object
        * read files from the file system to send back
    * create a small site that serves html _and_ images (SUCH WOW! 😮) 
3. __Part 3 - Converting to App Object__
    * create an app object that encapsulates your server...
    * add application level functionality, such as routing
4. __Part 4 - Using your Module!__
    * create a fan site using the module and "Classes" that you just made! 🎉

## Part 1 - Warm Up

In this part, you'll get familiarize yourself with the `net` module by creating a simple server that responds to http requests. You'll make use of events and callback functions to handle a new connection, data arriving on a socket and closing a connection. 

Start by opening `src/warmUp.js`. Create a simple server that responds to any request with a valid http response that says `hello world` (as html, with surrounding markup)... the response will have:

1. a status code of `200` 
2. a `Content-Type` header of `text/html`
3. a body that contains the following markup:
    <pre><code data-trim contenteditable> &lt;em&gt;Hello&lt;/em&gt; &lt;strong&gt;World&lt;/strong&gt; </code></pre>

Use the following process to do this:

1. Check out the [slides on the `net` module for some prep](../slides/06/sockets.html#/2), paying close attention to the [the last slide](../slides/06/sockets.html#/10).
2. Build off of the last example by modifying the echo server code to...
3. Write back a valid http response (you can write a string directly instead of using a `Buffer`):
    * [see the slides on http](../slides/05/web.html#/16)
    * [and an example response](../slides/05/web.html#/24)
4. Close the connection after a `write` with `sock.end`.
5. Run `warmup.js` (note that your terminal will look like its "frozen", but it's really just waiting for requests).
6. Use `curl -i localhost:8080` to test your server.
7. Then point your browser at `http://localhost:8080`.
8. Make sure that the html renders (it should have italicized and bold text).
9. To shutdown your server, CTRL + c in your terminal...
10. Here's an example of what it might look like: <br> ![pic alt](/csci-ua.0480-fall2017-007/resources/img/hw03-01-warmUp.gif)

Troubleshooting

1. If your browser doesn't show anything, make sure you're calling `sock.end`.
2. If html is showing up as text (that is, you see the tags / mark-up in the page itself), double check that you've set the content type correctly.

## Part 2 - Even Warmer - a Request and Response Object

In this part, you'll build off of your experience from part 1 by creating a `Request` and `Response` object. You'll use these objects and some simple routing to create a page that has an image and an external css file.

### Start by creating a `Request` object

In this section, you'll fully implement a `Request` object. You'll then conditionally serve up different content based on the `path` specified by the request.  The `Request` object __represents an http request__. It can take an http request as a string, parse out information about that request and expose that information as properties (such as `method`, `path`, and `headers`). It assumes HTTP/1.1

In `evenWarmer.js`, copy over your code to create a simple server, and make modifications to it so that it parses the request into a request object.

Create the `Request` _class_  by implementing the following:

<hr>

#### Constructor

`Request(httpRequest)` - creates a new request object based on the string passed in.

<pre><code data-trim contenteditable>let s = ''
s += 'GET /foo.html HTTP/1.1\r\n';   // request line
s += 'Host: localhost:8080\r\n';     // headers
s += '\r\n\r\n';                     // empty line to mark the boundary between the header and body

const req = new Request(s);
</code></pre>

The string passed in will be parsed into the properties shown below. __You can assume that you will always receive a valid http request__

<hr>

#### Properties

1. `path` - the path requested (for example, `/foo/bar/baz.html`)
2. `method` - the http verb (for example, `GET` or `POST`)
3. `headers` - an object that has header names as property names and header values as property values (for example, `{"Host": "localhost:8080", "User-Agent": "Mozilla/5.0 ..."}`)
4. `body` - the body of the request (for example, `username=foo`)

Note that our `Request` object will assume HTTP/1.1, so it's not required to keep version as a property (though you can if you want!).

<hr>

#### Methods

1. `toString` - returns a string representation of the request object as a valid http request (essentially taking its properties and creating a request - or another way of looking at it is recreating the original string passed in to the constructor)

You can add additional properties and methods as needed.

<hr>

#### Example Usage

<pre><code data-trim contenteditable>let s = ''
s += 'GET /foo.html HTTP/1.1\r\n';   // request line
s += 'Host: localhost:8080\r\n'; // headers
s += '\r\n\r\n';                     /

const req = new Request(s);

console.log(req.path);
// --> /foo.html

console.log(req.method);
// --> GET

console.log(req.headers);
// --> {'Host': 'localhost:8080' }

console.log(req.body);
// --> ''
// the body is empty in this case ^^^

console.log(req.toString()); // or req + ''
// -->
// GET /foo.html HTTP/1.1\r\n
// Host: localhost:8080
// 
// (notice the empty line above to denote header / body boundary)
</code></pre>

<hr>

### Using the `Request` Object

Once your finished with your implementation above, you can export, test and try using your new `Request` object.

1. Export the object using `module.exports`, and try running the tests in test/request-response-test.js
    * make sure that `mocha` is installed as in previous assignments 
    * install dev dependencies to run tests: npm install --save-dev chai sinon mocha-sinon (you can ignore any unmet peer dependency warnings)
    * `mocha test/request-response-test.js`
2. In your previous code, `sock.on('data', someCallback)` calls `someCallback` when the socket receives data... and that callback takes a single argument, the binary data that the client sent. Pass that data to your `Request` constructor to create a `Request` object
3. Once you have the http request encapsulated by a `Request` object... use a simple conditional to:
    1. Check if the `Request` object's path is `/` ... if so, display your hello world page.
    2. Check if the `Request` object's path is `/foo.css` ... if so, send back a document with content type `text/css` containing `h2 {color: red;}`.
    3. If it's neither `/` or `/foo.css`, then send back a `404`, content type 'text/plain', and a body of `uh oh... 404 page not found!`.
4. Make sure to close the connection once you've written your http response by using `sock.end()`
5. Run your server and check all 3 of these paths using both [curl](../slides/05/web.html#/25) and your browser.
    * You should see a `200` for `/` and `/foo.css`, along with the appropriate `Content-Type` header, and the body.
    * You should see a `404` for everything else.
6. Finally, to see how everything works together, modify the html that `/` sends back:
    * Above hello world, include your style sheet using a `link` tag in your response for `/`...
    * Also above hello world, but below your link tag, add an `h2` tag that contains the text, 'this is a red header!'
    * When you point your browser at `localhost:8080', you should now see a red header above your hello world text.
7. It should look something like <br> ![pic alt](/csci-ua.0480-fall2017-007/resources/img/hw03-02-evenWarmer-01-request.gif)

### And now, for our `Response` object

Instead of issuing `write` calls to the `socket` object, you'll wrap the `socket` up in a `Response` object and use that to send data to the client. Notice that all of the `methods` called on socket are being being called by equivalent methods on your `Response` object.

The `Response` object represents an http response, and it allows direct manipulation of the underlying socket that represents the current connection for the http request/response. It can hold data about an http response, turn that data into a valid http response... and send that data back to the client (as well as close the connection between the server and the client).

Create a `Response` _class_ based on the [specifications below](#response).  

* Note that it may be useful to keep an object that maps status codes to short descriptions ({"200": "OK", "404": "Not Found"})
* You can run unit tests as you work, as usual, by adding the object to `module.exports`, and running the tests in test/request-response-test.js
    * again ... `mocha test/request-response-test.js`
    * __not all methods are tested__ by the unit tests ⚠️️⚠️️⚠️️

<a name="response"></a>

<hr>

#### Constructor

`Response(socket)` - creates a new response object using the socket passed in as an argument to send data to the client.

<pre><code data-trim contenteditable> // when a socket, named sock, receives data...
// where sock is an object that represents connection a client
const res = new Response(sock);
</code></pre>

The constructor will set the socket instance passed in as a property on the resulting `Response` object. The socket will then be used to send data back to the client.

<hr>

#### Properties

1. `sock` - the socket associated with the http response
2. `headers` - an object that has response header names as property names and response header values as property values (for example, `{"Content-Type": "text/html", "Cache-Control": "max-age=3600"}`)
3. `body` - the body of the response (such as an html document or an image)
4. `statusCode` - the status code of the http response as a `Number` (for example: `200`)

<hr>

#### Methods

Most of the methods in the `Response` either act as a proxy for `socket` methods (that is, you can call `end` on `Response`, which internally just calls `end` on its `sock` property) or are convenience methods for combining other `Response` object methods. Consequently, it would be useful to check out the [slides on networking and sockets](../slides/06/sockets.html) before starting. Alternatively, you can also look over the [official node documentation on the `net` module](https://nodejs.org/api/net.html).

1. `setHeader(name, value)` - adds a new header name and header value pair to this `Response` object's internal `headers` property
    * `name` - the name of the response header
    * `value` - the value of the response header
    * no return value
    * example usage:
        <pre><code data-trim contenteditable>res.setHeader('Content-Type', 'text/html'); </code></pre>
2. `write(data)` - sends data to the client by calling the `write` method on this `Response` object's internal socket object (essentially a pass-through / proxy method to call the same method on `this.sock`)
    * `data` - a `String` or `Buffer` (binary data) to be sent to the client
    * no return value
    * note that _all it does_ is write `data` to the socket, nothing else (it doesn't close the connection or add additional data to `data` )
    * example usage:
        <pre><code data-trim contenteditable>res.write("&lt;h2&gt;A bit o' HTML&lt;/h2&gt;"); </code></pre>
3. `end(s)` - sends data and ends the connection by callings the `end` method on this `Response` object's internal socket object (essentially a pass-through / proxy method to call the same method on `this.sock`)
    * note that you will not be able to send any more data on a closed socket (this also implies that you cannot call end more than once for a single request/response cycle)
    * also note that you should not call `sock.write` at all in this method; again, just make the same call to `sock.end` (which can take an argument if you want it to write data to the socket _and_ end the connection)
    * `s` - a `String` or `Buffer` (binary data) to be sent to the client
    * no return value
    * example usage:
        <pre><code data-trim contenteditable>res.write("some stuff"); 
res.end('some more stuff'); // closes connection!
</code></pre>
4. `send(statusCode, body)` - sets the statusCode and the body of this `Request` object, sends the valid http response to the client, and closes the connection. Essentially, it sets response properties, converts the `Response` to a string uses the `Response` object's `end` method to send the response and close the connection... all in one method call.
    * `statusCode` - the status code of the http response 
    * `body` - the body of the http response
    * no return value
    * example usage:
        <pre><code data-trim contenteditable>res.setHeader('Content-Type', 'text/html');
res.send(200, 'Hi there!');
// sends back the following http response (newlines are \r\n):
// HTTP/1.1 200 OK
// Content-Type: text/html
//
// Hi there!
// (then closes the connection)
</code></pre>
5. `writeHead(statusCode)` - sets the statusCode, and writes everything but the body, and leaves the connection open; this is simply a combination of setting the `statusCode` property and calling `this.write`
    *  another way to think about it is that: it writes out all of the headers (including the status line), and after you call writeHead, you can continue writing more data, such as the body of the response with something like `write`
    * `statusCode` - the status code of the http response 
    * no return value
    * example usage:
        <pre><code data-trim contenteditable>res.setHeader('Content-Type', 'text/html');
res.writeHead(200);
// connection isn't closed yet! we can still write more
res.write('More stuff');
res.end('');
// sends back the following http response (newlines are \r\n):
// HTTP/1.1 200 OK
// Content-Type: text/html
//
// More stuff
</code></pre>
6. `redirect(statusCode, url)` - redirects to the supplied `url` using the supplied `statusCode`... if `statusCode` is no given, then default to permanent redirect, `301` (for the redirect to work, the appropriate header must be set to the url provided!). Lastly, immediately sends response and closes connection.
    * `statusCode` - (optional) the status code of the http response redirect
    * `url` - the url to redirect to
    * no return value
    * example usage:
        <pre><code data-trim contenteditable>res.redirect(302, 'http://another.site/here');
// response is immediately sent and connection is closed
// (essentially ... set statusCode and header, then this.write and this.end or just this.end)
</code></pre>
    * troubleshooting: 
        * some browsers, such as Chrome, will cache redirects ... so you'll have to...
        * check with curl first to see that you're getting the right status code and headers
        * check with your browser next, making sure to clear your browser cache before trying again (and perhaps use "incognito" mode)
7. `toString()` - returns a string representation of this response object that can serve as a valid http response
    * no arguments
    * returns a string, a valid http response
    * when adding a short description for status codes, use these descriptions:
        * `200` - `OK`
        * `404` - `Not Found`
        * `500` - `Internal Server Error`
        * `400` - `Bad Request`
        * `301` - `Moved Permanently`
        * `302` - `Found`
        * `303` - `See Other`
    * example usage:
        <pre><code data-trim contenteditable>res.setHeader('Content-Type': 'text/plain');
res.statusCode = 404;
res.body = "Uh oh! No page here!"
console.log(res.toString());
// HTTP/1.1 404 Not Found
// Content-Type: 'text/plain'
//
// Uh oh! No page here!
</code></pre>
8. `sendFile` is a bit lengthy, so we'll save this for later! ⚠️️

<hr>

### Using the `Response` Object

__Now let's test your new `Response` object in your original application!__

1. To see your `Response` object at work, remove your calls to `sock.write` / `sock.end` and use a new `Response` object instead.
2. Again, within the callback that you pass to `sock.on('data', someCallback)` and after you create a `Request` object, create a `Response` object....
    * Pass in the `sock` object that's in scope (that is the socket object that `on` was called on)
    * For example:
        <pre><code data-trim contenteditable> sock.on('data', function(binaryData) {
  const res = new Response(sock);
  // ...
}
3. Replace every call to `sock.write` / `sock.end` with:
    * A call to your `Response` object's `setHeader` method to set the content type: `res.setHeader(...)`
    * A call to your `Response` object's `send` method to send the response back with the appropriate body: `res.send(200, ...);`
    * A call to your `Response` object's `end` method to close the connection
4. Everything should still work as it did previously, so try using curl and your browser to request `/`, `/foo.css`, and any other page to trigger a 404

<br>

### Wait, One More Method: Sending back files

There's one last method that we'll implement on `Response`:

`sendFile(fileName)` - sends file specified by fileName (which will be searched for in `$PROJECT_ROOT/public`) to client by specifying appropriate content type, writing the data from the file... and immediately closing the connection after the data is sent

* `fileName` - the name of the file to be sent
* no return value
* implementation details
    * use the `fs` module and the [`readFile` function](https://nodejs.org/api/fs.html#fs_fs_readfile_file_options_callback) to do this instead of using `readline` like we did previously (this is because we may be handling binary data)
    * `fileName` is searched for in `./public`
    * consequently, you __should__ prefix the `fileName` with `__dirname + '/../public'` to get an absolute path to the file
    * you'll have to set the content type based on the file (using the file's extension is adequate for this assignment)
    * minimally, support the following extensions and file types:
        1. `jpeg` or `jpg`: `image/jpeg`
        2. `png`: `image/png`
        3. `gif`: `image/gif`
        4. `html`: `text/html`
        5. `css`: `text/css`
        6. `txt`: `text/plain`
    * if the file is an image type, then don't specify an encoding to `readFile`
    * if the file is text, then just assume `utf8`
    * you'll need a callback function ... which means that if you want to access the correct `this` or have arguments, you'll have to use use arrow functions or bind (see the hints on this in later instructions)
    * in your callback 
        * send back a 500 error if something went wrong
        * otherwise... __do this in the following order__:
            1. set the content type by setting the appropriate header
            2. write the head first using `this.writeHead(200);`
            3. __then send the data from the file__... `this.write(data);`
            4. finally, end the connection ... `this.end()`
        * the above ensures that the binary data is set as binary data rather than being converted to a string first 
* example usage:
    <pre><code data-trim contenteditable>// assuming there's a directory called public/css in your project's root...
res.sendFile('/css/base.css');
//
// note that the url does not have to match the name/path of the file being read!
</code></pre>
* troubleshooting:
    * if you receive `Error: This socket has been ended by the other party`, it likely means that `sock.end` was called more than once
    * if an image is broken: 
        * it's likely an issue with content type or reading the image as binary data - make sure that the head is written first, then the data of the body sent afterwards
        * or perhaps not having two \r\n's between the headers and the body
        * or it could be inadvertently converting the body into a string by writing the headers and the body all at once
        * or inadvertently adding extra data into the body 


#### Background 

In the previous part, we purposely skipped implementing `sendFile`. Send file will take a `fileName` and send back an http response with the appropriate status code (`200`), `Content-Type` header (based on file type being sent back) and body. 

It's a little bit tricky because of:

1. dealing with callbacks
2. dealing with `this`

For this part, we'll use the `fs` module and `readFile`. See [the official docs for more detailed info](https://nodejs.org/api/fs.html#fs_fs_readfile_file_options_callback). Consequently, we'll have to go over:

1. Using `fs.readFile`
2. Using a method as a callback for `fs.readFile`
3. Passing parameters to a callback
4. The exact implementation of `sendFile`, and the callback function we end up passing to it

<br>

#### Using `fs.readFile`

We're using `fs.readFile` so that we can read binary data. It'll read the entire contents of a file into memory. It works like this:

<pre><code data-trim contenteditable>const fs = require('fs');
fs.readFile('/tmp/foo.txt', {encoding:'utf8'}, function(err, data) {
    console.log(data);
}); 
</code></pre>

* Note that `readFile`'s second argument is a callback function.
    * The callback function is executed when an error occurs or the file. 
    * The callback receives an error object (which contains the error if an error occurred) and the data read from the file.
    * If encoding was specified in the original call to `readFile`, then the data that's passed to the callback is a string
    * If there is no encoding, then the raw buffer is passed as the data to the callback
    * This is useful for reading binary data, like images:
        <pre><code data-trim contenteditable>// leave encoding out of 2nd argument
fs.readFile('/tmp/myImage.gif', {}, function(err, data) {
    // we have the raw buffer!
    console.log(data);
}); 
</code></pre>
* Of course, the callback doesn't have to be an anonymous function, it can be a named function as well:
    <pre><code data-trim contenteditable>// in this case, we're passing in handleRead as the callback rather
// than using an anonymous function
fs.readFile('/tmp/myImage.gif', {}, handlRead); 
function handleRead(err, data) {
    console.log(data);
}
</code></pre>

<br>

#### Using a method as a callback

It turns out that the callback to `readFile` (or any function that requires a callback) can be a method plucked from an object. However, if the callback needs to acces the `this` property of the original object, `this` has to bound explicitly. Let's see the problem:

* Imagine you have the following object that represents a redacted file...
* It takes a `fileName` and a `word` as arguments to the constructor
* Calling `printFile` will print out the contents of the file with all occurrences of `word` redacted (in this case, it's replaced with the string, `SECRET`)
* Here's a possible implementation:
    <pre><code data-trim contenteditable>const fs = require('fs'); <br>    
function RedactedFile(fileName, word) {
    this.fileName = fileName;
    this.word = word;
}<br>
RedactedFile.prototype.printFile = function() {
   fs.readFile(this.fileName, this.handleRead); 
};<br>
RedactedFile.prototype.handleRead = function(err, data) {
    // convert to string
    let s = data + '';<br>
    // let's try to replace every occurrence of this.word!<br>
    const replacementPattern = new RegExp(this.word, "g")
    s = s.replace(replacementPattern, 'SECRET');<br>
    // print out the result
    console.log(s);
};
</code></pre>
* Now let's try running this on a file `/tmp/sensitiveData.txt`, which contains the following lines:
    <pre><code data-trim contenteditable>I went to the pizza place next door...
and I ordered 1,000 slices of pineapple pizza.
</code></pre>
* Here's the code that we write to print out a redacted version of `/tmp/sensitiveData.txt`:
    <pre><code data-trim contenteditable>const redacted = new RedactedFile('/tmp/sensitiveData.txt', 'pizza');
redacted.printFile();
</code></pre>
* However, when we run it, we don't get the result we expected!
* It just prints out the word SECRET __between every character__!?
* How did this happen?
    * `this.handleRead` was passed in to `fs.readFile` as a callback...
    * but when the callback actually gets executed, `this` within the callback function isn't actually bound to the original object (because when the callback is invoked, it's not invoked as a method, but as a regular function call!)
    * consequently `this.word` is not what we expect (it's `undefined` rather than `pizza`)
* Consequently, we have to explicitly set the `this` value of the callback
* There are a few ways to do this... we'll use the way that we learned in class, which is to use arrow functions or `bind`
* To use an arrow function, wrap the call to method in an arrow function so that `this` remains the same as the `this` in `printFile`
* Replace `this.handleRead` with  (err, data) => { this.handleRead(err, data); } `this.handleRead.bind(this)` 
    <pre><code data-trim contenteditable>// fs.readFile(this.fileName, this.handleRead);
fs.readFile(this.fileName, (err, data) => { this.handleRead(err, data); });
// or with bind:
//  fs.readFile(this.fileName, this.handleRead.bind(this));`
</code></pre>
* What does that do? 
    * with arrow functions - it preserves `this`!
    * with bind: 
        * Remember that bind gives back function.
        * With a specified `this` (as given by the caller).
        * So, it explicitly sets the `this` of the `handleRead` function to the current `this`, which refers to the `RedactedFile` object
* [Here's an SO article to read more about it!](http://stackoverflow.com/questions/20279484/how-to-access-the-correct-this-context-inside-a-callback/20279485#20279485) This shows a few ways to use a method as a callback by  _somehow_ correctly setting `this`.

<br>

#### Passing arguments to a callback

Imagine if our `handleRead` function took an extra argument, a disclaimer.

<pre><code data-trim contenteditable>RedactedFile.prototype.handleRead = function(disclaimer, err, data) {
    let s = data + '';
    const replacementPattern = new RegExp(this.word, "g")
    s = s.replace(replacementPattern, 'SECRET');
    console.log(disclaimer);
    console.log(s);
};
</code></pre>

Now... we have an issue, because the callback that should be supplied to `readFile` should only have `err` and `data` as its two arguments (but now our callback has 3!). How can we transform our callback so that it only takes 2 arguments like it did before? Once again, we'll rely on arrow functions or `bind`!

1. our arrow function can have only 2 arguments, but pass in disclaimer as the 1st argument when calling the original method
        <pre><code data-trim contenteditable>RedactedFile.prototype.printFile = function() {
    const disclaimer = 'This file has been redacted';

    // bind disclaimer as the first parameter
    fs.readFile(this.fileName, (err, data) => { this.handleRead(disclaimer, err, data); }); 
};
</code></pre>
2. `bind` allows us to "fix" a parameter or parameters of a function to specific values 
    * (so we can create a new function with less parameters)
    * for example: `const parseInt100 = parseInt.bind(null, "100")` ... 
    * binds "100" to the first argument of `parseInt`, and returns a function that takes only one argument, the `radix`
    * `parseInt100(2)` ... gives us 4 (because the only argument is the radix)
    * Consequently, the fix for a callback that requires a parameter is to use bind to fix the initial parameters:
        <pre><code data-trim contenteditable>RedactedFile.prototype.printFile = function() {
    const disclaimer = 'This file has been redacted';

    // bind disclaimer as the first parameter
    fs.readFile(this.fileName, this.handleRead.bind(this, disclaimer)); 
};
</code></pre>

<br>

#### Implementing `sendFile`

Now that we know how to use `readFile` and its callback within the context of an object, we'll turn our attention back to  `sendFile`. `sendFile` will read the contents of the `fileName` supplied to it, and it'll read the file relative to the `public` folder in the repository. Here's how you'll implement `sendFile`:


1. Determine the absolute path to the file that's passed in as its argument by using `_\_dirname` to find the directory of the module... and go up one so that public can be accessed.
    <pre><code data-trim contenteditable>const publicRoot = __dirname + '/../public';
const filePath =  publicRoot + fileName;
</code></pre>
2. Use the extension of the file to determine:
    * if it's an image
    * ... and to figure out what the correct `Content-Type` should be
        1. `jpeg` or `jpg`: `image/jpeg`
        2. `png`: `image/png`
        3. `gif`: `image/gif`
        4. `html`: `text/html`
        5. `css`: `text/css`
        6. `txt`: `text/plain`
3. Call `readFile` with:
    * a callback function that's a method on the `Response` object, a standalone function or an anonymous function.
    * a value for encoding if the file being read is text-based (`{"encoding": "utf8"}`)
4. In any case, the callback should take a `contentType`, `err` and `data` as its arguments... but make sure that `contentType` is set appropriately and that `this` can be used to access `Response` object methods (use arrow functions or bind!)
5. Call the appropriate `Response` object methods from within your callback to send back a response; note that the methods must be called __in this order__ &rarr;
    1. set the `Content-Type` header
    2. send everything but the body by calling `this.writeHead(200)`
    3. write the data that was passed in as an argument to the callback to the socket (that is, write the data from the file)
    4. close the connection
    5. why write the headers and the body separately? This avoids any issues where the binary data of the image is inadvertently converted to a string.

<br>

#### Testing `sendFile`

Now try adding a path to display:

1. an html file that's located in your `$PROJECT_ROOT/public/html/` folder called `test.html` 
2. an image that's in located in your `$PROJECT_ROOT/public/img/` folder called `bmo1.gif`

To do this:

1. Add another condition for the paths `/test` and `/img/bmo1.gif`
2. Use `sendFile` to send the appropriate file relative to `public`
3. Remember that the path of the request doesn't have to match the path of the actual file being read
4. Here's what it'll all look like together: <br> ![pic alt](/csci-ua.0480-fall2017-007/resources/img/hw03-03-evenWarmer-response.gif)
5. `bmo1.gif` should be present
6. you'll have to write your own `test.html`

## Part 3 - Converting to App Object

Now you'll start writing your module, `miniWeb.js`. 

1. Copy your `Request` and `Response` classes from `evenWarmer.js` to `miniWeb.js`
2. In `minWeb.js`, add one more class, `App`. Use the [specifications for the `App` object below](#app)
3. Go through your code and check for places that may cause 500 errors (for example, if the `err` object exists when handling a file read, send back a 500 as a response... or if the framework user tries to send a file that has an extension that is not recognized, that should also be a 500)
4. Export `App` along with `Require` and `Response`

<a name="app"></a>

### `App` Object

The app object represents a web application. It's responsible for:

1. accepting incoming http requests
2. holding "routes" or url/path combinations (right now our framework will only support GETs)
3. determining what to do based on the incoming request
4. sending back a response

Number 2 and 3 are determined by the user that is writing a web application with this framework. That is, they specify what routes are present ... and what to do when that route is matched by writing code. For example, a hello world application could be written as follows (this is what someone using your web framework would write):

<pre><code data-trim contenteditable>const App = require('./miniWeb.js').App;
const app = new App();

app.get('/hello', function(req, res) {
    res.send(200, 'HELLO WORLD');
});

app.listen(8080, '127.0.0.1');
</code></pre>

<hr>

#### Constructor

`App()` - creates a new App object and sets the connection callback function to `this.handleConnection` which you'll implement below ... additionally, initializes its routes to empty object (see Properties section). Example usage of constructor:

<pre><code data-trim contenteditable>const App = require('./miniWeb.js').App;
const app = new App();
</code></pre>

Note that when you import the module, you can set a variable directly to an exported object by using dot notation. In the example above, pull out the `App` constructor.

The `App` object itself represents both a web server and the web application running on that server. Consequently, it'll hold an instance of a `Server` object from node's `net` module. See [the slides](../slides/06/sockets.html#/2) or the [node documentation](https://nodejs.org/api/net.html#net_class_net_server).

When you create a server using `net.createServer`, it expects a callback function to be specified when a client connects to the server. That callback will be a method that you define, `handleConnection`. However, to have a method be passed as a callback __and__ retain its original access to the object that it belongs to, you'll have to use bind (otherwise, `this` will refer to the global object). In the constructor, it'll look something like this:

<pre><code data-trim contenteditable>// within your constructor
this.server = net.createServer(this.handleConnection.bind(this));

// the above ensures that handleConnection will have a this that refers to the
// object created by the constructor without having to call handleConnection
// as a method on the object
</code></pre>

<hr>

#### Properties

1. `server` - an instance of the `net` module's `Server` object
2. `routes` - an object that maps paths to callback functions

<hr>

#### Methods

1. `get(path, cb)` - adds `path` as a property name in `routes`... the value of which is the callback function, `cb` (again, assumes support only for GET requests)
    * `path` - the path to respond to (that is, a valid path for the web application)
    * `callback` - the function called when `path` is requested (essentially... what to do when a specific path is asked for)
        * the callback function will take two arguments
        * a `Request` object
        * a `Response` object
        * `cb(req, res) ...`
    * no return value
    * example usage:
        <pre><code data-trim contenteditable>app.get('/hello', function(req, res) {
    res.send(200, 'HELLO WORLD');
});
</code></pre>
2. `listen(port, host)` - binds the server to the given `port` and `host` ("listens" on `host`:`port`)
    * `port` - the port number to bind to
    * `host` - the host that the server will be running on (for example, '127.0.0.1')
    * no return value
    * example usage:
        <pre><code data-trim contenteditable>app.listen(8080, '127.0.0.1');
</code></pre>
3. `handleConnection(sock)` - the function called when a client connects to the server... this will simply set the callback for the socket's `on` method: `sock.on('data', ...)` to the function below, `handleRequestData`
    * `sock` - the socket representing the connection to the client (this will be supplied by the caller because this will be used as a callback function for `net.createServer`)
    * no return value
    * example usage (as a callback function for `net.createServer`):
    <pre><code data-trim contenteditable>this.server = net.createServer(this.handleConnection.bind(this));</code></pre>
4. `handleRequestData(sock, binaryData)` - the function called when the socket receives data from the client (our framework will not have a timeout, it'll just assume that once it receives data, that the data received is the entire request)...  this is where most of the logic of our framework will go; it processes a request and sends back a response!
    * `sock` - the socket representing the connection to the client
    * `binaryData` - the data sent by the client
    * no return value
    * this callback is essentially responsible for processing a request and sending back a response... it will:
        1. convert the incoming data to a string 
        2. create a new `Request` object based on that string
        3. create a new `Response` 
        4. sets a callback for when the connection is closed (the callback will be to log the response using `logResponse` below)
        5. determine if the request is valid by checking for a `Host` header (it'll return a `400` if the request isn't valid)
        6. look up the function to call in `this.routes` by using the `path` property from the incoming `Request` object ... __make sure that urls with and without a trailing slash (/) map to the same function__
        7. call that function, passing in the `Request` and `Response` objects created above as arguments
        8. if the `path` doesn't exist in `this.routes`, then send back a `404`
    * hints:
        * note that the callback for `sock.on(data, ...)` typically only takes a single argument
        * however, we want access to a socket object so that we can create our `Response` object using that socket
        * so... to fix the arguments, when we set `handleRequestData` as a callback in `handleConnection`, we'll have to use bind again (or arrow functions):
    * example usage:
            <pre><code data-trim contenteditable>// within handleConnection...
sock.on('data', this.handleRequestData.bind(this, sock));
// once again, sets this... and also sets sock so that the returned function
// only takes a single argument, binaryData
    * example usage (as a callback function for `sock.on('data', ...)`):
    <pre><code data-trim contenteditable> sock.on('data', this.handleRequestData.bind(this, sock)); </code></pre>
5. `logResponse(req, res)` - logs out the http request method and path... as well as the response status code and short message
    * example usage:
    * `req` - the incoming http request
    * `res` - the resulting http response
    * no return value
    * example usage (as a callback function for `sock.on('close', ...)`:
        <pre><code data-trim contenteditable>// when a request / response cycle is finished, then log out some info
// note that we'll need to bind req and res assuming that they're available (which they should be...
// ...since this goes in handleRequestData, which creates both objects)
// (arrow functions will also work)
sock.on('close', this.logResponse.bind(this, req, res));
</code></pre> 


## Part 4 - Using your Module!

Create a small site using your framework. In a file called `fansite.js` create a fan site for a fictional character from a book, movie or television series. It must respond to the following URLs (note that the URLs should still work if an extra trailing slash is added... `/about` and `/about/` should go to the same place):

* `/` - a homepage that has an image and that uses a stylesheet
* `/about` - a page that has an `h1` header somewhere in the markup
* `/css/base.css` - the css that the homepage (and other pages optionally) should use
* `/rando` - a page that displays a random image; this must be an html page with no client side JavaScript... the server will generate a random image url to be displayed
* `/image1.jpg` 
* `/image2.png`
* `/image3.gif`
* `/home` - should issue a permanent redirect (301) to `/`

To create your site:

1. Bring in your module and create a new `App` object: 
    <pre><code data-trim contenteditable>const App = require('./miniWeb.js').App;
const app = new App();
2. Add routes as necessary... 
    <pre><code data-trim contenteditable>app.get('/', function(req, res) {
    // ... do stuff here
});
3. Use any mechanism you'd like to send back a response (you can use `sendFile` and read files from `public`, you can just use `send` to send back strings of html, etc.) ... obviously, for some, like images, you'll have to use specific methods
4. Bind to a port and host with `listen`:
    <pre><code data-trim contenteditable>app.listen(8080, '127.0.0.1');
</code></pre>


Check your work

1. use curl to check status codes and headers... 
2. check the pages in your browser, make sure everything renders fine with/without leading and trailing slashes
3. make sure your redirect actually causes your browser to redirect the right way (that is, it should coerce the browser into making another request)
4. remember to check 404's
5. make sure that your application is logging request/response info to the console

Here's an example of how it might all work:

![pic alt](/csci-ua.0480-fall2017-007/resources/img/hw03-04-fansite.gif)


</div>

</div>
