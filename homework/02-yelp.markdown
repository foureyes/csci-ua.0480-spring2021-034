---
layout: homework
title: CSCI-UA.0480 - Homework #2
---

<div class="panel panel-default">
  <div class="panel-heading">Homework #2</div>
  <div class="panel-body" markdown="block">

# Higher Order Functions: Exercises and Processing Data - __Due Thursday, September 28th, by 11PM__

## Overview

### Description

__hoffy.js__ - Write a series of functions that demonstrate the use of the rest operator (or call/apply), and higher order functions 

__yelpfunc.js__ and __report.js__ - Print out a report analyzing yelp restaurant (business) data. There are two parts to this:

* An initial version that works off of a local JSON file
* An second version that works off of remote urls and additional data (you can overwrite the previous part with this code)

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
    * make sure that `mocha`, `chai`, and `eslint` are still installed (similar to previous assignment)
        <pre><code data-trim contenteditable>npm install -g mocha
npm install --save-dev eslint
npm install --save-dev chai
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

### `repeatCall(fn, n arg)`

__Parameters:__

* `fn` - the function to be called repeatedly
* `n` - the number of times to call function, `fn`
* `arg` - the argument to pass to function, `fn`, when it is called

__Returns:__

* `undefined` (no return value)

__Description:__

This function demonstrates using functions as an argument or arguments to another function. It calls function, `fn`, `n` times, passing in the argument, `arg` to each invocation / call.  It will ignore the return value of function calls. Note that it passes in only one `arg`. Check out the [readings](http://eloquentjavascript.net/05_higher_order.html) or [slides](../slides/js/higher-order-functions-continued.html) on higher order functions for relevant background material and examples.

__Example:__

    repeatCall(console.log, 3, "Hello!");
    // prints out:
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

__Example:__

    // calls console.log twice, each time passing in the args, "foo", "bar", ... "corge"
    repeatCallAllArgs(console.log, 2, "foo", "bar", "baz", "qux", "quxx", "corge");
        
    // prints out:
    // foo bar baz qux quxx corge
    // foo bar baz qux quxx corge

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

This function is a decorator (similar to `maybe`). [See the slides on the decorator pattern](../slides/04/higher-order-functions-continued.html) for background information. It builds on top of the example in the slides by actually _modifying_ the return value of the original function. 

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

### `filterWith(fn)`

__Parameters:__

* `fn` - a _callback_ function that takes in a single argument and returns a value (it will eventually operate on every element in an array)

__Returns:__

* `function` - a function that...
    * has 1 parameter, an `Array`
    * returns a new Array where only elements that cause `fn` to return `true` are present (all other elements from the old Array are not included)_

_Description:__

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

### `simpleINIParse(s)`

__Parameters:__

* `s` - a string that contains data in a simplified [INI format](https://en.wikipedia.org/wiki/INI_file)

__Returns:__

* `object` - an `object` that represents the data in the string as keys and values

__Description:__

For this function, we'll assume that the string being passed in is in a simplified INI format:

Name and value pairs are separated by new lines. Each line has a name on the left side and a value on the right side. An equals sign with no spaces separates the name and the value. For example, the following string literal is in INI format - `"foo=bar\nbaz=qux\nquxx=corge"`. When printed (or if within a file) the content would look like:

    foo=bar
    baz=qux
    quxx=corge

This function takes a string in INI format and parses its names and values as properties and values in a JavaScript object. Consequently, the string above, `"foo=bar\nbaz=qux\nquxx=corge"`, is parsed into: `{foo: 'bar', baz: 'qux', quxx: 'corge'}` 

If duplicate names exist, the later name will overwrite the earlier name (for example, two foo=..., will result in the last foo= overriding the first).

If there is no `=` sign, the line will be skipped.

If there is an equal sign, but one side is missing (`=foo` or `foo=`), then treat the resulting name or value as ''.

__Example:__

    let s = "foo=bar\nbaz=qux\nquxx=corge";
    simpleINIParse(s); // {foo: 'bar', baz: 'qux', quxx: 'corge'} 

    s = "foo=bar\nbaz=qux\nquxx=corge\nfoo=WAT";
    simpleINIParse(s); // {foo: 'WAT', baz: 'qux', quxx: 'corge'}

    s = "foo=bar\nbaz\nquxx=corge";
    simpleINIParse(s); // {foo: 'bar', quxx: 'corge'};

    s = "foo=bar\nbaz=\n=qux";
    simpleINIParse(s); // {foo: 'bar', baz: '', '': 'qux'}


<hr>


### `readFileWith((fn)`

__Parameters:__

* `fn` - a _callback_ function that takes in a single argument, a string of data, and parses it into a JavaScript object (or Array)... this function will eventually work on the data read in from a file using `fs.readFile`.

__Returns:__

* `function` - a function that reads a file and immediately parses it into a JavaScript object (or Array)
    * it has 2 parameters: the `fileName` of the file being read, and callback function specified by the caller to handle the parsedData 
    * this new function does not return anything; instead, it runs the callback function supplied after it reads in the file


__Description:__

This combines many of the items from above and combines it with using callbacks / asynchronous programming.

This function will take a parsing function and turn it into a function that opens a file and immediately parses it. This resulting function will be an async function (!) so it will take a callback as one of its arguments (this callback function is defined by the caller).

The steps for `readFileWith` are:

1. takes a parsing function as an argument
2. returns a new function
3. the new function will take a `fileName` and a callback as arguments
4. it'll read a file using `fs.readFile` (make sure the `fs` module is `require`'d in your project)
    * check out the [fs.readFile](https://nodejs.org/api/fs.html#fs_fs_readfile_file_options_callback) docs
    * use the `fileName` passed in to the new function as the file name for `readFile`
    * set the encoding when calling `readFile` to `utf8`
    * the callback supplied to `readFile` should:
        * parse the data resulting from a file read using the original parsing function, `fn` passed into `readFileWith` if there's no error
        * call the callback passed into the new function with the err object (regardless of wheteher or not it's null/undefined) and the parsed data (again, regardless of whether or not it has a value or is `undefined`)
        * if there is an error, the parsed data should be `undefined`

This is essentially a function that creates functions that reads and parses files.


__Example:__

    // assuming config.ini look like this:
    foo=bar
    baz=qux
    quxx=corge

    // use our simpleINIParse function from earlier!
    const readFileWithSimpleINIParse = readFileWith(simpleINIParse);
    readFileWithSimpleINIParse('tests/config.ini', (err, data) => {
        // within the callback, data is equal to
        //  {foo: 'bar', baz: 'qux', quxx: 'corge'}
    });

    // assuming config.json look like this:
    {
    "foo": "bar", 
    "baz": [1, 2, 3]
    }
    
    const readFileWithJSONParse = readFileWith(JSON.parse);
    readFileWithJSONParse('tests/config.json', (err, data) => {
        // within the callback, data is equal to
        // {foo: 'bar', baz: [1, 2, 3]};
    });

### Test, Lint and Commit

Once you're finished with your functions, remember to:

1. make sure all tests are passing
2. make sure that eslint shows no errors
3. commit and push your code!



## Part 2 - Processing Yelp Business Data, Reading from a local JSON file

In this part, you'll work with JSON restaurant data from yelp. The original data was sourced from [https://www.yelp.com/dataset](https://www.yelp.com/dataset). A subset of the data has been made available through the course site and your repository. You'll be using this data to extract a few analytics.

You'll be using two files for this:

1. `yelpfunc.js` to create a function called `processYelpData`
    * the function will take an `Array` of objects with each object representing a restaurant
2. `report.js` to read in and parse JSON data (first a local file, then download from a url) and use the `processYelpData` above to create a report

### Importing Data

* Download and uncompress business.json.gz from the link given in piazza 
    * save it in a folder outside of your git repository
* Create `src/report.js`...
* Start by reading in the file `business.json` (remember, uncompress the .gz file from above first) using `fs.readFile` (you can use the absolute path) 
  * make sure that the module is brought in using `require`, then call the function)
  * __do not use readFileSync__ 
* See the docs on `fs.readFile` (hint: make sure you specify `utf8` as the second argument)
* The file that you read in contains restaurants
  * there's one restaurant per line
  * each restaurant is represented by a single JSON object 
    * __the last line may contain a an object with a nextFile property__ ...__this object is not a restaurant and should be skipped / ignored__ (you'll use this later)
* Find a way to read in and parse the contents of the file so that:
    * leading and trailing white space is removed from the initial contents (use the string method, `trim`)
  * each line of JSON is parsed into an actual JavaScript object
    * (the last line may contain an object that isn't a restaurant; it should not be included in the report generation below)
  * each resulting object is placed into an `Array` for later processing
  * you can check out some [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) and/or [JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON) methods to do this
  * note that the goal of this assignment is to work with higher order functions and JSON, so memory efficiency does not need to be taken into consideration
* All of your parsing can only be done from within the callback function (or the function to be called once data is read from the file) that you supply to `fs.readFile`
* Examine the resulting `Array` ... (for example, try printing it out!)
* Later, you will be supplying this `Array` to the `procesYelpData` function to generate a report.
* To verify your file reading and parsing, you can try:
    * printing the name, rating and location of the 81st business entry in the file in the format: '{name} is a business located in {city} with a rating of {stars} and {reviews} reviews.'
    * the result should be:
        ```
The Great Canadian Pizza Company is a business located in Mississauga with 4 stars and 18 reviews.
```

### Examining the Data

* Assuming that your parsed data is in a variable called `data` ... 
* `data` will be an `Array` of JSON objects (each line should have been parsed from JSON before pushing into the `data` array)
* Each object in `data` contains location data, attributes, and categories.

Below is a sample for a business that is a restaurant serving Mexican & Burgers, is located in San Francisco (CA), has been reviewed 1198 times and has an average rating of 4.5

```
{
    // string, 22 character unique string business id
    "business_id": "tnhfDv5Il8EaGSXZGiuQGg",

    // string, the business's name
    "name": "Garaje",

    // string, the neighborhood's name
    "neighborhood": "SoMa",

    // string, the full address of the business
    "address": "475 3rd St",

    // string, the city
    "city": "San Francisco",

    // string, 2 character state code, if applicable
    "state": "CA",

    // string, the postal code
    "postal code": "94107",

    // float, latitude
    "latitude": 37.7817529521,

    // float, longitude
    "longitude": -122.39612197,

    // float, star rating, rounded to half-stars
    "stars": 4.5,

    // interger, number of reviews
    "review_count": 1198,

    // integer, 0 or 1 for closed or open, respectively
    "is_open": 1,

    // object, business attributes to values. note: some attribute values might be objects
    "attributes": {
        "RestaurantsTakeOut": true,
        "BusinessParking": {
            "garage": false,
            "street": true,
            "validated": false,
            "lot": false,
            "valet": false
        },
    },

    // an array of strings of business categories
    "categories": [
        "Mexican",
        "Burgers",
        ...
    ],

    // an object of key day to value hours, hours are using a 24hr clock
    "hours": {
        "Monday": "10:00-21:00",
        "Tuesday": "10:00-21:00",
        ...
    }
}
```

### Analytics

#### The `processYelpData` Function

You'll create a function to generate a report (as a string) based on Yelp data.

### `processYelpData(restaurants)`

__Parameters:__

* `restaurants` - an `Array` of objects, with each object representing a restaurant / business 

__Returns:__

* a string containing a report based on the data passed in

__Description:__

This function will generate a report based on the `Array` of objects passed in. The report will contain the average stars for all businesses in the file, the most common business name in the file, etc. (see full description of report requirements below)


### Implementation Requirements

1. When creating your report in `processYelpData`, you must use all of the following Array methods at least once each in your program:
    * `forEach`
    * `filter`
    * `map`
    * `reduce`
    * There will be a small penalty for each one not used (-2).
2. Maintain the order of the restaurants in the file for the section that requires pizza places in Las Vegas (the order that they are printed out should be the order that they appear in the file)


### Report Overview

Your report will use the data passed in to determine:

1. the average stars of all of the businesses
2. the names of all of the pizza places in Las Vegas
3. the two Mexican restaurants with the most reviews
4. the most common name in the data set
5. the number of restaurants per state

See the following details...

### Average Stars (Rating)

* Include the average stars (rating) of all the records in the file; format to have at least two decimal places. Example output below:

```
* Average Rating of the dataset: 3.61
```

### All the Pizza places in Las Vegas, NV

* Find all the restaurants that serve 'Pizza' and are located in the city of 'Las Vegas', in the state of 'NV'. Include each place's rating too. Example output below:

```
* All restaurants in Las Vegas, NV that serve pizza:
    * Spago by Wolfgang Puck (* 4 stars *)
    * Grimaldi's Pizzeria (* 4 stars *)
    * Mama Cimino's (* 2.5 stars *)
    * Noble Roman's Pizza (* 2 stars *)
    * The Locker Room (* 3.5 stars *)
```

### The two Mexican restaurants with the most reviews

Use the `review_count` field to find the two Mexican restaurants with the most reviews. Example output below:

```
* The two highest reviewed Mexican serving restaurants are:
    * The Mission Old Town, Scottsdale (AZ), 1539 reviews (* 4 stars *)
    * Mariscos Playa Escondida, Las Vegas (NV), 330 reviews (* 4.5 stars *)
```

### The most common name in the dataset

Find the name that occurs the most frequently in the dataset. Example output below:

```
* Starbucks is the most common business and appears 8 times in the dataset
```

### Restaurant Count for Each "State"

Count the number of restaurants for each state that occurs in the file. This file contains data from businesses outside of the US, so state abbreviations are not constrained to 2 letters. Example output below

```
* Restaurant count by state
    * AZ: 602
    * BW: 42
    * EDH: 52
    * ELN: 1
    * ESX: 1
    * FIF: 2
    * HLD: 4
    * IL: 19
    * MLN: 3
    * NC: 152
    * NI: 1
    * NV: 329
    * NYK: 1
    * OH: 154
    * ON: 363
    * PA: 126
    * QC: 88
    * SC: 2
    * WI: 58
```

### Return Value

All of the analytics should be coalesced into a single large string representing the analytic report.

This string should be returned by your `processYelpData` function in your module, `yelpfunc.js`

### Calling processYelpData

Now that you've finished your function, you can try calling it on your data from `report.js`

1. In report.js: require the module that you created.
2. Use your function on the data that you parsed from reading in the `business.json` file.
3. Print out the resulting string.
4. You can compare your output with the example output below

```
* Average Rating of the dataset: 3.61

* All restaurants in Las Vegas, NV that serve pizza
    * Spago by Wolfgang Puck (* 4 stars *)
    * Grimaldi's Pizzeria (* 4 stars *)
    * Mama Cimino's (* 2.5 stars *)
    * Noble Roman's Pizza (* 2 stars *)
    * The Locker Room (* 3.5 stars *)

* The two highest reviewed Mexican serving restaurants are:
    * The Mission Old Town, Scottsdale (AZ), 1539 reviews (* 4 stars *)
    * Mariscos Playa Escondida, Las Vegas (NV), 330 reviews (* 4.5 stars *)

* The most common name in the dataset:
    * Starbucks is the most common business and appears 8 times in the dataset

* Restaurant count by state
    * AZ: 602
    * BW: 42
    * EDH: 52
    * ELN: 1
    * ESX: 1
    * FIF: 2
    * HLD: 4
    * IL: 19
    * MLN: 3
    * NC: 152
    * NI: 1
    * NV: 329
    * NYK: 1
    * OH: 154
    * ON: 363
    * PA: 126
    * QC: 88
    * SC: 2
    * WI: 58
```

Lint, commit and push your code; the next part will make modifications to this existing code (you can overwrite your work in this file directly for the next part).

## Part 3 - Retrieve JSON from URL

### Setup for Retrieving JSON

In this part, you'll be setting up your project to work with JSON data from a url:

1. Install the requests library in your project's root folder: `npm install --save request` (similar to installing `readline-sync` in the previous assignment)
2. Add the module to the beginning of `report.js` using `require`
3. **Comment out or delete reading from a local file**


### Retrieve and Process JSON Data

Instead of reading a local file, **modify your program** so that it requests JSON data from a specified url. This URL will be distributed via piazza (see a pinned note). Again, there will be one additional object in the last line of the file:

`{"nextFile": "4df1c5ef1280bee2e2b44167027d2469.json"}`

This last object has a key, `nextFile`, and the value represents the name of another file of business data (in the object above, the name of the next file is: `4df1c5ef1280bee2e2b44167027d2469.json`). This next section will explain how to retrieve this json file from the web.


* The URL for the dataset used in this assignment __will be posted on piazza__
* [Read the documentation](https://github.com/mikeal/request) to see how to use the requests module (or see the [slides](../slides/js/js-node-npm-debug-git.html#/6))
* Notice that the data is only available within the callback that you pass in to calling `request` (much like using readFile)
* Again, a **callback** is a function passed as an argument to another function... the callback will be invoked / executed at a later time, when some event is triggered
* In the case of `request`, it's the function that you pass in as the 2nd argument
* (The call to your report generation should be moved to the callback of request...)
* Parse the body of the response from `request` into an Array of objects (similar to how you processed the file in the previous part)
    * Leading and trailing white space should removed from the initial contents (use the string method, `trim`) before parsing (again, same as the previous part)
    * For now, you can ignore the last object that contains `nextFile`
    * Modify your script if necessary to ignore that line 
* Print out the url of the file you requested
    ```==========
url:  `https://some.domain/and/path/to/file.json
==========```
* Finally, print out the result of calling `processYelpData` on the parsed response

When you run your report again, the output should looks similar to your previous version, though some of the data will be different.

### Get Next JSON Files

Now, instead of running this report on a single url, you'll download several files. You will not know the URLs of the subsequent files in advance. Instead, you'll have to examine the `nextFile` property of the last object in the initial JSON data requested.

* Print out the URL that you're retrieving before running a report for each file/url
* The last object from the JSON file contains a `nextFile` property;
* The `nextFile` property contains the next file to retrieve
* Construct a new URL based on that filename and print out the new URL
* Use the `request` library again to retrieve and process the data from this new URL
* Continue to do this until you encounter a file that does not have an object with a `nextFile` property as its last line

<pre name="hw02-sample" id="hw02-sample"><code data-trim contenteditable>
==========
url:  ...
==========
* Average Rating of the dataset: 3.6134432783608195

* All restaurants in Las Vegas, NV that serve pizza
    * Ray's Pizzeria and Restaurant (* 2.5 stars *)
    * Bambino's East Coast Pizzeria (* 4.5 stars *)
    * Papa John's Pizza (* 2 stars *)
    * Bonanno's New York Pizzeria (* 3 stars *)
    * Hunt & Gather Cafe (* 4 stars *)
    * CiCi's Pizza (* 3.5 stars *)
    * Marco's Pizza (* 3.5 stars *)
    * Taqueria El Capullo (* 4.5 stars *)

* The two highest reviewed Mexican serving restaurants are:
    * Taco Guild, Phoenix (AZ), 958 (* 4 stars *)
    * Jose Cuervo Tequileria, Las Vegas (NV), 414 (* 2 stars *)

* The most common name in the dataset:
    * Starbucks

* Restaurant count by state
    * 01: 2
    * AZ: 546
    * BW: 36
    * C: 1
    * EDH: 45
    * ELN: 1
    * ESX: 1
    * HLD: 2
    * IL: 24
    * MLN: 3
    * NC: 166
    * NV: 369
    * NY: 1
    * NYK: 1
    * OH: 154
    * ON: 376
    * PA: 114
    * QC: 95
    * SC: 9
    * WI: 54


.
.
.
(more urls processed here...)
.
.
.


==========
url:  https://...
==========
* Average Rating of the dataset: 3.64325

* All restaurants in Las Vegas, NV that serve pizza
    * Pizza Hut (* 1 stars *)
    * Vit's Pizza (* 2.5 stars *)
    * Napoli Pizza (* 3 stars *)
    * Home Plate Grill & Bar (* 4 stars *)
    * Pizza My Dear (* 4 stars *)
    * Due Pizzeria (* 4.5 stars *)
    * Pizza Hut (* 2 stars *)

* The two highest reviewed Mexican serving restaurants are:
    * Otro Cafe, Phoenix (AZ), 541 (* 4 stars *)
    * Zócalo Tequilería, Cleveland (OH), 381 (* 2.5 stars *)

* The most common name in the dataset:
    * Starbucks

* Restaurant count by state
    * AZ: 543
    * BW: 44
    * EDH: 53
    * FIF: 2
    * HLD: 1
    * IL: 17
    * MLN: 5
    * NC: 160
    * NV: 385
    * NYK: 1
    * OH: 168
    * ON: 359
    * PA: 109
    * QC: 103
    * SC: 5
    * WI: 42
    * WLN: 3
</code></pre>

</div>

</div>
