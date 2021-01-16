---
layout: homework
title: CSCI-UA.0480 - Homework #7
---

<div class="panel panel-default">
	<div class="panel-heading">Homework #7</div>
	<div class="panel-body" markdown="block">

# Threes Dice Game (Client Side JavaScript) - __Due <s>Wednesday, April 11th</s> Thursday, April 12th, by 11PM__


## Overview

### Goals / Topics Covered

You'll be using the following concepts:

* manipulating the DOM
* setting DOM element attributes
* handling events with addEventListener

### Description

Threes is a dice game where the goal is to get the lowest score (with each die face counting for that value, with the exception of threes, which count as 0).  It's played with 5 dice. In our version there are two players, the user and the computer. 

1. A player starts off buy rolling 5 dice.
2. The player then chooses 1 or more dice to pin (that is, to _save_ and count towards their score).
3. Once at least 1 die is pinned, the player rolls the remaining dice ...
4. The player then chooses 1 or more dice to pin.
5. This process repeats until the player either pins all of the remaining dice, or there's only 1 die left, and the player is forced to pin that die.
6. Once all of a player's dice are pinned, the values of all of the rolls are added to determine a player's score.
    * 3's count as 0
    * for example, if the pinned dice were: 1, 4, 1, 2, 3
    * ... then the score would be: 8
7. The other player then repeats steps 1 - 6 to get their score.
8. The player __with the lower score wins__.

You will be making an online version of this game where all of the game logic is client side JavaScript. Here's an example of what your game may look like:

<img src="../resources/img/hw07b-01-win.gif">
 
### Submission Process

You will be given access to a private repository on GitHub.  The final version of your assignment should be in GitHub

* __Push__ your changes to the homework repository on GitHub.

### Make at Least 4 Commits

* Commit multiple times throughout your development process.
* Make at least 4 separate commits

## Threes Dice Game Requirements

### __Required Features__

__Use the following markup__

1. Start a new express project that uses express-static.
	* the root directory should contain `package.json`, your eslint config, `.gitignore`, etc.
	* the `src` directory should contain `app.js` (serving on 3000), `public`, etc.
2. (there's no need to create any route handlers for this homework, you can do the whole thing with static files)
3. In your public folder, create an <code>index.html</code> file.
4. Add the following code to your <code>index.html</code>:
    <pre><code data-trim contenteditable>&lt;!doctype html&gt;
&lt;html&gt;
&lt;head&gt;
  &lt;title&gt;A Little Threesy&lt;/title&gt;
  &lt;script src="game.js"&gt;&lt;/script&gt;
  &lt;link rel="stylesheet" href="base.css" type="text/css" media="screen" title="no title" charset="utf-8"&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;div id="content"&gt;
    &lt;h1&gt;A Little Threesy&lt;/h1&gt; 
    &lt;div id="intro"&gt;
      Starting Dice Values (leave empty for random):
      &lt;input type="text" id="diceValues" name="diceValues"&gt;
      &lt;button&gt;Go!&lt;/button&gt;

    &lt;/div&gt;
      &lt;div id="game" class="hidden"&gt;
    &lt;/div&gt;

    &lt;div id="error-message" class="overlay"&gt;
      &lt;div class="modal"&gt;
        &lt;p&gt;&lt;/p&gt;
        &lt;button class="closeButton"&gt;Ok. Got it!&lt;/button&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;&lt;!--close id="content"--&gt;
&lt;/body&gt;
&lt;/head&gt;
&lt;/html&gt;
</code></pre>
5. __You are not allowed to use any additional markup__; you must generate any additional elements you'll need with JavaScript 
6. All of your JavaScript should go in your external JavaScript file.
7. ... and, of course, all of your CSS should go in your external CSS file. 

__Only show title screen and form on page load__

* Only show the content in the div with id <code>intro</code>
    * Make sure the overlay div and the game div are not displayed
    * Hint: 
        * Make the appropriate CSS rules
        * Use JavaScript's <code>someElementObj.classList</code>'s <code>add</code>, <code>remove</code>, and <code>contains</code> [to _add and remove_ classes](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList) so that you can control which CSS rules are active
* If the user clicks on the button, then start the game (see next requirement for instructions)
* Here's what the interaction should look like (you won't have any real content on the _next_ page yet, though):
    <br>
    <img src="../resources/img/hw07b-00-start.gif">
    <br>

__Pressing "Go" reveals the game screen and sets predefined dice roll results__

* Use <code>addEventListener</code> to allow the button on the _title screen_ to be pressed
    * It should lead to the next _screen_, which will be contained within the `div` with id, `game`
    * Check out the [slides on events](../slides/19/events.html#/)
    * Along with mdn's documentation on [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener), [click](https://developer.mozilla.org/en-US/docs/Web/Events/click), and [DOMContentLoaded](https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded)
    * Remember, you'll need to put all of your DOM dependant JavaScript in a <code>DOMContentLoaded</code> listener
    * And, of course, you'll need to add a <code>click</code> event listener for your button 
    * <code>document.querySelector</code> will also be very useful - see the [docs](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) or [slides](slides/19/js-css.html)!
    * Create and apply the appropriate classes to get rid of the _title screen_ (do this with styles, there's no need to remove the element) and show the _game screen_
* Note that there's a form field in the _title screen_ ...
    * This field will allow the player to set the results of the dice rolls in the game (it's kind of like cheating / using loaded dice, but it's really for making it easier to test!)!
    * If the player enters a value in this field, then the dice rolls will be set to the sequence inputted
    * The input should be a comma separated list of numbers, for example `1,2,3,4,5,6,7,8,9`
		* the first 5 rolls should be 1,2,3,4,5
		* the next 5 rolls should be 6,7,8,9 plus a random 5th number
    * No validation is required (assume that the user puts in valid input or no input)
    * You can retrieve the user input from the text field by using the `value` property on the form element that contains the user input - [see the mdn docs on value under HTML Input Element](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)
    * If there's nothing in the field, then dice rolls should be random
    * To implement this behavior, see below ...
* Create a function or object that generates dice rolls
    * You'll use this any time a roll is needed for the player or the computer
    * Again, dice rolls should initially be random ...
    * However, the function or object should be _configurable_ so that it can draw numbers from the list of numbers entered
    * (Use whatever mechanism you like to do this - perhaps storing the list in a closure or in a property in the function or constructor... or just a plain old global)
	* Note that the first several numbers will be exhausted by the computer's rolls
    * Once the list of specified numbers is exhausted, random numbers should be generated again
* Here's an example of how it may work (again, the _game screen_ will be blank for now, but when it's implemented, it should function like this):
    <img src="../resources/img/hw07b-00a-start-btn-fix.gif">
    <br>


__Generate DOM elements for 5 dice and 3 buttons__ 

* Create DOM elements to represent 5 dice
    * The elements should start off with no text 
    * Hint: you may find it helpful to create a containing element that holds all 5 dice
    * Hint: to lay out all 5 dice adjacent to each other and still maintain a width and height, you can use ...
        * <code>display: inline-block</code>
        * a <code>table</code>  
        * or <code>float</code> your elements
	* Hint: depending on your layout and positioning, it may be useful to have a <code>vertical-align: top;</code> in the containing element to keep the dice aligned in the same row once you start adding text nodes to them
* Create three buttons, `Start`, <code>Roll</code>, and <code>Pin</code>
    * Set `Roll` and <code>Pin</code> to disabled by adding a <code>disabled</code> attribute
    * For example:`<button disabled>My Button</button>`
    * Hint: To do this in JavaScript, use either `someElementObject.disabled = true;` or <code>someElementObject.setAttribute("disabled", "disabled");</code>
* The generated dice and buttons should look something like this:
    <br>
    <img src="../resources/img/hw07b-00b-dice.gif">

__Pressing "Start" Generates a score for the computer and shows your score__

* Add an event listener to the Start button so that it when it's clicked it:
    1. Generates a set of pinned dice for the computer
    2. Shows the player's score
    3. Allows the player to start rolling
* Generate a set of pinned dice (and consequently a score) for the computer
    * The computer will:
        1. roll 5 dice, and pick the lowest out of the 5 to pin
        2. roll the remaining 4 dice, and pick the lowest out of the 4 to pin
        3. roll the remaining 3 dice, and pick the lowest out of the 3 to pin
        4. ... and continue to roll remaining dice and choose the single lowest dice to pin until all 5 dice are pinned
    * You can test this by setting the initial form input to `5,5,5,5,5,4,4,4,4,3,3,3,2,2,1`
        * (the computer's dice should be 5, 4, 3, 2, and 1)
    * Display the result as `Computer Score: 5 + 4 + 3 + 2 + 1` (where the numbers are the values of the pinned dice)
    * This text should go below the title, but above the player's score
* Display the player's score (which is 0 for now) below the computer's score, but above the dice
* Here's what the two scores should look like:
    <br>
    <img src="../resources/img/hw07b-00b-comp.gif">
* Finally, disable the `Start` button and enable the `Roll` button
    * Hint: To do this in JavaScript, use either `someElementObject.disabled = false;` or <code>someElementObject.removeAttribute("disabled");</code>

__Rolling dice__

* When the roll button is pressed...
* Assign a random number between 1 and 6 to each _unpinned_ die
    * You'll have to keep track of which dice have been _saved_ / _pinned_ versus dice that have not been pinned
    * Hint: There are many ways to do this:
        * Simply use global variables, or variables that are accessible to all of your listener callback functions
        * You can also base pinned and unpinned on the attributes of the elements themselves (for example, each pinned die could have a <code>data-pinned</code> attribute or could have a class, <code>pinned</code>)
        * Or any other design or architecture that meets the requirements 
* Display that number in each DOM element
* After you roll, the <code>Roll</code> button should be disabled
* The pin button should be enabled
* You can do this by using <code>someElementObject.removeAttribute('disabled');</code>
* See an example roll below...
    <br>
    <img src="../resources/img/hw07b-00c-roll.gif">


__Selecting dice to pin__

* After rolling, a player must pin at least one die
* First, the player must select the dice that they would like to pin
* They do this by clicking on the actual displayed dice
    * Clicking on a die selects it for pinning (when the <code>Pin</code> button is pressed) and changes the die's appearance (you can make this whatever you like - such as changing the background color, adding a differently styled border, etc.)
    * Note that dice that have already been pinned should not be clickable (they'll be a different style; in the sample program, pinned dice are __dark__ gray)
    * Hovering over the dice should also have an effect on styling (in the examples, hovering over dice show a green background)
    * The example below shows a die selected for pinning being given a background color of __light__ gray...
        <br>
        <img src="../resources/img/hw07b-00d-select.gif">
* Clicking on a die again _deselects_ it for pinning
    * A user can deselect a die simply by clicking on the die again 
    * Note that this reverts its style
    * Hint: <code>someElementObject.classList.toggle(someClassName)</code> is helpful when dealing with flipping back-and-forth between one state and another
    * See below for an example of selecting and then deselecting (toggling)
        <br>
        <img src="../resources/img/hw07b-00d-deselect.gif">
* __Selecting the dice to pin doesn't actually pin the dice... you'll have to press the pin button to do that__ (see next step!)

__Pressing the pin button__

* Once a player has chosen the dice to pin, they can finalize their choices by clicking the <code>Pin</code> button
    * At least one die must be selected to pin for the <code>Pin</code> button to work
    * Pinned dice can no longer be rolled
    * ...And they can't be chosen to be pinned again (they're _already pinned_!)
* Clicking on the <code>Pin</code> button will change the styles on the selected dice
    * When the <code>Pin</code> button is pressed, the dice that were not set to be pinned become blank (see image below)
    * The dice that were selected to be pinned receive a different style (in the examples shown, the background is dark gray)
* After the <code>Pin</code> button is pressed, the player's score should be re-calculated and updated based on the newly pinned dice
* Again, if there are still unpinned dice after pinning, then they become blank (no number)
* Everything together should look like:
    <br>
    <img src="../resources/img/hw07b-00d-select-and-pin.gif">




__Determine the winner__

Once all of the dice have been pinned...

1. Disable both the <code>Pin</code> and <code>Roll</code> buttons
2. Compare the computer's score with the user's score
3. The player with the lower score wins
4. Add text to indicate of the user won, lost or tied
5. The text should be styled differently depending on the game outcome... for example, in the screen captures for the solution's version...
    * win text is green
    * lose text is red
    * tie text is blue
6. See the example below of a user losing a game:
    <img src="../resources/img/hw07b-02-lose.gif">

__Validation and error messages__

There are two interactions that the user __shouldn't be able to do__:

1. Click on the <code>Pin</code> button before the user has selected dice to pin
2. Select a die to pin before a they've rolled (that is, click on the die when it's blank)

If either state occurs, create an overlay on the screen with the appropriate error message. When they click on the <code>OK</code> button (or even better anywhere, in the overlay), the overlay should disappear. 

* implement this using plain CSS and/or JavaScript (no JQuery or bootstrap)
* Hint: the overlay should be <code>position:fixed</code> with a <code>height</code> and <code>width</code> of <code>100%</code>
* Hint: the overlay's <code>z-index</code> should be a high number (100?) so that it appears _on top_ of everything else
* Hint: to center content within the overlay, <code>margin: auto</code> and a specific <code>width</code> is helpful

<img src="../resources/img/hw07b-05-error.gif">


### Optional Features (Extra Credit)

Implement any of the following features

(10 points) __Restart game__

* when game ends, add a restart button along the bottom row of buttons
* the restart button resets the game so that:
    * the computer generates a new score
    * the player starts with 5 unpinned dice
    * Start and Pin are disabled, but Roll is enabled

(5 points) __Add actual dice faces to the game__

* instead of numbers, add an actual face to each die
    * you can use images
    * ... or [svgs](https://commons.wikimedia.org/wiki/File:Dice_1-6.svg)
    * ... or even [css / flexbox](https://davidwalsh.name/flexbox-dice)!
* (the computer's pinned dice can remain as numbers, though)

</div>
</div>



