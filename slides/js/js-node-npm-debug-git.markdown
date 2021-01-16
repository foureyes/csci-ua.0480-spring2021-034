---
layout: slides
title: Node, NPM, Debugging, Git, and GitHub
---

<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number }}
</section>


<section markdown="block">
# (Hopefully, This Will Help Contextualize the Homework)
</section>

<section markdown="block">
## Node?

__Hmmmm. For a class on Node, we haven't really talked about it too much yet. Does anyone know what Node.js is exactly?__ &rarr; 

* {:.fragment} a JavaScript server side and networking framework 
	* {:.fragment} like JavaScript on the browser, minus the DOM/HTML stuff
	* {:.fragment} but... with more I/O and networking support added in
* {:.fragment} designed to maximize throughput and efficiency through __non-blocking I/O and asynchronous events__
* {:.fragment} some technical details:
	* {:.fragment} it's built on top of V8 (Chrome's JavaScript engine)
	* {:.fragment} it's written in C, C++, and JavaScript
</section>

<section markdown="block">
# In Node, All I/O is Non-Blocking and Asynchronous 

</section>

<section markdown="block">
##  Hold on ... I/O?

__What exactly do we mean by I/O__ &rarr;

* {:.fragment} reading or writing to a database
* {:.fragment} requesting data from a web service
* {:.fragment} scanning through a file
* {:.fragment} waiting for _some network connection_
* {:.fragment} you know... any __input__ and __output__
</section>


<section markdown="block">
## What does blocking I/O look like? 

Using Python and the requests module, it may look something like this. __What do you think the following code would print out?__ &rarr;

<pre><code data-trim contenteditable>
import requests
print('Start')
response = requests.get('http://www.google.com')

# just print out the first 30 characters of the response body
print(response.text[0:30])
print('Done!')
</code></pre>

<pre><code data-trim contenteditable>
Start
<!doctype html><html itemscope
End
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## And non-blocking I/O

This example uses a Node.js library called Request (as well!). __What does this output?__ &rarr;

<pre><code data-trim contenteditable>
const request = require('request');
console.log("Start");
request('http://www.google.com', function (error, response, body) {
    // just print out the first 30 characters of the response body
    console.log(body.slice(0, 30)) 
})
console.log("Done!");
</code></pre>

<pre><code data-trim contenteditable>
Start
Done!
<!doctype html><html itemscope
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Weird, Huh? 

__Why was "Done" output before the response body?__ &rarr;

* the function to print out the body was actually an asynchonous __callback__
* a __callback__ is a function passed as an argument to another function that is expected to be executed at some later time (perhaps when an operation is completed, or a specific event occurs)
* __the callback function is not executed immediately__
* instead, <code>console.log("Done!")</code> is executed next
* when the request to google is done, the callback function is executed, which is at the end of the program
{:.fragment}

<br>
(Other languages have asynchronous, event-driven frameworks as well, including [Twisted](http://en.wikipedia.org/wiki/Twisted_(software)) for Python and [Eventmachine](http://en.wikipedia.org/wiki/EventMachine) for Ruby)
{:.fragment}
</section>

<section markdown="block">
## Some More Details

* Node applications (your actual JavaScript code) are actually a __single process__ 
* but all I/O operations are non-blocking and happen in the background
* this is done through an __event loop__
	* Node just continues to listen for events
	* you specify what code to execute whenever an event happens
	* if something requires I/O, that's spun off in the background, so the event loop can handle other callbacks
* this is all based on the assumption that I/O is the most expensive operation, so why wait for it when you can move on to other code to execute?
* your node app can still block, though (even if I/O is asynchronous)... __how?__ &rarr;
* {:.fragment} if your code is computationally heavy!
</section>

<section markdown="block">

# "Everything runs in parallel, except your code"

</section>
	
<section markdown="block">
## Aaaand More Details

[Even more about single-threaded, but non-blocking in Node](http://stackoverflow.com/questions/14795145/how-the-single-threaded-non-blocking-io-model-works-in-node-js)

A challenge with callbacks is that it may be difficult to acquire the context of the original function that spawned the callback. With JavaScript, though, it's easy! __Why?__

* quoted from the SO post above
* "Every function that requests IO has a signature like function (... parameters ..., callback)" and needs to be given a callback that will be invoked when the requested operation is completed 
* "Javascript's support for __closures__ allows you to use variables you've defined in the outer (calling) function inside the body of the callback - this allows to keep state between different functions that will be invoked by the node runtime independently"
{:.fragment}
</section>

<section markdown="block">
# Node Works Because of JavaScript's Language Features!

</section>
<section markdown="block">
## OK, Got It... 

So... When should you used Node?

* I/O bound workloads (not so much for CPU bound!)
* when you don't want to deal with the complexities of concurrent programming, and your application can fit into an event-driven framework

<br>
Some actual examples

* for web stuff... 
	* like high traffic APIs
	* _soft real time apps_
</section>
<section markdown="block">
## A Bunch of Parentheses

* (not sure if a console-game was a great use-case...)
* (waiting for user input can be considered an I/O bound app, though!)
* (but we used a synchronous prompt library to gather input)
* (you can rewrite with another lib if you want!)
</section>

<section markdown="block">
## Using Node

__(This is obvs, I know, but just for completeness)__. After you've installed via your apt/homebrew/download, you can run node in two ways:

* as a REPL / interactive shell,  which is just: <code>node</code> (CTRL-D exits)
* or to execute a program: <code>node filename.js</code>

<br>
Of course, you can write vanilla Node programs using whatever's built in, but you'll probably some libraries
</section>

<section markdown="block">
### NPM

__NPM__ is Node's official package manager.  __Does anyone know of any other package managers for other languages?__  &rarr;

* {:.fragment} __gem__ for Ruby
* {:.fragment} or __pip__, __easy_install__ for Python
* {:.fragment} or __CPAN__ for Perl
* {:.fragment} or __composer__ for PHP

<br>
Among other things, `npm` allows you to download and install packages (_modules_), as well as remove and upgrade them.
{:.fragment}
</section>

<section markdown="block">
## Installing Packages

<code>npm install packagename</code>

* by default, NPM installs packages in a directory called <code>node_modules</code> in the directory that you run it in
	* __let's see that in action__ &rarr;
	* which is why you should <code>.gitignore</code> <code>node_modules</code> (you don't really want all of the dependencies in your repository)
* that means NPM doesn't install globally by default (nice... unlike _other_ package management systems)

</section>

<section markdown="block">
## Local vs Global Installation

You can use the <code>-g</code> flag to install globally if you need to (and it will be necessary for some things): <code>npm install packagename -g</code>

* some libraries are actually commandline tools that you want to use throughout your system - install these globally
* while others are libraries for specific apps that you're developing (anything that you'd <code>require</code> in your program) should be installed locally

</section>

<section markdown="block">
## More About Global Package Installation

__Why do we want to avoid installing modules globally?__ &rarr;

* {:.fragment} multiple apps, different dependencies
* {:.fragment} maybe even OS level dependencies! 

<br>
__BTW, what are some analogous tools that we'd use to avoid installing packages globally for python and ruby?__ &rarr;
{:.fragment}

* {:.fragment} __rvm__
* {:.fragment} __virtualenv__
</section>


<section markdown="block">
### package.json

Lastly __NPM__ can use a file called __package.json__ to store dependencies. This will usually be placed in the root of your project folder.

Other languages specify dependencies in specific files too:

* gemfile - ruby
* requirements.txt - python

Soooo... if your program depends on a set of modules

* it may be a good idea to put that module in package.json
* ... so that you don't have to remember all of the requirements, and they can be installed all at once!
</section>

<section markdown="block">
## package.json Continued

__A sample package.json for a tic-tac-toe game that requires:__

1. synchronous (blocking) i/o for asking for console input (readline-sync)
2. assertions for unit tests (chai)

<br>
May look like this:

<pre><code data-trim contenteditable>
{
  "name": "tic-tac-toe",
  "version": "1.0.0",
  "dependencies": {
    "readline-sync": "^1.4.4"
  },
  "devDependencies": {
    "chai": "^3.5.0"
  },
}
</code></pre>


</section>


<section markdown="block">
## Modules

So... what is npm installing? What are these _modules_ anyway?

__Modules__ are just JavaScript files!
{:.fragment}

* {:.fragment} you can bring in the code from one file into another file using the `require` function
* {:.fragment} however, your module must explicitly export the objects/functions that can be used by the file that's bringing in the module
* {:.fragment} there are _built-in_ modules
* {:.fragment} ...and you can, of course, write your own modules!

</section>
<section markdown="block">
## A Little More Than Just Files

__From the [node docs on modules](https://nodejs.org/api/modules.html):__

Before a module's code is executed, Node.js will wrap it with a function wrapper that looks like the following:

<pre><code data-trim contenteditable>
(function (exports, require, module, __filename, __dirname) {
    // Your module code actually lives in here
});
</code></pre>

<br>

* which keeps top level variables scoped to the module than global (so when you require a module, it doesn't pollute your global name space!)It helps to provide some global-looking variables that are actually specific to the module, such as:
* the module and exports objects can be used to define what's accessible by the file bringing in the module
* convenience variables: \_\_filename and \_\_dirname, the module's absolute filename and path
</section>

<section markdown="block">
## Using `exports`

1. Create all of your functions ... 
2. Then, at the end, assign module.exports to an object literal containing all of the functions that you want to export

<pre><code data-trim contenteditable>function repeat(ele, n) {
    // implementation
} 
    
function generateBoard(rows, cols, initialValue) {
    // implementation
} 

// ...

module.exports = {
    repeat: repeat,
    generateBoard: generateBoard,
    // ...
}
</code></pre>
</section>


<section markdown="block">
## Another Way

__Create all of your functions in an object and assign that object to module.exports__ &rarr;

<pre><code data-trim contenteditable>
const tic = { 
    repeat: function(value, n) {
        // implementation
    },
    
    generateBoard: function(rows, columns, initialCellValue) {
        // implementation
    },
    
    // ...
}
    
module.exports = tic;

</code></pre>

<br>
Note that if one function depends on another, you'll have to prefix with the object name (`module.exports` or `this`.

</section>

<section markdown="block">
## Aaaaand...

__Create functions as properties on `module.exports`__ &rarr;

<pre><code data-trim contenteditable>
module.exports.repeat = function(value, n) {
    // implementation
}
    
module.exports.generateBoard = function(rows, columns, initialCellValue) {
    // implementation
},
    
// ...

</code></pre>

<br>
Note that if one function depends on another, you'll have to prefix with the object name (`module.exports` or `this`.
</section>


<section markdown="block">
### Node.js - require

Node's built-in function `require` is analogous to:

* PHP's __include__
* Ruby's __require__
* Python's __import__
* Java's __import__

<br>
It returns an object... and that object most likely has some useful methods and properties. From our request example earlier:

<pre><code data-trim contenteditable>
const request = require('request');
</code></pre>
</section>

<section markdown="block">
## Modules Continued

Again, modules allow the inclusion of other JavaScript files into your application. From the Node docs:

> Files and modules are in one-to-one correspondence

In other words, __modules are just JavaScript files__. The [Node docs](http://nodejs.org/api/modules.html#modules_modules) are pretty comprehensive about how modules work.
</section>

<section markdown="block">
## Core Modules

Some modules are __compiled directly into the node binary__. They're available without having to create or download a module. __A couple of useful core modules include:__ &rarr;

* [HTTP](http://nodejs.org/api/http.html) - for creating both HTTP clients and servers
* [File System](http://nodejs.org/api/fs.html) - for manipulating files and directories

<br>
</section>

<section markdown="block">
## Require in Detail

__Using a module__:

* the <code>require</code> function loads a file 
	* it takes a single argument, the name of the file to load (the .js extension can optionally be omitted when loading)
	* it gives back an object
* ...the object that it returns has all of the exported properties of the module / file loaded
* __let's try it out with a core module__ &rarr;

<pre><code data-trim contenteditable>
// bring in the http module
const http = require('http');
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Downloaded Modules

Of course, we're not stuck with just using the core modules. We could download pre-built modules as well. __How did we install some Node modules and how did we use them?__ &rarr;

<pre><code data-trim contenteditable>
npm install module-name
</code></pre>
{:.fragment}

<pre><code data-trim contenteditable>
const prompt = require('readline-sync').prompt;
const request = require('request');
</code></pre>
{:.fragment}

</section>

<section markdown="block">
## Creating your own module:

* there's an available __<code>exports</code>__ object in Node
* creating properties on that object makes those properties _public_ to whatever is _importing_ the file
* variables that aren't exported are _private_ to the module
* __lets take a look (notice that the <code>exports</code> object is not available in the shell)__ &rarr;

<pre><code data-trim contenteditable>
// showing what's in exports
console.log(exports);
</code></pre>
{:.fragment}

<pre><code data-trim contenteditable>
// adding a property to exports
exports.foo = 'bar, baz';
</code></pre>
{:.fragment}

</section>

<section markdown="block">
## All Together

__Here's a full example of creating and using a module__: &rarr;

A module called __creatures.js__:

<pre><code data-trim contenteditable>
exports.makeCreatureList = function (r) {
	return ['narwhale', 'unicorn'];
};
</code></pre>

__And... using that module__: &rarr;

<pre><code data-trim contenteditable>
const creaturesModule = require('./creatures.js');
creaturesModule.makeCreatureList().forEach(function(name) {
	console.log(name);
});
</code></pre>
</section>

<section markdown="block">
## Module Location

__Where do you think the <code>require</code> function looks for a module? (we can probably guess 3 places correctly!)__ &rarr;

Some hints: 
{:.fragment}

* installing modules for homework
* consider the examples in the previous slides
{:.fragment}

1. if it's a __core module__, just bring the module in (it's compiled into the node binary)
2. if it's a __file__ (starts with /, ../, ./, etc.), 
	* try to find that file relative to the location of the file that has the call to require
	* or as an absolute path
3. or load it from the __node\_modules__ folder (which is where modules are downloaded when you install from npm)
{:.fragment}

<br>
Or... just [check out the crazy docs](http://nodejs.org/api/modules.html#modules_all_together).
{:.fragment}
</section>

<section markdown="block">
## Notes About Downloading and Installing Modules

* modules are downloaded and installed in the __node\_modules__ directory located in in the directory that you ran npm
* if it's not found there, it will look at the parent's directory's __node\_modules__ folder
* it will continue to look one directory up until the node\_modules (if it exists) directory at the root of the filesystem is reached 
* __be careful with regards to where things are installed / moving projects around__
</section>

<section markdown="block" data-background="#440000">
# You should place your dependencies locally in <code>node_modules</code> folders

</section>

<section markdown="block">
## Why Modules?

__Why do modules exist? Why is certain functionality broken out into modules? Why would we create our own modules?__

* {:.fragment} modules provide __solutions to commonly encountered programming tasks__
* {:.fragment} they promote __code reuse__ 
* {:.fragment} __namespacing__ and preventing naming collisions
* {:.fragment} organizing code / __keeping related functionality together__
</section>

<section markdown="block">
## Node's Module System

JavaScript, the language, doesn't actually have a module system!

Node's module system is built off of a spec/API called CommonJS.

__You won't be able to use this same module system in browser implementations of JavaScript without first including other JavaScript files/libraries (and there are a few to choose from) manually on your page.__
</section>

<section markdown="block">
# Debugging

</section>
<section markdown="block">
## Let's Write a Quick Function

__Create a function that determines if a set of parentheses is balanced (what does that mean?):__ &rarr;

* __name__: isBalanced
* __signature__: isBalanced(string) &rarr; boolean
* __parameters__: a string (assume that it only consists of "(" and ")")
* __returns__: true if the parentheses are balanced, false if they aren't
* {:.fragment} a set of parentheses are balanced if there's exactly one closing parentheses for each open parentheses
* {:.fragment} __why wouldn't comparing counts work?__ &rarr;
* {:.fragment} <code>)(</code>
* {:.fragment} one algorithm is to push open parentheses when you see them, but pop them when you see closed parentheses

</section>

<section markdown="block">
## Here's an Implementation

<pre><code data-trim contenteditable>
const isBalanced = function(s) {
    const stack = [], balanced = true;

    for(let i = 0; i < s.length; i++) {
        const ch = s.charAt(i);    
        if (ch === '(') {
            stack.push(ch);
        } else if (ch === ')') {
            if (stack.length === 0) {
                balanced = false;
                break;
            } 
            stack.pop();
        }
    }

    if (stack.length !== 0) {
        balanced = false;
    }

    return balanced;
};
</code></pre>

</section>

<section markdown="block">
## Testing It

<pre><code data-trim contenteditable>
console.log(isBalanced('()'));
console.log(isBalanced(')('));
console.log(isBalanced('()()'));
console.log(isBalanced('()())'));
</code></pre>

</section>
<section markdown="block">
## Let's Check Out Some Debugging Tools...

Let's intentionally create a logical error in our code (perhaps return immediately after popping). __To figure out what went wrong, we can...__ &rarr;

* {:.fragment} just print stuff out with console.log (the old fashioned way!)
* {:.fragment} use a debugger
</section>

<section markdown="block">
## The Commandline Debugger

<code>node debug myscript.js</code>

Let's give this a whirl...

Wait... what? [The commandline is hard.](http://www.nytimes.com/1992/10/21/business/company-news-mattel-says-it-erred-teen-talk-barbie-turns-silent-on-math.html)  [Let's go shopping](http://itre.cis.upenn.edu/~myl/languagelog/archives/002892.html)
{:.fragment}

_Terrible_. Yay 90's. Though the __"elaborate nationwide publicity stunt designed to ridicule sexual stereotyping in children's toys"__ was pretty neat!
{:.fragment}
</section>

<section markdown="block">
## Don't Worry, There Are Other Debugging Tools Out There

* [Sublime Web Inspector](http://sokolovstas.github.io/SublimeWebInspector/) (for Sublime, of Course)
* [WebStorm](http://www.jetbrains.com/webstorm/) a commercial JavaScript IDE <span class="fragment">(what a spectacular name, though)</span>
* [Node Inspector](https://github.com/node-inspector/node-inspector) - just like Chrome's Web Inspector!

<br>
I'm partial to __Web Inspector__ because it's IDE agnostic, and as you know, as <strike>an old person</strike> vintage editor enthusiast, I use vim.
{:.fragment}
</section>

<section markdown="block">
# <strike>Fail</strike> Live Demo Time
</section>

<section markdown="block">
## Node Inspector

* install node-inspector: <code>sudo npm install -g node-inspector</code>
* (hey did you notice that it's global... __why__ &rarr;)
* run node-inspector: <code>node-inspector</code>
* open another terminal window...
* start your app, the --debug-brk option will pause on the first line: <code>node --debug-brk app.js</code>
* open Chrome and go to http://localhost:8080/debug?port=5858

</section>

<section markdown="block">
## Node Inspector Continued

Same as Chrome Web Inspector!  [See the docs!](https://developer.chrome.com/devtools/docs/javascript-debugging)

Like any other debugger, you can:

* continue
* step over
* step in
* step out
* watch (check out the variables in the closure even!)
* set breakpoints
* have. lots. of. fun.
</section>

<section markdown="block">
# Great. Wrote Some Code. Let's Put it in Version Control.
</section>

<section markdown="block">
## Version Control (With Git)

The material in these slides was sourced from:

* [gitref.org](http://gitref.org/)
* [pro git](http://git-scm.com/book/en/Getting-Started-About-Version-Control)
* [git - the simple guide](http://rogerdudler.github.io/git-guide/)
</section>

<section markdown="block">
## Um.  First... Archiving?

__What are some ways you've used to keep / save different versions of files?__ &rarr;

* adding a date to a file name?
* adding extensions to files, like .bak?
* organizing copies by folders?
* ...perhaps folders with timestamps / dates
* ummm... etc.
{:.fragment}

<br>
__What are some drawbacks of these methods of saving versions of files?__ &rarr;
{:.fragment}

* it's all manual 
* ... and, consequently, tedious and error prone
{:.fragment}
</section>

<section markdown="block">
## Sharing / Collaborating

Have you ever worked on a programming project with more than one person?  __How did you share your code?__ &rarr;

* email?
* usb?
* dropbox?
{:.fragment}

<br>
__What are some issues with these methods (well, except for dropbox)?__
{:.fragment}

* hard to find a specific version
* which one is the latest?
* how do you deal with conflicting changes?
{:.fragment}
</section>

<section markdown="block">
# Enter: Version Control
</section>

<section markdown="block">
## What's Version Control?

__Version control software__ allows you to record changes to a file or set of files over time so that you can inspect or even revert to specific versions.

* can be applied to any kind of file, but we're mostly using text files
* with version control, you can:
	* leave __comments__ on changes that you've made
	* __revert__ files to a previous state
	* __review__ changes made over time, and track __who__ made them
	* __you can easily recover from accidentally breaking or deleting code__
	* automatically __merge__ changes to the same file
</section>

<section markdown="block">
## So... Um.  Why?

<aside>What does this all mean?</aside>  

Version control can help us:

* stop using .bak files!
* collaborate with others 
	* share our code
	* merge changes from different sources
* document our work
* group related changes
</section>

<section markdown="block">
# Oh.  And it's kind of _expected_ that you know this as a professional programmer.
</section>

<section markdown="block">
##  We’re Using git!

* __git__ is the version control system that we're using
* it’s a __modern distributed version control__ system
* it has emerged as __the standard__ version control system to use
* (some others are...)
	* mercurial
	* subversion (svn)
	* cvs
</section>

<section markdown="block">
## A Bit About Git

It was developed by Linus Torvalds... __who?__ &rarr;

<div markdown="block" class="img-container">
![Linux](http://cdn.arstechnica.net/wp-content/uploads/2013/02/linus-eff-you-640x363.png)
</div>

<div class="fragment" markdown="block">
(the guy who made [Linux](http://en.wikipedia.org/wiki/Linux))
</div>

What a nice person!
{:.fragment}
</section>

<section markdown="block">
## Github vs git

__GIT AND GITHUB ARE DIFFERENT!__ 

* __github is a website__ that hosts git repositories
* on it's own, __git is just version control__

</section>

<section markdown="block">
## Who Uses Git and Github?

Git is used to maintain a variety of projects, like:

* the [Processing IDE](https://github.com/processing/processing)
* or [Twitter's Bootstrap](https://github.com/twbs/bootstrap)
* or [Ruby on Rails](https://github.com/rails/rails)

Some people use github to distribute open source code... for example:

* __id software__ has a bunch of [stuff hosted on git](https://github.com/id-Software)
</section>

<section markdown="block">
## Local Version Control

[See the diagram on pro git](http://git-scm.com/book/en/Getting-Started-About-Version-Control)

* equivalent to what we may have done manually:
	* save files in folder with locally as a _snapshot_ of current state of code
	* recover by going through folders on computer
	* see versions by the timestamped folder name
* all of this is automated through software
	* stores changes to your files in a local database
	* an example of local version control is RCS

</section>

<section markdown="block">
## Centralized Version Control

[See the diagram on pro git](http://git-scm.com/book/en/Getting-Started-About-Version-Control)

* promoted collaboration; everyone got code from the same place
* single server that has all of the versioned files
* everyone working on it had a _working copy_, but not the full repository
* an example is subversion (SVN)

</section>

<section markdown="block">
## Distributed Version Control

[See the diagram on pro git](http://git-scm.com/book/en/Getting-Started-About-Version-Control)

* everyone has full repository
* can connect to multiple __remote__ repositories 
* can push and pull to individuals, not just _shared_ or _centralized_ servers
* single server that has all of the versioned files
* everyone working on it had a _working copy_

</section>

<section markdown="block">
# We're Using Git, a Distributed Version Control System

</section>

<section markdown="block">
# (But We're Really Going to Use a Central Repository Anyway)

</section>

<section markdown="block">
### A Quote...

From a co-worker of mine, a software engineer that builds web apps:

__"Git is the hardest thing we do here"__

(it's a little complicated, but not for what we're using it for)



</section>


<section markdown="block">
## Some Terminology

__repository__ - the place where your version control system stores the snapshots that you _save_

* think of it as the place where you store all previous/saved versions of your files
* this could be:
	* __local__ - on your computer
	* __remote__ - a copy of versions of your files on another computer
</section>

<section markdown="block">
## Some More Terminology

* __git__ - the distributed version control system that we're using
* __github__ - a website that can serve as a remote _repository_ for your project

__What's a remote repository again?__ &rarr;

<div class="fragment" markdown="block">
A copy of versions of your files on another computer/server
</div>
</section>

<section markdown="block">
## Where Are My Files

In your __local repository__, git _stores_ your files and versions of your files in a few different _conceptual_ places:

* __the working directory / working copy__ - stores the version of the files that you're currently modifying / working on
* __index__ - the staging area where you put stuff that you want to _save_ (or... that you're about to _commit_)
* __HEAD__ - the most recent saved version of your files (or... the last _commit_ that you made)
</section>

<section markdown="block">
## Another Way to Look at It

* __the working directory / working copy__ - stuff you've changed but haven't saved
* __index__ - stuff that you're about to save
* __HEAD__ - stuff that you've saved
</section>

<section markdown="block">
## Aaaaand.  More Terminology.

* __commit__ - save a snapshot of your work
* __diff__ - the line-by-line difference between two files or sets of files
</section>

<section markdown="block">
## Two Basic Workflows

1. Creating and setting up local and remote repositories
2. Making, saving, and _sharing_ changes
</section>

<section markdown="block">
## Creating Repositories

* create a local repository
* configure it to use your name and email (for tracking purposes)
* create a remote repository
* _link_ the two
</section>

<section markdown="block">
## Making, Saving, and Sharing Changes

* make changes
* put them aside so they can staged for saving / committing
* save / commit
* send changes from local repository to remote repository
</section>

<section markdown="block">
## Ok.  Great!

__Remind me again, what's github?__ &rarr;

* __github is a website__ 
* it can serve as a __remote git repository__
	* that means it can store all versions of your files
	* (after you've sent changes to it)
</section>

<section markdown="block">
# We can now submit assignments using the commandline

### (Um. Yay?)
</section>


<section markdown="block">

# Creating and Setting Up Repositories 

</section>


<section markdown="block">
## Commands for Creation and Set Up of Repositories

We'll be using this for most of our work...

* <code>git clone REPO_URL</code>

<br>
This stuff, not so much, but you should know them too...

* <code>git init</code>
* <code>git config ...</code>
	* <code>git config user.name  "__your user name__"</code>
	* <code>git config user.email __your@email.address__</code>
* <code>git remote add REMOTE_NAME REMOTE_URL</code>
</section>

<section markdown="block">
## git clone

Again, for most of our work, you'll just be cloning an existing repository (creating a local repository from a remote one).

<pre><code data-trim contenteditable>
git clone REPOSITORY_URL
</code></pre>

__REPOSITORY_URL__ is usually going to be something that you copy from github.
</section>

<section markdown="block">
## git init

__git init__ - creates a new _local_ repository (using the files in the existing directory)

* you can tell a repository is created by running ls -l ... it creates a .git directory
* again, this creates a new repository - a place to archive / save all versions of your files

<pre><code data-trim contenteditable>
# in the directory of your repository
git init
</code></pre>
</section>


<section markdown="block">
## git config

__git config__ - configure your user name and email for your commits 

* this has nothing to do with your computer's account or your account on github
* this information helps track changes

<pre><code data-trim contenteditable>
# in the directory of your repository
git config user.name  "foo bar baz"
git config user.email foo@bar.baz
</code></pre>
</section>


<section markdown="block">
## git remote add 

__git remote add__ - add a remote repository so that you can synchronize changes between it and your local repository

<pre><code data-trim contenteditable>
git remote add REPOSITORY_NAME REPOSITORY_URL
</code></pre>

</section>

<section markdown="block">
## Typical Workflow for Making Changes

1. make changes
2. git status (to see what changes there are)
3. git add --all (to stage your changes for committing)
4. git status (to see your staged changes)
5. git commit -m 'my message' (to save your changes)
6. git push origin master (optionally send/share your changes to a remote repository)

Check out a workflow chart here: [http://rogerdudler.github.io/git-guide/img/trees.png](http://rogerdudler.github.io/git-guide/img/trees.png)
</section>

<section markdown="block">
## git status

__git status__ - show what changes are ready to be committed as well as changes that you are working on in your working directory that haven't been staged yet

<pre><code data-trim contenteditable>
git status
</code></pre>
</section>

<section markdown="block">
## git add

__git add__ - mark a change to be staged

<pre><code data-trim contenteditable>
# in the directory of your repository

# add all
git add --all 

# add specific file
git add myfile.txt
</code></pre>
</section>

<section markdown="block">
## git commit

__git commit__ - take a snapshot of your work

<pre><code data-trim contenteditable>
# in the directory of your repository
# don't forget the commit message

git commit -m 'commit message goes here'
</code></pre>
</section>

<section markdown="block">
## git log

__git log__ - show commit history of your repository or file

<pre><code data-trim contenteditable>
# in the directory of your repository

git log

#you can also colorize the output:

git log --color
</code></pre>

</section>

<section markdown="block">
## git diff

__git diff__ - show the line-by-line differences between your last commit and your working directory

<pre><code data-trim contenteditable>
# in the directory of your repository
# use --color for syntax highlighting

git diff --color

</code></pre>
</section>

<section markdown="block">
## git reset

__git reset__ - revert last commit... or unstage changes

<pre><code data-trim contenteditable>
# unstage changes
git reset filename.txt

# revert last commit
git reset HEAD^

</code></pre>
</section>

<section markdown="block">
## git push

__git push__ - send your code to a remote repository

<pre><code data-trim contenteditable>
git push

# or to specify... push master branch to remote 
# repository called origin
git push origin master
</code></pre>
</section>

<section markdown="block">
# OK... how about getting all of this set up for our assignment?

</section>
{% comment %}
<section markdown="block">
## Getting Private Repositories

In order to set up private repositories with consistent names, we'll have to do a few things:

1. {:.fragment} __Send me your GitHub username [through this form](https://docs.google.com/a/nyu.edu/forms/d/1mgHQ2NupHDAlirAcbYjeSShFeAWNyPH1sqCqa7zTe2M/viewform)__ (not via email)
2. {:.fragment} I'll add you to the class _organization_ on GitHub (basically, a mechanism to group a bunch of users together)
3. {:.fragment} You'll receive an email to confirm that you're going to be part of the _organization_
4. {:.fragment} __Click on the link in the email...__
5. {:.fragment} I'll create a private repository for you
	* {:.fragment} (someone mentioned that you can actually create your own private repos in the organization)
	* {:.fragment} (but I'd rather create repositories for everyone to keep the names consistent)
    * {:.fragment} (also, depending on your client, you may need to init first instead of clone)
</section>

<section markdown="block">
## Speaking Of

### I have close to 90% of your github usernames

* that's great (!)
* but there are a few people that didn't send me their username (!?)

<br>

### For those of you that have your repository all set up...

* Your repository __should be private__; you're the only user that can see your repository (__let me know if isn't the case!__) &rarr;
* You should try pushing code to your repository to make sure that your git installation works fine...

</section>

<section markdown="block">
## Please Try Your Homework ASAP

Mainly because a lot of things could go wrong, and __I'll be more likely to be able to help you if you let me know about your issues early__. 

* {:.fragment} maybe you can't install __Node.js__ (for example, someone had permissions issues with homebrew and installation on OSX)
* {:.fragment} or you can't install a module...  :
* {:.fragment} or perhaps __git__ _doesn't work_

</section>
<section markdown="block">
## Don't Wait Last Minute!

This will help uncover the common problems in the previous slide.

* {:.fragment} install __Node.js__ and __NPM__ 
* {:.fragment} try installing __readline-sync__ with __NPM__
* {:.fragment} check that you can use git to push to your private repository

<br>
In fact, you don't have to wait for your private repository to be setup.
{:.fragment}

* {:.fragment} you can just start coding
* {:.fragment} ... when you have your private repo, clone it so that an entirely new directory is created (don't clone into your existing work)...
* {:.fragment} ... and add the files that you had been working on 
</section>
{% endcomment %}

<section markdown="block">
## Regarding Submission

Again, I will clone all of the repositories at the homework's deadline. __That means...__ &rarr;

* any commits made after the deadline...
* won't be seen by the graders

</section>
<section markdown="block">
## Details Again...

(they may not have made sense at the beginning of class... but maybe now?)

* if git clone doesn't work, use init workflow
* name the files and function exactly as specified
* commandline arguments: <code>process.argv[2]</code>

</section>


