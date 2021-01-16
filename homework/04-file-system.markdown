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

# Remote In-Memory File System


## Overview

### Description

Create a site that provides a web, form-based Linux Shell supporting basic commands of a remote in-memory file system. In this homework you'll be working with:

* Serving static files
* Middleware
* Handling forms, both GET and POST
* Templating
* Simple File System

You'll be creating 2 pages:

* __home__ - <code>/</code>: a basic form that allows users to select a version of Linux Operating System.
* __os__ - <code>/os</code>: a page that allows users to submit Linux commands through two forms and see the output returned from remote in-memory file system.

Your directory layout should look similar with the following __once you're done with the assignment__:

<pre><code data-trim contenteditable>
├── app.js
├── initFs.js
├── FileSystem.js
├── package-lock.json
├── package.json
├── public
│   ├── css
│   │   └── style.css
│   └── img
│       ├── redhat.png
│       ├── debian.png
│       └── ubuntu.jpg
└── views
    ├── layout.hbs
    ├── directory.hbs
    ├── open.hbs
    ├── terminal.hbs
    └── index.hbs
</code></pre>

In the __view__ directory, you are not required to have the same files as above. But try to make redundant code as less as possible.

The focus of this homework is the implementation of GET and POST forms and the file system. Fancy styling is not required.

### Example Interaction

<div markdown="block" class="img">
<!--![interaction](../resources/img/hw04-asciidiary-mainexample.gif)-->
<img src="../resources/img/hw04-file-system-example.gif">

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
* __install__ the following __dependencies__ (make sure you use the <code>--save</code> option), and __no others__:
	* <code>express</code>
	* <code>hbs</code>
    * <code>moment</code>
    * <code>body-parser</code>


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

## Part 2 - Remote File System

### Overview

In this homework, you'll create an Express application that displays background images of three Linux operating system, and a Shell interface implemented by HTML forms. Users send Shell commands via GET and POST requests through the forms to a server. The server dispatches requests to operate on a in-memory file system using these commands, and responds states the file system.

The file system will be implemented using a Javascript class with a nested JSON object representing states of file system, and several methods used for modifying the states.

You can assume that all requests will not try to modify resources in the file system at the same time (i.e. you don't have to handle race condition).

This part contains four major components.
1. Serving static files
2. Express Server
3. File System
4. Templating

###  Serving Static Files

In this section, you'll work with serving static files including css for basic styling, desktop images of 3 different Linux operating systems: Ubuntu, Debian and Redhat.

* Create the following directory structure in your project's root directory
	* <code>public</code>
	* <code>public/css</code>
	* <code>public/img</code>
* Add a blank css file in <code>public/css/style.css</code>
* Add an image of desktop from [Ubuntu operating system](../resources/img/hw04-ubuntu.png)
* Add two more desktop images of Linux operating system by downloading it from [Debian](../resources/img/hw04-debian.png), [RedHat](../resources/img/hw04-redhat.png).


### File System

In this section, you'll implement a simple architecture of Linux file system.

File system is implemented by a tree in Linux OS. The root of this tree is the root directory and is denoted as <code>/</code>. Each node in this tree represents a file. If a node is a leaf, then it is a file, otherwise it is a directory (Note: in Linux, a file can be a file or a directory). This node stores metadata of the file and the children of this file is another file system tree recursively. To search a file, perform tree traversal to find such node. 

##### Commands

The Shell commands you'll build include

1. <code>ls</code>
    * **Arguments**: <code>[path/to/dir]</code>
    * **Options**: <code>-l</code>, additionally displays hidden files with the name starts with <code>.</code>
    * **Output**:
        * list all files (including directories)
        * Each line is a file with its metadata including: <code>file_type, permissions, number of hard links, owner, group, size, last-modified data, file name</code>
        * An example directory is:
         <code>drwxr--r-- 1 root root 6 Feb 25 11:20 bin</code>
        * An example file is: 
        <code>-rwxr--r-- 1 root root 6 Feb 25 11:20 file.txt</code>
        * More information please refer to [ls](https://en.wikipedia.org/wiki/Ls).
2. <code>tree</code>
    * **Arguments**: <code>[path/to/dir]</code>
    * **Options**: <code>None</code>
    * **Output**:
        * displays the file system tree under <code>[path/to/dir]</code>
3. <code>cat</code>
    * **Arguments**: <code>[path/to/filename, filename]</code>
    * **Options**: <code>None</code>
    * **Output**:
        * the content of the file
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

Note: since you are not going to implement <code>cd</code>, every path in the argument list is an __ABSOLUTE PATH__.

##### In-memory File System

Now, you'll implement the in-memory file system in <code>fileSystem.js</code> by encapsulating **states of file system** and __methods__ for handling its states.

When the server is initating, it instantiates this object with a given initial state of file system. While the server is running, it dispatches client's requested actions to object methods and modify states of the file system.

##### Initial State of File System

You'll be given a javascript file `initFs.js` containing initial structure of the file system, then export it as a module.

The structure of a file system is represented using a nested JSON object. A nested JSON object is a structure of an arbitrary tree. A file is a node of this tree and also a key-value pair in a JSON object.

The basic information of a node (file) is listed below.


###### Directory
```
'dir-name': {
    'permission': file type and file mode (drwxr--r--),
    'hard-links': arbitrary number,
    'owner-name': arbitrary string,
    'owner-group': arbitrary string,
    'last-modified': use momentJS,
    'size': arbitrary number,
    'files': {
        // a recursive structure but remember to include '.' and '..'.

        '.' : {},    // current directory
        '..': {}     // parent directory
    },
}
```

###### File
```
'file-name': {
            'permission': '-rwxr--r--',
            'hard-links': 1,
            'owner-name': 'root',
            'owner-group': 'root',
            'last-modified': use momentJS,
            'size': 6,
            'content': 'Hello World!'
        }
```

A snapshot of the file system is looking like below. Note that for simplicity, we do not need to have <code>.</code> and <code>..</code> in the root directory.

```javascript=
'/': {
    'files': {
                'bin': {
                    'permission': 'drwxr--r--',
                    'hard-links': 1,
                    'owner-name': 'root',
                    'owner-group': 'root',
                    'last-modified': moment().format('MMM DD HH:mm'),
                    'size': 6,
                    'files': {
                        '.': {
                            'permission': 'drwxr--r--',
                            'hard-links': 1,
                            'owner-name': 'root',
                            'owner-group': 'root',
                            'last-modified': moment().format('MMM DD HH:mm'),
                            'size': 6,
                            'files': 'bin'
                        },
                        // other files
                    }
                }
            }
}
```

##### The Class of File System

Now, you'll implement this file system using a class in Javascript. Create a file `fileSystem.js` and implement this class. Please note that you can implement the file system using your own design.

1. <code>constructor</code>
    * This is the link to the initial state of file system [](), now require this JSON object and initiate a property with this JSON object in your class constructor.
    * If you are using function expression instead of arrow functions, bind your methods with <code>this</code> of the class here
2. <code>find</code>
    * **Arguments**: <code>[path/to/file]</code>
    * **Description**: traverse the file system tree to find the file or directory. After the file or directory is found, return the JSON object representing the file system subtree rooted at this file or directory.
3. <code>traverseAndList</code>
    * **Arguments**: <code>[path/to/file]</code>
    * **Description**: this method is for <code>ls</code> command. If the path points to a directory, return a list of JSON object representation of the files under this directory. Otherwise, return an empty list.
4. <code>makeDirectory</code>
    * **Arguments**: <code>[path/to/dir, directory name]</code>
    * **Description**: first call find to get the JSON object of <code>dir</code>, then create a new entry in this directory. The file type is directory. Other metadata could be arbitrary.
    * **Requirements**:
        * The file type should be `d`
        * The last-modified-date should be generated by `momentJS` with date format `MMM DD HH:mm`
        * There must be `.` and `..` while a new directory is created
        * The name of key to store direcotries and files should be `files`
        * Others can be arbitrary
5. <code>cat</code>
    * **Arguments**: <code>[path/to/file]</code>
    * **Description**: return the content of the file if it is a file, otherwise return error messages (e.g., cat: No such file or directory)
6. <code>write</code>
    * **Arguments**: <code>[path/to/file, content]</code>
    * **Description**: use find to get the JSON object of the **directory** on given path (HINT: use file type in the permission string). If the file exists, overwrite it by <code>content</code>. Otherwise create a new entry in this object with key equals given file name and content written (remember the name of new entries should be different from any name of key in the JSON).
    * **Requirements**:
        * The file type should be `-`
        * The last-modified-date should be generated by `momentJS` with date format `MMM DD HH:mm`
        * The name of key to store file content should be `content`
        * Others can be arbitrary

Following class is an example to implement this file system. You are not required to follow this class definition.

```javascript=
class FileSystem {
    constructor () {
        // Provided by initFs.js
        this.fs = fs;
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


### Express Server

In this section, you'll implement an Express server that interact with a file system you built in the previous section.

##### Set up

* Create a basic express application called <code>app.js</code>
	* make sure that your application is __served over port 3000__
* Add below middleware to your app
    * <code>body-parser</code>: this will help you parse query strings in <code>GET</code> request and body in <code>POST</code> request
* Serve static files:
	* check out the [slides on serving static files with Express](../slides/08/express.html#/29)
    * test that both the css files and image work after running <code>app.js</code>
        * for example, try to curl <code>http://localhost:3000/img/ubuntu.jpg</code> or go that url in your browser
* Import a class from the module  <code>fileSystem.js</code>

* Enable <code>Handlebars</code> for templating in the later section

##### Middleware

* Add a middleware `body-parser`


##### Route

<code>GET</code> requests:

* <code>/</code>: renders an index page and passes appropriate context
* <code>/get</code>:
    * Receives three parameters <code>command</code>, <code>path</code>, <code>option</code>
    * Parse <code>path</code> appropriately, call <code>find</code> method defined in <code>fileSystem</code> object
    * Call appropriate methods in the class given by <code>command</code>
    * Use <code>option</code> parameters if necessarily
    * Render an appropriate HTML page and pass a context containing the information retrieve from the file system

<code>POST</code> requests

* <code>/os</code>: destination of form actions
    * Receive a parameter <code>os</code>
    * Render an HTML page and respond the Url of appropriate served image (by different options sent from the form)

* <code>/post</code>
    * Receive three parameters <code>command</code>, <code>path</code>, <code>content</code>
    * Parse <code>path</code> appropriately, call <code>find</code> method defined in <code>fileSystem</code> object
    * Call appropriate methods in the class given by <code>command</code>
    * Use <code>option</code> parameters if necessarily
    * Render an appropriate HTML page and pass a context containing the message showing success or not


### Templating

In this part, you'll work with HTML and templating to build your front-end. You'll also use the context passed from the server to render partial templates. You don't have to implement the interface exactly the same as examples provided (styling is not strictly required). But basic pages for a functional system are required.

* Set up handlebars - [these slides](../slides/09/templating.html) 
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

#####  Creating a Home Page

The home page consists of a select dropdown with options including three versions of Linux operating system. Users can select one of the OS and submit through the form. 

Your app should receive <code>GET</code> requests on the path, <code>/</code>. Server responds by rendering templates.

* In your <code>layout.hbs</code>
    * Create a form with attributes below
        1. <code>action="http://localhost:3000/os"</code> (may be different if the server listens on other ports)
        2. <code>method="post"</code>
    * In this form, create a <code>select</code> dropdown with:
        1. a <code>name</code> attribute
        2. three <code>option</code> with <code>value</code> and <code>text</code> equal to the name of selected operating system
    * Lastly, create a <code>button</code> with <code>type</code> of submit


<div markdown="block" class="img">
<img src='../resources/img/hw04-file-system-homepage.png' width="100%">
<img src='../resources/img/hw04-file-system-homepage-dropdown.png' width="100%">
</div>


##### Creating two forms for submitting commands and arguments

In the homepage,

* Create a <code>GET</code> form
    1. <code>action="http://localhost:3000/get"</code> (may be different if the server listens on other ports)
    2. <code>method="get"</code>
    3. In this form, add three HTML input tags: <code>command</code>, <code>option</code>, and <code>path</code>
    4. Add a submit button with type of <code>submit</code>
* Create a <code>POST</code> form
    1. <code>action="http://localhost:3000/post"</code> (may be different if the server listens on other ports)
    2. <code>method="post"</code>
    3. In this form, add three HTML input tags: <code>command</code>, <code>path</code>, and <code>content</code>
    4. Add a submit button with type of <code>submit</code>
* Display the image by using the image url passed from the server (i.e. the image that served by the server)
    * Your server should pass the `Url` of the file you served using `context` object while rendering
    * Put the image in `<img src='...'>` in a `div` by the forms. As long as it doesn't affect the view of two forms.
    * Optionally, use **Bootstrap** and add a class <code>form-control</code>
* Optionally, put two forms on top of the background image by putting the image in `<div style='background-image: ....'>` using HandleBar's template syntax

* Examples would look like below.
<div markdown="block" class="img">
<img src="../resources/img/hw04-file-system-ubuntu.png" width="100%">
<img src="../resources/img/hw04-file-system-debian.png" width="100%">
</div>

##### Create an area (terminal) where displaying messages sent from the server

For each command, the server responds with the state of file system wrapped in a context object. In this section, you'll display each information in the context object by using some templating syntax and techniques (HINT: you'll use HBS tempalte syntax for iterating an array, an array of objects, and an object. If statement will also be used).

* <code>ls</code>
    1. The server is supposed to pass files and directories in the form of a list of JSON objects.
    2. Display each file or directory in one line with <code>file_type, permissions, number of hard links, owner, group, size, last-modified data, file name</code>
    3. If the path cannot be found, output `ls: No such file or directory`
    4. Example:
        without <code>-l</code> option
        <div markdown="block" class="img">
        <img src="../resources/img/hw04-file-system-ls.png" width="100%">
        with <code>-l</code> option
        <div markdown="block" class="img">
        <img src="../resources/img/hw04-file-system-ls-l.png" width="100%">
        </div>
* <code>tree</code>
    1. The server is supposed to pass the entire file system object
    2. You don't have to display it in a tree structure. Any way of showing the hierarchy would be accepted.
    3. If you would like to create a tree-like directory, please refer to <code>partials</code> to recursively generate a tree-like view
    4. If the directory cannot be found, output `tree: No such file or directory`
    5. Example:
        <div markdown="block" class="img">
        <img src="../resources/img/hw04-file-system-tree.png" width="100%">
        </div>
* <code>cat</code>
    1. The server is supposed to respond the content of the file (a string).
    2. If the file cannot be found, output `cat: No such file or directory`
    3. Example:
        <div markdown="block" class="img">
        <img src="../resources/img/hw04-file-system-cat.png" width="100%">
        </div>
* <code>mkdir</code>
    1. The server is supposed to respond a list of files and directories after the directory is created
    2. If the directory already exists, output `mkdir: File exists`
    3. After create a directory <code>Hi</code>
    <div markdown="block" class="img">
    <img src="../resources/img/hw04-file-system-af-mkdir.png" width="100%">
    </div>
* <code>write</code>
    1. If success, not required to display any messages. But make sure the content is written to the file by using <code>cat</code>
    2. If failed, output `write: No such file or directory`
* If the user enter none of above commands, output `Command Not Found`

</div>

</div>
