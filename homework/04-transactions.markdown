---
layout: homework
title: CSCI-UA.0480 - Homework 4
---

<style>
img {
	width: 100%;
}
</style>

<div class="panel panel-default">
<div class="panel-heading">Homework #4</div>
<div class="panel-body" markdown="block">

# ait.tx - transactions, blocks and Express! Due 3/2 at 11pm

## Overview

How your app might look like when you complete the assignment!


(Right click and choose open image in new tab to see larger version)

![example interaction](../resources/img/hw04-transactions/full-interaction.gif)

### Description

In this homework assignment we will be creating a basic web application using the `express` framework and `handlebars` for templating. We'll also work with reading data from disk into memory, static files, and we'll write some basic middleware.

So again the main topics for this assignment are:

* route handling
* templating
* serving static files
* in-memory data storage 
* middleware

The application you'll be creating will serve as a very basic explorer of transaction data that you are provided with in `.json` files. First, a single transaction is simply a transfer of some currency / token from one user to another (i.e. PayPal, Bitcoin, etc). In addition to the 'from' and 'to' fields that tell us where a transaction has gone, a transaction usually contains a timestamp for when the transaction has occurred, perhaps some identifier, and the actual amount. Here is an example transaction that we can represent in `json`:

```$xslt
{
      "id": 1003,
      "timestamp": "2020-02-01T00:00:00",
      "from": "employer",
      "to": "employee-1",
      "amount": 25000
}
```

For the purposes of efficient storage, replication, and other considerations, transactions are rarely stored all in a single array or list, they are frequently partitioned into *blocks*. Blocks each contain a handful of transactions and have an identifier themselves. An important property of blocks that is also reflected in our data: __in order to maintain order in storing transactions, every block of transactions maintains a pointer to the previous block of transactions that is the name of the .json file representing the block__.

Here is a diagram depicting this visually (can also think of this as a `LinkedList` data structure):

(Right click and choose open image in new tab to see larger version)

![data](../resources/img/hw04-transactions/data-diagram.jpg)

And an example block with a couple of transactions:

```$xslt

{
  "transactions":  [
    {
      "id": 1002,
      "timestamp": "2020-01-01T10:00:00",
      "from": "account-1",
      "to": "employee-pool-1",
      "amount": 100000
    },
    {
      "id": 1003,
      "timestamp": "2020-02-01T00:00:00",
      "from": "account-2",
      "to": "employee-pool-1",
      "amount": 25000
    },
    {
      "id": 1004,
      "timestamp": "2020-03-01T00:00:00",
      "from": "account-1",
      "to": "employee-pool-2",
      "amount": 1000
    }
  ], "previous": "0x1111" }

```

Thus, we can imagine that as more and more transactions are registered in our system, we can keep creating new blocks to hold those new transactions. To do that we can just keep creating `json` files with lists of transactions. But how do we figure out the order in which blocks came in? That is where we use the `previous` pointer to the name of the previous block.

An important observation is that the first block __does not__ have a pointer to the previous block (and in our json, this means that the first block will not have `previous` property).

Take a look at the `.json` files with this block/transaction formatted data provided for the assignment for more details - you should see how the data forms a chain of 3 blocks and the `previous` field points to the preceding block except for in a single `.json` file i.e. block that we designated the starting block.


### Requirements

You'll be creating a web site with 4 pages:

* __All Blocks__ - `/`: 'home' page that displays all of the blocks and their transactions in the correct 'chain' order (more on this later)
* __Latest Block__ - `/latest/block`: a page that displays data for a single __block__ that is the latest block in the 'chain' order
* __Latest Transaction__ - `/latest/tx`: a page that displays data for a single __transaction__ that is the latest transaction by the __timestamp__ field
* __Random Transaction__ - `/random`: a page that displays data for a single __transaction__ randomly picked from __all__ transactions across __all__ blocks


Your directory layout should look like the following __once you're done with the assignment__:

```
├── app.js
├── package-lock.json
├── package.json
├── public
│   ├── css
│   │   └── main.css
│   └── img
│       └── logo.svg
├── transaction.js
├── transactions
│   ├── 0x0FA.json
│   ├── 0x1111.json
│   └── 0xAA.json
└── views
    ├── all.hbs
    └── latest-block.hbs
    └── latest-txt.hbs
    └── layout.hbs
    └── random.hbs
```

### Submission Process

1. You will be given access to a private repository on GitHub
2. The final version of your assignment should be in GitHub
3. __Push__ your changes to the homework repository on GitHub by the due date.

###  Make at Least 4 Commits

* Commit multiple times throughout your development process.
* Make at least 4 separate commits - (for example, one option may be to make one commit per part in the homework).


## Part 1 - Setup

###  Installing Dependencies

* create a <code>package.json</code> (a `package-lock.json` should be created for you as well once you start installing modules)
* __install__ the following __dependencies__ (make sure you use the `--save` option):
	* <code>express</code>
	* <code>hbs</code>

###  .gitignore

* create a `.gitignore`
* ignore the following files / directories:
	* `/node_modules`
	* any other files that aren't relevant to the project... for example
        * `.DS_Store` if you're on MacOS
        * etc.

### linting

* an eslint configuration file (for example `.eslintrc.json`) should be in the root directory (or copy one from a previous project if it doesn't exist)
* make sure that any linting tools are installed (`eslint`)
* periodically lint your program as you work
* minor deductions (0.5 to 1 point) will be taken off for each __class__ of error, w/ a maximum of 3 to 5 points total


## Part 2 - Homepage and Static Files

###  Enabling Static Files

First, we would like to make sure that we can serve static content on our site - like css and images interleaved with our HTML. So let's get started.

* create the following directory / folder structure in your project's root directory
	* `public`
	* `public/css`
	* `public/img`
* add a blank css file in `public/css/main.css`
* add some sort of logo image in `public/img/logo.svg` (can be any format really)
* create a basic express skeleton application in `app.js`
	* make sure that your application is __served over port 3000__
	* __after calling `app.listen(3000)`__
		* print out `"server started; type CTRL+C to shut down"` to the console (the terminal window)
		* this will give you information on whether your server has started correctly 
* add the appropriate `require`s (express, path, etc.) and middleware to enable static file serving:
	* refer to class slides for reminders / code snippets on how to do this
	* make sure it's something like `app.use()`
* test that both the css files and image work
	* for example, try to go to `http://localhost:3000/img/logo.svg` in your browser
	    * your image should be displayed in browser


###  Creating the `"All Blocks"` initial page

Now that we can server static files including our css file to make pages pretty, lets create the first page for our site that will display all of our data on disk (the blocks and their transactions).

First let's setup templating so we can render our pages

* we will be using handlebars (`hbs`) as our templating engine, so do the required steps to set that up
	* get all the requirements and config setup
	* create the appropriate `views` folder, along with an initial layout file:
```$xslt
        └── views
            └── layout.hbs
```
* in your `layout.hbs`, add the html that will be used on every page that we create (refer to slides for more)
* recall that this surrounding html will go on every page
	* add a reference to include your `main.css` stylesheet (so that each other `.hbs` page has it too)
	* include a header containing both your static image and the title of the site, __ait.tx__ 
    * additionally, add a 'navigation (nav) bar' consisting of the links that will let you navigate across the 4 pages of the site:
	    * a link to the All Blocks (`/`) - root url
	    * a link to the Latest Block page (`/latest/block`)
	    * a link to the Latest Transaction page (`/latest/tx`)
	    * a link to the Random Transaction page (`/random`)
	* we will be creating route handlers for all of these pages later
* Important! - don't forget `body`, surrounded by triple curly braces, or else other templates are not going to get rendered
* now that you have the `layout.hbs`, add your first page template (it's up to you how you call it)
    * add an `<h2>` element that says `"Tx Blocks"` to this template
    * you will add more html and templating to this file later
* add some css to `main.css` to change the styles on the page. Some examples / inspiration:
    * change the font, font style (bold, underline)
    * change the background color
    * change the font color
    * add padding, alignment
    * etc.

Now lets implement the initial version of the route handler on the server for this page 

* create a route handler in `app.js` that will listen for `GET` requests on `\`
* add a `render` call so that going to the root url via a `GET` request shows the rendered template (only `h2` and whatever is in `layout.hbs` so far)


Here's an example of what the page could look like (you don't have to use the same exact styles, but add enough styles so that you can see that the style sheet is correctly served and applied to the html):

(Right click and choose open image in new tab to see larger version)

![screenshot](../resources/img/hw04-transactions/1-screenshot.png)

If you add stuff to your css file but no styles change, check the console for errors and the html in  `layout.hbs` to make sure the path to the css file is correct.
	
## Part 3 - Reading Data 

Now that we have created a basic skeleton express app with a route handler and some rendered HTML, lets write the code that will read in the transaction data in the `json` files as outlined in the Overview section from disk and save it in-memory.

If it's useful, you can create classes to hold transactions (since we're parsing objects directly from json, this isn't entirely necessary). If you're considering this:

* reasonable classes could be `TransactionBlock` and `Transaction`
* a `TransactionBlock` needs to have at least 3 properties:
    * the name of the current block (this is the __file name__ of the `json` file so for a file `0x000F.json` the name of the block is `0x000F`)
    * the name of the previous block
    * list of transactions that are part of this block (could be an `Array` of objects of class `Transaction`)
* in `transaction.js` create classes to store the parsed data in an organized manner
    
Here is an example of what creating an instance of each class might look like:

```$xslt

// constructor: transaction id, timestamp, to, from, amount
const transaction1 = new Transaction(1, "2020-01-01T10:00:00", "user1", "user2", 10);
const transaction2 = new Transaction(2 "2020-02-01T10:00:00", "user2", "user3", 20);

// constuctor: transactions, name of current block, name of previous block
const txBlock1 = new TransactionBlock([transaction1, transaction2], "0x000F", "0x00FF");
```

Again... creating these classes is optional.

You'll have to read the `.json` files from disk and store them in memory. Note that each `.json` file
is a block (there will not be more than one block per file) so 3 files equals 3 blocks, but the number of transactions per block may vary and note that not every block will have the `previous` value in the JSON.

* in `transactions.js` write a function called `loadAllTransactions` 
* this function will read all `json` files in a path, parse them, and populate an `Array` of transaction block objects
* because this involves file io, to execute some action after all transactions have been loaded, you'll have to include a callback as one of the parameters 
* `loadAllTransactions` can be implemented a few different ways; for example, you can use: 
	1. a function with 2 arguments
		* path for where the files are on disk
		* a callback when the reading of files is complete, with the callback having a single argument -- the finished `Array` for transaction blocks
	2. a function that will take 3 arguments:
		* path for where the files are on disk
		* an accumulator variable where the parsed data will be added to
		* a callback when the reading of files is complete

* regardless of the function signature for `loadAllTransactions`, use recursion to read in all `.json` files in the path specified as the first argument
* HINT: can use [`fs.readdir`](https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback)
* HINT: can use [`path.extname`](https://nodejs.org/api/path.html#path_path_extname_path) or [`.endsWith`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith) to check file extensions
* HINT: it may be useful to contain the recursion in a helper function rather than make `loadAllTransactions` itself recursive
* you can assume that:
	* all `.json` files contain valid data
	* the `previous` property in every block points to an existing file
	* no validation is needed to for either of the cases above
* recursion should stop once all of the file names in the directory are exhausted and read
* the product of the recursion should be an `Array` of objects representing transaction blocks:
	* if you're using classes, instantiate your `TransactionBlock` object with the appropriate properties
	* ⚠️ if you're simply collecting the parsed json object, make sure to add the name to each transaction block
	* in either case, use the file name without extension as the name of the transaction block
* export the `loadAllTransactions` function to use in `app.js`

* add a global variable to `app.js` that will store the data as an array of `TransactionBlock`s or an equivalent class
* depending on the signature for your `loadAllTransactions`, you can populate this global variable
	* (2 arg version) by setting it in the callback
	* (3 arg version) or by passing this global variable in as the second argument
* inside the callback to `loadAllTransactions`, make sure `listen` is called and the "Server started" message is printed __after__ all of the files are read
* use `__dirname` and `path.join`  where possible to create absolute paths so that the application is more _portable_


Once done with the data loading step, this should be the flow and steps executed when the server starts:

* `loadAllTransactions()` gets called with 2 or 3 arguments
* it uses `fs.readFile` and recursion to read every file that ends with `.json`
    * saves every file as a transaction block
    * and per each transaction block saves every transaction in an array
* after the recursion completes, a global variable is populated with the data that has the structure of:
    * `Array` of objects with each representing a transaction block
    * each object having a field for the block name, previous block name and an `Array` of objects, each representing a single transaction
* the server is started with `server.listen` (only when all of the files have been loaded)
* data in the global variable is now available to all route handlers

⚠️ 👀 __If this part is taking too long, stub out / hard code a global Array of objects. Move on to the next part, and come back to this later__


## Part 4 - Displaying Transaction Blocks and Individual Transactions

Now that you have the data loaded into memory, finish the route handler for `/` that will display data organized in blocks and with transaction data under each block. There are 2 steps to this - first is getting the data into correct 'chain' order and the second is adding the relevant handlebars templating to the `.hbs` file that you have created for this page (perhaps call it `all.hbs`)

### Ordering blocks into a hierarchical chain

So for the first part, the goal is to take the data currently stored in your global variable and "sort" it such that it forms a correct logical chain of blocks, i.e. 

* the first block in array is the block without a `previous` reference
* the next block is the block that has `previous` pointing to that initial block
* and so on until all blocks are re-organized

A simple algorithm comprising of a couple functions could be:

* find the block (`TransactionBlock` object) that is the initial block
* add it to a "stack" of sorts (can just be an array)
* loop over the remaining blocks, and on each iteration
    * compare the `name` associated with the block on top of the stack (the current block) with the `previous` property of each block iterated over
    * you can use this to find the block that has the `previous` pointing to the current block
    * add the found block to the top of stack
    * repeat
  
Then

* Call this function from either:
	* the route handler
	* or immediately after your application has loaded all of the transaction
* This will result in getting the correct 'chain' order data. 
* Add an object to the `render()` call to pass in the array of block data to handlebars, i.e. `render('template', { // your data here });` (see the next part on details regarding the template)

⚠️ 👀 __As with the previous part, if sorting transactions is taking too long... stub out / hard code the ordered global Array of objects and focus on displaying the blocks through express (in the next part), and come back to this later__

### Adding templating

Now that you are passing in the data to handlebars, add the templating to the `.hbs` file that will display the data.

* add the code to loop over the blocks in your array
* HINT: `#each` for looping, `<ul>` and `<li>` for getting data to be displayed nicely in a list
* recall, inside `TransactionBlock` you have access to the 3 fields: block name, previous block name, and an array of single `Transaction`'s.
* add another nested loop to traverse all of the transactions and display them within a single block
* within this loop add `div`s to display each transaction's data
* for visual clarity, can separate blocks with `<hr/>`

__Reload and visually check.__

Here is how your data should look like with some styling applied (doesn't have to be exact just enough to see the data clearly).
__Note the correct order of the blocks in the chain with the initial block at the end of the list / page.__


(Right click and choose open image in new tab to see larger version)

![interaction](../resources/img/hw04-transactions/interaction-1.gif)

## Part 5 - Latest Block and Latest Transaction

### Latest / Last Block Page

Add the second page of the site that will display the latest / last block in the correct 'chain' ordering. This data should be quick to access once you have the functions to order the data into the chain working; simply grab the last block once sorted.

Similarly to how you constructed the initial `/` page:

* add a new route handler in `app.js` handling the `/latest/block` route
* add the logic to get the latest block in the 'chain'
* add the call to render, including the template file name and the data in the object passed into the template

The templating part is easier here since it is just one element:

* add a `.hbs` file that will correspond to this page's template
* add the code inside of the template to display the data on a single block (can take this from `all.hbs`)

And so here is how the page should look like:


(Right click and choose open image in new tab to see larger version)

![interaction](../resources/img/hw04-transactions/interaction-2.gif)

### Latest Transaction Page

Add the third page that will display the latest transaction that is present in the 'chain'. This is different from the latest block, since here we care about the `timestamp` on the individual `Transactions`. 

* add a new route handler in `app.js` handling the `/latest/tx` route
* add the logic to get the latest transaction
* HINT: this can be implemented by flattening the arrays of transactions and writing a custom compare
	* if you'd like, consider using `reduce` or [`flatmMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap) to do this (regular looping is ok too!)
	* for sorting, it maybe helpful to...
	* use the [sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) method on an `Array` of transactions
	* ...and [convert to Date objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#Examples) for the comparison function
	* `Date` objects can be used for arithmetic, so a simple "compare" function for `sort` on dates may be: `(date1, date2) => date1 - date2`
* add the call to `render`, including the template file name and the data in the object passed into the template

Templating is very similar to the latest block page:

* add a `.hbs` file that will correspond to this page's template
* add the code inside of the template to display the data on a single transaction now (can also take this from `all.hbs`)

How the page should look like displaying the transaction with the timestamp that is the latest one:

(Right click and choose open image in new tab to see larger version)

![interaction](../resources/img/hw04-transactions/interaction-3.gif)

## Part 6 - Random Transaction

Add the fourth page that will display a randomly chosen transaction from all the transactions in the chain. 

* add a new route handler in `app.js` handling the `/random` route
* add the logic to pick a random transaction from __all__ transactions across __all__ blocks
* HINT: `Math.random()` and `Math.floor()` should come in handy
* add the corresponding `.hbs` file rendering the transaction
 * pass in a randomly chosen transaction to the render call

How the page should look like displaying randomly picked transactions:

(Right click and choose open image in new tab to see larger version)

![interaction](../resources/img/hw04-transactions/interaction-4.gif)

## Part 7 - Basic Middleware - Logging

In order to make sure you are hitting the correct endpoints when you navigate the app lets add some basic middleware
that will, on every request handled, log to the console:

* The method (only GET for this application)
* The route (path)

<strike>First, activate the body parsing middleware (`express.urlencoded`) by passing it to `app.use`; this will allow you to access the content of the request's body.</strike> (we'll use body parsing middleware in the next assignment; it's not necessary to get method and path

Additionally, create a custom middleware function and `app.use` it in `app.js`. Hint: don't forget to call `next()`.
Again, this function __has to__ print

* the request's __method__ and the __path__
* Example:

```
    Method: GET
    Path: /latest/block
```

Example of navigating the site with the console output of your middleware:

(Right click and choose open image in new tab to see larger version)

![interaction](../resources/img/hw04-transactions/interaction-5.gif)

</div>

</div>
