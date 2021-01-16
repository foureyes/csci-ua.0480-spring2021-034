---
layout: homework
title: CSCI-UA.0480 - Homework #2
---

<div class="panel panel-default">
  <div class="panel-heading">Homework #2</div>
  <div class="panel-body" markdown="block">

# Higher Order Functions: Exercises and Processing Data - __Due Feb 13th at 11pm__

## Overview

### Description

__hoffy.js__ - Write a series of functions that demonstrate the use of the rest operator (or call/apply), and higher order functions

__nba.js__ and __report.js__ - Create helper functions and a commandline tool that to print out some information about a basketball game, given a json file representing the game


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

__There will a small (-2.5) penalty every time one is used__. (Homework is 100 points total)


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

### Functions to Implement

### (-2.5 per while, for, forEach, for of, or for in loop used)


### `sum(num1, num2, ... numn)`

__Parameters:__

* `num1`, `num2` ... `numn` - the values to be summed

__Returns:__

* the sum of the arguments as a `Number` 
* the sum of no arguments is 0

__Description:__

Adds all of the arguments together and returns the resulting sum. If there are no arguments, the resulting sum is 0. Does not have to check for types.

Hints:

* use `rest` parameters!

__Example:__

    // returns the sum of all arguments passed in
    sum(1, 2, 3) // --> 6
    sum(1, 1, 1, 1, 1, 1, 1, 1, 1, 1) // --> 10
    sum(1) // --> 1

    // returns 0 if there are no arguments passed in
    sum() // --> 0


<hr>

### `callFn(fn, n arg)`

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

    callFn(console.log, 3, "Hello!");
    // prints out:
    // Hello!
    // Hello!
    // Hello!
    
    // calls console.log twice, each time passing in only the first argument
    // (we'll see how to fix this later)
    callFn(console.log, 2, "foo", "bar", "baz", "qux", "quxx", "corge");
        
    // prints out (again, only 1st arg is passed in):
    // foo 
    // foo 

<hr>

### `betterCallFn(fn, n, args1 ... argsn)`

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
    betterCallFn(console.log, 2, "foo", "bar", "baz", "qux", "quxx", "corge");
        
    // prints out:
    // foo bar baz qux quxx corge
    // foo bar baz qux quxx corge

<hr>


### `opposite(oldFn)`

__Parameters:__

* `oldFn` - a `function` to modify 

__Returns:__

* a `function` - the function that is returned that behaves the same way as the original function, but it returns the opposite value that the original function would have returned (if calling the original function results in `true`, then the new function will return `false`)

__Description:__

This function is a decorator. [See the slides on the decorator pattern](../slides/js/higher-order-functions-continued.html) for background information. It builds on top of the example in the slides by actually _modifying_ the return value of the original function.

This function wraps the function `fn` in another function so that operations can be performed before and after the original function `fn` is called. This can be used to modify incoming arguments, modify the return value, or do any other task before or after the function call. Again, we'll be modifying the return value in this case.

This particular decorator function takes a function and returns a new function resulting in a _modified_ version of the original. The new, modified version, of the function returns the opposite boolean value of what was returned by the original function. The implementation essentially just calls `oldFn` (the function passed in), captures the return value, and -- instead -- returns the opposite value. You can assume that `oldFn` will always return a boolean values (or, at least a value that can be coerced into a boolean); there's no need to validate.


__Example:__

```
const isSmol = s => s.length < 3;
const isBig = opposite(isSmol);
console.log(isBig('abstentious'))
// true

const isUpper = s => s.toUpperCase() === s;
const isLower = opposite(isUpper);
console.log(isLower('ABSTENTIOUS'));
// false
```

<hr>


### `bucket(arr, fn)`

__Parameters:__

* `arr` - an `Array`
* `fn` - a function that returns true or false 
	* `fn` has one argument, a value to test

__Returns:__

* an `Array` containing two Arrays:
	* one with all elements that passed the test, `fn`
	* the other with all elements that did not pass the test, `fn`

__Description:__

Takes an Array of values and creates two new Arrays by calling the function, `fn`, on every element. If `fn` returns true, the element is added to the 1st Array, otherwise it's added to the 2nd . Both Arrays are returned nested in a containing Array. 


__Example:__

```
 // the following partitions numbers by whether or not the number is even or odd:
const numbers = [1, 7, 2, 5, 30];
const [evens, odds] = partition(numbers, n => n % 2 === 0);
console.log('odds', odds, '| evens', evens); // odds [ 1, 7, 5 ] | evens [ 2, 30 ]
```

<hr>

### `addPermissions(oldFn)`

__Parameters:__

* `oldFn` - a `function` to modify / _decorate_

__Returns:__

* a `function` - this new, returned function has one extra parameter more than `oldFn` (the function passed in), and this parameter determines whether or not `oldFn` should be run

__Description:__

This decorator takes an old function and returns a new function with an extra parameter. The extra parameter, an object that represents whether or not the function is allowed to run, is in the beginning of the parameter list. If this object has a property named admin, and it's value is __exactly__ true, then the old function, `oldFn`, is run, and the result of calling `oldFn` is returned. If the object does not have an admin property exactly equal to true (or if the object _cannot_ have properties, objects like `undefined` and `null`), then the `oldFn` is not run, and `undefined` is returned instead. 

__Example:__

```
const myParseInt = addPermissions(parseInt);      // create a new version of parseInt
console.log(myParseInt(null, '101', 2));          // undefined
console.log(myParseInt({admin: true}, '101', 2)); // 5
console.log(myParseInt(undefined, '101', 2));     // undefined
console.log(myParseInt(5, '101', 2));             // undefined 
```

<hr>
           

### `myReadFile(fileName, successFn, errorFn)`

__Parameters:__

* `fileName` - a `string`, the name of the file to read from
* `successFunc` - a `function` to call if file is successfully read
	* function has single argument, the data read from the file as a `string`
* `errorFunc` - a `function` to call if error occurs while reading file (such as file does not exist)
	* function has single argument, an error object (the same error object passed to `fs.readFile`'s callback)

__Returns:__

* `undefined` (no return value)

__Description:__

This function gives us an alternative _interface_ to `fs.readFile`. `fs.readFile` typically takes a single callback (after the file name) with two arguments: an error object and the data read from the file. This function, instead, takes two callbacks as arguments (both after the file name) -- one to be called on success and one to be called on failure. Both callbacks only have one parameter (the data read from the file or an error object). The actual implementation simply calls `fs.readFile`. Note that you can assume that file read in is text, so pass in a second argument to `fs.readFile` to read the data as utf-8: `fs.readFile('filename.txt', 'utf-8', callback)`


⚠️ The file used to test this functions, `words.txt` contains `\n`. If:

* you use windows and your git installation automatically converts `\n` to `\r\n`
* you overwrite this file in windows

... the tests will fail due to line ending inconsistencies. The repo should have been created with a gitattributes file to specify conversion behavior... so thanks to a student that tested a potential proposal solution, you can patch your test file with:

```

diff --git a/tests/hoffy-test.js b/tests/hoffy-test.js
index c034da4..c566692 100644
--- a/tests/hoffy-test.js
+++ b/tests/hoffy-test.js
@@ -1,6 +1,7 @@
 const chai = require('chai');
 const expect = chai.expect;
 const path = require('path');
+const os = require('os');
 require('mocha-sinon');
 Object.assign(global, require(path.join(__dirname, '../src/hoffy.js')));

@@ -92,7 +93,7 @@ describe('hoffy', function() {
     describe('myReadFile', function() {
         it('calls a success function (passed as the 2nd argument) if the file is read successfully', function(done) {
             myReadFile('tests/words.txt', (data) => {
-                expect(data).to.equal("ant bat\ncat dog emu\nfox\n");
+                expect(data).to.equal("ant bat"+os.EOL+"cat dog emu"+os.EOL+"fox"+os.EOL);
                 done();
             }, err => console.log('Error opening file:', err));
         });
@@ -106,7 +107,7 @@ describe('hoffy', function() {

     describe('readAndExtractWith', function() {
         it('returns a function that can be used to extract data from file', function(done) {
-            const getWords = (s) => s.trim().split('\n').reduce((words, line) => [...words, ...line.split(' ')], []);
+            const getWords = (s) => s.trim().split(os.EOL).reduce((words, line) => [...words, ...line.split(' ')], []);
             const f = readAndExtractWith(getWords);
             f('tests/words.txt', (data) => {
                 expect(data).to.eql(['ant', 'bat', 'cat', 'dog',  'emu', 'fox']);
@@ -114,7 +115,7 @@ describe('hoffy', function() {
             }, console.log.bind(null, 'ERROR'));
         });
         it('returned function calls an error function (passed as the 3rd argument) if an error occurs while reading the file', function(done) {
-            const getWords = (s) => s.trim().split('\n').reduce((words, line) => [...words, ...line.split(' ')], []);
+            const getWords = (s) => s.trim().split(os.EOL).reduce((words, line) => [...words, ...line.split(' ')], []);
             const f = readAndExtractWith(getWords);
             f('tests/fileDoesNotExist.txt', console.log, err => {
                 expect(err).to.be.not.null;
```

__Example:__

```
// Assuming the contents of the file, tests/words.txt is:
// ant bat
// cat dog emu
// fox
const success = (data) => console.log(data); 
const failure = (err) => console.log('Error opening file:', err);

myReadFile('tests/words.txt', success, failure);

// prints out:
// ant bat
// cat dog emu
// fox

myReadFile('tests/fileDoesNotExist.txt', success, failure);
// The error message would be printed out because the file does not exist:
// Error opening file: ... 
```

<hr>

### `readAndExtractWith(extractor)`

__Parameters:__

* `extractor` - a `function` that can be used to extract structured data out of the rawData read in from a file

__Returns:__

* a `function` - a new `function`
	* the new function has similar parameters to the previous function
	* `fileName` - a `string`, the name of the file to read from
	* `successFunc` - a `function` to call if file is successfully read
		* function has single argument, the data read from the file as a `string`
	* `errorFunc` - a `function` to call if error occurs while reading file (such as file does not exist)
		* function has single argument, an error object (the same error object passed to `fs.readFile`'s callback)

__Description:__

This function produces functions similar to the previous function. However, the resulting function not only calls the success or failure callback, it also calls the extractor function to manipulate the data being fed into the success callback.

In the example below, we can see that the extractor function parses through lines in a file and breaks it up into individual words using newlines and spaces as separators.

Using this extractor function, we can make a new function that can read a file and automatically break up the contents into individual words.


__Example:__

```
const getWords = (s) => s.trim().split('\n').reduce((words, line) => [...words, ...line.split(' ')], []);
const f = readAndExtractWith(getWords);

const success = (data) => console.log(data); 
const failure = (err) => console.log('Error opening file:', err);

// Assuming the contents of the file, tests/words.txt is:
// ant bat
// cat dog emu
// fox

f('tests/words.txt', success, failure); 
// output is: ['ant', 'bat', 'cat', 'dog',  'emu', 'fox']

// again, if there's an error, the failure callback is executed
```

<hr>

### `rowsToObjects(data)`

__Parameters:__

* `data` - an `object` with the following properties:
	* `headers` - the names of the columns of the data contained in `rows`
	* `rows` - a 2-dimensional `Array` of data, with the first dimension being rows, and the second being columns

__Returns:__

* an `Array` of objects with the original headers (column names) as properties... and values taken from the original data in each row that aligns with the column name

__Description:__

This converts a 2-d array of data:

```
[[1, 2, 3], [4, 5, 6], [7, 8, 9]]
```

...into an Array of objects with property names, given the property names as headers.

```
// headers
['a', 'b', 'c'];
```

```
// result
// [{a: 1, b: 2, c: 3}, {a: 4, b: 5, c: 6}, {a: 7, b: 8, c: 9}];
```

The data should come in as an object where the headers an `Array` in the `headers` property of the object, and the data is the value in the `rows` property of the object:

```
{
	headers: ['col1', 'col2'],
	rows: [[1, 2], 
		   [3, 4]]
}
```

__Example:__

```
const headers = ['a', 'b', 'c'];
const rows = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
const result = rowsToObjects({headers, rows}) 
console.log(result);
// [{a: 1, b: 2, c: 3}, {a: 4, b: 5, c: 6}, {a: 7, b: 8, c: 9}];
```

<hr>

### Test, Lint and Commit

Once you're finished with your functions, remember to:

1. make sure all tests are passing
2. make sure that eslint shows no errors
3. commit and push your code!


## Part 2 - NBA Data

### Overview

There are two steps to this part:

1. implement helper functions in `nba.js`
2. use those functions to print a report about an NBA game in `report.js`

Implement and export a few functions in `nba.js`. All of the functions in `nba.js` will deal work on a list of objects, with each object representing a player's data from an NBA game. This Array will typically be the argument passed in to each `function` (as a an argument called `data`). Each player object contains info such as:

* `TEAM_CITY`
* `PLAYER_NAME`
* `FG3_PCT`
* `FG3_A`
* `REB`
* `AST`
* `PTS`

For example, a single game's data may be represented as:

```
[ 
  {"TEAM_CITY": "Brooklyn", "PLAYER_NAME": "Spencer Dinwiddie", "FG3_PCT": 0.25}, // more properties included
  {"TEAM_CITY": "Brooklyn", "PLAYER_NAME": "Joe Harris", "FG3_PCT": 0.75}, // more properties
  {"TEAM_CITY": "Atlanta", "PLAYER_NAME": "Trae Young", "FG3_PCT": 0.67} // more properties
  // more object after this
]
```

Note that player from both teams are included.

Once you've implemented helper functions in `nba.js`, you can use those functions in `report.js`. If it's helpful, you're free to to reuse functions from `hoffy.js`, in either file, but `for`, `while`, `for in`, `for of`, and `.forEach` are all still off limits.

`report.js` can be used as a commandline utility. Given an absolute path to a json data file, It should examine the file's contents and print out a report. The json file contains information about a game from the NBA's 2018/2019 season.

Example usage:

```
# on the commandline
node src/report.js /absolute/path/to/your/repo/data/0021800952.json
```

The resulting output might look like this:

```
* The score was: { Dallas: 88, Brooklyn: 127 }
* The best passer was: D'Angelo Russell with 11 assists.
* The total rebounds per team were: { Dallas: 36, Brooklyn: 48 }
* The best 3-point shooters were:
1. Dwight Powell: 0.833
2. DeMarre Carroll: 0.714
3. Rodions Kurucs: 0.714
```

The original `json` file will have to parsed and manipulated so that it's in a data structure that you functions can work with.

### `nba.js` Functions

Again, each function will have a parameter, `data`, that's in the format of an `Array` of objects, with each object representing player data for a game.

1. `bestPasser(data)` - gives back an _entire_ player object from the data set that has the highest value for the `AST` property. If there's a tie; you can use any method to pick which object to return.
	* `{"TEAM_CITY": "Brooklyn", "PLAYER_NAME": "Joe Harris", "FG3_PCT": 0.75} // remainder of properties should be included`
2. `getTeamCities(data)` - gives back an `Array` containing the names of the teams (as cities) in a single `Array`. This can be retrieved from the `TEAM_CITY` property (many players will have the same `TEAM_CITY`)
	* `['Brooklyn', 'Atlanta']`
3. `teamRebounds(city, data)` - gives back total rebounds (`REB`) for all players on team specified by the `city` parameter passed in
	* `48`
4. `reboundTotals(data)` - gives back an object containing the `TEAM_CITY` value as a property and the total rebounds (`REB`) for all players on that team... for both teams
	* `{Dallas: 36, Brooklyn: 48}`

Export these functions using `module.exports`.

### `report.js`

In `report.js`:

1. bring in the functions from `nba.js`
	* feel free to add more helper functions / utilities
2. if useful, bring functions from `hoffy.js`
3. use `process.argv[2]` to retrieve the path specified when `report.js` is run on the commandline:
	* `node src/report.js /path/to/file` 
	* `process.argv[2]` will contain `/path/to/file`
4. find a way to read the contents of this file, parse it, and transform the data into data that can be used for your `nba.js` functions
	* `JSON.parse` can be used to turn a string into a JavaScript object
	* examine the resulting object to retrieve the headers and rows
	* find a way to combine those headers and rows into an `Array` of player objects
5. print out a report that includes:
	* the total score for both teams as an object
	* the player with the most assists (`AST`) in the format:
		* `The best passer was: ${playerName} with ${numAssists} assists`
	* the total rebounds per team (`REB`) as an object
	* the 3 players with the highest shooting percentages (`FG3_PCT`) for 3 point shots, in the format:
		* `${number}. ${playerName}: ${percent}`
		* __only do this for players that took more than one 3-point shot__ (`FG3A`)
		
Again, running the command (from the root of your project):

```
`node src/report.js /path/to/file` 
```

in terminal on a file would output _something_ like:

```
* The score was: { Dallas: 88, Brooklyn: 127 }
* The best passer was: D'Angelo Russell with 11 assists.
* The total rebounds per team were: { Dallas: 36, Brooklyn: 48 }
* The best 3-point shooters were:
1. Dwight Powell: 0.833
2. DeMarre Carroll: 0.714
3. Rodions Kurucs: 0.714
```



</div>

</div>
