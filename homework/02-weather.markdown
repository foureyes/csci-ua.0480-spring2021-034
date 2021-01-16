---
layout: homework
title: CSCI-UA.0480 - Homework #2
---

<div class="panel panel-default">
  <div class="panel-heading">Homework #2</div>
  <div class="panel-body" markdown="block">

# Higher Order Functions: Exercises and Processing Data - __Due Feb 18 at 11pm__

## Overview

### Description

__hoffy.js__ - Write a series of functions that demonstrate the use of the rest operator (or call/apply), and higher order functions

__analytic.js__, __tempAnalytic.js__, __readWeatherFs.js__, and __readWeatherUrl.js__ - Generate reports analyzing weather data,  in two parts):

* An initial version that works off of a local `json` file
* A second version that works off of remote urls containing json (you can overwrite the previous part with this code)
* The folder structure showing all files should look like

```
├── .eslintrc.js
├── historical-hourly-weather-data-json
│   └── temperature.json
└── src
    ├── hoffy.js
    ├── readWeatherFs.js
    ├── readWeatherUrl.js.js
    ├── analytic.js
    └── tempAnalytic.js
```

* `hoffy` - contains your higher order functions
* `tempAnalytic` and `readWeatherFs` - a module with a report generating function and a file that uses it to run a report on a file read locally from your file system
* `analytic` and `readWeatherUrl` - a module with a _flexible_ report generating function and a file that uses it to create a report on multiple files programmatically downloaded from (mostly) unknown urls


### Submission Process

You will be given access to a private repository on GitHub. It will contain unit tests, stub files for your code and an `.eslintrc.js`

* The final version of your assignment should be in GitHub.
* __Push__ your changes to the homework repository on GitHub.

### (4 points) Make at Least 4 Commits

* Commit multiple times throughout your development process.
* Make at least 4 separate commits - (for example, one option may be to make one commit per part in the homework).

## Part 1 - Setup and Exercises

For this homework, you'll have files available in your repository, so you'll be cloning first.

The solutions to the following problems can go in the same file - __src/hoffy.js__:

### Setup

1. go to your github account...
2. find your repository: NetID-homework02 (note... this __should be your NetID__)
3. use the appropriate URL to run git clone

<pre><code data-trim contenteditable>git clone [YOUR REPO URL]</code></pre>

### Background Info

Implement functions that use JavaScript features such as:

* the rest operator
* the spread operator
* functions as arguments
* functions as return values
* decorators
* optionally call/apply/bind
* optionally arrow functions
* Array methods: 'filter', 'map', 'reduce'

Go through the functions in order; the concepts explored build off one-another, and the functions become more and more challenging to implement as you go on.

__Do not use__:

* `while` loops
* `for` loops
* `for ... in` loops
* `for ... of` loops
* `forEach` method .

__There will a small (-2) penalty every time one is used__. (Homework is 100 points total)


### Steps

1. prep...
	* create a `package.json` using `npm init`
    * create a `.gitignore` to ignore node_modules
    * make sure that `mocha`, `chai`, and `eslint` are still installed (similar to previous assignment)
        <pre><code data-trim contenteditable>npm install --save-dev mocha
npm install --save-dev eslint
npm install --save-dev chai
npm install --save-dev eslint-plugin-mocha
</code></pre>
    * you'll also need a few additional modules installed locally for the unit tests to run:
        * finally, install sinon and mocha-sinon locally for mocking `console.log` (these are for unit tests)
        * `npm install --save-dev sinon`
        * `npm install --save-dev mocha-sinon`
2. implement functions below in __hoffy.js__
3. make sure you export your functions as you implement them so that...
4. you can run tests as you develop these functions (again, the tests are included in the repository):
    `npx mocha tests/hoffy-test.js`
5. also remember to run eslint (there's a `.eslintrc` file included in the repository):
    `npx eslint src/*`

### (40 points) Functions to Implement

### (-2 per while, for, forEach, for of, or for in loop used)

### `parseMoves(s)`

__Parameters:__

* `s` - a `String` representing a series of moves in a connection game in the format [piece 1][piece 2][...moves]

__Returns:__

* an `Array` of objects representing the moves encoded in the `String`, `s`

__Description:__

This is a warm-up for using the `Array` function, [`map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map). It builds off of the background information for homework 01.

It parse a series of moves encoding in a string as:

* `[piece 1][piece 2][...moves]`
* for example: `😎💻AABBCC`
	* where sunglasses moves to column A
	* then laptop moves to column A
* the first two characters are the pieces
* the remaining characters are the names of the columns that the pieces are dropped in
* the values alternate when being placed in columns (sunglasses emoji goes in A, laptop goes in A, sunglasses go in B, etc.)

It will return the moves as an `Array` of objects, with each object representing a single move. Each move object will contain the following properties:

* `val` - the value of the piece dropped
* `col` - the column that the piece was dropped in 

For example, the `String`, `'😎💻ABACAA'` would yield:

```
[ { val: '😎', col: 'A' },
  { val: '💻', col: 'B' },
  { val: '😎', col: 'A' },
  { val: '💻', col: 'C' },
  { val: '😎', col: 'A' },
  { val: '💻', col: 'A' } ]
```

To do this without regular loops, use a combination of 
* spread  (`...`) to break up a `String` into an `Array` of chracters
* [`entries`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries) to break up an `Array` into an `Array` of `Arrays`, with each sub `Array` containing two elements: the position of the original element and the original element itself 
	* note that this returns an iterable object... 
	* so you'll need spread to turn it into an `Array`
		<pre><code data-trim contenteditable>const words = ['foo', 'bar', 'baz'];
console.log([...words.entries()]);
// [[0, 'foo'], [1, 'bar'], [2, 'baz']]
</code></pre>
* [`map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) - to transform elements of an `Array`


__Example:__

`console.log(parseMoves('😎💻ABACAA'));`

```
// results in:
[ { val: '😎', col: 'A' },
  { val: '💻', col: 'B' },
  { val: '😎', col: 'A' },
  { val: '💻', col: 'C' },
  { val: '😎', col: 'A' },
  { val: '💻', col: 'A' } ]
```

<hr>

### `shortestString(s1, s2, s3 to sN)`

__Parameters:__

* `s1, s2, s3 to sN` - any number of string arguments

__Returns:__

* the shortest string in the arguments passed in
* if no arguments are passed in, give back `undefined`

__Description:__

Goes through every string argument passed in and gives back the shortest string. No error checking is required; you can assume that every argument is a string or no arguments are passed in at all. If there is a tie, return the argument that appears in the later position. If there are no arguments passed in, return `undefined`

HINTS:

* use `rest` parameters!
* try `reduce`

__Example:__

    shortestString('foozy', 'barrr', 'bazzz', 'qux', 'quxx') // --> qux
    shortestString('f', 'g', 'foo') // --> g
    longestString() // --> undefined

<hr>

### `repeatCall(fn, n arg)`

__Parameters:__

* `fn` - the function to be called repeatedly
* `n` - the number of times to call function, `fn`
* `arg` - the argument to pass to function, `fn`, when it is called

__Returns:__

* `undefined` (no return value)

__Description:__

This function demonstrates using functions as an argument or arguments to another function. It calls function, `fn`, `n` times, passing in the argument, `arg` to each invocation / call.  It will ignore the return value of function calls. Note that it passes in only one `arg`. Check out the [readings](http://eloquentjavascript.net/05_higher_order.html) or [slides](../slides/js/higher-order-functions-continued.html) on higher order functions for relevant background material and examples.

HINT: use recursion to avoid regular loops

__Example:__

    repeatCall(console.log, 3, "Hello!");
    // prints out:
    // Hello!
    // Hello!
    // Hello!
    
    // calls console.log twice, each time passing in only the first argument
    // (we'll see how to fix this later)
    repeatCall(console.log, 2, "foo", "bar", "baz", "qux", "quxx", "corge");
        
    // prints out (again, only 1st arg is passed in):
    // foo 
    // foo 

<hr>

### `repeatCallAllArgs(fn, n, args1 ... argsn)`

__Parameters:__

* `fn` - the function to be called repeatedly
* `n` - the number of times to call function, `fn`
* `args1 ... argsn` - _all_ of the arguments to pass in to the function `fn` when it is called

__Returns:__

* `undefined` (no return value)

__Description:__

This is pretty much the same function as the previous, but it also demonstrates using a variable number of arguments. It calls function, `fn`, `n` times, passing in all of the remaining arguments that were passed to the original function, as the arguments to the `fn` function invocation. It will ignore the return value of function calls. Here are some hints:


* use `rest` parameters and `spread`
* or use the `arguments` object along with `apply`

HINT: use recursion to avoid regular loops

__Example:__

    // calls console.log twice, each time passing in the args, "foo", "bar", ... "corge"
    repeatCallAllArgs(console.log, 2, "foo", "bar", "baz", "qux", "quxx", "corge");
        
    // prints out:
    // foo bar baz qux quxx corge
    // foo bar baz qux quxx corge

<hr>


### `steppedForEach(arr, fn, step)`

__Parameters:__

* `arr` - the array containing potential arguments to the function `fn`
* `fn` - the function to be called repeatedly
* `n` - the number elements to be consumed from the array to be used as arguments to `fn`

__Returns:__

* `undefined` (no return value)

__Description:__

Calls the function `fn` using every `step` number of elements from the `Array`, `arr`, as arguments to `fn`. For example, if `step` were 3, then `fn` would be called with the first 3 elements of `arr` each as a positional argument. `fn` will be called again with the next 3 arguments. `fn` will continue to be called until there are no more elements to use as arguments from `arr`. If the last group of arguments is less than `step` call the function `fn` with whatever arguments are left (see example below)

HINT: to adhere to the restrictions regarding use of for, for of, forEach, while, etc. ... it might be useful to think of a way to implement this function recursively

__Example:__

	steppedForEach([1, 2, 3, 4, 5, 6], (a, b, c) => console.log('' + a + b + c),  3);
	/* 
	note that arrow function is called twice, each time with 3 elements from arr:
	123
	456
	*/
	steppedForEach([1, 2, 3, 4, 5, 6, 7], (a, b, c) => console.log('' + a + b + c),  3);
	/*
	in this case, the arrow function is called 3 times, but the last time, only one
	argument is passed in, 7 (there are no more elements after that)
	123
	456
	7undefinedundefined
	*/

<hr>

### `constrainDecorator(fn, min, max)`

__Parameters:__

* `fn` - the function to modify (_decorate_)
* `min` - the minimum value that `fn` can return
* `max` - the maximum value that `fn` can return

__Returns:__

* `function` - a function that...
    * does the same thing as the original function, `fn` (that is, it calls the original function)
    * accepts the same number of arguments as the original function, `fn`
    * the return value is the return value of `fn`, unless it is less than or greater than the `min` and `max`, in which case it returns `min` or `max` respectively

__Description:__

This function is a decorator. [See the slides on the decorator pattern](../slides/js/higher-order-functions-continued.html) for background information. It builds on top of the example in the slides by actually _modifying_ the return value of the original function.

This function wraps the function `fn` in another function so that operations can be performed before and after the original function `fn` is called. This can be used to modify incoming arguments, modify the return value, or do any other task before or after the function call. Again, we'll be modifying the return value in this case.

This particular decorator function constrains the result of the function being wrapped, `fn` so that its return value fits between `min` and `max` inclusive. If these are omitted from the original outer function, then the newly returned function will just return the value unmodified. You can assume that the return value of `fn` is `Number` (you do not have to deal with other types).


__Example:__

    // creates a new function from the built-in function, parseInt
    // the new function is the same thing as parseInt, but it constrains
    // the return value to a value between min and max (inclusive)
    const constrainedParseInt = constrainDecorator(parseInt, -10, 10);

    // still works like the original parseInt
    constrainedParseInt("7") // --> 7
    constrainedParseInt("-10")) // --> -10

    // but if the return value is less than min or greater than max
    // it returns min or max respectively
    constrainedParseInt("-12") // --> -10
    constrainedParseInt("12")) // --> 10

    // however, if either min or max are missing, then the new function
    // returns the result of fn unmodified regardless of value
    const constrainedParseInt2 = constrainDecorator(parseInt);
    constrainedParseInt2("-12") // --> -12

<hr>

### `limitCallsDecorator(fn, n)`

__Parameters:__

* `fn` - the function to modify (_decorate_)
* `n` - the number of times that `fn` is allowed to be called

__Returns:__

* `function` - a function that...
    * does the same thing as the original function, `fn` (that is, it calls the original function)
    * but can only be called `n` times
    * after the `n`th call, the original function, `fn` will not be called, and the return value will always be `undefined`

__Description:__

This is the culmination of all of the concepts from the previous functions. However, instead of just reading from a variable that's available through the closure, you'll use it to keep track of the number of times that a function is called... and prevent the function from being called again if it goes over the `max` number of allowed function calls. Here are the steps you'll go through to implement this:

1. create your decorator (function)
2. create a local variable to keep track of the number of calls
3. create an inner function to return
    * the inner function will check if the number of calls is less than the max number of allowed calls
    * if it's still under max, call the function, `fn` (allow all arguments to be passed), return the return value of calling `fn`, and increment the number of calls
    * if it's over max, just return `undefined` immediately without calling the original function

__Example:__

    const = limitedParseInt = limitCallsDecorator(parseInt, 3);
    limitedParseInt("423") // --> 423
    limitedParseInt("423") // --> 423
    limitedParseInt("423") // --> 423
    limitedParseInt("423") // --> undefined


<hr>


### `bundleArgs(fn, args1, args2 to argsn)`

__Parameters:__

* `fn` - the function to get args bundled with it
* `args1, args2 to  argsn` - any numbers of args that will automatically get filled in when the output function is used


__Returns:__

* `function` - a version of the original `fn` that can take any number of arguments, but when used, will use the `args1, args2 to argsn` as the first parameters to `fn`, filling in the new arguments afterwards

__Description:__

Suppose you're using the same function all the time, with nearly the same arguments every time: wouldn't it be great to have a quick way to make an alternate version of your function where your favorite arguments come pre-filled?

Of course, `bind`, already does this for us, so don't take the easy way out and use `bind`. Implement this function __without bind__!

__Example:__

    // example, you have a function that surrounds text with other text
    function surroundText(surrounding, text) {
      return [surrounding, text, surrounding].join(" ")
    }

    // but you know you're going to use it for one thing only
    const makeCool = bundleArgs(surroundText, "~x~X~x~")

    // save yourself some time
    console.log(makeCool("i guess")) // ~x~X~x~ i guess ~x~X~x~

	// again w/ leftovers
	function repeatLetter(letter, times) {
		Array(times).fill(letter).join('');
	}

	// fix 1 of 2 arguments to 'r'
	rrrrrollWithIt = bundleArgs(repeatLetter, 'r');

	// resulting function has only one arg now
	rrrrrollWithIt(10) // rrrrrrrrrr
<hr>


### `sequence(fn1, fn2, to fnN)`

__Parameters:__

* `fn1, fn2, to fnN` - a bunch of functions

__Returns:__

* `function` - a function that has a single argument; it will pass it's single argument to `fn1`, take the output of `fn1` and use it as the argument to `fn2`, then take the output of `fn2` and use it for `fn3`, and then... etc


__Description:__

A handy utility for automating the writing of code that's just calling functions to pass their arguments to other functions. You can assume that each function passed in only takes one argument.

HINT: it's kind of like _summing_ or _composing_ the functionality of a bunch of functions together

__Example:__


    // let's say you have some pretty procedural functions
    function superCamelCase(s) {
      return s
        .split("")
        .map((c, i) => (i % 2 == 0 ? c.toUpperCase() : c.toLowerCase()))
        .join("")
    }

    function spaceText(s) {
      return s.split("").join(" ")
    }

    function addStyle(s) {
      return "~~~ " + s + " ~~~"
    }

    // you want to make a playlist of them
    const aestheticFmtPipeline = sequence(
      superCamelCase,
      spaceText,
      addStyle
    )

    console.log(aestheticFmtPipeline("hello world")) // ~~~ H e L l O   W o R l D ~~~

    function makeVertical(s) {
      return s.split("").join("\n")
    }

    // playlists of playlists of functions
    const tallAestheticFmt = sequence(aestheticFmtPipeline, makeVertical)

    console.log(tallAestheticFmt("goodbye world"))
    /*
    ~
    ~
    ~

    G

    o

    O

    d

    B

    y

    E



    W

    o

    R

    l

    D

    ~
    ~
    ~
    */

### Test, Lint and Commit

Once you're finished with your functions, remember to:

1. make sure all tests are passing
2. make sure that eslint shows no errors
3. commit and push your code!


## Part 2 - Weather Analysis

In this part, you'll work with hourly weather data for 30 US & Canadian Cities + 6 Israeli Cities. You'll use higher order functions to analyze this data.

The data for this part was based off of data uploaded to kaggle ([https://www.kaggle.com/selfishgene/historical-hourly-weather-data](https://www.kaggle.com/selfishgene/historical-hourly-weather-data)), which in turn was sourced from [https://openweathermap.org/](https://openweathermap.org/).

You'll work with the following two files for this part: 

1. `tempAnalytic.js` to create a function called `analyzeTemperature`
	* the function will take an `Array` of objects, with each object representing the temperature of 36 cities
	* the function should be exported so that it can be accessed when this filed is used as a module through `require`
2. `readWeatherFs.js` to read in a file containing JSON data...
	* the JSON data is a list of hourly temperatures per city
	* use the `analyzeTemperature` function from `tempAnalytic.js` above to generate a report 
	* note: you can assume there are no missing values, `NaN` or null in the data. In other words, no data cleansing or validation is necessary.

### Importing Data

* Your repository should contain a file, `historical-hourly-weather-data-json/temperature.json` 
* Start by reading in the data from `temperature.json` using `fs.readFile`
    * make sure that the `fs` module is brought in using `require`, then call the function)
	* [see the documentation for usage](https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback) to see how to use `fs.readFile`
		* HINT: make sure you specify `utf8` as the second argument
	* recall from the [slides on node](../slides/js/js-node-npm-debug-git.html) that I/O in node can be done asynchronously
	* to learn how to deal with non-blocking code, you must use the async version of `fs.readFile` (rather than `fs.readFileSync`)
	* consequently, if you'd like to perform an action after reading a file, you must do it within the callback function:
		<pre><code data-trim contenteditable>fs.readFile('path/to/myFile.txt', 'utf8', function(err, data) {
  if (err) {
      console.log('uh oh', err);
  } else {
      console.log('congrats, the file has been read:', data);
  }
});
</code></pre>
    * when using `fs.readFile`, ⚠️⚠️⚠️ __use a relative path so that your program will run in different environments__ (for example, a grader's computer)
	* assume that the program will be run from the project's root directory
    * again, __do not use readFileSync__
* Remember that the data read into memory is a `String` in JSON format
* The JSON `String` represents an `Array` of hourly temperature data:
    * each object in the `Array` contains a time and the temperature of 36 cities at that time
    * the first property in the object is `datetime` formatted as `YYYY-MM-dd HH:mm:ss`
    * the remaining 36 properties are named after cities (`Portland`, `Vancouver`, etc.), and each property has a value of `temperature` in *Kevlin Scale*
	* example:
		<pre><code data-trim contenteditable> {
    "datetime":"2012-10-01 13:00:00",
    "Vancouver":284.63,
    "Portland":282.08,
    "San Francisco":289.48,
    "Denver":284.61,
    "San Antonio":289.29,
    ...
    "Tel Aviv District":305.47,
    "Eilat":310.58,
    "Haifa":304.4,
    "Nahariyya":304.4,
    "Jerusalem":303.5
}
* Turn the string into an actual `Array` of objects [see the docs on JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON), or see the slides on [../slides/js/js-objects.html#/25]
* Find a way to convert Kelvin to Fahrenheit:
    * the formula is `T(F) = T(K) * 1.8 - 459.67` [https://www.rapidtables.com/convert/temperature/how-kelvin-to-fahrenheit.html](https://www.rapidtables.com/convert/temperature/how-kelvin-to-fahrenheit.html)
    * note that the goal of this assignment is to work with higher order functions, so memory efficiency does not need to be taken into consideration
* As noted above, your parsing and conversion should be done within the callback function (or the function to be called once data is read from the file)
* Once you're done, use the `Array` that you've produced to **print the first ten lines of temperature in New York with the the following format using template literals**:
	<pre><code data-trim contenteditable>// Format
At ${time}, the temperature in NY is ${degree in Fahrenheit} (F)
// Example
At 2012-10-01 13:00:00, the temperature in NY is 59.13 (F)
</code></pre>
* Later, you will be supplying this `Array` to the `analyzeTemperature` function that you create in `tempAnalytic.js` to generate a report.



### `analyzeTemperature (weatherData)`

In `tempAnalytic.js`, implement  a function called `analyzeTemperature`. 

__Parameters:__

* `weatherData` - an `Array` of objects, with each object representing an hourly temperature for each of 36 cities.

__Returns:__

* a `String` version of a your weather data report

__Description:__

This function will generate a report based on the `Array` of objects passed in. The report will contain:

* the average temperature of different cities over:
	* the entire time series
	* a specific year
	* a particular season
* the coldest and warmest dates / times  and 
* the top ten coldest and warmest cities in the dataset

### Implementation Requirements

⚠️⚠️⚠️ __You must avoid using regular loops in your implementation.__ Avoid using:


* `for`, `for in`, `for of` and `while`
* the `Array` method, `forEach`

You will get two "free" regular loops to use, but after that, using a regular loop will result in a minor penalty (likely around around two points, but potentially slightly more or less). This may result in less efficient code, or code that is trickier to understand... but the goal of this homework is to get accustomed to using higher order functions.

With that said, consider using the following `Array` methods for your implementations:

1. `filter`
2. `map`
3. `reduce`

Note: try not to modify the input data during executing your function. Usually the input should be read-only and if you would like to overwrite it, creating a copy would be fine. (In this assignment, the size of data is relatively small).
	
### Problem Overview

Your report will use the data passed in to determine:

1. The first 10 lines of Temperature in NY
2. The mean temperature in San Diego
3. The coldest, warmest time and temperature in New York
4. Top 10 cities with coldest and warmest mean temperature
5. The average temperature over spring 2013 in New York

### First 10 lines of Temperature in NY

This part of the report will show your temperature conversion as well as formatting floating point numbers (generally useful for any type of reporting, including data dashboards!). It's also typical to preview a small portion of a data set prior to performing an analysis (similar to `head` in bash or like the head function in pandas dataframes).

The output format and example are listed below:

Format: Print all decimal numbers with 2 digits after decimal point
```
At `YYYY-MM-dd HH:mm:ss`, the temperature in NY is `xx.xx` (F)
```
HINT: use [`toFixed(n)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toPrecision) or [`toPrecision(n)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toPrecision). What's the difference between these two? Which one would be appropriate for displaying data / a report to an end user?

Example:
```
First 10 lines of Temperature in NY:
At 2012-10-01 13:00:00, the temperature in NY is 59.13 (F)
...
```

### The mean temperature in San Diego

For this part of the report, it may be useful to call one higher order function after another (for example, taking the resulting of one, and calling the other on that result: `arr.hof1().hof2()`... it's ok to break this up into two separate calls or chain them as shown here).

Format: Print all decimal numbers with 2 digits after decimal point
```
The mean temperature in San Diego is: xx.xx (F)
```

### The coldest, warmest time and temperature in New York

Find the coldest, warmest date and temperature and output in the following format

Format: Print all decimal numbers with 2 digits after decimal point
```
The coldest time in New York is: `YYYY-MM-dd HH:mm:ss`
The lowest temperature is: xx.xx (F)
The warmest time in New York is: `YYYY-MM-dd HH:mm:ss`
The highest temperature is: xx.xx (F)
```

### Top 10 Cities with coldest and warmest mean temperature

Format: Print all decimal numbers with 2 digits after decimal point

```
Top 10 Cities with highest mean temperature
Tel Aviv District: 70.45 (F)
Jacksonville: 70.24 (F)

Top 10 Cities with lowest mean temperature
Toronto: 47.96 (F)
Denver: 49.54 (F)
```

HINT: to get the mean of a sequence of values, you will convert an array to a single number. you should also consider `weatherData` is an array of objects (conceptually a 2 dimensional array), how can you do achieve this applying a higher order function?

HINT: [`sort`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) will be helpful here... note that it takes in a comparison function; what do you think that comparison function should be if the elements are objects? 

### The average temperature over spring 2013 in New York

This is to help you get a sense of how to use `date` in Javascript. Please refer to [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) and look at how to instantiate a date object. More detail steps are listed.

1. Let's define the spring in NY is from *Feburary* through *April* (inclusive)
2. The date string in the dataset is represented as `'YYYY-MM-dd HH:mm:ss'`. This is compared based on string instead of date. So **parse** this date string to date object 
	* this can be done by writing your own parser to extract  `year`, `month`, `day`, `hour`, `minute`, and `second` to instantiate a [date object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
	* you can also find a method on date objects that does this for you
	* you can bring in (`require`) a 3rd party library
	* lastly, you can assume that all times are in [UTC](https://en.wikipedia.org/wiki/Coordinated_Universal_Time) (making this assumption as no timezone data is supplied)
3. Limit your data to Spring 2013
	* [`getFullYear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getFullYear), [`getMonth()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMonth) might be helpful
4. Then compute the mean temperature of NY in Spring 2013

Format: Print all decimal numbers with 2 digits after decimal point

```
The average temperature over spring 2013 in New York is: **.** (F)
```

HINT: be careful to the constructor of date object and numeric representation of month returned from `getMonth()`. The output may be off if passing the wrong type of parameters to instantiate the date object and the indexing of month.

### Return Value

Your function should concatenate the string version of each part of the report into a single `String`, with each part separated by a new line. 

### Calling analyzeTemperature

Now that you've finished your function, you can try to call it on your data from `readWeatherFs.js`

1. In `readWeatherFs.js`: require the module that you created (`tempAnalytic.js`).
2. Use readFile to read `temperature.json` in the folder `historical-hourly-weather-data-json`
3. Call `analyzeTemperature()` in the callback of `fs.readFile`
4. Print out the result of the report.
5. You can compare your output with the example output below (See bottom how to compare your output with the below example)

```
The first 10 lines of Temperature in NY:
At 2012-10-01 13:00:00, the temperature in NY is 59.13 (F)
At 2012-10-01 14:00:00, the temperature in NY is 59.18 (F)
At 2012-10-01 15:00:00, the temperature in NY is 59.32 (F)
At 2012-10-01 16:00:00, the temperature in NY is 59.46 (F)
At 2012-10-01 17:00:00, the temperature in NY is 59.60 (F)
At 2012-10-01 18:00:00, the temperature in NY is 59.75 (F)
At 2012-10-01 19:00:00, the temperature in NY is 59.89 (F)
At 2012-10-01 20:00:00, the temperature in NY is 60.03 (F)
At 2012-10-01 21:00:00, the temperature in NY is 60.17 (F)
At 2012-10-01 22:00:00, the temperature in NY is 60.32 (F)

The mean temperature in San Diego is: 62.72 (F)

The coldest time in New York is: 2015-02-21 08:00:00
The lowest temperature is: -8.28 (F)
The warmest time in New York is: 2013-07-19 17:00:00
The highest temperature is: 98.76 (F)

Top 10 Cities with highest mean temperature
Miami: 77.06 (F)
Eilat: 74.03 (F)
Phoenix: 72.29 (F)
Haifa: 71.81 (F)
Tel Aviv District: 70.45 (F)
Jacksonville: 70.24 (F)
Houston: 69.97 (F)
Nahariyya: 69.70 (F)
San Antonio: 69.23 (F)
Jerusalem: 68.06 (F)
Top 10 Cities with lowest mean temperature
Montreal: 45.11 (F)
Minneapolis: 45.81 (F)
Toronto: 47.96 (F)
Denver: 49.54 (F)
Detroit: 49.84 (F)
Chicago: 50.55 (F)
Boston: 51.25 (F)
Vancouver: 51.28 (F)
Pittsburgh: 51.80 (F)
Seattle: 52.39 (F)

The average temperature over spring 2013 in New York is: 41.13 (F)
```

Lint, commit and push your code; the next part will make modifications to this existing code (you can overwrite your work in this file directly for the next part).

## Part 3 - Retrieve JSON from URL

### Setup for Retrieving JSON

In this part, you'll be setting up your project to work with JSON data from a url and issue requests in a particular order.

{% comment %}
### Context (Optional)

The description below is meant to provide some context; you can skip this if you're already familiar with async I/O. 

In the previous part, you only worked with one dataset (resource). In some cases you may need to work with multiple datasets from different sources. Sometimes you need information in one dataset that you just retrieved to help you identify the next document you need to retrieve. For example, you may have access have initial access to a resource called `user` that allows you to search by name (`user/joe`). The `user` resource may give you a user's id number, email, etc. ... Now you want to retrieve a user's order history, but that data is stored in a different resource, `order`, and it can only be searched by `user_d` rather than name. Consequently, to retrieve the history, you must have `user_id` (which resides in `user`) in hand, then request the order data (which resides in `order`) by matching `user_id` with records in `order`. Now, the **sequence of retrieval** here matters, where you must receive the response from `user`, then request `order` and send `user_id` along with the request:

1. GET /user/some_user_name (give back a user id)
2. GET /orders/some_user_id  (user id is used to get all orders for that user)

However, because this is IO, it's non-blocking... so it's tricky to order this! This final part of the homework deals with ordering async IO. Instead of reading a single file from the file system, you'll programmatically download files from the web.
{% endcomment %}

### Retrieve and Process JSON 

This final part of the homework deals with ordering async IO. Instead of reading a single file from the file system, you'll programmatically download files from the web. However, this is tricky because you have to deal with executing code only after IO has finished.

After completing the previous part, you now have a better understanding of `temperature.json`, we can move on to retrieving data from an online resource. This time, we'll retrieve other weather data, like hourly wind and hourly air pressure (along with the original temperature data set as well!). The initial file will be `temperature-resource.json`. __The URL for this file will be posted on piazza__. 

1. Again, you will be given an initial url which identifies the location of `temperature-resource.json`
2. In the `temperature-resource.json`, there is an additional property called `next`, which helps you identify the name of the `next` dataset (⚠️⚠️⚠️  __even if you know the name of the next data set, do not hardcode the urls in your program__ ... with the exception of the first one)
	* consequently, the structure of the temperature data is no longer an `Array`, but an object
	* one property is `response`, which contains the `Array` of hourly temperature objects
	* the other property is `next`, which contains the url of the next data file
	* additionally, there will be some meta data describing what is being measured:
		* `variable` - the name of the data point (temperature, wind, etc.)
		* `unit` - the unit of measurement (K, m/s, etc.)
3. As long as all these datasets are well prepared, perform similar analytics using the function you created in the previous part TODO:

### Data

Below is an example of the general structure of the data files (note, this shows `temperature-resource.json`):

```
{
    "next": "name-of-next-file.json",
    "variable": "temperature",
    "unit": "K",
    "response": [{"datetime": "2012-10-01 13:00:00",
                  "Vancouver": 284.63,
                  "Portland":  282.08,
                  "San Francisco": 289.48,
                  "Seattle": 281.8,
                  "Los Angeles": 291.87,
                  "San Diego": 291.53,
                  "Las Vegas": 293.41,
                  "Phoenix": 296.6,
                  "Albuquerque": 285.12,
                  ...
                 }, {
                     ...
                 },
                 ...
                ]
}
```
1. `next`: contains the next resource name (not the exact url)
2. `response`: JSON array and each object contains weather data of each of 36 cities (same as the `temperature.json` in Part 2)
3. `variable`: the name of the data point
4. `unit`: the unit of measurement for that data point 

Note: The datasets retrived through Urls are subsets of their original datasets to avoid long response. For example, `temperature-resource.json` contains one year of data retrieved from `temperature.json`.

### Implementation Detail

1. Install the `request` library in your project's root folder: `npm install --save request` (similar to installing `readline-sync` in the previous assignment)
2. Create a new file `readWeatherUrl.js`
3. Add the `request` module to the beginning of `readWeatherUrl.js` using `require`
4. [Read the documentation](https://github.com/mikeal/request) to see how to use the requests module (or see the [slides](../slides/js/js-node-npm-debug-git.html#/6))
	* Notice that the data is only available within the callback that you pass in to calling `request` (much like using readFile)
	* Again, a __callback__ is a function passed as an argument to another function... the callback will be invoked / executed at a later time, when some event is triggered
	* In the case of `request`, it's the function that you pass in as the 2nd argument
5. In `readWeatherUrl.js`, use request to download the first json file (url given through piazza) representing the original temperature data
6. Notice that the json file has a few new fields `response`, `next`, `variable`, and `unit`
	* `response` is a list of objects, with each object containing temperatures of each of 36 cities
	* `next` is the name (without extension and without the "root url") of the next file to retrieve
7. Create a file `analytic.js` and export a function called `generateReport`, which will mimic (but also generalize) some of the functionality from the report in Part 2
8. As a starting off point, use the logic that you have for `Top 10 Cities with coldest and warmest mean temperature` and `The average temperature over spring 2013 in New York` to create `generateReport` in `analytic.js`
9. This function is going to accept not only a list of objects containing `temperature`, but also, it should be flexible enough to deal with objects that represent `wind speed` and `pressure`; consequently, it'll have a few more parameters...
10. The function signature should be `generateReport(weatherData, variable, unit)` as shown below:
	<pre><code data-trim contenteditable>// in analytic.js
/* params:
 *   weatherData: an Array of objects (similar to the objects in 
 *                temperature.json, but they may represent wind speed 
 *                or pressure)
 *   variable: the String name of the data point that we're reporting on 
 *             (for example, 'temperature', 'wind speed', 'pressure')
 *   unit: the unit we'll use for that data point (for example 'K', 'm/s', 
 *         'hpa')
 * returns:
 * 	 a String representing the report that contains:
 *   - Top 10 Cities with highest mean X
 *   - Top 10 Cities with lowest mean X
 *   - The average X over spring 2013 in New York is
 *   ...where X is the name of the data point
 *   see instructions for full example of output
 */
function generateReport(weatherData, variable, unit) {
  // COPY AND PASTE YOUR CODE FROM PART 2 BELOW AND MAKE SOME GENERALIZATIONS
}
</code></pre>
11. Again, the goal is to create create a generalized function in `analytic.js` that can report different weather variables (temperature, wind speed, etc.)
	* again the report will be...
	* Top 10 Cities with highest mean [variable]
 	* Top 10 Cities with lowest mean [variable]
	* The average X over spring 2013 in New York is...
	* use the `variable` and `unit` paramaters
	* __you'll have to special case `temperature` in this function though...__ if, `variable` is `temperature` and unit is `K`, convert to fahrenheit
    * see belowfor full example of output
12. Require `analytic.js` in `readWeatherUrl` so that you can generate a report from the first file that you retrieved
13. This means that you have to first parse the JSON to create the appropriate values for arguments to `generateReport`
14. And, of course, call `generateReport` and print out the result
15. If there is a `next` property in the JSON that you parsed, use that as another URL to retrieve...
16. ...And go back to the step where you parse the newly retrieved JSON (step 13)
17. If there's no next, stop retrieving urls!

Hint: one way to implement this may look a little like a recursive function (well... with callbacks mixed in!)


### Example Output


(Notice that `variable` and `unit` influence output, with `temperature` and `K` special cased for conversion to fahrenheit)

```
Top 10 Cities with highest mean temperature
Miami: 75.73 (F)
Eilat: 74.73 (F)
Phoenix: 73.03 (F)
Tel Aviv District: 70.67 (F)
Houston: 70.10 (F)
Haifa: 70.01 (F)
Nahariyya: 69.39 (F)
Beersheba: 69.12 (F)
San Antonio: 69.04 (F)
Jacksonville: 68.88 (F)
Top 10 Cities with lowest mean temperature
Minneapolis: 44.82 (F)
Montreal: 45.29 (F)
Toronto: 48.10 (F)
Denver: 49.79 (F)
Detroit: 50.16 (F)
Chicago: 50.63 (F)
Boston: 51.07 (F)
Vancouver: 51.08 (F)
Pittsburgh: 51.18 (F)
Seattle: 51.80 (F)

The average temperature over spring 2013 in New York is: 41.13 (F)

Top 10 Cities with highest mean wind speed
Eilat: 3.68 (m/s)
New York: 3.42 (m/s)
Haifa: 3.31 (m/s)
Indianapolis: 3.29 (m/s)
Chicago: 3.28 (m/s)
Toronto: 3.28 (m/s)
Montreal: 3.27 (m/s)
Minneapolis: 3.17 (m/s)
Dallas: 3.14 (m/s)
Kansas City: 3.02 (m/s)
Top 10 Cities with lowest mean wind speed
Los Angeles: 0.76 (m/s)
Phoenix: 1.12 (m/s)
Vancouver: 1.47 (m/s)
San Diego: 1.68 (m/s)
Jerusalem: 1.69 (m/s)
Portland: 1.83 (m/s)
Seattle: 1.90 (m/s)
Atlanta: 1.97 (m/s)
Charlotte: 2.03 (m/s)
Denver: 2.11 (m/s)

The average wind speed over spring 2013 in New York is: 4.39 (m/s)

(There may be another file to process!)
```

</div>

</div>
