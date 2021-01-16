---
layout: homework
title: CSCI-UA.0480 - Homework #6
---

<div class="panel panel-default">
	<div class="panel-heading">Homework #6</div>
	<div class="panel-body" markdown="block">


# MemorEmoji (Client Side JavaScript) - <strike>Due 4/12 at 11pm</strike> __Due 4/13 at 11pm__

## Overview


### Goals / Topics Covered

You'll be using the following concepts:

* manipulating the DOM
* setting DOM element attributes
* handling events with addEventListener

### Description

MemorEmoji is a card game in which a deck of cards containing pairs of symbols are shuffled and laid face down on a surface. A player flips two cards over on each turn. The object of the game is to turn over pairs of matching cards. The player will have a limited number of turns to do this.

You will be making an interface with following components:

1. Initially, a form that allows the user to set:
	* the number of cards
	* the maximum turns allowed
	* (optionally) the order that the cards placed (this will facilitate in testing)
2. A game board that has:
	* a grid of cards where all of the cards are initially face down (once clicked, they are flipped over)
 	* a count of the turns taken over the maximum number of turns
	* a quit button (to restart the game)

<img src="../resources/img/hw06-memoremoji/won.gif">

### Submission Process

You will be given access to a private repository on GitHub.  The final version of your assignment should be in GitHub

* __Push__ your changes to the homework repository on GitHub.

### Make at Least 4 Commits

* Commit multiple times throughout your development process.
* Make at least 4 separate commits

## MemorEmoji

### __Required Features__

### Create an express application and setup some directories

1. You don't _really_ need an Express application to do this homework, but start with one anyway, in case you decide to do the extra credit...
2. Start a new express project that uses express-static, using the following directory structure:
    * `package.json`
    * `.eslintrc.js`
    * `README.md`
    * `src`
        * `app.js`
        * `public`
            * `index.html`
            * `stylesheets`
                * `style.css`
            * `javascripts`
                * `main.js`
3. (there's no need to create any route handlers for this homework, you can do the whole thing with static files)
4. In your public folder, create an <code>index.html</code> file.
5. In your public folder, create a `stylesheets` folder and a file, `style.css`, within it 
6. In your public folder, create a `javascripts` folder and a file, `main.js`, within it 

__Use the following markup__

1. Add the following code to your <code>index.html</code>:
    <pre><code data-trim contenteditable>
&lt;!doctype html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;MEMOREMOJI&lt;/title&gt;
        &lt;link rel="stylesheet" href="stylesheets/style.css" type="text/css" media="screen" title="no title" charset="utf-8"&gt;
        &lt;meta charset="utf-8" /&gt; 
    &lt;/head&gt;
    &lt;body&gt;
        &lt;script src="javascripts/main.js"&gt;&lt;/script&gt;
		&lt;!-- ok to add additional script tags, but do not modify the html below --&gt;
        &lt;h1 class="title"&gt;Ⓜ️EM😂REM🤢Jℹ️&lt;/h1&gt;
        &lt;div class="start"&gt;
            &lt;div&gt;
                &lt;h2&gt;Number of Cards&lt;/h2&gt;
                &lt;input id="total-cards" type="number" /&gt;
            &lt;/div&gt;
            &lt;div&gt;
                &lt;h2&gt;Max Turns&lt;/h2&gt;
                &lt;input id="max-turns" type="number" /&gt;
            &lt;/div&gt;            
            &lt;div&gt;
                &lt;h2&gt;Set Cards &lt;/h2&gt;
				&lt;h3&gt;(testing mode; enter each card value separated by comma)&lt;/h3&gt;
                &lt;input id="card-faces" type="text" /&gt;
            &lt;/div&gt;
            &lt;div&gt;
                &lt;button class="play-btn" type="button"&gt;Game Start&lt;/button&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;div class="game"&gt;
        &lt;/div&gt;
        &lt;div class="result"&gt;
        &lt;/div&gt;
        &lt;div class="reset"&gt;
            &lt;button class="reset-btn" type="button"&gt;Reset&lt;/button&gt;
        &lt;/div&gt;
        &lt;div class="error-message"&gt;
            Please re-enter the number of cards (must be even number) and max turns !
            &lt;button class="error-btn" type="button"&gt;Go Back&lt;/button&gt;
        &lt;/div&gt;
    &lt;/body&gt;
&lt;/html&gt;

    </code></pre>
5. __You are not allowed to use any additional markup / modify the existing markup__ (the only exception is that you can add more script tags at the beginning); you must generate any additional elements you'll need with JavaScript, but you can use script markup to load multiple JavaScript files
6. All of your JavaScript should go in your JavaScript files.
	* ⚠️a make sure to use and event listener for `DOMContentLoaded` if your script(s) expect elements to be present
7. ... and, of course, all of your CSS should go in your external CSS file. 
	* __it's ok to add more CSS__
	* __in fact, part of the assignment is to add/remove css rules based on class name__


__Start with a form that allows the user to specify the number of cards in the game, the max turns,  and (optional for the player) the actual "value" / symbol of each card by using a character string of comma separated symbols__

* Only show the content in the h2 with class <code>title</code>, and div with class <code>start</code>
    * Make sure the div with class <code>game</code> , <code>result</code>, <code>reset</code>, and <code>error-message</code> are not displayed
    * Hint:
        * Make the appropriate CSS rules (this can be done in css only)
        * If necessary, you can use JavaScript's <code>someElementObj.classList</code>'s <code>add</code>, <code>remove</code>, and <code>toggle</code> [to _add and remove_ classes](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList) so that you can control which CSS rules are active after some interaction
* Add an event listener to the "Game Start" button to listen for clicks
* When the "Game Start" button is pressed, the event listener should:
  * Retrieve the values of the input fields and use these values to set up the game
  * Note that some basic validation is required...
  	* The number of cards should be an even number greater than 2 and less than or equal to 36
   	* The max turns should be equal to or greater than the number of cards / 2
	* If present, the "preset values" must contain the same number of values as the number of cards field
	* If present, the "preset values" must contain exactly two of every symbol
  * If any of the above conditions are not satisfied
    * the game should __not__ proceed yet
    * an error message should be displayed describing the issue
	* the form element should still be visible so that the user can modify them
* The actual values of the cards can be set by the user by entering a comma separated string of characters... which implies that if the string is present, there must be two of each symbol
  * For example, entering "1,2,3,2,3,1" will display 6 cards with symbols 1, 2, 3, 2, 3, 1 (all face down initially)
* If the user doesn't enter this string, and the number of cards are valid, the game should generate and _shuffle_ cards and their values (these can be emoji, letters, etc.)
* If the form data is valid
  * the form should be removed or hidden 
   * the game board should be added

__Generate a game board__

* Based on the number submitted, generate a game board in the <code>game</code> div
* The cards should be arranged as a square if possible (for example 16 cards means a 4 x 4 grid)
* If they cannot be arranged in a square lay out the cards at your discretion 
* However, regardless of the number of cards, the arrangement must be in a grid. Consider using:
  * display: inline-block; (this is the only one we covered in class)
  * a table
  * floated elements
  * grid
  * flexbox
* This game board must be generated by using <code>document.createElement()</code>, with attributes (class, id, etc.) also being added programmatically. 
  * To smooth over element creation, try creating a helper function for making elements and adding class names and other attributes, like ids:
    * the first parameter can be the name of the element to create
	* the second parameter can be an object that contains name value pairs of attributes and their values
	* the last parameter can be child elements
	* `createElement('div', {id: 'foo', class: 'bar'}, 'some text', createElement('p'))` →
	* `<div id='foo', class='bar'>some text <p></p></div>`
  	* <code>const ele = createElement('div, {'class': 'foo'}, 'bar!!!!');</code>

__Create a quit button__

* Create a button at the bottom of the page. When this button is clicked, quit the game and show the initial form again.

__Assign a random symbol to each card or use preset cards__

* __NOTE THAT IF THE PLAYER PRESETS THE CARDS__, then use those characters instead of random generation... otherwise...
* Find a way to assign a symbol from a set of available symbols (again, these symbols are of your choosing) to each card
* The symbol assignment should be randomized!
* The symbol should not appear in the user interface at the beginning of the game
* However, it does not matter if the symbol is viewable in the source code
* Some potential solutions for associating a symbol with a card may include:
  * An object that serves as a lookup table
  * Setting the value as a custom attribute (see chapter 13 in Eloquent JavaScript, 2nd Edition)
  * Creating an underlying class that models your game
  * Oooor… any other scheme that you can come up with

Here's an example of the user setting the card values:

<img src="../resources/img/hw06-memoremoji/preset.gif">

__Allow the user to click on cards__

* Assign an event listener to each card
* When a card is clicked show the card's symbol
  * Either add a text node to the card
  * Or use CSS
    * If you're using CSS, only manipulate the classes, don't assign styles directly
    * Some options for toggling classes include:
      * `classList`
      * `setAttribute`
* ⚠️Do not allow more than two flipped cards at once

__Handle two consecutive clicks / two flipped cards in each turn__

* In the <code>game</code> div, once a player flips two cards, display a message that tells the player whether or not a match was found
* If there's only one card flipped, allow another card to be flipped
* Once there are two cards flipped:
  * No other cards can be flipped
  * Show a message that says "Match" or "No Match"
  * Display an "OK" button
  * Clicking on the "OK" button proceeds to the next turn:
    * If two cards flipped didn't match
      * flip them back so that the symbols are no longer visible
    * If two cards do match, leave symbols revealed
	* In both cases, play can resume so that the user can flip another two cards

<img src="../resources/img/hw06-memoremoji/ok.gif">

__Keep track of the turns__

* One turn means a player flipped two cards
* Above the game board, show <code>number of turns played / max number of turns</code>
  * For example, displaying <code>TURN 2/4</code> means the player is playing the second turn and can only play 4 turns maximum.

__Game end state:__

The game is over when either;

* The turns played is equal to the maximum of turns
* All of the revealed cards are matched

__Display results of the game__

* Once the game is over, display the number turns over the max turns and display whether or not the player has won or lost. Here's an example of a loss:

<img src="../resources/img/hw06-memoremoji/lost.gif">

### Optional Features (Extra Credit)


If working on any extra credit, ⚠️ add a note in the readme specifying which extra credit you've implemented

(5 points) __A "play again"  button on the result page to restart the game once the game is over__ 

* This button will display the original form at the beginning of the game so that the user can play another game

(10 points) __Show previous score__

* Research and use [client side local storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) to store the last score (number of turns over max number of turns)... and display this on the game end page

(20 points) __Save name and score in database__

* At the end of the game, display a form allowing the user to save their name and score (number of turns over max turns)
* Save this data in the database
* Display all scores after form submission



</div>
</div>



