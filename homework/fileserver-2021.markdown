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

{% comment %}
<div markdown="block" class="img">
![gecko web site](../resources/img/hw03-gecko-00-animation-resized.gif)
</div>
{% endcomment %}

<div class="panel panel-default">
	<div class="panel-heading">Homework #3</div>
	<div class="panel-body" markdown="block">

# A Simple Web Server, Due <strike>Monday, Oct 5th</strike> __Tuesday, Oct 6th at 11PM__


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

Create a web server that serves files from a directory using only the `net` and `fs` modules.

__⚠️ Projects using the `http` module or any other frameworks, such as `express`, koa, etc. ... will not not receive credit.__

### Submission Process

You will be given access to a private repository on GitHub. It will contain: 

1. stub source files in the `src` directory (`fileserver.js`)
2. stub source files in the `public` folder for html, css, and sample images
3. stub `README.md` in the root of the project folder
3. if `.eslintrc.js` isn't present, you can copy over your linting configuration `.eslintrc.js` from homework 02

__Push__ your code to the homework repository on GitHub. Repositories will close, so make sure you push your changes before the deadline.

### Make at Least 4 Commits

* Commit multiple times throughout your development process.
* Make at least 4 separate commits - (for example, one option may be to make one commit per part in the homework).

## Requirements


### The entry point to your program / web server should be `src/fileserver.js`

* The program should runnable by going into the `src` directory and running `node fileserver.js rootDirectory` from the `src` directory... 
 	* `rootDirectory` is an argument supplied to your program when it is run
	* The program should use [`process.argv`](https://nodejs.org/docs/latest/api/process.html#process_process_argv) to capture this first argument 
* The `rootDirectory` argument specifies the directory to "serve files from"
	* The `rootDirectory` path will be treated as if it were relative to the location of `fileserver.js`
	* You can use [`path.join`](https://nodejs.org/api/path.html#path_path_join_paths) and [`__dirname`](https://nodejs.org/docs/latest/api/modules.html#modules_dirname) if you'd like to construct an absolute path to the root directory
	* If the directory cannot be opened, the server should not start, and instead show an error message `"Directory not found"`
	* Use [`fs.access` to check for the existence of a directory](https://nodejs.org/docs/latest/api/fs.html#fs_fs_access_path_mode_callback) 
* Any references to files within your implementation should be portable (that is, the program should be runnable on computers other than your own...) 
	* This means that hardcoded paths like `/Users/myusername/Desktop` should not be used
	* [`__dirname` may be useful when formulating _portable_ paths](https://nodejs.org/docs/latest/api/modules.html#modules_dirname) (it gives the absolute path to the running module)
	

### The server should serve files from `rootDirectory`

Use only the `net` module and the `fs` module to create a server that:

1. Listens on port 3000
2. Accepts http `GET` requests
3. Uses the path in an HTTP request to search for a file in `rootDirectory`
	* Assuming `$PROJECT_ROOT` is where you've cloned your repo
	* And `$PROJECT_ROOT/public` contains a folder called `css`
	* And... within the `css` folder is a file called `base.css`
	* Starting your server with `node fileserver.js ../public` from the `$PROJECT_ROOT/src` directory
	* And requesting the URL `localhost:3000/css/base.css` from a browser
	* Would lead to `base.css` (from `$PROJECT_ROOT/public/css`) being read from the file system and served as the body of the http response
	* ⚠️ Note that `public` is not in the URL, yet is present when reading the file from the file system... because it was specified as the root directory using `../public` 
5. Check if the file specified in the URL path exists
	* Use [`fs.access` to determine if the file exists in your `rootDirectory`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types)
	* If it doesn't exist, send back a `404`
6. Determine whether the path is a directory or a file 
	* Use the following functions, objects and methods to do this (each name below is a link to nodejs documentation)
		* [`fs.lstat`](https://nodejs.org/docs/latest/api/fs.html#fs_fs_lstat_path_options_callback)
		* `lstat`'s callback is invoked with a `stats` object, from which you can call `isDirectory` and `isFile`
		* [`stats.isDirectory`](https://nodejs.org/docs/latest/api/fs.html#fs_stats_isdirectory)
		* [`stats.isFile`](https://nodejs.org/docs/latest/api/fs.html#fs_stats_isfile)
	* If there's an error using `lstat`, then send back a 500, with the body as an error message, `Error from lstat`, to be interpreted by the browser as plain text
4. If the path specified is a file, serve the file requested ... as the body to a valid HTTP response
	* Use `fs.readFile` to read the file (make sure not to specify encoding, and leave the data as a `Buffer` object)
	* When using `sock.write` to send a response...
		* ⚠️ __Write the status line and headers first to the socket__
		* ⚠️ __Then use another call to `write` to write the body__
		* ⚠️ __Do not concatenate the body to any other string to make sure image data is sent appropriately__
		* Newlines should be represented as `\r\n`
		* Remember that the separator betweent the headers and the body is `\r\n\r\n`
5. Use the correct `Content-Type` value for the file that is being served when constructing your HTTP Response
	* [See the MDN Article on MIME types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) for appropriate values for the `Content-Type` header
	* For our simple server, it is adequate to use the extension of the file to determine the appropriate MIME type
	* Using the last part after a dot `.` in the file path is sufficient for determining extension
	* ⚠️ Your server only has to support the following files: 
		1. `jpeg` (or `jpg`), `png`, and `gif` images
		2. `html`, `css`, and `plain` text files
6. If the path specified is a directory show a directory listing
	* Send back a dynamically created html page
	* The page should show the files in the directory
	* Use [`fs.readdir`](https://nodejs.org/docs/latest/api/fs.html#fs_fs_readdir_path_options_callback) to get the contents of the directory
	* ⚠️ The documentation above shows that `readdir` can be called with an options object, `{withFileTypes: true}` so that the callback get a list of "Directory Entry" object (`dirent`) rather than just file names that are strings
7. Each entry in the directory listing should be a link to the _actual_ file 
	* The `href` value should be a relative link
	* If the link is to a directory, it should end in `/`
	* `/dirname` without a trailing `/` in the URL should be supported, but links from there are not required to work (since they're all relative)
	* Clicking on the link should cause the server to send back that specific file or directory
	* To determine whether or not an entry is a directory, use the [`dirent.isdirectory()` method](https://nodejs.org/api/fs.html#fs_dirent_isdirectory)
	* Use [`dirent.name` (as a property)](https://nodejs.org/api/fs.html#fs_dirent_name) to get the name of the entry (file / directory)
8. Give back a `500` error... 
	* If the `error` (typically named `err`) exists when the callback for `lstat`, `readdir` or `readFile` is executed
	* The body of the 500 response should be a plain text document that specifies which function the error occurred in 
	* For example `Error from readdir`
9. Lastly your implementation must include:
	* At least one other module (file) - other than `fileserver.js` - of your own creation that contains helper functions and/or classes
	* At least two classes
	* The module can contain the classes (fulfilling all requirements above)
	* The module and class should be _useful_ for your application (for example, a class that represents MIME types... or a class that completely encapsulates your file server)
	* These must be documented in `README.md` (see below)

### Bare minimum _security_

⚠️⚠️⚠️  __Do not allow the client to access a file outside of `rootDirectory`__

* What kind of URL may be used to do this?
* A browser may not be able to perform this exploit, but `nc` or `curl`
* Try to prevent this (your app may already do this... so, in that case, everything's ok!)
* Document this in your `README.md`

### Trying out your file server!

Your repository should have a structure similar to the one below

```
├── public
│   ├── animal.html
│   ├── css
│   │   └── base.css
│   ├── gallery
│   │   └── index.html
│   └── img
│       ├── animal1.jpg
│       └── animal2.jpg
├── src
│   └── fileserver.js
```

* Running `node fileserver.js ../public` from within the `src` directory should make it so that the URL, `localhost:3000/img/animal1.jpg` serves `animal1.jpg` from the `public` folder.
* Additionally, the URL, `localhost:3000/gallery/` should list the file `index.html` as a clickable link... that, when clicked on, serves `index.html`

__Finish the following html and css files__

1. `css/base.css`: 
	* Add css rules in this file... 
	* You can add as few or as many as you like, as long as it's obvious that elements are styled
2. `animal.html`: 
	* Add html to [bring in `css/base.css`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link) for styling... 
	* Add a link to `gallery/index.html` 
	* Add any animal related content here (like your favorite animal or a narwhale eating a bagel) with an html element (such as an `H1` tag)
3. `gallery/index.html`: 
	* Add html to [bring in `css/base.css`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link) for styling... 	
	* Embed the images in the `img` directory using an `img` tag ... 
	* Feel free to overwrite `animal1.jpg` and `animal2.jpg` with images of your favorite animal

__Directory structure and running the server__

<div markdown="block" class="img">
![directory structure and running the server](../resources/img/hw03-fs-01-small.gif)
</div>

__Viewing the website__

<div markdown="block" class="img">
![viewing the website](../resources/img/hw03-fs-02-small.gif)
</div>

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

Drop files into the appropriate subdirectories in `public` so that if you were to run your server from `src` using `node fileserver.js ../public`, the following urls will work:

1. localhost:3000/


### Documentation and linting

1. ⚠️ Document the location of your module and classes in the `README.md`
2. [See the github docs on linking to lines of source code](https://help.github.com/en/github/managing-your-work-on-github/creating-a-permanent-link-to-a-code-snippet) to add links to
	* The first line of your module
	* The line in `fileserver.js` where you require the module
	* The line that starts the definition with of your first class
	* The line that starts the definition with of your second class
	* The line where your first class is actually instantiated
	* The line where your second class is actually instantiated
	* The line where you prevent viewing files outside of `rootDirectory`
3. You can use this as a template for your `README.md`
    
	```
	1. [First line of module](link.to/line/of/source/code)
    2. [Location of module require / import](link.to/line/of/source/code)
    3. [Definition of first class](link.to/line/of/source/code)
    4. [Definition of second class](link.to/line/of/source/code)
    5. [Line where first class is instantiated](link.to/line/of/source/code)
    6. [Line where second class is instantiated](link.to/line/of/source/code)
	```
4. As with previous assignments: 
	* Lint your code with `eslint`
	* Do not include `node_modules` (it shouldn't be installed anyway)
5. `package.json` is optional for this assignment as it isn't necessary for grading; add it if you want to add meta information / start scripts


</div>

</div>


