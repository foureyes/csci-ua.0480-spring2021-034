---
layout: homework
title: CSCI-UA.0480 - Homework #2
---

<div class="panel panel-default">
  <div class="panel-heading">Homework #2</div>
  <div class="panel-body" markdown="block">

# Higher Order Functions: Exercises and Processing Data - __Due Wednesday, February 7th, by 11PM__

## Overview

### Description

__hoffy.js__ - Write a series of functions that demonstrate the use of the rest operator (or call/apply), and higher order functions 

__bnbfunc.js__ and __report.js__ - Print out a report analyzing AirBnb listing data. There are two parts to this:

* An initial version that works off of a local JSON file
* A second version that works off of remote urls and additional data (you can overwrite the previous part with this code)

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

### `makePropertyChecker(prop)`

__Parameters:__

* `prop` - a string representing the property to check for

__Returns:__

* `function` - a function that...
    * has 1 parameter, an `object`
    * returns `true` if the original `prop` is in `object`, `false` otherwise

__Description:__


The previous functions showed how functions can be passed in as arguments to another function. In this function, we'll be returning a function. You can think of it as a _function producing factory_! 

The original function will take an argument, a `String` representing the property that the new function will check for. You can use the newly returned function to check an object for that property. However, it will only check for properties on the object itself, not inherited properties. See the [slides on objects](../slides/js/objects.html#/16) to see how to do this. Again, you can also check out the [readings](http://eloquentjavascript.net/05_higher_order.html) or [slides](../slides/js/higher-order-functions-continued.html) on higher order functions for relevant background material and examples.

__Example:__

    // returns a function that checks for an object for a specific property
    // setup some objects
    const duck = {
        quack: function(){
            console.log('quack');
        }
    };
    const notADuck = {};

    // this new syntax creates an object that inherits from duck
    const duckling = Object.create(duck);
    
    const canQuack = makePropertyChecker('quack');
    canQuack(duck) // --> true
    canQuack(notADuck) // --> false
    canQuack(duckling) // --> false
    

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

### `mapWith(fn)`

__Parameters:__

* `fn` - a _callback_ function that takes in a single argument and returns a value (it will eventually operate on every element in an array)

__Returns:__

* `function` - a function that...
    * has 1 parameter, an `Array`
    * returns a new Array where every element is the result of calling the original function passed in `fn` on elements in the incoming Array, producing an entirely new `Array`

__Description:__

This is different from regular map. The regular version of map immediately calls the callback function on every element in an Array to return a new Array. `mapWith`, on the other hand, gives back a function rather than executing the callback immediately (think of the difference between bind and call/apply). `mapWith` is basically a function that turns another function into a mapping function (a function that works on Arrays). 

__Example:__

    // original square function that works on Numbers
    function square(n) {return n * n;} 

    // create a 'mapped' version of the square function
    mapWithSquare = mapWith(square); 

    // now square can work on Arrays of Numbers!
    console.log(mapWithSquare([1, 2, 3])); // [1, 4, 9]    
    
    mapWithParseInt = mapWith((n) => parseInt(n));
    console.log(mapWithParseInt([' 123', '45', '67 '])); // [123, 45, 67]


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


## Part 2 - Processing AirBnb listings data, Reading from a local JSON file

In this part, you'll work with a dataset of AirBnb listings and learn how to read from a local JSON file,

The original data was sourced from http://tomslee.net/airbnb-data-collection-get-the-data. All credit goes to Tom Slee. The dataset is available under the Creative Commons license (CC BY-NC 2.5 CA). A subset of the data has been made available through the course site and your repository. You'll be using this data to extract a few analytics.

You'll be using two files for this:
1. `bnbfunc.js` to create a function called `processAirBnbData`
    * the function will take an `Array` of objects with each object representing a listing
2. `report.js` to read in and parse JSON data (first a local file, then download from a url) and use the `processAirBnbData` function above to create a report

### Importing Data

* Download and uncompress the __compressed file from the link given in piazza__
    * place it in a folder outside of your repository
* Create `src/report.js`...
* Start by reading in the file `combined-listings.json` (remember uncompress the .gz file from above first) using `fs.readFile` (you can use the absolute path) 
    * make sure that `fs` the module is brought in using `require`, then call the function)
    * __do not use readFileSync__ 
* See the docs on `fs.readFile` (hint: make sure you specify `utf8` as the second argument)
* The file that you read in contains AirBnb listings
    * there's one listing per line
    * each listing is represented by a single JSON object 
    * __the last line may contain an object with a `next_file` property__ ... __this object is not a listing and should be skipped / ignored__ (you'll use this later)
* Find a way to read in and parse the contents of the file so that:
    * leading and trailing white space is removed from the initial contents (use the string method, `trim`)
    * each line of JSON is parsed into an actual JavaScript object
    * (the last line may contain an object that isn't an AirBnb listing; it should not be included in the report generation below)
    * each resulting object is placed into an `Array` for later processing
    * you can check out some [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) and/or [JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON) methods to do this
    * note that the goal of this assignment is to work with higher order functions and JSON, so memory efficiency does not need to be taken into consideration
* All of your parsing can only be done from within the callback function (or the function to be called once data is read from the file) that you supply to `fs.readFile`
* Examine the resulting `Array` ... (for example, try printing it out!)
* Later, you will be supplying this `Array` to the `processAirBnbData` function that you create in `bnbfunc.js` to generate a report.
* To verify your file reading and parsing, you can try:
    * printing the "room_type", "neighborhood", "city", "overall_satisfaction", "reviews" of the 17453rd (remember the array index starts from 0) listing in the file in the format: 'Listing no. ${listingIndex} is a listing of type: "${bizz.room_type}" located in ${bizz.neighborhood} (${bizz.city}) with a rating of ${bizz.overall_satisfaction} and has been reviewed ${bizz.reviews} times.'
    * the result should be:
       
```
Listing no. 17453 is a listing of type: "Entire home/apt" located in Pankow (Berlin) with a rating of 4.0 and has been reviewed 11 times.
```

### Examining the Data
* Assuming that your parsed data is in a variable called `data` ... 
* `data` will be an `Array` of JSON objects (each line should have been parsed from JSON before pushing into the `data` array)
* Each object in `data` contains location data, attributes, and categories.

Below is a sample listing from the dataset with a description of properties you'd need for your assignment (more details about the data can be found here: http://tomslee.net/airbnb-data-collection-get-the-data)

```
{
  // A unique number identifying an Airbnb listing
  "room_id": "7739955",

  "survey_id": "1438",
    
  // A unique number identifying an Airbnb host
  "host_id": "38614070",

  // The type of the current listing: One of “Entire home/apt”, “Private room”, or “Shared room”
  "room_type": "Shared room",
  
  "country": "",

  // The city of each listing
  "city": "New York",

  // The borough this listing is located in
  "borough": "Queens",

  // The neighborhood this listing is located in
  "neighborhood": "Jackson Heights",
  
  // The number of times this listing has been reviewed
  "reviews": "6",

  // IMPORTANT: the average rating of the listing, this is what "rating" refers to in the instructions
  "overall_satisfaction": "5.0",

  // Indicates how many people the listing can accommodate
  "accommodates": "4",

  // No. of bedrooms
  "bedrooms": "1.0",

  // No. of bathrooms
  "bathrooms": "",

  // The price of each listing in $US for a night-stay
  "price": "85.0",

  // The minimum stay for a visit, as posted by the host
  "minstay": "",

  // Name of the listing, you can ignore this
  "name": "Room TO SHARE by DAY,week,month",

  // Type of the property
  "property_type": "House",

  // The date and time that the values were read from the Airbnb web site
  "last_modified": "2017-07-15 21:30:31.858764",

  "latitude": "40.749909",

  "longitude": "-73.87688",

  "location": "0101000020E61000000EA14ACD1E7852C0F0FCA204FD5F4440"
}

```


### Analytics

#### The `processAirBnbData` Function

You'll create a function to generate a report (as a string) based on AirBnb data. You'll write this function in `bnbfunc.js`.

### `processAirBnbData(listings)`

__Parameters:__

* `listings` - an `Array` of objects, with each object representing a place listed on AirBnb

__Returns:__

* a string containing a report based on the data passed in

__Description:__

This function will generate a report based on the `Array` of objects passed in. The report will contain the average ratings for all listings in the file, the most reviewed listings etc. (see full description of report requirements below)

__Important note about parsing numerical values:__

One of the most common peculiarities you'll come across while working with datasets is that the values in JSON objects might not be in the format you expect them to be.
 eg. in the JSON sample above, observe the format of the value in   

 ```
 "overall_satisfaction": "5.0"
 ```
It's actually a string whereas we'd like to use it as a float value.

In situations like these, you'll need to parse the numerical value from the string. Here, we'll [use the `parseFloat(strval)` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat)

This will return 5.0 as a float when you use `parseFloat(obj.overall_satisfaction)`.

### Implementation Requirements

1. When creating your report in `processAirBnbData`, you must use all of the following Array methods at least once each in your program:
    * `forEach`
    * `filter`
    * `map`
    * `reduce`
    * There will be a small penalty for each one not used (-2).

### Report Overview

Your report will use the data passed in to determine:

1. The average rating of all listings
2. The average price of all listings
3. All listings in the current dataset with a "rating greater than 4.8, priced less than 55, and accommodating more than 6 people"
4. The two highest reviewed listings
5. The borough with the most expensive listings on average in NYC (if NYC listings exist)

See the following details...

### Average Rating

* Include the average rating (overall_satisfaction) of all the records in the file; format to have at least two decimal places. Example output below:

```
* Average rating of the current dataset is: 2.85
```

### Average Price

* Include the average price (price) of all the records in the file; format to have at least two decimal places. Example output below:

```
* Average price of the current dataset is: 159.00
```

### All listings in the current dataset with a "rating greater than 4.8, priced less than 55, and accommodating more than 6 people" (because you _like to party_!)

* Find all the listings with the criterion mentioned above. Also include the properties: room_id, overall_satisfaction, price, city, and accommodates.

```
* All listings in the current dataset with a rating greater than 4.8, priced less than 55, and accommodating more than 6 people:
    * Listing ID: 7532533 with a rating of 5.0 priced at 35.0 in New York accommodates 8
    * Listing ID: 17875248 with a rating of 5.0 priced at 24.0 in New York accommodates 8
    * Listing ID: 15546504 with a rating of 5.0 priced at 54.0 in Berlin accommodates 10
    * Listing ID: 3328401 with a rating of 5.0 priced at 45.0 in Berlin accommodates 9
    * Listing ID: 14807731 with a rating of 5.0 priced at 54.0 in Berlin accommodates 8
    * Listing ID: 14381251 with a rating of 5.0 priced at 37.0 in Berlin accommodates 8
    * Listing ID: 4027713 with a rating of 5.0 priced at 10.0 in Berlin accommodates 12
```

### The two highest reviewed listings

Use the `reviews` field to find the two highest reviewed listings. Example output below:

```
* The two highest reviewed listings of the current dataset are:
    * ID: 205842 in San Francisco reviewed 513 times and rated 5.0
    * ID: 33577 in San Francisco reviewed 510 times and rated 5.0
```

### The borough with the most expensive listings on average in NYC

As the title mentions, you're expected to find the borough with the most expensive listings on average in NYC.

Hint: you'll first need to get the aggregate price of all the listings by boroughs, followed by getting the total number of listings for each NYC borough. This will help you find the average price for each borough, you then need to find the one with the highest average price of listings.

```
* For the current dataset, Staten Island has the most expensive listings in NYC with an average listing price of 331.38
```
If the dataset does not have any listings for NYC, then your report should indicate:

```
* This file has no data about NYC!
```

### Return Value

All of the analytics should be coalesced into a single large string representing the analytic report.

This string should be returned by your `processAirBnbData` function in your module, `bnbfunc.js`

### Calling processAirBnbData

Now that you've finished your function, you can try calling it on your data from `report.js`

1. In report.js: require the module that you created (`bnbfunc.js`).
2. Use your function on the data that you parsed from reading in the `combined-listings.json` file that you opened earlier.
3. Print out the resulting string.
4. You can compare your output with the example output below

```
* Average rating of the current dataset is: 2.85

* Average price of the current dataset is: 159.00

* All listings in the current dataset with a rating greater than 4.8, priced less than 55, and accommodating more than 6 people:
    * Listing ID: 7532533 with a rating of 5.0 priced at 35.0 in New York accommodates 8
    * Listing ID: 17875248 with a rating of 5.0 priced at 24.0 in New York accommodates 8
    * Listing ID: 15546504 with a rating of 5.0 priced at 54.0 in Berlin accommodates 10
    * Listing ID: 3328401 with a rating of 5.0 priced at 45.0 in Berlin accommodates 9
    * Listing ID: 14807731 with a rating of 5.0 priced at 54.0 in Berlin accommodates 8
    * Listing ID: 14381251 with a rating of 5.0 priced at 37.0 in Berlin accommodates 8
    * Listing ID: 4027713 with a rating of 5.0 priced at 10.0 in Berlin accommodates 12
* The two highest reviewed listings of the current dataset are:
    * ID: 205842 in San Francisco reviewed 513 times and rated 5.0
    * ID: 33577 in San Francisco reviewed 510 times and rated 5.0

* For the current dataset, Staten Island has the most expensive listings in NYC with an average listing price of 331.38
```

Lint, commit and push your code; the next part will make modifications to this existing code (you can overwrite your work in this file directly for the next part).

## Part 3 - Retrieve JSON from URL

### Setup for Retrieving JSON

In this part, you'll be setting up your project to work with JSON data from a url:

1. Install the requests library in your project's root folder: `npm install --save request` (similar to installing `readline-sync` in the previous assignment)
2. Add the module to the beginning of `report.js` using `require`
3. __Comment out or delete reading from a local file__


### Retrieve and Process JSON Data

Instead of reading a local file, __modify your program__ so that it requests JSON data from a specified url. __This URL will be distributed via piazza__. Again, there will be one additional object in the last line of the file: 

`{"next_file": "4df1c5ef1280bee2e2b44167027d2469.json"}`

This last object has a key, `next_file`, and the value represents the name of another file of listings data (in the object above, the name of the next file is: `4df1c5ef1280bee2e2b44167027d2469.json`). This next section will explain how to retrieve this json file from the web.

* The URL for the dataset used in this assignment __will be posted on piazza__
* [Read the documentation](https://github.com/mikeal/request) to see how to use the requests module (or see the [slides](../slides/js/js-node-npm-debug-git.html#/6))
* Notice that the data is only available within the callback that you pass in to calling `request` (much like using readFile)
* Again, a __callback__ is a function passed as an argument to another function... the callback will be invoked / executed at a later time, when some event is triggered
* In the case of `request`, it's the function that you pass in as the 2nd argument
* (The call to your report generation should be moved to the callback of request...)
* Parse the body of the response from `request` into an Array of objects (similar to how you processed the file in the previous part)
    * Leading and trailing white space should removed from the initial contents (use the string method, `trim`) before parsing (again, same as the previous part)
    * For now, you can ignore the last object that contains `next_file`
    * Modify your script if necessary to ignore that line 
* Print out the url of the file you requested
    ```==========
url:  `https://some.domain/and/path/to/file.json
==========```
* Finally, print out the result of calling `processAirBnbData` on the parsed response

When you run your report again, the output should looks similar to your previous version, though some of the data will be different.

### Get Next JSON Files

Now, instead of running this report on a single url, you'll download several files. You will not know the URLs of the subsequent files in advance. Instead, you'll have to examine the `next_file` property of the last object in the initial JSON data requested.

* Print out the URL that you're retrieving before running a report for each file/url
* The last object from the JSON file contains a `next_file` property;
* The `next_file` property contains the next file to retrieve
* Construct a new URL based on that filename and print out the new URL (simply concatenate the domain and path with the new file name)
* Use the `request` library again to retrieve and process the data from this new URL
* Continue to do this until you encounter a file that does not have an object with a `next_file` property as its last line

Sample runs for each fetch of a new file:

```
URL: http://some.url/foo.json
===================================
* Average rating of the current dataset is: 2.7596713175771876
* Average price of the current dataset is: 161.56091608021805
* All listings in the current dataset with a rating greater than 4.8, priced less than 55, and accommodating more than 6 people:
    * Listing ID: 7532533 with a rating of 5.0 priced at 35.0 in New York accommodates 8
    * Listing ID: 17875248 with a rating of 5.0 priced at 24.0 in New York accommodates 8
    * Listing ID: 15546504 with a rating of 5.0 priced at 54.0 in Berlin accommodates 10
    * Listing ID: 3328401 with a rating of 5.0 priced at 45.0 in Berlin accommodates 9
    * Listing ID: 14807731 with a rating of 5.0 priced at 54.0 in Berlin accommodates 8
    * Listing ID: 14381251 with a rating of 5.0 priced at 37.0 in Berlin accommodates 8
    * Listing ID: 4027713 with a rating of 5.0 priced at 10.0 in Berlin accommodates 12
* The two highest reviewed listings of the current dataset are:
    * ID: 545685 in San Francisco reviewed 461 times and rated 4.5
    * ID: 960593 in San Francisco reviewed 424 times and rated 4.5
* For the current dataset, Staten Island has the most expensive listings in NYC with an average listing price of 375.390243902439

URL: http://some.url/bar.json
===================================
* Average rating of the current dataset is: 2.0962055070517125
* Average price of the current dataset is: 120.72926460711888
* All listings in the current dataset with a rating greater than 4.8, priced less than 55, and accommodating more than 6 people:
    * Listing ID: 12200678 with a rating of 5.0 priced at 11.0 in Moscow accommodates 8
    * Listing ID: 7376527 with a rating of 5.0 priced at 10.0 in Moscow accommodates 10
    * Listing ID: 7237904 with a rating of 5.0 priced at 10.0 in Moscow accommodates 10
    * Listing ID: 8290631 with a rating of 5.0 priced at 16.0 in Moscow accommodates 16
    * Listing ID: 3750417 with a rating of 5.0 priced at 13.0 in Moscow accommodates 12
    * Listing ID: 6741553 with a rating of 5.0 priced at 10.0 in Moscow accommodates 16
    * Listing ID: 12539160 with a rating of 5.0 priced at 45.0 in Moscow accommodates 7
    * Listing ID: 15322544 with a rating of 5.0 priced at 43.0 in Moscow accommodates 7
    * Listing ID: 11986735 with a rating of 5.0 priced at 53.0 in Moscow accommodates 8
    * Listing ID: 5182769 with a rating of 5.0 priced at 53.0 in Moscow accommodates 7
    * Listing ID: 4948793 with a rating of 5.0 priced at 14.0 in Moscow accommodates 16
    * Listing ID: 13243056 with a rating of 5.0 priced at 10.0 in Moscow accommodates 8
    * Listing ID: 7453138 with a rating of 5.0 priced at 14.0 in Moscow accommodates 16
    * Listing ID: 7733397 with a rating of 5.0 priced at 14.0 in Moscow accommodates 12
* The two highest reviewed listings of the current dataset are:
    * ID: 205842 in San Francisco reviewed 513 times and rated 5.0
    * ID: 33577 in San Francisco reviewed 510 times and rated 5.0
* This file has no data about NYC!

URL: http://some.url/baz.json
===================================
* Average rating of the current dataset is: 2.355144135188867
* Average price of the current dataset is: 147.21317097415508
* All listings in the current dataset with a rating greater than 4.8, priced less than 55, and accommodating more than 6 people:
    * Listing ID: 18890521 with a rating of 5.0 priced at 25.0 in New York accommodates 16
    * Listing ID: 19241287 with a rating of 5.0 priced at 40.0 in New York accommodates 16
* The two highest reviewed listings of the current dataset are:
    * ID: 31994 in New York reviewed 344 times and rated 4.5
	* ID: 1631778 in Nice reviewed 326 times and rated 5.0
* For the current dataset, Manhattan has the most expensive listings in NYC with an average listing price of 116.7870195337114

```
</div>

</div>
