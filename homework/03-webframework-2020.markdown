---
layout: homework
title: CSCI-UA.0480 - Homework #3
---
<style>
hr {
    color: #ccc;
    border-color: #ccc;
}
.sample-site img {
    display: block;
    width: 70%;
    height: 70%;

}

</style>

<div class="panel panel-default">
	<div class="panel-heading">Homework #3</div>
	<div class="panel-body" markdown="block">

# A Site About An Animal 🐶🦎🦉🐬🐷, Due Wednesday, Oct 2nd at 11PM 

<div markdown="block" class="img">
![gecko web site](../resources/img/hw03-gecko-00-animation-resized.gif)
</div>

## Homework Policy

<style>
strong.highlight {
	background-color: yellow;
	font-weight: bold;
	color: red;
}

</style>

1. __If you need help, please contact me (office hours or set up a time to meet) or work with the tutor__{:.highlight} 
	* helping or receiving help from other students is fine as long as it's __limited to__:
		* __high level discussions__ of algorithms / concepts / etc.
		* help debugging
	* if you feel like there may be an issue: 
		* ask me!
		* comment your code explaining who you discussed your code with to prevent false positives for instances of cheating
	* of course, do not copy someone else's work, which leads to...
2. __You must submit your own code (do not copy or distribute solutions)__{:.highlight} 
	* (there have already been instances of Academic Integrity violations this semester!)
	* distribution includes, but is not limited to:
		* emailing code
		* pushing code to a public repository
		* sending screenshots of your code
		* etc.
	* copying includes, but is not limited to:
		* making digital copies of someone else's code
		* cloning code from a repository that isn't yours
		* using solutions found online
		* looking at someone else's work and copying from what is displayed on their screen
3. __Homework is checked against prior semesters, so do not copy code found online__{:.highlight} 
	* do not use solutions found online
	* homeworks submitted are checked against previous semesters' homeworks


## Overview

### Description

There are two parts to this assignment:

1. using the sample code from class, refactor the code into classes, functions and objects
2. use this code to create a website about an animal

At the end, you'll have a reusable _toy_ web framework that you can use to write simple web applications, as well as a demo site.

Again, both parts will be built off of and run from node's built-in TCP server (from the `net` module).

__You can only use the following two modules for this assignment__ &rarr;

1. `net` - a module for creating TCP servers and clients
2. `fs` - a module for file system related tasks, such as reading and writing files
3. `path` - a module for file name and path related manipulation (such as extracting an extension from a file name and joining path names)

__⚠️You can't use the `http` module... or install additional frameworks, such as `express`__

### Submission Process

You will be given access to a private repository on GitHub. It will contain: 

1. stub source files in the `src` directory (`app.js` and `webby.js`)
2. some images you can use for testing in the `public/img` folder
3. unit tests in `test`
4. __you'll have to create your own `package.json`, `package-lock.json`, `.gitignore`__
    * (these are required and part of grading)
	* use `npm init` to create `package.json` (you can just press enter all the way through)
    * remember to put `node_modules` in your `.gitignore`
5. if `.eslintrc.js` isn't present, you can copy over your linting configuration `.eslintrc.js` from homework 02

__Push__ your code to the homework repository on GitHub. Repositories will close, so make sure you push your changes before the deadline.

### (4 points) Make at Least 4 Commits

* Commit multiple times throughout your development process.
* Make at least 4 separate commits - (for example, one option may be to make one commit per part in the homework).


## Part 1 - Getting Classy

In this part, you'll use the [sample code](../#class7) from our in-class demos on the `net` module to implement classes that mimic the `Express` framework (of course, you can't use `Express` for this). Your framework (`webby.js`), will be built off of node's `net` module. It will use the `net` module to create a TCP server that will allow connections from clients. It will handle an incoming http request from a client by parsing the http request, determining what do based on the request, and finally sending back an http response.

This will differ from the sample code in several significant ways:

* instead of relying on functions and a single script, you'll create a module that contains classes, funtions and objects that can be brought in (using `require`) by another script:
    1. `HTTP_STATUS_CODES` - an object that contains mappings from status codes to descriptions
    2. `MIME_TYPES` - an object that contains mappings from extension to MIME type
    3. `getExtension` - a function that returns an extension based on file name
    4. `getMIMEType` - a function that gives back MIME type based on file name
    5. `Request` - a class that represents an http request
    6. `Response` - a class that represents an http response... of which instances can send back a response to the client
    7. `App` - a class that represents a web application; takes incoming requests and determines what to do based on existing middlesware, path, method, etc. ... 
    8. `serveStatic` (exported as `static`) - a function that returns a _middleware_ function that serves a file if it exists on the file stystem
* the classes and objects provided by the framework will have several features that we did not implement in class:
    * it can add routes without needing to have knowledge about the routing implementation (that is, without having to add to a large conditional)
    * it can add middleware that gets called before routes
    * it should be able to handle paths with different casing, fragments, query strings, etc.
    * it can send files from the file system without defining explicit route

Before starting, __make sure to review the course materials on the net module and creating tcp/ip servers__:

1. 👀__you can use the code from class samples to start your project__ 👀:
    * see [class 7 for in-class demo code on the net module](../#class7)
	* the _actual_ in class demo was [demo.js](../examples/sp19-class07/demo.js)
    * additionally, check out this example of reading a file and serving the content of the file (which came up when a student asked about serving up facicon.ico): [webServer.js](../examples/class07b/webServer.js))
2. check out the [slides on the `net` module](../slides/06/sockets.html#/2), paying close attention to the [the last slide](../slides/06/sockets.html#/10).
3. lastly, make sure that you can write back a valid http response by reviewing::
    * [the slides on http](../slides/05/web.html#/16)
    * [and an example response](../slides/05/web.html#/24)

__No type checking or error handling has to be done unless specified by the description below / the unit tests provided__. You'll export some of these for use in `src/app.js`. Minimally, implement the following (of course, you can create more functions/objects, as the ones listed below will only help with a subset of the part 1's requirements): 


### About the Framework

`webby.js` will mimic a subset of `Express` functionality. Consequently, your goal is to create the classes and objects specified... so that those classes and objects can in turn be sued write simple web applications.  __You are making the library / objects / classes / module__ that makes the following _possible_ 🤓 (this shows just some of the functionality of your module, not all of it):

<pre><code data-trim contenteditable>// require your module
const webby = require('./webby.js');

// create a web application
const app = webby.App();

app.get('/foo', (req, res) => {
    // show the method and path of the http request on the server console;
    console.log(req.method, req.path);

    // set a custom header on the response
    res.set('X-Foo', 'bar');

    // explicitly set the status and send back a response with some html
    res.status(200).send('&lt;h1&gt;Foo&lt;/h1&gt;');
});
</code></pre>

### Building the Framework

In `webby.js`...

1. create some utility objects and helper functions to deal with file extension and content type
2. create a `Request` object to encapsulate http requests
3. create an `App` object that encapsulates your server...
    * add application level functionality, such as routing
4. create a `Response` object to encapsulate http responses; this object will be able to:
	* send http responses back using a socket object

You'll build off of your experience with the sample code from class by refactoring it, encapsulating the functionality that was already there, and adding more features - all with new classes and functions

### Create Some Classes and Objects, Try the Tests

In your module, `src/webby.js`, create the classes and objects specified below. You can periodically run the tests in `test/webby-test.js` to ensure that your implementations are correct. (You'll have to remember to export them with `module.exports`)

👀 The test output is a bit intimidating, so - if you want - you can limit your tests by modifying them with `only` to [run specific tests exclusively](https://mochajs.org/#exclusive-tests). 👀

### `HTTP_STATUS_CODES`

Create a module-level (_global_) object called `HTTP_STATUS_CODES` that maps status codes (as `Number`s) to descriptions. For example, `200` should map to `OK`. Minimally, this should contain `200`, `404`, and `500`.

[See MDN's listing of status codes for descriptions](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

<hr>

### `MIME_TYPES`

Create a module-level (_global_) object called `MIME_TYPES` that maps file name extensions to [MIME Type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types). This is essentially the value that will be used in the `Content-Type` request header. For example, if a file ends with `jpg`, its MIME Type is `image/jpeg`. Minimally, this mapping should contain `jpg`, `jpeg`, `png`, `html`, `css`, and `txt` (both `jpg` and `jpeg` map to the same MIME Type).

[See MDN's documentation of MIME Types to see the mappings between extension and MIME Type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types)

<hr>

### `getExtension(fileName)`

__Parameters:__

* `fileName` - a string representing the name of the file

__Return:__

* the extension of the file in lowercase as a `String`

__Description:__

Extracts the extension of a file name and normalizes it to lowercase. You can assume that everything after the last dot in a fil name is the extension. If there is no dot, then the extension is empty string. Hint: [split](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split) or [path.extname](https://nodejs.org/api/path.html#path_path_extname_path) may help implement this function.

Example usage:

```
const ext1 = getExtension('foo.jpg'); // ext1 --> jpg
const ext2 = getExtension('FOO.JPG'); // ext2 --> jpg
const ext3 = getExtension('foo.bar.jpg'); // ext3 --> jpg
const ext4 = getExtension('foo'); // ext4 --> '' (empty string)
```
<hr>

### `getMIMEType(fileName)`

__Parameters:__

* `fileName` - a string representing the name of the file

__Return:__

* the [MIME type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) of a file based on its extension
    * minimally, support `jpg`/`jpeg`, `png`, `html`, `css`, `txt`
    * (see article above for appropriate MIME type for file name extension)
    * empty string if MIME type can't be determined from file name

__Description:__

Based on the extension of the file, give back the associated MIME Type. 

Hints: Use your `getExtension` above.

Example usage:

```
const t1 = getMIMEType('foo.jpg'); // t1 --> img/jpeg
const t2 = getMIMEType('foo'); // t2 --> '' (empty string)
```

<hr>

### Create a `Request` Class

In this section, you'll implement a `Request` class. You'll eventually use instances of this class to conditionally serve up different content based on the `path` specified by the request.  The `Request` object __represents an http request__. It can take an http request as a string, parse out information about that request and expose that information as properties (such as `method` and `path`).

Create the `Request` _class_  by implementing the following in `src/webby.js`:

<hr>

#### Constructor

`Request(httpRequest)` - creates a new request object based on the string passed in.

<pre><code data-trim contenteditable>let s = ''
s += 'GET /foo.html HTTP/1.1\r\n';   // request line
s += 'Host: localhost:3000\r\n';     // headers
s += '\r\n\r\n';                     // empty line to mark the boundary between the header and body

const req = new Request(s);
</code></pre>

The string passed in will be parsed into the properties shown below. __You can assume that you will always receive a valid http request__

<hr>

#### Properties

1. `path` - the path requested (for example, `/foo/bar/baz.html`)
2. `method` - the http verb (for example, `GET` or `POST`)

You don't have to worry about version, headers, etc. ... This can be copied without annotation directly from the sample code if you want naive implementation (of course, feel free to parse it any way you like!):

[Sample code from class 7](../#class7) 

<hr>

### Testing / Using `HTTP_STATUS_CODES`, `MIME_TYPES`, `getExtension`, `getMIMEType`, and the `Request` Class

Once you are finished with your implementation above, you can export, test and try using your new objects, functions, and `Request` class.

1. Export the object using `module.exports`, and try running the tests in `test/webby-test.js` (use [`.only`](https://mochajs.org/#exclusive-tests) for each object you want to test or simply comment out the other tests) 
    * install dev dependencies to run tests: npm install \-\-save-dev mocha chai chai-match sinon mocha-sinon
	* `npx mocha test/webby-test.js`
    * 👀 run the tests from within your `root` folder
2. Eventually, you'll be able to use this request object to parse the binary data that is passed in to the callback function `someCallback` in `sock.on('data', someCallback)`
3. As a consequence, you'll be able to use a `Request` instance's `method` and `path` properties  to conditionally execute code     
	* `const req = new Request(binaryData.toString());`
	* `if(req.method === 'GET' && req.path === '/foo') { }`

## ⚠️Work on the `App` and `Response` Classes in Tandem

Skim through the specs for both classes before writing code.

`App` depends on `Response`, so you may have to jump around a bit during implementation (for example, wait on implementing `handleRequest` and `processRoutes`)

### Create an `App` Class

An instance of an `App` represents a web application. It's responsible for:

1. accepting and parsing incoming http requests (using the `Request` class)
2. holding "routes" (http method and path combinations) in a property called (of course) `routes`
3. optionally calling a middleware function if it exists on an `App` instance as `middleware` (only one middleware function can be set, which is different from how Express works)
4. or simply determining what to do based on the incoming request path (if no middleware is present, or if middleware passes processing on to the route handlers)
5. ... and finally sending back a valid http response

Number 2 and 3 and 5 are determined by the user that is writing a web application with this framework. That is, they specify middleware and routes ... and what to do when that route is matched by writing code. For example, a hello world application could be written as follows (this is what someone using your web framework would write... where the comments are what's determined by the user of this module):

<pre><code data-trim contenteditable>const webby = require('./webby.js');
const app = new webby.App();

// add me some middlware!
app.use((req, res, next) => {
    console.log(req, res);
    next();
});

// add a route
app.get('/hello', function(req, res) {
    // send back a response if route matches
    res.send('HELLO WORLD');
});

app.listen(8080, '127.0.0.1');
</code></pre>

<hr>

#### Constructor

`App()` - creates a new App object and sets the connection callback function to `this.handleConnection` which you'll implement below ... additionally, initializes its `routes` property to an empty object and its `middleware` property to `null` (see Properties section). Example usage of constructor:

<pre><code data-trim contenteditable>const App = require('./webby.js');
const app = new webby.App();
</code></pre>

The `App` object itself represents both a web server and the web application running on that server. Consequently, it'll hold an instance of a `Server` object from node's `net` module. See [the slides](../slides/06/sockets.html#/2) or the [node documentation](https://nodejs.org/api/net.html#net_class_net_server).

When you create a server using `net.createServer`, it expects a callback function to be specified when a client connects to the server. That callback will be a method that you define, `handleConnection`. However, to have a method be passed as a callback __and__ retain its original access to the object that it belongs to, you'll have to use an arrow function (preferred) or `bind` (otherwise, `this` will refer to the global object). In the constructor, it'll look something like this:

<pre><code data-trim contenteditable>// within your constructor
this.server = net.createServer(sock => this.handleConnection(sock));

// alternatively, you can bind this using the bind method:
// this.server = net.createServer(this.handleConnection.bind(this));

// the above ensures that handleConnection will have a this that refers to the
// object created by the constructor without having to call handleConnection
// as a method on the object
</code></pre>

Note that many of the methods in `App` will be used as callbacks to other methods in `App`. Starting from the method that will likely be called first: 

1. the `constuctor` for this `App` object will use __`handleConnection`__ as the argument to the `net` module's `createServer` so that it's called when a client connects
2. `handleConnect` will use __`handleRequest`__ as a callback to a socket object `on` method (`sock.on`) so that `handleRequest` is called when a client sends data
3. `handleRequest` will use __`processRoutes`__ as a  callback to a middleware function if it's specified or `processRoutes` will be invoked directly from the `App` instance (`this.processRoutes(...)`) if no middleware is set

⚠️Care must be taken in all of these methods when dealing with number of arguments and the setting of `this`. Use arrow functions and bind as potential solutions.

<hr>

#### Properties

1. `server` - an instance of the `net` module's `Server` object; this is the object returned from the `net` module's `createServer`, and it's what will be used for accepting connections and listening for data
2. `routes` - an object that maps methods and paths to callback functions
3. `middlware` - a function that gets called before the functions in `routes`... which enables the user to add features that will be executed before a function from `routes` is called;  it'll be useful for:
    * adding logging
    * serving static files (see `serveStatic` later on in these specifications)

(see constructor for initial values)

<hr>

#### Methods

1. `normalizePath(path)` - takes a path and normalizes casing and trailing slash. Additionally, removes the fragment or querystring if present (does not have to handle both query string and fragment in same path, though).
    * `path` - the path part of a url (for example the path for `http://foo.bar/baz/qux` is `/baz/qux`)
    * returns a `String`, the normalized path
    * example usage:
        <pre><code data-trim contenteditable>let p;
// in all cases, p is /foo
p = app.normalizePath('/FOO'); 
p = app.normalizePath('/foo#bar');
p = app.normalizePath('/foo?bar=baz');
p = app.normalizePath('/foo/');
p = app.normalizePath('/foo/?bar=baz');
p = app.normalizePath('/foo/#bar');
</code></pre>
2. `createRouteKey(method, path)` - takes a an http method and path, normalizes both, and concatenates them in order to create a key that uniquely identifies a route in the `routes` object (this will essentially be the property name)
    * `method` - an http method such as `GET` or `POST`
    * `path` - the path part of a url (for example the path for `http://foo.bar/baz/qux` is `/baz/qux`)
    * returns a `String`, a property name suitable to uniquely identify a route in the `routes` property of an `App` object
    * to create the property name, uppercase method and use the `normalizePath` method defined earlier for the path. Concatenate the two values, with a space between.
    * example usage:
        <pre><code data-trim contenteditable>const k = app.createRouteKey('GET', '/FOO/?bar=baz') // p is GET /foo
</code></pre>
3. `get(path, cb)` - adds `GET` and `path` together to create a "key", which will be used to map to a value - the callback function, `cb` (the function to be called when a request matching its key's method and path comes in)
    * `path` - the path to respond to (that is, a valid path for the web application)
    * `cb` - the function called when a `GET` to this `path` is requested (essentially... what to do when a specific path is asked for)
        * the callback function will take two arguments
        * a `Request` object
        * a `Response` object
        * `cb(req, res) ...`
    * no return value
    * Hint: use one of the other methods specified earlier to make sure that the key added to `routes` can deal with casing, trailing slash, etc.
    * example usage:
        <pre><code data-trim contenteditable>app.get('/hello', function(req, res) {
    res.send('HELLO WORLD');
});
</code></pre>
4. `use(cb)` - sets the `middleware` property for this instance of `App`
    * `cb` - the function called before every route handler in `routes` 
        * the callback function will take three arguments
        * a `Request` object
        * a `Response` object
        * a `next` function - representing the next function to call after the middeware is done processing the `Request` (which basically allows the processing af a `Request` to optionally continue through the route handling functions in `routes`)
    * no return value
    * example usage:
        <pre><code data-trim contenteditable>app.use((req, res, next) => {
    // log out the path for EVERY incoming request
    console.log(req.path);
    // allow the processing to continue to route handlers
    next();
});
</code></pre>
        <pre><code data-trim contenteditable>// OR...
app.use((req, res, next) => {
    // send back the response right away and ignore any route handliers in routes
    res.send('HELLO WORLD');
});
</code></pre>
5. `listen(port, host)` - binds the server to the given `port` and `host` ("listens" on `host`:`port`)
    * `port` - the port number to bind to
    * `host` - the host that the server will be running on (for example, '127.0.0.1')
    * no return value
    * this essentially will just call the same method name on the internal tcp/ip server (`.server` property)
    * example usage:
        <pre><code data-trim contenteditable>app.listen(8080, '127.0.0.1');
</code></pre>
6. `handleConnection(sock)` - the function called when a client connects to the server; it will, in turn, specify which function to call when this `App` instance receives data from the connected client (that is, it will set the callback for the socket's `on` method: `sock.on('data', ...)` to the function specified below, `handleRequest`)
    * `sock` - the socket representing the connection to the client (this will be supplied by the caller because this will be used as a callback function for `net.createServer`)
    * no return value
    * ⚠️when you set the callback function of `sock.on` to `handleRequest` within this function, you'll have to find a way to turn `handleRequest` (see below) into a function that takes one argument instead of two ([the callback to `sock.on('data', ...)` is only passed a `String` or `Buffer`, not a `Socket`](https://nodejs.org/api/net.html#net_event_data)!)
    * example usage (as a callback function for `net.createServer`):
        <pre><code data-trim contenteditable>this.server = net.createServer(sock => this.handleConnection(sock));</code></pre>
4. `handleRequest(sock, binaryData)` - the function called when the socket receives data from the client (our framework will not have a timeout, it'll just assume that once it receives data, that the data received is the entire request)...  this is where your app will create `Request` and `Response` objects and determine whether or not it should call the `middleware` function 
    * `sock` - the socket representing the connection to the client
    * `binaryData` - the data sent by the client
    * no return value
    * this function is responsible for:
        1. creating a new `Request` object (built from `binaryData`) that represents the incoming request and a new `Response` object that represents the potential response, 
        2. calling the `middleware` function if it's been set (not `null`)
            1. if it exists, call the middlware function with the `Request` and `Response` object... and a `next` function that causes the processing of the defined `routes`, `processRoutes` (specified below)... 
            2. the call should look like `this.middleware(yourRequestObj, yourResponseObj, theNextFuncion)`, where `theNextFunction` is `processRoutes` (again, defined below)
            3. this will essentially cause the `middleware` function to be invoked, and `next` function will give the `middleware` function to potentially continue processing routes (like normal)
            3. for example... your middleware may log every request... and call `next` so that the proper function is called from `routes`
            4. ⚠️ note that in this case, care must be taken with the way that `processRoutes` is passed in as the `next` function so that its `this` value is the `App` instance 
        2. if there's no `middleware` function, check if the `Request` object's `method` and `path` matches any of the defined routes in the `App` object's `routes` property by calling `processRoutes` (specified below) with the `Request` and `Response` objects created earlier in this method
5. `processRoutes(req, res)` - calls the appropriate function stored in `routes` to handle the incoming request based on `method` and `path`
    * `req` - the incoming http request
    * `res` - the resulting (potential) http response
    * no return value
    * this is responsible for determining if the incoming request is supported (based on `method` and `path`) and sending back a response... it will:
        1. look up the function to call in `this.routes` by using the `method` and `path` property from the incoming `Request` object 
            * Hint: __use a method defined earlier to help deal with casing, traling paths, etc.__
        2. call the function if it's found in `routes` by passing in the `Request` and `Response` objects that were previously passed in to this function as arguments 
        3. if the `path` and `method` combination doesn't exist in `this.routes`, then send back a `404` and a plain text response saying `Page not found.` (note - this does not mean `return` from the function, but instead, create an http response and "send" it to the client) 
    * example usage: 
        <pre><code data-trim contenteditable>// assuming that req and res are available:
this.processRoutes(req, res);
</code></pre>

<hr>

### Create a `Response` Class

Instead of directly calling  `write` on the`socket` object, wrap the `socket` up in a `Response` object and use that to send data to the client. Notice that all of the `methods` called on socket are being being called by equivalent methods on your `Response` object.

The `Response` object represents an http response, and it allows direct manipulation of the underlying socket that represents the current connection for the http request/response. It can hold data about an http response, turn that data into a valid http response... and send that data back to the client (as well as close the connection between the server and the client).

Create a `Response` _class_ based on the [specifications below](#response).  

Again, you can run unit tests as you work, by adding the object to `module.exports`, and running the tests in `test/webby-test.js`. Remember to use `.only` or comment out other tests if you're only interested in a specific test.

<a name="response"></a>

<hr>

#### Constructor

`Response(socket, statusCode, version)` - creates a new response object using the socket passed in as the internal socket for interfacing (`write`, `end`, etc.) with the connected client

* `version` and `statusCode` can be used to initialize the `version` and `statusCode` properties (specified below)
* If `version` and `statusCode` are not passed in, the default value for `version` should be `"HTTP/1.1"` and `200` for `statusCode`.

<pre><code data-trim contenteditable>// assuming a socket, sock, exists
const res = new Response(sock);

// or...
const res = new Response(sock, 301);

// or...
const res = new Response(sock, 301, "HTTP/1.1");
</code></pre>

The constructor will set the socket instance passed in as a property on the resulting `Response` object. The socket will then be used to send data back to the client. The other properties, `statusCode` and `version`, will be set to either the arguments passed in or or default values.


<hr>

#### Properties

1. `sock` - the socket associated with the http response
2. `headers` - an object that has response header names as property names and response header values as property values (for example, `{"Content-Type": "text/html", "Cache-Control": "max-age=3600"}`)
3. `body` - the body of the response (such as an html document or an image)
4. `statusCode` - the status code of the http response as a `Number` (for example: `200`)
5. `version` - the version of the http response as a `String` (for example: `HTTP/1.1`)

<hr>

#### Methods

Most of the methods in the `Response` either act as a proxy for `socket` methods (that is, you can call `end` on `Response`, which internally just calls `end` on its `sock` property) or are convenience methods for combining other `Response` object methods. Consequently, it would be useful to check out the [slides on networking and sockets](../slides/06/sockets.html) before starting. Alternatively, you can also look over the [official node documentation on the `net` module](https://nodejs.org/api/net.html).

1. `set(name, value)` - adds a new header name and header value pair to this `Response` object's internal `headers` property
    * `name` - the name of the response header
    * `value` - the value of the response header
    * no return value
    * example usage:
        <pre><code data-trim contenteditable>res.set('Content-Type', 'text/html'); </code></pre>
3. `end()` - ends the connection by callings the `end` method on this `Response` object's internal socket object (essentially a pass-through / proxy method to call the same method on `this.sock`)
    * note that you will not be able to send any more data on a closed socket (this also implies that you cannot call end more than once for a single request/response cycle)
    * also note that you should not call `sock.write` at all in this method; just call `sock.end` 
    * no return value
    * example usage:
        <pre><code data-trim contenteditable>res.end(); // closes connection!
</code></pre>
3. `statusLineToString()` - returns the the first line of an http response based on the properties defined in this `Response` instance (including the trailing newline)
    * no parameters
    * returns a `String` representing the first line in an http response (the _status_ line): if `statusCode` is set to `200` and `version` is set to `HTTP/1.1`, then the resulting `String` should be `"HTTP/1.1 200 OK\r\n"`
    * HINT: use one of the function you've already defined to add the description of the status code
    * example usage:
        <pre><code data-trim contenteditable>// assuming 200 and HTTP/1.1
this.statusLineToString() // --> HTTP/1.1 200 OK with \r\n at the end
</code></pre>
3. `headersToString()` 
    * no parameters
    * returns a `String` representing the headers of this http response (both the name and the value), with each header name/value pair ending with `"\r\n"`
    * example usage:
        <pre><code data-trim contenteditable>// assuming headers are {'X-Foo': 'bar', 'X-Baz': 'qux'}
this.headersToString(); 
// X-Foo: bar
// X-Baz: qux
// with \r\n after each name/value pair
</code></pre>
4. `send(body)` - sets the `body` property of this `Response` object. Sends a valid http response to the client based on this `Response` object's properties (`statusCode`, `version`, and `headers`) and the `body` argument, and closes the connection. 
    * `body` - the body of the http response
    * no return value
    * It will set the `Content-Type` header to `text/html` if the header doesn't exist in `headers`. * ⚠️It should write the status line and headers to the socket first... and then write the body (note that there an extra `"\r\n"` should be sent out before the body to separate the body from what was written out before.
    * HINT: ⚠️again, write out the status line (first line), headers, and extra new line before writing out the body (use this `Response` object's `sock` property to do this with `sock.write`)
    * example usage:
        <pre><code data-trim contenteditable>res.setHeader('Content-Type', 'text/html');
res.send('Hi there!');
// sends back the following http response (newlines are \r\n):
// HTTP/1.1 200 OK
// Content-Type: text/html
//
// Hi there!
// (then closes the connection)
</code></pre>
5. `status(statusCode)` - sets the `statusCode`, and returns the `Response` object that it was called on (essentially `return this`) to support method chaining
    * `statusCode` - the status code of the http response 
    * returns a `Response` object (the same one that it was called on)
    * example usage:
        <pre><code data-trim contenteditable>// set the statusCode property and chain a send off the return value
res.status(301).send('...');
</code></pre>

<hr>

### Testing / Using the `App` and `Response` Classes


Once your finished with your implementation above, you can export, test and try using your new `App` and `Response` classes.

1. Export all of the functions and classes that you've created using `module.exports`, and try running the tests in `test/webby-test.js` 
	* (again, you can use `.only` to run certain tests one-by-one or comment out other tests)
	* some methods don't have tests (for example, `listen` is not covered)
2. If everything the tests for `App`, `Response` (and the other previously defined functions and class), you can modify `src/app.js` to create a simple web application (which you'll replace later):
    <pre><code data-trim contenteditable>const webby = require('./webby.js');
const app = new webby.App();</code></pre>
    <pre><code data-trim contenteditable>// add me some middlware!
app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
});
</code></pre>
    <pre><code data-trim contenteditable>// add a route
app.get('/hello', function(req, res) {
    // send back a response if route matches
    res.send('&lt;h1&gt;HELLO WORLD&lt;/h1&gt;');
});</code></pre>
    <pre><code data-trim contenteditable>app.listen(3000, '127.0.0.1');</code></pre>
    * if everything is running properly, then:
        * regardless of what url you use in your browser, your server (that is, the terminal where you started your server) will log out the request method and request path of every incoming request
    * going to `/hello` will give back HELLO WORLD in a header tag (the html should be rendered, and you _shouldn't_ see angle brackets / `h1` tags)
    * going to any other url should give back a `404` (send back a 404 http response to the client) and a plain text response in the browser saying `Page not found`

<hr>

### Create `serveStatic` middleware

Whew! 😓 ... that's already _a lot_ of functionality, but we don't have a way of serving up files form the file system. __Let's write this up by creating a function that creates a middleware function... that will read a file based on a request path or call a `next` function to continue processing routes regularly__.

In your module, create a standalone function that returns a new middleware function. 

* again, this new middleware function will attempt to read a file from disk based on the request path
* if it exists / there are no erros in reading, the file will be served by sending back an appropriate http response (and the `routes` defined in the `App` object will be skipped)
* if it doesn't exist, then the rest of the `routes` will checked to see if a there's a match for the incoming request `method` and `path`

Write the following in `src/webby.js`:

<hr>

`serveStatic(basePath)`

* `basePath` is the location where your application should attempt to read files from 
* it returns a new function
    * the new function will have 3 arguments:
        * `req` - an instance of `Request` representing the incoming http request
        * `res` - an instance of `Response` representing the poential response
        * `next` - the next function to call
    * construct a path on the file system to attempt to read the file by using the `path` module and `path.join` (see the example code) on the `basePath` and the path from the `Request` object, `req.path`; 
        * for example, if `serveStatic` were called with `/projects/myname-homework03/public` and the incoming http request contained `/css/styles.css`, the resulting middleware function returned from `serveStatic` will attempt to read: 
            * `/projects/myname-homework03/public/css/styles.css`
        * use the two argument version of `fs.readFile` to read from the file system (⚠️ only pass in the path and the the callback, don't specify options or encoding!)
			* ⚠️ check out the [docs for fs.readFile first](https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback) 
			* ⚠️ here's some [sample code that combines the `net` module with `fs.readFile`](../examples/class07b/webServer.js)
			* ⚠️ finally, read [some notes on fs.readFile and `this`](03-sendfile-background.html)
        * if reading the file is successful, use the `Response` object passed in to send back the contents of the file that was read
        * HINT: use one / some of the `Response` object's methods to do this
        * you'll have to find a way to set the correct status and the right `Content-Type` in your response; it's adequate to use the extension of the file to determine a content type
    * if _any_ error occurs (it's adequate to check the `err` argument passed into the `fs.readFile` callback), such as the file not being found, then call the `next` function passed in with the `Request` and `Response` objects as arguments
        * this `next` function is likely going to be `processRoutes` from the `App` object above 
        * the implementation of this detail should aready be done in your `App` object within its `handleRequest` method
        * (remember, you have to be ⚠️ careful about making sure `this` is properly set)
* export `serveStatic` as `static` (this is the only function that you'll rename in your export...)
* example usage:
    <pre><code data-trim contenteditable>// use the middleware function returned from calling 
// serveStatic (named static off of the module)
// note that the basePath is set by using path.join(__dirname, ...)
// this is to set the path where files are read from  to
// the public folder in the project root
app.use(webby.static(path.join(__dirname, '..', 'public')));
</code></pre>

<hr>

### Testing your Middleware

At this point, all of the tests in `test/webby-test.js` should be passing... and you can use your new web framework!


## Part 2 - Your Animal Site 🐶🦎🦉🐬🐷



Choose an animal to create a site about. Go back to `src/app.js` and comment out your previous code. Write a new app (served from `localhost` on port `3000`) about an animal that responds to the following requests:

1. `GET /` - responds with a page that links to `/gallery`... this should be implemented using `app.get`
    <div markdown="block" class="img sample-site">![gecko web site home](../resources/img/hw03-gecko-03-home.png)
    </div>
2. `GET /gallery` - responds with a page that contains a random number of random images of an animal ... this should be implemented using `app.get`
    * there should be 1 to 4 images displayed
    * each image should be one of the following: `/img/animal1.jpg` through `/img/animal4.jpg`
    * they must all be `.jpg`
    * the same picture can show up twice
    <div markdown="block" class="img sample-site">
![gecko gallery 1](../resources/img/hw03-gecko-04-gallery-1.png)
    </div>
    <div markdown="block" class="img sample-site">
![gecko gallery 1](../resources/img/hw03-gecko-04-gallery-2.png)
    </div>
3. `GET /pics` - redirects to `/gallery` ... this should be implemented using `app.get` and with the callback setting the write status code and headers for a permanent redirect (check the [redirect article on mdn](https://developer.mozilla.org/en-US/docs/Web/HTTP/Redirections))
	* note that after the redirect, the browser address bar __will show the new address__ 
	* (that is, the browser will be coerced into making another request to the url that it is being redirected to)
4. `GET /css/styles.css` - serves up a stylesheet based on a static file contained in `public/css/`
5. `GET /img/animal1.jpg` ... up through `/img/animal4.jpg` - serves up four images of an animal

⚠️ serve your site on port `3000` using `127.0.0.1` or `localhost` as the port name

Hints:

1. first, test that your middleware is working correctly
    * activate your middleware using: `app.use(webby.static(path.join(__dirname, '..', 'public')));
    * drop some images in `public/img` and use your browser to go to `localhost:3000/img/animal1.jpg`
    * you should get your image back! (_nice_)
2. then, make sure regular routes work... so try implementing `/` (make sure that your middleware is bypassed, and your route handler is called instead)
3. ⚠️for the redirect, test your work in incognito mode
    * make sure you read up on [redirects](https://developer.mozilla.org/en-US/docs/Web/HTTP/Redirections))
    * your browser should immediately go to `/gallery`
    * optionallly, use `curl` or `nc` to ensure that you're getting the right response back (check the status code and the headers) ... in this case, `nc` and `curl` won't go to `/gallery` but it will show you the response that you should make next (which, of course, is `/gallery`)
4. `/gallery` will be a bit tricky:
    * when defining your route for `/gallery` with `app.get`, the callback function should contain logic to generate html
    * the html will be conditionally generated based on random number generation with `Math.random` to determine both the number of images, and which images to show

### Troubleshooting

1. If your browser doesn't show anything, and it looks like it's waiting for a response, make sure that `sock.end` is called somewhere.
2. If html is showing up as text (that is, you see the tags / mark-up in the page itself), double check that you've set the content type correctly.
3. If you see an error in the terminal window that runs your server that says: `Error: This socket has been ended by the other party`, it likely means that `sock.end` was called more than once (you can only end a connection once! ...so calling `sock.end` multiple times on the same socket will result in an error)
4. If your browser does not display the resource and instead shows an error that says empty or invalid response, then that means that a valid http response is not being sent back or no data was sent back (use `curl`, `nc` or your browser's network tab to check the response)
5. if an image is broken: 
  * it's likely an issue with content type or reading the image as binary data - make sure that the status line and headers are written first, then the data of the body written afterwards
 * or perhaps not having the newline written between the headers and the body
 * or it could be inadvertently converting the body into a string by writing the headers and the body all at once
 * or inadvertently adding extra data into the body 

</div>

</div>

