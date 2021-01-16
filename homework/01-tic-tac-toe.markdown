---
layout: homework
title: CSCI-UA.0480 - Homework #1
---

<div class="panel panel-default">
	<div class="panel-heading">Homework #1</div>
	<div class="panel-body" markdown="block">

# Tic Tac Toe and Scrabble Pal

## Due __Sep 16th, by 11PM__

<div markdown="block" class="img">
![tic tac toe from wargames](../resources/img/hw01-t3-wargames.gif)
</div>

## Overview

### Description

__There are multiple parts to this homework:__

__Parts 1 and 2__ - Tic Tac Toe

Create an interactive 2-player (computer vs human player) Tic Tac Toe game.

* check out [the rules on wikipedia](https://en.wikipedia.org/wiki/Tic-tac-toe)
* xkcd has a map that describes the [optimal tic-tac-toe moves](https://xkcd.com/832/)
* some people take tic-tac-toe [really seriously](https://www.reddit.com/r/TrueTicTacToe/)
* the gif above comes from a [youtube clip from the 1983 movie, Wargames](http://www.imdb.com/title/tt0086567/)

You'll create this game in 2 parts. The first part will guide you through creating several helper functions for your game. The second part deals with implementing the game using the helper functions you made for part 1. It'll be a bit over-engineered, but don't worry - you don't have to use all of the functions you create (and you definitely won't use every feature in each function). Of course, you're encouraged to create your own helper functions as well!

See the [example game](#hw01-tic-tac-toe-sample) shown at the end of these instructions.

__Part 3__  - Scrabble Pal

Create a scrabble solver. It will allow you to enter a string of letters... and it will output the 5 highest scoring words that can be constructed from those letters. The scores for each word are on these [rules](https://en.wikibooks.org/wiki/Scrabble/Rules#Scoring), using the following [letter values](http://www.wordfind.com/scrabble-letter-values/). 


### Objectives

1. Write some ES6!
    * control structures
    * functions
    * higher order functions
    * Array and string manipulation
2. Learn how to run node programs
3. Learn about node built-ins:
    * `process`
    * `exports`
    * `require`
4. Install and use modules, create your own
5. Run unit tests to check your work
6. Use a static analysis tool (eshint) to help prevent bugs / errors

### Submission Process

The final version of your assignment should be in GitHub.

* __push__ your changes to the homework repository on GitHub
* all repositories will be cloned on the due date 
* after the due date, no further commits will be seen by the graders (even if you continue to commit your work)


## Preparation


Ensure that node and npm are installed (this should have been done for _homework #0_). You should be able to open up your terminal or DOS Shell and run `node -v` and `npm -v`. Both commands should output a version number (probably something like `10.10.0` for `node` and `5.7.1` for `npm`).

1. use git / clone the repository
2. install development modules
    * mocha and chai for running the supplied unit tests
    * eshint for cleaning up your JavaScript / spotting common sources of bugs and errors in your code
3. install modules required by your game

###  Use Git / Clone the repository

Make sure you have git / a git client!

* [commandline git](https://git-scm.com/book/en/v1/Getting-Started-Installing-Git)
* [SourceTree](https://www.sourcetreeapp.com/)
* [GitKraken](https://www.gitkraken.com/) 

Assuming that you've already:

* submitted your github username via the form/survey
* accepted the invitation that adds you to the github organization for this course

You can then go through the following steps to clone your repository and commit your first changes:

1. ...go to the [class github page]({{site.vars.github_org}})
2. find the repository that starts with your github username and ends with homework01 (for example, mygithubusername-homework01) 
3. on the repository's page, use the green "Clone or download" button on the right side of the screen to copy the HTTPS clone URL to __clone__ the homework. To use the commandline client (with GITHUB_REPOSITORY_URL being the url you copied from the green button):
    <pre><code data-trim contenteditable> git clone GITHUB_REPOSITORY_URL
</code></pre>
4. create a file called <code>.gitignore</code> in the same directory
5. add the following line to the file so that git ignores any locally installed node modules: <code> node_modules </code>
6. in the same project directory, create a file called README.md, and edit it so that it includes:
	* your github username
	* the title of your project: Homework #01 - Tic Tac Toe
7. again, in the same project directory, run <code>git add README.md</code> to let git know that we're ready to "save"
8. save your work locally by running <code>git commit -m "add homework meta information"</code>... everything within the quotes after <code>-m</code> is any commit message you'd like
	* please make your commit messages descriptive
	* (what features have been added, what bug has been fixed, etc.)
0. finally, send your work to github by running <code>git push</code> (or <code>git push origin master</code>)


###  Install Development Modules

You'll have to install a couple of node modules to help you run tests and use static analysis tools on your code. These tools won't be required for your program to run, but they will be useful while you're writing your programs. 

You'll be installing the following modules globally:

* `mocha` - for running unit tests

You'll also install the following modules locally in your project directory:

* `chai` - supplies assertions for unit tests
* `eslint` - for catching potential errors in your code
* `eslint-plugin-mocha` - to support linting test code

Go into the directory of your cloned repository (`cd username-homework01`), and run the following commands:

<pre><code data-trim contenteditable>npm install -g mocha
npm install --save-dev eslint
npm install --save-dev chai
npm install --save-dev eslint-plugin-mocha
</code></pre>

Note that the last command installs a module _locally_ to your project directory:

* It will create a `package-lock.json` file that stores exact versions
* It will make a modification to an existing file, `package.json`, within your project folder
* It will create a `node_modules` folder where your downloaded modules are stored (this folder is included in your `.gitignore` file because these external libraries are not meant to be in your project's version control

__Troubleshooting errors__

* On some systems (for example, Ubuntu 18.04), you may have to use `sudo` to run `npm` as the super user
* If any part of your code complains about a missing package, try installing it with `npm` either locally or globally (do your best to keep everything local at first, of course)


### Install Required Modules

You'll also need a module to help you ask the user for input.

* in your repository directory, install the node module, <code>readline-sync</code>, by running this command in your project's directory:
    <pre><code> npm install --save readline-sync
</code></pre>
* note that the <code>readline-sync</code> module allows you to prompt for user input __synchronously__
	* this is very different from how node.js apps usually operate
	* however, for our purposes, using sync prompt is fine (for now), and it mimics the browser's prompt functionality well
* check out the example usage on [readline-sync's npm page](https://www.npmjs.com/package/readline-sync)
    * essentially: `const readlineSync = require('readline-sync');`
    * which imports the function <code>question</code> from the <code>readline-sync</code> module into your program
* note that installing `readline-sync` will make a modification to `package.json` as well. This modification to `package.json` should be committed and pushed as well!

###  Minimum Number of Commits

As you write your code, make sure that you make at least four commits total (more commits are better; if you can, try to commit per feature added). 

* the commits should be meaningful (that is, do not just add a newline, commit and push to make up the requirements for commits).
* make sure your commit messages describe the changes in the commit; for example:
	* `add config file reader and set board based on config file`
	* `fix bug that prevented vertical lines of tiles from being flipped`

<pre><code data-trim contenteditable>git add --all
git commit -m 'your commit message'
</code></pre>
* push your code frequently
<pre><code data-trim contenteditable>git push
</code></pre>

### Running Your Programs

To run your programs, use the commandline (Terminal.app, DOS, etc.):

<pre><code data-trim contenteditable># in your project directory
# change directory to src folder
cd src
node myfile.js

# or, without changing directory
node src/myfile.js
</code></pre>

## Part 1 - Tic Tac Toe Functions and Running Unit Tests

### Background 

For your implementation of Tic Tac Toe, you'll break down the game into several functions. These helper functions will be written in a _module_ (a file separate from the file that actually runs your game), which you'll use in part 3: `src/tic-tac-toe.js`

The helper functions you'll be implementing are described below. Unit tests have been included in your repository in the file, `test/tic-tac-toe-test.js`. 

### Creating a Module / Exporting Functions 

You'll be creating a module that contains a bunch of helper functions. The file that you'll be writing your module in is already included in your repository in `src/tic-tac-toe.js`. Both your _actual_ interactive Tic Tac Toe game (in Part 2) and the supplied unit tests will use this module. Note that we are __not using ES6 modules__ (it only available in the latest version of node, it is not enabled by default, and node docs still use `require` rather than ES6 `import`).

To make the functions you write available when your module is brought into another program (that is, required or _imported_), you'll have to _export_ your functions. See [this sitepoint tutorial](https://www.sitepoint.com/understanding-module-exports-exports-node-js/) or this [article](http://openmymind.net/2012/2/3/Node-Require-and-Exports/) to get a primer on modules, `exports` and using `require`. There are a few ways to do export your functions (all of the examples use `module.exports`, but they should work with just `exports` as well):

1. create all of your functions ... then, at the end, assign `module.exports` to an object literal containing all of the functions that you want to export:
	<pre><code data-trim contenteditable>function foo(x, y) {
       // implementation
   } 
    
   function bar(z) { 
       // implementation
   } 

   // define more functions

   module.exports = {
       foo: foo,
       bar: bar,
       // add more property name to function mappings...
   }
</code></pre>
2. create all of your functions in an object and assign that object to `module.exports`:
	<pre><code data-trim contenteditable>const tic = { 
       foo: function(x, y) {
           // implementation
       },
    
       bar: function(z) {
           // implementation
       },
    
       // add more properties and their associated functions
   }
    
   module.exports = tic;
</code></pre>
3. Create functions as properties on `module.exports`
	<pre><code data-trim contenteditable>module.exports.foo = function(x, y) {
       // implementation
   }
    
   module.exports.bar = function(z) {
       // implementation
   },
    
   // add more properties on module.exports
</code></pre>

When you `require` your module, the object you create for `exports` will be given back. In the example below, the module, `some-module.js` is brought in to the current file (the `./` specifies that the file is in the same directory as the current file) and is represented by the variable, `someModule`. The functions can be accessed by using regular dot notation on the `someModule` object:

<pre><code data-trim contenteditable>const someModule = require('./some-module.js');
someModule.someFunction();
</code></pre>

__You should make sure your exports are up to date as you implement your functions__ so that you can run your unit tests as you complete your function implementations.
		
### Unit Tests

You can use the supplied unit tests (in `tests/tic-tac-toe-test.js`) to check that your functions are:

* are named correctly
    * have the required parameters
* return the appropriate value(s) 
* meet the minimum requirements according to the specifications 

The given unit tests use Mocha as a testing framework and Chai for assertions. While you don't have to know how to write these tests, you should read through them (the api is very _human readable_) to get a feel for how your functions are being tested. If you're curious about writing unit tests, check out [this article on codementor](https://www.codementor.io/nodejs/tutorial/unit-testing-nodejs-tdd-mocha-sinon). 

You can __run the included unit tests by using this command__ in your project directory:

`mocha test/tic-tac-toe-test.js`

If you run these tests before starting, you'll get a bunch of reference errors. This is because you have no functions implemented yet. Additionally, you'll have to export the functions you create so that the tests have access to them.

__Please try continually running the unit tests as you develop your program.__ 

### Only Running a Subset of Unit Tests

To clear out the noise of dealing with many failing tests due to unimplemented functions, use `.only()`:

Any time that you see the functions `describe()` or `it()` in `tests/tic-tac-toe-test.js`, you can follow it with `.only()` to limit the tests being run to those contained in the call to `describe` or `it`. For example:
```
# describe('board', function() { });
describe.only(('board', function() { });
# or
# it('generates a board with specified number of rows and columns', function() { });
it.only('generates a board with specified number of rows and columns', function() { });
```

Alternatively, you can simply comment out unused tests until you're ready to implement them.


### Assumptions

The functions make some assumptions about how you'll be representing a Tic Tac Toe board.

1. although some functions allow for arbitrary rows and columns...
    * you can assume that a board will always have at least 1 square, but no more than 26 squares
    * you can also assume that a board's rows and columns will always be equal
2. we can name a cell / square based on its row number and column number 
    * rows start from the top with row number 0
    * cols start from the left with column number 0
    * the diagram below shows a board with row and column labels
        <pre><code data-trim contenteditable>          columns
               0   1   2
             +---+---+---+
  r  0 | 0 | 1 | 2 |
  o    +---+---+---+
  w  1 | 3 | 4 | 5 |
  s    +---+---+---+
           2 | 6 | 7 | 8 |
             +---+---+---+
</code></pre>
    * in this example, the middle cell (containing 4) is at row 1, column 1
    * the cell containing 2 (the last column of the first row) is at row 0, column 2
3. Alternatively, we can reference a cell using a format borrowed from [chess algebraic notation](https://en.wikipedia.org/wiki/Algebraic_notation_(chess))
    * the rows are uppercase letters starting with A from the top
    * ... while the columns are numbers __starting at 1 from the left__
	* (__this is an abomination of chess notation, where letters and rows are represented by numbers and letters respectively (sry!)__)
    * using this notation, the board with labels would like like this:
        <pre><code data-trim contenteditable>          columns
               1   2   3
             +---+---+---+
  r  A | 0 | 1 | 2 |
  o    +---+---+---+
  w  B | 3 | 4 | 5 |
  s    +---+---+---+
           C | 6 | 7 | 8 |
             +---+---+---+
</code></pre>
    * the middle cell (containing 4) is at B2
    * the cell containing 2 (the last column of the first row) is at A3
4. Although a 2-dimensional Array is a natural fit for representing a Tic Tac Toe board, __your implementation of Tic Tac Toe will use a one dimensional `Array` to represent the board__
    * in this representation, imagine all of the rows of the board placed adjacent to each other 
        <pre><code data-trim contenteditable>           +-----+-----+-----+-----+-----+-----+-----+-----+-----+
row, col   | 0,0 | 0,1 | 0,2 | 1,0 | 1,1 | 1,2 | 2,0 | 2,1 | 2,2 |
                 +-----+-----+-----+-----+-----+-----+-----+-----+-----+
algebraic  | A1  | A2  | A3  | B1  | B2  | B3  | C1  | C2  | C3  |
                 +-----+-----+-----+-----+-----+-----+-----+-----+-----+
index      |  0  |  1  |  2  |  3  |  4  |  5  |  6  |  7  |  8  |
                 +-----+-----+-----+-----+-----+-----+-----+-----+-----+
</code></pre>
    * the upper left corner would be at index 0 (or row 0, column 0)
    * the upper left corner would be at index 2 (or row 0, column 2)
    * the center square would be at index 4 (or row 1, column 1)
5. The empty string, `""`, will be used to mark an empty square
6. You can assume that all of the code examples below use `tic` as the name of the imported module of your Tic Tac Toe functions


<br>

### Functions to Implement


### `board(rows, columns, initialCellValue) // modify parameters to allow for default values` 

__Parameters:__

* `rows` - the number of rows in the board
* `columns` - the number of columns in the board
* `initialCellValue` (optional) - the initial value contained in each square
    * default value should be empty string (`""`)

__Returns:__

* a single dimensional `Array` containing the number of elements that would be in a rows x columns board... with each cell containing the initial value, `initialCellValue`

__Description:__

Creates a single dimensional `Array` representation of a Tic Tac Toe board. The number of elements in the `Array` is the same as the number of squares in the board based on the supplied number of `rows` and `columns`. The initial value in each cell is the `initialCellValue` passed in. If `initialCellValue` is not passed in, default to  (`""`).

A `for` loop and generous use of `push` works here, but an alternative would be to use an [`Array` constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#Syntax) (not typical, but worth doing in this case) with the [`fill` method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)



__Example:__

    // creates a board with 9 squares (default value not specified)
    const board = tic.board(3, 3);
    // board = ["", "", "", "", "", "", "", "", "", ];
    // (each empty cell is an empty string)

    // creates a board with 9 squares, with "-" as initial value
    const board = tic.board(3, 3, "-");
    // board = ["-", "-", "-", "-", "-", "-", "-", "-", "-", ];
<hr>

### `toIndex(board, row, col)` 

__Parameters:__

* `board` - the board where the `row` and `col` come from
* `row` - the row number to be converted to an index in a one dimensional a`Array` representation
* `col` - the column number to be converted to an index in a one dimensional a`Array` representation

__Returns:__

* a `Number`, the index that's mapped to by the given `row` and `col`

__Description:__

A cell in a Tic Tac Toe board can be specified by a row number and a column number. However, our board implementation uses a one dimensional `Array`, so a cell must be specified by a single index. This function translates a row and a column into an index in the one dimensional `Array` representation of a Tic Tac Toe board. 

Hint: [Math.sqrt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sqrt) can be used to help determine the original width and height of the board even though `board` comes in as a one dimensional `Array`.

__Example:__

    // translates a row and col to a single index
    const board = tic.board(3, 3, "");
    const i = tic.toIndex(board, 1, 1);
    const j = tic.toIndex(board, 0, 2);
    // i is 4 (column 1, row 1 is the same as the element at index 4)
    // j is 2

<hr>

### `toRowCol(board, i)`

__Parameters:__

* `board` - the board where the `rowNumber` and `columnNumber` come from
* `i` - the index to be converted into a row and column 

__Returns:__

* an object containing two properties, `row` and `col`, representing the row and column numbers that the `index` maps to

__Description:__

Translates a single index in a one dimensional `Array` representation of a board to that cell's row and column. The `board` supplied can be used to determine the max column and row numbers. __You can assume that the board is always square__. Row and column numbers start at 0.

Hint: Again, [Math.sqrt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sqrt) can be used to determine the original width and height of the board. If you need integer division or if you need to always round down, you can just call [Math.floor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor) after dividing (which will give you the largest integer less than or equal to a given number).

__Example:__

    // translates an index into a row and column...
    const board = tic.board(3, 3, "");
    const rowCol1 = tic.toRowCol(board, 4);
    const rowCol2 = tic.toRowCol(board, 2);
    // rowCol1 is: {"row": 1, "col": 1};
    // rowCol2 is {"row": 0, "col": 2};

<hr>

### `setBoardCell(board, letter, row, col)`

__Parameters:__

* `board` - the board where a cell will be set to `letter`
* `letter` - the string to set the cell to
* `row` - the row number of the cell to be set
* `col` - the column number of the cell to be set

__Returns:__

* a single dimensional `Array` representing the board where the cell at `row` and `col` is set to the value of `letter`

__Description:__

Sets the value of the cell at the specified row and column numbers on the board, `board`, to the value, `letter`.

Instead of modifying the `board` argument passed in, create a shallow copy of the `board`, mutate it (place the letter), and return the copy. To shallow copy an `Array`, use the [slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) method.

__Example:__

    // sets two squares, one X and one O
    const board = tic.board(3, 3, "");
    const b1 = tic.setBoardCell(board, "X", 1, 1);
    const b2 = tic.setBoardCell(b1, "O", 0, 2);
    // b1 is [" ", " ", " ", " ", "X", " ", " ", " ", " "];
    // b2 is [" ", " ", "O", " ", "X", " ", " ", " ", " "];

<hr> 

### `algebraicToRowCol(algebraicNotation)`

__Parameters:__

* `algebraicNotation` - a `String` that specifies the position of a cell using algebraic notation 

__Returns:__

* an object containing two properties, `row` and `col`, representing the row and column numbers that the `algebraicNotation` maps to (for example, `{"row": 1, "col": 1}`)

* `undefined` if the algebraic notation passed in is not valid.

__Description:__

Translates algebraic notation specifying a cell into a row and column specifying the same cell. If the notation passed in is not valid, then return `undefined`. 

The algebraic notation format we'll use will be a single string with the row letter first, immediately followed by the column number (with nothing separating the row and column). The __column number starts at index 1!__ (which is different from row and column notation above where numbers start at 0). You can __assume that there are no more than 26 rows and columns__. Some examples of valid formats: `A1` and `C20`. Some invalid formats include: `1A`, `1`, `A`, `A:1`, `***`.

Hint: There are many ways you can implement this. If you want to loop through every character, you can use a simple for loop, the string's [length](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length), and the string's [charAt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt) method. Note that there's no actual character type, you just get a `String` composed of a single character. 

Alternatively, you can create an `Array` containing every character of the original `String` by using [split](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split) with an empty string as an argument.

Once you can look at each individual character (or group of characters), you can examine each character by using [isNaN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN) to determine if a `String` is not numeric.

Finally if you feel like wrangling regular expressions, you can try using the [match](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match) method.

__Example:__

    // valid 
    tic.algebraicToRowCol("B2") // {"row": 1, "col": 1}
    tic.algebraicToRowCol("A3") // {"row": 0, "col": 2}

    // not valid
    tic.algebraicToRowCol("A")) // undefined
    tic.algebraicToRowCol("2")) // undefined
    tic.algebraicToRowCol("2A")) // undefined
    tic.algebraicToRowCol(" ")) // undefined
    tic.algebraicToRowCol("A 2")) // undefined
    tic.algebraicToRowCol("A:2")) // undefined
    tic.algebraicToRowCol("**")) // undefined

<hr> 

### `placeLetters(board, letter, algebraicNotation) // see specifications for addtional arguments`

__Parameters:__

* `board` - the board where a cell will be set to `letter`
* `letter` - the string to set the cell to
* `algebraicNotation` - a `String` that specifies the position of a cell using algebraic notation 
	* followed by any number of `letter` and `string` pairs

__Returns:__

* a single dimensional `Array` representing the board where the cell at `row` and `col` is set to the value of `letter`

__Description:__

Places the every a letter at every algebraic notation for every pair of arguments specifying letter and algebraic notation. Letters and position combinations are placed in the order that they appear in the arguments. It does not have to be "smart" about detecting whether or not a value is a letter vs algebraic notation; using position to determine letter versus position is adequate. In general, this function can be naive in its implementation, and it should do its best to skip erroneous arguments without raising exceptions (failing silently is not usually good practice, but it's appropriate for our toy implementation of this game):

* If the algebraic notation is invalid, skip the move. 
* If there are an uneven number of arguments after `board`, assume that every odd is the letter and every even is the algebraic notation, and skip the last argument 
* If a letter already exists in the position specified after the letter, do not overwrite the existing letter... and skip the new move instead

Use the `setBoardCell` function you created above to implement this. Use the [rest operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters) to implement an arbitrary number of arguments.

__Example:__

    // X and O are placed on the board
    let board = tic.board(3, 3, "");
    board = tic.placeLetters(board, 'X', "B2");
    board = tic.placeLetters(board, 'O', "A3");
    // board is [" ", " ", "O", " ", "X", " ", " ", " ", " "]


    // X and O are placed on the board in a single call
    let board = tic.board(3, 3, "");
	board = tic.placeLetters(board, 'X', 'B2', 'O', 'A3');
	// board is ["", "", "O", "", "X", "", "", "", ""]
   
    // Invalid moves, uneven moves, and existing letter in position
	// should result in skipping the current move
    let board = tic.board(3, 3, "");
    board = tic.placeLetters(board, 'X', 'Z7', 'O', 'B2', 'X', 'B2', 'O');
    // board is ["", "", "", "", "O", "", "", "", ""]
	// (O is not overwritten, and invalid rows/cols are skipped)

<hr>

### `boardToString(board)`

__Parameters:__

* `board` - the board to be converted to a `String`

__Returns:__

* a `String` representation of the board 

__Description:__

Creates a _text drawing_ representation of the Tic Tac Toe `board` passed in. The board should have:

* borders between cells
* the contents of each cell 
* labels on the rows and columns

Printing out an example result would yield:

<pre><code data-trim contenteditable>
     1   2   3
   +---+---+---+
 A | X |   |   |
   +---+---+---+
 B |   | O |   |
   +---+---+---+
 C |   |   |   |
   +---+---+---+
</code></pre>

It should work for boards of any size! Here's an example of a 7 x 7 board!

<pre><code data-trim contenteditable>
     1   2   3   4   5   6   7
   +---+---+---+---+---+---+---+
 A | X |   |   |   |   |   |   |
   +---+---+---+---+---+---+---+
 B |   |   |   |   |   |   |   |
   +---+---+---+---+---+---+---+
 C |   |   |   |   |   |   |   |
   +---+---+---+---+---+---+---+
 D |   |   | O |   |   |   |   |
   +---+---+---+---+---+---+---+
 E |   |   |   |   |   |   |   |
   +---+---+---+---+---+---+---+
 F |   |   |   |   |   |   |   |
   +---+---+---+---+---+---+---+
 G |   |   |   |   |   |   |   |
   +---+---+---+---+---+---+---+
</code></pre>

If the "letter" is empty (an empty string), use a space character to space out the cell. If the "letter" is more than one character, truncate it to fit in the space.

This one is actually quite challenging (and tedious) to get exactly right, so there won't be any penalties for minor spacing inconsistencies... and if there are other issues (for example, not adding labels), there will only be small point penalties.

Again, you can __assume that the numbers of rows and columns will not be greater than 26__.

Hint: One way of dealing with the row label is to use [String.fromCodePoint](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint), which gives you the unicode code point of the character supplied.

__Example:__

    // a string representation of a board with two moves
    let board = tic.board(3, 3, "");
    board = tic.placeLetters(board, 'X', "B2");
    board = tic.placeLetters(board, 'O', "A3");
    // board will be equal to the following string:
    // "     1   2   3  \n   +---+---+---+\n A |   |   | O |\n   +---+---+---+\n B |   | X |   |\n   +---+---+---+\n C |   |   |   |\n   +---+---+---+\n"

<hr>

### `getWinnerRows(board)`

__Parameters:__

* `board` - the board to examine for a winner

__Returns:__

* the letter of the winning player or `undefined` if there is no winner yet (based on rows)

__Description:__

Examines the `board` passed in to see if any row is completely filled by a single letter (and consequently is "won" by that player). You can assume that there is exactly one winner or neither player has won (you do not have to deal with the case where both letters fill different rows).

Hint: There are many possible implementations. One space inefficient way is to extract each row into its own `Array` and check if all of the `Array` elements are the same (or if you want to get fancy / sophisticated, you can use an Array's [every](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every) method). Alternatively, you can check the value of the first element in a row and make sure any subsequent elements don't deviate from that first element.

Additionally... your previous implementation of `toIndex` may be helpful here if you end up using nested loops to iterate through rows and columns.

__Example:__

    // row B is filled with X, X wins
    let board = tic.board(3, 3, "");
    board = tic.placeLetters(board, 'X', "B1");
    board = tic.placeLetters(board, 'X', "B2");
    board = tic.placeLetters(board, 'X', "B3");
    console.log(tic.getWinnerRows(board)); // --> 'X'

    // row B is partially filled, no winner
    let board = tic.board(3, 3, "");
    board = tic.placeLetters(board, 'X', "B1");
    board = tic.placeLetters(board, 'X', "B2");
    console.log(tic.getWinnerRows(board)); // --> undefined

    // row B is partially filled, no winner
    let board = tic.board(3, 3, "");
    board = tic.placeLetters(board, 'X', "B2");
    board = tic.placeLetters(board, 'X', "B3");
    console.log(tic.getWinnerRows(board)); // --> undefined

<hr>

### `getWinnerCols(board)`

__Parameters:__

* `board` - the board to examine for a winner

__Returns:__

* the letter of the winning player or `undefined` if there is no winner yet (based on columns)

__Description:__

Examines the `board` passed in to see if any column is completely filled by a single letter (and consequently is "won" by that player). You can assume that there is exactly one winner or neither player has won (you do not have to deal with the case where both letters fill different rows).

See the hints for `getWinnerRows`.

__Example:__

    // Column 2 is filled with X, X wins
    let board = tic.board(3, 3, "");
    board = tic.placeLetters(board, 'X', "A2");
    board = tic.placeLetters(board, 'X', "B2");
    board = tic.placeLetters(board, 'X', "C2");
    console.log(tic.getWinnerCols(board)); // --> 'X'

    // Column 2 is partially filled, no winner
    let board = tic.board(3, 3, "");
    board = tic.placeLetters(board, 'X', "A2");
    board = tic.placeLetters(board, 'X', "B2");
    console.log(tic.getWinnerCols(board)); // --> undefined

    // Column 2 is partially filled, no winner
    let board = tic.board(3, 3, "");
    board = tic.placeLetters(board, 'X', "B2");
    board = tic.placeLetters(board, 'X', "C2");
    console.log(tic.getWinnerCols(board)); // --> undefined

<hr>

### `getWinnerDiagonals(board)`

__Parameters:__

* `board` - the board to examine for a winner

__Returns:__

* the letter of the winning player or `undefined` if there is no winner yet (based on diagonals)

__Description:__

Examines the `board` passed in to see if either diagonal (major or minor .... or upper left to lower right and upper right to lower left)  is completely filled by a single letter (and consequently is "won" by that player). You can assume that there is exactly one winner or neither player has won (you do not have to deal with the case where both letters fill different rows).

See the hints for `getWinnerRows`.

__Example:__

    // a diagonal is filled with X, X wins
    let board = tic.board(3, 3, "");
    board = tic.placeLetters(board, 'X', "A1");
    board = tic.placeLetters(board, 'X', "B2");
    board = tic.placeLetters(board, 'X', "C3");
    console.log(tic.getWinnerDiagonals(board)); // --> 'X'

    // a diagonal is filled with X, X wins
    let board = tic.board(3, 3, "");
    board = tic.placeLetters(board, 'X', "A3");
    board = tic.placeLetters(board, 'X', "B2");
    board = tic.placeLetters(board, 'X', "C1");
    console.log(tic.getWinnerDiagonals(board)); // --> 'X'

    // a diagonal is partially filled with X, no winner
    let board = tic.board(3, 3, "");
    board = tic.placeLetters(board, 'X', "A3");
    board = tic.placeLetters(board, 'O', "B2");
    board = tic.placeLetters(board, 'X', "C1");
    console.log(tic.getWinnerDiagonals(board)); // --> undefined


<hr>

### `isBoardFull(board)`

__Parameters:__

* `board` - the board to examine

__Returns:__

* `true` if there are no empty cells left in the board, `false` otherwise

__Description:__

Examines the `board` passed in to determine whether or not it's full. It returns `true` if there are no empty squares, `false` if there are still squares available. __Assume that the board uses the empty string , `""`, to mark a square as empty__.

Hint: The solution to this is pretty straightforward with a simple for loop, but if you want to ditch the for loop entirely, you can get fancy and use the `Array` method, [some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some).

__Example:__

    // board is empty
    const board = tic.board(3, 3, "");
    console.log(tic.isBoardFull(board)); // --> false

    // board is completely full
    let board = tic.board(3, 3, "");
    board = tic.placeLetters(board, 'X', "A1");
    board = tic.placeLetters(board, 'X', "A2");
    board = tic.placeLetters(board, 'X', "A3");
    board = tic.placeLetters(board, 'X', "B1");
    board = tic.placeLetters(board, 'X', "B2");
    board = tic.placeLetters(board, 'X', "B3");
    board = tic.placeLetters(board, 'X', "C1");
    board = tic.placeLetters(board, 'X', "C2");
    board = tic.placeLetters(board, 'X', "C3");
    console.log(tic.isBoardFull(board)); // --> true

    // board has one square empty...
    board = tic.placeLetters(board, 'X', "A2");
    board = tic.placeLetters(board, 'X', "A3");
    board = tic.placeLetters(board, 'X', "B1");
    board = tic.placeLetters(board, 'X', "B2");
    board = tic.placeLetters(board, 'X', "B3");
    board = tic.placeLetters(board, 'X', "C1");
    board = tic.placeLetters(board, 'X', "C2");
    board = tic.placeLetters(board, 'X', "C3");
    console.log(tic.isBoardFull(board)); // --> false

<hr>

### `isValidMove(board, row, col)`

__Parameters:__

* `board` - the board the move is performed on
* `row` - the row number of the move
* `col` - the column number of the move

__Returns:__

* `true` if the move is valid, `false` otherwise

__Description:__

Using the `board` passed in, determines whether or not a move to `row` and `col` is valid. A valid move:

* targets an empty square
* is within the boundaries of the board

Use a previous function that you created, `toIndex` in the implementation of this function. Again, you can __assume that the empty string, `""`, represents empty__.

__Example:__

	// a valid move
    const board = tic.board(3, 3, "");
    console.log(tic.isValidMove(board, 1, 1)); // --> true

	// move is out of bounds, not valid
    const board = tic.board(3, 3, "");
    console.log(tic.isValidMove(board, 3, 3)); // --> false

	// move into square that's already occupied, not valid
    let board = tic.board(3, 3, "");
    board = tic.placeLetters(board, 'O', "B2");
    console.log(tic.isValidMove(board, 1, 1)); // --> false

<hr>

### `isValidMoveAlgebraicNotation(board, algebraicNotation)`

__Parameters:__

* `board` - the board the move is performed on
* `algebraicNotation` - algebraic notation representing a move on the `board`

__Returns:__

* `true` if the move is valid, `false` otherwise

__Description:__

Using the `board` passed in, determines whether or not a move to `algebraicNotation` is valid. Use the functions your previously created, `isValidMove` and `algebraicToRowCol` to implement this function.

__Example:__

    const board = tic.board(3, 3, "");
    // a valid move
    console.log(tic.isValidMoveAlgebraicNotation(board, 'B2')) // --> true
    // row is out of bounds
    console.log(tic.isValidMoveAlgebraicNotation(board, 'D2')) // --> false

    // target square is not empty, not a valid move
    let board = tic.board(3, 3, "");
    board = tic.placeLetters(board, 'X', "A3");
    console.log(tic.isValidMoveAlgebraicNotation(board, 'A3')) // --> false

<hr>

### `getRandomEmptyCellIndex(board)`

__Parameters:__

* `board` - the board to get an empty cell from

__Returns:__

* index of an empty square on the board, `undefined` if the board is full

__Description:__

Finds the index of an empty square on the board. If there are many empty squares, return the index of a randomly selected empty square.

__Example:__

    // there's only one empty cell... the middle square (index 4)
    let board = tic.board(3, 3, "");
    board = tic.placeLetters(board, 'X', "A1");
    board = tic.placeLetters(board, 'X', "A2");
    board = tic.placeLetters(board, 'X', "A3");
    board = tic.placeLetters(board, 'X', "B1");
    board = tic.placeLetters(board, 'X', "B3");
    board = tic.placeLetters(board, 'X', "C1");
    board = tic.placeLetters(board, 'X', "C2");
    board = tic.placeLetters(board, 'X', "C3");
    const i = tic.getRandomEmptyCellIndex(board);
    // i is 4

    // the entire second row is empty (index 3, 4, or 5)
    let board = tic.board(3, 3, "");
    board = tic.placeLetters(board, 'X', "A1");
    board = tic.placeLetters(board, 'X', "A2");
    board = tic.placeLetters(board, 'X', "A3");
    board = tic.placeLetters(board, 'X', "C1");
    board = tic.placeLetters(board, 'X', "C2");
    board = tic.placeLetters(board, 'X', "C3");
    const i = tic.getRandomEmptyCellIndex(board);
    // i is 3, 4, or 5

    let board = tic.board(3, 3, "");
    board = tic.placeLetters(board, 'X', "A1");
    board = tic.placeLetters(board, 'X', "A2");
    board = tic.placeLetters(board, 'X', "A3");
    board = tic.placeLetters(board, 'X', "B1");
    board = tic.placeLetters(board, 'X', "B2");
    board = tic.placeLetters(board, 'X', "B3");
    board = tic.placeLetters(board, 'X', "C1");
    board = tic.placeLetters(board, 'X', "C2");
    board = tic.placeLetters(board, 'X', "C3");
    const i = tic.getRandomEmptyCellIndex(board);
    // i is undefined

### Checking Your Code, Pushing Your Changes

1. JavaScript (ES5) is kind of crazy (read: has some really _bad_, but valid parts), so it's useful to use a static analysis tool, like `eshint` to check your code
    * ideally, you'd be doing this periodically while you develop
    * the commandline usage is described here, but there are eshint integrations for some editors (see the plugins section in the [eshint installation guide](https://eslint.org/docs/user-guide/integrations))
    * from your project directory run: `eshint src/*` to check all of the code in the `src` directory
    * (you _did install_ `eshint` globally in the preparation section, right?)
    * check the output; __make sure you fix all warnings / errors__
2. Run your tests one last time to make sure that they're all (or... _mostly_) passing.
    * `mocha test.tic-tac-toe-test.js`
3. Fix unit test errors 
    * if you have test failure, examine the output of each failure...
    * it'll describe what was expected vs what was actually given back by your function... 
    * in the example below, +/green shows expected, while -/red shows the incorrect output
        <br>
        ![observed / expected](../resources/img/hw01-tests-01.png)
    * in the following example, the diff of expected and observed shows a very subtle difference in spacing!
        <br>
        ![spaces!](../resources/img/hw01-tests-02.png)
    * if you get `TypeError ... is not a function`
        <br>
        ![reference error](../resources/img/hw01-tests-03.png)
        <br>
        ...you may have:
        * not implemented the function (!)
        * named the function differently than what was specified in the instructions
        * did not export the function from your module
5. finally make sure your changes are saved and pushed 
    * __use git to add and commit__ to continually save changes
    * push your changes so that they're available on the remote repository (github)


## Part 2 - Tic Tac Toe Game

Whew. That was a lot of work. But, ummmm... there's no Tic Tac Toe game yet. What?
__Let's use the module / helper functions you created in part 1 to implement an interactive Tic Tac Toe game that supports the following features:__

1. User controlled game settings
2. An interactive game
3. Scripted moves for both players

You don't have to use _all_ of the function you created in your `tic-tac-toe.js` module (and you definitely won't need to use all of the features of each function). However, you'll likely end up doing a lot of redundant work. Of course, you are encouraged to create your own additional functions as well!

## You MUST IMPLEMENT #3, Scripted Moves

* in order for this game to be tested properly, scripted moves must be implemented for both the computer and the human player
* consequently, this feature will be worth a  __significant__ number of points
* make sure you implemented it (see the section below, "Scripted Moves")

### Prep

You'll write your Tic Tac Toe game in the file called `src/game.js`. Your first step is to bring in some required modules. Open up `src/game.js` and...

1. bring in the module you created by using `require`
    <pre><code data-trim contenteditable>// you can name the object whatever you like
// "tic" is used below...
const tic = require('./tic-tac-toe.js');
</code></pre>
2. bring in the module, `readline-sync`, which you installed in the preparation portion of the homework
    <pre><code data-trim contenteditable>const readlineSync = require('readline-sync');
</code></pre>

### User Controlled Game Settings

Start the game by prompting the user to set up some game options. Use `readline-sync` to ask the user for input synchronously (again, very different from how node usually works, but more in line with how we're accustomed to seeing how programs flow). Check out the [documentation on `readline-sync` on npm](https://www.npmjs.com/package/readline-sync).

Here's some example usage:

<pre><code data-trim contenteditable>
const readlineSync = require('readline-sync');
 
const answer = readlineSync.question('What is the meaning of life?');
console.log(answer);
</code></pre>

0. greet the user by saying something like: `Shall we play a game of TIC TAC TOE?`
1. ask the user for the width of the game board
    * the width must be at least 1 square wide
    * the width cannot be more than 26 squares wide
    * if the width does not fall within the above range or if the width entered is not numeric (remember, you can use `isNaN` for this), then ask the user for the width again
    * see the example interaction below (note that the first 3 answers are not valid widths, but the 4th valid answer allows the user to progress to the next question)
        <pre><code data-trim contenteditable>How wide should the board be? (1 - 26)
> -5
How wide should the board be? (1 - 26)
> 28
How wide should the board be? (1 - 26)
> really large
How wide should the board be? (1 - 26)
> 3
Pick your letter: X or O
</code></pre>
2. ask the user what letter they'd like to use ('X' or 'O') 
    * uppercase 'X' and uppercase 'O' are the only valid inputs
    * if the user does not enter a valid letter, continually ask the user for a letter until a valid letter is given
    * see the example interaction below (the first 2 inputs are not valid - the first x is lowercase):
        <pre><code data-trim contenteditable>Pick your letter: X or O
> WHAT?
Pick your letter: X or O
> x
Pick your letter: X or O
> X
Player is X
</code></pre>
3. use the data collected to construct a board (use on of the functions that you created!) and show the letter that the player chose along with the empty board
    <pre><code data-trim contenteditable>Player is X
        1   2   3
      +---+---+---+
 A |   |   |   |
      +---+---+---+
 B |   |   |   |
      +---+---+---+
 C |   |   |   |
      +---+---+---+
</code></pre>

<br>
__An entire _happy path_ (that is, all valid input) interaction would look like this:__

<pre><code data-trim contenteditable>Shall we play a game? TIC-TAC-TOE!

How wide should the board be? (1 - 26)
> 3
Pick your letter: X or O
> X
Player is X
     1   2   3
   +---+---+---+
 A |   |   |   |
   +---+---+---+
 B |   |   |   |
   +---+---+---+
 C |   |   |   |
   +---+---+---+

</code></pre>


### An Interactive Game

Now... for the actual game. The user will be playing against the computer

1. 'X' goes first (so if the user chose 'O', the computer will make the first move)
2. As long as the board isn't full and neither player has won, alternate computer and user turns 
    * for the player's move, ask the player for a move in algebraic notation
    * if the move is not valid (use one of the functions you wrote to determine this!), notify the user and ask for another move
        <pre><code data-trim contenteditable>     1   2   3
         +---+---+---+
 A | X |   |   |
         +---+---+---+
 B |   |   | O |
         +---+---+---+
 C |   |   |   |
         +---+---+---+
What's your move?
> B3
Your move must be in a <row><column> format, and it must specify an existing empty cell!
What's your move?
> ARGH!
Your move must be in a <row><column> format, and it must specify an existing empty cell!
What's your move?
> C2
</code></pre>
    * after a player moves, ask the player to press enter (simply ask for any input again using something like `readlineSync.question('Press <ENTER> to show computer\'s move...');`... without storing the input in a variable
        <pre><code data-trim contenteditable>What's your move?
> C2
     1   2   3
         +---+---+---+
 A | X |   |   |
         +---+---+---+
 B |   |   | O |
         +---+---+---+
 C |   | X |   |
         +---+---+---+
Press <ENTER> to show computer's move...
</code></pre>
    * for the computer's move, you can use any algorithm you want to generate a valid move
    * the easiest way is to get a random empty cell (hey, conveniently, you have a function for this in your module!)
3. If there's a winner, display who won... for example `Computer won!` or `Player won!`
4. If the board is full, announce that it's a draw: `It's a draw!`

<br>
__Here's an example game:__

<div markdown="block" class="img" id="hw01-tic-tac-toe-sample">
![example game](../resources/img/hw01-example-game.gif)
</div>

<br>
__And the text-only version of the game above:__

<pre><code data-trim contenteditable>Shall we play a game? TIC-TAC-TOE!

How wide should the board be? (1 - 26)
> 3
Pick your letter: X or O
> O
Player is O
     1   2   3
   +---+---+---+
 A |   |   |   |
   +---+---+---+
 B |   |   |   |
   +---+---+---+
 C |   |   |   |
   +---+---+---+

Press &lt;ENTER&gt; to show computer's move...
     1   2   3
   +---+---+---+
 A | X |   |   |
   +---+---+---+
 B |   |   |   |
   +---+---+---+
 C |   |   |   |
   +---+---+---+

What's your move?
> B2
     1   2   3
   +---+---+---+
 A | X |   |   |
   +---+---+---+
 B |   | O |   |
   +---+---+---+
 C |   |   |   |
   +---+---+---+

Press &lt;ENTER&gt; to show computer's move...
     1   2   3
   +---+---+---+
 A | X | X |   |
   +---+---+---+
 B |   | O |   |
   +---+---+---+
 C |   |   |   |
   +---+---+---+

What's your move?
> C3
     1   2   3
   +---+---+---+
 A | X | X |   |
   +---+---+---+
 B |   | O |   |
   +---+---+---+
 C |   |   | O |
   +---+---+---+

Press &lt;ENTER&gt; to show computer's move...
     1   2   3
   +---+---+---+
 A | X | X | X |
   +---+---+---+
 B |   | O |   |
   +---+---+---+
 C |   |   | O |
   +---+---+---+

Computer won!!!
</code></pre>

<br>
__Remember, the game should work with variable widths... here's the beginning of a game on a 5 x 5 board:__

<pre><code data-trim contenteditable>
Shall we play a game? TIC-TAC-TOE!

How wide should the board be? (1 - 26)
> 5
Pick your letter: X or O
> X
Player is X
     1   2   3   4   5
   +---+---+---+---+---+
 A |   |   |   |   |   |
   +---+---+---+---+---+
 B |   |   |   |   |   |
   +---+---+---+---+---+
 C |   |   |   |   |   |
   +---+---+---+---+---+
 D |   |   |   |   |   |
   +---+---+---+---+---+
 E |   |   |   |   |   |
   +---+---+---+---+---+

What's your move?
> E4
     1   2   3   4   5
   +---+---+---+---+---+
 A |   |   |   |   |   |
   +---+---+---+---+---+
 B |   |   |   |   |   |
   +---+---+---+---+---+
 C |   |   |   |   |   |
   +---+---+---+---+---+
 D |   |   |   |   |   |
   +---+---+---+---+---+
 E |   |   |   | X |   |
   +---+---+---+---+---+

Press &lt;ENTER&gt; to show computer's move...
     1   2   3   4   5
   +---+---+---+---+---+
 A | O |   |   |   |   |
   +---+---+---+---+---+
 B |   |   |   |   |   |
   +---+---+---+---+---+
 C |   |   |   |   |   |
   +---+---+---+---+---+
 D |   |   |   |   |   |
   +---+---+---+---+---+
 E |   |   |   | X |   |
   +---+---+---+---+---+

What's your move?
>
</code></pre>

### Scripted Moves 

Testing your game against a computer player that makes random moves can be pretty annoying because you can't reliably repeat tests!

To deal with this, add a feature to your game that allows you to pass in the computer's moves (and, if present, the player's moves) once you start your game. That is, when you run your game on the commandline, you can add an extra option to control the computer and player moves.

To pick up commandline arguments, use the built-in variable `process.argv`. `process.argv` is an array that contains parts of the command used to run your program. For example, if you run your program with `node my-program.js`, `process.argv[0]` will be `node` and `process.argv[1]` will be `my-prgoram.js`.

We can use this feature to supply an `Array` of moves. The entire `Array` consists of two inner `Arrays` - one for the computer and one for the player. The player and computer `Array`s contain moves, which themselves are 2-element `Array`s. So... if we want the computer and player to move according to s commandline argument that we pass in, we can start the program by running:

<pre><code data-trim contenteditable>node game.js "[[[0,0],[0,1],[0,2]], [[1,0],[1,1]]]"
// the computer's first three moves are the first 3 columns of the first row, and the player's moves are 
// the first 2 columns of the 2nd row
</code></pre>

To capture the commandline argument, you can use this line:

<pre><code data-trim contenteditable>const arr = process.argv[2]
</code></pre>

Now... instead of just randomly choosing the computer's move, and instead of prompting the user for a move, you can consume the moves from the Array passed in.

__To implement this feature...__

1. At the beginning of your file, use `process.argv` to access the passed in argument... and use `JSON.parse` to turn it into an actual nested `Array`
    <pre><code data-trim contenteditable>const arr = process.argv[2] ? JSON.parse(process.argv[2]) : undefined;
</code></pre>
	* assign the first element to `computerMoves`
	* assign the first element to `playerMoves``
2. Notify the user that the computer (and possibly the player) is using scripted moves: 
	<pre><code data-trim contenteditable> Computer will make the following moves: [ [ 0, 0 ], [ 0, 1 ], [ 0, 2 ] ]
Player will make the following moves: [ [ 1, 0 ], [ 2, 1 ] ]
</code></pre>
3. When the computer moves
    * check out the 1st element of the `computerMoves` `Array`... 
    * if it's valid use it as the computer's move, otherwise just move randomly
    * remove the 1st element of `computerMoves` (the first scripted move has been consumed)... you can use [splice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) to do this
    * if the `computerMoves` array is empty or undefined, just use a random move
    * check out the example code below:  
<pre><code data-trim contenteditable>// assume that a computerMoves global variable 
// and it is an Array of 2-element Arrays like [[0, 0], [0, 1], ...]
        
// the move the computer will make
let move; 

// do we have an Array of scripted moves and are there moves left?
if(computerMoves && computerMoves.length > 0) {
    const arr = computerMoves.splice(0, 1)[0];
    // make sure it's a valid move!
    if(tic.isValidMove(board, arr[0], arr[1])) {
        move = {'row':arr[0], 'col':arr[1]};
    }
	// if it's not valid, move remains undefined
}

// if we still don't have a valid move, just get a random empty square
if(move === undefined) {
    move = tic.toRowCol(board, tic.getRandomEmptyCellIndex(board));
}

</code></pre>
4. Do the same for player moves
	* instead of prompting the player for user input, just show the move that they are about to make
	* ...and ask the player to press enter
    * (simply ask for any input again using something like `readlineSync.question('Press <ENTER> to confirm player\'s scripted move...');`... without storing the input in a variable)
5. Once the `playerMoves` or `computerMoves` `Array` is exhausted, allow the moves to proceed normally 
	* use _whatever_ mechanism you want to generate a computer move
	* prompt the player for their move as if it were not scripted
6. Again - skip invalid moves (moves that are not on the board or that attempt to move into an already occupied cell), and remove them from their respective scripted moves `Array`

## Part 3 - Scrabble Pal


Create a program that asks the user for a series of letters. It will output the 5 highest scoring words in Scrabble that can be formed from the letters entered (not all of the letters have to be used to form a word). Here's an example interaction:

<pre><code data-trim contenteditable>Please enter some letters:
>axdvree

The top scoring words are:
16 - vexed
15 - vexer
14 - exedra
13 - raxed
13 - vex
</code></pre>

### Preparation

1. Find `enable1.txt` in your `data` folder - this is your word list
2. Find `scrabble.js` in your `src` folder - this is where you'll write your program
3. In `scrabble.js`, require the built-in `readline` and `fs` modules:
    <pre><code data-trim contenteditable>const readline = require('readline');
const fs = require('fs');
</code></pre>	

### Background Material and Callbacks

To write this program, you'll use a word list called `enable1.txt`. Your program will read in this file to determine if the letters entered can construct any of those words.

In your implementation, you'll be using a lot of functions that required callback functions to be passed in as arguments! So it'll be good to read up on functions as objects in the readings and slides.

Instead of using `readline-sync` to ask for user for input, use the built-in `readline` module. The regular `readline` module will allow you to read input from the user.

`readline` does the same thing as `readline-sync`, but it's asynchronous. That is, it's non-blocking, so it may not finish before your next line of code is executed. Try the sample programs below (you'll need a file called test.txt with a few lines in it to try the second example) to get a feel for programming with callbacks. Pay close attention to when `last line of program` is printed out.

Lastly, use `fs.readFile` to read in your word list.

__Input from the user__ 

When `question` is called, a callback function, `handleUserInput` is passed in. This callback function isn't called immediately! Instead, it's called after the program receives input from the user. Consequently, the line printing `last line of program` is called before `'Hi ' + response` could be printed out.

<pre><code data-trim contenteditable>const readline = require('readline');

// set up a readline object that can be used for gathering user input
const userPrompt = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// ask a question
userPrompt.question('What\'s your name?', handleUserInput);

// the callback function that's run when the readline object receives input
function handleUserInput(response) {
    console.log('Hi ' + response);
    userPrompt.close();
}

console.log('last line of program!');
</code></pre>

__Reading from a file__ 

* the [`fs` module has a  readFile function](https://nodejs.org/api/fs.html#fs_fs_readfile_file_options_callback) to do this
* example usage of the `fs` module:
	<pre><code data-trim contenteditable>
fs.readFile('path/to/myFile.txt', 'utf8', function(err, data) {
    if (err) {
        console.log('uh oh', err); 
    } else {
        console.log(data);
    }
});

__Please use a relative path to read the file!__

* that is... read `data/enable1.txt` rather than `/full/path/to/enable1.txt`
* assume that the program will be run from the project's root directory

### Handle Scores

The score for a word is calculated by summing the point values of each letter in the word. You can use the following object to associate letters with point values:

<pre><code data-trim contenteditable>const letterValues = { 
        "E": 1, "A": 1, "I": 1, "O": 1, "N": 1, "R": 1, "T": 1, "L": 1, "S": 1, "U": 1, 
        "D": 2, "G": 2, "B": 3, "C": 3, "M": 3, "P": 3, "F": 4, "H": 4, "V": 4, "W": 4, 
        "Y": 4, "K": 5, "J": 8, "X": 8, "Q": 10, "Z": 10 
};
</code></pre>

You'll likely want to represent each word as an object... with the actual word as one property and the word's score as a second property. You can then sort an `Array` of these "word/score" objects using the [sort method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) on your `Array`.

The `sort` method also requires a callback function... which is used to compare the values in the `Array`. Check out the following example where the `Array`, `numbers` is sorted from highest to lowest:

<pre><code data-trim contenteditable>const numbers = [1, 3, 2, 7, 5, 4, 6];

// sort numbers from highest to lowest
numbers.sort(function(a, b) {
    // if a is less than b, then a should be after b 
    if(a < b) {
        return 1;
    } else if(a > b) {
        return -1;
    } else {
        return 0;
    }
});
console.log(numbers);

// for ascending, swap the 1 and -1 (or really, just omit the callback / compare function)!
</code></pre>

Note that the compare / callback function is an anonymous function that returns a positive, negative or zero value. If a positive value is returned, it means that the first argument passed in is greater, and should occur after the second element in the sorted `Array`.

### Implementation

So... this is a pretty short program, and may seem easy on the surface. However, there are some really tricky parts! You'll have to put together the examples from the background material above along with a novel algorithm for determining all of the valid words that a set of letters can create. You should approach this program incrementally, testing as you go along. Unlike the previous 2 parts, it's up to you to determine how to break up your program into functions.

__A potential algorithm for finding all words that can be formed from a series of letters__

* go through every word in the word list
    * make a copy of the user input
    * go through every letter in the word from the word list
    * if the letter exists in the copy of the user input, remove it from the copy of the user input 
    * if the letter doesn't exist, then you know the word from the word list cannot be formed by the letters in the user input
    * if all of the letters in the word from the word list have been iterated over, then you know the word can be formed by the letters in the user input!
* some methods that may be useful for doing this are:
    * a String's [split](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split) method - to break up a string into an `Array` of characters
    * an Array's [indexOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf) method - to determine if an element exists in an `Array`
    * an Array's [splice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) method - to remove an element or elements from an `Array`

__Dealing with scope and callbacks__

Because you'll be writing a lot of callback functions, you may find that you don't have access to certain variables because they're within the local scope of another function. Here's an example:

<pre><code data-trim contenteditable>const readline = require('readline');

function main() {
    const greeting = "Hello ";

    const userPrompt = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    userPrompt.question('What\'s your name?', handleUserInput);

}

function handleUserInput(response) {
    console.log(greeting + ' ' + response);
    userPrompt.close();
}

main();
</code></pre>

If you run the above code, you'll get the following error:

`ReferenceError: greeting is not defined`

Because greeting is within the local scope of `main`. Assuming you want to keep the `main` function around, you can get around this by employing one the following strategies (I recommend using the arrow function version!):

* (easy, but sloppy) using a lot of global variables - just move the declaration of `greeting` outside of `main`
* (easy, slightly less sloppy) nest functions within other functions if you need inner function to access variables in the outer function 
    <pre><code data-trim contenteditable>const readline = require('readline');
    
    function main() {
    const greeting = "Hello ";

    const userPrompt = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    userPrompt.question('What\'s your name?', handleUserInput);

    function handleUserInput(response) {
        console.log(greeting + ' ' + response);
        userPrompt.close();
    }
}
main();
</code></pre>
* (difficult) pass the necessary variables to the function as arguments, and then fix the arity by using an anonymous function (that is, fix the values of a function's parameters) when using the function as a callback (an arrow function or _regular_ function expression will work):
    <pre><code data-trim contenteditable>const readline = require('readline');
    
    function main() {
    const greeting = "Hello ";

    const userPrompt = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

	// using arrow function
	// (arrow function takes one argument and passes that as third argument to handleUserInput)
    userPrompt.question('What\'s your name?', (response) => { handleUserInput(userPrompt, greeting, response); } );

	// or with a function expression
    // userPrompt.question('What\'s your name?', function(response) {
    //     handleUserInput(userPrompt, greeting, response);
    // });
}
function handleUserInput(userPrompt, greeting, response) {
    console.log(greeting + ' ' + response);
    userPrompt.close();
}
main();
</code></pre>
* (difficult) pass the necessary variables to the function as arguments, and then fix the arity of the callback by using an arrow function or [bind](https://www.google.com/search?q=js+bind&oq=js+bind&aqs=chrome..69i57j0l5.1794j0j4&sourceid=chrome&ie=UTF-8)
    <pre><code data-trim contenteditable>const readline = require('readline');

    function main() {
    const greeting = "Hello ";

    const userPrompt = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

	// using bind...
    userPrompt.question('What\'s your name?', handleUserInput.bind(null, userPrompt, greeting));
}
function handleUserInput(userPrompt, greeting, response) {
    console.log(greeting + ' ' + response);
    userPrompt.close();
}
main();
</code></pre>

__Issues Reading a File__

You should be running your program from your project root directory. The path given to `fs.readFile` should be:

`data/enable1.txt`

</div>

</div>

