---
layout: homework
title: CSCI-UA.0480 - fs.readFile
---
<div class="panel panel-default">
	<div class="panel-heading">Background Material on fs.readFile</div>
	<div class="panel-body" markdown="block">

## Working with `fs.readFile`

IO in node can be tricky because of its async nature and callback based API. That is, if you want to make something happen __after__ an IO operation, such as reading a file, reading from  a network resource, writing to a database, etc. ... you have to put that code in the callback function of the IO operation. A good example of this is using [fs.readFile](https://nodejs.org/api/fs.html#fs_fs_readfile_file_options_callback), an async function for - as the name implies - reading data from a file (note that there's an synchronous version too, but we're avoiding using that for now).


### Background 


The trickiest parts of `fs.readFile` are:

1. dealing with callbacks
2. using the right `this` if the callback is a method
3. reconciling the number of arguments expected for a callback versus the actual number of arguments in the function you'll use as a callback

This guide will cover:

1. Using `fs.readFile`
2. Using a method as a callback for `fs.readFile`
3. Passing parameters to a callback

<br>

### Using `fs.readFile`

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

### Using a method as a callback

It turns out that the callback to `readFile` (or any function that requires a callback) can be a method plucked from an object. However, if the callback needs to access the `this` property of the original object, `this` has to bound explicitly. Let's see the problem:

* Imagine you have the following object that represents a redacted file...
* It takes a `fileName` and a `word` as arguments to the constructor
* Calling `printFile` will print out the contents of the file with all occurrences of `word` redacted (in this case, it's replaced with the string, `SECRET`)
* Here's a possible implementation:
    <pre><code data-trim contenteditable>const fs = require('fs');
class RedactedFile {
  constructor(fileName, word) {
    this.fileName = fileName;
    this.word = word;
  }<br>
  printFile() {
   fs.readFile(this.fileName, this.handleRead); 
  }<br>
  handleRead(err, data) {
    // convert to string
    let s = data + '';
    // let's try to replace every occurrence of this.word!
    const replacementPattern = new RegExp(this.word, "g");
    s = s.replace(replacementPattern, 'SECRET');
    // print out the result
    console.log(s);
  }
}
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
* Instead, we get an error saying that that JavaScript cannot read the property `word` on `undefined` which implies that the `this` in `this.word` is `undefined`
* How did this happen?
    * `this.handleRead` was passed in to `fs.readFile` as a callback...
    * but when the callback actually gets executed, `this` within the callback function isn't actually bound to the original object (because when the callback is invoked, it's not invoked as a method, but as a regular function call!)
	* additionally, __ES6 classes__ are in strict mode, so `this` in regular function calls are actually undefined (when not in strict mode, `this` in regular function calls is the global object or `window`)
    * consequently `this.word` will cause an error because `this` is `undefined`
* As a result, we have to explicitly set the `this` value of the callback
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

### Passing arguments to a callback

Imagine if our `handleRead` function took an extra argument, a disclaimer.

<pre><code data-trim contenteditable>handleRead(disclaimer, err, data) {
    let s = data + '';
    const replacementPattern = new RegExp(this.word, "g")
    s = s.replace(replacementPattern, 'SECRET');
    console.log(disclaimer);
    console.log(s);
};
</code></pre>

Now... we have an issue, because the callback that should be supplied to `readFile` should only have `err` and `data` as its two arguments (but now our callback has 3!). How can we transform our callback so that it only takes 2 arguments like it did before? Once again, we'll rely on arrow functions or `bind`!

1. our arrow function can have only 2 arguments, but pass in disclaimer as the 1st argument when calling the original method
	<pre><code data-trim contenteditable>printFile() {
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
    const disclaimer = 'This file has been redacted';</br>
    // bind disclaimer as the first parameter
    fs.readFile(this.fileName, this.handleRead.bind(this, disclaimer)); 
};
</code></pre>

<br>

</div>

</div>
