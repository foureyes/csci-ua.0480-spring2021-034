---
layout: slides
title: "Project Setup"
---
<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>
<section markdown="block">
## Topics

For the first few homeworks, I've setup skeleton projects for you. _Eventually_ you'll have to create your own project from scratch. __So... in this set of slides, we'll talk about some things were done to set up homeworks 1 through 3.__ &rarr;

* generating a `package.json`
* using `--save` vs `--save-dev`
* linting / `eslint` 
</section>

<section markdown="block">
## package.json

__package.json__ is a file that contains metadata about your project. It tells <code>npm</code> 

* {:.fragment} how to __install__ your project
* {:.fragment} how it's __published__ (if it's a public project)
* {:.fragment} how it's used as a __module__
* {:.fragment} how to retrieve its __dependencies__
* {:.fragment} etc.
<br>

<br>
There's a [very comprehensive page](https://www.npmjs.org/doc/files/package.json.html) on <code>package.json</code> on [npm's site](https://www.npmjs.org).
{:.fragment}
</section>

<section markdown="block">
## package.json for Dependencies

### We're using it mainly for dependency management.

* a lot of the data in <code>package.json</code> is used for specifying how your code is imported into another file (what name to use, what the license is, etc.).
* we mostly care about the fact that it helps us __download all of our project's dependencies at the correct versions__ 
* instead of installing dependencies manually, one-by-one, we can just <code>npm install .</code>

</section>

<section markdown="block">
## package.json Format

As the name implies (uh, of course), __package.json is _actually_ a json file__ (no surprise there). __How is that different from an object literal again?__ &rarr; 

* {:.fragment} use double quotes for property names 
* {:.fragment} values can be a string, number, another object, an array, boolean or null
* {:.fragment} (not functions, function calls, expressions that need to be evaluated)
</section>
<section markdown="block">
## Required Fields in package.json

__There are two required properties__:

* {:.fragment} the short, but descriptive __name__ of your project
    * all lowercase
    * one word, no spaces
    * dashes and underscores allowed
* {:.fragment} your project's __version__ in the format of MAJOR.MINOR.PATCH [see semver spec](https://docs.npmjs.com/getting-started/semantic-versioning)
* {:.fragment} __why?__ <span class="fragment">together, these become a unique identifier for your module at a specific version</span>

<br>
You'll also get warnings on the following, but everything will work even if you don't have these:
{:.fragment}

<pre><code data-trim contenteditable>description
repository field
</code></pre>
{:.fragment}


</section>

<section markdown="block">
## Additional Fields in package.json

Some other data in <code>package.json</code> includes:

* __author__ - name of author
* __private__ - a _boolean_ specifying whether or not to publish publicly
* __dependencies__ - an object of all of the dependencies that your project has, along with their version numbers
* __devDependencies__ - and object of all of the dependencies that are necessary for _working on/developing_ your project (such as testing libraries, build tools)

</section>

<section markdown="block">
## Example package.json

__An example minimal <code>package.json</code>__:

<pre><code data-trim contenteditable>
{
	"name": "my-site",
	"version": "1.0.0",
	"author": "Joe Versoza",
	"private": true,
	"dependencies": {}
}
</code></pre>
</section>

<section markdown="block">
## Or You Can Generate ...

Of course, you don't have to write all of that by hand.  __You can use npm to create a new one for you!__  Just run:

<pre><code data-trim contenteditable>
npm init
</code></pre>

<br>
It'll ask you a bunch of questions.  

* the default answers are adequate for our purposes
* (so you can just press [ENTER] to go through it

__Let's give it a try__ &rarr;

(remember, name is all lowercase with underscores and dashes)
{:.fragment}
</section>

<section markdown="block">
## Fields Generated

<pre><code data-trim contenteditable>{
  "name": "projectname",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
</code></pre>
</section>

<section markdown="block">
## Specifying Dependencies

You can manually specify dependencies. The __dependencies__ property is an object with:

* module names as keys 
* version specifiers as values

<br>
<pre><code data-trim contenteditable>
{
	"name": "foo",
	"version": "1.0.0",
	"dependencies": {
		"request": "^2.44.0"
	}
}
</code></pre>
</section>
<section markdown="block">
## Version Specifiers

A list of [example version specifiers is included npm's documentation](https://www.npmjs.org/doc/files/package.json.html#dependencies). __Some common ones include__:

* <code>version</code>- exact version
* <code>^version</code> - compatible with version
* <code>>version</code> - greater than version
* <code>1.2.x</code> - all 1.2.x versions
* <code>*</code> - matches any version

<!--* -->
</section>

<section markdown="block">
## Installing Packages

__How do I install the request module?__ &rarr;

<pre><code data-trim contenteditable>
npm install request
</code></pre>
{:.fragment}

We could then manually add that to our <code>package.json</code> if it's a dependency of our project... __just drop it into the <code>dependency</code> property.__
{:.fragment}


</section>

<section markdown="block">
## Installing Packages Continued

As we're developing, we may want to _keep track_ of all of the packages/modules that we've installed.

Using the <code>--save</code> flag will add it to your <code>package.json</code> automatically.

<pre><code data-trim contenteditable>
npm install request --save
</code></pre>

__Let's see how that works.__ &rarr;
</section>

<section markdown="block">
## Dependencies vs Dev Dependencies

There's also a <code>--save-dev</code> flag. This flag saves what you just installed to the devDependencies property.

* __dependencies__ - tracks required libraries and packages for you actual project to be installed and deployed
* __devDependencies__ - dependencies that are only necessary if you're __working on__ or __developing__ a project... __what are some examples__ &rarr;
	* {:.fragment} linter, like JSHint or ESLint
	* {:.fragment} build tools, like grunt or gulp
	* {:.fragment} unit test tools, like mocha or jasmine
</section>

<section markdown="block">
##  Speaking of Linters

A __linter__ is a program that performs static analysis on your code to determine if there is any use of _suspicious_ or non-standard language constructs. 

__Static analysis__ is the inspection of the text of your program without actually executing it.

As you know, the linter that we're using is __ESLint__. __What are some issues that it reports on that could potentially lead to errors?__ &rarr;

* {:.fragment} `===` vs `==`
* {:.fragment} variables declared without `var`
* {:.fragment} the absence (or presence) of semicolons
* {:.fragment} etc.

</section>

<section markdown="block">
## Linter Features

__So, linters have actually moved beyond just detecting potential problems/errors in code. They also can:__ &rarr;

* {:.fragment} check for adherence to stylistic conventions
    * {:.fragment} (such as line length, camel-case, indentation, etc.)
* {:.fragment} report on cyclomatic complexity
    * {:.fragment} ...a software metric that measures that amount of linearly independent paths through your code
    * {:.fragment} basically, how _complex_ your code is

</section>

<section markdown="block">
## Linter History / For Other Languages

__lint__ was _actually_ the name of a program that would check your C code for potential errors (errors such as dividing by zero, using variables before they're set, etc.).

__Of course, linters are no longer just for C.__ There are linters for other languages (and pretty popular with dynamically typed languages as well):

* Java - [SonarQube](http://www.sonarqube.org/) for code quality inspection
* Python - pylint and pyflakes
* JavaScript ... &rarr;

</section>

<section markdown="block">
## JavaScript Linters

__There are a actually a bunch of linters for JavaScript, not just ESLint__:

* [ESLint](http://eslint.org/) - highly configurable linter for ES5 and ES6, reports on both potential code issues as well as adherance to stylistic conventions
* [JSHint](http://jshint.com/) - community driven fork of JSLint, pretty relaxed default configuration, reports on cyclomatic complexity, shifting away from style suggestions
* __JSLint__ - oldest, _most opinionated_, and non-configurable (but created by the author of the classic JS book, _JavaScript the Good Parts_, Douglas Crockford)

<br>
__The _trend_ seems to be [shifting towards ESLint](http://www.npmtrends.com/jshint-vs-eslint-vs-jslint-vs-babel-eslint-vs-jscs) in the last year (argh, [JavaScript fatigue](http://thefullstack.xyz/javascript-fatigue/) is _real_)__.

</section>
<section markdown="block">
## ESLint

__You can install ESLint through npm (of course).__

<pre><code data-trim contenteditable>
npm install eslint --save-dev
</code></pre>


* [See the full installation instructions](http://eslint.org/docs/user-guide/getting-started)
* [For integration with various editors, check out ESLint's install page](http://eslint.org/docs/user-guide/integrations)
* __For example, it works on the commandline, with [vim](https://github.com/scrooloose/syntastic/tree/master/syntax_checkers/javascript), with [atom](https://atom.io/packages/linter-eslint), with [SublimeText](https://github.com/roadhump/SublimeLinter-eslint)__ &rarr;
</section>

{% comment %}
<section markdown="block">
## JSHint Configuration 

Out-of-the-box, JSHint has a default configuration that can be used for linting. However, this may be too relaxed or too restrictive for you. __If you want to configure JSHint, you can edit a `.jshintrc` file (you might have seen this in your project directory)... and here's an example:__ &rarr;

<pre><code data-trim contenteditable>
{
	// allow globals for node and mocha 
    "node": true, 
    "mocha": true,
    
    // ..

    // prohibit use of explicitly undeclared variables.
    "undef": true,
}
</code></pre>

You can also place comments on top of a file or before a line to explicitly set options for that file or line:

<pre><code data-trim contenteditable>
/* jshint expr: true, maxlen: false */
</code></pre>

</section>
{% endcomment %}
