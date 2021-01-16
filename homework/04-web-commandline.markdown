---
layout: homework
title: CSCI-UA.0480 - Homework #4
---

<style>
h1.warning {
	background-color: #eaa;
}
</style>
<div class="panel panel-default">
	<div class="panel-heading">Homework #4</div>
	<div class="panel-body" markdown="block">

# Express Make a Site That Looks Like a Commandline Console!  - __Due <s>Friday, March 29th</s> Saturday, March 30th__, by 11PM

## Overview

### Description

Create a site that provides a web, form-based "Linux Shell" supporting basic commands that can be performed on a remote "fake" in-memory file system. In this homework you'll be working with:

* Serving static files
* Middleware
* Handling forms, both GET and POST
* Templating
* A JavaScript Object Representation of a Simple File System 

You'll be creating 2 pages:

* __home__ - <code>/</code>: a basic form that allows users to select a distribution of Linux Operating System.
* __vfs (virtual file system)__ - <code>/vfs</code>: a page that allows users to manipulate resources of a virtual file system by submitting Linux commands through two forms and see system states returned from the server (This is an in-memory file system).

Your directory layout should look similar with the following __once you're done with the assignment__ (though it can deviate from this example based on your implementation):

<pre><code data-trim contenteditable>
├── app.js
├── package-lock.json
├── package.json
├── public
│   ├── css
│   │   └── style.css
│   └── img
│       ├── redhat.png
│       ├── debian.png
│       └── ubuntu.jpg
├── views
│   ├── layout.hbs
│   ├── directory.hbs
│   ├── open.hbs
│   ├── terminal.hbs
│   └── index.hbs
│
└── vfs
    ├── init.json
    └── FileSystem.js
</code></pre>

In the __views__ directory, you are not required to have the same files as above. If you'd like, you can use template partials to reduce redundant markup. This was not covered in class, but you can check out the [documentation on partials in the hbs module's npm page](https://www.npmjs.com/package/hbs#helpers-and-partials).

The focus of this homework is the implementation of GET and POST forms and the creation of a fake / _virtual_ file system. While using css is required, the amount and complexity of actual styling is your discretion. __The assignment is not graded on aesthetics__, so complex styles are not required. There are suggestions on styling, __but you are free to dictate the look and feel of site__ (by using css and images as _static files_ in `public`).

### Example Interaction

<div class="img">
<!--![interaction](../resources/img/hw04-asciidiary-mainexample.gif)-->
<img width="75%" src="../resources/img/hw04-file-system-example.gif">

</div>

### Submission Process

1. You will be given access to a private repository on GitHub
2. The final version of your assignment should be in GitHub
3. __Push__ your changes to the homework repository on GitHub by the due date.

### (4 points) Make at Least 4 Commits

* Commit multiple times throughout your development process.
* Make at least 4 separate commits - (for example, one option may be to make one commit per part in the homework).

## Part 1 - Setup

###  Installing Dependencies

* create a <code>package.json</code>
* __install__ the following __dependencies__ (make sure you use the <code>--save</code> option)
	* <code>express</code>
	* <code>hbs</code>
    * <code>moment</code>


###  .gitignore

* create a <code>.gitignore</code>
* ignore the following files:
	* <code>node_modules</code>
	* any other files that aren't relevant to the project... for example
        * <code>.DS_Store</code> if you're on OSX
        * <code>.swp</code> if you use vim as your editor
        * etc.

### linting

* an eslint configuration file (for example `.eslintrc.json`) should be in the root directory (or copy one from a previous project if it doesn't exist)
* make sure that any global linting tools are installed (`eslint`)
* periodically lint your program as you work

## Part 2 - A Fake / _Virtual_ Remote File System

### Overview

In this homework, you'll create an Express application that displays a background image of three Linux distributions (or some styling of your choice), and a shell-like interface implemented by HTML forms. Users send shell commands via GET and POST requests through the forms to a server. The server dispatches requests to operate on a in-memory virtual file system using these commands, and responds with the state of the virtual file system.

The file system will be implemented using JavaScript object; it will represent the state of the virtual file system. Additionally, use an ES6 class to encapsulate the data and interact with the virtual file system represented by the data.

You can assume that your application will process http requests serially; you don't have to handle any race conditions.

This part contains four major components.

1. Serving static files
2. An Express Server
3. The Virtual File System
4. Templating

###  Serving Static Files

In this section, you'll work with the built-in Express static middleware to serve images and css. __Again, you are free to have your own styles, as long as they are served through `express.satatic` / the `public` folder__. The following description is based on the reference solution's styles.

In the demo, the static files include css for basic styling and desktop images of 3 different Linux operating systems: Ubuntu, Debian and Redhat.

* To serve static files, create the following directory structure in your project's root directory
	* <code>public</code>
	* <code>public/css</code>
	* <code>public/img</code>
* Add a blank css file in <code>public/css/style.css</code>
* Add images that you'll use for styling
	* You can use your own images...
	* Or use a screen capture of various desktops:
		* [Ubuntu](../resources/img/hw04-ubuntu.jpg)
		* [Debian](../resources/img/hw04-debian.png)
		* [RedHat](../resources/img/hw04-redhat.png).
		* (You can stretch, tile, etc. to fill the background if you like, as these images are fixed dimensions)
* You'll test these static assets later on


### File System

In this section, you'll mimic a Linux file system through JavaScript.

In Linux, The file system is implemented as a tree. The root of this tree is the root directory and is denoted as <code>/</code>. Each node in this tree represents a file. If a node is a leaf, then it is a file, otherwise it is a directory (Note: in Linux, a file can be a file or a directory). Each node stores metadata about the directory / file. The children of a node is another nested file system tree. To search for a file, perform tree traversal to find the node. 

### Commands

Commands will be chosen and issued through forms on an html page. The forms will send requests to the server, and the server will read or modify the virtual file system based on the form data. The commands you'll implement include:

1. <code>ls</code>
    * **Arguments**: <code>[path/to/dir]</code>
    * **Options**: <code>-l</code>show file metadata <code>.</code>
    * **Output**: shows a list of all files in the directory specified by argument
		* by default, only the names of all the files in the directory are listed 
			* the names are listed in the order that they appear in the directory node
			* (this is different from the _actual_ behavior of `ls` which sorts by name - _kind_ of)
		* however, with the -l option:
        	* each line in the resulting listing shows information about files or directories contained in the directory
			* the information is file / directory metadata: <code>file_type (d or -), permissions, number of hard links, owner, group, size, last-modified data, file name</code>
        	* an example directory is: <code>drwxr--r-- 1 root root 6 Feb 25 11:20 bin</code>
        	* An example file is: <code>-rwxr--r-- 1 root root 6 Feb 25 11:20 file.txt</code>
        * for more information, please refer to [ls](https://en.wikipedia.org/wiki/Ls).
2. <code>tree</code>
    * **Arguments**: <code>[path/to/dir]</code>
    * **Options**: <code>None</code>
    * **Output**:
        * displays the file system tree under <code>[path/to/dir]</code>
		* names of files / directories are nested underneath eachother through indentation
3. <code>cat</code>
    * **Arguments**: <code>[path/to/filename, filename]</code>
    * **Options**: <code>None</code>
    * **Output**:
        * the contents of the file (assume files contain just text)
4. <code>mkdir</code>
    * **Arguments**: <code>[path/to/dir, dirname]</code>
    * **Options**: <code>None</code>
    * **Result**:
        * create a directory under the given path if the <code>dirname</code> of directory does not present
5. <code>write</code>
    * **Arguments**: <code>[path/filename, content]</code>
    * **Options**: <code>None</code>
    * **Result**:
        * overwrite the file by given content if the <code>filename</code> exists, otherwise create a new file named <code>filename</code> with <code>content</code>

⚠️⚠️ ⚠️   since you are not going to implement <code>cd</code>, __every path in the argument list__ is an __ABSOLUTE PATH__.

### In-memory File System

Now, you'll implement an in-memory file system in a class called `FileSystem` (within <code>FileSystem.js</code>) by encapsulating the **state of file system** as properties and using __methods__ for manipulating the file system.

When the server is initialized (that is, before it starts listening on a port):

* it reads in a JSON file, `init.json`
* parses the JSON...
* instantiates a `FileSystem` class given initial state of the file system
* you'll have to careful when you do this, as you'll want to instantiate this object and start your server __after__ reading `init.json`
* ⚠️⚠️ ⚠️ ...consequently, you'll likely have to put `listen` and the creation of `FileSystem` within a callback!

While the server is running: 

* it dispatches the client's requested actions to methods and modifies or reads the state of the file system
* consequently, the majority of your file system logic will live in a class rather than within the route handling functions of your Express application.

### Initial State of File System

You'll be given a file, `init.json`, that contains the initial structure of the file system. 

The initial file system is represented by a nested JSON object - essentially a tree of objects with keys as file and directory names and objects as meta data about that file or directory. The JSON file has hardcoded dates and times, but when adding new files and directories, you can use [Moment JS](https://momentjs.com/docs/) to get a formatted string representing the current time. Here are a few examples of what the data structure backing the virtual file system may look like (you can also check out `vfs/init.json)`:



#### Directory

```
'dir-name': {
    'permission': file type and file mode (drwxr--r--),
    'hard-links': arbitrary number,
    'owner-name': arbitrary string,
    'owner-group': arbitrary string,
    'last-modified': you can use moment.js - moment().format('MMM DD HH:mm'),
    'size': arbitrary number (can be random_,
    'files': {
        // a nested structure of more directories or files as JSON objects
    },
}
```

#### File
```
'file-name': {
            'permission': '-rwxr--r--',
            'hard-links': 1,
            'owner-name': 'root',
            'owner-group': 'root',
            'last-modified': you can use moment.js - moment().format('MMM DD HH:mm'),

            'size': 6,
            'content': 'Hello World!'
        }
```

#### An example of files and directories in context (note that the file system is wrapped in an object with a property called fs):

```
{
	"fs": {
		'/': {
			'permission': 'drwxr--r--',
			'hard-links': 1,
			'owner-name': 'root',
			'owner-group': 'root',
			'last-modified': moment().format('MMM DD HH:mm'),
			'size': 6,
			'files': {
				'bin': {
					'permission': 'drwxr--r--',
					'hard-links': 1,
					'owner-name': 'root',
					'owner-group': 'root',
					'last-modified': moment().format('MMM DD HH:mm'),
					'size': 6,
					'files': {
					}
				},
				.... More files ...
			}
	}
}
```

### The File System Class

To work with your virtual file system, implement a `FileSystem` class in `vfs/FileSystem.js` and export it so that the routes in `app.js` can use it. You can use the __parsed__ JSON to initialize this object with file system data.  ⚠️⚠️⚠️  You can design this `FileSystem` class __any way you like,__ as long as you use it to encapsulate the state of the virtual file system. 

Here are some suggestions (but, again, ⚠️ __feel free to do this any way you like... as there are no expectations or tests for your implementation__):

1. <code>constructor</code>
    * **Arguments**: <code>object</code> - an object representing a virtual file system (note that this is _not_ a JSON string, but rather, pass in an object that's the result of parsing a JSON string)
2. <code>find</code>
    * **Arguments**: <code>[path/to/file]</code>
    * **Description**: traverse the file system nodes to find the file or directory. After the file or directory is found, return an object representing the file system subtree rooted at this file or directory. After the file is found, put the metadata of the current file into the returned object. 
3. <code>traverseAndList</code>
    * **Arguments**: <code>[path/to/file]</code>
    * **Description**: this method is for <code>ls</code> command. If the path points to a directory, return a list of objects representation of the files under this directory. Otherwise, return an empty list.
4. <code>makeDirectory</code>
    * **Arguments**: <code>[path/to/dir, directory name]</code>
    * **Description**: first call find to get the object associated with <code>dir</code>, then create a new entry in this directory. The file type is directory. Other metadata can be generated randomly (but see some specifications below).
    * **Requirements**:
        * The file type should be `d`
        * The last-modified-date should be generated by `momentJS` with date format `MMM DD HH:mm`
        * The name of key to store directories and files should be `files`
        * Others can be arbitrary
5. <code>cat</code>
    * **Arguments**: <code>[path/to/file]</code>
    * **Description**: returns the content of the file (if it's a file), otherwise return error messages (e.g., cat: No such file or directory)
6. <code>write</code>
    * **Arguments**: <code>[path/to/file, content]</code>
    * **Description**: use find to get the object of the **directory** on given path (HINT: use file type in the permission string). If the file exists, overwrite it by <code>content</code>. Otherwise create a new entry in this object with the property name as the given file name and content written (remember the name of new entries should be different from any name of other keys in the objects - there shouldn't be two files with the same name).
    * **Requirements**:
        * The file type should be `-`
        * The last-modified-date should be generated by `momentJS` with date format `MMM DD HH:mm`
        * The name of key to store file content should be `content`
        * Others can be arbitrary

Here's what the class may look like (you are not required to follow this exact class definition, though!):

```
class FileSystem {
    constructor (obj) {
        /*    Params: obj representing the virtual file system */
    }

    find(path) {
        /*    Params:  query path.
         *    Example:
         *       /path/to/this/file
         *       ['', 'path', 'to', 'this', 'file']
         */
    }

    traverseAndList(path) {
        /* Params:
         *    A list of directoies destructured from the path.
         */
    }

    makeDirectory(path, dirName) {
        /* Params:
         *    A list of directoies destructured from the path,
         *    the directory name that is going to create
         *    Example:
         *       /path/to/this/file
         *       ['', 'path', 'to', 'this', 'file']
         */
    }

    cat(path) {
        /* Params:
         *    A list of directoies destructured from the path.
         *    Example:
         *       /path/to/this/file
         *       ['', 'path', 'to', 'this', 'file']
         */
    }

    write(path, content) {
        /* Params:
         *    A list of directoies destructured from the path,
         *    and the content ready to be written to the file
         *    Example:
         *       /path/to/this/file
         *       ['', 'path', 'to', 'this', 'file']
         */
    }
}
```


### Express Application

In this section, you'll implement an Express application that interacts with the `FileSystem` class implemented in the previous section.

### Setup / Middleware

* Create a basic express application called <code>app.js</code>
	* make sure that your application is __served over port 3000__
* Add the following middleware to your application
    * <code>express.urlencoded</code> (this is a built-in middleware function; no installation needed): this will help you parse the body in <code>POST</code> requests
	* see [the slides on POST forms for setup](../slides/10/forms.html#/6)
* Serve static files:
	* check out the [slides on serving static files with Express](../../slides/08/express.html#/29)
    * test that both the css files and image work after running <code>app.js</code> (these are the files that you placed in the `public` directory earlier on)
        * for example, try to curl <code>http://localhost:3000/img/ubuntu.jpg</code> or go that url in your browser
* Import a class from the module <code>FileSystem.js</code>
* Enable <code>Handlebars</code> for templating in a later section


### Templating

In this part, you'll work with HTML and templating to build your front-end.  You don't have to implement the interface exactly the same as examples provided (styling is required, but it can be minimal, and it does not have to match the images below). Basic pages for a functional system, however, are required. __You are free to style your app using any approach. Following description is based on the demo gif as an example for explaining goals of this part.__

* Set up handlebars - [these slides](../../slides/09/templating.html) 
	* Get all the requirements and config setup
	* Create the appropriate views folder, along with an initial layout file:
		* <code>views</code>
        * <code>views/layout.hbs</code>

In <code>layout.hbs</code>

* Create a title tag with text <code>OS</code>
* Create appropriate tags inside <code>head</code>
* Create <code>body</code> tag
* Link your <code>style.css</code> stylesheet
    * A basic <code>style.css</code> is provided, you can modify it if you want a different style

### Routes

In this section, you'll implement callback handlers to serve responses to browser requests. There are two urls that your application will respond to: __<code>/</code> and <code>/vfs</code>__ 

* `/` will handle `GET` requests only 
* `/vfs` will accept both `GET` and `POST` 
	* this means you'll likely have two route handlers for `vfs` 
	* for the route that handles a `POST` request, you'll be able to access both `req.query` and `req.body` (if a `POST` is made to a path that also contains a query string)

A URL is a resource identifier and the resource in this homework is our virtual file system. The semantic here is using HTTP verbs to manipulate the file system located at <code>/vfs</code>. GETs will read from the file system while POSTs will add to the file system.

<code>GET</code> requests:

* <code>/</code>: renders an index page <code>index.hbs</code>
* <code>/vfs</code>:
    * Receives three parameters <code>command</code>, <code>path</code>, <code>option</code>
    * Parse <code>path</code> appropriately, call <code>find</code> method defined in <code>fileSystem</code> object
    * Call appropriate methods in the class given by <code>command</code>
    * Use <code>option</code> parameters if necessarily
    * Render an appropriate HTML page and pass a context containing the information retrieve from the file system

<code>POST</code> requests

* <code>/vfs</code>
    * Receive three parameters <code>command</code>, <code>path</code>, <code>content</code>
    * Parse <code>path</code> appropriately, call <code>find</code> method defined in <code>fileSystem</code> object
    * Call appropriate methods in the class given by <code>command</code>
    * Use <code>option</code> parameters if necessarily
    * Render an appropriate HTML page and pass a context containing the message showing success or failure
	* ⚠️⚠️⚠️ Typically, POST requests result in a redirect to prevent form resubmission. In this application, you can render the template directly rather than redirect, since we don't currently have a way of "sending" the result of the operation to another route handler

###  Creating a Home Page (`/`)

The home page consists of a dropdown menu with options for users to select different types of styling for the next page. Each option in the dropdown should result in a different look and feel. This can be implemented by using `req.query` to do any of the following:

* conditionally render different templates
* within templates conditionally include different images
* within templates conditionally use different markup
* etc.

Note, however, that regardless of how the styling differs, `express.static` must be used to serve `.css` and/or images.

Your app should receive <code>GET</code> requests on the path, <code>/</code>: 

* In your <code>index.hbs</code>
    * Create a form with attributes below
        1. <code>action="http://localhost:3000/vfs"</code> (may be different if the server listens on other ports)
        2. <code>method="GET"</code>
    * In this form, create a <code>select</code> dropdown [see mdn's docs for dropdown markup](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select) with:
        1. a <code>name</code> attribute (this should match with what you reference in `req.query`)
        2. and two or three <code>option</code> elements with <code>value</code> and <code>text</code> equal to the name of selected operating system (this basically switches the style!)
    * Lastly, to create a submit button, use an <code>input</code> with <code>type</code> of `submit` 
    * When this form is submitted, a query string is attached to the GET request... with the query string determining different styling for the `vfs` page (for example, different background images, different markup, etc.)
		* this means that the route for `vfs` should always check `req.query` to determine what design elements should be shown)
    * Below is an example for selecting three OS distributions in the next page <code>terminal.hbs</code>

<div markdown="block" class="img">
<img src='../resources/img/hw04-file-system-homepage.png' width="100%">
<img src='../resources/img/hw04-file-system-homepage-dropdown.png' width="100%">
</div>


### Creating two forms for submitting commands and arguments

In <code>terminal.hbs</code>, create two forms that will allow the user to interact with the virtual file system (again, this page will be styled based on a query string):

* Create a <code>GET</code> form
    1. <code>action="http://localhost:3000/vfs"</code> (may be different if the server listens on other ports)
    2. <code>method="GET"</code>
    3. In this form, add three HTML input tags: <code>command</code>, <code>option</code>, and <code>path</code>
    4. Add a submit button with type of <code>submit</code>
    5. Note that this form has the same `action` url as the homepage form
	6. You can also add a hidden input that set the value of the query string that you use for styling so that it remains persistent
* Create a <code>POST</code> form
    1. <code>action="http://localhost:3000/vfs"</code> 
    2. <code>method="post"</code>
    3. In this form, add three HTML input tags: <code>command</code>, <code>path</code>, and <code>content</code>
    4. Add a submit button with type of <code>submit</code>
* Examples:
<div markdown="block" class="img">
<img src="../resources/img/hw04-file-system-ubuntu.png" width="100%">
<img src="../resources/img/hw04-file-system-debian.png" width="100%">
</div>

### Create an area below the forms that contains messages sent back through the server's HTTP response

For each command, the server responds with the state of file system or the status of the operation. In this section, you'll display this response by using templating and basic control structures in handlebars. (HINT: you'll use HBS template syntax for iterating over an array, an array of objects, and an object. Conditionals may also be useful).

⚠️⚠️ ⚠️ - __Universal Requirements for Each Command__

* __In either `path` field, the leading forward slash (`/`) may be omitted (the path should still be treated as if it were an absolute path, though)__
* __In either `path` field, if the path is left blank, then assume it is root (`/`)__
* __There can only be one option in the option field, and it should be preceded with a dash, `-`__

### Commands and Examples

### <code>ls</code>
1. Example form data 1:
	* command: `ls`
	* option: `-l`
	* path: field left blank
	* result shown on page:
		<pre><code data-trim contenteditable>drwxr--r-- 1 root root 6 Feb 27 08:17 bin
drwxr--r-- 1 root root 6 Jan 20 12:45 home
drwxr--r-- 1 root root 6 Jan 05 08:02 lib
drwxr--r-- 1 root root 6 Mar 10 07:30 dev
</code></pre>
		* comments: leaving the path blank will default to listing the files and directories in `/`
2. Example form data  2:
	* command: `ls`
	* option: field left blank 
	* path: `/home`
	* result shown on page:
		<pre><code data-trim contenteditable>foo.txt
es6.jpg</code></pre>
	* comments: 
		* leaving the option field blank will result in only the names of the files being displayed 
	    * in this case, `foo.txt` and `es6.jpg` are the only two files contained within `/home` 
		* note: `es6.jpg` is not really an image... it's just a file that has arbitrary text in it
		* (if you want to get fancy though, you can have a link to a file in `public` and display that based on image extensions)
3. The server should pass files and directories into the template in the form of a list of objects.
4. Display each file or directory in one line with just <code>name</code> if there are no options, or with `-l`, <code>file_type, permissions, number of hard links, owner, group, size, last-modified data, file name</code> (using `li`)
5. If the path cannot be found or it's a file, output `ls: No such file or directory`
6. Example UI:
    with <code>-l</code> option
    <div markdown="block" class="img">
    <img src="../resources/img/hw04-file-system-ls.png" width="100%">
    </div>
7. Example UI:
    without <code>-l</code> option
    <div markdown="block" class="img">
    <img src="../resources/img/hw04-file-system-ls-no-l.png" width="100%">
    </div>
8. Example UI: <code>path</code> does not exist or it's a file:
    <div markdown="block" class="img"> 
	<img src="../resources/img/hw04-file-system-ls-not-exists.png" width="100%">
	</div>

<hr>

### <code>tree</code>

1. Example form data 1:
	* command: `tree`
	* option: field left blank 
	* path: field left blank
	* result shown on page:
		<pre><code data-trim contenteditable>bin
home
    es6.jpg
lib
    modules
              aba.txt
dev			
</code></pre>
		* comments: leaving the path blank will default to listing the files and directories in `/`
2. Example form data 1:
	* command: `tree`
	* option: field left blank 
	* path: `/lib`
	* result shown on page:
		<pre><code data-trim contenteditable>modules
    aba.txt
</code></pre>
	* comments: adding a path shows the tree under that path
3. Display the entire file system tree rooted at the `path` specified in the form
4. Any way of showing the hierarchy would be accepted (such as varying levels of indentation or nested lists: `ol` and `li`).
5. If the path cannot be found or it's a file, output `tree: No such file or directory`
6. Example UI:
    <div markdown="block" class="img">
    <img src="../resources/img/hw04-file-system-tree.png" width="100%">
    </div>
7. Example UI: <code>path</code> does not exist or it's a file:
    <div markdown="block" class="img"> 
	<img src="../resources/img/hw04-file-system-tree-not-exists.png" width="100%">
	</div>

<hr>

### <code>cat</code>

0. Example form data:
	* command: `cat`
	* option: field left blank 
	* path: `/lib/modules/aba.txt`
	* result shown on page:
		<pre><code data-trim contenteditable>hello world.</code></pre>
1. The server should respond with the contents of the file (a string).
2. If the file cannot be found, output `cat: No such file or directory`
3. Example UI: if the file exists
    <div markdown="block" class="img">
    <img src="../resources/img/hw04-file-system-cat.png" width="100%">
    </div>
4. Example UI: <code>path</code> is not a file:
    <div markdown="block" class="img"> 
	<img src="../resources/img/hw04-file-system-write-not-exists.png" width="100%">
	</div>

<hr>

### <code>mkdir</code>

0. Example form data:
	* command: `mkdir`
	* path: `/lib/modules/`
	* content: `tmp`
	* result shown on page:
		<pre><code data-trim contenteditable>aba.txt
tmp
</code></pre>
	* comments: 
		* note that the `content` field specifies the new directory name and `path` specifies where to create the new directory
		* additionally, all of the files and directories in `path` are displayed (including the new one)
1. The server should reply with a list of files and directories after the directory is created
2. If the directory (<code>content</code>) already exists, output `mkdir: ${dirName} : File exists`
3. If the <code>path</code> not found, output `mkdir: No such file or directory`
4. Example UI: after creating a directory <code>tmp</code>:
	<div markdown="block" class="img"> 
	<img src="../resources/img/hw04-file-system-af-mkdir.png" width="100%">
	</div>
5. Example UI: create <code>tmp</code> when <code>tmp</code> exists:
    <div markdown="block" class="img"> 
	<img src="../resources/img/hw04-file-system-mkdir-exists.png" width="100%">
	</div>
6. Example UI: <code>path</code> does not exist or it's a file:
    <div markdown="block" class="img"> 
	<img src="../resources/img/hw04-file-system-mkdir-no-path-found.png" width="100%">
	</div>
<hr>

### <code>write</code>

1. Example form data (creating `foo.txt` under `/lib/modules`):
	* command: `write`
	* path: `/lib/modules/foo.txt`
	* content: `bar,baz,qux,quux`
	* result shown on page: nothing is shown to the user (use cat or ls to verify creation of file)
2. If successful, no message should be displayed
3. The operation can be checked by submitting a request with the `cat` command 
4. If writing fails, output `write: No such file or directory`
5. Example UI: <code>path</code> does not exist:
    <div markdown="block" class="img"> 
	<img src="../resources/img/hw04-file-system-write-no-path-found.png" width="100%">
	</div>
## Documentation

⚠️⚠️⚠️  To help graders find your usage of the `FileSystem` class, use [GitHub's documentation for linking to code](https://help.github.com/en/articles/creating-a-permanent-link-to-a-code-snippet) to add links to the following:

* the part of your code that instantiates the `FileSystem` class with an object (from parsed JSON) being used to bootstrap it with some initial virtual file system data
* one example of using the instance of `FileSystem` to provide the data needed to fulfill a request...
	* __example__: if there's a `POST` to `vfs` with `ls` as the form input
	* show the part of your code where a method is called on your instance of `FileSystem`
	* ...that gives back a list of files that are eventually put into a rendered template


</div>



</div>
