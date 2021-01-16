---
layout: homework
title: CSCI-UA.0480 - Homework #1
---

<div class="panel panel-default">
	<div class="panel-heading">Homework #1</div>
	<div class="panel-body" markdown="block">

# Emothello

## Due  __Feb 5th, by 11PM__

<pre>     A   B   C   D   E   F   G   H
   +---+---+---+---+---+---+---+---+
 1 |   |   |   |   |   |   | O |   |
   +---+---+---+---+---+---+---+---+
 2 |   |   |   |   |   | O |   |   |
   +---+---+---+---+---+---+---+---+
 3 |   |   |   | O | O | X |   |   |
   +---+---+---+---+---+---+---+---+
 4 |   |   | X | O | X | X |   |   |
   +---+---+---+---+---+---+---+---+
 5 |   |   |   | X | X |   |   |   |
   +---+---+---+---+---+---+---+---+
 6 |   |   | X |   | X |   |   |   |
   +---+---+---+---+---+---+---+---+
 7 |   | X |   |   |   |   |   |   |
   +---+---+---+---+---+---+---+---+
 8 |   |   |   |   |   |   |   |   |
   +---+---+---+---+---+---+---+---+
</pre>

## Overview

### Description

Create an interactive 2-player (computer vs human player) Reversi/Othello game.

* check out [the rules on wikipedia](https://en.wikipedia.org/wiki/Reversi)
* you can check out this strategy guide if you're interested in [Reversi strategy](http://www.samsoft.org.uk/reversi/strategy.htm)
* you'll write this game in two parts...


1. create several helper functions for your game
2. implement the game using some of the helper functions you made for part 1
	* it'll be a bit over-engineered
	* but don't worry - you don't have to use all of the functions you create

See the [example game](#hw01-reversi-sample) shown at the end of these instructions.


### Objectives

1. Write some JavaScript!
    * control structures
    * functions
    * Array and string manipulation
2. Learn how to run node programs
3. Learn about node built-ins:
    * `process`
    * `exports`
    * `require`
4. Install and use modules, create your own
5. Run unit tests to check your work
6. Use a static analysis tool (ESLint) to help prevent bugs / errors
7. Use the fs module to read a file / handle asynchronous I/O
8. Parse JSON

### Grading

* __all parts of the homework count toward your grade__
* __there will be a significant penalty for not adding the config file and scripted moves portion__
    * these parts are at the end of the instructions (see `User Controlled Game Settings` and `Handling Scripted Moves`)
    * the implementation of these features is important because they help both _you_ and the graders test your program

### Submission Process

The final version of your assignment should be in GitHub.

* __push__ your changes to the homework repository on GitHub
* repositories will be closed on the due date and time so that no more commits can be pushed!
* after the due date, no further commits will be seen by the graders 

## Preparation


Ensure that node and npm are installed (this should have been done for _homework #0_). You should be able to open up your terminal or DOS Shell and run `node -v` and `npm -v`. Both commands should output a version number (probably something like `6.2.2` for node and `3.9.5` for npm).

1. use git / clone the repository
2. install development modules
    * mocha and chai for running the supplied unit tests
    * eshint for cleaning up your JavaScript / spotting common sources of bugs and errors in your code
3. install modules required by your game

### Use Git / Clone the repository

Make sure you have git / a git client!

* [commandline git](https://git-scm.com/book/en/v1/Getting-Started-Installing-Git)
* [SourceTree](https://www.sourcetreeapp.com/)
* [GitKraken](https://www.gitkraken.com/) 


Assuming that you've already:

* submitted your github username via the form/survey
* accepted the invitation that adds you to the github organization for this course

You can then go through the following steps to clone your repository and commit your first changes:

1. ...go to the [class github page](https://github.com/nyu-csci-ua-0480-008-spring-2018)
2. find the repository that starts with your NYU NetID and ends with homework01 (for example, jjv222-homework01) 
3. on the repository's page, use the green "Clone or download" button on the right side of the screen to copy the HTTPS clone URL to __clone__ the homework. To use the commandline client (with GITHUB_REPOSITORY_URL being the url you copied from the green button):
    <pre><code data-trim contenteditable> git clone GITHUB_REPOSITORY_URL
</code></pre>
4. create a file called <code>.gitignore</code> in the same directory
5. add the following line to the file so that git ignores any locally installed node modules: <code> node_modules </code>
6. in the same project directory, create a file called README.md, and edit it so that it includes:
	* your name and net id
	* the title of your project: Homework #01 - Reversi
7. again, in the same project directory, run <code>git add README.md</code> to let git know that we're ready to "save"
8. save your work locally by running <code>git commit -m "first commit"</code>... everything within the quotes after <code>-m</code> is any commit message you'd like
0. finally, send your work to github by running <code>git push</code> (or <code>git push origin master</code>)

### Install Development Modules

You'll have to install a couple of node modules to help you run tests and use static analysis tools on your code. These tools won't be required for your program to run, but they will be useful while you're writing your programs. 

You'll be installing the following module globally:

* `mocha` - for running unit tests

You'll also install the following modules locally in your project directory:

* `chai` - supplies assertions for unit tests
* `eslint` - for catching potential errors in your code

Go into the directory of your cloned repository (`cd username-homework01`), and run the following commands:

<pre><code data-trim contenteditable>npm install -g mocha
npm install --save-dev eslint
npm install --save-dev chai
</code></pre>

Note that the last commands install modules _locally_ to your project directory. It will do two things:

* It will make a modification to an existing file, `package.json`, within your project folder
* It will create a `node_modules` folder where your downloaded modules are stored (this folder is included in your `.gitignore` file because these external libraries are not meant to be in your project's version control

### Install Required Modules

You'll also need a module to help you ask the user for input.

* in your repository directory, install the node module, <code>readline-sync</code>, by running this command in your project's directory:
    <pre><code> npm install --save readline-sync
</code></pre>
* note that the <code>readline-sync</code> module allows you to prompt for user input __synchronously__
	* this is very different from how node.js apps usually operate
	* however, for our purposes, using sync prompt is fine (for now), and it mimics the browser's prompt functionality well
* check out the example usage on [readline-sync's npm page](https://www.npmjs.com/package/readline-sync)
    * essentially: `var readlineSync = require('readline-sync');`
    * which imports the function <code>question</code> from the <code>readline-sync</code> module into your program
* note that installing `readline-sync` will make a modification to `package.json` as well. This modification to `package.json` should be committed and pushed as well!

### Minimum Number of Commits

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


## Part 1 - Reversi Functions and Running Unit Tests

### Background 

For your implementation of Reversi, you'll break down the game into several functions. These helper functions will be written in a _module_ (a file separate from the file that actually runs your game), which you'll use in part 3: `src/reversi.js`

The helper functions you'll be implementing are described below. Unit tests have been included in your repository in the file, `tests/reversi-test.js`. 

### Creating a Module / Exporting Functions 

You'll be creating a module that contains a bunch of helper functions. The file that you'll be writing your module in is already included in your repository in `src/reversi.js`. Both your _actual_ interactive Reversi game (in Part 2) and the supplied unit tests will use this module. 

To make the functions you write available when your module is brought into another program (that is, required or _imported_), you'll have to _export_ your functions. See [this sitepoint tutorial](https://www.sitepoint.com/understanding-module-exports-exports-node-js/) or this [article](http://openmymind.net/2012/2/3/Node-Require-and-Exports/) to get a primer on modules, `exports` and using `require`. There are a few ways to do export your functions (all of the examples use `module.exports`, but they should work with just `exports` as well):

1. create all of your functions ... then, at the end, assign `module.exports` to an object literal containing all of the functions that you want to export:
	<pre><code data-trim contenteditable>function repeat(ele, n) {
       // implementation
   } 
    
   function generateBoard(rows, cols, initialValue) {
       // implementation
   } 

   // ...

   module.exports = {
       repeat: repeat,
       generateBoard: generateBoard,
       // ...
   }
</code></pre>
2. create all of your functions in an object and assign that object to `module.exports`:
	<pre><code data-trim contenteditable>const rev = { 
       repeat: function(value, n) {
           // implementation
       },
    
       generateBoard: function(rows, columns, initialCellValue) {
           // implementation
       },
    
       // ...
   }
    
   module.exports = rev;
</code></pre>
3. Create functions as properties on `module.exports`
	<pre><code data-trim contenteditable>module.exports.repeat = function(value, n) {
       // implementation
   }
    
   module.exports.generateBoard = function(rows, columns, initialCellValue) {
       // implementation
   },
    
   // ...
</code></pre>

When you `require` your module, the object you create for `exports` will be given back. In the example below, the module, `some-module.js` is brought in to the current file (the `./` specifies that the file is in the same directory as the current file) and is represented by the variable, `foo`. The functions can be accessed by using regular dot notation on the `foo` object:

<pre><code data-trim contenteditable>var foo = require('./some-module.js');
foo.someFunction();
</code></pre>

__You should make sure your exports are up to date as you implement your functions__ so that you can run your unit tests as you complete your function implementations.
		
### Unit Tests

You can use the supplied unit tests (in `tests/reversi-test.js`) to check that your functions are:

* are named correctly
    * have the required parameters
* return the appropriate value(s) 
* meet the minimum requirements according to the specifications 

The given unit tests use Mocha as a testing framework and Chai for assertions. While you don't have to know how to write these tests, you should read through them (the api is very _human readable_) to get a feel for how your functions are being tested. If you're curious about writing unit tests, check out [this article on codementor](https://www.codementor.io/nodejs/tutorial/unit-testing-nodejs-tdd-mocha-sinon). 

You can __run the included unit tests by using this command__ in your project directory:

`mocha tests/reversi-test.js`

If you run these tests before starting, you'll get a bunch of reference errors. This is because you have no functions implemented yet. Additionally, you'll have to export the functions you create so that the tests have access to them.

__Please try continually running the unit tests as you develop your program.__ To clear out the noise, __feel free to comment out the tests that you aren't working on__, and uncomment them as soon as you have a stub of a function exported.

### Assumptions

The functions make some assumptions about how you'll be representing a Reversi  board.

1. although some functions allow for arbitrary rows and columns...
    * you can assume that a board will always have at least 16 squares (4 x 4), but no more than 26 x 26 squares
    * you can also assume that a board's rows and columns will always be equal
2. we can name a cell / square based on its row number and column number 
    * rows start from the top with row number 0
    * cols start from the left with column number 0
    * the diagram below shows a 4 X 4 board with row and column labels
        <pre><code data-trim contenteditable>           columns
              0   1   2   3
            +---+---+---+---+
          0 | 0 | 1 | 2 | 3 |
            +---+---+---+---+
 r  1 | 4 | 5 | 6 | 7 |
 o    +---+---+---+---+
 w  2 | 8 | 9 | 10| 11|
 s    +---+---+---+---+
          3 | 12| 13| 14| 15|
            +---+---+---+---+
</code></pre>
    * in this example, the lower right most square (containing 15) is at row 3, column 3
    * the cell containing 9 is at row 2, column 1
3. Alternatively, we can reference a cell using a format borrowed from [chess algebraic notation](https://en.wikipedia.org/wiki/Algebraic_notation_(chess))
    * the columns are uppercase __letters starting with A from the left__
    * ... while the rows are __numbers starting at 1 from the top__
    * in this notation the column (letter) is first, followed by the row (number)
    * using this notation, the board with labels would like like this:
        <pre><code data-trim contenteditable>          columns
              A   B   C   D
            +---+---+---+---+
          1 | 0 | 1 | 2 | 3 |
            +---+---+---+---+
 r  2 | 4 | 5 | 6 | 7 |
 o    +---+---+---+---+
 w  3 | 8 | 9 | 10| 11|
 s    +---+---+---+---+
          4 | 12| 13| 14| 15|
            +---+---+---+---+
</code></pre>
    * the lower right most square, containing 15, is at D4
    * the cell containing 9 is B3
4. Although a 2-dimensional Array is a natural fit for representing a Reversi board, __your implementation of Reversi will use a one dimensional `Array` to represent the board__
    * in this representation, imagine all of the rows of the board placed adjacent to each other 
        <pre><code style="font-size:11px;" data-trim contenteditable>           +-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+
row, col   | 0,0 | 0,1 | 0,2 | 0,3 | 1,0 | 1,1 | 1,2 | 1,3 | 2,0 | 2,1 | 2,2 | 2,3 | 3,0 | 3,1 | 3,2 | 3,3 |
                 +-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+
algebraic  | A1  | B1  | C1  | D1  | A2  | B2  | C2  | D2  | A3  | B3  | C3  | D3  | A4  | B4  | C4  | D4  |
                 +-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+
index      |  0  |  1  |  2  |  3  |  4  |  5  |  6  |  7  |  8  |  9  | 10  | 11  | 12  | 13  | 14  | 15  |
                 +-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+
</code></pre>
    * the lower right most square, D4 (row 3, col 3) is at index 15
    * B3 (row 2, col 1) is index 9 
5. The space character, `" "`, will be used to mark an empty square
6. __Reversi uses black and white pieces (discs)__ ... these pieces will be represented by:
    * the letter `X` for black pieces
    * the letter `O` for a white piece
7. You can assume that all of the code examples below use `rev` as the name of the imported module of your Reversi functions


<br>

### Functions to Implement

Note that:

* most functions will return values (to make it easier to test)
* the tests are meant to ensure that your functions are named correctly and work for a few simple cases
    * they don't cover all of the corner cases / requirements
    * so check out the tests before running to see what else you may need to check for
    * feel free to augment the tests with your own additional tests

<hr>

### `repeat(value, n)`

__Parameters:__

* `value` - the value to be repeated
* `n` - the number of times to repeat the `value`

__Returns:__

* an `Array` containing `n` elements, with each element being `value`

__Description:__

`repeat` creates an `Array` that contains `value` as each element for `n` elements. If the `value` is a reference type, it's ok if the reference is copied (that is, you don't have to worry about deep copying `value` if it's an `Object`.

Hint: The `Array` methods, [push](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push) and/or [spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator)/[concat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat) may be helpful here.


__Example:__

    const arr = rev.repeat("hello", 3);
    // arr is ["hello", "hello", "hello"];

<hr>

### `generateBoard(rows, columns, initialCellValue)`

__Parameters:__

* `rows` - the number of rows in the board
* `columns` - the number of columns in the board
* `initialCellValue` - the initial value contained in each square
    * default value should be space (`" "`)

__Returns:__

* a single dimensional `Array` containing the number of elements that would be in a rows x columns board... with each cell containing the initial value, `initialCellValue`

__Description:__

Creates a single dimensional `Array` representation of a Reversi board. The number of elements in the `Array` is the same as the number of squares in the board based on the supplied number of `rows` and `columns`. The initial value in each cell is the `initialCellValue` passed in

Use the `repeat` function that you created above to implement this function.

__Example:__

    // creates a board with 16 squares
    const board = rev.generateBoard(4, 4);
    // board is = [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "];
    // (each empty cell is a space because the default value is space)

<hr>

### `rowColToIndex(board, rowNumber, columnNumber)`

__Parameters:__

* `board` - the board where the `rowNumber` and `columnNumber` come from
* `rowNumber` - the row number to be converted to an index in a one dimensional a`Array` representation
* `columnNumber` - the column number to be converted to an index in a one dimensional a`Array` representation

__Returns:__

* a `Number`, the index that's mapped to by the given `rowNumber` and `columnNumber`

__Description:__

A cell in a Reversi board can be specified by a row number and a column number. However, our board implementation uses a one dimensional `Array`, so a cell must be specified by a single index. This function translates a row and a column into an index in the one dimensional `Array` representation of a Reversi board. 

Hint: [Math.sqrt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sqrt) can be used to help determine the original width and height of the board even though `board` comes in as a one dimensional `Array`.

__Example:__

    // translates a row and col to a single index
    const board = rev.generateBoard(3, 3, " ");
    const i = rev.rowColToIndex(board, 1, 1);
    const j = rev.rowColToIndex(board, 0, 2);
    // i is 4 (column 1, row 1 is the same as the element at index 4)
    // j is 2

<hr>

### `indexToRowCol(board, i)`

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
    const board = rev.generateBoard(3, 3, " ");
    const rowCol1 = rev.indexToRowCol(board, 4);
    const rowCol2 = rev.indexToRowCol(board, 2);
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

Sets the value of the cell at the specified row and column numbers on the board, `board`, to the value, `letter` without mutating the original board passed in. 

Do this by creating a shallow copy of `board` and modifying it.  Return the copy instead of the original `board` passed in. To shallow copy an `Array`, use the [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator#Copy_an_array) or the [slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) method.

__Example:__

    // sets a single square, but does not mutate the original board passed in
    const board = rev.generateBoard(3, 3, " ");
    const updatedBoard = rev.setBoardCell(board, "X", 1, 1);
    // board is [" ", " ", " ", " ", " ", " ", " ", " ", " "]
    // updatedBoard is [" ", " ", " ", " ", "X", " ", " ", " ", " "]

<hr> 

### `algebraicToRowCol(algebraicNotation)`

__Parameters:__

* `algebraicNotation` - a `String` that specifies the position of a cell using algebraic notation 

__Returns:__

* an object containing two properties, `row` and `col`, representing the row and column numbers that the `algebraicNotation` maps to (for example, `{"row": 1, "col": 1}`)
* `undefined` if the algebraic notation passed in is not valid.

__Description:__

Translates algebraic notation specifying a cell into a row and column specifying the same cell. If the notation passed in is not valid, then return `undefined`. 

The algebraic notation format we'll use will be a single string with the column letter first, immediately followed by the row number (with nothing separating the row and column). The column letter starts at letter A and __the row number starts at index 1__  (which is different from row and column notation above where numbers start at 0). You can __assume that there are no more than 26 rows and columns__. Some examples of valid formats: `A1` and `C20`. Some invalid formats include: `1A`, `1`, `A`, `A:1`, `***`.

Hint: There are many ways you can implement this. If you want to loop through every character, you can use a simple for loop, the string's [length](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length), and the string's index operator (`[]`) or [charAt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt) method. Note that there's no actual character type, you just get a `String` composed of a single character. 

Alternatively, you can create an `Array` containing every character of the original `String` by using [split](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split) with an empty string as an argument.

Once you can look at each individual character (or group of characters), you can examine each character by using [isNaN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN) to determine if a `String` is not numeric.

Finally if you feel like wrangling regular expressions, you can try using the [match](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match) method.

__Example:__

    // valid
    rev.algebraicToRowCol("B3") // for a 4 x 4 board, {"row": 2, "col": 1}
    rev.algebraicToRowCol("D4") // for a 4 x 4 board, {"row": 3, "col": 3}

    // not valid:
    rev.algebraicToRowCol("A")) // undefined
    rev.algebraicToRowCol("2")) // undefined
    rev.algebraicToRowCol("2A")) // undefined
    rev.algebraicToRowCol(" ")) // undefined
    rev.algebraicToRowCol("A 2")) // undefined
    rev.algebraicToRowCol("A:2")) // undefined
    rev.algebraicToRowCol("**")) // undefined

<hr>

### `placeLetters(board, letter, algebraicNotation)`

__Parameters:__

* `board` - the board where a cell will be set to `letter`
* `letter` - the string to set the cell to
* one or more: `algebraicNotation` - a `String` that specifies the position of a cell using algebraic notation 

__Returns:__

* a single dimensional `Array` representing the board where the cells at each `row` and `col` specified is set to the value of `letter`

__Description:__

Translates one or more moves in algebraic notation to row and column... and uses the row and column to set the letter specified on the board.

Use the `setBoardCell` function you created above to implement this. Consequently, the incoming board should not be mutated (instead, copy it, modify the copy and return the modified copy).

Use [rest parameters](http://exploringjs.com/es6/ch_parameter-handling.html#sec_rest-parameters) to handle multiple arguments this. Again, the original board passed in should not be changed (instead, copy it, modify the copy, and return the copy).

__Example:__

    // X and O are placed on the board
    let board = rev.generateBoard(4, 4, " ");
    board = rev.placeLetters(board, 'X', "B3", "D4");
    // board is [" ", " ", " ", " ", " ", " ", " ", " ", " ", "X", " ", " ", " ", " ", " ", "X"]
    // index      0    1    2    3    4    5    6    7    8    9   10   11   12   13   14   15

    // note that placeLetters can be called with an arbitrary number of moves
    // ...instead of calling with two moves, the line below calls it with four
    // rev.placeLetters(board, 'X', "B3", "D4", "A1", "A2");

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
     A   B   C   D
   +---+---+---+---+
 1 |   |   |   |   |
   +---+---+---+---+
 2 |   | O | X |   |
   +---+---+---+---+
 3 |   | X | O |   |
   +---+---+---+---+
 4 |   |   |   |   |
   +---+---+---+---+

</code></pre>

It should work for boards of any size! Here's an example of a 7 x 7 board!

<pre><code data-trim contenteditable>     A   B   C   D   E   F   G   H
   +---+---+---+---+---+---+---+---+
 1 |   |   |   |   |   |   | O |   |
   +---+---+---+---+---+---+---+---+
 2 |   |   |   |   |   | O |   |   |
   +---+---+---+---+---+---+---+---+
 3 |   |   |   | O | O | X |   |   |
   +---+---+---+---+---+---+---+---+
 4 |   |   | X | O | X | X |   |   |
   +---+---+---+---+---+---+---+---+
 5 |   |   |   | X | X |   |   |   |
   +---+---+---+---+---+---+---+---+
 6 |   |   | X |   | X |   |   |   |
   +---+---+---+---+---+---+---+---+
 7 |   | X |   |   |   |   |   |   |
   +---+---+---+---+---+---+---+---+
 8 |   |   |   |   |   |   |   |   |
   +---+---+---+---+---+---+---+---+
</code></pre>

This one is actually quite challenging (and tedious) to get exactly right, so there won't be any penalties for minor spacing inconsistencies... and if there are other issues (for example, not adding labels), there will only be small point penalties.

Again, you can __assume that the numbers of rows and columns will not be greater than 26__.

Hint: One way of dealing with the row label is to use [String.fromCodePoint](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint), which gives you the unicode code point of the character supplied.

__Example:__

    // a string representation of a board with two moves
    let board = rev.generateBoard(3, 3, " ");
    board = rev.placeLetter(board, 'X', "B2");
    board = rev.placeLetter(board, 'O', "C1");
    // board will be equal to the following string:
    "     A   B   C  \n   +---+---+---+\n 1 |   |   | O |\n   +---+---+---+\n 2 |   | X |   |\n   +---+---+---+\n 3 |   |   |   |\n   +---+---+---+\n";

<hr>


### `isBoardFull(board)`

__Parameters:__

* `board` - the board to examine

__Returns:__

* `true` if there are no empty cells left in the board, `false` otherwise

__Description:__

Examines the `board` passed in to determine whether or not it's full. It returns `true` if there are no empty squares, `false` if there are still squares available. __Assume that the board uses the space character, `" "`, to mark a square as empty__.

Hint: The solution to this is pretty straightforward with a simple for loop, but if you want to ditch the for loop entirely, you can get fancy and use the `Array` method, [some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some).

__Example:__

    // board is empty
    let board = rev.generateBoard(3, 3, " ");
    console.log(rev.isBoardFull(board)); // --> false

    // board is completely full
    board = rev.generateBoard(3, 3, " ");
    board = rev.placeLetter(board, 'X', "A1");
    board = rev.placeLetter(board, 'X', "A2");
    board = rev.placeLetter(board, 'X', "A3");
    board = rev.placeLetter(board, 'X', "B1");
    board = rev.placeLetter(board, 'X', "B2");
    board = rev.placeLetter(board, 'X', "B3");
    board = rev.placeLetter(board, 'X', "C1");
    board = rev.placeLetter(board, 'X', "C2");
    board = rev.placeLetter(board, 'X', "C3");
    console.log(rev.isBoardFull(board)); // --> true

    // board has one square empty...
    board = rev.generateBoard(3, 3, " ");
    board = rev.placeLetter(board, 'X', "A2");
    board = rev.placeLetter(board, 'X', "A3");
    board = rev.placeLetter(board, 'X', "B1");
    board = rev.placeLetter(board, 'X', "B2");
    board = rev.placeLetter(board, 'X', "B3");
    board = rev.placeLetter(board, 'X', "C1");
    board = rev.placeLetter(board, 'X', "C2");
    board = rev.placeLetter(board, 'X', "C3");
    console.log(rev.isBoardFull(board)); // --> false

<hr>

### `flip(board, row, col)`

__Parameters:__

* `board` - the board the move is performed on
* `row` - the row number of piece/letter to flip
* `col` - the column number of piece/letter to flip

__Returns:__

* a single dimensional `Array` representing the board where the letter at `row` and `col` is changed to the opposite letter - from `X` to `O` or `O` to `X` (that is, the piece is changed to the opposite color)

__Description:__

Using the `board` passed in, flip the piece at the specified `row` and `col` so that it is the opposite color by changing `X` to `O` or `O` to `X`. If no letter is present, do not change the contents of the cell.


__Example:__

    board = rev.generateBoard(4, 4, " ");
    board = rev.placeLetter(board, 'X', "A1");
    board = rev.flip(board, 0, 0);
    // board[0] is now 'O'!

### `flipCells(board, cellsToFlip)`

__Parameters:__

* `board` - the board the move is performed on
* `cellsToFlip` - a 3D `Array` representing groups of rows and columns

__Returns:__

* a single dimensional `Array` representing the board where the letters specified in `cellsToFlip`are changed to the opposite letter - from `X` to `O` or `O` to `X` (that is, the pieces are changed to the opposite color)

__Description:__

Using the `board` passed in, flip the pieces in the cells specified by `cellsToFlip`.

`cellsToFlip` is a 3 dimensional array:

* the inner most `Array` has 2 elements, a row and a column
* groups of rows and columns are wrapped in an `Array` (these groupings are meant to represent lines of consecutive tiles)
* finally, these groups are also wrapped in an `Array`

For example:

    [[[0, 0], [0, 1]], [[1, 1]]]
    |_______________|  |_____|
            |             |
    group 1 (2 cells)     group 2 (1 cell)

Each group represents a line of consecutive cells. Note, though, that these lines have no relevance to how the tiles are flipped - only that in order to get to the cell location, you'll have to descend through nested `Arrays`.


__Example:__

    board = rev.generateBoard(4, 4, " ");
    board = rev.placeLetters(board, 'X', "A1", "B1", "B2");
    board = rev.flipCells(board, [[[0, 0], [0, 1]], [[1, 1]]]);
    // the letters at index 0, 1 and 5 are all set to 'O'!


### `getCellsToFlip(board, lastRow, lastCol)`

__Parameters:__

* `board` - the board the move is performed on
* `lastRow` - the row of the last move on the board
* `lastCol` - the column of the last move on the board

__Returns:__

* `Array` representing groups of rows and columns pairs that contain pieces that should be flipped to the opposite color/letter because of the last move played

__Description:__

From wikipedia: 

> (Assuming the player is X/Black/Dark) Dark must place a piece with the dark side up on the board, in such a position that there exists at least one straight (horizontal, vertical, or diagonal) occupied line between the new piece and another dark piece, with one or more contiguous light pieces between them.

> After placing the piece, dark turns over (flips, captures) all light pieces lying on a straight line between the new piece and any anchoring dark pieces. All reversed pieces now show the dark side, and dark can use them in later moves—unless light has reversed them back in the meantime. In other words, a valid move is one where at least one piece is reversed.

Using the `board` passed in determine which cells contain pieces to flip based on the last move. For example, if the last move was the `X` played at `D3`, then all of the `O`'s on the board would be flipped (`D2`, `B3` and `C3`.

<pre>
     A   B   C   D
   +---+---+---+---+
 1 |   |   |   | X |
   +---+---+---+---+
 2 |   |   |   | O |
   +---+---+---+---+
 3 | X | O | O | X |
   +---+---+---+---+
 4 |   |   |   |   |
   +---+---+---+---+
</pre>

Consequently, for the board above, this function will return the row and column pairs representing the cells where pieces need to be flipped. These pairs are grouped by "lines". `B3` and `C3` are grouped together because they are in the same line. These groups are collected in an `Array`.... and the returned `Array` should look like:

    [[[2, 1], [2, 2]], [1, 3]]

Again groups are formed by the lines: horizontal, vertical and diagonal. But really, this translates to 8 directions starting from the proposed move:
 
1. left
2. right
3. up
4. down
5. upper left diagonal
6. upper right diagonal
7. lower left diagonal
9. lower right diagonal

So for example, in the board setup below, if there were an X move to D4, there would be 8 groups, but only because there are 8 lines of cells to be flipped:

<pre><code data-trim contenteditable>

    A   B   C   D   E   F   G   H
  +---+---+---+---+---+---+---+---+
1 |   |   |   |   |   |   | X |   |
  +---+---+---+---+---+---+---+---+
2 |   | X |   | X |   | O |   |   |
  +---+---+---+---+---+---+---+---+
3 |   |   | O | O | O |   |   |   |
  +---+---+---+---+---+---+---+---+
4 |   | X | O |   | O | O | X |   |
  +---+---+---+---+---+---+---+---+
5 |   |   | O | O | O |   |   |   |
  +---+---+---+---+---+---+---+---+
6 |   | X |   | X |   | X |   |   |
  +---+---+---+---+---+---+---+---+
7 |   |   |   |   |   |   |   |   |
  +---+---+---+---+---+---+---+---+
8 |   |   |   |   |   |   |   |   |
  +---+---+---+---+---+---+---+---+

</code></pre>

__Hint - a possible brute force algorithm to do this__:

1. For every possible straight line starting from the move (up, down, left, right, diagonal upper left, etc.):
2. Check if the next cell contains your opponent's letter
3. If it does, add it to a list of potential cell coordinates continue to the next cell in your line...
4. If that cell contains your letter, you're done! ...all of your collected cells are cells to flip
5. If the next cell doesn't exist or the next cell is empty (a space) none of the cells you've collected can be flipped


Lastly, the ordering of the groups, as well as the cells in those groups can vary. __Ordering does not matter!__ (This will depend on the algorithm that you use for this, so a specific ordering is not required.)



__Example:__

    let board = rev.generateBoard(4, 4, " ");
    board = rev.placeLetters(board, 'O', 'B3', 'C3', 'D2');
    board = rev.placeLetters(board, 'X', 'A3', 'D1', 'D3');
    const res = rev.getCellsToFlip(board, 2, 3); // last move/proposed move was D3
    // res will look something like: [[[2, 1], [2, 2]], [[1, 3]]]


### `isValidMove(board, letter, row, col)`

__Parameters:__

* `board` - the board the move is performed on
* `letter` - the letter used for the intended move
* `row` - the row number of the intended move
* `col` - the column number of the intended move

__Returns:__

* `true` if the move is valid, `false` otherwise

__Description:__

Using the `board` passed in, determines whether or not a move with `letter` to `row` and `col` is valid. A valid move:

* targets an empty square
* is within the boundaries of the board
* adheres to the rules of Reversi... that is, the piece played must flip at least one of the other player's pieces

Use a previous function that you created, `rowColToIndex` in the implementation of this function. Again, you can __assume that the space character, `" "`, represents empty__.

__Example:__

	// a valid move
    let board = rev.generateBoard(3, 3, " ");
    board = rev.placeLetter(board, 'X', "A1");
    board = rev.placeLetter(board, 'O', "A2");
    rev.isValidMove(board, 'X', 2, 0); // true!

	// not a valid move
    let board = rev.generateBoard(3, 3, " ");
    board = rev.placeLetter(board, 'X', "B1"); // notice that this does not form a line!
    board = rev.placeLetter(board, 'O', "A2");
    rev.isValidMove(board, 'X', 2, 0); // false

    // remember to check for:
    // 1. out of bounds
    // 2. a piece that already exists
<hr>

### `isValidMoveAlgebraicNotation(board, letter, algebraicNotation)`

__Parameters:__

* `board` - the board the move is performed on
* `letter` - the letter to be placed
* `algebraicNotation` - algebraic notation representing the __intended move__ on the `board`

__Returns:__

* `true` if the intended move is valid, `false` otherwise

__Description:__

Using the `board` passed in, determines whether or not a move with `letter` to `algebraicNotation` is valid. Use the functions you previously created, `isValidMove` and `algebraicToRowCol` to implement this function.

__Example:__

    // valid move
    let board = rev.generateBoard(3, 3, " ");
    board = rev.placeLetter(board, 'X', "A1");
    board = rev.placeLetter(board, 'O', "A2");
    rev.isValidMoveAlgebraicNotation(board, 'X', 'A3'); // true

### `getLetterCounts(board)` 

__Parameters:__

* `board` - the board that contains the pieces/letters to count

__Returns:__

* `object` with property names as letters and values as counts of those letters 

__Description:__

Returns the counts of each of the letters on the supplied `board`. The counts are stored in an object where the count is the value and the letter is the property name. For example, if the board has 2 X's and 1 O, then the object return would be: `{ X: 2, O: 1 }`

__Example:__

    let board = rev.generateBoard(3, 3, " ");
    board = rev.placeLetter(board, 'X', "A1");
    board = rev.placeLetter(board, 'X', "A3");
    board = rev.placeLetter(board, 'O', "A2");
    const counts = rev.getLetterCounts(board);
    // counts is {X: 2, O: 1}

### `getValidMoves(board, letter)` 

* `board` - the board used for determining valid moves
* `letter` - the piece/letter that valid moves will be determined for

__Returns:__

* `Array` - a 2-dimensional `Array` representing a list of row and column pairs, with each pair a valid move for the `letter` provided

__Description:__

Gives back a list of valid moves that the `letter` can make on the `board`. These moves are returned as a list of row and column pairs - an `Array` containing 2-element `Array`s

__Example:__


    // 1 valid move can be made for X on this board
    let board = rev.generateBoard(3, 3, " ");
    board = rev.placeLetter(board, 'X', "A1");
    board = rev.placeLetter(board, 'O', "A2");
    const res = rev.getValidMoves(board, 'X');
    // [[2, 0]]

    // no valid moves for X can be made on this board
    let board = rev.generateBoard(3, 3, " ");
    board = rev.placeLetter(board, 'X', "A1");
    board = rev.placeLetter(board, 'O', "A3");
    const res = rev.getValidMoves(board, 'X');
    // []

    // 2 possible valid moves can be made for X on this board
    let board = rev.generateBoard(4, 4, " ");
    board = rev.placeLetters(board, 'X', 'A1');
    board = rev.placeLetters(board, 'O', 'B2');
    board = rev.placeLetters(board, 'X', 'A2');
    board = rev.placeLetters(board, 'O', 'C3');
    const res = rev.getValidMoves(board, 'X');
    // [[3, 3], [1, 2]]


<hr>


### Checking Your Code, Pushing Your Changes

1. JavaScript is kind of crazy (read: has some really _bad_, but syntactically valid parts), so it's useful to use a static analysis tool, like `eslint` to check your code
    * ideally, you'd be doing this periodically while you write your program
    * the commandline usage is described here, but there are eslint integrations for some editors (see the plugins section in the [eslint installation guide](https://www.npmjs.com/package/eslint)
    * from your project directory run: `./node_modules/.bin/eslint src/*` to check all of the code in the `src` directory
    * (you _did install_ `eslint` locally in the preparation section, right?)
    * check the output; __make sure you fix all warnings / errors__
2. Run your tests one last time to make sure that they're all (or... _mostly_) passing.
    * `mocha tests/reversi-test.js`
3. Fix unit test errors 
    * if you have test failures, examine the output of each failure...
    * it'll describe what was expected vs what was actually given back by your function... 
    * +/green shows expected, while -/red shows the incorrect output
    * if you get `TypeError ... is not a function`, you may have:
        * not implemented the function (!)
        * named the function differently than what was specified in the instructions
        * did not export the function from your module
5. finally make sure your changes are saved and pushed 
    * __use git to add and commit__ to continually save changes
    * push your changes so that they're available on the remote repository (github)



## Part 2 - Reversi / Othello

Whew. That was a lot of work. But, ummmm... there's no Reversi game yet. What?  __Let's use the module / helper functions you created in part 1 to implement an interactive Reversi game that supports the following features:__

1. User controlled game settings
2. An interactive game
3. A game configuration to automate settings, start the board with a predefined setup, and allow scripted moves for both the player and the opponent

You don't have to use _all_ of the functions you created in your `reversi.js` module. However, you'll likely end up doing a lot of redundant work if you don't!

### Prep

You'll write your Reversi game in the file called `src/app.js`. Your first step is to bring in some required modules. Open up `src/app.js` and...

1. bring in the module you created by using `require`
    <pre><code data-trim contenteditable>// you can name the object whatever you like
// "rev" is used below...
var rev = require('./reversi.js');
</code></pre>
2. bring in the module, `readline-sync`, which you installed in the preparation portion of the homework
    <pre><code data-trim contenteditable>var readlineSync = require('readline-sync');
3. also bring in the `fs` module for reading files
</code></pre>

### Read in a Config File / Commandline Arguments

Before starting the game, a few settings have to be configured. This can be done via a config file (which will also allow you to start with a board with pieces already on it) or by asking the player to specify values explicitly. The settings to configure are:

1. width of the board 
2. the letter/color for the player (`X` is black, `O` is white, `X` goes first)

This section describes how a config file could be used to initialize a game. (Asking the player for settings will be covered in the next section).

1. the config file will be specified as a commandline argument that's passed in to your program when running it through the commandline
2. to access commandline arguments, use the built-in `process.argv`. It's an `Array` that contains the data passed in to your program through the commandline.
    * [see the official documentation](https://nodejs.org/docs/latest/api/process.html#process_process_argv)
    * the filename of the optional config file will be first and only argument that can be passed in
    * ... consequently, check for the existence of `process.argv[2]`
    * for example, if you run your file as `node src/app.js /Users/joe/Desktop/myconfig.json`
    * ... then the string, `/Users/joe/Desktop/myconfig.json`, will be stored in `process.argv[2]`
3. if a config file is passed in, read it!
    * use the [`fs` module's readFile function](https://nodejs.org/api/fs.html#fs_fs_readfile_file_options_callback) to do this
    * example usage of the `fs` module:
        <pre><code data-trim contenteditable>
fs.readFile('/path/to/myFile.txt', 'utf8', function(err, data) {
    if (err) {
        console.log('uh oh', err); 
    } else {
        console.log(data);
    }
});
</code></pre>
    * note that the 1st argument is a path to a file (can be relative or absolute)
    * the 2nd argument is an optional encoding (in this case utf8), 
    * ... and the 3rd argument is a function to call when the file is finished being read
        * this _callback_ function has 2 parameters:
        * an `error` object that is `undefined` if there's no error, or an object containing information on the error if there is an error
        * and the `data` contained in the file
3. you can assume that the config file will be in JSON format
    * use [`JSON.parse`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) to take a string of JSON data and convert it into actual JavaScript objects
    * expect that the JSON file contains the following data:
    * data for configuring the game
        * a `String` representing the letter assigned to the player
        * an `Array` representing the board (optionally with pieces placed)
    * optionally, data to script the moves for the player and computer to aid in testing
        * an `Array` of scripted moves in algebraic notation for the computer to use for moves
        * an `Array` of scripted moves in algebraic notation for the player to use for moves
        * if the above arrays of scripted moves are empty, then the player and computer can move freely
    * here's a sample config file:
        <pre><code data-trim contenteditable>{
	"boardPreset": {
		"playerLetter": "X",
		"board": [ 
					" ", " ", "X", " ", " ", " ", " ", " ", 
					" ", " ", "O", " ", " ", " ", " ", " ", 
					" ", " ", "O", " ", " ", " ", " ", " ", 
					"X", "O", " ", "O", "X", "O", "O", "X", 
					" ", " ", "O", "X", "O", " ", " ", " ", 
					" ", " ", "O", " ", " ", " ", " ", " ", 
					" ", " ", "X", " ", " ", " ", " ", " ", 
					" ", " ", " ", " ", " ", " ", " ", " " 
		]
	},
	"scriptedMoves": {
		"player": ["C4", "F3"],
		"computer": ["E3", "F2", "B6"]
	}
}
</code></pre>
4. use the data in the JSON file to initialize your game (for example, use it to generate a board, set the player letter, etc.)
5. from here you can start the interactive game

__Of course, if no config file is specified, then ask the user for the game settings...__ (see below)


### User Controlled Game Settings

If no config file is specified (or if the config file is not found) prompt the user to set up some game options. Use `readline-sync` to ask the user for input synchronously (again, very different from how node usually works, but more in line with how we're accustomed to seeing how programs flow). Check out the [documentation on `readline-sync` on npm](https://www.npmjs.com/package/readline-sync).

Here's some example usage:

<pre><code data-trim contenteditable>const readlineSync = require('readline-sync');
 
const answer = readlineSync.question('What is the meaning of life?');
console.log(answer);
</code></pre>

0. greet the user by saying something like: `REVERSI?`
1. ask the user for the width of the game board
    * the width must be at least 4 squares wide
    * the width cannot be more than 26 squares wide
    * the width must be even
    * if the width does not fall within the above range or if the width entered is not numeric (remember, you can use `isNaN` for this) or not even, then ask the user for the width again
    * see the example interaction below (note that the first 3 answers are not valid widths, but the 4th valid answer allows the user to progress to the next question)
        <pre><code data-trim contenteditable>How wide should the board be? (even numbers between 4 and 26, inclusive)
> blah
How wide should the board be? (even numbers between 4 and 26, inclusive)
> 3
How wide should the board be? (even numbers between 4 and 26, inclusive)
> -12
How wide should the board be? (even numbers between 4 and 26, inclusive)
> 4
Pick your letter: X (black) or O (white)
</code></pre>
2. ask the user what color they'd like to be; 'X' for black or 'O' for white) 
    * uppercase 'X' and uppercase 'O' are the only valid inputs
    * if the user does not enter a valid letter, continually ask the user for a letter until a valid letter is given
	* once the player has chosen a letter, output `Player is (color/letter chosen)`
    * see the example interaction below (the first 2 inputs are not valid - the first x is lowercase):
        <pre><code data-trim contenteditable>Pick your letter: X (black) or O (white)
> x
Pick your letter: X (black) or O (white)
> asdf
Pick your letter: X (black) or O (white)
> X
Player is X
</code></pre>
3. use the data collected to construct a board (use on of the functions that you created!) and show the letter that the player chose along with the empty board ... initialize the board with 4 pieces in the center 4 squares as specified by the [Reversi/Othello rules](https://en.wikipedia.org/wiki/Reversi#Rules)
    <pre><code data-trim contenteditable>Player is X
        A   B   C   D
      +---+---+---+---+
 1 |   |   |   |   |
      +---+---+---+---+
 2 |   | O | X |   |
      +---+---+---+---+
 3 |   | X | O |   |
      +---+---+---+---+
 4 |   |   |   |   |
      +---+---+---+---+
&nbsp;
What's your move?
</code></pre>

<br>
__An entire _happy path_ (that is, all valid input) interaction would look like this:__

<pre><code data-trim contenteditable>How wide should the board be? (even numbers between 4 and 26, inclusive)
> 4
Pick your letter: X (black) or O (white)
> X
Player is X
     A   B   C   D
   +---+---+---+---+
 1 |   |   |   |   |
   +---+---+---+---+
 2 |   | O | X |   |
   +---+---+---+---+
 3 |   | X | O |   |
   +---+---+---+---+
 4 |   |   |   |   |
   +---+---+---+---+

What's your move?
>
</code></pre>


### An Interactive Game

Now... for the actual game. The user will be playing against the computer.


__If the moves aren't scripted (that is, a config file was not used OR the config file contained empty arrays for computer and player moves)__....

1. Black (`X`) goes first (so if the user chose 'O', the computer will make the first move)
2. As long as the board isn't full and there hasn't been 2 consecutive passes.... 
    * for the player's move, ask the player for a move in algebraic notation
    * if the move is not valid (use one of the functions you wrote to determine this!), notify the user and ask for another move
        <pre><code data-trim contenteditable>Player is X
           A   B   C   D
         +---+---+---+---+
 1 |   |   |   |   |
         +---+---+---+---+
 2 |   | O | X |   |
         +---+---+---+---+
 3 |   | X | O |   |
         +---+---+---+---+
 4 |   |   |   |   |
         +---+---+---+---+
&nbsp;
What's your move?
> A1
&nbsp;
INVALID MOVE. Your move should:
&ast; be in a <column letter><row number> format
&ast; specify an existing empty cell
&ast; flip at elast one of your oponent's pieces
&nbsp;
What's your move?
> A2
           A   B   C   D
         +---+---+---+---+
 1 |   |   |   |   |
         +---+---+---+---+
 2 | X | X | X |   |
         +---+---+---+---+
 3 |   | X | O |   |
         +---+---+---+---+
 4 |   |   |   |   |
         +---+---+---+---+
&nbsp;
Score
=====
X: 4
O: 1
</code></pre>
    * after a player moves, show the total counts for the player and computer
    * if a player cannot make a valid move, tell the player to press <ENTER> to pass instead of allowing the player to enter a move
        <pre><code data-trim contenteditable>     A   B   C   D   E   F   G   H
         +---+---+---+---+---+---+---+---+
 1 |   |   |   |   |   |   |   |   |
         +---+---+---+---+---+---+---+---+
 2 |   |   |   |   |   |   |   |   |
         +---+---+---+---+---+---+---+---+
 3 |   |   |   | X |   |   |   |   |
         +---+---+---+---+---+---+---+---+
 4 | O | O | X | X | X | O | O | X |
         +---+---+---+---+---+---+---+---+
 5 |   |   |   |   |   |   |   |   |
         +---+---+---+---+---+---+---+---+
 6 |   |   |   |   |   |   |   |   |
         +---+---+---+---+---+---+---+---+
 7 |   |   |   |   |   |   |   |   |
         +---+---+---+---+---+---+---+---+
 8 |   |   |   |   |   |   |   |   |
         +---+---+---+---+---+---+---+---+
&nbsp;
No valid moves available for you.
Press &lt;ENTER&gt; to pass.        
</code></pre>
	* however if a player is able to move, once they complete their move, ask the player to press &lt;ENTER&gt; to allow the computer move (ask for any input again using something like `readlineSync.question('Press &lt;ENTER&gt; to show computer\'s move...');`... without storing the input in a variable
        <pre><code data-trim contenteditable>     A   B   C   D
         +---+---+---+---+
 1 |   |   |   |   |
         +---+---+---+---+
 2 | X | X | X |   |
         +---+---+---+---+
 3 |   | X | O |   |
         +---+---+---+---+
 4 |   |   |   |   |
         +---+---+---+---+
&nbsp;
Score
=====
X: 4
O: 1
&nbsp;
Press &lt;ENTER&gt; to show computer's move...
</code></pre>
    * for the computer's move, you can use any algorithm you want to generate a valid move
    * note that the computer can pass as well if it does not have any valid moves
3. Once there are 2 consecutive passes from the player to computer or vice versa, the game ends
4. Display who won based on the counts of the pieces/letters on the board (ties are possible)
    <pre><code data-trim contenteditable>Score
=====
X: 11
O: 5
&nbsp;
You won! 👍
</code></pre>
5. See the example game at the end of these instructions

### Handling Scripted Moves


If there were scripted moves defined in the config file, allow the game to proceed by pulling the moves for the computer and player from these Arrays... and using them to make a move:

1. if the move pulled from the Array is not valid, then ignore it and allow the computer or player to make their move manually
2. otherwise, if the move _is_ valid, then prompt the player to press <ENTER> to see their next move
3. if there are no more moves to pull from the array of scripted moves, allow the computer or player to choose their move like usual
4. Some more details:
    * again, __the player can move manually after the scripted moves have been exhausted__
    * if the scripted move is an invalid move, that scripted move is skipped (and the user or computer will move manually), and the next scripted move for that player (comp or user) will be used on that player's next turn
    * execute the scripted moves based on who is 'X', so if the player is 'X', their scripted moves will start first (same as if playing interactively)
    * there can be an uneven number of moves - if there are, follow this process: is there a scripted move to use? use it... otherwise move like you would normally (computer picks randomly or player enters move manually)
5. for example using this configuration:
    <pre><code data-trim contenteditable>{
	"boardPreset": {
		"playerLetter": "X",
		"board": [ 
					" ", " ", " ", " ",  
					"x", "O", "X", " ",  
					" ", "X", "O", " ",  
					" ", " ", " ", " "
		]
	},
	"scriptedMoves": {
		"player": ["A2", "D3"],
		"computer": ["C1", "A3"]
	}
}
</code></pre>	
5. the game would proceed as follows:
    <pre><code data-trim contenteditable>REVERSI
&nbsp;
Computer will make the following moves: [ 'C1', 'A3' ]
The player will make the following moves: [ 'A2', 'D3' ]
Player is X
        A   B   C   D
      +---+---+---+---+
 1 |   |   |   |   |
      +---+---+---+---+
 2 |   | O | X |   |
      +---+---+---+---+
 3 |   | X | O |   |
      +---+---+---+---+
 4 |   |   |   |   |
      +---+---+---+---+
&nbsp;
Player move to A2 is scripted.
Press &lt;ENTER&gt; to continue.
</code></pre>
    <pre><code data-trim contenteditable>     A   B   C   D
      +---+---+---+---+
 1 |   |   |   |   |
      +---+---+---+---+
 2 | X | X | X |   |
      +---+---+---+---+
 3 |   | X | O |   |
      +---+---+---+---+
 4 |   |   |   |   |
      +---+---+---+---+
&nbsp;
Score
=====
X: 4
O: 1
&nbsp;
Press &lt;ENTER&gt; to show computer's move...
</code></pre>
    <pre><code data-trim contenteditable>Computer move to C1 was scripted.
        A   B   C   D
      +---+---+---+---+
 1 |   |   | O |   |
      +---+---+---+---+
 2 | X | X | O |   |
      +---+---+---+---+
 3 |   | X | O |   |
      +---+---+---+---+
 4 |   |   |   |   |
      +---+---+---+---+
&nbsp;
Score
=====
X: 3
O: 3
&nbsp;
Player move to D3 is scripted.
Press &lt;ENTER&gt; to continue.    
</code></pre>
    <pre><code data-trim contenteditable>     A   B   C   D
      +---+---+---+---+
 1 |   |   | O |   |
      +---+---+---+---+
 2 | X | X | O |   |
      +---+---+---+---+
 3 |   | X | X | X |
      +---+---+---+---+
 4 |   |   |   |   |
      +---+---+---+---+
&nbsp;
Score
=====
X: 5
O: 2
&nbsp;
Press &lt;ENTER&gt; to show computer's move...
</code></pre>


### Example Game

__Animated gif of Reversi/Othello__

<div markdown="block" class="img" name="hw01-reversi-sample">
![example game](../resources/img/hw01-example-game.gif)
</div>

__Text Example__

<pre><code data-trim contenteditable>
How wide should the board be? (even numbers between 4 and 26, inclusive)
&gt; 4
Pick your letter: X (black) or O (white)
&gt; X
Player is X
     A   B   C   D
   +---+---+---+---+
 1 |   |   |   |   |
   +---+---+---+---+
 2 |   | O | X |   |
   +---+---+---+---+
 3 |   | X | O |   |
   +---+---+---+---+
 4 |   |   |   |   |
   +---+---+---+---+

What's your move?
&gt; B1

     A   B   C   D
   +---+---+---+---+
 1 |   | X |   |   |
   +---+---+---+---+
 2 |   | X | X |   |
   +---+---+---+---+
 3 |   | X | O |   |
   +---+---+---+---+
 4 |   |   |   |   |
   +---+---+---+---+

Score
=====
X: 4
O: 1

Press &lt;ENTER&gt; to show computer's move...
     A   B   C   D
   +---+---+---+---+
 1 |   | X |   |   |
   +---+---+---+---+
 2 |   | X | X |   |
   +---+---+---+---+
 3 | O | O | O |   |
   +---+---+---+---+
 4 |   |   |   |   |
   +---+---+---+---+

Score
=====
X: 3
O: 3

What's your move?
&gt; B4
     A   B   C   D
   +---+---+---+---+
 1 |   | X |   |   |
   +---+---+---+---+
 2 |   | X | X |   |
   +---+---+---+---+
 3 | O | X | O |   |
   +---+---+---+---+
 4 |   | X |   |   |
   +---+---+---+---+

Score
=====
X: 5
O: 2

Press &lt;ENTER&gt; to show computer's move...
     A   B   C   D
   +---+---+---+---+
 1 | O | X |   |   |
   +---+---+---+---+
 2 |   | O | X |   |
   +---+---+---+---+
 3 | O | X | O |   |
   +---+---+---+---+
 4 |   | X |   |   |
   +---+---+---+---+

Score
=====
X: 4
O: 4

What's your move?
&gt; A2
     A   B   C   D
   +---+---+---+---+
 1 | O | X |   |   |
   +---+---+---+---+
 2 | X | X | X |   |
   +---+---+---+---+
 3 | O | X | O |   |
   +---+---+---+---+
 4 |   | X |   |   |
   +---+---+---+---+

Score
=====
X: 6
O: 3

Press &lt;ENTER&gt; to show computer's move...
     A   B   C   D
   +---+---+---+---+
 1 | O | O | O |   |
   +---+---+---+---+
 2 | X | O | O |   |
   +---+---+---+---+
 3 | O | X | O |   |
   +---+---+---+---+
 4 |   | X |   |   |
   +---+---+---+---+

Score
=====
X: 3
O: 7

What's your move?
&gt; A4
     A   B   C   D
   +---+---+---+---+
 1 | O | O | O |   |
   +---+---+---+---+
 2 | X | O | O |   |
   +---+---+---+---+
 3 | X | X | O |   |
   +---+---+---+---+
 4 | X | X |   |   |
   +---+---+---+---+

Score
=====
X: 5
O: 6

Press &lt;ENTER&gt; to show computer's move...
Computer has no valid moves. Press &lt;ENTER&gt; to continue
Score
=====
X: 5
O: 6

What's your move?
&gt; D2
     A   B   C   D
   +---+---+---+---+
 1 | O | O | O |   |
   +---+---+---+---+
 2 | X | X | X | X |
   +---+---+---+---+
 3 | X | X | X |   |
   +---+---+---+---+
 4 | X | X |   |   |
   +---+---+---+---+

Score
=====
X: 9
O: 3

Press &lt;ENTER&gt; to show computer's move...
     A   B   C   D
   +---+---+---+---+
 1 | O | O | O |   |
   +---+---+---+---+
 2 | X | X | O | X |
   +---+---+---+---+
 3 | X | X | X | O |
   +---+---+---+---+
 4 | X | X |   |   |
   +---+---+---+---+

Score
=====
X: 8
O: 5

What's your move?
&gt; D4
     A   B   C   D
   +---+---+---+---+
 1 | O | O | O |   |
   +---+---+---+---+
 2 | X | X | O | X |
   +---+---+---+---+
 3 | X | X | X | X |
   +---+---+---+---+
 4 | X | X |   | X |
   +---+---+---+---+

Score
=====
X: 10
O: 4

Press &lt;ENTER&gt; to show computer's move...
     A   B   C   D
   +---+---+---+---+
 1 | O | O | O |   |
   +---+---+---+---+
 2 | X | X | O | X |
   +---+---+---+---+
 3 | X | X | O | X |
   +---+---+---+---+
 4 | X | X | O | X |
   +---+---+---+---+

Score
=====
X: 9
O: 6

What's your move?
&gt; D1
     A   B   C   D
   +---+---+---+---+
 1 | O | O | O | X |
   +---+---+---+---+
 2 | X | X | X | X |
   +---+---+---+---+
 3 | X | X | O | X |
   +---+---+---+---+
 4 | X | X | O | X |
   +---+---+---+---+

Score
=====
X: 11
O: 5

You won! 👍
</code></pre>

</div>

</div>
