---
layout: slides
title: "Node Modules (CommonJS)"
---

<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>


<section markdown="block">
## Modules

__A modules is a file that contains some JavaScript (functions, variables, etc.)__. Node.js has two methods for breaking up a large program into separate __modules__.

1. CommonJS Modules
2. [ES6 Modules](https://nodejs.org/api/esm.html)

Both allow the inclusion of JavaScript code in _other_ files, but the way that this is accomplished is different in both methods.


</section>

<section markdown="block">
## We're Not Using it Though 

__We're not going to use ES6 modules__ despite the fact that it is now the _standard_ for bringing in modules.

1. it's _actually_ in the ECMAScript specs
2. it can be used on both the server and the client
3. it's already widely supported in browsers

To read more about ES6 Modules, check out [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules), [exploring js](https://exploringjs.com/es6/ch_modules.html#sec_basics-of-es6-modules) or the [node docs](https://nodejs.org/api/esm.html#esm_modules_ecmascript_modules).

ES6 module syntax has recently been supported in node without needing flags, ⚠️⚠️⚠️ but the node documentation still uses CommonJS modules. Consequently, __we'll focus on CommonJS on the server__.

</section>

<section markdown="block">
## CommonJS Modules

__CommonJS allows the inclusion and execution of JavaScript in other files by using:__ &rarr;

* `export` or `module.exports` in a module to specify what functions, classes, or objects are _allowed_ to be included
* the `require` function to bring in exported objects...

</section>

<section markdown="block">
## Creating a Module

__To create a module:__ &rarr;

1. create a `.js` file.
2. add code to that file
3. any objects that are allowed to be exported should be added to either `exports` or `module.exports` as values of properties

</section>

<section markdown="block">
## `exports` and `module.exports`

Both `exports` and `module.exports` are initially __empty objects that you can add properties to__:

```
module.exports.hello = function() {console.log('hello'}
module.exports.bye = function() {console.log('bye'}
```
{:.fragment}

Alternatively, you can just assign a new value to these names, and that value is what is exported!
{:.fragment}

```
module.exports = function() {console.log('both')}
```
{:.fragment}

</section>
<section markdown="block">
## require

__To use modules that you've created, use the built in function, `require`:__  &rarr;

1. `require` has a single parameter: the module to import
	* the module can be a path to a `js` file
	* ...or the name of the module (a module that was installed or a built in module, such `fs` or `express`)
2. it returns the object represented by `export` or `module.exports`

</section>

<section markdown="block">
## Example 1

__What's the output?__ &rarr;

```
// module.js
const f = n => console.log(n + 1);
const g = s => console.log(s)
const obj = {a: 'b'};

module.exports.mystery = f;
module.exports.enigma = obj;
```
{:.fragment}

```
const m = require('/mymodule.js');
m.mystery(2);
```
{:.fragment}

```
3
```
{:.fragment}

</section>

<section markdown="block">
## Example 2

__What's the output?__ &rarr;

```
// mymodule.js
greeting = 'hello'
module.exports = greeting;

// main.js
const s = require('mymodule.js');
console.log(s);
```

```
hello
```

</section>

<section markdown="block">
## `__filename` and `__dirname`

Your JavaScript modules contains two "built-in" variables:

1. `__filename`: absolute path to the module file, including file name
2. `__dirname`: the absolute path to the directory containing the file

Note that:

* if used in the "main" file, then it's the path to the main file
* if used in a module, both are the path to that module, even if the module is included!

</section>


<section markdown="block">
## Under the Hood

Where do these variables (`__filename`, `exports`, etc.) come from? __They're actually parameters to a function that wraps the module code!__

From [the node docs](https://nodejs.org/api/modules.html#modules_the_module_wrapper):
{:.fragment}

```
(function(exports, require, module, __filename, __dirname) {
// Module code actually lives in here
});
```
{:.fragment}

__Why?__ <span class="fragment">variables seem global, but are actually contained in function scope... and we get to use these built in variables!</span>
</section>

<section markdown="block">
## The Future of Modules

We're stuck with commonjs for now, as we don't want to stray too far from the docs, but you're welcome to use ES6 modules. A few differences (in node):

* modules should be named with `.mjs` (or [node should have a `package.json` with a type field or node should be run with a specific flag](https://nodejs.org/api/esm.html#esm_enabling))
* use the `export` keyword to export objects one by one
* use the `import` keyword [to bring in a module](https://nodejs.org/api/esm.html#esm_import_specifiers)

```
// mymodule.mjs
export const a = 1;

// main.mjs
import * as m from './mymodule.mjs';
console.log(m.a);  
```
</section>
