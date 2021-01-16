---
layout: homework
title: CSCI-UA.0480 - Homework #2
---

<div class="panel panel-default">
  <div class="panel-heading">Homework #2</div>
  <div class="panel-body" markdown="block">

# Higher Order Functions: Exercises and Processing Data - __Due Feb 18 at 11pm__

<div markdown="block" class="img">
![dog](../resources/img/dog.gif)
</div>

## Overview

### Description

__hoffy.js__ - Write a series of functions that demonstrate the use of the rest operator (or call/apply), and higher order functions

__bitefunc.js__ and __report.js__ - Print out a report analyzing dog bite data. There are two parts to this:

* An initial version that works off of a local csv file
* A second version that works off of remote urls containing json (you can overwrite the previous part with this code)

See the [sample output](#hw02-sample) at the end of these instructions.

### Submission Process

You will be given access to a private repository on GitHub. It will contain unit tests, stub files for your code, a `package.json` and a `.eslintrc`

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
    * create a `.gitignore` to ignore node_modules
	* create a `package.json` by using `npm init`
    * make sure that `mocha`, `chai`, and `eslint` are still installed (similar to previous assignment)
        <pre><code data-trim contenteditable>npm install -g mocha
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
    `mocha tests/hoffy-test.js`
5. also remember to run eslint (there's a `.eslintrc` file included in the repository):
    `node_modules/.bin/eslint src/*`

### (40 points) Functions to Implement

### (-2 per while, for, forEach, for of, or for in loop used)

<hr>

### `longestString(s1, s2, s3 to sN)`

__Parameters:__

* `s1, s2, s3 to sN` - any number of string arguments

__Returns:__

* the longest string in the arguments passed in
* if no arguments are passed in, give back `undefined`

__Description:__

Goes through every string argument passed in and gives back the longest string. No error checking is required; you can assume that every argument is a string or no arguments are passed in at all. If there is a tie, return the argument that appears in the later position. If there are no arguments passed in, return `undefined`

HINTS:

* use `rest` parameters!
* try `reduce`

__Example:__

    longestString('foo', 'bar', 'bazzy', 'qux', 'quxx') // --> bazzy
    longestString('foo', 'bar', 'baz', 'qux') // --> qux
    longestString() // --> undefined

<hr>

### `maybe(fn)`

__Parameters:__

* `fn` - the function to be called 

__Returns:__

* a new `function` or `undefined` - the `function` calls the original function

__Description:__

`maybe` will take a function, `fn` and return an entirely new function that behaves mostly like the original function, `fn` passed in, but will return undefined if any `null` or `undefined` arguments are passed in to `fn`.

The new function will take the same arguments as the original function (`fn`). Consequently when the new function is called, it will use the arguments passed to it and call the old function and return the value that's returned from the old function. However, if any of the arguments are `undefined` or `null`, the old function is not called, and `undefined` is returned instead. You can think of it as a way of calling the old function only if all of the arguments are not `null` or not `undefined`.


__Example:__

    function createFullName(firstName, lastName) {
        return `${firstName} ${lastName}`; 
    }
    maybe(createFullName)('Frederick', 'Functionstein'); // Frederick Functionstein
    maybe(createFullName)(null, 'Functionstein');        // undefined
    maybe(createFullName)('Freddy', undefined);          // undefined 

<hr>

### `filterWith(fn)`

__Parameters:__

* `fn` - a _callback_ function that takes in a single argument and returns a value (it will eventually operate on every element in an array)

__Returns:__

* `function` - a function that...
    * has 1 parameter, an `Array`
    * returns a new Array where only elements that cause `fn` to return `true` are present (all other elements from the old Array are not included)

__Description:__

This is different from regular filter. The regular version of filter immediately calls the callback function on every element in an Array to return a new Array of filtered elements. `filterWith`, on the other hand, gives back a function rather than executing the callback immediately (think of the difference between bind and call/apply). `filterWith` is basically a function that turns another function into a filtering function (a function that works on Arrays). 

__Example:__

    // original even function that works on Numbers
    function even(n) {return n % 2 === 0;} 

    // create a 'filter' version of the square function
    filterWithEven = filterWith(even); 

    // now square can work on Arrays of Numbers!
    console.log(filterWithEven([1, 2, 3, 4])); // [2, 4]    
    
    const nums = [1, NaN, 3, NaN, NaN, 6, 7];
    const filterNaN = filterWith(n => !isNaN(n));
    console.log(filterNaN(nums)); // [1, 3, 6, 7]

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

HINT: to adhere to the restrictions regarding use of for, for of, forEach, while, etc. ... it might be useful to think of a way to implement this function recursivelu

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
    var constrainedParseInt2 = constrainDecorator(parseInt);
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

* `function` - a function that will pass it's arguments to `fn1`, take the output of `fn1` and use it as the argument to `fn2`, then take the output of `fn2` and use it for `fn3`, and then... etc


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


## Part 2 - Processing NYC Dog Bite data

In this part, you'll work with a dataset of reported cases of dogs of New York biting humans of New York

The data free to use as part of NYC's open data initiative.

You'll be using two files for this:
1. `bitefunc.js` to create a function called `processBiteData`
    * the function will take an `Array` of objects with each object representing a listing
2. `report.js` to read in and parse JSON data (first a local file, then download from a url) and use the `processBiteData` function above to create a report

### Importing Data

* Download the data by going to [https://data.cityofnewyork.us/Health/DOHMH-Dog-Bite-Data/rsgh-akpg](https://data.cityofnewyork.us/Health/DOHMH-Dog-Bite-Data/rsgh-akpg) and clicking the "Export" button on the top right, then the "CSV" button.
    * place it in a folder outside of your repository
* Create `src/report.js`...
* Start by reading in the file (which should have a filename something like `DOHMH_Dog_Bite_Data.csv`) (remember uncompress the .gz file from above first) using `fs.readFile` (you can use the absolute path)
    * make sure that `fs` the module is brought in using `require`, then call the function)
    * __do not use readFileSync__
* See the docs on `fs.readFile` (hint: make sure you specify `utf8` as the second argument)
* The file that you read in contains reports of dog bites
    * there's one bite per line
    * each bite is represented by a comma-delimited string
* Find a way to read in and parse the contents of the file so that:
    * leading and trailing white space is removed from the initial contents (use the [string method, `trim`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim))
    * each line into an actual JavaScript object, where the properties correspond with the first row of the file (the headers)
    * each resulting object is placed into an `Array` for later processing
    * you can check out some [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) and  [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) 
    * note that the goal of this assignment is to work with higher order functions, so memory efficiency does not need to be taken into consideration
* All of your parsing can only be done from within the callback function (or the function to be called once data is read from the file) that you supply to `fs.readFile`
* Examine the resulting `Array` ... (for example, try printing it out!)
* Later, you will be supplying this `Array` to the `processBiteData` function that you create in `bitefunc.js` to generate a report.
* To verify your file reading and parsing, you can try:
    * printing the "breed", "borough", "dateOfBite" of the 3rd (remember the array index starts from 0) listing in the file in the format: 'Bite no. ${biteIndex} was from a dog of breed: "${bizz.breed}" located in ${bizz.borough} on ${bizz.dateOfBite}'

```
Bite no. 2 was from a dog of breed: "Mastiff, Bull" located in Brooklyn on January 25 2015
```

### Examining the Data
* Assuming that your parsed data is in a variable called `data` ...
* `data` will be an `Array` of JSON objects (each line should have been parsed from JSON before pushing into the `data` array)
* Each object in `data` contains location data, attributes, and categories.

Below is a sample listing from the dataset with a description of properties you'd need for your assignment

```
{
  // nyc's integer id for this bite
  "UniqueID": 1,

  // when it all happened
  "DateOfBite": "January 27 2015",

  // animal species
  "Species": "DOG",

  // string.
  "Breed": "Jack Russ",

  // integer
  "Age": 11,

  // "M","F", or "U"
  "Gender": "M",

  // boolean
  "spayNeuter": false,

  // one of the five
  "borough": "Brooklyn",

  // integer
  "zipCode": 11217
}
```


### Analytics

#### The `processBiteData` Function

You'll create a function to generate a report (as a string) based on NYC dog bite data. You'll write this function in `bitefunc.js`.

### `processBiteData(bites)`

__Parameters:__

* `bites` - an `Array` of objects, with each object representing a report of a dog bite

__Returns:__

* a string containing a report based on the data passed in

__Description:__

This function will generate a report based on the `Array` of objects passed in. The report will contain the average ratings for all bites in the file, the most reviewed bites etc. (see full description of report requirements below)

__Important note about parsing numerical values:__

One of the most common peculiarities you'll come across while working with datasets is that the values read in from a file is that they might not be in the format you expect them to be (they may not be the _right_ type).

 eg. you might see

 ```
 "age": "5"
 ```

It's actually a string whereas we'd like to use it as a float value.

In situations like these, you'll need to parse the numerical value from the string. Here, we'll [use the `parseInt(strval)` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt)


### Implementation Requirements

1. When creating your report in `processBiteData`, you must use all of the following Array methods at least once each in your program:
    * `forEach`
    * `filter`
    * `map`
    * `reduce`
    * There will be a small penalty for each one not used (-2).
    * HINT: A typical pattern is to always use map 99% of the time, so you never accidentally get rid of or mess up the data, except when you're doing your first pass through the data to clean it up. 
	
### Report Overview

Your report will use the data passed in to determine:

1. The average age of all reported biting dogs
2. What percentage of dogs are spayed or neutered vs not
3. Top ten dog breeds ranked by number of reported bites
4. Ranking of each borough by number of reported dog bites.
5. Top three months the majority of dog bites happen?

See the following details...

### Average Age

* Include the average age of all the dogs in the file; format to have at least two decimal places. Example output below:

```
Average age of these chompy friends is: 5.10
```

* Be careful of weird things popping up in the age column ! You're going to have to decide what is noise and what to throw away. Don't worry if your number is slightly different. *
* yes, assume no repeat offenders


### Percentage Spayed/Neutered

* Include what percentage of the dogs were spayed/neutered

```
The percentage of biting dogs that are spayed/neutered: 34.13%
```

### Top Ten Most Reported Dog Breeds

* Find the top ten dog breeds by number of reported bites

```
Top Ten Most Chompy Breeds:
1. Pit Bull with 1919 reported bites
2. Shih Tzu with 358 reported bites
3. American Pit Bull Mix / Pit Bull Mix with 347 reported bites
4. American Pit Bull Terrier/Pit Bull with 343 reported bites
5. Chihuahua with 340 reported bites
6. German Shepherd with 274 reported bites
7. Mixed/Other with 267 reported bites
8. Yorkshire Terrier with 230 reported bites
9. Maltese with 187 reported bites
10. Rottweiler with 162 reported bites
```

### Ranking of Boroughs by Number of Dog Bites

```
Dog Bite Leaderboard
1. Queens with 2202 bites
2. Brooklyn with 1946 bites
3. Manhattan with 1878 bites
4. Bronx with 1508 bites
5. Staten with 845 bites
```

### Top three months the majority of dog bites happen?

There are multiple years of data in the dataset. You need to:
1. Count up the number of bites per month/year (e.g. how many dog bites happened in July of 2015, how many happened in July of 2016?)
2. For every month, get the average number of bites (number of bites in July of 2015 + number of bites in July of 2016) / 2 = guesstimate of how many dog bites happen in a typical July
3. Get the top three months

```
The top three months for dog biting are July, August, and June.
```

### Return Value

All of the analytics should be coalesced into a single large string representing the analytic report.

This string should be returned by your `processBiteData` function in your module, `bitefunc.js`

### Calling processBiteData

Now that you've finished your function, you can try calling it on your data from `report.js`

1. In report.js: require the module that you created (`bitefunc.js`).
2. Use your function on the data that you parsed from reading in the `DOHMH_Dog_Bite_Data.csv` file that you opened earlier.
3. Print out the resulting string.
4. You can compare your output with the example output below

```
Average age of these chompy friends is: 5.10

The percentage of biting dogs that are spayed/neutered: 34.13%

Top Ten Most Chompy Breeds:
1. Pit Bull with 1919 reported bites
2. Shih Tzu with 358 reported bites
3. American Pit Bull Mix / Pit Bull Mix with 347 reported bites
4. American Pit Bull Terrier/Pit Bull with 343 reported bites
5. Chihuahua with 340 reported bites
6. German Shepherd with 274 reported bites
7. Mixed/Other with 267 reported bites
8. Yorkshire Terrier with 230 reported bites
9. Maltese with 187 reported bites
10. Rottweiler with 162 reported bites

Dog Bite Leaderboard
1. Queens with 2202 bites
2. Brooklyn with 1946 bites
3. Manhattan with 1878 bites
4. Bronx with 1508 bites
5. Staten with 845 bites

The top three months for dog biting are July, August, and June.
```

Lint, commit and push your code; the next part will make modifications to this existing code (you can overwrite your work in this file directly for the next part).

## Part 3 - Retrieve JSON from URL

### Setup for Retrieving JSON

In this part, you'll be setting up your project to work with JSON / csv data from a url (this is a bit unusual, as usually your data is just in one format or another):

1. Install the requests library in your project's root folder: `npm install --save request` (similar to installing `readline-sync` in the previous assignment)
2. Add the module to the beginning of `report.js` using `require`
3. __Comment out or delete reading from a local file__


### Retrieve and Process JSON 

Instead of reading a local file, __modify your program__ so that it pieces together all of the data by retrieving partial data sets in json files. The output should be similar, but you'll have to write the part that requests the json files, parses the data out of each file data, and only runs the report when all of the files have been downloaded and parsed.

1. [Read the documentation](https://github.com/mikeal/request) to see how to use the requests module (or see the [slides](../slides/js/js-node-npm-debug-git.html#/6))
	* Notice that the data is only available within the callback that you pass in to calling `request` (much like using readFile)
	* Again, a __callback__ is a function passed as an argument to another function... the callback will be invoked / executed at a later time, when some event is triggered
	* In the case of `request`, it's the function that you pass in as the 2nd argument
2. Remove the part of your program that reads a local file
3. Instead, use request to download the first json file (url given through piazza)
4. Notice that the json file has two fields `data` and `next`
	* `data` is a list of objects, with each object representing a dog bite
	* `next` is the name (without extension) of the next file to retrieve
5. First try downloading just one file and running your report (the numbers should differ from what you previously had)
6. Once you have that working...
	1. Instead of running your report immediately...
	2. Store the parsed dog bite data (in memory, in a global Array or as an argument that gets continually passed)
	3. Retrieve the next url to get more data (that is, use the `next` field to get the name of the next json file to retrieve)
	4. Again, parse the file... and add the data to the dog-bite data you've already saved
	5. Continue doing this until there is no more `next` field
	6. Once you've retrieved all of the data, run your report... it should the same as it did before!


```
Average age of these chompy friends is: 5.10

The percentage of biting dogs that are spayed/neutered: 34.13%

Top Ten Most Chompy Breeds:
1. Pit Bull with 1919 reported bites
2. Shih Tzu with 358 reported bites
3. American Pit Bull Mix / Pit Bull Mix with 347 reported bites
4. American Pit Bull Terrier/Pit Bull with 343 reported bites
5. Chihuahua with 340 reported bites
6. German Shepherd with 274 reported bites
7. Mixed/Other with 267 reported bites
8. Yorkshire Terrier with 230 reported bites
9. Maltese with 187 reported bites
10. Rottweiler with 162 reported bites

Dog Bite Leaderboard
1. Queens with 2202 bites
2. Brooklyn with 1946 bites
3. Manhattan with 1878 bites
4. Bronx with 1508 bites
5. Staten with 845 bites

The top three months for dog biting are July, August, and June.
```
</div>

</div>