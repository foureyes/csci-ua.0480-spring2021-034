---
layout: homework
title: CSCI-UA.0480 - Homework #2
---

<div class="panel panel-default">
  <div class="panel-heading">Homework #2</div>
  <div class="panel-body" markdown="block">

# Higher Order Functions: Exercises and Processing Data - Due __Sep 28th, by 11PM__

## Overview

### Description

__hoffy.js__ - Write a series of functions that demonstrate the use of the rest operator (or call/apply), and higher order functions

__restaurants.js__ and __report.js__ - Print out a report analyzing the NYC restaurants' health inspection ratings data.

### Submission Process

You will be given access to a private repository on GitHub. It will contain unit tests, stub files for your code, a `package.json` and a `.eslintrc`

* The final version of your assignment should be in GitHub.
* __Push__ your changes to the homework repository on GitHub.

### Minimum number of commits

As you write your code, make sure that you make at least four commits total (more commits are better; if you can, try to commit per feature added).

* the commits should be meaningful (that is, do not just add a newline, commit and push to make up the requirements for commits).
* make sure your commit messages describe the changes in the commit; for example:
	* add solutions to problem 2 and 3 of part 1
	* fix a bug that prevented reading of csv file

		```
git add <files>
git commit -m 'your commit message'
```
* push your code frequently
		```
git push
```

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

__No type checking of incoming arguments is required unless explicitly mentioned in instructions__ 

__Do not use__:

* `while` loops
* `for` loops
* `for ... in` loops
* `for ... of` loops
* `forEach` method (this is fine for part 2)

__There will a small (-2) penalty every time one is used__. (Homework is 100 points total)


### Steps

1. prep...
    * create a `.gitignore` to ignore node_modules
	* create a `package.json` by using `npm init`
    * make sure that `mocha`, `chai`, and `eslint` are still installed (similar to previous assignment)

		```
npm install -g mocha
npm install --save-dev eslint
npm install --save-dev chai
npm install --save-dev eslint-plugin-mocha
```
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

### Functions to Implement

### (-2 per while, for, forEach, for of, or for in loop used)

<hr>

### `makeSet(num_1, num_2 to num_n)` (use appropriate syntax to accept any number of arguments)

__Parameters:__

* `num_1, num_2, ..., num_n` - the `Numbers` that need to be de-duplicated

__Returns:__

* an array of just the unique elements in `num_1` to `num_n`

__Description:__

A `Set` is a common data structure which only contains unique elements. In this problem, we want to convert any given series of numbers into a `Set`, this means we want to remove duplicates from the original incoming arguments and return as an `Array`. Assume than an empty `Array` or `Array` of `Number`s is passed in; no need to check types.

__Examples:__

```
    makeSet(1, 2, 2, 3, 1); // [1, 2, 3]
    makeSet(1, 2, 4, 3, 5); // [1, 2, 4, 3, 5]
    makeSet(1, 2, 4, 3, 2, 5, 3, 7, 2); // [1, 2, 4, 3, 5, 7]
```
__Hint:__

* Use `rest` parameters!

<hr>

### `findIndex(arr, num, compareFunc)`

__Parameters:__

* `arr` - an `Array`
* `num` - a value that we are looking for in the array 
* `compareFunc` - a function used to determine if an element in `arr` is the one that we're looking for
	* has two parameters, `value1` and `value2`
	* returns a boolean: `true` if both values should be treated as equal or `false` otherwise

__Returns:__

* an `Array` of all indices of `num` in the Array, `arr` [0 indexed]
* if the value is not in the `Array`, return `-1` in an array: `[-1]`

__Description__

Collects indices of every element in `arr` that returns `true` when passed into `compareFunc` along with `num`. Assume the appropriate types are passed in. No type checking is required.

__Examples:__

```
    findIndex([1, 2, 4, 3, 5], 2, (a, b) => a === b); // [1]
    findIndex([-3, -2, -1, 0, 1, 2, 4, 3, 5], 2, (a, b) => a === b || -a === b); // [1, 5]
    findIndex([1, 2, 4, 3, 5], 8, (a, b) => a === b); // [-1]
    findIndex([1, 2, 4, 3, 2, 5, 3, 7, 2], 2, (a, b) => a === b); // [1, 4, 8]
```

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

### `intersection(arr1, arr2)`

__Parameters:__

* `arr1` - the first array containing `Numbers`
* `arr2` - the second array containing `Numbers`

__Returns:__

* an `Array` containing the elements found in both `arr1` and `arr2`
* if there are no common elements, return an empty array.

__Description:__

Finding intersection of lists of data is a very common problem in CS. We only want to store the common elements from both arrays. If there are duplicates in any of the array then make sure that the resulting array only contains one instance of it.

__Hint:__

Converting the arrays to `Sets` might be helpful.

__Examples:__

```
intersection([2], [2]); // [2]
intersection([2], [1]); // []
intersection([1, 2], [1]); // [1]
intersection([2, 1, 2], [1, 2]); // [1, 2]
```

<hr>

### `repeatCall(fn, n, arg)`

__Parameters:__

* `fn` - the function to be called repeatedly
* `n` - the number of times to call function, `fn`
* `arg` - the argument to be passed to `fn`, when it is called

__Returns:__

* `undefined` (no return value)

__Description:__

This function demonstrates using functions as an argument or arguments to another function. It calls function, `fn`, `n` times, passing in the argument, `arg` to each invocation / call. It will ignore the return value of function calls. Note that it passes in only one `arg`.

__Hint:__

Write a recursive function within your function defintion to implement repetition.

__Examples:__

```
repeatCall(console.log, 2, "Hello!");
// prints out:
// Hello!
// Hello!

// calls console.log twice, each time passing in only the first argument

repeatCall(console.log, 2, "foo", "bar", "baz", "qux", "quxx", "corge");
    
// prints out (again, only 1st arg is passed in):
// foo 
// foo 
```

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


### `compose(fn1, fn2, ...,fnN)`

__Parameters:__

* `fn1, fn2, ..., fnN` - a bunch of functions

__Returns:__

* `function` - a function that will pass it's arguments to `fn1`, take the output of `fn1` and use it as the argument to `fn2`, then take the output of `fn2` and use it for `fn3`, and then... etc


__Description:__

A handy utility for automating the writing of code that's just calling functions to pass their arguments to other functions. You can assume that each function passed in only takes one argument.

HINT: we are _summing_ or _composing_ the functionality of a bunch of functions together

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
    const aestheticFmtPipeline = compose(
      superCamelCase,
      spaceText,
      addStyle
    )

    console.log(aestheticFmtPipeline("hello world")) // ~~~ H e L l O   W o R l D ~~~

    function makeVertical(s) {
      return s.split("").join("\n")
    }

    // playlists of playlists of functions
    const tallAestheticFmt = compose(aestheticFmtPipeline, makeVertical)

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


## Part 2 - Processing NYC Restaurant Examination Data

In this part, you'll work with a dataset of hygiene examination records of New York City restaurants.

The data is free to use as part of NYC's open data initiative.

You'll be using two files for this:
1. `restaurants.js` to create a function called `processRestaurantData`
    * the function will take an `Array` of objects with each object representing a listing
2. `report.js` to read in and parse JSON data and use the `processRestaurantData` function above to create a report

### Importing Data

* Download the csv data by going to the link provided in the pinned piazza post 
    * place it in a folder outside of your repository
* Create `src/report.js`...
* Start by reading in the `csv` file using `fs.readFile` (you can use the absolute path)
    * make sure that `fs` the module is brought in using `require`, then call the function)
    * __do not use `readFileSync`__
* See the docs on `fs.readFile` (hint: make sure you specify `utf8` as the second argument)
* The file that you read in contains reports of health inspections
    * there's one restaurant per line
* Find a way to read in and parse the contents of the file so that:
    * leading and trailing white space is removed from the initial contents (use the [string method, `trim`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim))
    * each line into an actual JavaScript object, where the properties correspond with the first row of the file (the headers)
    * each resulting object is placed into an `Array` for later processing
    * you can check out some [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) and  [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) documentation
    * note that the goal of this assignment is to work with higher order functions, so memory efficiency does not need to be taken into consideration
* All of your parsing can only be done from within the callback function (or the function to be called once data is read from the file) that you supply to `fs.readFile`
* Examine the resulting `Array` ... (for example, try printing it out!)
* Later, you will be supplying this `Array` to the `processRestaurantsData` function that you create in `restaurants.js` to generate a report.
* __You only need to use the following columns from the data__
  * CAMIS (Unique ID)
  * DBA (Name of the restaurant)
  * Zipcode
  * Cuisine Description
  * Inspection Date
  * Score
  * Grade
* To verify your file reading and parsing, you can try:
  printing the "boro", "name", "score", "grade" of the 2nd (remember the array index starts from 0) listing in the file in the format: '${data.name} in ${data.boro} has a health inspection score of ${data.score} with a grade ${data.grade}.'

```
Sushi Yu in Brooklyn has a health inspection score of 10 with a grade A.
```

### Examining the Data
* Assuming that your parsed data is in a variable called `data` ...
* `data` will be an `Array` of JSON objects (each line should have been parsed from JSON before pushing into the `data` array)
* Each object in `data` contains location data, score, grade, and categories.

Below is a sample listing from the dataset with a description of properties you'd need for your assignment

```
{
  // nyc's integer id for this restaurant
  "CAMIS": 41615149,

  // name of the restaurant
  "DBA": "GOLDEN STARS PIZZA",

  // borough
  "boro": "Brooklyn",

  // integer zipcode
  "zipcode": 11204,

  // cuisine description
  "cuisine": "Italian",

  // inspection date
  "date": "10/28/2019",

  // Integer Score
  "score": 13,

  // Grade
  "grade": "A"
}
```


### Analytics

#### The `processRestaurantData` Function

You'll create a function to generate a report (as a string) based on the health inspection data. You'll write this function in `restaurant.js`.

### `processRestaurantData(restaurants)`

__Parameters:__

* `restaurants` - an `Array` of objects, with each object representing a report of an inspection

__Returns:__

* a string containing a report based on the data passed in

__Description:__

This function will generate a report based on the `Array` of objects passed in. The report will contain answers to some questions based on the data.

__Important note about parsing numerical values:__

One of the most common peculiarities you'll come across while working with datasets is that the values read in from a file is that they might not be in the format you expect them to be (they may not be the _right_ type).

 eg. you might see

 ```
 "score": "5"
 ```

It's actually a string whereas we'd like to use it as a float value.

In situations like these, you'll need to parse the numerical value from the string. Here, we'll [use the `parseInt(strval)` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt)


### Implementation Requirements

1. When creating your report in `processRestaurantsData`, you must use all of the following Array methods at least once each in your program:
    * `forEach` (note that you cannot use `break` in `forEach`
    * `filter` - use the return value
    * `map` - use the return value
    * `reduce` - use the return value
    * There will be a small penalty for each one not used (-2).
    * HINT: A typical pattern is to always use map 99% of the time, so you never accidentally get rid of or mess up the data, except when you're doing your first pass through the data to clean it up. 
	
### Report Overview

Your report will use the data passed in to determine:

1. Who has better food, Staten Island or the Bronx?
2. How good are the restaurants in Brooklyn?
3. Which boroughs have the most number of A grades?
4. What percentage of restaurants in Queens are Chinese restaurants?
5. What are three restaurants where you might want to eat at when you're in Manhattan?

See the following details...

### Comparing food from Staten Island and the Bronx

* We want to compare the average score of all restaurants in Staten Island vs. the Bronx.
* Note that a lower score is better.
* Include the average score of all the restaurants in the file but only belonging to first Staten Island, and then the Bronx; format to have at least two decimal places. Example output below:

```
Average score of restaurants in Staten Island: 17.21
Average score of restaurants in the Bronx: 15.21
Hence, the Bronx has better food than Staten Island.
```

* Be careful of weird things popping up in the score column! You can disregard empty values and values <= 0. Don't worry if your number is slightly different.
* You can check if a value is a number by using the `isNaN` function. 
* For average, you can count all restaurant values and not just ones with a valid score number.
  


### Most frequent grade in Brooklyn

* Go through each restaurant in Brooklyn and note which grade occurs the most number of times.
* Ignore the blank grade ("_")

```
The most frequently occuring grade in Brooklyn is A!
```

### Boroughs ranked by A grades

* Rank each borough by the number of A grades.

```
1. Brooklyn has 94 A grades
2. Manhattan has 68 A grades
3. Queens has 59 A grades
4. Bronx has 42 A grades
5. Staten Island has 21 A grades
```

### Percentage of Chinese restaurants in Queens

* Find what % of all restaurants in Queens are Chinese restaurants. Check that the Cuisine is "Chinese"; format to have at least two decimal places.
* Example output below:

```
Of all the restaurants in Queens, 17.33% are Chinese restaurants.
```

### Best restaurants in Manhattan

* Go through each restaurant in Manhattan and find the ones with the lowest rating and show the best 3. Example output:
* Skip restaurants with a blank score and scores < 0
```
The best restaurants in Manhattan are:
1. Bubba Gump Shrimp Co.
2. Halal Guys.
3. Olive Garden.
```
(actual results might be different, these are examples)

### Return Value

All of the analytics should be coalesced into a single large string representing the analytic report.

This string should be returned by your `processRestaurantsData` function in your module, `restaurants.js`

### Calling processRestaurantsData

Now that you've finished your function, you can try calling it on your data from `report.js`

1. In report.js: require the module that you created (`restaurants.js`).
2. Use your function on the data that you parsed from reading in the `csv` file that you opened earlier.
3. Print out the resulting string.
4. You can compare your output with the example output below

```
Average score of restaurants in Staten Island: 17.21
Average score of restaurants in the Bronx: 15.21
Hence, the Bronx has better food than Staten Island.

The most frequently occuring grade in Brooklyn is A!

Boroughs ranked by A grades:
1. Brooklyn has 94 A grades
2. Manhattan has 68 A grades
3. Queens has 59 A grades
4. Bronx has 42 A grades
5. Staten Island has 21 A grades

Of all the restaurants in Queens, 17.33% are Chinese restaurants.

The best restaurants in Manhattan are:
1. Bubba Gump Shrimp Co.
2. Halal Guys.
3. Olive Garden.
```

## Part 3 - Retrieve JSON from URL

### Setup for Retrieving JSON

In this part, you'll be setting up your project to work with JSON/CSV data from a url:

1. Install the requests library in your project's root folder: `npm install --save request` (similar to installing `readline-sync` in the previous assignment)
2. Add the module to the beginning of `report.js` using `require`
3. __Comment out or delete reading from a local file. You can modify the code for the previous part directly to do this.__ 


### Retrieve and Process JSON 

Instead of reading a local file, __modify your program__ so that it pieces together all of the data by retrieving partial data sets in json files. The output should be similar, but you'll have to write the part that requests the json files, parses the data out of each file data, and only runs the report when all of the files have been downloaded and parsed.

1. [Read the documentation](https://github.com/request/request) to see how to use the requests module (or see the [slides](../slides/js/js-node-npm-debug-git.html#/6))
	* Notice that the data is only available within the callback that you pass in to calling `request` (much like using readFile)
	* Again, a __callback__ is a function passed as an argument to another function... the callback will be invoked / executed at a later time, when some event is triggered
	* In the case of `request`, it's the function that you pass in as the 2nd argument
2. Remove the part of your program that reads a local file
3. Instead, use request to download the first json file in the pinned piazza post
4. Notice that the json file has two fields `data` and `next`
	* `data` is a list of objects, with each object representing an inspection row
	* `next` is the name of the next file to retrieve
5. First try downloading just one file and running your report (the numbers should differ from what you previously had)
6. Once you have that working...
	1. Instead of running your report immediately...
	2. Store the parsed restaurant data (in memory, in a global Array or as an argument that gets continually passed)
	3. Retrieve the next url to get more data (that is, use the `next` field to get the name of the next json file to retrieve)
	4. Again, parse the file... and add the data to the data you've already saved
	5. Continue doing this until there is no more `next` field
	6. Once you've retrieved all of the data, run your report... it should the same as it did before!
	7. Check the length of your Array and make sure it has the same number of entries as part 2.


```
Average score of restaurants in Staten Island: 17.21
Average score of restaurants in the Bronx: 15.21
Hence, the Bronx has better food than Staten Island.

The most frequently occuring grade in Brooklyn is A!

Boroughs ranked by A grades:
1. Brooklyn has 94 A grades
2. Manhattan has 68 A grades
3. Queens has 59 A grades
4. Bronx has 42 A grades
5. Staten Island has 21 A grades

Of all the restaurants in Queens, 17.33% are Chinese restaurants.

The best restaurants in Manhattan are:
1. Bubba Gump Shrimp Co.
2. Halal Guys.
3. Olive Garden.
```
Lint, commit and push your code!
</div>

</div>
