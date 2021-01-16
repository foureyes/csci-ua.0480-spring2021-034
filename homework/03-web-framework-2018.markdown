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

# Creating a Tiny Web Framework, Due <strike>Monday, Feb 19th by 11PM</strike> __Wednesday, Feb 21st by 11PM__

⚠️⚠️⚠️NO GRACE PERIOD⚠️⚠️⚠️ 

Extended due to length of homework.


## Overview

### Description

There are two major parts to this assignment:

1. create a simple web server and website by using the `net` module
2. move the functionality from part 1 into classes so that they your code can be reused as a library for making web apps without having to deal with low-level `net` module code

By the end of both parts, you'll have a _toy_  web framework that allows a developer to write simple web applications. 

Again, both parts will be built off of and run from node's built-in TCP server (from the `net` module).

__You can only use the following two modules for this assignment__ &rarr;

1. `net` - a module for creating TCP servers and clients
2. `fs` - a module for file system related tasks, such as reading and writing files

__You can't use the `http` module... or install additional frameworks, such as `express`__

### Submission Process

You will be given access to a private repository on GitHub. It will contain: 

1. stub source files in the `src` directory
2. some testing assets in the `public` folder
3. unit tests in `test`
4. linting files `.eslintrc`, etc.
5. __you'll have to create your own `package.json`__

* __Push__ your changes to the homework repository on GitHub.
* Commits later than the deadline will not be included in grading

### (4 points) Make at Least 4 Commits

* Commit multiple times throughout your development process.
* Make at least 3 separate commits - (for example, one option may be to make one commit per part in the homework).


## Part 1 - An Introduction

In this part, you'll familiarize yourself with the `net` module by creating a simple server that responds to http requests. You'll use events and callback functions to handle a new client connection, data arriving on a socket from a client, and a connection being closed.

Work with the following files:

1. `src/intro.js` - your web server (run this file to serve your site)
2. `src/webutils.js` - a module that contains helper functions 

You'll start off by writing some helper functions. Then at the end of this part, you should have an application that uses those helper functions to respond to the following requests:

1. `GET /` - responds with a page that contains links to other pages and a form
2. `GET /such/stylish` - responds with a page that includes a stylesheet
3. `GET /css/base.css` - responds with a stylesheet
4. `GET /picsplz` - responds with a page that includes an image
5. `GET /img/animal.jpg` - responds with an image of your favorite animal
6. `GET /showanimage` - responds with a redirect to `picsplz`
7. `POST /` - responds with the body of the post request as plain text       
8. A request that isn't `GET` or `POST` - a `405` is sent back saying that the method is not allowed 
9. A request that is a `GET` or `POST` but does not have a matching path - a `404` is sent back saying that the resource/page was not found

Before starting, __make sure to review the course materials on the net module and creating tcp/ip servers__:

1. check out the [slides on the `net` module](../slides/06/sockets.html#/2), paying close attention to the [the last slide](../slides/06/sockets.html#/10).
2. go over the [notes from previous classes](../examples/class06/notes.js)
3. lastly, make sure that you can write back a valid http response by reviewing::
    * [the slides on http](../slides/05/web.html#/16)
    * [and an example response](../slides/05/web.html#/24)

### Create helper functions

Start by creating some helper functions in `webutils.js` to ease development. Export these function so that You can use them in `intro.js`. Minimally, implement the following functions (of course, you can create more functions, as the functions will only help with a subset of the part 1's requirements).

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
const ext4 = getExtension('foo'); // ext4 --> empty string
```

### `sendTextFile(fileName, sock)`:

__Parameters:__

* `fileName` - a string representing the name of the file (relative to a directory called `public` within the root of your project directory)
	* example `/css/base.css` would read the file `PROJECT_ROOT/public/css/base.css``
* `sock` - a socket object to write data to

__Return:__

* no return value 

__Description:__

Sends back an http response with the data from the text file specified as the response body (along with appropriate headers and status line). The `sock` object will be used to write the http response back to the client.

Use `fs.readFile` to read the data from the file from the path passed in: 

1. the path, `fileName` will be relative to a folder called `public` in your project's root directory
	* the built-in variable, `__dirname` contains the directory that your program is running from
	* for example, if you're running your project from `/Users/foo/abc123-homework03/src`, then `__dirname` will contain that path
	* you can assume that your program, `intro.js` will be run directly from the `src` folder in your project's root
	* consequently, to read `fileName` from `public`, you'll have to use a combination of `__dirname` and `..` to go up one directory to your project root
	* for example, to construct the absolute path to the file, concatenate or use [path.join](https://nodejs.org/api/path.html#path_path_join_paths) from the `path` module to put together: `__dirname`, `..`, `public`, and `fileName`
2. you can assume that the file you are reading is `utf8`, so use that as the 2nd argument to `fs.readFile`
3. in the callback to `fs.readFile` use the `socket` object that was provided as an argument to the original function to write out a response.

The response should be a valid http response:

1. start with the status line (using the appropriate status code)
2. include any headers 
	* hint: `Content-Type` may be useful 
	* [see the mdn page on MIME types for possible values](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) for `Content-Type`
	*  use the appropriate value for the extension of the text file being sent
	* you can assume that we will only be serving stylesheets, html and plain text
	* creating a mapping from extension to `MIME` type may be helpful
3. make sure that there's an empty line between the headers and the body of the response (remember `\r\n\r\n` separates the body from the status line and headers)
4. use the text from the file as the response body
5. write all of this out to the client using the `socket` object passed in
6. and finally, use the `socket` object to end the connection

{% comment %}_ {% endcomment %}

If any error occurs while reading the file, don't send back the contents of the file. Instead... send back a response that:

1. let's the client know there was an error
2. use an appropriate status code and description in the status line of your response
3. include a plain text body that describes the status code

Example usage:

```
sendTextFile('/css/base.css', sock); 

// reads /path/to/project/public/css/base.css
// the resulting response should be something like (with new lines as \r\n\r\n):
// HTTP/1.1 200 OK
// Content-Type: text/css
// 
// h1 {color: red;}
```

### `sendImage(fileName, sock)`:

__Parameters:__

* `fileName` - a string representing the name of the file
* `sock` - a socket object to write data to

__Return:__

* no return value 

__Description:__

This function is similar to `sendTextFile` described above, but instead of reading a plain text file, it will read image data and send it as the response body. The requirements and specifications for `sendImage` differ from `sendTextFile` in the following ways:

* because an image is being read, omit the second argument, encoding, or set it to an empty object for `fs.readFile` so that the raw buffer is given instead of an encoded string: 
	* `fs.readFile('/img/foo.jpg', (err, data) => {});` 
	* `fs.readFile('/img/foo.jpg', {}, (err, data) => {});`
* just like `sendTextFile`, you'll have to send back the appropriate http response status line and headers... so that means you have to send the right `Content-Type` 
* this function should support: `jpg`, `jpeg`, `gif`, and `png` ([again, check out the mdn article on MIME Types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types)
* __IMPORTANT__: when sending a response, __you must `write` the response status line, headers and empty line to the `socket` object first__, and then, __only afterwards, `write` out the raw buffer image data__ (essentially, you'll be calling `write` twice)... __DO NOT CONVERT THE IMAGE DATA TO A STRING__
	* also check out the [class notes for additional examples](http://localhost:4000/examples/class06/notes.js)

### Testing Functions

Once your finished with your implementation above, you can export, test and try using your new functions.

Export the functions using `module.exports`, and try running the tests in test/webutils-test.js

* make sure that `mocha` is installed as in previous assignments 
* install dev dependencies to run tests: npm install \-\-save-dev chai sinon mocha-sinon (you can ignore any unmet peer dependency warnings)
* `mocha test/webutils-test.js`



### Create Pages

Now that you have some helper functions, you can create a web server and put together a few pages! Open up `src/intro.js` to: 

1. create a simple web server 
	* check out the [echo server example](../examples/net/echoServer.js)
	* __make sure your server is running on port 8080__
2. the web server should respond to http requests (see the pages / requests that your server should support after this set of instructions)
	* review the [sample web server](http://jvers.com/csci-ua.0480-spring2018-008/examples/net/webServer.js) code from the course site
	* also check out the [class notes for additional examples](http://localhost:4000/examples/class06/notes.js)
	* of course, bring in your `webutils.js` to help with this (again, you can create more helper functions in addition to the ones required from the instructions above)
	* if you are using `sendTextFile` or `sendImage`, then make sure to drop your files in the `public` folder of your project root
3. to run your server, change to the `src` directory in your project root and run `node intro.js` (note that your terminal will look like its "frozen", but it's really just waiting for requests).
4. use the following to test your server
	* `curl -i localhost:8080/path/to/page` to test your server.
	* enter the url in your browser 
5. To shutdown your server, CTRL + c in your terminal...

The pages / requests that your web server should handle include: 

__A Homepage With Links__

* modify your server so that it responds to `GET /` 
* it should give back an html document
* the document should contain links to the following pahts
	1. `/such/stylish`
	2. `/picsplz`
	3. `/showanimage`
* it should also contain this form (which will be used later to create a POST request):
	<pre><code data-trim contenteditable>&lt;form method="POST" action=""&gt;
&nbsp;&nbsp;&nbsp;&nbsp;Name: &lt;input type='text' name='name'&gt;
&nbsp;&nbsp;&nbsp;&nbsp;&lt;input type="submit"&gt;	
&lt;/form&gt;</code></pre>
* you can use one of your helper functions from `webutils.js` to implement this, or manually `write` out an http response with html as the body
* if you're not getting the response you expect (your browser doesn't show the page, only shows plain text, etc.), check out the [troubleshooting section below](#troubleshoot-part1)
* example (your text does not have to match exactly, but there should be three links and a form):
	<img src="../resources/img/hw03-web4u-01-home.png">

__A Styled Page__

* modify your server so that it responds to: 
	1. `GET /such/stylish` 
	2. `GET /css/base.css` 
* `/such/stylish` should respond with an html document that includes a [link tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link#Examples) that includes a css file
* the css file that it should include is `/css/base.css`
* `/css/base.css` should respond with a stylesheet
	* add styles to `/css/base.css`
	* minimally, you stylesheet should change the colors of the text so that it's not the default color, black
	* you can add any other styles that you like
* you can use one of your helper functions from `webutils.js` to implement this, or manually `write` out an http response with the appropriate body (html and css respectively)
* example (note that the styles are from `/css/base.css`, but the page is `/such/stylish`)... you can style this page any way you like, but minimally, change the colors of the text (you don't _have_ to add borders or a background):
	<img src="../resources/img/hw03-web4u-02-style.png">

__A Page with an Image__

* modify your server so that it responds to:
	1. `GET /picsplz` 
	2. `GET /img/animal.jpg`
* `/picsplz` should respond with an html document that includes an [img tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#Examples)
* includes some text describing the image
* the image that it should bring in is `/img/animal.jpg`
* `/img/animal.jpg` responds with an image (jpg) of your favorite animal
* you can use one of your helper functions from `webutils.js` to implement this, or manually `write` out an http response with the appropriate body (html and an image, jpg, respectively)
* if your image doesn't work, check out the [troubleshooting section below](#troubleshoot-part1)
* example:
	<img src="../resources/img/hw03-web4u-03-image.png">

__A Redirect__

* modify your server so that it responds to: `GET /showanimage` 
* this will result in a permanent redirect to `/picsplz`
* make sure to use the correct status code and headers
* the body can just be plain text with a message specifying that a permanent redirect is in place
* to test:
	* go to `/showanimage` with curl
	* the response should have the appropriate status code and headers
	* use your browser to go to `/showanimage`
    * the url bar should go to `/picsplz`
	* use incognito mode or clear your cache to make sure that the redirect is not cached when testing
* you'll have to manually `write` out an http response and `end` the connection to implement a redirect as response... or add a helper function to `webutils.js` that does this
* example (note that the initial response should be a 301, at which point your browser is redirected to `picsplz`, which is what will appear in the url bar):
	<img src="../resources/img/hw03-web4u-05-redirect-02.png">

__Handling a POST Request__

* modify your server so that it responds to: `POST /`
* it should respond with a plain text document that shows the _body_ of the original POST request (which means that you should parse out the body of the request that you received)
	* of course, make sure you send back the appropriate status code for a successful response
	* along with any necessary headers
* to test:
	* submit the form from `/` by filling in the text field and clicking the submit button
	* this should result in a `POST` request from your browser
	* you should see a plain text result that containts name=whatever_you_typed
	* alternatively, use `curl -i localhost:8080 -d name=whatever_you_typed` to initiate a POST request from curl
* you'll have to manually `write` out an http response and `end` the connection to implement this... make sure to include the body that was parsed out of the request as part of the response!
example (entering data in the form in `/` should display the form data that was entered):
	<img src="../resources/img/hw03-web4u-07-post.png">


__Handling Bad Requests__

Finally, handle the following error conditions:

* if a request has a method that's other than `GET` or `POST`, send back a `405` with a plain text body saying that the method is not allowed 
* if a request is a `GET` or `POST`,  but it does not have a matching path, send back a `404`  with a plain text body saying that the page was not found
* both of these can be implemented by manually using `write` and `end` on the socket object to write back the appropriate response... or you can write a method that does this in your helper functions module
* an example of a 405 using `nc` to send a request that's not `GET` or `POST`:
	<img src="../resources/img/hw03-web4u-09-405.gif">
* an example of a 404 using curl:
	<img src="../resources/img/hw03-web4u-10-404.gif">

__Everything Together__

Once you've finished up all of the paths specified, an example interaction may look like this:

<img src="../resources/img/hw03-web4u-08-all.gif">

<span id="troubleshoot-part1" name="troubleshoot-part1"></span>

### Troubleshooting

1. If your browser doesn't show anything, and it looks like it's waiting for a response, make sure you're calling `sock.end`.
2. If html is showing up as text (that is, you see the tags / mark-up in the page itself), double check that you've set the content type correctly.
3. If you see an error in the terminal window that runs your server that says: `Error: This socket has been ended by the other party`, it likely means that `sock.end` was called more than once (you can only end a connection once! ...so calling `sock.end` multiple times on the same socket will result in an error)
4. If your browser does not display the resource and instead shows an error that says empty or invalid response, then that means that a valid http response is not being sent back or no data was sent back (check the format of your response by printing it out, check for calls to `write` and `end` where appropriate)
4. if an image is broken: 
	* it's likely an issue with content type or reading the image as binary data - make sure that the head is written first, then the data of the body sent afterwards
	* or perhaps not having two \r\n's between the headers and the body
	* or it could be inadvertently converting the body into a string by writing the headers and the body all at once
	* or inadvertently adding extra data into the body 

## Part 2 - `Request`, `Response`, and `App` Classes... and a Small Site!

Although we abstracted out some of common tasks into function in part 1 of this assignment, there was still a lot of manual work that needed to be done, and it felt like an _incomplete_ API for creating web applications.

Let's use some JavaScript language features to create a nicer library for creating web applications. We'll create this framework in `src/webframework.js` 


### About the Framework

Your framework (`webframework.js`), will be built off of node's `net` module. It'll use the `net` module to create a TCP server that will allow connections from clients. The code that you'll write will handle an incoming http request from a client by parsing the http request, determining what do based on the request, and finally sending back an http response. You'll do this by creating these objects (you can create more objects, but these 3 must be present):

1. `Request` - an object that represents an http request
2. `Response` - an object that represents an http response... and has the ability to actually send back a response to the client
3. `App` - represents your web application; takes incoming requests and determines what to do based on path, method, etc. ... 

You can use the objects that you create to write simple web applications. Here are some example of how you might use `webframework.js`. Again, __you are making the library / objects / module__ that makes the following possible:

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

In `webframework.js`...

1. create a `Request` object to encapsulate http requests
2. create a `Response` object to encapsulate http responses; this object will be able to:
	* send http responses back using a socket object
	* read files from the file system to send back
3. create an app object that encapsulates your server...
    * add application level functionality, such as routing
4. use your objects to create a simple site!

You'll build off of your experience from part 1 by refactoring your code and encapsulating the functionality that you previously created in classes and methods.

### Create a `Request` Class

In this section, you'll fully implement a `Request` object. You'll then conditionally serve up different content based on the `path` specified by the request.  The `Request` object __represents an http request__. It can take an http request as a string, parse out information about that request and expose that information as properties (such as `method`, `path`, and `headers`). It assumes HTTP/1.1

Create the `Request` _class_  by implementing the following in `webframework.js`:

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
</code></pre>

<hr>

### Testing / Using the `Request` Object

Once your finished with your implementation above, you can export, test and try using your new `Request` object.

1. Export the object using `module.exports`, and try running the tests in test/webframework-test.js (comment out the other tests) ... run from within `test` folder
    * make sure that `mocha` is installed as in the previous part
    * install dev dependencies to run tests: npm install \-\-save-dev chai sinon mocha-sinon (you can ignore any unmet peer dependency warnings)
    * `mocha test/webframework-test.js`
2. This request object can be used to parse the binary data that is passeed in to the callback function `someCallback` in `sock.on('data', someCallback)`
3. Now you can use the resulting `Request` object's `method` and `path` properties  to conditionally execute code     
	* `const req = new Request(binaryData.toString());`
	* `if(req.method === 'GET' && req.path === '/foo') { }`

### Create a `Response` Class

Instead of directly calling  `write` on the`socket` object, wrap the `socket` up in a `Response` object and use that to send data to the client. Notice that all of the `methods` called on socket are being being called by equivalent methods on your `Response` object.

The `Response` object represents an http response, and it allows direct manipulation of the underlying socket that represents the current connection for the http request/response. It can hold data about an http response, turn that data into a valid http response... and send that data back to the client (as well as close the connection between the server and the client).

Create a `Response` _class_ based on the [specifications below](#response).  

* Note that it may be useful to keep an object that maps status codes to short descriptions ({"200": "OK", "404": "Not Found"})
* You can run unit tests as you work, as usual, by adding the object to `module.exports`, and running the tests in test/webframework-test.js
    * again ... `mocha test/webframework-test.js`
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
        * `301` - `Moved Permanently`
        * `302` - `Found`
        * `303` - `See Other`
        * `400` - `Bad Request`
        * `404` - `Not Found`
        * `405` - `Method Not Allowed`
        * `500` - `Internal Server Error`
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
8. `sendFile(fileName)` and `handleRead(contentType, err, data) - `sendFile` will use the logic in `handleRead` as part of its callback to send the file specified by `fileName` (which will be searched for in `$PROJECT_ROOT/public`) to the client by setting the appropriate content type, writing the data from the file... and immediately closing the connection after the data is sent
	* __this is essentially just the `sendTextFile` and `sendImage` functions from part 1 combined into a single method!__
	* implementation details for both these functions are below:

#### Implementing `sendFile` and `handleRead`

These two methods will be used to send back a file in an http response:

* `sendFile(fileName)` - determines the types of file and then attempts to read a file (this function does not return a value)
*  `handleFileRead(contentType, err, data)` - used to handle the result of attempting to read a file; it'll send back an appropriate response: either a successful response with the file contents as part of the response body or a response the specifies a server error if the file was not successfully read (this function does not return a value)

To implement these methods:

1. In `sendFile`,  search for the `fileName` passed in as an argument within the `public` folder in the root of your project directory: determine the absolute path to the file name that's passed in by using `__dirname` to find the directory of the running application... and go up one so that `public` can be accessed
	* you can pass everything to `path.join` (as in the previous part)
    	<pre><code data-trim contenteditable>const filePath = path.join(__dirname, '..', 'public', '/html/foo.html');
// assuming OSX file system, with projects/homework03 in home directory
// the above code yields:
// /Users/username/projects/homework03/public/html/foo.html
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
3. Call `fs.readFile` with:
    * the absolute path that you created
    * if the file is text, then pass in an encoding (assume `utf8`) as the second argument, otherwise... if the file is an image, then don't specify an encoding by omitting this argument (it's ok to rely solely on extension to determine a text file or an image file)
	* the last argument to `fs.readFile` should be a callback function
		* note that this callback should _make use of the_ `handleRead` method defined in the same `Response` class as `sendFile`
4. `handleRead`, (again, a method in the `Response` object) should take a `contentType`, `err` and `data` as its arguments... 
	* note that the callback for `fs.readFile` usually accepts two arguments... and within your callback, you may want to access the instance (`this`) that `sendFile` was originally called on (for example, you may want to call other instance methods, such as `writeHead`, `end`, etc.)
	* to solve this, __you must wrap a call to `handleRead` in an arrow function__ when passing it in as a callback to `fs.readFile`
	* using an arrow function as the callback (that calls `handleRead`) will set `this` appropriately and deal with the mismatch of number of arguments between the callback needed for `fs.readFile` and `handleRead`
	* ⚠️⚠️⚠️[READ THIS BACKGROUND MATERIAL](03-sendfile-background.html)⚠️⚠️⚠️ on using methods as callbacks and changing the number of parameters to a function/method before using the example code below 
		* this background material also covers bind as part of a potential solution
		* however, __use arrow functions instead, as shown below__
	* here's the code you'll need within the context of `sendFile` and `handleRead` method definitions:
		<pre><code data-trim contenteditable>sendFile(fileName) {
  // determine contentType
  const contentType = 'code to determine content type goes here';<br>
  // handle read has three arguments, but readFile's callback only sends 
  // two arguments... so wrap in an arrow function and call handleRead 
  // with the contentType that's in scope this also has the side effect 
  // of using the this that was within scope when the arrow function was 
  // created (which is the correct this - the instance that sendFile was 
  // called on)
  fs.readFile(filePath, readFileOptions, (err, data) => {
&nbsp;&nbsp;&nbsp;&nbsp;this.handleRead(contentType, err, data)
  }<br>
  // ...rest of method implementation
}<br>
handleRead(contentType, err, data) {
  // use Response instance methods like:
  // this.writeHead, this.setHeader, this.end, etc.
  // to send back the file as the body of an http response
  // or send back an 500 server error if an error occurs while reading the
  // file
}
</code></pre>
5. Call the appropriate `Response` object methods from within `handleRead` to send back a response; note that the methods must be called __in this order__ &rarr;
    1. set the `Content-Type` header
    2. send everything but the body by calling `this.writeHead(200)`
    3. write the data that was passed in as an argument to the callback to the socket (that is, write the data from the file)
    4. close the connection
    5. why write the headers and the body separately? This avoids any issues where the binary data of the image is inadvertently converted to a string.
	6. (again, this mimics what you implemented in part 1, but with both functions, `sendTextFile` and `sendImage` merged into a single method that handles both types of tiles)

6. Example Usage for `sendFile`:
    <pre><code data-trim contenteditable>// assuming there's a directory called public/css in your project's root...
res.sendFile('/css/base.css');
//
// note that the url does not have to match the name/path of the file being read!
</code></pre>

<br>

### Testing / Using the `Response` Object


Once your finished with your implementation above, you can export, test and try using your new `Response` object.

1. Export the object using `module.exports`, and try running the tests in test/webframework-test.js (comment out the other tests... and run `mocha` from within `test` folder)
2. This `Response` object can be used replace manual calls to `write` and `end` on the socket object (since it wraps the socket object itself!)
3. For example: `const res = new Response(sock); // pass in a socket object` ...
    * Call to your `Response` object's `setHeader` method to set the content type: `res.setHeader(...)`
    * Call to your `Response` object's `send` method to send the response back with the appropriate body: `res.send(200, ...);`
    * Call to your `Response` object's `end` method to close the connection
	* etc.

<br>

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

app.post('/hello', function(req, res) {
    res.send(200, 'Got a POST request');
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
2. `routes` - an object that maps methods and paths to callback functions
	* you can set this up any way you like
	* for example, you can concatenate method and path to use as a property
	* or you can have nested objects, where method is a top level property... and then paths properties of a nested object under the method property

<hr>

#### Methods

1. `get(path, cb)` - adds `GET` and `path` to "key" into `routes`... the value of which is the callback function, `cb` 
    * `path` - the path to respond to (that is, a valid path for the web application)
    * `callback` - the function called when a `GET` to this `path` is requested (essentially... what to do when a specific path is asked for)
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
2. `post(path, cb)` - adds `POST` and `path` to "key" into `routes`... the value of which is the callback function, `cb` 
    * `path` - the path to respond to (that is, a valid path for the web application)
    * `callback` - the function called when a `POST` to this `path` is requested (essentially... what to do when a specific path is asked for)
        * the callback function will take two arguments
        * a `Request` object
        * a `Response` object
        * `cb(req, res) ...`
    * no return value
    * example usage:
        <pre><code data-trim contenteditable>app.post('/hello', function(req, res) {
    res.send(200, 'Got a POST');
});
</code></pre>
3. `listen(port, host)` - binds the server to the given `port` and `host` ("listens" on `host`:`port`)
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


### Using Your `Request`, `Response`, and `App` Classes

Create a small site using your framework. __The site should be a fan site about one of your favorite characters from a book, movie, or television show__. It must adhere to the technical specifications below, but _actual content_ is your discretion). 

In a file called `better.js`, create a site that responds to the following requests: 

* `GET /` - a homepage that contains links to `/form, `/random`, and `/rando`
* `GET /css/base.css` - a css file linked to by every document on your site (style any way that you like, as long as it's obvious that the page is styled)
* `GET /image1.jpg` - a jpg (the path must be as specified) of your favorite character
* `GET /image2.gif` - a gif (the path must be as specified) of your favorite character
* `GET /image3` - an image...format does not matter, gif, jpg or png, but make sure there's no extension in the url path (the file on the file system may have an extension, though)
* `GET /random` - a page that displays a random image using an `img` tag; this must be an html page with no client side JavaScript... the server will generate a random image url to be displayed
	* this might be tricky to do by using `sendFile`
	* so... in this case, it may be best to put together a string containing the html... and changing the image `src` with a conditional
	* alternatively, you can attempt to implement templating (perhaps create a separate `Response` method that will read the contents of a file and substitute portions of it)
* `GET /rando` - a permanent redirect (a 301) back to `random`
* `GET /form` - a page with the following form markup (note that pressing the submit button will cause a `POST` request to be submitted to `/form`:
	<pre><code data-trim contenteditable>&lt;form method="POST" action=""&gt;
	&lt;div&gt;
		Character: &lt;input type="text" name="character" value=""&gt;	
	&lt;/div&gt;
	&lt;div&gt;
		Quote: &lt;input type="text" name="quote" value=""&gt;	
	&lt;/div&gt;
	&lt;div&gt;
		&lt;input type="submit"&gt;	
	&lt;/div&gt;
&lt;/form&gt;</code></pre>
* `POST /form` - parse the body of the incoming `POST` request (the body should contain the form input element names and their values) and display __only the values__ in plain text
	* the form above contains a couple of text inputs, `character` and `quote`
	* when the form is submitted, it will take the values of the text inputs and combine them with the names of the inputs in the following format (assuming that `foo` and `bar` are entered):
	* `character=foo&quote=bar` - note that the form input elements names and their values are joined with an equal sign, `=`
	* name and value pairs are joined with an ampersand: `&amp;`
	* __only display the values (not the names)__ ... in the case above, only `foo` and `bar` would be displayed in plain text

To create your site:

1. Bring in your module and create a new `App` object: 
    <pre><code data-trim contenteditable>const App = require('./webframework.js').App;
const app = new App();
2. Add routes as necessary... 
    <pre><code data-trim contenteditable>app.get('/', function(req, res) {
  // ... do stuff here when a GET request to / is received
});
app.post('/form', function(req, res) {
  // ... do stuff here when a POST request to /form is received
});</code></pre>
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


<img src="../resources/img/hw03-web4u-11-all.gif">

</div>

</div>
